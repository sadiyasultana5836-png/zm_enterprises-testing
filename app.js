/**
 * ZM ENTERPRISES - TAILORING BUSINESS MANAGEMENT SUITE
 * Complete Business Logic (Vanilla JavaScript)
 * Features:
 * - Customer Registration with Detailed Measurements (Men/Women/Kids)
 * - Order Creation, Tracking & Production Pipeline
 * - Trial Date & Delivery Date Management with Overdue Alerts
 * - Payment Tracking with Multi-Transaction History
 * - WhatsApp Notification Integration (5 Templates)
 * - Tailoring Service Catalog & Quick Booking
 * - Invoices & Printable Receipts
 * - Mobile Responsive Drawer
 * - LocalStorage Persistence & JSON Backup/Restore
 */

const STORAGE_KEY = 'ZM_TAILORING_PRO_DATA_V2';

// Standard Tailoring Service Catalog
const SERVICE_CATALOG = [
  {
    id: "CAT-101",
    name: "Men's Bespoke 3-Piece Suit",
    category: "Custom Stitching",
    price: 7500,
    turnaround: "7 - 10 Days",
    desc: "Coat, trousers and tailored waistcoat. Hand-finished lapel with canvas structure.",
    fabricTip: "Recommended: Italian Wool, Poly-Viscose or Linen."
  },
  {
    id: "CAT-102",
    name: "Royal Sherwani & Kurta Set",
    category: "Ethnic Wear",
    price: 6500,
    turnaround: "8 - 12 Days",
    desc: "Festive or wedding sherwani with matching churidar and stole bordering.",
    fabricTip: "Recommended: Silk Brocade, Raw Silk or Velvet."
  },
  {
    id: "CAT-103",
    name: "Men's Formal Blazer & Trousers",
    category: "Custom Stitching",
    price: 4800,
    turnaround: "5 - 7 Days",
    desc: "Single/double breasted blazer with slim-cut formal trousers.",
    fabricTip: "Recommended: Wool blend, Tweed or Cotton Twill."
  },
  {
    id: "CAT-104",
    name: "Men's Kurta Pyjama / Pathani",
    category: "Custom Stitching",
    price: 1200,
    turnaround: "3 - 5 Days",
    desc: "Traditional or modern Pathani suit with Mandarin collar and cuffed sleeves.",
    fabricTip: "Recommended: Pure Cotton, Linen or Silk blend."
  },
  {
    id: "CAT-105",
    name: "Bridal Lehenga & Designer Blouse",
    category: "Ethnic Wear",
    price: 8500,
    turnaround: "10 - 15 Days",
    desc: "Full flare kali lehenga with canvas & cancan netting, handcrafted choli.",
    fabricTip: "Recommended: Silk, Georgette, Velvet with Zari work."
  },
  {
    id: "CAT-106",
    name: "Designer Heavy Anarkali Suit",
    category: "Ethnic Wear",
    price: 4500,
    turnaround: "7 - 9 Days",
    desc: "Floor-length multi-kali Anarkali with pants and decorated dupatta.",
    fabricTip: "Recommended: Pure Georgette, Chanderi or Chiffon."
  },
  {
    id: "CAT-107",
    name: "Designer Padded Saree Blouse",
    category: "Custom Stitching",
    price: 1400,
    turnaround: "2 - 4 Days",
    desc: "Custom neckline, princess cut, concealed zipper with padded cups.",
    fabricTip: "Recommended: Brocade, Silk or Jacquard with lining."
  },
  {
    id: "CAT-108",
    name: "Women's Salwar Suit & Churidar",
    category: "Custom Stitching",
    price: 1100,
    turnaround: "3 - 5 Days",
    desc: "Everyday or semi-formal kameez with salwar, patiala or pants.",
    fabricTip: "Recommended: Cotton, Crepe or Cambric."
  },
  {
    id: "CAT-109",
    name: "School Uniform Batch Set",
    category: "Uniform",
    price: 850,
    turnaround: "5 - 7 Days",
    desc: "Durable school uniform shirt and trousers or skirt with badge stitching.",
    fabricTip: "Recommended: Dacron Poly-Cotton Blend."
  },
  {
    id: "CAT-110",
    name: "Corporate Staff Blazer & Shirt",
    category: "Uniform",
    price: 3200,
    turnaround: "7 - 10 Days",
    desc: "Institutional or corporate blazer with custom embroidered logo crest.",
    fabricTip: "Recommended: Durable Poly-Viscose suiting."
  },
  {
    id: "CAT-111",
    name: "Suit / Blazer Resizing & Alteration",
    category: "Alteration",
    price: 650,
    turnaround: "1 - 2 Days",
    desc: "Waist suppression, sleeve shortening, shoulder tapering & vent adjustments.",
    fabricTip: "Applicable on client's ready garments."
  },
  {
    id: "CAT-112",
    name: "Trouser Tapering, Hemming & Waist Fix",
    category: "Alteration",
    price: 250,
    turnaround: "1 Day",
    desc: "Bottom mori alteration, waist loosening/tightening, zip replacement.",
    fabricTip: "Express 24-hour turnaround available."
  },
  {
    id: "CAT-113",
    name: "Kids Festive Kurta Set / Sherwani",
    category: "Ethnic Wear",
    price: 1600,
    turnaround: "4 - 6 Days",
    desc: "Comfort-tailored festive outfit for boys and girls with soft lining.",
    fabricTip: "Recommended: Cotton-Silk or Breathable Rayon."
  }
];

// Initial Demo Data
const DEFAULT_DATA = {
  settings: {
    businessName: "ZM Enterprises",
    tagline: "Quality Tailoring & Garment Solutions | Custom Stitching, Alterations & Uniforms",
    phone: "919876543210",
    email: "contact@zmenterprises.com",
    address: "Shop No. 12, Fashion Commercial Complex, Main Market",
    terms: "Fitting alterations accommodated within 7 days of delivery. Perfect fitting guaranteed."
  },
  customers: [
    {
      id: "CUST-101",
      name: "Tariq Ahmed",
      phone: "9845012345",
      gender: "Men",
      email: "tariq.ahmed@example.com",
      address: "B-42, Crescent Park, City Center",
      measurements: {
        length: "31",
        chest: "40",
        waist: "34",
        shoulder: "18",
        sleeveLength: "25",
        armhole: "18.5",
        neck: "16",
        frontNeck: "7",
        backNeck: "2.5",
        pantLength: "41",
        hip: "42",
        pantWaist: "34",
        thigh: "25",
        knee: "18",
        bottom: "15",
        inseam: "31"
      },
      notes: "Prefers modern slim cut for blazers; 2 front buttons; double back vent.",
      createdAt: "2026-10-01"
    },
    {
      id: "CUST-102",
      name: "Fatima Sana",
      phone: "9712355678",
      gender: "Women",
      email: "fatima.sana@example.com",
      address: "Flat 304, Emerald Heights, Gulshan",
      measurements: {
        length: "48",
        chest: "37",
        waist: "31",
        shoulder: "14.5",
        sleeveLength: "18",
        armhole: "16",
        neck: "14",
        frontNeck: "7.5",
        backNeck: "9",
        pantLength: "38",
        hip: "40",
        pantWaist: "31",
        thigh: "23",
        knee: "17",
        bottom: "13",
        inseam: "28"
      },
      notes: "Deep back neck with latkan ties. High quality santoon lining required.",
      createdAt: "2026-10-02"
    },
    {
      id: "CUST-103",
      name: "Green Valley Public School",
      phone: "9822099887",
      gender: "Kids",
      email: "admin@greenvalleyschool.edu",
      address: "Administrative Wing, Sector 4",
      measurements: {
        length: "24",
        chest: "30",
        waist: "26",
        shoulder: "13",
        sleeveLength: "17",
        armhole: "14",
        neck: "13",
        frontNeck: "5",
        backNeck: "2",
        pantLength: "32",
        hip: "32",
        pantWaist: "26",
        thigh: "18",
        knee: "14",
        bottom: "13",
        inseam: "24"
      },
      notes: "Batch uniform standard pattern. Size 30 chest sample batch.",
      createdAt: "2026-10-03"
    },
    {
      id: "CUST-104",
      name: "Priya Verma",
      phone: "9988122334",
      gender: "Women",
      email: "priya.v@example.com",
      address: "14/A, Silver Oak Lane",
      measurements: {
        length: "42",
        chest: "35",
        waist: "29",
        shoulder: "14",
        sleeveLength: "16",
        armhole: "15",
        neck: "13.5",
        frontNeck: "6.5",
        backNeck: "7",
        pantLength: "37",
        hip: "38",
        pantWaist: "29",
        thigh: "22",
        knee: "16",
        bottom: "12",
        inseam: "27.5"
      },
      notes: "Kurti alteration and waist tucking. Needs 1-inch side margin for future letting out.",
      createdAt: "2026-10-04"
    }
  ],
  orders: [
    {
      id: "ZM-1001",
      customerId: "CUST-101",
      customerName: "Tariq Ahmed",
      customerPhone: "9845012345",
      category: "Custom Stitching",
      title: "Men's Bespoke 3-Piece Suit (Navy Italian Wool)",
      fabric: "Client provided Italian Super 120s Wool",
      fabricSource: "Client Provided",
      trialDate: "2026-10-10",
      deliveryDate: "2026-10-15",
      status: "Cutting",
      priority: "Express",
      total: 8500,
      advance: 5000,
      balance: 3500,
      paymentMethod: "UPI / Online",
      notes: "Satin lapel trim, personalized monogram 'TA' inside coat.",
      createdAt: "2026-10-05",
      payments: [
        { id: "PAY-1", amount: 5000, mode: "UPI / Online", date: "2026-10-05", notes: "Advance on booking" }
      ]
    },
    {
      id: "ZM-1002",
      customerId: "CUST-102",
      customerName: "Fatima Sana",
      customerPhone: "9712355678",
      category: "Ethnic Wear",
      title: "Bridal Heavy Anarkali Suit with Dupatta Bordering",
      fabric: "Pure Georgette with Zari work (ZM Sourced)",
      fabricSource: "ZM Sourced",
      trialDate: "2026-10-09",
      deliveryDate: "2026-10-13",
      status: "Stitching",
      priority: "Standard",
      total: 6200,
      advance: 3000,
      balance: 3200,
      paymentMethod: "Cash",
      notes: "Full flare kali design; handcrafted tassels for back dori.",
      createdAt: "2026-10-06",
      payments: [
        { id: "PAY-2", amount: 3000, mode: "Cash", date: "2026-10-06", notes: "Advance at fabric selection" }
      ]
    },
    {
      id: "ZM-1003",
      customerId: "CUST-103",
      customerName: "Green Valley Public School",
      customerPhone: "9822099887",
      category: "Uniform",
      title: "Batch Order: 25 Pairs School Uniform Shirts & Trousers",
      fabric: "Dacron Poly-Cotton Blend (Grey & White)",
      fabricSource: "ZM Sourced",
      trialDate: "2026-10-14",
      deliveryDate: "2026-10-20",
      status: "Received",
      priority: "Standard",
      total: 21500,
      advance: 10000,
      balance: 11500,
      paymentMethod: "Bank Transfer",
      notes: "School embroidered crest badges will be supplied by school office.",
      createdAt: "2026-10-07",
      payments: [
        { id: "PAY-3", amount: 10000, mode: "Bank Transfer", date: "2026-10-07", notes: "Bank NEFT Advance" }
      ]
    },
    {
      id: "ZM-1004",
      customerId: "CUST-104",
      customerName: "Priya Verma",
      customerPhone: "9988122334",
      category: "Alteration",
      title: "Designer Kurti Alteration & Fitting + Palazzo Hemming",
      fabric: "Silk Crepe",
      fabricSource: "Client Provided",
      trialDate: "2026-10-08",
      deliveryDate: "2026-10-09",
      status: "Trial Ready",
      priority: "Standard",
      total: 650,
      advance: 650,
      balance: 0,
      paymentMethod: "UPI / Online",
      notes: "Waist take-in 1.5 inches; palazzo shorten 1 inch.",
      createdAt: "2026-10-07",
      payments: [
        { id: "PAY-4", amount: 650, mode: "UPI / Online", date: "2026-10-07", notes: "Full upfront payment" }
      ]
    }
  ]
};

class TailorBusinessApp {
  constructor() {
    window.app = this;
    this.data = this.loadData();
    this.currentTab = 'dashboard';
    this.activeWhatsAppOrderId = null;
    this.activePaymentOrderId = null;
    this.openedFromOrderModal = false;
    try {
      this.init();
    } catch (err) {
      console.warn("Init non-blocking warning:", err);
    }
  }

  loadData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Failed to parse storage data", e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }

  saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error("Failed to save to local storage", e);
      this.showToast("Warning: Local storage unavailable or full");
    }
  }

  init() {
    this.bindEvents();
    this.renderSettings();
    this.populateCustomerDropdowns();
    this.renderDashboard();
    this.renderOrdersTable();
    this.renderCustomersGrid();
    this.renderCatalog();
    this.renderInvoicesTable();
  }

  bindEvents() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        this.switchTab(tab);
        this.toggleMobileNav(false);
      });
    });

    // Quick Action Buttons
    const btnQuickOrder = document.getElementById('btn-quick-order');
    if (btnQuickOrder) btnQuickOrder.addEventListener('click', () => this.openNewOrderModal());

    const btnQuickCustomer = document.getElementById('btn-quick-customer');
    if (btnQuickCustomer) btnQuickCustomer.addEventListener('click', () => this.openCustomerModal());
  }

  toggleMobileNav(show) {
    const sidebar = document.getElementById('app-sidebar');
    const backdrop = document.getElementById('mobile-backdrop');
    if (show) {
      sidebar.classList.add('mobile-open');
      backdrop.classList.add('active');
    } else {
      sidebar.classList.remove('mobile-open');
      backdrop.classList.remove('active');
    }
  }

  switchTab(tabName) {
    this.currentTab = tabName;
    document.querySelectorAll('.nav-item').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tabName);
    });

    document.querySelectorAll('.tab-view').forEach(view => {
      view.classList.remove('active');
    });

    const activeView = document.getElementById(`view-${tabName}`);
    if (activeView) activeView.classList.add('active');

    const titleMap = {
      dashboard: "Dashboard Overview",
      orders: "Orders & Production Tracking",
      customers: "Customer Records & Measurements",
      catalog: "Tailoring Service Catalog & Rates",
      invoices: "Billing, Invoices & Payment History",
      settings: "Store Settings & Data Backup"
    };

    const subtitleMap = {
      dashboard: "Welcome to ZM Enterprises – Quality Tailoring & Garment Solutions",
      orders: "Manage custom stitching, alterations, ethnic wear & uniform production",
      customers: "Comprehensive body measurement records for men, women, and children",
      catalog: "Explore standard service offerings, pricing, and rapid order booking",
      invoices: "Generate printable receipts, track payments, and share on WhatsApp",
      settings: "Configure store contact details, invoice headers, and export backups"
    };

    const pageTitle = document.getElementById('page-title');
    if (pageTitle) pageTitle.textContent = titleMap[tabName] || "ZM Enterprises";
    const pageSub = document.getElementById('page-subtitle');
    if (pageSub) pageSub.textContent = subtitleMap[tabName] || "";

    if (tabName === 'dashboard') this.renderDashboard();
    if (tabName === 'orders') this.renderOrdersTable();
    if (tabName === 'customers') this.renderCustomersGrid();
    if (tabName === 'catalog') this.renderCatalog();
    if (tabName === 'invoices') this.renderInvoicesTable();
  }

  showToast(message) {
    try {
      let toast = document.getElementById('toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
      }
      toast.textContent = message;
      toast.classList.add('show');
      setTimeout(() => {
        if (toast) toast.classList.remove('show');
      }, 3200);
    } catch (e) {
      console.log("Toast:", message);
    }
  }

  // ==================== DASHBOARD ====================
  renderDashboard() {
    const orders = this.data.orders;
    const activeOrders = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Completed').length;
    const trialReady = orders.filter(o => o.status === 'Trial Ready').length;
    const pendingBalance = orders.reduce((sum, o) => sum + (Number(o.balance) || 0), 0);
    const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

    // Update active badge in sidebar
    const navBadge = document.getElementById('nav-active-count');
    if (navBadge) navBadge.textContent = activeOrders;

    // Dates check
    const todayStr = new Date().toISOString().split('T')[0];
    const next7Days = new Date();
    next7Days.setDate(next7Days.getDate() + 7);
    const next7DaysStr = next7Days.toISOString().split('T')[0];

    const dueDeliveries = orders.filter(o => {
      if (!o.deliveryDate || o.status === 'Delivered') return false;
      return o.deliveryDate >= todayStr && o.deliveryDate <= next7DaysStr;
    }).length;

    const overdueOrders = orders.filter(o => {
      if (!o.deliveryDate || o.status === 'Delivered' || o.status === 'Completed') return false;
      return o.deliveryDate < todayStr;
    });

    const trialsToday = orders.filter(o => {
      return o.trialDate === todayStr && o.status !== 'Delivered' && o.status !== 'Completed';
    });

    const setText = (id, txt) => {
      const el = document.getElementById(id);
      if (el) el.textContent = txt;
    };
    setText('stat-active-orders', activeOrders);
    setText('stat-pending-trials', trialReady);
    setText('stat-deliveries-due', dueDeliveries);
    setText('stat-overdue-orders', overdueOrders.length);
    setText('stat-total-revenue', `₹${totalRevenue.toLocaleString('en-IN')}`);
    setText('stat-pending-balance', `₹${pendingBalance.toLocaleString('en-IN')}`);

    // Render alert banners for trials today / overdue
    const alertsContainer = document.getElementById('dashboard-alerts-container');
    if (alertsContainer) {
      alertsContainer.innerHTML = '';

      if (overdueOrders.length > 0) {
        const banner = document.createElement('div');
        banner.className = 'alert-banner alert-danger';
        banner.innerHTML = `
          <div>
            <strong>⚠️ Overdue Delivery Alert:</strong> You have <strong>${overdueOrders.length}</strong> order(s) past delivery date!
          </div>
          <button class="btn btn-sm btn-outline" onclick="app.filterOrdersByOverdue()">View Overdue Orders</button>
        `;
        alertsContainer.appendChild(banner);
      }

      if (trialsToday.length > 0) {
        const banner = document.createElement('div');
        banner.className = 'alert-banner alert-warning';
        banner.innerHTML = `
          <div>
            <strong>👗 Trial Fittings Scheduled Today (${trialsToday.length}):</strong> ${trialsToday.map(t => `#${t.id} (${t.customerName})`).join(', ')}
          </div>
          <button class="btn btn-sm btn-outline" onclick="app.switchTab('orders')">Manage Fittings</button>
        `;
        alertsContainer.appendChild(banner);
      }
    }

    // Recent orders table
    const tbody = document.getElementById('dashboard-orders-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const recent = [...orders].slice(-6).reverse();
    if (recent.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 28px; color:#94a3b8;">No orders created yet. Click "+ New Order" to start!</td></tr>`;
      return;
    }

    recent.forEach(order => {
      const tr = document.createElement('tr');
      const statusBadge = this.getStatusBadge(order.status);
      const isPaid = Number(order.balance) <= 0;
      const paymentBadge = isPaid
        ? `<span class="badge badge-paid">Fully Paid</span>` 
        : `<span class="badge badge-partial">₹${order.balance.toLocaleString('en-IN')} Due</span>`;

      tr.innerHTML = `
        <td>
          <strong>#${order.id}</strong>
          ${order.priority === 'Express' ? '<span class="badge badge-express" style="margin-left:4px;">Express</span>' : ''}
        </td>
        <td>
          <div style="font-weight:600;">${order.customerName}</div>
          <small style="color:#64748b;">${order.customerPhone}</small>
        </td>
        <td>
          <div style="font-weight:500;">${order.title}</div>
          <small style="color:#64748b;">${order.category}</small>
        </td>
        <td>${order.trialDate ? `📅 ${order.trialDate}` : '—'}</td>
        <td><strong>📦 ${order.deliveryDate || '—'}</strong></td>
        <td>${statusBadge}</td>
        <td>${paymentBadge}</td>
        <td>
          <div style="display:flex; gap:6px;">
            <button class="btn btn-sm btn-whatsapp" title="WhatsApp Message" onclick="app.openWhatsAppModal('${order.id}')">
              📱 WhatsApp
            </button>
            <button class="btn btn-sm btn-outline" title="Receipt" onclick="app.viewInvoice('${order.id}')">
              Receipt
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  filterOrdersByOverdue() {
    this.switchTab('orders');
    document.getElementById('order-date-filter').value = 'overdue';
    this.filterOrders();
  }

  // ==================== ORDERS & TRACKING ====================
  renderOrdersTable(filteredList = null) {
    const list = filteredList !== null ? filteredList : this.data.orders;
    const tbody = document.getElementById('orders-tbody');
    tbody.innerHTML = '';

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:36px; color:#94a3b8;">No matching tailoring orders found.</td></tr>`;
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];

    list.slice().reverse().forEach(order => {
      const tr = document.createElement('tr');
      const statusBadge = this.getStatusBadge(order.status);
      const isPaid = Number(order.balance) <= 0;
      const isOverdue = order.deliveryDate && order.deliveryDate < todayStr && order.status !== 'Delivered' && order.status !== 'Completed';

      const billingBadge = isPaid
        ? `<span class="badge badge-paid">Fully Paid</span>`
        : `<span class="badge badge-partial">₹${order.balance.toLocaleString('en-IN')} Due</span>`;

      tr.innerHTML = `
        <td>
          <strong>#${order.id}</strong>
          ${order.priority === 'Express' ? '<span class="badge badge-express" style="display:block; margin-top:2px;">Express</span>' : ''}
        </td>
        <td>
          <div style="font-weight:600;">${order.customerName}</div>
          <small style="color:#64748b;">${order.customerPhone}</small>
        </td>
        <td><span class="badge badge-cat">${order.category}</span></td>
        <td>
          <div style="max-width:260px; font-weight:600; color:#0f172a;">${order.title}</div>
          <small style="color:#64748b;">Fabric: ${order.fabric || 'Client Provided'} (${order.fabricSource})</small>
        </td>
        <td>${order.trialDate ? `<span style="font-weight:600;">${order.trialDate}</span>` : '—'}</td>
        <td>
          <strong style="${isOverdue ? 'color:#dc2626;' : ''}">${order.deliveryDate}</strong>
          ${isOverdue ? '<span class="badge badge-unpaid" style="display:block; font-size:0.65rem; margin-top:2px;">Overdue</span>' : ''}
        </td>
        <td>
          <select class="form-select" style="padding:4px 8px; font-size:0.775rem;" onchange="app.quickUpdateStatus('${order.id}', this.value)">
            ${['Received', 'Cutting', 'Stitching', 'Trial Ready', 'Completed', 'Delivered'].map(s => `
              <option value="${s}" ${s === order.status ? 'selected' : ''}>${s}</option>
            `).join('')}
          </select>
        </td>
        <td>
          <div>Total: <strong>₹${order.total.toLocaleString('en-IN')}</strong></div>
          <div>Paid: ₹${order.advance.toLocaleString('en-IN')}</div>
          ${billingBadge}
        </td>
        <td>
          <div style="display:flex; flex-direction:column; gap:4px; min-width:140px;">
            <button class="btn btn-sm btn-whatsapp" onclick="app.openWhatsAppModal('${order.id}')">
              📱 WhatsApp
            </button>
            <div style="display:flex; gap:4px;">
              <button class="btn btn-sm btn-outline" style="flex:1;" title="Record Payment" onclick="app.openPaymentModal('${order.id}')">
                ₹ Pay
              </button>
              <button class="btn btn-sm btn-outline" style="flex:1;" title="Receipt" onclick="app.viewInvoice('${order.id}')">
                Bill
              </button>
              <button class="btn btn-sm btn-outline" title="Edit Order" onclick="app.editOrder('${order.id}')">
                ✎
              </button>
              <button class="btn btn-sm btn-danger-outline" title="Delete Order" onclick="app.deleteOrder('${order.id}')">
                &times;
              </button>
            </div>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  filterOrders() {
    const query = (document.getElementById('order-search').value || '').toLowerCase().trim();
    const statusFilter = document.getElementById('order-status-filter').value;
    const catFilter = document.getElementById('order-category-filter').value;
    const dateFilter = document.getElementById('order-date-filter').value;

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const next7Days = new Date();
    next7Days.setDate(next7Days.getDate() + 7);
    const next7DaysStr = next7Days.toISOString().split('T')[0];

    const filtered = this.data.orders.filter(order => {
      const matchQuery = !query || 
        order.id.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query) ||
        (order.customerPhone && order.customerPhone.includes(query)) ||
        order.title.toLowerCase().includes(query);

      const matchStatus = statusFilter === 'all' || order.status === statusFilter;
      const matchCat = catFilter === 'all' || order.category === catFilter;

      let matchDate = true;
      if (dateFilter === 'trial-this-week') {
        matchDate = order.trialDate && order.trialDate >= todayStr && order.trialDate <= next7DaysStr;
      } else if (dateFilter === 'delivery-this-week') {
        matchDate = order.deliveryDate && order.deliveryDate >= todayStr && order.deliveryDate <= next7DaysStr;
      } else if (dateFilter === 'overdue') {
        matchDate = order.deliveryDate && order.deliveryDate < todayStr && order.status !== 'Delivered' && order.status !== 'Completed';
      }

      return matchQuery && matchStatus && matchCat && matchDate;
    });

    this.renderOrdersTable(filtered);
  }

  quickUpdateStatus(orderId, newStatus) {
    const order = this.data.orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      this.saveData();
      this.renderDashboard();
      this.showToast(`Order #${orderId} moved to "${newStatus}"`);
    }
  }

  openNewOrderModal(prefilled = {}) {
    document.getElementById('modal-order-title').textContent = 'Create New Tailoring Order';
    document.getElementById('order-form').reset();
    document.getElementById('order-id').value = '';
    
    // Default dates
    const delivery = new Date();
    delivery.setDate(delivery.getDate() + 7);
    const deliveryStr = delivery.toISOString().split('T')[0];

    const trial = new Date();
    trial.setDate(trial.getDate() + 4);
    const trialStr = trial.toISOString().split('T')[0];

    document.getElementById('order-trial-date').value = trialStr;
    document.getElementById('order-delivery-date').value = deliveryStr;
    document.getElementById('order-balance').value = '0';
    
    this.populateCustomerDropdowns();

    // Prefill from catalog or customer if provided
    if (prefilled.customerId) {
      document.getElementById('order-cust-id').value = prefilled.customerId;
    }
    if (prefilled.category) {
      document.getElementById('order-category').value = prefilled.category;
    }
    if (prefilled.title) {
      document.getElementById('order-title').value = prefilled.title;
    }
    if (prefilled.price) {
      document.getElementById('order-total').value = prefilled.price;
      this.calculateBalance();
    }

    this.openModal('modal-order');
  }

  editOrder(orderId) {
    const order = this.data.orders.find(o => o.id === orderId);
    if (!order) return;

    document.getElementById('modal-order-title').textContent = `Edit Order #${order.id}`;
    document.getElementById('order-id').value = order.id;
    this.populateCustomerDropdowns();

    document.getElementById('order-cust-id').value = order.customerId;
    document.getElementById('order-category').value = order.category;
    document.getElementById('order-title').value = order.title;
    document.getElementById('order-fabric').value = order.fabric || '';
    document.getElementById('order-fabric-source').value = order.fabricSource || 'Client Provided';
    document.getElementById('order-trial-date').value = order.trialDate || '';
    document.getElementById('order-delivery-date').value = order.deliveryDate || '';
    document.getElementById('order-status').value = order.status;
    document.getElementById('order-priority').value = order.priority || 'Standard';
    document.getElementById('order-total').value = order.total;
    document.getElementById('order-advance').value = order.advance;
    document.getElementById('order-balance').value = order.balance;
    document.getElementById('order-payment-method').value = order.paymentMethod || 'UPI / Online';
    document.getElementById('order-notes').value = order.notes || '';

    this.openModal('modal-order');
  }

  calculateBalance() {
    const total = parseFloat(document.getElementById('order-total').value) || 0;
    const advance = parseFloat(document.getElementById('order-advance').value) || 0;
    const balance = Math.max(0, total - advance);
    document.getElementById('order-balance').value = balance;
  }

  saveOrder(e) {
    e.preventDefault();
    const idInput = document.getElementById('order-id').value;
    const custId = document.getElementById('order-cust-id').value;
    const customer = this.data.customers.find(c => c.id === custId);
    
    if (!customer) {
      alert("Please select a registered customer.");
      return;
    }

    const total = parseFloat(document.getElementById('order-total').value) || 0;
    const advance = parseFloat(document.getElementById('order-advance').value) || 0;
    const balance = Math.max(0, total - advance);

    const existingOrder = idInput ? this.data.orders.find(o => o.id === idInput) : null;
    const payments = existingOrder && existingOrder.payments ? existingOrder.payments : [];

    // If new order and advance > 0, record initial payment
    if (!existingOrder && advance > 0) {
      payments.push({
        id: `PAY-${Date.now()}`,
        amount: advance,
        mode: document.getElementById('order-payment-method').value,
        date: new Date().toISOString().split('T')[0],
        notes: "Initial advance payment on booking"
      });
    }

    const orderData = {
      id: idInput || `ZM-${Math.floor(1000 + Math.random() * 9000)}`,
      customerId: custId,
      customerName: customer.name,
      customerPhone: customer.phone,
      category: document.getElementById('order-category').value,
      title: document.getElementById('order-title').value,
      fabric: document.getElementById('order-fabric').value,
      fabricSource: document.getElementById('order-fabric-source').value,
      trialDate: document.getElementById('order-trial-date').value,
      deliveryDate: document.getElementById('order-delivery-date').value,
      status: document.getElementById('order-status').value,
      priority: document.getElementById('order-priority').value,
      total: total,
      advance: advance,
      balance: balance,
      paymentMethod: document.getElementById('order-payment-method').value,
      notes: document.getElementById('order-notes').value,
      payments: payments,
      createdAt: idInput ? (existingOrder?.createdAt || new Date().toISOString().split('T')[0]) : new Date().toISOString().split('T')[0]
    };

    if (idInput) {
      const index = this.data.orders.findIndex(o => o.id === idInput);
      if (index !== -1) {
        this.data.orders[index] = orderData;
        this.showToast(`Order #${orderData.id} updated!`);
      }
    } else {
      this.data.orders.push(orderData);
      this.showToast(`Order #${orderData.id} booked successfully!`);
    }

    this.saveData();
    this.closeModal('modal-order');
    this.renderOrdersTable();
    this.renderDashboard();
    this.renderInvoicesTable();
  }

  deleteOrder(orderId) {
    if (confirm(`Are you sure you want to delete order #${orderId}?`)) {
      this.data.orders = this.data.orders.filter(o => o.id !== orderId);
      this.saveData();
      this.renderOrdersTable();
      this.renderDashboard();
      this.renderInvoicesTable();
      this.showToast(`Order #${orderId} deleted.`);
    }
  }

  // ==================== PAYMENTS TRACKING ====================
  openPaymentModal(orderId) {
    const order = this.data.orders.find(o => o.id === orderId);
    if (!order) return;

    this.activePaymentOrderId = orderId;
    document.getElementById('pay-order-id').value = order.id;
    document.getElementById('pay-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('pay-amount').value = order.balance > 0 ? order.balance : '';

    const summary = document.getElementById('pay-order-summary');
    summary.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
        <strong>Order #${order.id}</strong> <span>${order.customerName}</span>
      </div>
      <div>Item: <strong>${order.title}</strong></div>
      <div style="margin-top:6px; display:flex; justify-content:space-between; font-weight:600;">
        <span>Total: ₹${order.total}</span>
        <span style="color:#059669;">Paid: ₹${order.advance}</span>
        <span style="color:#dc2626;">Balance: ₹${order.balance}</span>
      </div>
    `;

    this.openModal('modal-payment');
  }

  savePayment(e) {
    e.preventDefault();
    const orderId = this.activePaymentOrderId;
    const order = this.data.orders.find(o => o.id === orderId);
    if (!order) return;

    const amount = parseFloat(document.getElementById('pay-amount').value) || 0;
    const mode = document.getElementById('pay-mode').value;
    const date = document.getElementById('pay-date').value;
    const notes = document.getElementById('pay-notes').value;

    if (amount <= 0) {
      alert("Please enter a valid payment amount.");
      return;
    }

    if (!order.payments) order.payments = [];
    order.payments.push({
      id: `PAY-${Date.now()}`,
      amount: amount,
      mode: mode,
      date: date,
      notes: notes || "Payment received"
    });

    order.advance = (parseFloat(order.advance) || 0) + amount;
    order.balance = Math.max(0, order.total - order.advance);

    // If fully paid, mark status appropriately if finished
    this.saveData();
    this.closeModal('modal-payment');
    this.renderOrdersTable();
    this.renderDashboard();
    this.renderInvoicesTable();
    this.showToast(`Payment of ₹${amount} recorded for Order #${orderId}!`);
  }

  // ==================== WHATSAPP INTEGRATION ====================
  openWhatsAppModal(orderId) {
    const order = this.data.orders.find(o => o.id === orderId);
    if (!order) return;

    this.activeWhatsAppOrderId = orderId;
    document.getElementById('wa-recipient-phone').value = order.customerPhone || '';
    this.updateWhatsAppPreview();
    this.openModal('modal-whatsapp');
  }

  updateWhatsAppPreview() {
    const orderId = this.activeWhatsAppOrderId;
    const order = this.data.orders.find(o => o.id === orderId);
    if (!order) return;

    const templateType = document.getElementById('wa-template-type').value;
    const s = this.data.settings;

    let msg = "";
    switch (templateType) {
      case 'booking':
        msg = `Hello *${order.customerName}*,\n\nThank you for choosing *${s.businessName}*! ✂️\nYour tailoring order *#${order.id}* for *${order.title}* has been confirmed.\n\n📅 *Trial Date:* ${order.trialDate || 'Will be informed'}\n📦 *Delivery Date:* ${order.deliveryDate}\n💰 *Total:* ₹${order.total}\n💵 *Advance Paid:* ₹${order.advance}\n⏳ *Balance Due:* ₹${order.balance}\n\nWe look forward to giving you the perfect fit!\n\n_${s.businessName}_ | ${s.phone}`;
        break;
      case 'trial':
        msg = `Hello *${order.customerName}*,\n\nExciting news from *${s.businessName}*! 🪡\nYour outfit for order *#${order.id}* (*${order.title}*) is ready for trial fitting!\n\nKindly visit our studio at your earliest convenience to ensure a flawless finish and fitting.\n\nStudio Address: ${s.address}\n\n_${s.businessName}_`;
        break;
      case 'ready':
        msg = `Hello *${order.customerName}*,\n\nYour tailoring order *#${order.id}* (*${order.title}*) is completed and ready for pickup at *${s.businessName}*! 🎉\n\n💰 *Balance to pay upon delivery:* ₹${order.balance}\n\nWe look forward to seeing you!\n\n_${s.businessName}_ | ${s.phone}`;
        break;
      case 'delivered':
        msg = `Hello *${order.customerName}*,\n\nThank you for visiting *${s.businessName}*! ⭐\nWe hope you love your new outfit (*#${order.id}*). If you need any minor fit adjustments, please let us know within 7 days.\n\nIt was a true pleasure tailoring for you!\n\n_${s.businessName}_`;
        break;
      case 'payment':
        msg = `Hello *${order.customerName}*,\n\nPayment receipt for tailoring order *#${order.id}* at *${s.businessName}*.\n\n*Garment:* ${order.title}\n*Total Cost:* ₹${order.total}\n*Paid:* ₹${order.advance}\n*Outstanding Balance:* ₹${order.balance}\n\nThank you for your valued business!\n\n_${s.businessName}_`;
        break;
    }

    document.getElementById('wa-message-preview').value = msg;
  }

  sendWhatsAppMessage() {
    const rawPhone = document.getElementById('wa-recipient-phone').value;
    const message = document.getElementById('wa-message-preview').value;

    let phone = rawPhone.replace(/[^0-9]/g, '');
    if (phone.length === 10) {
      phone = '91' + phone; // Add India country code by default
    }

    if (!phone) {
      alert("Please provide a valid phone number with country code.");
      return;
    }

    const encoded = encodeURIComponent(message);
    const waUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encoded}`;
    window.open(waUrl, '_blank');
    this.closeModal('modal-whatsapp');
    this.showToast('WhatsApp launched!');
  }

  shareInvoiceWhatsApp() {
    const orderId = this.currentInvoiceOrderId;
    if (orderId) {
      this.closeModal('modal-invoice');
      this.openWhatsAppModal(orderId);
    }
  }

  // ==================== CUSTOMERS & MEASUREMENTS ====================
  populateCustomerDropdowns() {
    const select = document.getElementById('order-cust-id');
    if (!select) return;

    select.innerHTML = '';
    if (this.data.customers.length === 0) {
      select.innerHTML = '<option value="">No registered customers. Please add one first.</option>';
      return;
    }

    this.data.customers.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = `${c.name} (${c.phone}) - ${c.gender}`;
      select.appendChild(opt);
    });
  }

  renderCustomersGrid(filteredList = null) {
    if (!Array.isArray(this.data.customers)) {
      this.data.customers = [];
    }
    const list = filteredList !== null ? filteredList : this.data.customers;
    const grid = document.getElementById('customers-grid');
    if (grid) {
      grid.innerHTML = '';

      if (list.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:40px; color:#94a3b8;">No customer profiles found. Click "+ Register Customer" to start!</div>`;
      } else {
        list.slice().reverse().forEach(cust => {
          const card = document.createElement('div');
          card.className = 'customer-card';
          card.id = `cust-card-${cust.id}`;

          const initials = (cust.name || 'C').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
          const m = cust.measurements || {};
          const custOrders = (this.data.orders || []).filter(o => o.customerId === cust.id);

          card.innerHTML = `
            <div class="cust-card-header">
              <div class="cust-avatar">${initials}</div>
              <div class="cust-header-info">
                <h4>${cust.name}</h4>
                <span class="cust-phone-badge">📞 ${cust.phone} • <strong style="color:var(--primary);">${cust.gender}</strong></span>
              </div>
            </div>

            <div class="cust-meta">
              <div class="cust-meta-row">
                <span>📍 ${cust.address || 'Address not specified'}</span>
              </div>
              <div class="cust-meta-row">
                <span>📦 Total Orders: <strong>${custOrders.length}</strong></span>
              </div>
            </div>

            <div class="measurement-snapshot">
              <div class="snapshot-title">Measurements Snapshot (Inches)</div>
              <div class="snapshot-chips">
                ${m.chest ? `<span class="snapshot-chip">Chest: ${m.chest}"</span>` : ''}
                ${m.waist ? `<span class="snapshot-chip">Waist: ${m.waist}"</span>` : ''}
                ${m.shoulder ? `<span class="snapshot-chip">Shoulder: ${m.shoulder}"</span>` : ''}
                ${m.length ? `<span class="snapshot-chip">Length: ${m.length}"</span>` : ''}
                ${m.pantLength ? `<span class="snapshot-chip">Pant: ${m.pantLength}"</span>` : ''}
              </div>
            </div>

            <div class="cust-card-actions">
              <button class="btn btn-sm btn-outline" style="flex:1;" onclick="app.viewCustomerDetails('${cust.id}')">
                View & History
              </button>
              <button class="btn btn-sm btn-outline" style="flex:1;" onclick="app.editCustomer('${cust.id}')">
                Edit
              </button>
              <button class="btn btn-sm btn-primary" onclick="app.newOrderForCustomer('${cust.id}')">
                + Order
              </button>
            </div>
          `;
          grid.appendChild(card);
        });
      }
    }

    const custBadge = document.getElementById('nav-cust-count');
    if (custBadge) custBadge.textContent = this.data.customers.length;
  }

  filterCustomers() {
    const query = (document.getElementById('customer-search').value || '').toLowerCase().trim();
    const genderFilter = document.getElementById('customer-gender-filter').value;

    const filtered = (this.data.customers || []).filter(cust => {
      const matchQuery = !query ||
        (cust.name && cust.name.toLowerCase().includes(query)) ||
        (cust.phone && cust.phone.includes(query)) ||
        (cust.address && cust.address.toLowerCase().includes(query)) ||
        (cust.email && cust.email.toLowerCase().includes(query));

      const matchGender = genderFilter === 'all' || cust.gender === genderFilter;

      return matchQuery && matchGender;
    });

    this.renderCustomersGrid(filtered);
  }

  openCustomerModal(openedFromOrder = false) {
    this.openedFromOrderModal = openedFromOrder;
    const titleEl = document.getElementById('modal-customer-title');
    if (titleEl) titleEl.textContent = openedFromOrder ? 'Quick Add Customer for Order' : 'Register Customer & Measurements';
    const form = document.getElementById('customer-form');
    if (form) form.reset();
    const idInput = document.getElementById('cust-id');
    if (idInput) idInput.value = '';
    this.openModal('modal-customer');
    const nameEl = document.getElementById('cust-name');
    if (nameEl) nameEl.focus();
  }

  editCustomer(custId) {
    const c = (this.data.customers || []).find(item => item.id === custId);
    if (!c) return;

    this.openedFromOrderModal = false;
    document.getElementById('modal-customer-title').textContent = `Edit Profile: ${c.name}`;
    document.getElementById('cust-id').value = c.id;
    document.getElementById('cust-name').value = c.name || '';
    document.getElementById('cust-phone').value = c.phone || '';
    document.getElementById('cust-gender').value = c.gender || 'Men';
    document.getElementById('cust-email').value = c.email || '';
    document.getElementById('cust-address').value = c.address || '';
    document.getElementById('cust-notes').value = c.notes || '';

    const m = c.measurements || {};
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };

    setVal('m-length', m.length);
    setVal('m-chest', m.chest);
    setVal('m-waist', m.waist);
    setVal('m-shoulder', m.shoulder);
    setVal('m-sleeve-length', m.sleeveLength);
    setVal('m-armhole', m.armhole);
    setVal('m-neck', m.neck);
    setVal('m-front-neck', m.frontNeck);
    setVal('m-back-neck', m.backNeck);

    setVal('m-pant-length', m.pantLength);
    setVal('m-hip', m.hip);
    setVal('m-pant-waist', m.pantWaist);
    setVal('m-thigh', m.thigh);
    setVal('m-knee', m.knee);
    setVal('m-bottom', m.bottom);
    setVal('m-inseam', m.inseam);

    this.openModal('modal-customer');
  }

  saveCustomer(e) {
    if (e && e.preventDefault) e.preventDefault();

    const nameInput = document.getElementById('cust-name');
    const phoneInput = document.getElementById('cust-phone');

    if (!nameInput || !nameInput.value.trim()) {
      alert("Kripya customer ka naam likhein (Please enter customer name).");
      if (nameInput) nameInput.focus();
      return false;
    }

    if (!phoneInput || !phoneInput.value.trim()) {
      alert("Kripya phone number likhein (Please enter customer phone number).");
      if (phoneInput) phoneInput.focus();
      return false;
    }

    const idInput = (document.getElementById('cust-id')?.value || '').trim();

    const getVal = (id) => {
      const el = document.getElementById(id);
      return el ? el.value.trim() : '';
    };

    const measurements = {
      length: getVal('m-length'),
      chest: getVal('m-chest'),
      waist: getVal('m-waist'),
      shoulder: getVal('m-shoulder'),
      sleeveLength: getVal('m-sleeve-length'),
      armhole: getVal('m-armhole'),
      neck: getVal('m-neck'),
      frontNeck: getVal('m-front-neck'),
      backNeck: getVal('m-back-neck'),
      pantLength: getVal('m-pant-length'),
      hip: getVal('m-hip'),
      pantWaist: getVal('m-pant-waist'),
      thigh: getVal('m-thigh'),
      knee: getVal('m-knee'),
      bottom: getVal('m-bottom'),
      inseam: getVal('m-inseam')
    };

    if (!Array.isArray(this.data.customers)) {
      this.data.customers = [];
    }

    const customerObj = {
      id: idInput || `CUST-${Date.now().toString().slice(-4)}`,
      name: nameInput.value.trim(),
      phone: phoneInput.value.trim(),
      gender: getVal('cust-gender') || 'Men',
      email: getVal('cust-email'),
      address: getVal('cust-address'),
      notes: getVal('cust-notes'),
      measurements: measurements,
      createdAt: idInput 
        ? (this.data.customers.find(c => c.id === idInput)?.createdAt || new Date().toISOString().split('T')[0]) 
        : new Date().toISOString().split('T')[0]
    };

    if (idInput) {
      const idx = this.data.customers.findIndex(c => c.id === idInput);
      if (idx !== -1) {
        this.data.customers[idx] = customerObj;
      } else {
        this.data.customers.push(customerObj);
      }
    } else {
      this.data.customers.push(customerObj);
    }

    this.saveData();
    this.closeModal('modal-customer');
    this.populateCustomerDropdowns();
    this.showToast(idInput ? `Customer "${customerObj.name}" updated!` : `Customer "${customerObj.name}" registered successfully!`);

    // If opened from order modal, auto-select this customer and return to order modal
    if (this.openedFromOrderModal) {
      this.openedFromOrderModal = false;
      const orderCustSelect = document.getElementById('order-cust-id');
      if (orderCustSelect) {
        orderCustSelect.value = customerObj.id;
      }
      this.openModal('modal-order');
      this.showToast(`"${customerObj.name}" selected for this order!`);
      return false;
    }

    // Reset customer search & filter so new customer is directly visible
    const searchInput = document.getElementById('customer-search');
    if (searchInput) searchInput.value = '';
    const genderFilter = document.getElementById('customer-gender-filter');
    if (genderFilter) genderFilter.value = 'all';

    // Switch to customers tab so user immediately sees their newly added customer
    this.switchTab('customers');
    this.renderCustomersGrid();

    // Scroll and highlight newly added customer card
    setTimeout(() => {
      const card = document.getElementById(`cust-card-${customerObj.id}`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.style.transition = 'all 0.4s ease';
        card.style.borderColor = '#10b981';
        card.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.4), 0 10px 25px rgba(0,0,0,0.1)';
        setTimeout(() => {
          card.style.boxShadow = '';
        }, 3000);
      }
    }, 200);

    return false;
  }

  viewCustomerDetails(custId) {
    const cust = this.data.customers.find(c => c.id === custId);
    if (!cust) return;

    document.getElementById('view-customer-name').textContent = `${cust.name} – Tailoring Profile & History`;
    const body = document.getElementById('view-customer-body');
    const m = cust.measurements || {};
    const orders = this.data.orders.filter(o => o.customerId === cust.id);

    body.innerHTML = `
      <div style="background:#0a0f18; color:#fff; border-radius:12px; padding:18px; margin-bottom:20px; border:1px solid #1f293d;">
        <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:12px;">
          <div>
            <div style="font-size:1.3rem; font-weight:700;">${cust.name}</div>
            <div style="color:#34d399; font-size:0.875rem; margin-top:2px;">Category: ${cust.gender}</div>
            <div style="font-size:0.875rem; color:#94a3b8; margin-top:4px;">📞 Phone: ${cust.phone} | ✉️ ${cust.email || 'No email registered'}</div>
            <div style="font-size:0.875rem; color:#94a3b8;">📍 Address: ${cust.address || 'N/A'}</div>
          </div>
          <div style="display:flex; flex-direction:column; gap:8px; align-items:flex-end;">
            <button class="btn btn-sm btn-whatsapp" onclick="app.directWhatsApp('${cust.phone}', '${cust.name}')">
              📱 Chat on WhatsApp
            </button>
            <button class="btn btn-sm btn-primary" onclick="app.newOrderForCustomer('${cust.id}')">
              + Create Order
            </button>
          </div>
        </div>
      </div>

      <h4 style="color:var(--primary); font-size:0.95rem; margin-bottom:10px; text-transform:uppercase; font-weight:700;">
        Upper Body Measurements (Inches)
      </h4>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(125px, 1fr)); gap:10px; margin-bottom:18px;">
        <div class="measure-field"><label>Top Length</label><strong>${m.length || '—'}</strong></div>
        <div class="measure-field"><label>Chest / Bust</label><strong>${m.chest || '—'}</strong></div>
        <div class="measure-field"><label>Waist (Upper)</label><strong>${m.waist || '—'}</strong></div>
        <div class="measure-field"><label>Shoulder</label><strong>${m.shoulder || '—'}</strong></div>
        <div class="measure-field"><label>Sleeve Length</label><strong>${m.sleeveLength || '—'}</strong></div>
        <div class="measure-field"><label>Armhole</label><strong>${m.armhole || '—'}</strong></div>
        <div class="measure-field"><label>Neck</label><strong>${m.neck || '—'}</strong></div>
        <div class="measure-field"><label>Front Neck</label><strong>${m.frontNeck || '—'}</strong></div>
        <div class="measure-field"><label>Back Neck</label><strong>${m.backNeck || '—'}</strong></div>
      </div>

      <h4 style="color:var(--primary); font-size:0.95rem; margin-bottom:10px; text-transform:uppercase; font-weight:700;">
        Lower Body Measurements (Inches)
      </h4>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(125px, 1fr)); gap:10px; margin-bottom:18px;">
        <div class="measure-field"><label>Bottom Length</label><strong>${m.pantLength || '—'}</strong></div>
        <div class="measure-field"><label>Hip</label><strong>${m.hip || '—'}</strong></div>
        <div class="measure-field"><label>Lower Waist</label><strong>${m.pantWaist || '—'}</strong></div>
        <div class="measure-field"><label>Thigh</label><strong>${m.thigh || '—'}</strong></div>
        <div class="measure-field"><label>Knee</label><strong>${m.knee || '—'}</strong></div>
        <div class="measure-field"><label>Bottom Mori</label><strong>${m.bottom || '—'}</strong></div>
        <div class="measure-field"><label>Inseam</label><strong>${m.inseam || '—'}</strong></div>
      </div>

      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:12px; margin-bottom:20px;">
        <strong style="font-size:0.85rem; color:#475569;">Style & Tailoring Instructions:</strong>
        <p style="font-size:0.9rem; margin-top:4px;">${cust.notes || 'No special fit preferences noted.'}</p>
      </div>

      <h4 style="color:#0f172a; font-size:1rem; margin-bottom:12px; font-weight:700;">
        Order History (${orders.length})
      </h4>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Garment</th>
              <th>Trial</th>
              <th>Delivery</th>
              <th>Status</th>
              <th>Total (₹)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${orders.map(o => `
              <tr>
                <td><strong>#${o.id}</strong></td>
                <td>${o.title}</td>
                <td>${o.trialDate || '—'}</td>
                <td>${o.deliveryDate}</td>
                <td>${this.getStatusBadge(o.status)}</td>
                <td>₹${o.total.toLocaleString('en-IN')}</td>
                <td>
                  <button class="btn btn-sm btn-outline" onclick="app.viewInvoice('${o.id}')">Receipt</button>
                </td>
              </tr>
            `).join('') || `<tr><td colspan="7" style="text-align:center; color:#94a3b8; padding:16px;">No orders recorded yet.</td></tr>`}
          </tbody>
        </table>
      </div>
    `;

    this.openModal('modal-view-customer');
  }

  directWhatsApp(phone, name) {
    let clean = phone.replace(/[^0-9]/g, '');
    if (clean.length === 10) clean = '91' + clean;
    const msg = encodeURIComponent(`Hello ${name}, this is ZM Enterprises Tailoring Studio. How may we assist you today?`);
    window.open(`https://api.whatsapp.com/send?phone=${clean}&text=${msg}`, '_blank');
  }

  newOrderForCustomer(custId) {
    this.closeModal('modal-view-customer');
    this.openNewOrderModal({ customerId: custId });
  }

  // ==================== SERVICE CATALOG ====================
  renderCatalog(filterCategory = 'all') {
    const grid = document.getElementById('catalog-grid');
    grid.innerHTML = '';

    const filtered = filterCategory === 'all' 
      ? SERVICE_CATALOG 
      : SERVICE_CATALOG.filter(s => s.category === filterCategory);

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'catalog-card';
      card.innerHTML = `
        <div class="catalog-card-header">
          <div>
            <span class="badge badge-cat" style="margin-bottom:6px;">${item.category}</span>
            <h4>${item.name}</h4>
          </div>
          <div class="catalog-price">From ₹${item.price.toLocaleString('en-IN')}</div>
        </div>

        <p class="catalog-desc">${item.desc}</p>

        <div class="catalog-details">
          <div>⏱️ Turnaround: <strong>${item.turnaround}</strong></div>
          <div>✂️ ${item.fabricTip}</div>
        </div>

        <button class="btn btn-primary" style="width:100%;" onclick="app.bookFromCatalog('${item.id}')">
          + Book This Service
        </button>
      `;
      grid.appendChild(card);
    });
  }

  filterCatalog() {
    const cat = document.getElementById('catalog-category-filter').value;
    this.renderCatalog(cat);
  }

  bookFromCatalog(serviceId) {
    const item = SERVICE_CATALOG.find(s => s.id === serviceId);
    if (!item) return;

    this.openNewOrderModal({
      category: item.category,
      title: item.name,
      price: item.price
    });
  }

  // ==================== INVOICES & BILLING ====================
  renderInvoicesTable(filteredList = null) {
    const list = filteredList !== null ? filteredList : this.data.orders;
    const tbody = document.getElementById('invoices-tbody');
    tbody.innerHTML = '';

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:32px; color:#94a3b8;">No invoices found.</td></tr>`;
      return;
    }

    list.slice().reverse().forEach(order => {
      const tr = document.createElement('tr');
      const isPaid = Number(order.balance) <= 0;
      const statusBadge = isPaid
        ? `<span class="badge badge-paid">Fully Paid</span>`
        : Number(order.advance) > 0
          ? `<span class="badge badge-partial">Partially Paid</span>`
          : `<span class="badge badge-unpaid">Pending</span>`;

      tr.innerHTML = `
        <td><strong>INV-${order.id.replace('ZM-', '')}</strong></td>
        <td>${order.createdAt}</td>
        <td><strong>${order.customerName}</strong></td>
        <td>#${order.id} (${order.category})</td>
        <td>₹${order.total.toLocaleString('en-IN')}</td>
        <td>₹${order.advance.toLocaleString('en-IN')}</td>
        <td><strong style="color:${isPaid ? '#059669' : '#dc2626'}">₹${order.balance.toLocaleString('en-IN')}</strong></td>
        <td>${statusBadge}</td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="app.viewInvoice('${order.id}')">
            View / Print
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  filterInvoices() {
    const query = (document.getElementById('invoice-search').value || '').toLowerCase().trim();
    const filtered = this.data.orders.filter(order => {
      const invNum = `inv-${order.id.replace('ZM-', '')}`.toLowerCase();
      return !query ||
        invNum.includes(query) ||
        order.id.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query);
    });
    this.renderInvoicesTable(filtered);
  }

  viewInvoice(orderId) {
    const order = this.data.orders.find(o => o.id === orderId);
    if (!order) return;

    this.currentInvoiceOrderId = orderId;
    const cust = this.data.customers.find(c => c.id === order.customerId) || {
      name: order.customerName,
      phone: order.customerPhone || "N/A",
      address: "N/A",
      email: ""
    };

    const s = this.data.settings;
    const invNumber = `INV-${order.id.replace('ZM-', '')}`;
    const isPaid = Number(order.balance) <= 0;

    const area = document.getElementById('invoice-printable-area');
    area.innerHTML = `
      <div class="invoice-paper">
        <!-- Letterhead Header -->
        <div class="inv-header">
          <div class="inv-brand">
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:6px;">
              <div class="brand-badge" style="width:38px; height:38px; font-size:1.1rem;">ZM</div>
              <h2 style="margin:0;">${s.businessName}</h2>
            </div>
            <p style="font-weight:600; color:var(--primary);">${s.tagline}</p>
            <p style="margin-top:4px;">📍 ${s.address}</p>
            <p>📞 Phone: ${s.phone} | ✉️ ${s.email}</p>
          </div>
          <div class="inv-meta">
            <div class="inv-title">TAX INVOICE / RECEIPT</div>
            <div class="inv-meta-line"><strong>Invoice No:</strong> ${invNumber}</div>
            <div class="inv-meta-line"><strong>Order No:</strong> #${order.id}</div>
            <div class="inv-meta-line"><strong>Date:</strong> ${order.createdAt}</div>
            <div class="inv-meta-line"><strong>Trial Date:</strong> ${order.trialDate || 'N/A'}</div>
            <div class="inv-meta-line"><strong>Delivery Date:</strong> ${order.deliveryDate}</div>
          </div>
        </div>

        <!-- Billed to & Order Status -->
        <div class="inv-parties">
          <div class="inv-box">
            <h5>Customer Details (Billed To)</h5>
            <p><strong>${cust.name}</strong></p>
            <p>Phone: ${cust.phone}</p>
            ${cust.email ? `<p>Email: ${cust.email}</p>` : ''}
            <p>Address: ${cust.address || 'N/A'}</p>
          </div>
          <div class="inv-box">
            <h5>Garment & Workshop Details</h5>
            <p><strong>Category:</strong> ${order.category}</p>
            <p><strong>Production Stage:</strong> ${order.status}</p>
            <p><strong>Fabric:</strong> ${order.fabric || 'Client Provided'} (${order.fabricSource})</p>
            <p><strong>Priority:</strong> ${order.priority}</p>
          </div>
        </div>

        <!-- Itemized Table -->
        <table class="inv-table">
          <thead>
            <tr>
              <th style="width:50px;">#</th>
              <th>Description / Garment Specification</th>
              <th style="width:140px;">Category</th>
              <th style="width:140px; text-align:right;">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <div style="font-weight:700;">${order.title}</div>
                <div style="font-size:0.8rem; color:#64748b; margin-top:3px;">
                  ${order.notes ? `Notes: ${order.notes}` : 'Custom tailoring, finishing and fitting in accordance with customer measurements.'}
                </div>
              </td>
              <td>${order.category}</td>
              <td style="text-align:right; font-weight:700;">₹${order.total.toLocaleString('en-IN')}</td>
            </tr>
          </tbody>
        </table>

        <!-- Summary Totals -->
        <div class="inv-summary-box">
          <table class="inv-summary-table">
            <tr>
              <td>Subtotal:</td>
              <td>₹${order.total.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td>Total Paid / Advance:</td>
              <td style="color:#059669;">- ₹${order.advance.toLocaleString('en-IN')} (${order.paymentMethod || 'Cash'})</td>
            </tr>
            <tr class="inv-total-row">
              <td>Balance Due:</td>
              <td>₹${order.balance.toLocaleString('en-IN')}</td>
            </tr>
          </table>
        </div>

        <!-- Payment Status Banner -->
        <div style="padding:12px 18px; border-radius:8px; margin-bottom:20px; font-weight:700; text-align:center; ${isPaid ? 'background:#ecfdf5; color:#047857; border:1px solid #a7f3d0;' : 'background:#fffbeb; color:#b45309; border:1px solid #fde68a;'}">
          ${isPaid ? '✔ PAYMENT COMPLETED IN FULL - THANK YOU FOR CHOOSING ZM ENTERPRISES!' : `⏳ OUTSTANDING BALANCE OF ₹${order.balance.toLocaleString('en-IN')} DUE UPON TRIAL OR DELIVERY`}
        </div>

        <!-- Terms Footer -->
        <div class="inv-footer">
          <p><strong>Terms & Conditions:</strong> ${s.terms}</p>
          <p style="margin-top:6px;">Computer generated tax invoice issued by ZM Enterprises Tailoring Studio.</p>
        </div>
      </div>
    `;

    this.openModal('modal-invoice');
  }

  // ==================== SETTINGS & BACKUP ====================
  renderSettings() {
    const s = this.data.settings || {};
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };
    setVal('setting-biz-name', s.businessName);
    setVal('setting-biz-tagline', s.tagline);
    setVal('setting-biz-phone', s.phone);
    setVal('setting-biz-email', s.email);
    setVal('setting-biz-address', s.address);
    setVal('setting-biz-terms', s.terms);
  }

  saveSettings(e) {
    if (e && e.preventDefault) e.preventDefault();
    const getVal = (id) => {
      const el = document.getElementById(id);
      return el ? el.value.trim() : '';
    };
    this.data.settings = {
      businessName: getVal('setting-biz-name') || "ZM Enterprises",
      tagline: getVal('setting-biz-tagline'),
      phone: getVal('setting-biz-phone'),
      email: getVal('setting-biz-email'),
      address: getVal('setting-biz-address'),
      terms: getVal('setting-biz-terms')
    };

    this.saveData();
    this.showToast('Business & WhatsApp details updated!');
  }

  exportData() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    const dateStr = new Date().toISOString().split('T')[0];
    downloadAnchor.setAttribute("download", `ZM_Enterprises_Backup_${dateStr}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    this.showToast('Backup file downloaded successfully!');
  }

  importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed.customers && parsed.orders) {
          this.data = parsed;
          this.saveData();
          this.init();
          this.showToast('Backup restored successfully!');
        } else {
          alert('Invalid backup file format.');
        }
      } catch (err) {
        alert('Failed to parse backup JSON file.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }

  resetDemoData() {
    if (confirm('Are you sure you want to reset all records to the original sample data for ZM Enterprises? Any unsaved edits will be overwritten.')) {
      this.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
      this.saveData();
      this.init();
      this.showToast('Reset to original ZM Enterprises demo data completed.');
    }
  }

  // ==================== MODAL UTILITIES ====================
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  }

  getStatusBadge(status) {
    const map = {
      'Received': '<span class="badge badge-received">● Received</span>',
      'Cutting': '<span class="badge badge-cutting">● Cutting</span>',
      'Stitching': '<span class="badge badge-stitching">● Stitching</span>',
      'Trial Ready': '<span class="badge badge-trial-ready">● Trial Ready</span>',
      'Completed': '<span class="badge badge-completed">● Completed</span>',
      'Delivered': '<span class="badge badge-delivered">✔ Delivered</span>'
    };
    return map[status] || `<span class="badge badge-received">${status}</span>`;
  }
}

// Instantiate Global Application
const app = new TailorBusinessApp();
window.app = app;
