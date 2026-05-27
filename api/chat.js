export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    });
  }

  try {

    const { message } = req.body;

    const response = await fetch(
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4.1-mini',
          messages: [
            {
              role: 'system',
              content:
              'You are XINIX CORE, an advanced AI system focused on consciousness, intelligence, futuristic technology, cognition, immersive systems, and ancient futurism.'
            },
            {
              role: 'user',
              content: message
            }
          ],
          temperature: 0.8
        })
      }
    );

    const data = await response.json();

    res.status(200).json({
      reply: data.choices[0].message.content
    });

  } catch (error) {

    res.status(500).json({
      error: 'AI connection failed'
    });

  }

        }api 
