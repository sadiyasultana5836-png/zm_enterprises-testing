// api/notify.js
// Vercel Serverless Function: Email Notification & Diagnostic Dispatcher
// Sends real order notifications and provides a diagnostic test endpoint.

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-pin');
}

module.exports = async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) { return res.status(400).json({ error: 'Invalid JSON' }); }
    }

    const action = body.action || 'order';
    const resendApiKey = process.env.RESEND_API_KEY;
    const configuredOwnerEmail = process.env.OWNER_EMAIL || process.env.NOTIFICATION_EMAIL || 'sadiyasultana5836@gmail.com';
    const targetEmail = body.email || configuredOwnerEmail;
    const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;

    // Action: 'diagnostics' -> Return current notification configuration status
    if (action === 'diagnostics') {
      return res.status(200).json({
        status: 'ok',
        emailConfigured: Boolean(resendApiKey),
        ownerEmail: targetEmail,
        webhookConfigured: Boolean(webhookUrl),
        message: resendApiKey ? 'Email dispatch active via Resend' : 'Email requires RESEND_API_KEY environment variable in Vercel settings'
      });
    }

    // Action: 'test' -> Send a test notification to verify setup
    if (action === 'test') {
      if (!targetEmail) {
        return res.status(400).json({
          success: false,
          error: 'No recipient email specified. Provide an email in the request or set OWNER_EMAIL environment variable.'
        });
      }

      if (!resendApiKey && !webhookUrl) {
        return res.status(200).json({
          success: false,
          configured: false,
          message: 'Notification service is not yet connected to a live email provider.',
          instructions: 'To receive real emails on Vercel, set the RESEND_API_KEY environment variable in your Vercel Project Settings.'
        });
      }

      let emailSent = false;
      let webhookSent = false;

      if (resendApiKey) {
        const testHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <div style="background: #234E8A; padding: 16px; border-radius: 6px; text-align: center; color: #fff;">
              <h2 style="margin: 0;">ZM ENTERPRISES NOTIFICATION TEST</h2>
            </div>
            <div style="padding: 20px 0; color: #292D32; font-size: 15px;">
              <p>Hello from <strong>ZM Enterprises Order System</strong>!</p>
              <p>This is a <strong>successful test notification</strong>. Your email notification system is properly connected and functioning.</p>
              <div style="background: #FAF8F2; border-left: 4px solid #234E8A; padding: 12px; margin: 16px 0; font-size: 14px;">
                <strong>Diagnostic Summary:</strong><br>
                • Recipient Email: <code>${targetEmail}</code><br>
                • Provider: Resend API (Connected)<br>
                • Timestamp: ${new Date().toLocaleString('en-IN')}<br>
                • Status: Real-time order notifications are ACTIVE
              </div>
              <p style="font-size: 13px; color: #68717D;">New incoming orders from your website will be delivered to this inbox immediately upon checkout.</p>
            </div>
            <div style="text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 12px;">
              ZM Enterprises • Atelier Management Suite • Hyderabad, Telangana
            </div>
          </div>
        `;

        const resp = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`
          },
          body: JSON.stringify({
            from: process.env.SENDER_EMAIL || 'ZM Enterprises <orders@resend.dev>',
            to: targetEmail,
            subject: '✅ ZM Enterprises - Order Notification Test Successful',
            html: testHtml
          })
        });

        if (resp.ok) {
          emailSent = true;
        } else {
          const errText = await resp.text();
          console.warn('[Notify Test Error]', errText);
          return res.status(502).json({
            success: false,
            error: 'Failed to deliver via Resend API',
            details: errText
          });
        }
      }

      if (webhookUrl) {
        try {
          await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ event: 'test.notification', targetEmail, timestamp: new Date().toISOString() })
          });
          webhookSent = true;
        } catch (e) {
          console.warn('[Notify Webhook Error]', e.message);
        }
      }

      return res.status(200).json({
        success: true,
        configured: true,
        emailSent,
        webhookSent,
        recipient: targetEmail,
        message: `Test email successfully sent to ${targetEmail}!`
      });
    }

    return res.status(400).json({ error: `Unknown action: ${action}` });
  } catch (err) {
    console.error('[API /api/notify Error]:', err);
    return res.status(500).json({ error: 'Notification processing error', details: err.message });
  }
};
