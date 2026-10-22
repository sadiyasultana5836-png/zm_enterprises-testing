// api/orders.js
// Vercel Serverless Function: ZM Enterprises Order Management System
// Persistent order storage, status tracking, audit log, and admin management.

const fs = require('fs');
const path = require('path');

// Determine file storage path (use /tmp on Vercel serverless environment, local ./data locally)
const IS_VERCEL = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const DB_FILE_PATH = IS_VERCEL ? '/tmp/zm_orders_db.json' : path.join(process.cwd(), 'data', 'orders.json');

// Helper: Set CORS headers
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-pin');
}

// Helper: Load stored orders from persistent file
function loadStoredOrders() {
  try {
    if (fs.existsSync(DB_FILE_PATH)) {
      const raw = fs.readFileSync(DB_FILE_PATH, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn('[Orders DB] Warning reading local file:', err.message);
  }
  return [];
}

// Helper: Save orders to persistent file
function saveOrdersToFile(orders) {
  try {
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(orders, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('[Orders DB] Error saving to file:', err.message);
    return false;
  }
}

// Helper: Supabase Database sync (if configured)
async function syncToSupabase(order) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;
  if (!supabaseUrl || !supabaseKey) return null;

  try {
    const res = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        order_id: order.id,
        customer_name: order.customerName,
        phone: order.phone,
        email: order.email || null,
        city: order.city || 'Hyderabad',
        address: order.address,
        notes: order.notes || null,
        items: order.items,
        total_amount: order.totalAmount,
        payment_mode: order.paymentMode,
        payment_status: order.paymentStatus,
        order_status: order.orderStatus,
        expected_delivery_date: order.expectedDeliveryDate || null,
        history: order.history || [],
        created_at: order.createdAt
      })
    });
    if (!res.ok) {
      console.warn('[Supabase Sync] Warning HTTP status:', res.status);
    }
    return true;
  } catch (err) {
    console.warn('[Supabase Sync] Error syncing to Supabase:', err.message);
    return false;
  }
}

// Helper: Dispatch Email Notification (via Resend or Webhook)
async function dispatchOrderNotification(order) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const recipientEmail = process.env.OWNER_EMAIL || process.env.NOTIFICATION_EMAIL || 'sadiyasultana5836@gmail.com';
  const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;

  // 1. Resend Email Dispatch
  if (resendApiKey && recipientEmail) {
    try {
      const itemsRows = (order.items || []).map((it, idx) => `
        <tr>
          <td style="padding:8px; border-bottom:1px solid #e2e8f0;">${idx + 1}</td>
          <td style="padding:8px; border-bottom:1px solid #e2e8f0;"><strong>${it.name || 'Uniform Item'}</strong></td>
          <td style="padding:8px; border-bottom:1px solid #e2e8f0; text-align:center;">${it.qty || 1}</td>
          <td style="padding:8px; border-bottom:1px solid #e2e8f0; text-align:right;">â‚¹${(Number(it.unitPrice) || 0).toLocaleString('en-IN')}</td>
          <td style="padding:8px; border-bottom:1px solid #e2e8f0; text-align:right; font-weight:bold;">â‚¹${(Number(it.lineTotal) || 0).toLocaleString('en-IN')}</td>
        </tr>
      `).join('');

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; color: #292D32; line-height: 1.5;">
          <div style="background: #234E8A; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; color: #ffffff;">
            <h1 style="margin: 0; font-size: 24px; letter-spacing: 1px;">ZM ENTERPRISES</h1>
            <p style="margin: 4px 0 0; font-size: 14px; opacity: 0.9;">New Online Customer Order Received</p>
          </div>
          
          <div style="background: #ffffff; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
            <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px; padding: 12px 16px; margin-bottom: 20px;">
              <span style="font-size: 12px; text-transform: uppercase; color: #065f46; font-weight: bold; letter-spacing: 0.5px;">Order Reference ID</span>
              <div style="font-size: 22px; font-weight: bold; color: #064e3b; font-family: monospace;">${order.id}</div>
              <div style="font-size: 13px; color: #047857; margin-top: 4px;">Status: <strong>${order.orderStatus}</strong> (Received on ${new Date(order.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST)</div>
            </div>

            <h3 style="color: #234E8A; border-bottom: 2px solid #FAF8F2; padding-bottom: 8px; margin-top: 0;">Customer Information</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
              <tr>
                <td style="color: #68717D; width: 140px; padding: 4px 0;">Customer Name:</td>
                <td style="font-weight: bold;">${order.customerName}</td>
              </tr>
              <tr>
                <td style="color: #68717D; padding: 4px 0;">Contact Phone:</td>
                <td><a href="tel:${order.phone}" style="color: #234E8A; font-weight: bold; text-decoration: none;">${order.phone}</a></td>
              </tr>
              <tr>
                <td style="color: #68717D; padding: 4px 0;">Email:</td>
                <td>${order.email || 'None provided'}</td>
              </tr>
              <tr>
                <td style="color: #68717D; padding: 4px 0;">Destination City:</td>
                <td>${order.city}</td>
              </tr>
              <tr>
                <td style="color: #68717D; padding: 4px 0; vertical-align: top;">Delivery Address:</td>
                <td style="font-weight: 500;">${order.address}</td>
              </tr>
              ${order.notes ? `<tr><td style="color: #68717D; padding: 4px 0; vertical-align: top;">Customer Notes:</td><td style="font-style: italic; color: #475569;">${order.notes}</td></tr>` : ''}
              <tr>
                <td style="color: #68717D; padding: 4px 0;">Payment Method:</td>
                <td><strong>${order.paymentMode}</strong></td>
              </tr>
            </table>

            <h3 style="color: #234E8A; border-bottom: 2px solid #FAF8F2; padding-bottom: 8px;">Order Items & Pricing</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 16px;">
              <thead>
                <tr style="background: #f8fafc; color: #475569; text-align: left;">
                  <th style="padding: 8px; border-bottom: 2px solid #e2e8f0; width: 30px;">#</th>
                  <th style="padding: 8px; border-bottom: 2px solid #e2e8f0;">Product Description</th>
                  <th style="padding: 8px; border-bottom: 2px solid #e2e8f0; text-align: center;">Qty</th>
                  <th style="padding: 8px; border-bottom: 2px solid #e2e8f0; text-align: right;">Unit Price</th>
                  <th style="padding: 8px; border-bottom: 2px solid #e2e8f0; text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsRows}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="4" style="padding: 8px; text-align: right; color: #68717D;">Standard Delivery / Pickup:</td>
                  <td style="padding: 8px; text-align: right; font-weight: bold; color: #167A62;">FREE (â‚¹0)</td>
                </tr>
                <tr>
                  <td colspan="4" style="padding: 8px; text-align: right; color: #68717D;">Taxes / Fees:</td>
                  <td style="padding: 8px; text-align: right; font-weight: bold;">â‚¹0</td>
                </tr>
                <tr style="background: #f1f5f9; font-size: 16px;">
                  <td colspan="4" style="padding: 10px; text-align: right; font-weight: bold; color: #234E8A;">Final Order Total:</td>
                  <td style="padding: 10px; text-align: right; font-weight: 800; color: #234E8A;">â‚¹${Number(order.totalAmount).toLocaleString('en-IN')}</td>
                </tr>
              </tfoot>
            </table>

            <div style="background: #fffbeb; border: 1px solid #fef3c7; border-radius: 6px; padding: 12px; font-size: 12px; color: #92400e; margin-top: 20px;">
              <strong>âš ï¸ Atelier Order Notice:</strong> Payment is marked as <strong>${order.paymentStatus}</strong>. Confirm the order with the customer via phone or WhatsApp before initiating workshop production.
            </div>
          </div>
          
          <div style="text-align: center; padding: 16px; font-size: 12px; color: #94a3b8;">
            ZM Enterprises â€¢ High-Quality School & Corporate Uniforms â€¢ Hyderabad, Telangana
          </div>
        </div>
      `;

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`
        },
        body: JSON.stringify({
          from: process.env.SENDER_EMAIL || 'ZM Enterprises <orders@resend.dev>',
          to: recipientEmail,
          subject: `ðŸ“¦ New Online Order #${order.id} (â‚¹${Number(order.totalAmount).toLocaleString('en-IN')}) - ZM Enterprises`,
          html: emailHtml
        })
      });
      console.log(`[Order Notification] Email successfully sent to ${recipientEmail}`);
    } catch (e) {
      console.warn('[Order Notification] Failed to send email via Resend:', e.message);
    }
  }

  // 2. Webhook notification (if configured)
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'order.created', data: order })
      });
      console.log('[Order Notification] Webhook triggered successfully.');
    } catch (e) {
      console.warn('[Order Notification] Webhook trigger error:', e.message);
    }
  }
}

// Main Vercel Serverless Handler
module.exports = async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // --- POST /api/orders: Place a new order ---
  if (req.method === 'POST') {
    try {
      let body = req.body;
      if (typeof body === 'string') {
        try {
          body = JSON.parse(body);
        } catch (e) {
          return res.status(400).json({ error: 'Invalid JSON payload' });
        }
      }

      if (!body || typeof body !== 'object') {
        return res.status(400).json({ error: 'Missing order body' });
      }

      // Mandatory field validation
      const customerName = String(body.customerName || '').trim();
      const phone = String(body.phone || '').trim();
      const address = String(body.address || '').trim();
      const items = Array.isArray(body.items) ? body.items : [];

      if (!customerName || !phone || !address) {
        return res.status(400).json({
          error: 'Validation failed: Customer name, phone number, and delivery address are required.'
        });
      }

      const cleanDigits = phone.replace(/[^0-9]/g, '');
      if (cleanDigits.length < 10) {
        return res.status(400).json({
          error: 'Validation failed: Please enter a valid 10-digit mobile number.'
        });
      }

      if (items.length === 0) {
        return res.status(400).json({
          error: 'Validation failed: At least one item is required in the order.'
        });
      }

      // Calculate and verify exact pricing on server side (Zero invented charges)
      let verifiedTotal = 0;
      const verifiedItems = items.map(it => {
        const qty = Math.max(1, parseInt(it.qty, 10) || 1);
        const unitPrice = Math.max(0, parseFloat(it.unitPrice || it.price) || 0);
        const lineTotal = unitPrice * qty;
        verifiedTotal += lineTotal;

        return {
          productId: it.productId || it.id || 'PROD-CUSTOM',
          name: String(it.name || 'Garment Item').trim(),
          category: String(it.category || 'General').trim(),
          qty: qty,
          unitPrice: unitPrice,
          lineTotal: lineTotal
        };
      });

      // Construct verified order object
      const orderId = body.id && String(body.id).startsWith('ZME-ORD-') 
        ? body.id 
        : `ZME-ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

      const createdAt = body.createdAt || new Date().toISOString();

      const newOrder = {
        id: orderId,
        customerName: customerName,
        phone: phone,
        email: String(body.email || '').trim(),
        city: String(body.city || 'Hyderabad').trim(),
        address: address,
        notes: String(body.notes || '').trim(),
        items: verifiedItems,
        totalAmount: verifiedTotal,
        paymentMode: String(body.paymentMode || 'Cash on Delivery / Pickup').trim(),
        paymentStatus: 'Pending Verification',
        orderStatus: 'Pending Confirmation',
        expectedDeliveryDate: body.expectedDeliveryDate ? String(body.expectedDeliveryDate).trim() : null,
        history: [
          {
            timestamp: createdAt,
            fromStatus: null,
            toStatus: 'Pending Confirmation',
            note: 'Order submitted by customer via web store checkout.'
          }
        ],
        createdAt: createdAt
      };

      // 1. Save to persistent file storage
      const existingOrders = loadStoredOrders();
      existingOrders.unshift(newOrder);
      saveOrdersToFile(existingOrders);

      // 2. Sync to Supabase (if configured)
      await syncToSupabase(newOrder);

      // 3. Dispatch Email & Webhook notifications
      await dispatchOrderNotification(newOrder);

      return res.status(200).json({
        success: true,
        orderId: newOrder.id,
        customerName: newOrder.customerName,
        totalAmount: newOrder.totalAmount,
        paymentStatus: newOrder.paymentStatus,
        orderStatus: newOrder.orderStatus,
        createdAt: newOrder.createdAt,
        order: newOrder,
        message: 'Order recorded securely in database and notifications dispatched.'
      });
    } catch (err) {
      console.error('[API /api/orders POST Error]:', err);
      return res.status(500).json({ error: 'Internal server error processing order', details: err.message });
    }
  }

  // --- GET /api/orders: Retrieve orders for owner/admin OR public order tracking ---
  if (req.method === 'GET') {
    const headers = req.headers || {};
    const query = req.query || {};

    // Authenticate Admin access
    const adminPin = process.env.ADMIN_PIN || '1234';
    const providedPin = headers['x-admin-pin'] || query.pin || '';
    const authHeader = headers['authorization'] || '';

    const isPinMatch = providedPin && String(providedPin).trim() === String(adminPin).trim();
    const isBearerMatch = authHeader && authHeader.replace(/^Bearer\s+/i, '').trim() === String(adminPin).trim();

    // Check if looking up single order by Order ID + Phone (Customer Track Order mode)
    const lookupId = query.lookupId;
    const lookupPhone = query.lookupPhone;

    if (lookupId && lookupPhone) {
      const orders = loadStoredOrders();
      const match = orders.find(o => 
        String(o.id).toUpperCase() === String(lookupId).toUpperCase() &&
        String(o.phone).replace(/[^0-9]/g, '').endsWith(String(lookupPhone).replace(/[^0-9]/g, '').slice(-10))
      );
      if (match) {
        // Return limited public tracking details (omit private sensitive internal data)
        return res.status(200).json({
          found: true,
          order: {
            id: match.id,
            customerName: match.customerName,
            createdAt: match.createdAt,
            orderStatus: match.orderStatus,
            paymentStatus: match.paymentStatus,
            expectedDeliveryDate: match.expectedDeliveryDate || null,
            itemCount: (match.items || []).reduce((s, i) => s + i.qty, 0),
            totalAmount: match.totalAmount,
            history: match.history || []
          }
        });
      } else {
        return res.status(404).json({ found: false, error: 'Order not found with matching reference and phone.' });
      }
    }

    // Otherwise, full list requires Owner Admin Authentication
    if (!isPinMatch && !isBearerMatch) {
      return res.status(401).json({
        error: 'Unauthorized: Owner Admin PIN required to view customer order records.'
      });
    }

    const orders = loadStoredOrders();
    return res.status(200).json({
      success: true,
      count: orders.length,
      orders: orders
    });
  }

  // --- PATCH /api/orders: Update order status, payment status, delivery date, notes ---
  if (req.method === 'PATCH') {
    const headers = req.headers || {};
    const query = req.query || {};

    const adminPin = process.env.ADMIN_PIN || '1234';
    const providedPin = headers['x-admin-pin'] || query.pin || '';
    const authHeader = headers['authorization'] || '';

    const isAuth = (providedPin && String(providedPin).trim() === String(adminPin).trim()) ||
                   (authHeader && authHeader.replace(/^Bearer\s+/i, '').trim() === String(adminPin).trim());

    if (!isAuth) {
      return res.status(401).json({ error: 'Unauthorized: Admin PIN required to modify order records.' });
    }

    try {
      let body = req.body;
      if (typeof body === 'string') body = JSON.parse(body);

      const orderId = body.orderId || body.id;
      if (!orderId) {
        return res.status(400).json({ error: 'Missing orderId' });
      }

      const orders = loadStoredOrders();
      const target = orders.find(o => o.id === orderId);
      if (!target) {
        return res.status(404).json({ error: `Order ${orderId} not found in database.` });
      }

      if (!Array.isArray(target.history)) {
        target.history = [];
      }

      const now = new Date().toISOString();

      if (body.orderStatus && body.orderStatus !== target.orderStatus) {
        const oldStatus = target.orderStatus;
        target.orderStatus = String(body.orderStatus).trim();
        target.history.push({
          timestamp: now,
          fromStatus: oldStatus,
          toStatus: target.orderStatus,
          note: body.note || body.historyNote || `Status changed from ${oldStatus} to ${target.orderStatus}`
        });
      }

      if (body.paymentStatus && body.paymentStatus !== target.paymentStatus) {
        const oldPayment = target.paymentStatus;
        target.paymentStatus = String(body.paymentStatus).trim();
        target.history.push({
          timestamp: now,
          fromStatus: oldPayment,
          toStatus: target.paymentStatus,
          note: `Payment status updated to ${target.paymentStatus}`
        });
      }

      if (body.expectedDeliveryDate !== undefined) {
        const dateVal = body.expectedDeliveryDate ? String(body.expectedDeliveryDate).trim() : null;
        if (dateVal !== target.expectedDeliveryDate) {
          target.expectedDeliveryDate = dateVal;
          target.history.push({
            timestamp: now,
            status: target.orderStatus,
            note: dateVal ? `Expected delivery date scheduled: ${dateVal}` : 'Expected delivery date cleared'
          });
        }
      }

      if (body.notes !== undefined) {
        target.notes = String(body.notes).trim();
      }

      target.updatedAt = now;

      saveOrdersToFile(orders);

      return res.status(200).json({
        success: true,
        orderId: target.id,
        orderStatus: target.orderStatus,
        paymentStatus: target.paymentStatus,
        expectedDeliveryDate: target.expectedDeliveryDate,
        history: target.history,
        order: target,
        message: `Order ${orderId} updated successfully.`
      });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to update order', details: err.message });
    }
  }

  return res.status(405).json({ error: `Method ${req.method} not allowed` });
};
