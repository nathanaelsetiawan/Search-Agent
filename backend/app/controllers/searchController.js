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

    // Log structure for debugging field mapping
    const responseData = n8nResponse.data;
    const sampleCandidate = Array.isArray(responseData)
      ? (Array.isArray(responseData[0]?.candidates) ? responseData[0].candidates[0] : responseData[0])
      : (responseData?.candidates?.[0] || responseData?.results?.[0] || responseData);
    if (sampleCandidate && typeof sampleCandidate === 'object') {
      console.log('[Search] Sample candidate fields from n8n:', JSON.stringify(Object.keys(sampleCandidate)));
      console.log('[Search] matchingScore fields:', {
        matchingScore: sampleCandidate.matchingScore,
        match_score: sampleCandidate.match_score,
        metrics_matchingScore: sampleCandidate.metrics?.matchingScore,
      });
    }

    return res.status(200).json(responseData);
  } catch (error) {
    console.error('[Search] Gagal menghubungi n8n:', error.message);
    return res.status(502).json({
      error: 'Gagal berkomunikasi dengan n8n.',
      details: error.message,
    });
  }
};
