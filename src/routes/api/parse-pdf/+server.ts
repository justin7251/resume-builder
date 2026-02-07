import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    if (!(file instanceof File)) {
      return json({ error: 'Missing PDF file.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const { default: pdfParse } = await import('pdf-parse');
    const result = await pdfParse(Buffer.from(arrayBuffer));
    return json({ text: result?.text || '' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to parse PDF.';
    return json({ error: message }, { status: 500 });
  }
}
