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

// Standard Tailoring Service Catalog (Prices unset by default - set by user)
const DEFAULT_SERVICES = [
  {
    id: "CAT-101",
    name: "Men's Bespoke 3-Piece Suit",
    category: "Custom Stitching",
    price: null,
    turnaround: "7 - 10 Days",
    desc: "Coat, trousers and tailored waistcoat. Hand-finished lapel with canvas structure.",
    fabricTip: "Recommended: Italian Wool, Poly-Viscose or Linen."
  },
  {
    id: "CAT-102",
    name: "Royal Sherwani & Kurta Set",
    category: "Ethnic Wear",
    price: null,
    turnaround: "8 - 12 Days",
    desc: "Festive or wedding sherwani with matching churidar and stole bordering.",
    fabricTip: "Recommended: Silk Brocade, Raw Silk or Velvet."
  },
  {
    id: "CAT-103",
    name: "Men's Formal Blazer & Trousers",
    category: "Custom Stitching",
    price: null,
    turnaround: "5 - 7 Days",
    desc: "Single/double breasted blazer with slim-cut formal trousers.",
    fabricTip: "Recommended: Wool blend, Tweed or Cotton Twill."
  },
  {
    id: "CAT-104",
    name: "Men's Kurta Pyjama / Pathani",
    category: "Custom Stitching",
    price: null,
    turnaround: "3 - 5 Days",
    desc: "Traditional or modern Pathani suit with Mandarin collar and cuffed sleeves.",
    fabricTip: "Recommended: Pure Cotton, Linen or Silk blend."
  },
  {
    id: "CAT-105",
    name: "Bridal Lehenga & Designer Blouse",
    category: "Ethnic Wear",
    price: null,
    turnaround: "10 - 15 Days",
    desc: "Full flare kali lehenga with canvas & cancan netting, handcrafted choli.",
    fabricTip: "Recommended: Silk, Georgette, Velvet with Zari work."
  },
  {
    id: "CAT-106",
    name: "Designer Heavy Anarkali Suit",
    category: "Ethnic Wear",
    price: null,
    turnaround: "7 - 9 Days",
    desc: "Floor-length multi-kali Anarkali with pants and decorated dupatta.",
    fabricTip: "Recommended: Pure Georgette, Chanderi or Chiffon."
  },
  {
    id: "CAT-107",
    name: "Designer Padded Saree Blouse",
    category: "Custom Stitching",
    price: null,
    turnaround: "2 - 4 Days",
    desc: "Custom neckline, princess cut, concealed zipper with padded cups.",
    fabricTip: "Recommended: Brocade, Silk or Jacquard with lining."
  },
  {
    id: "CAT-108",
    name: "Women's Salwar Suit & Churidar",
    category: "Custom Stitching",
    price: null,
    turnaround: "3 - 5 Days",
    desc: "Everyday or semi-formal kameez with salwar, patiala or pants.",
    fabricTip: "Recommended: Cotton, Crepe or Cambric."
  },
  {
    id: "CAT-109",
    name: "School Uniform Batch Set",
    category: "Uniform",
    price: null,
    turnaround: "5 - 7 Days",
    desc: "Durable school uniform shirt and trousers or skirt with badge stitching.",
    fabricTip: "Recommended: Dacron Poly-Cotton Blend."
  },
  {
    id: "CAT-110",
    name: "Corporate Staff Blazer & Shirt",
    category: "Uniform",
    price: null,
    turnaround: "7 - 10 Days",
    desc: "Institutional or corporate blazer with custom embroidered logo crest.",
    fabricTip: "Recommended: Durable Poly-Viscose suiting."
  },
  {
    id: "CAT-111",
    name: "Suit / Blazer Resizing & Alteration",
    category: "Alteration",
    price: null,
    turnaround: "1 - 2 Days",
    desc: "Waist suppression, sleeve shortening, shoulder tapering & vent adjustments.",
    fabricTip: "Applicable on client's ready garments."
  },
  {
    id: "CAT-112",
    name: "Trouser Tapering, Hemming & Waist Fix",
    category: "Alteration",
    price: null,
    turnaround: "1 Day",
    desc: "Bottom hemming alteration, waist loosening/tightening, zip replacement.",
    fabricTip: "Express 24-hour turnaround available."
  },
  {
    id: "CAT-113",
    name: "Kids Festive Kurta Set / Sherwani",
    category: "Ethnic Wear",
    price: null,
    turnaround: "4 - 6 Days",
    desc: "Comfort-tailored festive outfit for boys and girls with soft lining.",
    fabricTip: "Recommended: Cotton-Silk or Breathable Rayon."
  }
];

// Clean Production Data Configuration
const DEFAULT_DATA = {
  settings: {
    businessName: "ZM Enterprises",
    tagline: "Professional School & Corporate Uniform Stitching | Tailoring Solutions in Hyderabad",
    phone: "", // Configurable: user configures their actual WhatsApp number in Store Settings
    email: "contact@zmenterprises.com",
    address: "Shop No. 12, Commercial Complex, Hyderabad, Telangana - 500001",
    city: "Hyderabad",
    state: "Telangana",
    terms: "Fitting alterations accommodated within 7 days of delivery. Sample approval prior to bulk uniform production."
  },
  services: DEFAULT_SERVICES,
  customers: [],
  orders: [],
  enquiries: [],
  uniformGallery: []
};

class TailorBusinessApp {
  constructor() {
    window.app = this;
    this.data = this.loadData();
    const hash = window.location.hash ? window.location.hash.substring(1) : '';
    const validTabs = ['home', 'uniforms', 'enquiry', 'contact', 'dashboard', 'enquiries-admin', 'orders', 'customers', 'catalog', 'invoices', 'settings'];
    this.currentTab = validTabs.includes(hash) ? hash : 'home';
    this.activeWhatsAppOrderId = null;
    this.activePaymentOrderId = null;
    this.openedFromOrderModal = false;
    this.activeViewEnquiryId = null;
    this.activeSubmittedEnquiry = null;
    this.galleryFilter = 'all';
    this.uploadedPhotoDataUrl = null;
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
        const parsed = JSON.parse(stored);
        return this.cleanDemoData(parsed);
      }
    } catch (e) {
      console.error("Failed to parse storage data", e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }

  cleanDemoData(data) {
    if (!data || typeof data !== 'object') {
      return JSON.parse(JSON.stringify(DEFAULT_DATA));
    }

    // Preserve business settings
    if (!data.settings) {
      data.settings = JSON.parse(JSON.stringify(DEFAULT_DATA.settings));
    }
    if (!Array.isArray(data.customers)) {
      data.customers = [];
    }
    if (!Array.isArray(data.orders)) {
      data.orders = [];
    }
    if (!Array.isArray(data.services) || data.services.length === 0) {
      data.services = JSON.parse(JSON.stringify(DEFAULT_SERVICES));
    }
    if (!Array.isArray(data.enquiries)) {
      data.enquiries = [];
    }
    if (!Array.isArray(data.uniformGallery)) {
      data.uniformGallery = [];
    }
    if (!data.settings.city) data.settings.city = "Hyderabad";
    if (!data.settings.state) data.settings.state = "Telangana";
    if (data.settings.phone === "919876543210") {
      data.settings.phone = ""; // Reset demo placeholder
    }

    // Safely identify and remove ONLY confirmed demo records
    const DEMO_CUSTOMER_IDS = new Set(['CUST-101', 'CUST-102', 'CUST-103', 'CUST-104']);
    const DEMO_NAMES = new Set(['Tariq Ahmed', 'Fatima Sana', 'Green Valley Public School', 'Priya Verma']);
    const DEMO_ORDER_IDS = new Set(['ZM-1001', 'ZM-1002', 'ZM-1003', 'ZM-1004']);

    const initialCustCount = data.customers.length;
    data.customers = data.customers.filter(c => {
      const isDemo = c && DEMO_CUSTOMER_IDS.has(c.id) && DEMO_NAMES.has(c.name);
      return !isDemo; // Preserve all genuine customer records
    });

    const initialOrderCount = data.orders.length;
    data.orders = data.orders.filter(o => {
      const isDemo = o && DEMO_ORDER_IDS.has(o.id) && (DEMO_CUSTOMER_IDS.has(o.customerId) || DEMO_NAMES.has(o.customerName));
      return !isDemo; // Preserve all genuine orders
    });

    // Reset old demo/sample fake prices in services if present
    const DEMO_FAKE_PRICES = new Set([7500, 6500, 4800, 1200, 8500, 4500, 1400, 1100, 850, 3200, 650, 250, 1600]);
    data.services.forEach(s => {
      if (s && DEMO_FAKE_PRICES.has(Number(s.price))) {
        s.price = null; // Reset to "Price not set" so user configures actual business rates
      }
    });

    // Save cleaned dataset immediately if demo records were pruned
    if (initialCustCount !== data.customers.length || initialOrderCount !== data.orders.length) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (err) {
        console.warn("Storage sync after demo cleaning:", err);
      }
    }

    return data;
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
    this.updateContactDisplay();
    this.updateEnquiryBadge();
    this.renderUniformGallery();
    this.renderEnquiriesAdmin();
    this.renderDashboard();
    this.renderOrdersTable();
    this.renderCustomersGrid();
    this.renderCatalog();
    this.renderInvoicesTable();
    this.switchTab(this.currentTab);
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

    // Hash change listener for direct bookmarking
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.substring(1);
      if (hash && hash !== this.currentTab) {
        this.switchTab(hash);
      }
    });
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
    const validTabs = ['home', 'uniforms', 'enquiry', 'contact', 'dashboard', 'enquiries-admin', 'orders', 'customers', 'catalog', 'invoices', 'settings'];
    if (!validTabs.includes(tabName)) {
      tabName = 'home';
    }
    this.currentTab = tabName;

    // Update active nav-item in sidebar
    document.querySelectorAll('.nav-item').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tabName);
    });

    // Update active tab-view
    document.querySelectorAll('.tab-view').forEach(view => {
      view.classList.remove('active');
    });

    const activeView = document.getElementById(`view-${tabName}`);
    if (activeView) activeView.classList.add('active');

    // Update topbar navigation pills
    const pillHome = document.getElementById('pill-home');
    const pillUniforms = document.getElementById('pill-uniforms');
    const pillEnquiry = document.getElementById('pill-enquiry');
    const pillDashboard = document.getElementById('pill-dashboard');
    if (pillHome) pillHome.classList.toggle('active', tabName === 'home');
    if (pillUniforms) pillUniforms.classList.toggle('active', tabName === 'uniforms');
    if (pillEnquiry) pillEnquiry.classList.toggle('active', tabName === 'enquiry');
    if (pillDashboard) pillDashboard.classList.toggle('active', ['dashboard', 'enquiries-admin', 'orders', 'customers', 'catalog', 'invoices', 'settings'].includes(tabName));

    // Dynamic Topbar Actions toggle
    const isPublicTab = ['home', 'uniforms', 'enquiry', 'contact'].includes(tabName);
    const btnQuote = document.getElementById('btn-topbar-quote');
    const btnCust = document.getElementById('btn-quick-customer');
    const btnOrder = document.getElementById('btn-quick-order');

    if (btnQuote) btnQuote.style.display = isPublicTab ? 'inline-flex' : 'none';
    if (btnCust) btnCust.style.display = isPublicTab ? 'none' : 'inline-flex';
    if (btnOrder) btnOrder.style.display = isPublicTab ? 'none' : 'inline-flex';

    // Update URL hash without scroll jump
    try {
      history.replaceState(null, null, '#' + tabName);
    } catch (e) {
      // ignore
    }

    const titleMap = {
      home: "ZM Enterprises",
      uniforms: "School & Corporate Uniform Stitching",
      enquiry: "Request a Bulk Quotation",
      contact: "Contact & Workshop Location",
      dashboard: "Dashboard Overview",
      'enquiries-admin': "B2B Uniform Enquiries",
      orders: "Orders & Production Tracking",
      customers: "Customer Records & Measurements",
      catalog: "Tailoring Service Catalog & Rates",
      invoices: "Billing, Invoices & Payment History",
      settings: "Store Settings & Data Backup"
    };

    const subtitleMap = {
      home: "School & Corporate Uniform Stitching | Tailoring Solutions in Hyderabad",
      uniforms: "Comprehensive uniform manufacturing programs for schools and enterprises across Telangana",
      enquiry: "Submit your institution's uniform specifications for an itemized bulk quotation",
      contact: "Workshop & studio in Hyderabad, Telangana – Serving schools and corporate clients",
      dashboard: "Workshop production pipeline, upcoming fittings, and order deliveries",
      'enquiries-admin': "Review, track status, and convert incoming B2B uniform enquiries to production orders",
      orders: "Manage custom stitching, alterations, ethnic wear & uniform production",
      customers: "Comprehensive body measurement records for men, women, and children",
      catalog: "Explore standard service offerings, pricing, and rapid order booking",
      invoices: "Generate printable receipts, track payments, and share on WhatsApp",
      settings: "Configure store contact details, invoice headers, and export backups"
    };

    const seoTitleMap = {
      home: "ZM Enterprises | School & Corporate Uniform Stitching in Hyderabad, Telangana",
      uniforms: "School & Corporate Uniform Stitching Services in Hyderabad | ZM Enterprises",
      enquiry: "Request Bulk Uniform Stitching Quotation | ZM Enterprises Hyderabad",
      contact: "Contact ZM Enterprises | Tailoring Workshop Hyderabad, Telangana",
      dashboard: "Production Dashboard | ZM Enterprises Tailoring Suite",
      'enquiries-admin': "B2B Enquiries Pipeline | ZM Enterprises",
      orders: "Production Orders & Workflow | ZM Enterprises",
      customers: "Customer Measurements & Archiving | ZM Enterprises",
      catalog: "Tailoring Rates & Catalog | ZM Enterprises",
      invoices: "Invoices & Billing | ZM Enterprises",
      settings: "Settings & Backup | ZM Enterprises"
    };

    const pageTitle = document.getElementById('page-title');
    if (pageTitle) pageTitle.textContent = titleMap[tabName] || "ZM Enterprises";
    const pageSub = document.getElementById('page-subtitle');
    if (pageSub) pageSub.textContent = subtitleMap[tabName] || "";

    if (seoTitleMap[tabName]) {
      document.title = seoTitleMap[tabName];
    }

    if (tabName === 'home') this.updateContactDisplay();
    if (tabName === 'uniforms') this.renderUniformGallery();
    if (tabName === 'enquiries-admin') this.renderEnquiriesAdmin();
    if (tabName === 'dashboard') this.renderDashboard();
    if (tabName === 'orders') this.renderOrdersTable();
    if (tabName === 'customers') this.renderCustomersGrid();
    if (tabName === 'catalog') this.renderCatalog();
    if (tabName === 'invoices') this.renderInvoicesTable();
    if (tabName === 'settings') this.renderSettings();
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

    // Render alert banners for enquiries / trials today / overdue
    const alertsContainer = document.getElementById('dashboard-alerts-container');
    if (alertsContainer) {
      alertsContainer.innerHTML = '';

      const newEnquiries = (this.data.enquiries || []).filter(e => e.status === 'New');
      if (newEnquiries.length > 0) {
        const enqBanner = document.createElement('div');
        enqBanner.className = 'alert-banner';
        enqBanner.style.background = '#ecfdf5';
        enqBanner.style.borderColor = '#10b981';
        enqBanner.style.color = '#064e3b';
        enqBanner.innerHTML = `
          <div>
            <strong>📬 New B2B Uniform Enquiries (${newEnquiries.length}):</strong> ${newEnquiries.map(e => `${this.escapeHtml(e.schoolOrCompany)} (${this.escapeHtml(e.category)})`).join(', ')}
          </div>
          <button class="btn btn-sm btn-primary" onclick="app.switchTab('enquiries-admin')">Manage Enquiries</button>
        `;
        alertsContainer.appendChild(enqBanner);
      }

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
    if (!tbody) return;
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
          <div style="max-width:260px; font-weight:600; color:#0f172a;">${order.title} ${order.qty > 1 ? `<span class="badge badge-cat" style="font-size:0.7rem; padding:1px 5px; margin-left:4px;">Qty: ${order.qty}</span>` : ''}</div>
          <small style="color:#64748b; display:block;">Fabric: ${order.fabric || 'Client Provided'} (${order.fabricSource || 'Standard'})</small>
          ${order.fit || order.masterTailor ? `<small style="color:#059669; font-weight:600; display:block; margin-top:2px;">${order.fit || 'Regular Fit'} • ✂️ ${order.masterTailor || 'Workshop Master'}</small>` : ''}
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

  onOrderCustomerSelected(custId) {
    const preview = document.getElementById('order-customer-measures-preview');
    if (!preview) return;

    const c = (this.data.customers || []).find(item => item.id === custId);
    if (!c) {
      preview.innerHTML = `<span style="color:#64748b;">Select a customer to view their saved measurements.</span>`;
      return;
    }

    const m = c.measurements || {};
    const chips = [];
    if (m.length) chips.push(`Top: <strong>${m.length}"</strong>`);
    if (m.coatLength) chips.push(`Coat: <strong>${m.coatLength}"</strong>`);
    if (m.chest) chips.push(`Chest: <strong>${m.chest}"</strong>`);
    if (m.stomach) chips.push(`Stomach: <strong>${m.stomach}"</strong>`);
    if (m.waist) chips.push(`Waist: <strong>${m.waist}"</strong>`);
    if (m.shoulder) chips.push(`Shoulder: <strong>${m.shoulder}"</strong>`);
    if (m.sleeveLength) chips.push(`Sleeve: <strong>${m.sleeveLength}"</strong>`);
    if (m.armhole) chips.push(`Armhole: <strong>${m.armhole}"</strong>`);
    if (m.bicep) chips.push(`Bicep: <strong>${m.bicep}"</strong>`);
    if (m.neck) chips.push(`Neck: <strong>${m.neck}"</strong>`);
    if (m.pantLength) chips.push(`Pant: <strong>${m.pantLength}"</strong>`);
    if (m.pantWaist) chips.push(`Pant Waist: <strong>${m.pantWaist}"</strong>`);
    if (m.hip) chips.push(`Hip/Seat: <strong>${m.hip}"</strong>`);
    if (m.thigh) chips.push(`Thigh: <strong>${m.thigh}"</strong>`);
    if (m.knee) chips.push(`Knee: <strong>${m.knee}"</strong>`);
    if (m.bottom) chips.push(`Bottom Opening: <strong>${m.bottom}"</strong>`);
    if (m.rise) chips.push(`Crotch / Rise: <strong>${m.rise}"</strong>`);
    if (m.blouseLength) chips.push(`Blouse: <strong>${m.blouseLength}"</strong>`);
    if (m.bustPoint) chips.push(`Apex: <strong>${m.bustPoint}"</strong>`);

    preview.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; font-weight:700;">
        <span>📐 Profile Measurements: ${c.name} (${c.gender})</span>
        <button type="button" class="btn btn-sm btn-outline" style="padding:1px 8px; font-size:0.7rem;" onclick="app.editCustomer('${c.id}')">
          ✏️ Edit Profile
        </button>
      </div>
      <div style="display:flex; flex-wrap:wrap; gap:6px; font-size:0.775rem;">
        ${chips.map(chip => `<span class="snapshot-chip">${chip}</span>`).join('') || '<span style="color:#64748b;">No detailed measurements recorded yet.</span>'}
        ${m.fitType ? `<span class="snapshot-chip" style="background:#e0e7ff; color:#3730a3; font-weight:700;">Fit: ${m.fitType}</span>` : ''}
        ${m.lining ? `<span class="snapshot-chip" style="background:#fef3c7; color:#92400e; font-weight:700;">Lining: ${m.lining}</span>` : ''}
      </div>
      ${c.notes ? `<div style="margin-top:6px; font-size:0.75rem; color:#475569;"><strong>Notes:</strong> ${c.notes}</div>` : ''}
    `;

    // Auto-prefill order fit & lining from customer preferences if blank/default
    if (m.fitType) {
      const fitEl = document.getElementById('order-fit');
      if (fitEl) fitEl.value = m.fitType;
    }
    if (m.lining) {
      const liningEl = document.getElementById('order-lining');
      if (liningEl) liningEl.value = m.lining;
    }
  }

  onOrderCategoryChanged(cat) {
    const itemTypeEl = document.getElementById('order-item-type');
    if (!itemTypeEl) return;

    const catMap = {
      'Custom Stitching': "Men's Bespoke 3-Piece Suit",
      'Ethnic Wear': "Royal Sherwani Set",
      'Alteration': "Alteration & Fitting",
      'Uniform': "School Uniform Batch Set",
      'Ready-to-Wear': "Other Custom Outfit"
    };

    if (catMap[cat]) {
      itemTypeEl.value = catMap[cat];
      this.onOrderItemTypeChanged(catMap[cat]);
    }
  }

  onOrderItemTypeChanged(itemType) {
    const titleEl = document.getElementById('order-title');
    if (titleEl && (!titleEl.value.trim() || titleEl.dataset.autofilled === "true")) {
      titleEl.value = itemType;
      titleEl.dataset.autofilled = "true";
    }
  }

  calculateOrderTotal() {
    const qty = Math.max(1, parseInt(document.getElementById('order-qty')?.value) || 1);
    const stitching = parseFloat(document.getElementById('order-price-stitching')?.value) || 0;
    const fabric = parseFloat(document.getElementById('order-price-fabric')?.value) || 0;
    const lining = parseFloat(document.getElementById('order-price-lining')?.value) || 0;
    const embroidery = parseFloat(document.getElementById('order-price-embroidery')?.value) || 0;
    const extra = parseFloat(document.getElementById('order-price-extra')?.value) || 0;
    const discount = parseFloat(document.getElementById('order-price-discount')?.value) || 0;

    const subtotalPerPiece = stitching + fabric + lining + embroidery + extra;
    const calculatedTotal = Math.max(0, (subtotalPerPiece * qty) - discount);

    const totalEl = document.getElementById('order-total');
    if (totalEl && (subtotalPerPiece > 0 || discount > 0)) {
      totalEl.value = calculatedTotal;
    }

    this.calculateBalance();
  }

  calculateBalance() {
    const total = parseFloat(document.getElementById('order-total')?.value) || 0;
    const advance = parseFloat(document.getElementById('order-advance')?.value) || 0;
    const balance = Math.max(0, total - advance);
    const balEl = document.getElementById('order-balance');
    if (balEl) balEl.value = balance;
  }

  openNewOrderModal(prefilled = {}) {
    const titleEl = document.getElementById('modal-order-title');
    if (titleEl) titleEl.textContent = 'Create New Tailoring Order';
    const formEl = document.getElementById('order-form');
    if (formEl) formEl.reset();
    const idEl = document.getElementById('order-id');
    if (idEl) idEl.value = '';
    
    // Default dates
    const delivery = new Date();
    delivery.setDate(delivery.getDate() + 7);
    const deliveryStr = delivery.toISOString().split('T')[0];

    const trial = new Date();
    trial.setDate(trial.getDate() + 4);
    const trialStr = trial.toISOString().split('T')[0];

    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val;
    };

    setVal('order-qty', 1);
    setVal('order-trial-date', trialStr);
    setVal('order-delivery-date', deliveryStr);
    setVal('order-balance', '0');
    setVal('order-price-stitching', '');
    setVal('order-price-fabric', '');
    setVal('order-price-lining', '');
    setVal('order-price-embroidery', '');
    setVal('order-price-extra', '');
    setVal('order-price-discount', '');
    setVal('order-total', '');
    setVal('order-advance', '');
    
    this.populateCustomerDropdowns();

    // Prefill from catalog or customer if provided
    if (prefilled.customerId) {
      setVal('order-cust-id', prefilled.customerId);
    }
    if (prefilled.category) {
      setVal('order-category', prefilled.category);
    }
    if (prefilled.itemType) {
      setVal('order-item-type', prefilled.itemType);
    }
    if (prefilled.title) {
      setVal('order-title', prefilled.title);
    }
    if (prefilled.price) {
      setVal('order-price-stitching', prefilled.price);
      setVal('order-total', prefilled.price);
      this.calculateBalance();
    }

    // Trigger measurement preview
    const selectedCustId = document.getElementById('order-cust-id')?.value;
    if (selectedCustId) {
      this.onOrderCustomerSelected(selectedCustId);
    }

    this.openModal('modal-order');
  }

  editOrder(orderId) {
    const order = this.data.orders.find(o => o.id === orderId);
    if (!order) return;

    document.getElementById('modal-order-title').textContent = `Edit Order #${order.id}`;
    document.getElementById('order-id').value = order.id;
    this.populateCustomerDropdowns();

    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = (val !== undefined && val !== null) ? val : '';
    };

    setVal('order-cust-id', order.customerId);
    setVal('order-category', order.category);
    setVal('order-item-type', order.itemType || order.title);
    setVal('order-qty', order.qty || 1);
    setVal('order-title', order.title);
    setVal('order-fabric', order.fabric || '');
    setVal('order-fabric-source', order.fabricSource || 'Client Provided');
    setVal('order-fabric-meter', order.fabricMeter || '');
    setVal('order-lining-material', order.liningMaterial || '');

    setVal('order-fit', order.fit || 'Modern Slim');
    setVal('order-collar', order.collar || 'Mandarin / Bandhgala');
    setVal('order-sleeve', order.sleeve || 'Full Sleeve');
    setVal('order-lining', order.lining || 'Full Lining');
    setVal('order-vents', order.vents || 'Double Vent');
    setVal('order-pockets', order.pockets || 'Two Flap Pockets');
    setVal('order-embroidery', order.embroidery || 'Plain / No Work');
    setVal('order-master-tailor', order.masterTailor || 'Master Zahid (Cutting Head)');

    setVal('order-adjustments', order.adjustments || '');
    setVal('order-trial-date', order.trialDate || '');
    setVal('order-delivery-date', order.deliveryDate || '');
    setVal('order-status', order.status);
    setVal('order-priority', order.priority || 'Standard');

    setVal('order-price-stitching', order.priceStitching || '');
    setVal('order-price-fabric', order.priceFabric || '');
    setVal('order-price-lining', order.priceLining || '');
    setVal('order-price-embroidery', order.priceEmbroidery || '');
    setVal('order-price-extra', order.priceExtra || '');
    setVal('order-price-discount', order.discount || '');
    setVal('order-total', order.total);
    setVal('order-advance', order.advance);
    setVal('order-balance', order.balance);
    setVal('order-payment-method', order.paymentMethod || 'UPI / Online');
    setVal('order-notes', order.notes || '');

    this.onOrderCustomerSelected(order.customerId);
    this.openModal('modal-order');
  }

  saveOrder(e) {
    if (e && e.preventDefault) e.preventDefault();

    const idInput = document.getElementById('order-id')?.value;
    const custId = document.getElementById('order-cust-id')?.value;
    const customer = (this.data.customers || []).find(c => c.id === custId);
    
    if (!customer) {
      alert("Please select a registered customer.");
      return;
    }

    const title = document.getElementById('order-title')?.value.trim();
    if (!title) {
      alert("Please enter the item / garment description.");
      document.getElementById('order-title')?.focus();
      return;
    }

    const deliveryDate = document.getElementById('order-delivery-date')?.value;
    if (!deliveryDate) {
      alert("Please choose a final delivery date.");
      document.getElementById('order-delivery-date')?.focus();
      return;
    }

    const total = parseFloat(document.getElementById('order-total')?.value) || 0;
    const advance = parseFloat(document.getElementById('order-advance')?.value) || 0;
    const balance = Math.max(0, total - advance);

    const getVal = (id) => {
      const el = document.getElementById(id);
      return el ? el.value.trim() : '';
    };

    const existingOrder = idInput ? this.data.orders.find(o => o.id === idInput) : null;
    const payments = existingOrder && existingOrder.payments ? existingOrder.payments : [];

    // If new order and advance > 0, record initial payment
    if (!existingOrder && advance > 0) {
      payments.push({
        id: `PAY-${Date.now()}`,
        amount: advance,
        mode: getVal('order-payment-method') || 'UPI / Online',
        date: new Date().toISOString().split('T')[0],
        notes: "Initial advance payment on booking"
      });
    }

    const orderData = {
      id: idInput || `ZM-${Math.floor(1000 + Math.random() * 9000)}`,
      customerId: custId,
      customerName: customer.name,
      customerPhone: customer.phone,
      category: getVal('order-category'),
      itemType: getVal('order-item-type'),
      qty: parseInt(getVal('order-qty')) || 1,
      title: title,
      fabric: getVal('order-fabric'),
      fabricSource: getVal('order-fabric-source'),
      fabricMeter: getVal('order-fabric-meter'),
      liningMaterial: getVal('order-lining-material'),
      fit: getVal('order-fit'),
      collar: getVal('order-collar'),
      sleeve: getVal('order-sleeve'),
      lining: getVal('order-lining'),
      vents: getVal('order-vents'),
      pockets: getVal('order-pockets'),
      embroidery: getVal('order-embroidery'),
      masterTailor: getVal('order-master-tailor'),
      adjustments: getVal('order-adjustments'),
      trialDate: getVal('order-trial-date'),
      deliveryDate: deliveryDate,
      status: getVal('order-status'),
      priority: getVal('order-priority'),
      priceStitching: parseFloat(getVal('order-price-stitching')) || 0,
      priceFabric: parseFloat(getVal('order-price-fabric')) || 0,
      priceLining: parseFloat(getVal('order-price-lining')) || 0,
      priceEmbroidery: parseFloat(getVal('order-price-embroidery')) || 0,
      priceExtra: parseFloat(getVal('order-price-extra')) || 0,
      discount: parseFloat(getVal('order-price-discount')) || 0,
      total: total,
      advance: advance,
      balance: balance,
      paymentMethod: getVal('order-payment-method'),
      notes: getVal('order-notes'),
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

  // ==================== CUSTOMERS & MEASUREMENTS ====================
  onCustomerGenderChange(gender) {
    const tabWomen = document.getElementById('tab-btn-women');
    if (gender === 'Women') {
      if (tabWomen) {
        tabWomen.style.borderColor = '#10b981';
        tabWomen.style.color = 'var(--primary)';
        tabWomen.style.fontWeight = '700';
      }
    } else {
      if (tabWomen) {
        tabWomen.style.borderColor = '';
        tabWomen.style.color = '';
        tabWomen.style.fontWeight = '';
      }
    }
  }

  switchMeasureTab(tabName) {
    const tabs = ['all', 'upper', 'lower', 'women', 'fit'];
    tabs.forEach(t => {
      const btn = document.getElementById(`tab-btn-${t}`);
      if (btn) btn.classList.toggle('active', t === tabName);
    });

    const secUpper = document.getElementById('m-sec-upper');
    const secLower = document.getElementById('m-sec-lower');
    const secWomen = document.getElementById('m-sec-women');
    const secFit = document.getElementById('m-sec-fit');

    if (tabName === 'all') {
      if (secUpper) secUpper.style.display = 'block';
      if (secLower) secLower.style.display = 'block';
      if (secWomen) secWomen.style.display = 'block';
      if (secFit) secFit.style.display = 'block';
    } else if (tabName === 'upper') {
      if (secUpper) secUpper.style.display = 'block';
      if (secLower) secLower.style.display = 'none';
      if (secWomen) secWomen.style.display = 'none';
      if (secFit) secFit.style.display = 'none';
    } else if (tabName === 'lower') {
      if (secUpper) secUpper.style.display = 'none';
      if (secLower) secLower.style.display = 'block';
      if (secWomen) secWomen.style.display = 'none';
      if (secFit) secFit.style.display = 'none';
    } else if (tabName === 'women') {
      if (secUpper) secUpper.style.display = 'none';
      if (secLower) secLower.style.display = 'none';
      if (secWomen) secWomen.style.display = 'block';
      if (secFit) secFit.style.display = 'none';
    } else if (tabName === 'fit') {
      if (secUpper) secUpper.style.display = 'none';
      if (secLower) secLower.style.display = 'none';
      if (secWomen) secWomen.style.display = 'none';
      if (secFit) secFit.style.display = 'block';
    }
  }

  populateCustomerDropdowns() {
    const select = document.getElementById('order-cust-id');
    if (!select) return;

    const currentVal = select.value;
    select.innerHTML = '';
    if (!this.data.customers || this.data.customers.length === 0) {
      select.innerHTML = '<option value="">No registered customers. Please add one first.</option>';
      return;
    }

    this.data.customers.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = `${c.name} (${c.phone}) - ${c.gender}`;
      select.appendChild(opt);
    });

    if (currentVal && this.data.customers.some(c => c.id === currentVal)) {
      select.value = currentVal;
    }
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
              <div class="snapshot-title">Bespoke Measurements Snapshot (Inches)</div>
              <div class="snapshot-chips">
                ${m.length ? `<span class="snapshot-chip">Top: ${m.length}"</span>` : ''}
                ${m.coatLength ? `<span class="snapshot-chip">Coat: ${m.coatLength}"</span>` : ''}
                ${m.chest ? `<span class="snapshot-chip">Chest: ${m.chest}"</span>` : ''}
                ${m.waist ? `<span class="snapshot-chip">Waist: ${m.waist}"</span>` : ''}
                ${m.shoulder ? `<span class="snapshot-chip">Shoulder: ${m.shoulder}"</span>` : ''}
                ${m.sleeveLength ? `<span class="snapshot-chip">Sleeve: ${m.sleeveLength}"</span>` : ''}
                ${m.armhole ? `<span class="snapshot-chip">Armhole: ${m.armhole}"</span>` : ''}
                ${m.pantLength ? `<span class="snapshot-chip">Pant: ${m.pantLength}"</span>` : ''}
                ${m.hip ? `<span class="snapshot-chip">Hip: ${m.hip}"</span>` : ''}
                ${m.bottom ? `<span class="snapshot-chip">Bottom: ${m.bottom}"</span>` : ''}
                ${m.blouseLength ? `<span class="snapshot-chip">Blouse: ${m.blouseLength}"</span>` : ''}
                ${m.fitType ? `<span class="snapshot-chip" style="background:#e0e7ff; color:#3730a3; font-weight:700;">${m.fitType}</span>` : ''}
              </div>
            </div>

            <div class="cust-card-actions">
              <button class="btn btn-sm btn-outline" style="flex:1;" onclick="app.viewCustomerDetails('${cust.id}')">
                Profile & History
              </button>
              <button class="btn btn-sm btn-outline" style="flex:1;" onclick="app.editCustomer('${cust.id}')">
                Edit
              </button>
              <button class="btn btn-sm btn-primary" onclick="app.newOrderForCustomer('${cust.id}')">
                + Order
              </button>
              <button class="btn btn-sm btn-danger-outline" title="Delete Customer" onclick="app.deleteCustomer('${cust.id}')">
                &times;
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
    const query = (document.getElementById('customer-search')?.value || '').toLowerCase().trim();
    const genderFilter = document.getElementById('customer-gender-filter')?.value || 'all';

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
    if (titleEl) titleEl.textContent = openedFromOrder ? 'Quick Add Customer for Order' : 'Register Customer & Full Body Measurements';
    const form = document.getElementById('customer-form');
    if (form) form.reset();
    const idInput = document.getElementById('cust-id');
    if (idInput) idInput.value = '';
    
    this.switchMeasureTab('all');
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
      if (el) el.value = (val !== undefined && val !== null) ? val : '';
    };

    // Upper body
    setVal('m-length', m.length);
    setVal('m-coat-length', m.coatLength);
    setVal('m-chest', m.chest);
    setVal('m-stomach', m.stomach);
    setVal('m-waist', m.waist);
    setVal('m-shoulder', m.shoulder);
    setVal('m-cross-back', m.crossBack);
    setVal('m-cross-front', m.crossFront);
    setVal('m-sleeve-length', m.sleeveLength);
    setVal('m-armhole', m.armhole);
    setVal('m-bicep', m.bicep);
    setVal('m-elbow', m.elbow);
    setVal('m-cuff', m.cuff);
    setVal('m-neck', m.neck);

    // Lower body
    setVal('m-pant-length', m.pantLength);
    setVal('m-inseam', m.inseam);
    setVal('m-pant-waist', m.pantWaist);
    setVal('m-hip', m.hip);
    setVal('m-thigh', m.thigh);
    setVal('m-knee', m.knee);
    setVal('m-calf', m.calf);
    setVal('m-bottom', m.bottom);
    setVal('m-rise', m.rise);
    setVal('m-salwar-length', m.salwarLength);
    setVal('m-flare', m.flare);

    // Women / Ethnic
    setVal('m-blouse-length', m.blouseLength);
    setVal('m-upper-chest', m.upperChest);
    setVal('m-under-bust', m.underBust);
    setVal('m-bust-point', m.bustPoint);
    setVal('m-apex-distance', m.apexDistance);
    setVal('m-front-neck', m.frontNeck);
    setVal('m-back-neck', m.backNeck);
    setVal('m-front-neck-style', m.frontNeckStyle || 'Round');
    setVal('m-back-neck-style', m.backNeckStyle || 'Round Deep');

    // Fit & Posture
    setVal('m-fit-type', m.fitType || 'Regular Fit');
    setVal('m-lining', m.lining || 'Full Lining');
    setVal('m-shoulder-type', m.shoulderType || 'Normal');
    setVal('m-posture', m.posture || 'Normal');

    this.switchMeasureTab('all');
    this.openModal('modal-customer');
  }

  saveCustomer(e) {
    if (e && e.preventDefault) e.preventDefault();

    const nameInput = document.getElementById('cust-name');
    const phoneInput = document.getElementById('cust-phone');

    if (!nameInput || !nameInput.value.trim()) {
      alert("Please enter customer name.");
      if (nameInput) nameInput.focus();
      return false;
    }

    if (!phoneInput || !phoneInput.value.trim()) {
      alert("Please enter customer phone number.");
      if (phoneInput) phoneInput.focus();
      return false;
    }

    const idInput = (document.getElementById('cust-id')?.value || '').trim();

    const getVal = (id) => {
      const el = document.getElementById(id);
      return el ? el.value.trim() : '';
    };

    const measurements = {
      // Upper body
      length: getVal('m-length'),
      coatLength: getVal('m-coat-length'),
      chest: getVal('m-chest'),
      stomach: getVal('m-stomach'),
      waist: getVal('m-waist'),
      shoulder: getVal('m-shoulder'),
      crossBack: getVal('m-cross-back'),
      crossFront: getVal('m-cross-front'),
      sleeveLength: getVal('m-sleeve-length'),
      armhole: getVal('m-armhole'),
      bicep: getVal('m-bicep'),
      elbow: getVal('m-elbow'),
      cuff: getVal('m-cuff'),
      neck: getVal('m-neck'),

      // Lower body
      pantLength: getVal('m-pant-length'),
      inseam: getVal('m-inseam'),
      pantWaist: getVal('m-pant-waist'),
      hip: getVal('m-hip'),
      thigh: getVal('m-thigh'),
      knee: getVal('m-knee'),
      calf: getVal('m-calf'),
      bottom: getVal('m-bottom'),
      rise: getVal('m-rise'),
      salwarLength: getVal('m-salwar-length'),
      flare: getVal('m-flare'),

      // Women
      blouseLength: getVal('m-blouse-length'),
      upperChest: getVal('m-upper-chest'),
      underBust: getVal('m-under-bust'),
      bustPoint: getVal('m-bust-point'),
      apexDistance: getVal('m-apex-distance'),
      frontNeck: getVal('m-front-neck'),
      backNeck: getVal('m-back-neck'),
      frontNeckStyle: getVal('m-front-neck-style'),
      backNeckStyle: getVal('m-back-neck-style'),

      // Fit & Posture
      fitType: getVal('m-fit-type'),
      lining: getVal('m-lining'),
      shoulderType: getVal('m-shoulder-type'),
      posture: getVal('m-posture')
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

    // If opened from order modal, auto-select this customer and update measurement preview
    if (this.openedFromOrderModal) {
      this.openedFromOrderModal = false;
      const orderCustSelect = document.getElementById('order-cust-id');
      if (orderCustSelect) {
        orderCustSelect.value = customerObj.id;
        this.onOrderCustomerSelected(customerObj.id);
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

  deleteCustomer(custId) {
    const cust = (this.data.customers || []).find(c => c.id === custId);
    if (!cust) return;

    if (confirm(`Are you sure you want to delete customer "${cust.name}" (${cust.id})? All saved measurements will be removed.`)) {
      this.data.customers = this.data.customers.filter(c => c.id !== custId);
      this.saveData();
      this.closeModal('modal-view-customer');
      this.populateCustomerDropdowns();
      this.renderCustomersGrid();
      this.renderDashboard();
      this.showToast(`Customer "${cust.name}" deleted.`);
    }
  }

  deleteCurrentViewCustomer() {
    if (this.activeViewCustomerId) {
      this.deleteCustomer(this.activeViewCustomerId);
    }
  }

  editCurrentViewCustomer() {
    if (this.activeViewCustomerId) {
      this.closeModal('modal-view-customer');
      this.editCustomer(this.activeViewCustomerId);
    }
  }

  newOrderForCurrentViewCustomer() {
    if (this.activeViewCustomerId) {
      this.closeModal('modal-view-customer');
      this.openNewOrderModal({ customerId: this.activeViewCustomerId });
    }
  }

  viewCustomerDetails(custId) {
    const cust = (this.data.customers || []).find(c => c.id === custId);
    if (!cust) return;

    this.activeViewCustomerId = custId;
    document.getElementById('view-customer-name').textContent = `${cust.name} – Bespoke Tailoring Profile & History`;
    const body = document.getElementById('view-customer-body');
    const m = cust.measurements || {};
    const orders = (this.data.orders || []).filter(o => o.customerId === cust.id);

    const hasWomen = cust.gender === 'Women' || m.blouseLength || m.upperChest || m.underBust || m.bustPoint || m.flare;

    body.innerHTML = `
      <div style="background:#0a0f18; color:#fff; border-radius:12px; padding:18px; margin-bottom:20px; border:1px solid #1f293d;">
        <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:12px;">
          <div>
            <div style="font-size:1.35rem; font-weight:700;">${cust.name}</div>
            <div style="color:#34d399; font-size:0.875rem; margin-top:2px;">Category: <strong>${cust.gender}</strong> • ID: ${cust.id}</div>
            <div style="font-size:0.875rem; color:#94a3b8; margin-top:4px;">📞 Phone: ${cust.phone} | ✉️ ${cust.email || 'No email registered'}</div>
            <div style="font-size:0.875rem; color:#94a3b8;">📍 Address: ${cust.address || 'Address not specified'}</div>
          </div>
          <div style="display:flex; flex-direction:column; gap:8px; align-items:flex-end;">
            <button class="btn btn-sm btn-whatsapp" onclick="app.directWhatsApp('${cust.phone}', '${cust.name}')">
              📱 WhatsApp Client
            </button>
            <button class="btn btn-sm btn-primary" onclick="app.newOrderForCurrentViewCustomer()">
              + Create New Order
            </button>
          </div>
        </div>
      </div>

      <!-- Upper Body Card -->
      <div style="background:#ffffff; border:1px solid var(--gray-200); border-radius:10px; padding:16px; margin-bottom:16px;">
        <h4 style="color:var(--primary); font-size:0.95rem; margin-bottom:10px; text-transform:uppercase; font-weight:700;">
          👔 Upper Body Measurements (Inches)
        </h4>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:10px;">
          <div class="measure-field"><label>Top / Shirt Length</label><strong>${m.length ? `${m.length}"` : '—'}</strong></div>
          <div class="measure-field"><label>Coat / Sherwani Length</label><strong>${m.coatLength ? `${m.coatLength}"` : '—'}</strong></div>
          <div class="measure-field"><label>Chest / Bust</label><strong>${m.chest ? `${m.chest}"` : '—'}</strong></div>
          <div class="measure-field"><label>Stomach / Abdomen</label><strong>${m.stomach ? `${m.stomach}"` : '—'}</strong></div>
          <div class="measure-field"><label>Natural Waist</label><strong>${m.waist ? `${m.waist}"` : '—'}</strong></div>
          <div class="measure-field"><label>Shoulder</label><strong>${m.shoulder ? `${m.shoulder}"` : '—'}</strong></div>
          <div class="measure-field"><label>Cross Back</label><strong>${m.crossBack ? `${m.crossBack}"` : '—'}</strong></div>
          <div class="measure-field"><label>Cross Front</label><strong>${m.crossFront ? `${m.crossFront}"` : '—'}</strong></div>
          <div class="measure-field"><label>Sleeve Length</label><strong>${m.sleeveLength ? `${m.sleeveLength}"` : '—'}</strong></div>
          <div class="measure-field"><label>Armhole</label><strong>${m.armhole ? `${m.armhole}"` : '—'}</strong></div>
          <div class="measure-field"><label>Bicep / Muscle</label><strong>${m.bicep ? `${m.bicep}"` : '—'}</strong></div>
          <div class="measure-field"><label>Elbow Round</label><strong>${m.elbow ? `${m.elbow}"` : '—'}</strong></div>
          <div class="measure-field"><label>Cuff Opening</label><strong>${m.cuff ? `${m.cuff}"` : '—'}</strong></div>
          <div class="measure-field"><label>Neck / Collar</label><strong>${m.neck ? `${m.neck}"` : '—'}</strong></div>
        </div>
      </div>

      <!-- Lower Body Card -->
      <div style="background:#ffffff; border:1px solid var(--gray-200); border-radius:10px; padding:16px; margin-bottom:16px;">
        <h4 style="color:var(--primary); font-size:0.95rem; margin-bottom:10px; text-transform:uppercase; font-weight:700;">
          👖 Lower Body Measurements (Inches)
        </h4>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:10px;">
          <div class="measure-field"><label>Pant / Outseam Length</label><strong>${m.pantLength ? `${m.pantLength}"` : '—'}</strong></div>
          <div class="measure-field"><label>Inseam</label><strong>${m.inseam ? `${m.inseam}"` : '—'}</strong></div>
          <div class="measure-field"><label>Pant Waist</label><strong>${m.pantWaist ? `${m.pantWaist}"` : '—'}</strong></div>
          <div class="measure-field"><label>Hip / Seat</label><strong>${m.hip ? `${m.hip}"` : '—'}</strong></div>
          <div class="measure-field"><label>Thigh</label><strong>${m.thigh ? `${m.thigh}"` : '—'}</strong></div>
          <div class="measure-field"><label>Knee</label><strong>${m.knee ? `${m.knee}"` : '—'}</strong></div>
          <div class="measure-field"><label>Calf</label><strong>${m.calf ? `${m.calf}"` : '—'}</strong></div>
          <div class="measure-field"><label>Bottom Opening</label><strong>${m.bottom ? `${m.bottom}"` : '—'}</strong></div>
          <div class="measure-field"><label>Crotch / Rise</label><strong>${m.rise ? `${m.rise}"` : '—'}</strong></div>
          <div class="measure-field"><label>Salwar Length</label><strong>${m.salwarLength ? `${m.salwarLength}"` : '—'}</strong></div>
          <div class="measure-field"><label>Flare / Sweep</label><strong>${m.flare ? `${m.flare}"` : '—'}</strong></div>
        </div>
      </div>

      ${hasWomen ? `
      <!-- Women Couture Details -->
      <div style="background:#ffffff; border:1px solid var(--gray-200); border-radius:10px; padding:16px; margin-bottom:16px;">
        <h4 style="color:var(--primary); font-size:0.95rem; margin-bottom:10px; text-transform:uppercase; font-weight:700;">
          👗 Women Couture & Blouse Details (Inches)
        </h4>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:10px;">
          <div class="measure-field"><label>Blouse Length</label><strong>${m.blouseLength ? `${m.blouseLength}"` : '—'}</strong></div>
          <div class="measure-field"><label>Upper Chest</label><strong>${m.upperChest ? `${m.upperChest}"` : '—'}</strong></div>
          <div class="measure-field"><label>Under Bust</label><strong>${m.underBust ? `${m.underBust}"` : '—'}</strong></div>
          <div class="measure-field"><label>Apex / Bust Point</label><strong>${m.bustPoint ? `${m.bustPoint}"` : '—'}</strong></div>
          <div class="measure-field"><label>Apex Distance</label><strong>${m.apexDistance ? `${m.apexDistance}"` : '—'}</strong></div>
          <div class="measure-field"><label>Front Neck Depth</label><strong>${m.frontNeck ? `${m.frontNeck}" (${m.frontNeckStyle || 'Round'})` : '—'}</strong></div>
          <div class="measure-field"><label>Back Neck Depth</label><strong>${m.backNeck ? `${m.backNeck}" (${m.backNeckStyle || 'Round Deep'})` : '—'}</strong></div>
        </div>
      </div>
      ` : ''}

      <!-- Fit & Posture Specs -->
      <div style="background:#ffffff; border:1px solid var(--gray-200); border-radius:10px; padding:16px; margin-bottom:16px;">
        <h4 style="color:var(--primary); font-size:0.95rem; margin-bottom:10px; text-transform:uppercase; font-weight:700;">
          ✂️ Tailoring Fit, Lining & Posture Preferences
        </h4>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:10px;">
          <div class="measure-field"><label>Fit Style</label><strong>${m.fitType || 'Regular Fit'}</strong></div>
          <div class="measure-field"><label>Preferred Lining</label><strong>${m.lining || 'Full Lining'}</strong></div>
          <div class="measure-field"><label>Shoulder Slope</label><strong>${m.shoulderType || 'Normal'}</strong></div>
          <div class="measure-field"><label>Body Posture</label><strong>${m.posture || 'Normal'}</strong></div>
        </div>
      </div>

      <!-- Notes -->
      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:12px; margin-bottom:20px;">
        <strong style="font-size:0.85rem; color:#475569;">Special Cutting Master Notes:</strong>
        <p style="font-size:0.9rem; margin-top:4px; color:#1e293b;">${cust.notes || 'No special fit preferences noted.'}</p>
      </div>

      <!-- Order History -->
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

  printCustomerMeasurementSheet() {
    const custId = this.activeViewCustomerId;
    const cust = (this.data.customers || []).find(c => c.id === custId);
    if (!cust) return;

    const m = cust.measurements || {};
    const s = this.data.settings || {};
    const dateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    // Open print window with bespoke tailor sheet
    const printWindow = window.open('', '_blank', 'width=850,height=900');
    if (!printWindow) {
      alert("Please allow popups to print the measurement sheet.");
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${cust.name} - Measurement Sheet | ZM Enterprises</title>
        <style>
          body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; padding: 30px; color: #0f172a; margin: 0; }
          .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2.5px solid #059669; padding-bottom: 14px; margin-bottom: 18px; }
          .header h1 { margin: 0; color: #059669; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
          .header p { margin: 2px 0 0 0; font-size: 13px; color: #64748b; }
          .meta-box { border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px 16px; margin-bottom: 18px; background: #f8fafc; display: flex; justify-content: space-between; }
          .section-title { font-size: 13px; font-weight: 800; color: #059669; text-transform: uppercase; margin: 16px 0 8px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; }
          .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 12px; }
          .item { border: 1px solid #e2e8f0; border-radius: 6px; padding: 6px 10px; background: #fff; }
          .item label { display: block; font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase; }
          .item strong { font-size: 15px; color: #0f172a; }
          .notes { border: 1px dashed #cbd5e1; border-radius: 6px; padding: 10px 14px; margin-top: 14px; font-size: 13px; }
          .signature-row { display: flex; justify-content: space-between; margin-top: 40px; padding-top: 10px; font-size: 12px; color: #64748b; }
          @media print {
            body { padding: 15px; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1>${s.businessName || 'ZM Enterprises'}</h1>
            <p>${s.tagline || 'Custom Bespoke Stitching & Tailoring Atelier'}</p>
            <p>📍 ${s.address || 'Workshop Studio'} | 📞 ${s.phone || ''}</p>
          </div>
          <div style="text-align:right;">
            <div style="font-size:18px; font-weight:800; color:#0f172a;">MASTER MEASUREMENT SHEET</div>
            <p>Date: ${dateStr}</p>
            <p>Profile ID: <strong>${cust.id}</strong></p>
          </div>
        </div>

        <div class="meta-box">
          <div>
            <strong>Client Name:</strong> ${cust.name}<br>
            <strong>Phone / WhatsApp:</strong> ${cust.phone}<br>
            <strong>Category:</strong> ${cust.gender}
          </div>
          <div style="text-align:right;">
            <strong>Fit Style:</strong> ${m.fitType || 'Regular Fit'}<br>
            <strong>Lining Preference:</strong> ${m.lining || 'Full Lining'}<br>
            <strong>Shoulder Slope:</strong> ${m.shoulderType || 'Normal'}
          </div>
        </div>

        <div class="section-title">👔 Upper Body (Shirt / Kurta / Coat / Blazer)</div>
        <div class="grid">
          <div class="item"><label>Top Length</label><strong>${m.length || '—'}"</strong></div>
          <div class="item"><label>Coat Length</label><strong>${m.coatLength || '—'}"</strong></div>
          <div class="item"><label>Chest / Bust</label><strong>${m.chest || '—'}"</strong></div>
          <div class="item"><label>Stomach / Abdomen</label><strong>${m.stomach || '—'}"</strong></div>
          <div class="item"><label>Natural Waist</label><strong>${m.waist || '—'}"</strong></div>
          <div class="item"><label>Shoulder</label><strong>${m.shoulder || '—'}"</strong></div>
          <div class="item"><label>Cross Back</label><strong>${m.crossBack || '—'}"</strong></div>
          <div class="item"><label>Cross Front</label><strong>${m.crossFront || '—'}"</strong></div>
          <div class="item"><label>Sleeve Length</label><strong>${m.sleeveLength || '—'}"</strong></div>
          <div class="item"><label>Armhole</label><strong>${m.armhole || '—'}"</strong></div>
          <div class="item"><label>Bicep / Muscle</label><strong>${m.bicep || '—'}"</strong></div>
          <div class="item"><label>Neck / Collar</label><strong>${m.neck || '—'}"</strong></div>
        </div>

        <div class="section-title">👖 Lower Body (Pant / Trouser / Salwar / Pajama)</div>
        <div class="grid">
          <div class="item"><label>Pant Length (Outseam)</label><strong>${m.pantLength || '—'}"</strong></div>
          <div class="item"><label>Inseam</label><strong>${m.inseam || '—'}"</strong></div>
          <div class="item"><label>Pant Waist</label><strong>${m.pantWaist || '—'}"</strong></div>
          <div class="item"><label>Hip / Seat</label><strong>${m.hip || '—'}"</strong></div>
          <div class="item"><label>Thigh</label><strong>${m.thigh || '—'}"</strong></div>
          <div class="item"><label>Knee</label><strong>${m.knee || '—'}"</strong></div>
          <div class="item"><label>Calf</label><strong>${m.calf || '—'}"</strong></div>
          <div class="item"><label>Bottom Opening</label><strong>${m.bottom || '—'}"</strong></div>
          <div class="item"><label>Crotch / Rise</label><strong>${m.rise || '—'}"</strong></div>
          <div class="item"><label>Salwar Length</label><strong>${m.salwarLength || '—'}"</strong></div>
        </div>

        ${(cust.gender === 'Women' || m.blouseLength || m.upperChest || m.underBust || m.bustPoint) ? `
        <div class="section-title">👗 Women Couture & Blouse Details</div>
        <div class="grid">
          <div class="item"><label>Blouse Length</label><strong>${m.blouseLength || '—'}"</strong></div>
          <div class="item"><label>Upper Chest</label><strong>${m.upperChest || '—'}"</strong></div>
          <div class="item"><label>Under Bust</label><strong>${m.underBust || '—'}"</strong></div>
          <div class="item"><label>Apex / Bust Point</label><strong>${m.bustPoint || '—'}"</strong></div>
          <div class="item"><label>Apex Distance</label><strong>${m.apexDistance || '—'}"</strong></div>
          <div class="item"><label>Front Neck</label><strong>${m.frontNeck || '—'}" (${m.frontNeckStyle || 'Round'})</strong></div>
          <div class="item"><label>Back Neck</label><strong>${m.backNeck || '—'}" (${m.backNeckStyle || 'Deep'})</strong></div>
          <div class="item"><label>Flare / Sweep</label><strong>${m.flare || '—'}"</strong></div>
        </div>
        ` : ''}

        <div class="notes">
          <strong>Special Cutting Master Notes & Styling:</strong><br>
          ${cust.notes || 'Standard bespoke tailoring specifications apply.'}
        </div>

        <div class="signature-row">
          <div>Cutting Master Signature: _______________________</div>
          <div>Stitching Tailor Signature: _______________________</div>
          <div>Checked By: _______________________</div>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 400);
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

  // ==================== SERVICE CATALOG & RATE CARD ====================
  renderCatalog(filterCategory = 'all') {
    const grid = document.getElementById('catalog-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const services = Array.isArray(this.data.services) ? this.data.services : [];
    const filtered = filterCategory === 'all' 
      ? services 
      : services.filter(s => s.category === filterCategory);

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; color: #64748b;">
          <p style="font-size: 1.1rem; font-weight: 600; color: #334155;">No services found in this category.</p>
          <p style="font-size: 0.9rem; margin-top: 6px;">Click <strong>"+ Add Service Rate"</strong> above to configure your tailoring offerings and custom prices.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'catalog-card';
      
      const hasPrice = item.price !== null && item.price !== undefined && item.price !== '' && !isNaN(item.price) && Number(item.price) > 0;
      const priceHtml = hasPrice
        ? `<div class="catalog-price">₹${Number(item.price).toLocaleString('en-IN')}</div>`
        : `<div class="catalog-price-unset">Price not set</div>`;

      card.innerHTML = `
        <div class="catalog-card-header">
          <div>
            <span class="badge badge-cat" style="margin-bottom:6px;">${item.category}</span>
            <h4>${item.name}</h4>
          </div>
          ${priceHtml}
        </div>

        <p class="catalog-desc">${item.desc || 'Custom bespoke tailoring service.'}</p>

        <div class="catalog-details">
          <div>⏱️ Turnaround: <strong>${item.turnaround || 'On Request'}</strong></div>
          ${item.fabricTip ? `<div>✂️ ${item.fabricTip}</div>` : ''}
        </div>

        <div class="catalog-actions-row">
          <button class="btn btn-primary" style="flex:2;" onclick="app.bookFromCatalog('${item.id}')">
            + Book Service
          </button>
          <button class="btn btn-outline" style="flex:1;" title="Edit Service Rate" onclick="app.openServiceModal('${item.id}')">
            ✏️ Edit
          </button>
          <button class="btn btn-danger-outline" style="padding:6px 10px;" title="Delete Service" onclick="app.deleteService('${item.id}')">
            🗑️
          </button>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  filterCatalog() {
    const cat = document.getElementById('catalog-category-filter')?.value || 'all';
    this.renderCatalog(cat);
  }

  openServiceModal(serviceId = null) {
    const modal = document.getElementById('modal-service');
    if (!modal) return;
    
    const form = document.getElementById('service-form');
    if (form) form.reset();
    
    const titleEl = document.getElementById('modal-service-title');
    const idInput = document.getElementById('service-id');
    const nameInput = document.getElementById('service-name');
    const catSelect = document.getElementById('service-category');
    const priceInput = document.getElementById('service-price');
    const turnInput = document.getElementById('service-turnaround');
    const descInput = document.getElementById('service-desc');
    
    if (serviceId) {
      const s = (this.data.services || []).find(item => item.id === serviceId);
      if (s) {
        if (titleEl) titleEl.textContent = 'Edit Service Rate & Details';
        if (idInput) idInput.value = s.id;
        if (nameInput) nameInput.value = s.name || '';
        if (catSelect) catSelect.value = s.category || 'Custom Stitching';
        if (priceInput) priceInput.value = (s.price !== null && s.price !== undefined && s.price !== '') ? s.price : '';
        if (turnInput) turnInput.value = s.turnaround || '';
        if (descInput) descInput.value = s.desc || '';
      }
    } else {
      if (titleEl) titleEl.textContent = 'Add New Service Rate';
      if (idInput) idInput.value = '';
    }
    
    this.openModal('modal-service');
  }

  saveService(e) {
    if (e && e.preventDefault) e.preventDefault();
    
    const id = (document.getElementById('service-id')?.value || '').trim();
    const name = (document.getElementById('service-name')?.value || '').trim();
    if (!name) {
      alert('Please enter a service name.');
      return false;
    }
    
    const category = document.getElementById('service-category')?.value || 'Custom Stitching';
    const rawPrice = document.getElementById('service-price')?.value;
    const price = (rawPrice !== '' && rawPrice !== null && !isNaN(rawPrice)) ? Math.max(0, parseFloat(rawPrice)) : null;
    const turnaround = (document.getElementById('service-turnaround')?.value || '').trim() || 'On Request';
    const desc = (document.getElementById('service-desc')?.value || '').trim();
    
    if (!Array.isArray(this.data.services)) {
      this.data.services = [];
    }
    
    if (id) {
      const idx = this.data.services.findIndex(s => s.id === id);
      if (idx !== -1) {
        this.data.services[idx] = {
          ...this.data.services[idx],
          name,
          category,
          price,
          turnaround,
          desc
        };
        this.showToast(`Service "${name}" updated!`);
      }
    } else {
      const newService = {
        id: `SRV-${Date.now().toString().slice(-5)}`,
        name,
        category,
        price,
        turnaround,
        desc
      };
      this.data.services.push(newService);
      this.showToast(`New service "${name}" added!`);
    }
    
    this.saveData();
    this.closeModal('modal-service');
    this.renderCatalog();
    return false;
  }

  deleteService(serviceId) {
    const s = (this.data.services || []).find(item => item.id === serviceId);
    if (!s) return;
    if (confirm(`Are you sure you want to remove "${s.name}" from your rate catalog?`)) {
      this.data.services = (this.data.services || []).filter(item => item.id !== serviceId);
      this.saveData();
      this.renderCatalog();
      this.showToast(`Service "${s.name}" removed.`);
    }
  }

  bookFromCatalog(serviceId) {
    const item = (this.data.services || []).find(s => s.id === serviceId);
    if (!item) return;

    this.openNewOrderModal({
      category: item.category,
      title: item.name,
      price: (item.price !== null && item.price !== undefined && item.price !== '' && !isNaN(item.price) && Number(item.price) > 0) ? item.price : ''
    });
  }

  // ==================== INVOICES & BILLING ====================
  renderInvoicesTable(filteredList = null) {
    const list = filteredList !== null ? filteredList : this.data.orders;
    const tbody = document.getElementById('invoices-tbody');
    if (!tbody) return;
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
            <p><strong>Category:</strong> ${order.category} ${order.itemType ? `(${order.itemType})` : ''}</p>
            <p><strong>Quantity:</strong> ${order.qty || 1} Piece(s) / Set</p>
            <p><strong>Production Stage:</strong> ${order.status}</p>
            <p><strong>Fabric:</strong> ${order.fabric || 'Client Provided'} (${order.fabricSource || 'Standard'}) ${order.fabricMeter ? `• ${order.fabricMeter}` : ''}</p>
            <p><strong>Styling:</strong> ${order.fit || 'Regular Fit'} • ${order.collar || 'Standard'} • ${order.vents || 'Standard'}</p>
            <p><strong>Master Tailor:</strong> ${order.masterTailor || 'Workshop Master'}</p>
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
                <div style="font-weight:700;">${order.title} ${order.qty > 1 ? `(Qty: ${order.qty})` : ''}</div>
                <div style="font-size:0.8rem; color:#64748b; margin-top:3px;">
                  ${order.fit ? `Fit: ${order.fit} • ` : ''}${order.collar ? `Collar: ${order.collar} • ` : ''}${order.sleeve ? `Sleeves: ${order.sleeve}` : ''}
                </div>
                ${order.adjustments ? `<div style="font-size:0.8rem; color:#059669; margin-top:2px;">Custom Adjustments: ${order.adjustments}</div>` : ''}
                ${order.notes ? `<div style="font-size:0.8rem; color:#64748b; margin-top:2px;">Special Notes: ${order.notes}</div>` : ''}
              </td>
              <td>${order.category}</td>
              <td style="text-align:right; font-weight:700;">₹${order.total.toLocaleString('en-IN')}</td>
            </tr>
          </tbody>
        </table>

        <!-- Summary Totals -->
        <div class="inv-summary-box">
          <table class="inv-summary-table">
            ${order.priceStitching ? `<tr><td>Stitching Charges:</td><td>₹${(order.priceStitching * (order.qty || 1)).toLocaleString('en-IN')}</td></tr>` : ''}
            ${order.priceFabric ? `<tr><td>Fabric Material:</td><td>₹${(order.priceFabric * (order.qty || 1)).toLocaleString('en-IN')}</td></tr>` : ''}
            ${order.priceLining ? `<tr><td>Lining Material:</td><td>₹${(order.priceLining * (order.qty || 1)).toLocaleString('en-IN')}</td></tr>` : ''}
            ${order.priceEmbroidery ? `<tr><td>Embroidery & Detailing:</td><td>₹${(order.priceEmbroidery * (order.qty || 1)).toLocaleString('en-IN')}</td></tr>` : ''}
            ${order.priceExtra ? `<tr><td>Alterations / Extra:</td><td>₹${(order.priceExtra * (order.qty || 1)).toLocaleString('en-IN')}</td></tr>` : ''}
            ${order.discount ? `<tr><td>Discount / Concession:</td><td style="color:#dc2626;">- ₹${order.discount.toLocaleString('en-IN')}</td></tr>` : ''}
            <tr>
              <td>Total Order Value:</td>
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
    setVal('setting-biz-city', s.city || "Hyderabad");
    setVal('setting-biz-state', s.state || "Telangana");
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
      tagline: getVal('setting-biz-tagline') || "Professional School & Corporate Uniform Stitching | Tailoring Solutions in Hyderabad",
      phone: getVal('setting-biz-phone'),
      email: getVal('setting-biz-email') || "contact@zmenterprises.com",
      address: getVal('setting-biz-address') || "Shop No. 12, Commercial Complex, Hyderabad, Telangana - 500001",
      city: getVal('setting-biz-city') || "Hyderabad",
      state: getVal('setting-biz-state') || "Telangana",
      terms: getVal('setting-biz-terms') || "Fitting alterations accommodated within 7 days of delivery. Sample approval prior to bulk uniform production."
    };

    this.saveData();
    this.updateContactDisplay();
    this.showToast('Business & WhatsApp details updated successfully!');
  }

  updateContactDisplay() {
    const s = this.data.settings || {};
    const addr = s.address || "Shop No. 12, Commercial Complex, Hyderabad, Telangana - 500001";
    const phone = s.phone ? s.phone : "";
    const email = s.email || "contact@zmenterprises.com";

    const addrEl = document.getElementById('contact-display-address');
    if (addrEl) addrEl.textContent = addr;

    const phoneEl = document.getElementById('contact-display-phone');
    if (phoneEl) {
      if (phone) {
        phoneEl.innerHTML = `<strong>${phone}</strong> (Direct WhatsApp & Calls)`;
      } else {
        phoneEl.innerHTML = `<span style="color:#d97706; font-weight:600;">⚠️ WhatsApp number not yet configured in Store Settings</span>`;
      }
    }

    const emailEl = document.getElementById('contact-display-email');
    if (emailEl) emailEl.textContent = email;
  }

  getCleanBizPhone() {
    const raw = (this.data.settings && this.data.settings.phone) ? String(this.data.settings.phone).trim() : '';
    const digits = raw.replace(/[^0-9]/g, '');
    if (!digits || digits.length < 10) return '';
    if (digits.length === 10) return '91' + digits;
    return digits;
  }

  openFloatingWhatsApp() {
    const bizPhone = this.getCleanBizPhone();
    if (!bizPhone) {
      this.openModal('modal-whatsapp-setup');
      return;
    }
    const msg = "Hello ZM Enterprises, I am inquiring about school/corporate uniform stitching services in Hyderabad.";
    const url = `https://wa.me/${bizPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
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
    this.showToast('Full backup file downloaded successfully!');
  }

  importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed.customers && parsed.orders) {
          if (!Array.isArray(parsed.enquiries)) parsed.enquiries = [];
          if (!Array.isArray(parsed.uniformGallery)) parsed.uniformGallery = [];
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

  // ==================== B2B BULK ENQUIRY METHODS ====================
  setEnquiryArea(areaName) {
    const el = document.getElementById('enq-city-area');
    if (el) el.value = areaName;
  }

  submitBulkEnquiry(event) {
    if (event && event.preventDefault) event.preventDefault();

    const getVal = (id) => {
      const el = document.getElementById(id);
      return el ? el.value.trim() : '';
    };

    const orgName = getVal('enq-org-name');
    const contactName = getVal('enq-contact-name');
    const contactRole = getVal('enq-contact-role');
    const phone = getVal('enq-phone');
    const email = getVal('enq-email');
    const cityArea = getVal('enq-city-area');
    const category = getVal('enq-category');
    const quantity = getVal('enq-quantity');
    const deliveryDate = getVal('enq-delivery-date');
    const fabricSource = getVal('enq-fabric-source');
    const embroidery = getVal('enq-embroidery');
    const sampleFitting = getVal('enq-sample-fitting');
    const requirements = getVal('enq-requirements');

    // Validation
    if (!orgName) {
      alert("Please enter your School or Company name.");
      document.getElementById('enq-org-name')?.focus();
      return false;
    }
    if (!contactName) {
      alert("Please enter the contact person's name.");
      document.getElementById('enq-contact-name')?.focus();
      return false;
    }
    const digitsOnly = phone.replace(/[^0-9]/g, '');
    if (digitsOnly.length < 10) {
      alert("Please enter a valid 10-digit mobile number so we can send your quotation.");
      document.getElementById('enq-phone')?.focus();
      return false;
    }
    if (!cityArea) {
      alert("Please specify your city or area in Hyderabad / Telangana.");
      document.getElementById('enq-city-area')?.focus();
      return false;
    }
    if (!deliveryDate) {
      alert("Please select your required delivery date.");
      document.getElementById('enq-delivery-date')?.focus();
      return false;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    if (deliveryDate < todayStr) {
      alert("The delivery date cannot be in the past. Please choose today or an upcoming date.");
      document.getElementById('enq-delivery-date')?.focus();
      return false;
    }

    const enqId = 'ENQ-' + new Date().getFullYear() + '-' + Math.floor(100000 + Math.random() * 900000);

    const newEnquiry = {
      id: enqId,
      createdAt: new Date().toISOString(),
      schoolOrCompany: orgName,
      contactPerson: contactName,
      contactRole: contactRole,
      phone: phone,
      email: email,
      cityArea: cityArea,
      category: category,
      quantity: quantity,
      deliveryDate: deliveryDate,
      fabricSource: fabricSource,
      embroidery: embroidery,
      sampleFitting: sampleFitting,
      requirements: requirements,
      status: 'New', // New | In Discussion | Quotation Sent | Converted to Order | Closed
      internalNotes: '',
      orderId: null
    };

    if (!Array.isArray(this.data.enquiries)) {
      this.data.enquiries = [];
    }
    this.data.enquiries.unshift(newEnquiry);
    this.saveData();

    this.activeSubmittedEnquiry = newEnquiry;
    this.renderEnquiryConfirmation(newEnquiry);
    this.updateEnquiryBadge();
    this.showToast(`Quotation request ${enqId} received successfully!`);
    return false;
  }

  renderEnquiryConfirmation(enq) {
    const box = document.getElementById('enquiry-confirmation-box');
    const formBox = document.getElementById('enquiry-form-container');
    const refEl = document.getElementById('conf-ref-id');
    const table = document.getElementById('conf-summary-table');

    if (refEl) refEl.textContent = enq.id;
    if (table) {
      table.innerHTML = `
        <tr><td>Organization / School:</td><td><strong>${this.escapeHtml(enq.schoolOrCompany)}</strong></td></tr>
        <tr><td>Contact Person:</td><td>${this.escapeHtml(enq.contactPerson)} ${enq.contactRole ? `(${this.escapeHtml(enq.contactRole)})` : ''}</td></tr>
        <tr><td>Phone Number:</td><td>${this.escapeHtml(enq.phone)}</td></tr>
        ${enq.email ? `<tr><td>Email Address:</td><td>${this.escapeHtml(enq.email)}</td></tr>` : ''}
        <tr><td>City / Locality:</td><td>${this.escapeHtml(enq.cityArea)}</td></tr>
        <tr><td>Uniform Category:</td><td><strong>${this.escapeHtml(enq.category)}</strong></td></tr>
        <tr><td>Estimated Quantity:</td><td>${this.escapeHtml(enq.quantity)}</td></tr>
        <tr><td>Target Delivery Date:</td><td>${enq.deliveryDate}</td></tr>
        <tr><td>Fabric Sourcing:</td><td>${this.escapeHtml(enq.fabricSource)}</td></tr>
        ${enq.embroidery ? `<tr><td>Logo / Crest Work:</td><td>${this.escapeHtml(enq.embroidery)}</td></tr>` : ''}
        ${enq.requirements ? `<tr><td>Special Specifications:</td><td>${this.escapeHtml(enq.requirements)}</td></tr>` : ''}
      `;
    }

    if (formBox) formBox.style.display = 'none';
    if (box) {
      box.style.display = 'block';
      box.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  resetEnquiryForm() {
    const form = document.getElementById('bulk-enquiry-form');
    if (form) form.reset();
    const box = document.getElementById('enquiry-confirmation-box');
    const formBox = document.getElementById('enquiry-form-container');
    if (box) box.style.display = 'none';
    if (formBox) {
      formBox.style.display = 'block';
      formBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  sendEnquiryViaWhatsApp() {
    const enq = this.activeSubmittedEnquiry;
    if (!enq) {
      this.openFloatingWhatsApp();
      return;
    }

    const bizPhone = this.getCleanBizPhone();
    if (!bizPhone) {
      this.openModal('modal-whatsapp-setup');
      return;
    }

    const msg = `Hello ZM Enterprises,\nI have submitted a Bulk Uniform Stitching Enquiry on your website:\n\n*Reference:* ${enq.id}\n*Institution:* ${enq.schoolOrCompany}\n*Contact Person:* ${enq.contactPerson} (${enq.phone})\n*City/Area:* ${enq.cityArea}\n*Category:* ${enq.category}\n*Estimated Quantity:* ${enq.quantity}\n*Target Delivery:* ${enq.deliveryDate}\n*Fabric Sourcing:* ${enq.fabricSource}\n${enq.requirements ? `*Notes:* ${enq.requirements}\n` : ''}\nPlease review and provide an itemized bulk quotation.`;

    const url = `https://wa.me/${bizPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  }

  // ==================== B2B ENQUIRIES ADMIN PIPELINE ====================
  updateEnquiryBadge() {
    const list = this.data.enquiries || [];
    const newCount = list.filter(e => e.status === 'New').length;
    const badge = document.getElementById('nav-enquiry-count');
    if (badge) {
      badge.textContent = newCount;
      badge.style.display = newCount > 0 ? 'inline-block' : 'none';
    }
  }

  renderEnquiriesAdmin() {
    const list = this.data.enquiries || [];
    const totalEl = document.getElementById('stat-total-enquiries');
    const newEl = document.getElementById('stat-new-enquiries');
    const quotedEl = document.getElementById('stat-quoted-enquiries');
    const convEl = document.getElementById('stat-converted-enquiries');

    const total = list.length;
    const newCount = list.filter(e => e.status === 'New').length;
    const quotedCount = list.filter(e => e.status === 'Quotation Sent' || e.status === 'In Discussion').length;
    const convertedCount = list.filter(e => e.status === 'Converted to Order').length;

    if (totalEl) totalEl.textContent = total;
    if (newEl) newEl.textContent = newCount;
    if (quotedEl) quotedEl.textContent = quotedCount;
    if (convEl) convEl.textContent = convertedCount;

    this.filterEnquiries();
  }

  filterEnquiries() {
    const list = this.data.enquiries || [];
    const searchVal = (document.getElementById('enquiry-search')?.value || '').toLowerCase().trim();
    const statusVal = document.getElementById('enquiry-status-filter')?.value || 'all';
    const catVal = document.getElementById('enquiry-category-filter')?.value || 'all';

    const filtered = list.filter(e => {
      const matchSearch = !searchVal || 
        (e.id && e.id.toLowerCase().includes(searchVal)) ||
        (e.schoolOrCompany && e.schoolOrCompany.toLowerCase().includes(searchVal)) ||
        (e.contactPerson && e.contactPerson.toLowerCase().includes(searchVal)) ||
        (e.phone && e.phone.includes(searchVal)) ||
        (e.cityArea && e.cityArea.toLowerCase().includes(searchVal));

      const matchStatus = statusVal === 'all' || e.status === statusVal;
      const matchCat = catVal === 'all' || (e.category && e.category.toLowerCase().includes(catVal.toLowerCase()));

      return matchSearch && matchStatus && matchCat;
    });

    const tbody = document.getElementById('admin-enquiries-tbody');
    if (!tbody) return;

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:32px; color:#94a3b8;">No enquiries found matching your filter.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(e => {
      const statusBadge = this.getEnquiryStatusBadge(e.status);
      const dateStr = e.createdAt ? new Date(e.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

      return `
        <tr>
          <td>
            <strong>#${e.id}</strong><br>
            <small style="color:#64748b;">${dateStr}</small>
          </td>
          <td>
            <div style="font-weight:700; color:#0f172a;">${this.escapeHtml(e.schoolOrCompany)}</div>
            <div style="font-size:0.825rem; color:#475569;">${this.escapeHtml(e.contactPerson)} • 📞 ${this.escapeHtml(e.phone)}</div>
          </td>
          <td>
            <div style="font-weight:600;">${this.escapeHtml(e.category)}</div>
            <small style="color:#64748b;">Qty: ${this.escapeHtml(e.quantity)}</small>
          </td>
          <td>${this.escapeHtml(e.cityArea || 'Hyderabad')}</td>
          <td><strong>${e.deliveryDate || '—'}</strong></td>
          <td>${statusBadge}</td>
          <td>
            <div style="display:flex; gap:6px; flex-wrap:wrap;">
              <button class="btn btn-sm btn-outline" onclick="app.viewEnquiryDetails('${e.id}')" title="View Full Details">
                👁️ View
              </button>
              <button class="btn btn-sm btn-whatsapp" onclick="app.whatsappEnquiryClient('${e.id}')" title="WhatsApp Customer">
                💬 Reply
              </button>
              ${e.status !== 'Converted to Order' ? `
                <button class="btn btn-sm btn-primary" onclick="app.convertEnquiryToOrder('${e.id}')" title="Convert to Order">
                  ✂️ Convert
                </button>
              ` : `
                <span class="badge badge-paid" style="font-size:0.75rem;">Converted ✔</span>
              `}
              <button class="btn btn-sm btn-danger-outline" onclick="app.deleteEnquiry('${e.id}')" title="Delete">
                🗑️
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  getEnquiryStatusBadge(status) {
    const map = {
      'New': '<span class="badge-enq-new">● New</span>',
      'In Discussion': '<span class="badge-enq-discussion">● In Discussion</span>',
      'Quotation Sent': '<span class="badge-enq-quoted">● Quote Sent</span>',
      'Converted to Order': '<span class="badge-enq-converted">✔ Converted</span>',
      'Closed': '<span class="badge-enq-closed">✕ Closed</span>'
    };
    return map[status] || `<span class="badge-enq-new">${status || 'New'}</span>`;
  }

  viewEnquiryDetails(enqId) {
    const enq = (this.data.enquiries || []).find(e => e.id === enqId);
    if (!enq) return;

    this.activeViewEnquiryId = enqId;
    const body = document.getElementById('modal-enq-detail-body');
    const title = document.getElementById('modal-enq-detail-title');
    if (title) title.textContent = `Enquiry #${enq.id} – ${enq.schoolOrCompany}`;

    const dateStr = enq.createdAt ? new Date(enq.createdAt).toLocaleString('en-IN') : '—';

    if (body) {
      body.innerHTML = `
        <div style="background:#0a0f18; color:#fff; border-radius:10px; padding:18px; margin-bottom:18px; border:1px solid #1f293d;">
          <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:12px;">
            <div>
              <div style="font-size:1.3rem; font-weight:700;">${this.escapeHtml(enq.schoolOrCompany)}</div>
              <div style="color:#34d399; font-size:0.875rem; margin-top:2px;">Contact: <strong>${this.escapeHtml(enq.contactPerson)}</strong> ${enq.contactRole ? `(${this.escapeHtml(enq.contactRole)})` : ''}</div>
              <div style="font-size:0.85rem; color:#94a3b8; margin-top:4px;">📞 Phone: ${this.escapeHtml(enq.phone)} | ✉️ ${this.escapeHtml(enq.email || 'No email')}</div>
              <div style="font-size:0.85rem; color:#94a3b8;">📍 Locality / Area: ${this.escapeHtml(enq.cityArea || 'Hyderabad')}</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:0.8rem; color:#94a3b8;">Submitted: ${dateStr}</div>
              <div style="margin-top:8px;">${this.getEnquiryStatusBadge(enq.status)}</div>
            </div>
          </div>
        </div>

        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:16px; margin-bottom:18px;">
          <h4 style="font-size:0.95rem; font-weight:700; color:var(--primary-dark); margin-bottom:12px; text-transform:uppercase;">
            📋 Uniform Specifications
          </h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px;">
            <div class="measure-field"><label>Category</label><strong>${this.escapeHtml(enq.category)}</strong></div>
            <div class="measure-field"><label>Estimated Quantity</label><strong>${this.escapeHtml(enq.quantity)}</strong></div>
            <div class="measure-field"><label>Target Delivery Date</label><strong>${enq.deliveryDate || '—'}</strong></div>
            <div class="measure-field"><label>Fabric Sourcing</label><strong>${this.escapeHtml(enq.fabricSource)}</strong></div>
            <div class="measure-field"><label>Logo / Crest</label><strong>${this.escapeHtml(enq.embroidery || 'Standard')}</strong></div>
            <div class="measure-field"><label>Sample Fitting</label><strong>${this.escapeHtml(enq.sampleFitting || 'Standard')}</strong></div>
          </div>
          ${enq.requirements ? `
            <div style="margin-top:14px; padding-top:10px; border-top:1px solid #e2e8f0;">
              <label style="font-size:0.75rem; color:#64748b; font-weight:700; display:block; margin-bottom:4px;">Client's Specific Requirements:</label>
              <p style="font-size:0.875rem; color:#0f172a; margin:0; line-height:1.5;">${this.escapeHtml(enq.requirements)}</p>
            </div>
          ` : ''}
        </div>

        <div style="background:#fff; border:1px solid #e2e8f0; border-radius:10px; padding:16px; margin-bottom:16px;">
          <h4 style="font-size:0.95rem; font-weight:700; color:var(--gray-900); margin-bottom:12px;">
            ⚙️ Workshop Status & Master Tailor Internal Notes
          </h4>
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Current Pipeline Status</label>
              <select id="modal-enq-status-select" class="form-select" onchange="app.updateEnquiryStatus('${enq.id}', this.value)">
                <option value="New" ${enq.status === 'New' ? 'selected' : ''}>New / Pending</option>
                <option value="In Discussion" ${enq.status === 'In Discussion' ? 'selected' : ''}>In Discussion</option>
                <option value="Quotation Sent" ${enq.status === 'Quotation Sent' ? 'selected' : ''}>Quotation Sent</option>
                <option value="Converted to Order" ${enq.status === 'Converted to Order' ? 'selected' : ''}>Converted to Order</option>
                <option value="Closed" ${enq.status === 'Closed' ? 'selected' : ''}>Closed</option>
              </select>
            </div>
            <div class="form-group full-width">
              <label class="form-label">Internal Workshop Notes (Quotations quoted, sample dates, fabric rates)</label>
              <textarea id="modal-enq-notes" class="form-input" rows="2" placeholder="e.g. Quoted ₹680 per set for Poly-Viscose blend; sample delivery on 15th...">${this.escapeHtml(enq.internalNotes || '')}</textarea>
            </div>
            <div class="full-width" style="text-align:right;">
              <button class="btn btn-sm btn-outline" onclick="app.saveEnquiryInternalNotes('${enq.id}')">💾 Save Notes</button>
            </div>
          </div>
        </div>
      `;
    }

    this.openModal('modal-enquiry-detail');
  }

  saveEnquiryInternalNotes(enqId) {
    const enq = (this.data.enquiries || []).find(e => e.id === enqId);
    if (!enq) return;

    const notes = document.getElementById('modal-enq-notes')?.value || '';
    enq.internalNotes = notes;
    this.saveData();
    this.showToast("Internal notes updated.");
  }

  updateEnquiryStatus(enqId, newStatus) {
    const enq = (this.data.enquiries || []).find(e => e.id === enqId);
    if (!enq) return;

    enq.status = newStatus;
    this.saveData();
    this.updateEnquiryBadge();
    this.renderEnquiriesAdmin();
    this.showToast(`Enquiry #${enq.id} status updated to "${newStatus}"`);
  }

  whatsappCurrentEnquiry() {
    if (this.activeViewEnquiryId) {
      this.whatsappEnquiryClient(this.activeViewEnquiryId);
    }
  }

  whatsappEnquiryClient(enqId) {
    const enq = (this.data.enquiries || []).find(e => e.id === enqId);
    if (!enq) return;

    const cleanPhone = enq.phone.replace(/[^0-9]/g, '');
    let targetPhone = cleanPhone;
    if (cleanPhone.length === 10) targetPhone = '91' + cleanPhone;

    const msg = `Hello ${enq.contactPerson},\nGreetings from ZM Enterprises Tailoring Studio, Hyderabad!\n\nRegarding your uniform enquiry (*${enq.id}*) for *${enq.schoolOrCompany}* (${enq.category}, ${enq.quantity}):\nWe have reviewed your requirements and would like to share our itemized bulk quotation and sample fabric details. When would be a convenient time for a quick call or sample viewing?`;

    const url = `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  }

  convertCurrentEnquiryToOrder() {
    if (this.activeViewEnquiryId) {
      this.closeModal('modal-enquiry-detail');
      this.convertEnquiryToOrder(this.activeViewEnquiryId);
    }
  }

  convertEnquiryToOrder(enqId) {
    const enq = (this.data.enquiries || []).find(e => e.id === enqId);
    if (!enq) return;

    // Check if customer already exists (by phone or name)
    let cust = (this.data.customers || []).find(c => 
      c.phone === enq.phone || 
      (c.name && c.name.toLowerCase() === enq.schoolOrCompany.toLowerCase())
    );

    if (!cust) {
      cust = {
        id: 'CUST-' + Date.now().toString().slice(-4),
        name: enq.schoolOrCompany,
        gender: 'Kids',
        phone: enq.phone,
        email: enq.email || '',
        address: enq.cityArea || 'Hyderabad, Telangana',
        measurements: {
          notes: `Contact: ${enq.contactPerson} (${enq.contactRole || 'Lead'}). Requirements: ${enq.requirements || ''}`
        },
        createdAt: new Date().toISOString()
      };
      this.data.customers.unshift(cust);
      this.saveData();
      this.populateCustomerDropdowns();
      this.renderCustomersGrid();
    }

    const isCorporate = enq.category.toLowerCase().includes('corporate') || enq.category.toLowerCase().includes('hospitality');
    const itemType = isCorporate ? "Corporate Staff Blazer & Shirt" : "School Uniform Batch Set";

    let parsedQty = 50;
    const qtyMatch = (enq.quantity || '').match(/\d+/);
    if (qtyMatch) {
      parsedQty = parseInt(qtyMatch[0], 10);
    }

    this.openNewOrderModal({ customerId: cust.id });

    setTimeout(() => {
      const catEl = document.getElementById('order-category');
      if (catEl) {
        catEl.value = 'Uniform';
        catEl.dispatchEvent(new Event('change'));
      }
      const itemEl = document.getElementById('order-item-type');
      if (itemEl) itemEl.value = itemType;

      const titleEl = document.getElementById('order-title');
      if (titleEl) titleEl.value = `${enq.category} batch for ${enq.schoolOrCompany}`;

      const qtyEl = document.getElementById('order-qty');
      if (qtyEl) qtyEl.value = parsedQty;

      const delEl = document.getElementById('order-delivery-date');
      if (delEl) delEl.value = enq.deliveryDate;

      const notesEl = document.getElementById('order-notes');
      if (notesEl) {
        notesEl.value = `[Converted from Bulk Enquiry #${enq.id}]\nContact: ${enq.contactPerson} (${enq.phone})\nFabric: ${enq.fabricSource}\nEmbroidery: ${enq.embroidery || 'None'}\nSpecs: ${enq.requirements || 'N/A'}`;
      }

      this.calculateOrderTotal();
    }, 150);

    enq.status = 'Converted to Order';
    this.saveData();
    this.renderEnquiriesAdmin();
    this.updateEnquiryBadge();
    this.showToast(`Enquiry #${enq.id} converted into a new tailoring order!`);
  }

  deleteEnquiry(enqId) {
    const enq = (this.data.enquiries || []).find(e => e.id === enqId);
    if (!enq) return;

    if (confirm(`Are you sure you want to delete enquiry #${enq.id} from ${enq.schoolOrCompany}?`)) {
      this.data.enquiries = (this.data.enquiries || []).filter(e => e.id !== enqId);
      this.saveData();
      this.renderEnquiriesAdmin();
      this.updateEnquiryBadge();
      this.showToast(`Enquiry #${enq.id} deleted.`);
    }
  }

  // ==================== UNIFORM PHOTO GALLERY ====================
  renderUniformGallery(filter) {
    if (filter) this.galleryFilter = filter;
    const currentFilter = this.galleryFilter || 'all';
    const container = document.getElementById('uniform-gallery-grid');
    if (!container) return;

    let photos = this.data.uniformGallery || [];
    if (currentFilter !== 'all') {
      photos = photos.filter(p => p.category === currentFilter);
    }

    if (photos.length === 0) {
      container.innerHTML = `
        <div class="gallery-card">
          <div class="gallery-img-wrap" style="background:#0a0f1a; color:#34d399; font-size:2.5rem;">
            🏫
          </div>
          <div class="gallery-caption">
            <h4>School Uniform Batch Tailoring</h4>
            <div class="gallery-caption-meta">
              <span>Category: School</span>
              <span style="color:#059669; font-weight:700;">Hyderabad Workshop</span>
            </div>
            <p style="font-size:0.775rem; color:#64748b; margin-top:4px;">Shirts, trousers, pleated pinafores & blazers with crest embroidery.</p>
          </div>
        </div>

        <div class="gallery-card">
          <div class="gallery-img-wrap" style="background:#0a0f1a; color:#34d399; font-size:2.5rem;">
            🏢
          </div>
          <div class="gallery-caption">
            <h4>Corporate Staff Suiting & Blazers</h4>
            <div class="gallery-caption-meta">
              <span>Category: Corporate</span>
              <span style="color:#059669; font-weight:700;">Hyderabad Workshop</span>
            </div>
            <p style="font-size:0.775rem; color:#64748b; margin-top:4px;">Executive poly-viscose blazers, formal trousers & staff shirts.</p>
          </div>
        </div>

        <div class="gallery-card">
          <div class="gallery-img-wrap" style="background:#0a0f1a; color:#34d399; font-size:2.5rem;">
            🩺
          </div>
          <div class="gallery-caption">
            <h4>Healthcare Scrubs & Hospital Tunics</h4>
            <div class="gallery-caption-meta">
              <span>Category: Corporate</span>
              <span style="color:#059669; font-weight:700;">Hyderabad Workshop</span>
            </div>
            <p style="font-size:0.775rem; color:#64748b; margin-top:4px;">Durable, breathable clinical scrubs & doctor consultation coats.</p>
          </div>
        </div>

        <div class="gallery-card" style="border: 2px dashed #cbd5e1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:24px; text-align:center; background:#f8fafc; cursor:pointer;" onclick="app.openAddPhotoModal()">
          <div style="font-size:2rem; margin-bottom:8px;">📷</div>
          <strong style="color:var(--primary); font-size:0.95rem;">+ Add Your Workshop Photo</strong>
          <p style="font-size:0.775rem; color:#64748b; margin-top:6px;">Upload real photos of your stitched uniform batches to showcase your work.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = photos.map(p => `
      <div class="gallery-card">
        <div class="gallery-img-wrap">
          <img src="${p.imageUrl}" alt="${this.escapeHtml(p.title)}" class="gallery-img" onerror="this.src=''; this.alt='Image load error';">
        </div>
        <div class="gallery-caption">
          <h4>${this.escapeHtml(p.title)}</h4>
          <div class="gallery-caption-meta">
            <span>Category: ${p.category}</span>
            <button class="gallery-delete-btn" onclick="app.deleteUniformPhoto('${p.id}')">Delete</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  filterGallery(cat, btnEl) {
    document.querySelectorAll('.gallery-filter-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    this.renderUniformGallery(cat);
  }

  openAddPhotoModal() {
    this.uploadedPhotoDataUrl = null;
    const form = document.getElementById('add-photo-form');
    if (form) form.reset();
    const wrap = document.getElementById('photo-preview-wrap');
    if (wrap) wrap.style.display = 'none';
    this.openModal('modal-add-photo');
  }

  onPhotoFileSelected(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      alert("File is too large. Please select an image under 3MB.");
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.uploadedPhotoDataUrl = e.target.result;
      const previewWrap = document.getElementById('photo-preview-wrap');
      const previewImg = document.getElementById('photo-preview-img');
      if (previewWrap && previewImg) {
        previewImg.src = e.target.result;
        previewWrap.style.display = 'block';
      }
    };
    reader.readAsDataURL(file);
  }

  saveUniformPhoto(event) {
    if (event && event.preventDefault) event.preventDefault();

    const title = document.getElementById('photo-title')?.value.trim();
    const category = document.getElementById('photo-category')?.value || 'School';
    const url = document.getElementById('photo-url')?.value.trim();
    const imgData = this.uploadedPhotoDataUrl || url;

    if (!title) {
      alert("Please enter a caption for the photo.");
      return false;
    }
    if (!imgData) {
      alert("Please select an image file or provide an image URL.");
      return false;
    }

    if (!Array.isArray(this.data.uniformGallery)) {
      this.data.uniformGallery = [];
    }

    const newPhoto = {
      id: 'IMG-' + Date.now(),
      title: title,
      category: category,
      imageUrl: imgData,
      createdAt: new Date().toISOString()
    };

    this.data.uniformGallery.unshift(newPhoto);
    this.saveData();
    this.closeModal('modal-add-photo');
    this.renderUniformGallery();
    this.showToast("Uniform photograph saved to gallery!");
    return false;
  }

  deleteUniformPhoto(photoId) {
    if (confirm("Are you sure you want to delete this photograph from the gallery?")) {
      this.data.uniformGallery = (this.data.uniformGallery || []).filter(p => p.id !== photoId);
      this.saveData();
      this.renderUniformGallery();
      this.showToast("Photograph removed from gallery.");
    }
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
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
