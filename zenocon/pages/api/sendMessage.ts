import type { NextApiRequest, NextApiResponse } from 'next';

type SuccessResponse = {
  success: true;
  data: any;
};

type ErrorResponse = {
  error: string;
  details?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { to } = req.body;

  const token = process.env.WHATSAPP_API_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    return res.status(500).json({ error: 'Missing WhatsApp API credentials in environment variables' });
  }

  if (!to) {
    return res.status(400).json({ error: 'Missing recipient phone number (to)' });
  }

  try {
    const response = await fetch(`https://graph.facebook.com/v22.0/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'template',
        template: {
          name: 'hello_world',
          language: { code: 'en_US' },
        },
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: 'WhatsApp API error', details: JSON.stringify(result) });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to send message', details: err.message });
  }
}
