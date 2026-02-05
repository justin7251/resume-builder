import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

type RequestBody = {
  provider?: 'openai' | 'gemini';
  jobTitle?: string;
  years?: string;
  companyName?: string;
  tasks?: string[];
  actionVerb?: string;
  projectOrAccomplishment?: string;
  resultOrImpact?: string;
  skills?: string[];
  companyOrPosition?: string;
};

function validate(body: RequestBody) {
  const required = [
    body.jobTitle,
    body.years,
    body.companyName,
    body.actionVerb,
    body.projectOrAccomplishment,
    body.resultOrImpact,
    body.companyOrPosition
  ];

  const tasks = (body.tasks || []).filter(Boolean);
  const skills = (body.skills || []).filter(Boolean);

  return required.every(Boolean) && tasks.length >= 4 && skills.length >= 3;
}

function buildPrompt(body: RequestBody) {
  const tasks = (body.tasks || []).map(task => task?.trim()).filter(Boolean);
  const skills = (body.skills || []).map(skill => skill?.trim()).filter(Boolean);

  return `Write me a resume for a ${body.jobTitle} position that showcases my ${body.years} years of experience at ${body.companyName}, where I was responsible for ${tasks[0]}, ${tasks[1]}, ${tasks[2]}, and ${tasks[3]}. In this role, I ${body.actionVerb} ${body.projectOrAccomplishment} which ${body.resultOrImpact}. My experience has also allowed me to develop skills in ${skills[0]}, ${skills[1]}, and ${skills[2]}, which I can leverage to contribute to ${body.companyOrPosition}.`;
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
      { error: 'Please fill all fields, including 4 tasks and 3 skills.' },
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
