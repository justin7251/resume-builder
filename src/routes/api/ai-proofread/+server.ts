import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

type ExperiencePayload = {
  role?: string;
  company?: string;
  dates?: string;
  description?: string;
};

type EducationPayload = {
  school?: string;
  degree?: string;
  dates?: string;
  description?: string;
};

type RequestBody = {
  provider?: 'openai' | 'gemini';
  jobTitle?: string;
  summary?: string;
  experiences?: ExperiencePayload[];
  education?: EducationPayload[];
  skills?: string[];
};

function buildPrompt(body: RequestBody) {
  const experiences = (body.experiences || []).map((exp, idx) => ({
    index: idx,
    role: exp.role || '',
    company: exp.company || '',
    dates: exp.dates || '',
    description: exp.description || ''
  }));

  const education = (body.education || []).map((edu, idx) => ({
    index: idx,
    school: edu.school || '',
    degree: edu.degree || '',
    dates: edu.dates || '',
    description: edu.description || ''
  }));

  const skills = (body.skills || []).filter(Boolean).join(', ');

  return `You are an expert resume proofreader. Rewrite the content to be stronger, quantified, and ATS-friendly.
Return valid JSON only with this shape:
{
  "summary_html": "<p>...</p>",
  "experience_html": ["<ul><li>...</li></ul>", "..."],
  "education_html": ["<p>...</p>", "..."]
}

Guidelines:
- Keep each item concise and action-oriented.
- Add measurable impact where reasonable (percentages, time saved, growth, scale).
- Preserve the number of items in arrays.
- Use HTML <p> for paragraphs and <ul><li> for bullets.

Context:
Job title: ${body.jobTitle || ''}
Skills: ${skills || ''}

Summary:
${body.summary || ''}

Experience:
${JSON.stringify(experiences, null, 2)}

Education:
${JSON.stringify(education, null, 2)}
`;
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

function safeParseJson(text: string): { ok: true; value: any } | { ok: false; error: string } {
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch {
    // Attempt to recover a JSON object from a broader response.
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start !== -1 && end !== -1 && end > start) {
      const candidate = text.slice(start, end + 1);
      try {
        return { ok: true, value: JSON.parse(candidate) };
      } catch {
        // fall through
      }
    }
    return { ok: false, error: 'Model did not return valid JSON.' };
  }
}

export async function POST({ request }) {
  const body = (await request.json().catch(() => ({}))) as RequestBody;
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
    const parsed = safeParseJson(text);
    if (!parsed.ok) {
      return json({ error: parsed.error, raw: text }, { status: 502 });
    }
    return json(parsed.value);
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

  const parsed = safeParseJson(text);
  if (!parsed.ok) {
    return json({ error: parsed.error, raw: text }, { status: 502 });
  }

  return json(parsed.value);
}
