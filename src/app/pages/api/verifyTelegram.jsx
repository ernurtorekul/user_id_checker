import crypto from 'crypto';

export default function handler(req, res) {
  const { initData } = req.body;
  const secretKey = process.env.BOT_TOKEN; // Store your bot token securely in environment variables

  const data = new URLSearchParams(initData);
  const hash = data.get('hash');
  data.delete('hash');

  const dataString = Array.from(data)
    .map(([key, value]) => `${key}=${value}`)
    .sort()
    .join('\n');

  const hmac = crypto.createHmac('sha256', crypto.createHash('sha256').update(secretKey).digest());
  const checkHash = hmac.update(dataString).digest('hex');

  if (checkHash === hash) {
    res.status(200).json({ valid: true });
  } else {
    res.status(403).json({ valid: false });
  }
}
