import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

type RequestBody = {
  provider?: 'openai' | 'gemini';
  currentText?: string;
  jobDescription?: string;
  target?: 'summary' | 'experience';
};

function validate(body: RequestBody) {
  return Boolean(body.currentText?.trim() && body.jobDescription?.trim() && body.target);
}

function buildPrompt(body: RequestBody) {
  return `Job description:
${body.jobDescription}

Current ${body.target}:
${body.currentText}

Refine the ${body.target} to better match the job description. Keep all facts accurate, do not invent details, and keep the length similar to the original. Return plain text only.`;
}

function extractOpenAiText(data: any): string | null {
  if (!data || !Array.isArray(data.output)) return null;
  for (const item of data.output) {
    const content = item?.content;
    if (!Array.isArray(content)) continue;
    for (const part of content) {
      if (part?.type === 'output_text' && typeof part?.text === 'string') {
        return part.text;
      }
    }
  }
  return null;
}

function extractGeminiText(data: any): string | null {
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return typeof text === 'string' ? text : null;
}

export async function POST({ request }) {
  const body = (await request.json().catch(() => ({}))) as RequestBody;
  if (!validate(body)) {
    return json(
      { error: 'Please provide current text, job description, and target.' },
      { status: 400 }
    );
  }

  const prompt = buildPrompt(body);
  const provider = body.provider || 'openai';

  if (provider === 'gemini') {
    const apiKey = env.GEMINI_API_KEY;
    if (!apiKey) {
      return json({ error: 'Missing GEMINI_API_KEY.' }, { status: 500 });
    }
    const model = env.GEMINI_MODEL || 'gemini-2.5-flash';
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return json({ error }, { status: response.status });
    }

    const data = await response.json();
    const text = extractGeminiText(data);
    if (!text) {
      return json({ error: 'No text returned from model.' }, { status: 500 });
    }
    return json({ text });
  }

  const apiKey = env.OPENAI_API_KEY;
  if (!apiKey) {
    return json({ error: 'Missing OPENAI_API_KEY.' }, { status: 500 });
  }
  const model = env.OPENAI_MODEL || 'gpt-4.1-mini';

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      input: prompt
    })
  });

  if (!response.ok) {
    const error = await response.text();
    return json({ error }, { status: response.status });
  }

  const data = await response.json();
  const text = extractOpenAiText(data);
  if (!text) {
    return json({ error: 'No text returned from model.' }, { status: 500 });
  }

  return json({ text });
}
