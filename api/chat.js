export default async function handler(req, res) {

  if (req.method !== 'POST') {

    return res.status(405).json({
      reply: 'Method not allowed'
    });

  }

  try {

    const { message } = req.body;

    const openaiResponse = await fetch(
      'https://api.openai.com/v1/chat/completions',
      {

        method: 'POST',

        headers: {

          'Content-Type': 'application/json',

          'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY

        },

        body: JSON.stringify({

          model: 'gpt-4.1-mini',

          messages: [

            {
              role: 'system',
              content:
              'You are XINIX CORE, an advanced futuristic AI system focused on consciousness, intelligence, cognition, ancient futurism, immersive technology, and philosophical exploration.'
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

    const data = await openaiResponse.json();

    console.log(data);

    if (data.error) {

      return res.status(500).json({

        reply:
        'OpenAI Error: ' + data.error.message

      });

    }

    const reply =
      data.choices?.[0]?.message?.content ||
      'No response generated.';

    return res.status(200).json({
      reply
    });

  }

  catch (error) {

    return res.status(500).json({

      reply:
      'XINIX CORE connection failure.'

    });

  }

}
