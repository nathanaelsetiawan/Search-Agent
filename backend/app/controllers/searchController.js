import axios from 'axios';

export const searchCandidates = async (req, res) => {
  const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
  const payload = req.body;

  console.log('[Search] Request criteria received:', payload);

  if (!n8nWebhookUrl) {
    console.error('[Search] N8N_WEBHOOK_URL tidak dikonfigurasi di .env');
    return res.status(500).json({ error: 'N8N_WEBHOOK_URL belum dikonfigurasi di server.' });
  }

  try {
    console.log('[Search] Meneruskan request ke n8n:', n8nWebhookUrl);
    const n8nResponse = await axios.post(n8nWebhookUrl, payload, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 300000,
    });

    console.log('[Search] Response dari n8n diterima. Status:', n8nResponse.status);
    return res.status(200).json(n8nResponse.data);
  } catch (error) {
    console.error('[Search] Gagal menghubungi n8n:', error.message);
    return res.status(502).json({
      error: 'Gagal berkomunikasi dengan n8n.',
      details: error.message,
    });
  }
};
