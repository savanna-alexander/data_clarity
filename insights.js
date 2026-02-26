exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "API key not configured on server." }),
    };
  }

  let prompt;
  try {
    const parsed = JSON.parse(event.body);
    prompt = parsed.prompt;
  } catch (e) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Invalid request body: " + e.message }),
    };
  }

  if (!prompt) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "No prompt provided." }),
    };
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: `You are a sharp, senior business analyst and data analyst. Analyse the provided dataset and generate a specific, insightful observation. Be direct and precise — no waffle. Return ONLY valid JSON with no extra text: {"type": "insight type label (2-3 words)", "title": "sharp title (4-6 words)", "insight": "2-3 sentence insight with specific observations"}`,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const responseText = await response.text();

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Anthropic error: " + responseText }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: responseText,
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Function error: " + err.message }),
    };
  }
};
