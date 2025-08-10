export async function GET() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return Response.json({ message: 'No LLM configured' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        input: 'Say hello',
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }

    const data = await response.json();
    const output = data.output_text || data.choices?.[0]?.message?.content || 'No output';
    return Response.json({ message: output });
  } catch (error) {
    console.error('LLM error', error);
    return Response.json({ error: 'LLM request failed' }, { status: 500 });
  }
}
