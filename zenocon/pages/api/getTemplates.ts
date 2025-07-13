import type { NextApiRequest, NextApiResponse } from 'next';

type SuccessResponse = {
  success: true;
  templates: any[];
};

type ErrorResponse = {
  error: string;
  details?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const token = process.env.WHATSAPP_API_TOKEN;
  const wabaId = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID;

  if (!token || !wabaId) {
    return res.status(500).json({ error: 'Missing API token or WABA ID in environment variables' });
  }

  try {
    const response = await fetch(`https://graph.facebook.com/v22.0/${wabaId}/message_templates`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Failed to fetch templates',
        details: JSON.stringify(result),
      });
    }

    return res.status(200).json({ success: true, templates: result.data });
  } catch (err: any) {
    return res.status(500).json({ error: 'Error contacting WhatsApp API', details: err.message });
  }
}
