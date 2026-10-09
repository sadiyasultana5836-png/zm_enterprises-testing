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
        coatLength: "30.5",
        chest: "40",
        stomach: "36",
        waist: "34",
        shoulder: "18",
        crossBack: "16.5",
        crossFront: "16",
        sleeveLength: "25",
        armhole: "18.5",
        bicep: "14",
        elbow: "12.5",
        cuff: "10",
        neck: "16",
        pantLength: "41",
        inseam: "31",
        pantWaist: "34",
        hip: "42",
        thigh: "25",
        knee: "18",
        calf: "15.5",
        bottom: "15",
        rise: "11.5",
        salwarLength: "",
        flare: "",
        blouseLength: "",
        upperChest: "",
        underBust: "",
        bustPoint: "",
        apexDistance: "",
        frontNeck: "7",
        backNeck: "2.5",
        frontNeckStyle: "Round",
        backNeckStyle: "High Back",
        fitType: "Modern Slim",
        lining: "Full Lining",
        shoulderType: "Normal",
        posture: "Normal"
      },
      notes: "Prefers modern slim cut for blazers; 2 front buttons; double back vents.",
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
        coatLength: "",
        chest: "37",
        stomach: "32",
        waist: "31",
        shoulder: "14.5",
        crossBack: "13.5",
        crossFront: "13",
        sleeveLength: "18",
        armhole: "16",
        bicep: "12",
        elbow: "10.5",
        cuff: "9",
        neck: "14",
        pantLength: "38",
        inseam: "28",
        pantWaist: "31",
        hip: "40",
        thigh: "23",
        knee: "17",
        calf: "14",
        bottom: "13",
        rise: "12",
        salwarLength: "39",
        flare: "140",
        blouseLength: "14.5",
        upperChest: "35",
        underBust: "30",
        bustPoint: "10",
        apexDistance: "7.5",
        frontNeck: "7.5",
        backNeck: "9",
        frontNeckStyle: "Sweetheart",
        backNeckStyle: "Backless Dori",
        fitType: "Modern Slim",
        lining: "Santoon Aster",
        shoulderType: "Normal",
        posture: "Normal"
      },
      notes: "Deep back neck with latkan tassels. High quality santoon silk lining required.",
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
        coatLength: "22",
        chest: "30",
        stomach: "27",
        waist: "26",
        shoulder: "13",
        crossBack: "12",
        crossFront: "11.5",
        sleeveLength: "17",
        armhole: "14",
        bicep: "10",
        elbow: "9",
        cuff: "8",
        neck: "13",
        pantLength: "32",
        inseam: "24",
        pantWaist: "26",
        hip: "32",
        thigh: "18",
        knee: "14",
        calf: "12",
        bottom: "13",
        rise: "9.5",
        salwarLength: "",
        flare: "",
        blouseLength: "",
        upperChest: "",
        underBust: "",
        bustPoint: "",
        apexDistance: "",
        frontNeck: "5",
        backNeck: "2",
        frontNeckStyle: "Stand Collar",
        backNeckStyle: "High Back",
        fitType: "Regular Fit",
        lining: "Half Lining",
        shoulderType: "Normal",
        posture: "Normal"
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
        coatLength: "",
        chest: "35",
        stomach: "30",
        waist: "29",
        shoulder: "14",
        crossBack: "13",
        crossFront: "12.5",
        sleeveLength: "16",
        armhole: "15",
        bicep: "11.5",
        elbow: "10",
        cuff: "8.5",
        neck: "13.5",
        pantLength: "37",
        inseam: "27.5",
        pantWaist: "29",
        hip: "38",
        thigh: "22",
        knee: "16",
        calf: "13.5",
        bottom: "12",
        rise: "11",
        salwarLength: "38",
        flare: "90",
        blouseLength: "14",
        upperChest: "33.5",
        underBust: "28.5",
        bustPoint: "9.5",
        apexDistance: "7",
        frontNeck: "6.5",
        backNeck: "7",
        frontNeckStyle: "Boat",
        backNeckStyle: "Square",
        fitType: "Regular Fit",
        lining: "Cotton Aster",
        shoulderType: "Normal",
        posture: "Normal"
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
      itemType: "Men's Bespoke 3-Piece Suit",
      qty: 1,
      title: "Men's Bespoke 3-Piece Suit (Navy Italian Wool)",
      fabric: "Client provided Italian Super 120s Wool",
      fabricSource: "Client Provided",
      fabricMeter: "3.5 Meters",
      liningMaterial: "Italian Silk Lining",
      fit: "Modern Slim",
      collar: "Notch Lapel",
      sleeve: "Full Sleeve",
      lining: "Full Lining",
      vents: "Double Vent",
      pockets: "Two Flap Pockets",
      embroidery: "Plain / No Work",
      masterTailor: "Master Zahid (Cutting Head)",
      adjustments: "Fitted waist suppression, extra 1/2 inch in sleeve length.",
      trialDate: "2026-10-10",
      deliveryDate: "2026-10-15",
      status: "Cutting",
      priority: "Express",
      priceStitching: 6500,
      priceFabric: 0,
      priceLining: 1500,
      priceEmbroidery: 0,
      priceExtra: 500,
      discount: 0,
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
      itemType: "Heavy Designer Anarkali Suit",
      qty: 1,
      title: "Bridal Heavy Anarkali Suit with Dupatta Bordering",
      fabric: "Pure Georgette with Zari work (ZM Sourced)",
      fabricSource: "ZM Sourced",
      fabricMeter: "5.5 Meters",
      liningMaterial: "Santoon Silk & Cancan",
      fit: "Modern Slim",
      collar: "Sweetheart Neck",
      sleeve: "3/4th Sleeve",
      lining: "Cancan Flare",
      vents: "Side Slits",
      pockets: "Concealed Mobile Pocket",
      embroidery: "Zari & Sequins",
      masterTailor: "Ladies Couture Master",
      adjustments: "Deep back neckline 9.5 inches with padded cups.",
      trialDate: "2026-10-09",
      deliveryDate: "2026-10-13",
      status: "Stitching",
      priority: "Standard",
      priceStitching: 3500,
      priceFabric: 2000,
      priceLining: 800,
      priceEmbroidery: 0,
      priceExtra: 0,
      discount: 100,
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
      itemType: "School Uniform Batch Set",
      qty: 25,
      title: "Batch Order: 25 Pairs School Uniform Shirts & Trousers",
      fabric: "Dacron Poly-Cotton Blend (Grey & White)",
      fabricSource: "ZM Sourced",
      fabricMeter: "70 Meters",
      liningMaterial: "No Lining",
      fit: "Regular Classic",
      collar: "Classic Shirt Collar",
      sleeve: "Full Sleeve",
      lining: "No Lining",
      vents: "Single Center Vent",
      pockets: "Two Flap Pockets",
      embroidery: "Plain / No Work",
      masterTailor: "Workshop Main Team",
      adjustments: "Batch standard grade 6 size sample pattern.",
      trialDate: "2026-10-14",
      deliveryDate: "2026-10-20",
      status: "Received",
      priority: "Standard",
      priceStitching: 500,
      priceFabric: 360,
      priceLining: 0,
      priceEmbroidery: 0,
      priceExtra: 0,
      discount: 0,
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
      itemType: "Alteration & Fitting",
      qty: 1,
      title: "Designer Kurti Alteration & Fitting + Palazzo Hemming",
      fabric: "Silk Crepe",
      fabricSource: "Client Provided",
      fabricMeter: "—",
      liningMaterial: "Original Lining",
      fit: "Regular Classic",
      collar: "Boat Neck",
      sleeve: "Half Sleeve",
      lining: "Cotton Aster",
      vents: "Side Slits",
      pockets: "No Pocket",
      embroidery: "Plain / No Work",
      masterTailor: "Alteration Specialist",
      adjustments: "Waist take-in 1.5 inches; palazzo shorten 1 inch.",
      trialDate: "2026-10-08",
      deliveryDate: "2026-10-09",
      status: "Trial Ready",
      priority: "Standard",
      priceStitching: 450,
      priceFabric: 0,
      priceLining: 0,
      priceEmbroidery: 0,
      priceExtra: 200,
      discount: 0,
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
    if (m.shoulder) chips.push(`Teera: <strong>${m.shoulder}"</strong>`);
    if (m.sleeveLength) chips.push(`Sleeve: <strong>${m.sleeveLength}"</strong>`);
    if (m.armhole) chips.push(`Mudda: <strong>${m.armhole}"</strong>`);
    if (m.bicep) chips.push(`Bicep: <strong>${m.bicep}"</strong>`);
    if (m.neck) chips.push(`Neck: <strong>${m.neck}"</strong>`);
    if (m.pantLength) chips.push(`Pant: <strong>${m.pantLength}"</strong>`);
    if (m.pantWaist) chips.push(`Pant Waist: <strong>${m.pantWaist}"</strong>`);
    if (m.hip) chips.push(`Hip/Seat: <strong>${m.hip}"</strong>`);
    if (m.thigh) chips.push(`Raan: <strong>${m.thigh}"</strong>`);
    if (m.knee) chips.push(`Knee: <strong>${m.knee}"</strong>`);
    if (m.bottom) chips.push(`Mori: <strong>${m.bottom}"</strong>`);
    if (m.rise) chips.push(`Aasan: <strong>${m.rise}"</strong>`);
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
        ${m.lining ? `<span class="snapshot-chip" style="background:#fef3c7; color:#92400e; font-weight:700;">Aster: ${m.lining}</span>` : ''}
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
                ${m.shoulder ? `<span class="snapshot-chip">Teera: ${m.shoulder}"</span>` : ''}
                ${m.sleeveLength ? `<span class="snapshot-chip">Sleeve: ${m.sleeveLength}"</span>` : ''}
                ${m.armhole ? `<span class="snapshot-chip">Mudda: ${m.armhole}"</span>` : ''}
                ${m.pantLength ? `<span class="snapshot-chip">Pant: ${m.pantLength}"</span>` : ''}
                ${m.hip ? `<span class="snapshot-chip">Hip: ${m.hip}"</span>` : ''}
                ${m.bottom ? `<span class="snapshot-chip">Mori: ${m.bottom}"</span>` : ''}
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
          <div class="measure-field"><label>Shoulder / Teera</label><strong>${m.shoulder ? `${m.shoulder}"` : '—'}</strong></div>
          <div class="measure-field"><label>Cross Back (Peeth)</label><strong>${m.crossBack ? `${m.crossBack}"` : '—'}</strong></div>
          <div class="measure-field"><label>Cross Front</label><strong>${m.crossFront ? `${m.crossFront}"` : '—'}</strong></div>
          <div class="measure-field"><label>Sleeve Length</label><strong>${m.sleeveLength ? `${m.sleeveLength}"` : '—'}</strong></div>
          <div class="measure-field"><label>Armhole / Mudda</label><strong>${m.armhole ? `${m.armhole}"` : '—'}</strong></div>
          <div class="measure-field"><label>Bicep / Dolah</label><strong>${m.bicep ? `${m.bicep}"` : '—'}</strong></div>
          <div class="measure-field"><label>Elbow Round</label><strong>${m.elbow ? `${m.elbow}"` : '—'}</strong></div>
          <div class="measure-field"><label>Cuff / Mori</label><strong>${m.cuff ? `${m.cuff}"` : '—'}</strong></div>
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
          <div class="measure-field"><label>Thigh / Raan</label><strong>${m.thigh ? `${m.thigh}"` : '—'}</strong></div>
          <div class="measure-field"><label>Knee / Ghutna</label><strong>${m.knee ? `${m.knee}"` : '—'}</strong></div>
          <div class="measure-field"><label>Calf / Pindi</label><strong>${m.calf ? `${m.calf}"` : '—'}</strong></div>
          <div class="measure-field"><label>Bottom Opening (Mori)</label><strong>${m.bottom ? `${m.bottom}"` : '—'}</strong></div>
          <div class="measure-field"><label>Crotch / Rise (Aasan)</label><strong>${m.rise ? `${m.rise}"` : '—'}</strong></div>
          <div class="measure-field"><label>Salwar Length</label><strong>${m.salwarLength ? `${m.salwarLength}"` : '—'}</strong></div>
          <div class="measure-field"><label>Flare / Ghair</label><strong>${m.flare ? `${m.flare}"` : '—'}</strong></div>
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
          <div class="item"><label>Shoulder / Teera</label><strong>${m.shoulder || '—'}"</strong></div>
          <div class="item"><label>Cross Back</label><strong>${m.crossBack || '—'}"</strong></div>
          <div class="item"><label>Cross Front</label><strong>${m.crossFront || '—'}"</strong></div>
          <div class="item"><label>Sleeve Length</label><strong>${m.sleeveLength || '—'}"</strong></div>
          <div class="item"><label>Armhole / Mudda</label><strong>${m.armhole || '—'}"</strong></div>
          <div class="item"><label>Bicep / Muscle</label><strong>${m.bicep || '—'}"</strong></div>
          <div class="item"><label>Neck / Collar</label><strong>${m.neck || '—'}"</strong></div>
        </div>

        <div class="section-title">👖 Lower Body (Pant / Trouser / Salwar / Pajama)</div>
        <div class="grid">
          <div class="item"><label>Pant Length (Outseam)</label><strong>${m.pantLength || '—'}"</strong></div>
          <div class="item"><label>Inseam</label><strong>${m.inseam || '—'}"</strong></div>
          <div class="item"><label>Pant Waist</label><strong>${m.pantWaist || '—'}"</strong></div>
          <div class="item"><label>Hip / Seat</label><strong>${m.hip || '—'}"</strong></div>
          <div class="item"><label>Thigh / Raan</label><strong>${m.thigh || '—'}"</strong></div>
          <div class="item"><label>Knee / Ghutna</label><strong>${m.knee || '—'}"</strong></div>
          <div class="item"><label>Calf / Pindi</label><strong>${m.calf || '—'}"</strong></div>
          <div class="item"><label>Bottom Opening (Mori)</label><strong>${m.bottom || '—'}"</strong></div>
          <div class="item"><label>Crotch / Rise (Aasan)</label><strong>${m.rise || '—'}"</strong></div>
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
          <div class="item"><label>Flare / Ghair</label><strong>${m.flare || '—'}"</strong></div>
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
            ${order.priceLining ? `<tr><td>Lining / Aster:</td><td>₹${(order.priceLining * (order.qty || 1)).toLocaleString('en-IN')}</td></tr>` : ''}
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
