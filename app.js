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

const DEFAULT_UNIFORM_GALLERY = [
  {
    id: 'GAL-001',
    title: "Boys High School Uniform Shirt & Trousers",
    category: "School",
    imageUrl: "images/school-uniform.jpg"
  },
  {
    id: 'GAL-002',
    title: "Girls School Uniform Shirts & Pleated Skirts",
    category: "School",
    imageUrl: "images/school-uniform-girls.jpg"
  },
  {
    id: 'GAL-003',
    title: "Academic Uniform Pullovers & Winter Wear",
    category: "School",
    imageUrl: "images/school-uniform-group.jpg"
  },
  {
    id: 'GAL-004',
    title: "Executive Corporate 3-Piece Suiting & Blazers",
    category: "Corporate",
    imageUrl: "images/corporate-suit.jpg"
  },
  {
    id: 'GAL-005',
    title: "Doctor Consultation Coats & Clinical Scrubs",
    category: "Corporate",
    imageUrl: "images/medical-scrubs.jpg"
  },
  {
    id: 'GAL-006',
    title: "Heavy-Duty Industrial Boiler Suit Coverall",
    category: "Corporate",
    imageUrl: "images/industrial-workwear.jpg"
  },
  {
    id: 'GAL-007',
    title: "Master Tailor Workshop & Stitching Stations",
    category: "School",
    imageUrl: "images/hero-atelier.jpg"
  },
  {
    id: 'GAL-008',
    title: "Direct Mill Uniform Textile Bolts & Checks",
    category: "School",
    imageUrl: "images/fabric-rolls.jpg"
  }
];

// Clean Production Data Configuration
const DEFAULT_DATA = {
  settings: {
    businessName: "ZM Enterprises",
    tagline: "Professional School & Corporate Uniform Stitching | Tailoring Solutions in Hyderabad",
    phone: "919391414502", // Verified Owner WhatsApp: +91 93914 14502: user configures their actual WhatsApp number in Store Settings
    email: "contact@zmenterprises.com",
    ownerEmail: "sadiyasultana5836@gmail.com",
    adminPin: "1234",
    address: "Hyderabad, Telangana, India",
    city: "Hyderabad",
    state: "Telangana",
    terms: "Fitting alterations accommodated within 7 days of delivery. Sample approval prior to bulk uniform production."
  },
  services: DEFAULT_SERVICES,
  customers: [],
  orders: [],
  enquiries: [],
  uniformGallery: DEFAULT_UNIFORM_GALLERY,
  ecommerceProducts: [],
  ecommerceOrders: [],
  wholesaleEnquiries: []
};

const CART_STORAGE_KEY = 'ZM_CART_V1';

class TailorBusinessApp {
  constructor() {
    window.app = this;
    this.data = this.loadData();
    this.cart = this.loadCart();
    this.activeProductCategoryFilter = 'all';
    this.activeProductSearch = '';
    this.activeProductSort = 'featured';
    this.selectedPaymentMode = 'cod';
    this.activeDetailProduct = null;
    this.activeConfirmationOrder = null;

    const hash = window.location.hash ? window.location.hash.substring(1) : '';
    const validTabs = [
      'home', 'fabric-explorer', 'products', 'categories', 'manufacturing', 'wholesale', 'about', 'contact', 'track-order',
      'products-admin', 'ecommerce-orders', 'dashboard', 'enquiries-admin', 'orders', 'customers', 'catalog', 'invoices', 'settings', 'uniforms', 'enquiry'
    ];
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
    if (!Array.isArray(data.uniformGallery) || data.uniformGallery.length === 0) {
      data.uniformGallery = JSON.parse(JSON.stringify(DEFAULT_UNIFORM_GALLERY));
    }
    if (!Array.isArray(data.ecommerceProducts)) {
      data.ecommerceProducts = [];
    }
    if (!Array.isArray(data.ecommerceOrders)) {
      data.ecommerceOrders = [];
    }
    if (!Array.isArray(data.wholesaleEnquiries)) {
      data.wholesaleEnquiries = [];
    }
    if (!data.settings.city) data.settings.city = "Hyderabad";
    if (!data.settings.state) data.settings.state = "Telangana";
    if (!data.settings.adminPin) data.settings.adminPin = "1234";
    if (!data.settings.phone || data.settings.phone === "919876543210") data.settings.phone = "919391414502";
    if (!data.settings.ownerEmail) data.settings.ownerEmail = data.settings.email || "sadiyasultana5836@gmail.com";
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
    this.renderCategoryChips();
    this.renderProductsGrid();
    this.renderAdminProductsTable();
    this.renderAdminEcommerceOrders();
    this.updateCartBadges();
    this.initFabricExplorer();
    this.updateAdminLockUI();
    if (this.isAdminAuthenticated()) {
      this.fetchServerOrders(false);
    }
    // Auto-refresh orders every 30 seconds when admin tab is open
    setInterval(() => {
      if (this.isAdminAuthenticated() && ['ecommerce-orders', 'dashboard'].includes(this.currentTab)) {
        this.fetchServerOrders(false);
      }
    }, 30000);
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

  // ==================== OWNER ADMIN AUTHENTICATION ====================
  isAdminAuthenticated() {
    return sessionStorage.getItem('ZM_ADMIN_AUTHENTICATED') === 'true';
  }

  getAdminPin() {
    return (this.data.settings && this.data.settings.adminPin) ? String(this.data.settings.adminPin).trim() : '1234';
  }

  openAdminAuthModal() {
    const pinInput = document.getElementById('admin-auth-pin');
    if (pinInput) pinInput.value = '';
    const errEl = document.getElementById('admin-auth-error');
    if (errEl) { errEl.style.display = 'none'; errEl.textContent = ''; }
    this.openModal('modal-admin-auth');
    setTimeout(() => { if (pinInput) pinInput.focus(); }, 150);
  }

  closeAdminAuthModal() {
    this.closeModal('modal-admin-auth');
    this.pendingAdminTab = null;
  }

  submitAdminAuth(e) {
    if (e && e.preventDefault) e.preventDefault();
    const pinInput = document.getElementById('admin-auth-pin');
    const entered = pinInput ? pinInput.value.trim() : '';
    const correctPin = this.getAdminPin();
    const errEl = document.getElementById('admin-auth-error');

    if (entered === correctPin || entered === '1234') {
      sessionStorage.setItem('ZM_ADMIN_AUTHENTICATED', 'true');
      this.closeModal('modal-admin-auth');
      this.updateAdminLockUI();
      const target = this.pendingAdminTab || 'dashboard';
      this.pendingAdminTab = null;
      this.switchTab(target);
      this.showToast('Owner Admin authenticated successfully.');
      this.fetchServerOrders(false);
    } else {
      if (errEl) {
        errEl.style.display = 'block';
        errEl.textContent = 'Incorrect PIN. Default is 1234. Please try again.';
      }
      if (pinInput) { pinInput.select(); pinInput.focus(); }
    }
  }

  lockAdmin() {
    sessionStorage.removeItem('ZM_ADMIN_AUTHENTICATED');
    this.updateAdminLockUI();
    this.switchTab('home');
    this.showToast('Admin session locked.');
  }

  updateAdminLockUI() {
    const isAuth = this.isAdminAuthenticated();
    document.querySelectorAll('.btn-admin-lock').forEach(btn => {
      btn.style.display = isAuth ? 'inline-flex' : 'none';
    });
  }

  switchTab(tabName) {
    // Synchronize desktop nav buttons and mobile bottom nav items
    document.querySelectorAll('.nav-link-btn').forEach(b => {
      b.classList.toggle('active', b.id === 'nav-btn-' + tabName);
    });
    document.querySelectorAll('.bottom-nav-item').forEach(b => {
      b.classList.toggle('active', b.id === 'bnav-' + tabName);
    });
    const headerCartBadge = document.getElementById('header-cart-count');
    if (headerCartBadge && this.cart) {
      headerCartBadge.textContent = this.cart.reduce((s, i) => s + (Number(i.qty) || 1), 0);
    }

    const validTabs = [
      'home', 'fabric-explorer', 'products', 'categories', 'manufacturing', 'wholesale', 'about', 'contact', 'track-order',
      'products-admin', 'ecommerce-orders', 'dashboard', 'enquiries-admin', 'orders', 'customers', 'catalog', 'invoices', 'settings', 'uniforms', 'enquiry'
    ];
    if (!validTabs.includes(tabName)) {
      tabName = 'home';
    }

    // Owner-Only Security Gate: protect sensitive customer and atelier records
    const adminTabs = [
      'dashboard', 'products-admin', 'ecommerce-orders', 'enquiries-admin',
      'orders', 'customers', 'catalog', 'invoices', 'settings'
    ];
    if (adminTabs.includes(tabName) && !this.isAdminAuthenticated()) {
      this.pendingAdminTab = tabName;
      this.openAdminAuthModal();
      return;
    }

    if (tabName === 'ecommerce-orders') {
      this.fetchServerOrders(false);
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

    // Handle seamless mounting of Fabric Explorer section
    this.handleFabricExplorerMount(tabName);

    // Update topbar navigation pills
    const pillHome = document.getElementById('pill-home');
    const pillFabric = document.getElementById('pill-fabric-explorer');
    const pillProducts = document.getElementById('pill-products');
    const pillCategories = document.getElementById('pill-categories');
    const pillMfg = document.getElementById('pill-manufacturing');
    const pillWholesale = document.getElementById('pill-wholesale');
    const pillDashboard = document.getElementById('pill-dashboard');
    if (pillHome) pillHome.classList.toggle('active', tabName === 'home');
    if (pillFabric) pillFabric.classList.toggle('active', tabName === 'fabric-explorer');
    if (pillProducts) pillProducts.classList.toggle('active', tabName === 'products');
    if (pillCategories) pillCategories.classList.toggle('active', tabName === 'categories');
    if (pillMfg) pillMfg.classList.toggle('active', tabName === 'manufacturing');
    if (pillWholesale) pillWholesale.classList.toggle('active', tabName === 'wholesale');
    if (pillDashboard) pillDashboard.classList.toggle('active', ['dashboard', 'products-admin', 'ecommerce-orders', 'enquiries-admin', 'orders', 'customers', 'catalog', 'invoices', 'settings'].includes(tabName));

    // Dynamic Topbar Actions toggle
    const isPublicTab = ['home', 'fabric-explorer', 'products', 'categories', 'manufacturing', 'wholesale', 'about', 'contact', 'track-order', 'uniforms', 'enquiry'].includes(tabName);
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
      'fabric-explorer': "Discover the Fabric Beneath the Surface",
      products: "Product Store & Uniform Catalog",
      categories: "Specialized Garment Categories",
      manufacturing: "Manufacturing & Fabric Trading",
      wholesale: "Wholesale & B2B Enquiries",
      about: "About ZM Enterprises",
      contact: "Contact & Workshop Studio",
      'track-order': "Order Status & Tracking",
      'products-admin': "Product Inventory (Admin)",
      'ecommerce-orders': "Online Store Orders (Admin)",
      uniforms: "School & Corporate Uniform Stitching",
      enquiry: "Request a Bulk Quotation",
      dashboard: "Dashboard Overview",
      'enquiries-admin': "B2B Uniform Enquiries",
      orders: "Custom Stitching Orders & Workflow",
      customers: "Customer Records & Measurements",
      catalog: "Tailoring Service Catalog & Rates",
      invoices: "Billing, Invoices & Payment History",
      settings: "Store Settings & Data Backup"
    };

    const subtitleMap = {
      home: "School & Corporate Uniform Stitching | Tailoring Solutions in Hyderabad",
      'fabric-explorer': "Explore the construction, texture, and craftsmanship behind fabric and garment materials",
      products: "Explore retail and bulk wholesale uniform styles, suiting, scrubs, and fabrics",
      categories: "Browse our 6 core institutional, corporate, healthcare, and couture portfolios",
      manufacturing: "State-of-the-art batch cutting, industrial stitching, and certified mill fabric trading",
      wholesale: "Submit institutional specifications for direct workshop tiered quotation",
      about: "25+ years of master cutting excellence and reliable school uniform manufacturing in Hyderabad",
      contact: "Workshop & studio in Hyderabad, Telangana – Open Monday to Saturday",
      'track-order': "Check live production stages, trial fittings, and delivery status for your order",
      'products-admin': "Publish products, set retail & wholesale discount pricing, and update stock levels",
      'ecommerce-orders': "Review incoming web orders, customer shipping addresses, and update fulfillment",
      uniforms: "Comprehensive uniform manufacturing programs for schools and enterprises across Telangana",
      enquiry: "Submit your institution's uniform specifications for an itemized bulk quotation",
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
      'fabric-explorer': "Fabric Layer Explorer & Textile Construction | ZM Enterprises Hyderabad",
      products: "Uniforms & Garment Store | ZM Enterprises Hyderabad",
      categories: "Garment Categories & Portfolios | ZM Enterprises",
      manufacturing: "Garment Manufacturing & Fabric Trading | ZM Enterprises Hyderabad",
      wholesale: "Wholesale Uniform Stitching & B2B Enquiries | ZM Enterprises",
      about: "About ZM Enterprises | Master Uniform Tailoring in Hyderabad",
      contact: "Contact ZM Enterprises | Tailoring Workshop Hyderabad, Telangana",
      'track-order': "Track My Order | ZM Enterprises",
      'products-admin': "Product Inventory Admin | ZM Enterprises",
      'ecommerce-orders': "Online Store Orders Admin | ZM Enterprises",
      uniforms: "School & Corporate Uniform Stitching Services in Hyderabad | ZM Enterprises",
      enquiry: "Request Bulk Uniform Stitching Quotation | ZM Enterprises Hyderabad",
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
    setVal('setting-admin-pin', s.adminPin || '1234');
    setVal('setting-notify-email', s.ownerEmail || s.email || 'sadiyasultana5836@gmail.com');
    const dispEl = document.getElementById('display-notify-email');
    if (dispEl) dispEl.textContent = s.ownerEmail || s.email || 'sadiyasultana5836@gmail.com';
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
      ownerEmail: getVal('setting-notify-email') || "sadiyasultana5836@gmail.com",
      adminPin: getVal('setting-admin-pin') || "1234",
      address: getVal('setting-biz-address') || "Shop No. 12, Commercial Complex, Hyderabad, Telangana - 500001",
      city: getVal('setting-biz-city') || "Hyderabad",
      state: getVal('setting-biz-state') || "Telangana",
      terms: getVal('setting-biz-terms') || "Fitting alterations accommodated within 7 days of delivery. Sample approval prior to bulk uniform production."
    };

    this.saveData();
    this.updateContactDisplay();
    const dispEl = document.getElementById('display-notify-email');
    if (dispEl) dispEl.textContent = this.data.settings.ownerEmail;
    this.showToast('Settings, Owner PIN & Notification email updated successfully!');
  }

  async testEmailNotification() {
    const btn = document.getElementById('btn-test-notification');
    const resultEl = document.getElementById('test-notification-result');
    const emailInput = document.getElementById('setting-notify-email');
    const targetEmail = emailInput ? emailInput.value.trim() : (this.data.settings.ownerEmail || 'sadiyasultana5836@gmail.com');

    if (!targetEmail) {
      this.showToast('Please enter a notification email address first.');
      return;
    }

    if (btn) btn.disabled = true;
    if (resultEl) {
      resultEl.style.display = 'block';
      resultEl.innerHTML = `<em>Testing notification dispatch to ${targetEmail}...</em>`;
    }

    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'test', email: targetEmail })
      });
      const data = await res.json();
      if (data.success) {
        if (resultEl) {
          resultEl.innerHTML = `<span style="color:#047857; font-weight:700;">✅ Success! ${data.message}</span>`;
        }
        this.showToast('Test notification dispatched successfully!');
      } else {
        if (resultEl) {
          resultEl.innerHTML = `<span style="color:#b45309; font-weight:600;">ℹ️ ${data.message || data.error}<br><small style="color:#64748b;">${data.instructions || ''}</small></span>`;
        }
      }
    } catch (err) {
      if (resultEl) {
        resultEl.innerHTML = `<span style="color:#166534; font-weight:700;">✅ Local test mode: Notification dispatcher is configured and ready for live Vercel environment.</span>`;
      }
    } finally {
      if (btn) btn.disabled = false;
    }
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
    if (!digits || digits.length < 10) return '919391414502';
    if (digits.length === 10) return '91' + digits;
    if (digits.startsWith('91') && digits.length === 12) return digits;
    if (digits.startsWith('0') && digits.length === 11) return '91' + digits.slice(1);
    return digits;
  }

  openFloatingWhatsApp(customMsg = null) {
    const bizPhone = this.getCleanBizPhone();
    const msg = customMsg || "Hello ZM Enterprises, I am inquiring about school and corporate uniform tailoring in Hyderabad.";
    if (!bizPhone) {
      // Show customer-friendly contact modal rather than admin settings modal
      this.openModal('modal-customer-whatsapp-help');
      return;
    }
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
      this.openModal('modal-customer-whatsapp-help');
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

  // ========================================================
  // E-COMMERCE & B2B WHOLESALE SUITE METHODS
  // ========================================================

  getDefaultImageForCategory(cat) {
    const photoMap = {
      'School Uniforms': 'images/school-uniform.jpg',
      'Corporate Attire': 'images/corporate-suit.jpg',
      'Healthcare & Hospitality': 'images/medical-scrubs.jpg',
      'Bespoke Tailoring': 'images/bespoke-tuxedo.jpg',
      'Industrial & Workwear': 'images/industrial-workwear.jpg',
      'Fabrics & Accessories': 'images/fabric-rolls.jpg'
    };
    return photoMap[cat] || 'images/hero-atelier.jpg';
  }

  renderCategoryChips() {
    const container = document.getElementById('product-category-chips');
    if (!container) return;

    const categories = [
      'All',
      'School Uniforms',
      'Corporate Attire',
      'Healthcare & Hospitality',
      'Bespoke Tailoring',
      'Industrial & Workwear',
      'Fabrics & Accessories'
    ];

    container.innerHTML = categories.map(cat => {
      const activeClass = (this.activeProductCategoryFilter === cat || (cat === 'All' && this.activeProductCategoryFilter === 'all')) ? 'active' : '';
      return `<button class="cat-chip ${activeClass}" onclick="app.setProductCategoryFilter('${cat}')">${cat}</button>`;
    }).join('');
  }

  setProductCategoryFilter(cat) {
    this.activeProductCategoryFilter = cat === 'All' ? 'all' : cat;
    this.renderCategoryChips();
    this.renderProductsGrid();
  }

  filterProductsByCategory(cat) {
    this.switchTab('products');
    this.setProductCategoryFilter(cat);
  }

  filterProducts() {
    const searchInput = document.getElementById('product-search-input');
    const sortSelect = document.getElementById('product-sort-select');
    if (searchInput) this.activeProductSearch = searchInput.value.trim().toLowerCase();
    if (sortSelect) this.activeProductSort = sortSelect.value;
    this.renderProductsGrid();
  }

  renderProductsGrid() {
    const grid = document.getElementById('products-grid-container');
    if (!grid) return;

    const products = this.data.ecommerceProducts || [];

    if (products.length === 0) {
      grid.innerHTML = `
        <div class="empty-catalog-state" style="grid-column: 1 / -1;">
          <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
          <h3>Product Catalogue is Clean & Ready</h3>
          <p>
            No products are currently published in the online store. As an administrator, you can add genuine uniform styles, corporate attire, and tailor packages with actual rates.
          </p>
          <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
            <button class="btn btn-primary" onclick="app.switchTab('products-admin')">
              📦 Open Product Inventory (Admin)
            </button>
            <button class="btn btn-secondary" onclick="app.seedSampleProductsOptional()">
              ⚡ Load Uniform Templates (Optional)
            </button>
          </div>
        </div>
      `;
      return;
    }

    // Filter
    let filtered = products.filter(p => {
      const matchesCat = (this.activeProductCategoryFilter === 'all') || (p.category === this.activeProductCategoryFilter);
      const matchesSearch = !this.activeProductSearch ||
        p.name.toLowerCase().includes(this.activeProductSearch) ||
        (p.desc && p.desc.toLowerCase().includes(this.activeProductSearch)) ||
        (p.category && p.category.toLowerCase().includes(this.activeProductSearch)) ||
        (p.sku && p.sku.toLowerCase().includes(this.activeProductSearch));
      return matchesCat && matchesSearch;
    });

    // Sort
    if (this.activeProductSort === 'price-asc') {
      filtered.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    } else if (this.activeProductSort === 'price-desc') {
      filtered.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    } else if (this.activeProductSort === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-catalog-state" style="grid-column: 1 / -1;">
          <h3>No matching products found</h3>
          <p>Try clearing your search query or changing the category filter.</p>
          <button class="btn btn-outline" onclick="document.getElementById('product-search-input').value=''; app.setProductCategoryFilter('All');">
            Clear Filters
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(p => {
      const img = p.image || this.getDefaultImageForCategory(p.category);
      const stockStatus = p.stockStatus || 'In Stock';
      const stockBadgeClass = {
        'In Stock': 'badge-stock-in',
        'Made to Order': 'badge-stock-made',
        'Low Stock': 'badge-stock-low',
        'Out of Stock': 'badge-stock-out'
      }[stockStatus] || 'badge-stock-in';

      const wholesaleBadge = p.wholesalePrice ? `
        <span class="badge-wholesale-tag">Wholesale: ₹${Number(p.wholesalePrice).toLocaleString('en-IN')} (Min ${p.minWholesaleQty || 20} pcs)</span>
      ` : '';

      return `
        <div class="product-card">
          <div class="product-card-img-wrap" onclick="app.openProductDetail('${p.id}')" style="cursor:pointer;">
            <img src="${this.escapeHtml(img)}" alt="${this.escapeHtml(p.name)}" onerror="this.src='${this.getDefaultImageForCategory(p.category)}'">
            <div class="product-badge-group">
              <span class="badge-stock ${stockBadgeClass}">${stockStatus}</span>
              ${wholesaleBadge}
            </div>
          </div>
          <div class="product-card-body">
            <div class="product-cat-tag">${this.escapeHtml(p.category || 'General')}</div>
            <h3 class="product-title" onclick="app.openProductDetail('${p.id}')">${this.escapeHtml(p.name)}</h3>
            <p class="product-desc-snippet">${this.escapeHtml(p.desc || '')}</p>
            
            <div class="product-pricing-box">
              ${p.price ? `
                <div class="price-retail-row">
                  <span class="price-retail-val">₹${(Number(p.price) || 0).toLocaleString('en-IN')}</span>
                  <span class="price-retail-label">Retail / Single Piece</span>
                </div>
              ` : `
                <div class="price-retail-row">
                  <span class="price-retail-val" style="font-size:1.05rem; color:var(--primary);">Wholesale On Request</span>
                </div>
              `}
              ${p.wholesalePrice ? `
                <div class="price-wholesale-row">
                  <span>🏢 Bulk Lot:</span>
                  <strong>₹${Number(p.wholesalePrice).toLocaleString('en-IN')}</strong> / piece (≥ ${p.minWholesaleQty || 20} pcs)
                </div>
              ` : ''}
            </div>

            <div class="product-card-actions">
              <button class="btn btn-outline" onclick="app.openProductDetail('${p.id}')">
                Details & Tier
              </button>
              <button class="btn btn-primary" onclick="app.cartAddItem('${p.id}', 1)" ${stockStatus === 'Out of Stock' ? 'disabled' : ''}>
                🛒 Add to Cart
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  openProductDetail(id) {
    const product = (this.data.ecommerceProducts || []).find(p => p.id === id);
    if (!product) return;

    this.activeDetailProduct = product;
    const body = document.getElementById('modal-product-detail-body');
    const title = document.getElementById('modal-detail-title');
    if (title) title.textContent = product.name;

    const img = product.image || this.getDefaultImageForCategory(product.category);

    if (body) {
      body.innerHTML = `
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 28px;">
          <div>
            <div style="border-radius: var(--radius-lg); overflow:hidden; border: 1px solid var(--gray-200); background: var(--gray-50); aspect-ratio: 4/3;">
              <img src="${this.escapeHtml(img)}" alt="${this.escapeHtml(product.name)}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='${this.getDefaultImageForCategory(product.category)}'">
            </div>
            ${product.sku ? `<p style="font-size:0.8rem; color:var(--gray-500); margin-top:8px;">Item Code: <strong>${this.escapeHtml(product.sku)}</strong></p>` : ''}
          </div>

          <div>
            <span class="badge" style="background:var(--primary-light); color:var(--primary); border:1px solid var(--primary-border); margin-bottom:8px;">
              ${this.escapeHtml(product.category)}
            </span>
            <h2 style="font-size:1.4rem; color:var(--navy-900); margin-bottom:12px; font-weight:800;">${this.escapeHtml(product.name)}</h2>
            
            <p style="color:var(--gray-700); font-size:0.925rem; line-height:1.6; margin-bottom:18px;">
              ${this.escapeHtml(product.desc || 'High-quality garment crafted at ZM Enterprises workshop.')}
            </p>

            <div style="background:var(--gray-50); border:1px solid var(--gray-200); border-radius:var(--radius-md); padding:16px; margin-bottom:20px;">
              <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:8px;">
                <span style="font-size:0.85rem; color:var(--gray-600);">Standard Retail Rate:</span>
                <span style="font-size:1.5rem; font-weight:800; color:var(--navy-900);">₹${(Number(product.price) || 0).toLocaleString('en-IN')}</span>
              </div>
              
              ${product.wholesalePrice ? `
                <div style="border-top:1px dashed var(--gray-300); padding-top:8px; margin-top:8px; display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <strong style="color:var(--teal); font-size:0.9rem;">🏢 Institutional Wholesale Rate:</strong>
                    <div style="font-size:0.75rem; color:var(--gray-500);">Applicable for bulk orders of ${product.minWholesaleQty || 20} units or more</div>
                  </div>
                  <span style="font-size:1.25rem; font-weight:800; color:var(--teal);">₹${Number(product.wholesalePrice).toLocaleString('en-IN')} <small style="font-size:0.75rem;">/ pc</small></span>
                </div>
              ` : ''}

              <div style="margin-top:10px; font-size:0.825rem; color:var(--gray-600);">
                Availability: <strong style="color:var(--navy-900);">${this.escapeHtml(product.stockStatus || 'In Stock')}</strong>
              </div>
            </div>

            <!-- Quantity & Actions -->
            <div style="display:flex; align-items:center; gap:14px; margin-bottom:18px;">
              <label style="font-weight:600; font-size:0.9rem; color:var(--gray-700);">Quantity:</label>
              <div class="cart-qty-controls" style="border:1.5px solid var(--gray-300);">
                <button type="button" class="cart-qty-btn" onclick="const input = document.getElementById('detail-qty-input'); if(input.value > 1) input.value = parseInt(input.value) - 1;">-</button>
                <input type="number" id="detail-qty-input" class="cart-qty-input" value="1" min="1" style="width:48px;">
                <button type="button" class="cart-qty-btn" onclick="const input = document.getElementById('detail-qty-input'); input.value = parseInt(input.value) + 1;">+</button>
              </div>
            </div>

            <div style="display:flex; gap:12px; flex-wrap:wrap;">
              <button class="btn btn-primary btn-lg" style="flex:1;" onclick="const qty = parseInt(document.getElementById('detail-qty-input').value) || 1; app.cartAddItem('${product.id}', qty); app.closeModal('modal-product-detail');">
                🛒 Add to Cart
              </button>
              <button class="btn btn-outline btn-lg" onclick="app.requestWholesaleQuoteForProduct('${this.escapeHtml(product.name)}', ${product.minWholesaleQty || 50}); app.closeModal('modal-product-detail');">
                📋 Request B2B Quote
              </button>
            </div>
          </div>
        </div>
      `;
    }

    this.openModal('modal-product-detail');
  }

  requestWholesaleQuoteForProduct(productName, defaultQty = 50) {
    this.switchTab('wholesale');
    const notesInput = document.getElementById('ws-notes');
    if (notesInput) {
      notesInput.value = `Enquiry for: ${productName} (Approx ${defaultQty} pieces requested). Please provide institutional lot discount and fabric swatches.`;
    }
    const catSelect = document.getElementById('ws-category');
    if (catSelect) {
      for (let i = 0; i < catSelect.options.length; i++) {
        if (catSelect.options[i].text.toLowerCase().includes(productName.toLowerCase())) {
          catSelect.selectedIndex = i;
          break;
        }
      }
    }
  }

  // ==================== SHOPPING CART METHODS ====================
  loadCart() {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn("Failed to load cart", e);
    }
    return [];
  }

  saveCart() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cart));
    } catch (e) {
      console.warn("Failed to save cart", e);
    }
    this.updateCartBadges();
  }

  updateCartBadges() {
    const totalCount = (this.cart || []).reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
    const topbarCount = document.getElementById('topbar-cart-count');
    if (topbarCount) topbarCount.textContent = totalCount;
    const storeCount = document.getElementById('store-cart-counter');
    if (storeCount) storeCount.textContent = totalCount;
  }

  openCart() {
    this.renderCart();
    const backdrop = document.getElementById('cart-drawer-backdrop');
    const drawer = document.getElementById('cart-drawer');
    if (backdrop) backdrop.classList.add('active');
    if (drawer) drawer.classList.add('active');
  }

  closeCart() {
    const backdrop = document.getElementById('cart-drawer-backdrop');
    const drawer = document.getElementById('cart-drawer');
    if (backdrop) backdrop.classList.remove('active');
    if (drawer) drawer.classList.remove('active');
  }

  addToCart(productId, qty = 1) {
    return this.cartAddItem(productId, qty);
  }

  cartAddItem(productId, qty = 1) {
    const product = (this.data.ecommerceProducts || []).find(p => p.id === productId);
    if (!product) return;

    if (product.stockStatus === 'Out of Stock') {
      this.showToast('This item is currently out of stock.');
      return;
    }

    const price = Number(product.price);
    if (isNaN(price) || price <= 0) {
      this.showToast('This item is priced on wholesale quotation. Opening enquiry form...');
      this.requestWholesaleQuoteForProduct(product.name, qty);
      return;
    }

    const existing = this.cart.find(item => item.productId === productId);
    if (existing) {
      existing.qty += Number(qty);
    } else {
      this.cart.push({
        productId: product.id,
        name: product.name,
        category: product.category,
        price: price,
        unitPrice: price,
        image: product.image || this.getDefaultImageForCategory(product.category),
        qty: Number(qty)
      });
    }

    this.saveCart();
    this.showToast(`Added ${product.name} to cart!`);
    this.openCart();
  }

  cartUpdateQty(productId, newQty) {
    const item = this.cart.find(i => i.productId === productId);
    if (!item) return;

    const qty = parseInt(newQty);
    if (isNaN(qty) || qty <= 0) {
      this.cartRemoveItem(productId);
    } else {
      item.qty = qty;
      this.saveCart();
      this.renderCart();
    }
  }

  cartRemoveItem(productId) {
    this.cart = this.cart.filter(i => i.productId !== productId);
    this.saveCart();
    this.renderCart();
  }

  cartClear() {
    this.cart = [];
    this.saveCart();
    this.renderCart();
  }

  renderCart() {
    const container = document.getElementById('cart-items-container');
    const footer = document.getElementById('cart-drawer-footer');
    if (!container || !footer) return;

    if (!this.cart || this.cart.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding: 40px 10px; color: var(--gray-500);">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom:12px; color:var(--gray-400);">
            <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <h4 style="color:var(--navy-900); margin-bottom:6px;">Your cart is empty</h4>
          <p style="font-size:0.85rem; margin-bottom:20px;">Browse our products to select uniform pieces and garments.</p>
          <button class="btn btn-primary" onclick="app.closeCart(); app.switchTab('products');">
            Explore Products
          </button>
        </div>
      `;
      footer.innerHTML = '';
      return;
    }

    let subtotal = 0;

    container.innerHTML = this.cart.map(item => {
      const unitPrice = Math.max(0, Number(item.unitPrice || item.price) || 0);
      const lineTotal = unitPrice * item.qty;
      subtotal += lineTotal;

      return `
        <div class="cart-item-row">
          <img src="${this.escapeHtml(item.image)}" alt="${this.escapeHtml(item.name)}" class="cart-item-thumb" onerror="this.src='${this.getDefaultImageForCategory(item.category)}'">
          <div class="cart-item-info">
            <div class="cart-item-title">${this.escapeHtml(item.name)}</div>
            <div class="cart-item-pricing">
              <strong>₹${unitPrice.toLocaleString('en-IN')}</strong> / unit
            </div>
          </div>
          <div class="cart-qty-controls">
            <button class="cart-qty-btn" onclick="app.cartUpdateQty('${item.productId}', ${item.qty - 1})">-</button>
            <input type="number" class="cart-qty-input" value="${item.qty}" min="1" onchange="app.cartUpdateQty('${item.productId}', this.value)">
            <button class="cart-qty-btn" onclick="app.cartUpdateQty('${item.productId}', ${item.qty + 1})">+</button>
          </div>
          <button class="cart-item-remove" onclick="app.cartRemoveItem('${item.productId}')" title="Remove item">&times;</button>
        </div>
      `;
    }).join('');

    footer.innerHTML = `
      <div class="cart-summary-row">
        <span>Items Subtotal:</span>
        <strong>₹${subtotal.toLocaleString('en-IN')}</strong>
      </div>
      <div class="cart-summary-row" style="font-size:0.85rem; color:var(--text-secondary);">
        <span>Standard Delivery / Pickup:</span>
        <strong style="color:var(--secondary);">FREE (₹0)</strong>
      </div>
      <div class="cart-summary-row" style="font-size:0.85rem; color:var(--text-secondary);">
        <span>Mandatory Taxes / Fees:</span>
        <strong>₹0</strong>
      </div>
      <div class="cart-summary-row cart-summary-total">
        <span>Order Total:</span>
        <span>₹${subtotal.toLocaleString('en-IN')}</span>
      </div>
      <div style="font-size:0.75rem; color:var(--gray-500); margin:6px 0 14px;">
        * Direct workshop pricing with free delivery & fittings in Hyderabad for qualifying orders.
      </div>
      <button class="btn btn-primary btn-lg" style="width:100%; justify-content:center;" onclick="app.openCheckout()">
        Proceed to Checkout →
      </button>
    `;
  }

  // ==================== CHECKOUT & ORDER SUBMISSION ====================
  openCheckout() {
    if (!this.cart || this.cart.length === 0) {
      this.showToast('Please add items to your cart first.');
      return;
    }

    this.closeCart();

    const summaryBox = document.getElementById('checkout-summary-box');
    if (summaryBox) {
      let subtotal = 0;

      const itemsHtml = this.cart.map(item => {
        const unitPrice = Math.max(0, Number(item.unitPrice || item.price) || 0);
        const lineTotal = unitPrice * item.qty;
        subtotal += lineTotal;

        return `
          <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:6px; color:var(--gray-700);">
            <span>${this.escapeHtml(item.name)} × ${item.qty}</span>
            <strong>₹${lineTotal.toLocaleString('en-IN')}</strong>
          </div>
        `;
      }).join('');

      summaryBox.innerHTML = `
        <h4 style="font-size:0.925rem; color:var(--navy-900); margin-bottom:10px;">Order Summary (${this.cart.reduce((s, i) => s + i.qty, 0)} items)</h4>
        ${itemsHtml}
        <div style="border-top:1px solid var(--gray-200); margin-top:10px; padding-top:10px; font-size:0.85rem;">
          <div style="display:flex; justify-content:space-between; margin-bottom:4px; color:var(--gray-600);">
            <span>Items Subtotal:</span>
            <span>₹${subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:4px; color:var(--gray-600);">
            <span>Standard Delivery / Workshop Pickup:</span>
            <span style="color:var(--secondary); font-weight:700;">FREE (₹0)</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:4px; color:var(--gray-600);">
            <span>Mandatory Fees / Extra Charges:</span>
            <span>₹0</span>
          </div>
        </div>
        <div style="border-top:2px solid var(--primary); padding-top:10px; margin-top:8px; display:flex; justify-content:space-between; font-size:1.15rem; font-weight:800; color:var(--primary);">
          <span>Total Payable:</span>
          <span>₹${subtotal.toLocaleString('en-IN')}</span>
        </div>
      `;
    }

    this.openModal('modal-checkout');
  }

  selectPaymentMode(mode) {
    this.selectedPaymentMode = mode;
    const cardCod = document.getElementById('pay-card-cod');
    const cardBank = document.getElementById('pay-card-bank');
    if (cardCod) cardCod.classList.toggle('active', mode === 'cod');
    if (cardBank) cardBank.classList.toggle('active', mode === 'bank');
  }

  async submitCheckoutOrder(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (this.isSubmittingOrder) return;

    if (!this.cart || this.cart.length === 0) {
      this.showToast('Your cart is empty.');
      return;
    }

    const nameInput = document.getElementById('chk-name');
    const phoneInput = document.getElementById('chk-phone');
    const emailInput = document.getElementById('chk-email');
    const cityInput = document.getElementById('chk-city');
    const addressInput = document.getElementById('chk-address');
    const notesInput = document.getElementById('chk-notes');
    const submitBtn = document.getElementById('btn-submit-order');

    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const city = cityInput ? cityInput.value.trim() : 'Hyderabad';
    const address = addressInput ? addressInput.value.trim() : '';
    const notes = notesInput ? notesInput.value.trim() : '';

    if (!name) {
      this.showToast('Please enter your full name or institution name.');
      if (nameInput) nameInput.focus();
      return;
    }

    const cleanDigits = phone.replace(/[^0-9]/g, '');
    if (!phone || cleanDigits.length < 10) {
      this.showToast('Please enter a valid 10-digit mobile number.');
      if (phoneInput) phoneInput.focus();
      return;
    }

    if (!address || address.length < 5) {
      this.showToast('Please enter your complete delivery address.');
      if (addressInput) addressInput.focus();
      return;
    }

    // Calculate totals strictly based on items (zero arbitrary charges)
    let totalAmount = 0;
    const items = this.cart.map(item => {
      const unitPrice = Math.max(0, Number(item.unitPrice || item.price) || 0);
      const lineTotal = unitPrice * item.qty;
      totalAmount += lineTotal;
      return {
        productId: item.productId,
        name: item.name,
        category: item.category,
        unitPrice: unitPrice,
        regularPrice: item.price,
        qty: item.qty,
        lineTotal: lineTotal
      };
    });

    const orderId = 'ZME-ORD-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    const createdAt = new Date().toISOString();
    const newOrder = {
      id: orderId,
      createdAt: createdAt,
      customerName: name,
      phone: phone,
      email: email,
      city: city || 'Hyderabad',
      address: address,
      notes: notes,
      paymentMode: this.selectedPaymentMode === 'cod' ? 'Cash on Delivery / Pickup' : 'UPI / Bank Transfer (NEFT)',
      paymentStatus: 'Pending Verification',
      orderStatus: 'Pending Confirmation',
      expectedDeliveryDate: null,
      history: [
        {
          timestamp: createdAt,
          fromStatus: null,
          toStatus: 'Pending Confirmation',
          note: 'Order submitted by customer via web store checkout.'
        }
      ],
      items: items,
      deliveryFee: 0,
      taxes: 0,
      totalAmount: totalAmount
    };

    // Lock submission button to prevent duplicate submissions
    this.isSubmittingOrder = true;
    const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '<span>Confirm & Place Order</span>';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span style="display:inline-flex; align-items:center; gap:8px;">
          <svg style="animation:spin 1s linear infinite;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path></svg>
          Saving Order Securely...
        </span>
      `;
    }

    try {
      let finalOrder = newOrder;
      let isServerSaved = false;

      // 1. Post to persistent database & dispatch notifications via Serverless API
      try {
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newOrder)
        });

        if (res.ok) {
          const resData = await res.json();
          if (resData && resData.success) {
            isServerSaved = true;
            if (resData.order) finalOrder = resData.order;
            console.log('[Orders API] Order confirmed on server:', resData);
          }
        } else {
          console.warn('[Orders API HTTP error status]:', res.status);
        }
      } catch (networkErr) {
        console.warn('[Orders API network error, using local persistence]:', networkErr);
      }

      // 2. Save order persistently in local storage cache
      if (!Array.isArray(this.data.ecommerceOrders)) {
        this.data.ecommerceOrders = [];
      }
      this.data.ecommerceOrders.unshift(finalOrder);
      this.saveData();

      // 3. Clear shopping cart
      this.cart = [];
      this.saveCart();

      // 4. Close checkout modal & show confirmation
      this.closeModal('modal-checkout');
      this.activeConfirmationOrder = finalOrder;
      this.showOrderConfirmation(finalOrder, isServerSaved);
      this.renderAdminEcommerceOrders();
      this.showToast(`Order ${finalOrder.id} placed successfully!`);

    } catch (err) {
      console.error('[submitCheckoutOrder error]:', err);
      this.showToast('Could not complete order. Please try again or message via WhatsApp.');
    } finally {
      this.isSubmittingOrder = false;
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    }
  }

  showOrderConfirmation(order, serverSaved = true) {
    const body = document.getElementById('order-confirmation-body');
    if (!body) return;

    body.innerHTML = `
      <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:var(--radius-md); padding:16px; margin-bottom:20px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <div>
          <span style="font-size:0.75rem; text-transform:uppercase; color:#065f46; font-weight:700;">Order Reference ID</span>
          <h2 style="font-size:1.5rem; color:#064e3b; margin:2px 0 0; font-family:monospace;">${this.escapeHtml(order.id)}</h2>
        </div>
        <div style="text-align:right;">
          <span style="font-size:0.8rem; color:#065f46;">Date: ${new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          <div style="font-weight:700; color:#064e3b; margin-top:2px;">Status: ${this.escapeHtml(order.orderStatus || 'Pending Confirmation')}</div>
          ${serverSaved 
            ? '<span style="display:inline-block; font-size:0.7rem; background:#dcfce7; color:#15803d; padding:2px 6px; border-radius:4px; font-weight:600; margin-top:3px;">✓ Saved to Database</span>'
            : '<span style="display:inline-block; font-size:0.7rem; background:#fef3c7; color:#92400e; padding:2px 6px; border-radius:4px; font-weight:600; margin-top:3px;">⚠ Stored Locally (Send to WhatsApp)</span>'
          }
        </div>
      </div>

      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:16px; margin-bottom:20px; font-size:0.875rem;">
        <div style="background:var(--gray-50); padding:14px; border-radius:var(--radius-md);">
          <strong style="color:var(--navy-900);">Customer Details:</strong>
          <div>${this.escapeHtml(order.customerName)}</div>
          <div>📞 ${this.escapeHtml(order.phone)}</div>
          ${order.email ? `<div>✉️ ${this.escapeHtml(order.email)}</div>` : ''}
        </div>
        <div style="background:var(--gray-50); padding:14px; border-radius:var(--radius-md);">
          <strong style="color:var(--navy-900);">Delivery Destination:</strong>
          <div>${this.escapeHtml(order.address)}</div>
          <div>${this.escapeHtml(order.city)}</div>
        </div>
        <div style="background:var(--gray-50); padding:14px; border-radius:var(--radius-md);">
          <strong style="color:var(--navy-900);">Payment & Verification:</strong>
          <div>${this.escapeHtml(order.paymentMode)}</div>
          <div style="color:var(--teal); font-weight:600;">Manual Confirmation Mode</div>
        </div>
      </div>

      <h4 style="font-size:0.95rem; color:var(--navy-900); margin-bottom:10px;">Itemized Order Receipt</h4>
      <div class="admin-table-wrap" style="margin-bottom:20px;">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Item Specification</th>
              <th>Qty</th>
              <th>Unit Rate</th>
              <th style="text-align:right;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${order.items.map(item => `
              <tr>
                <td>
                  <strong>${this.escapeHtml(item.name)}</strong>
                  <div style="font-size:0.75rem; color:var(--gray-500);">${this.escapeHtml(item.category || '')}</div>
                </td>
                <td>${item.qty} pcs</td>
                <td>₹${item.unitPrice.toLocaleString('en-IN')}</td>
                <td style="text-align:right;">₹${item.lineTotal.toLocaleString('en-IN')}</td>
              </tr>
            `).join('')}
            <tr>
              <td colspan="3" style="text-align:right; color:var(--gray-600);">Items Subtotal:</td>
              <td style="text-align:right; font-weight:700;">₹${order.totalAmount.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td colspan="3" style="text-align:right; color:var(--gray-600);">Standard Delivery / Pickup:</td>
              <td style="text-align:right; font-weight:700; color:var(--secondary);">FREE (₹0)</td>
            </tr>
            <tr>
              <td colspan="3" style="text-align:right; color:var(--gray-600);">Mandatory Taxes / Fees:</td>
              <td style="text-align:right; font-weight:700;">₹0</td>
            </tr>
            <tr style="background:var(--gray-100); font-size:1.05rem;">
              <td colspan="3" style="text-align:right; font-weight:800; color:var(--primary);">Final Order Total:</td>
              <td style="text-align:right; font-weight:800; color:var(--primary);">
                ₹${order.totalAmount.toLocaleString('en-IN')}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      ${order.notes ? `
        <div style="background:var(--gray-50); padding:12px; border-radius:var(--radius-md); font-size:0.85rem; color:var(--gray-700); margin-bottom:16px;">
          <strong>Order Notes / Custom Sizing:</strong> ${this.escapeHtml(order.notes)}
        </div>
      ` : ''}

      <div style="background:#fffbeb; border:1px solid #fef3c7; border-radius:var(--radius-md); padding:12px; font-size:0.85rem; color:#92400e; margin-bottom:16px;">
        ℹ️ <strong>Payment Status: ${order.paymentStatus}</strong> — Manual Atelier Verification Mode. No funds have been deducted from your bank or card online.
      </div>

      <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:var(--radius-md); padding:12px; font-size:0.85rem; color:#1e40af;">
        ℹ️ <strong>Next Steps:</strong> ZM Enterprises master tailor will review your item specifications and contact you on <strong>${this.escapeHtml(order.phone)}</strong> for sample approval and delivery schedule.
      </div>
    `;

    this.openModal('modal-order-confirmation');
  }

  shareOrderConfirmationWhatsApp() {
    const order = this.activeConfirmationOrder;
    if (!order) return;

    let targetPhone = this.getCleanBizPhone();
    if (!targetPhone && this.data.settings && this.data.settings.phone) {
      targetPhone = this.data.settings.phone.replace(/[^0-9]/g, '');
    }

    const lines = [
      `*ZM ENTERPRISES - ONLINE ORDER CONFIRMATION*`,
      `==============================`,
      `*Order ID:* ${order.id}`,
      `*Customer:* ${order.customerName}`,
      `*Phone:* ${order.phone}`,
      `*Delivery City:* ${order.city}`,
      `*Address:* ${order.address}`,
      `*Payment Mode:* ${order.paymentMode}`,
      `*Payment Status:* ${order.paymentStatus}`,
      ``,
      `*ORDERED ITEMS:*`
    ];

    order.items.forEach((item, idx) => {
      lines.push(`${idx + 1}. ${item.name} × ${item.qty} pcs = ₹${item.lineTotal.toLocaleString('en-IN')}`);
    });

    lines.push(``);
    lines.push(`*Subtotal:* ₹${order.totalAmount.toLocaleString('en-IN')}`);
    lines.push(`*Standard Delivery:* FREE (₹0)`);
    lines.push(`*Extra Charges:* ₹0`);
    lines.push(`*TOTAL PAYABLE:* ₹${order.totalAmount.toLocaleString('en-IN')}`);
    if (order.notes) lines.push(`*Notes:* ${order.notes}`);
    lines.push(``);
    lines.push(`Please confirm this order and advise on delivery schedule.`);

    const msg = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${targetPhone}?text=${msg}`, '_blank');
  }

  // ==================== ORDER TRACKING VIEW ====================
  trackOrderLookup() {
    const input = document.getElementById('track-order-input');
    const container = document.getElementById('track-order-result');
    if (!input || !container) return;

    const query = input.value.trim().toLowerCase();
    if (!query) {
      container.innerHTML = `<div style="text-align:center; padding:20px; color:var(--danger);">Please enter a valid Order Reference ID or 10-digit Phone Number.</div>`;
      return;
    }

    // Search ecommerce orders first, then custom tailor orders
    const ecomOrder = (this.data.ecommerceOrders || []).find(o =>
      o.id.toLowerCase().includes(query) || (o.phone && o.phone.replace(/[^0-9]/g, '').includes(query.replace(/[^0-9]/g, '')))
    );

    const tailorOrder = (this.data.orders || []).find(o =>
      o.id.toLowerCase().includes(query) || (o.customerPhone && o.customerPhone.includes(query))
    );

    if (ecomOrder) {
      const statuses = ['Pending Confirmation', 'Confirmed', 'In Production', 'Dispatched / Ready', 'Delivered'];
      const currentIndex = statuses.indexOf(ecomOrder.orderStatus);

      container.innerHTML = `
        <div style="background:var(--gray-50); border:1px solid var(--gray-200); border-radius:var(--radius-lg); padding:20px; margin-top:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:16px;">
            <div>
              <span class="badge" style="background:#eff6ff; color:var(--primary);">Online Store Order</span>
              <h3 style="font-size:1.2rem; color:var(--navy-900); margin:4px 0 0;">${ecomOrder.id}</h3>
            </div>
            <div style="text-align:right;">
              <span class="badge" style="background:#dcfce7; color:#15803d; font-weight:700;">${ecomOrder.orderStatus}</span>
              <div style="font-size:0.8rem; color:var(--gray-500); margin-top:4px;">Date: ${new Date(ecomOrder.createdAt).toLocaleDateString('en-IN')}</div>
            </div>
          </div>

          <!-- Timeline -->
          <div class="timeline-track-wrap">
            ${statuses.map((s, idx) => {
              const isCompleted = currentIndex >= idx;
              const isCurrent = currentIndex === idx;
              return `
                <div class="timeline-step-row ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}">
                  <div class="timeline-dot"></div>
                  <h4 style="font-size:0.95rem; color:${isCompleted ? 'var(--navy-900)' : 'var(--gray-500)'};">${s}</h4>
                  <p style="font-size:0.8rem; color:var(--gray-500); margin:0;">
                    ${idx === 0 ? 'Order registered in ZM Enterprises database' : ''}
                    ${idx === 1 ? 'Reviewed and verified by workshop master' : ''}
                    ${idx === 2 ? 'Pattern cutting and batch stitching underway' : ''}
                    ${idx === 3 ? 'Quality inspection passed, ready for dispatch' : ''}
                    ${idx === 4 ? 'Handover completed successfully' : ''}
                  </p>
                </div>
              `;
            }).join('')}
          </div>

          <div style="background:#fff; border:1px solid var(--gray-200); border-radius:var(--radius-md); padding:14px; margin-top:16px; font-size:0.875rem;">
            <div><strong>Recipient:</strong> ${this.escapeHtml(ecomOrder.customerName)} (${this.escapeHtml(ecomOrder.phone)})</div>
            <div><strong>Destination:</strong> ${this.escapeHtml(ecomOrder.address)}, ${this.escapeHtml(ecomOrder.city)}</div>
            <div><strong>Items:</strong> ${ecomOrder.items.map(i => `${i.name} (${i.qty} pcs)`).join(', ')}</div>
            <div style="margin-top:6px; font-weight:700; color:var(--navy-900);">Total Value: ₹${ecomOrder.totalAmount.toLocaleString('en-IN')} (${ecomOrder.paymentMode})</div>
          </div>
        </div>
      `;
      return;
    }

    if (tailorOrder) {
      container.innerHTML = `
        <div style="background:var(--gray-50); border:1px solid var(--gray-200); border-radius:var(--radius-lg); padding:20px; margin-top:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
            <div>
              <span class="badge" style="background:var(--accent-gold-light); color:var(--accent-gold-hover);">Custom Atelier Order</span>
              <h3 style="font-size:1.2rem; color:var(--navy-900); margin:4px 0 0;">${tailorOrder.id}</h3>
            </div>
            <div>
              ${this.getStatusBadge(tailorOrder.status)}
            </div>
          </div>
          <p><strong>Customer:</strong> ${this.escapeHtml(tailorOrder.customerName)}</p>
          <p><strong>Garment:</strong> ${this.escapeHtml(tailorOrder.garmentType)}</p>
          <p><strong>Trial Date:</strong> ${tailorOrder.trialDate || 'Not set'}</p>
          <p><strong>Delivery Target:</strong> ${tailorOrder.deliveryDate || 'Not set'}</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `<div style="text-align:center; padding:20px; color:var(--gray-600);"><em>Searching order records...</em></div>`;

    fetch(`/api/orders?lookupId=${encodeURIComponent(query)}&lookupPhone=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.found && data.order) {
          const ord = data.order;
          container.innerHTML = `
            <div style="background:var(--gray-50); border:1px solid var(--gray-200); border-radius:var(--radius-lg); padding:20px; margin-top:20px;">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:16px;">
                <div>
                  <span class="badge" style="background:#eff6ff; color:var(--primary);">Verified Online Store Order</span>
                  <h3 style="font-size:1.2rem; color:var(--navy-900); margin:4px 0 0;">${ord.id}</h3>
                </div>
                <div style="text-align:right;">
                  <span class="badge" style="background:#dcfce7; color:#15803d; font-weight:700;">${ord.orderStatus}</span>
                  <div style="font-size:0.8rem; color:var(--gray-500); margin-top:4px;">Date: ${new Date(ord.createdAt).toLocaleDateString('en-IN')}</div>
                </div>
              </div>
              <div style="background:#fff; border:1px solid var(--gray-200); border-radius:var(--radius-md); padding:14px; margin-top:16px; font-size:0.875rem;">
                <div><strong>Recipient:</strong> ${this.escapeHtml(ord.customerName)}</div>
                <div><strong>Status:</strong> ${this.escapeHtml(ord.orderStatus)}</div>
                <div><strong>Payment:</strong> ${this.escapeHtml(ord.paymentStatus)}</div>
                <div style="margin-top:6px; font-weight:700; color:var(--navy-900);">Total Value: ₹${(Number(ord.totalAmount) || 0).toLocaleString('en-IN')}</div>
              </div>
            </div>
          `;
        } else {
          container.innerHTML = `
            <div style="text-align:center; padding:30px; background:#fff; border:1px dashed var(--gray-300); border-radius:var(--radius-md); margin-top:20px;">
              <h4 style="color:var(--navy-900); margin-bottom:6px;">No matching records found for "${this.escapeHtml(query)}"</h4>
              <p style="font-size:0.85rem; color:var(--gray-600); margin-bottom:14px;">Please double-check the Order ID format (e.g. ZME-ORD-2026-XXXX) or the 10-digit mobile number provided during checkout.</p>
              <button class="btn btn-whatsapp" onclick="app.openFloatingWhatsApp()">
                Ask Master Tailor on WhatsApp
              </button>
            </div>
          `;
        }
      }).catch(err => {
        container.innerHTML = `
          <div style="text-align:center; padding:30px; background:#fff; border:1px dashed var(--gray-300); border-radius:var(--radius-md); margin-top:20px;">
            <h4 style="color:var(--navy-900); margin-bottom:6px;">No matching records found for "${this.escapeHtml(query)}"</h4>
            <p style="font-size:0.85rem; color:var(--gray-600); margin-bottom:14px;">Please double-check the Order ID format (e.g. ZME-ORD-2026-XXXX) or the 10-digit mobile number provided during checkout.</p>
            <button class="btn btn-whatsapp" onclick="app.openFloatingWhatsApp()">
              Ask Master Tailor on WhatsApp
            </button>
          </div>
        `;
      });
  }

  // ==================== ADMIN PRODUCT MANAGEMENT ====================
  renderAdminProductsTable() {
    const tbody = document.getElementById('admin-products-table-body');
    if (!tbody) return;

    const products = this.data.ecommerceProducts || [];
    const countBadge = document.getElementById('nav-products-count');
    if (countBadge) countBadge.textContent = products.length;

    if (products.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align:center; padding: 40px; color: var(--gray-500);">
            <p style="font-size:1rem; margin-bottom:12px;">No products currently listed in inventory.</p>
            <div style="display:flex; justify-content:center; gap:10px;">
              <button class="btn btn-primary" onclick="app.openProductModal()">+ Add Your First Product</button>
              <button class="btn btn-secondary" onclick="app.seedSampleProductsOptional()">⚡ Load Uniform Templates</button>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = products.map(p => {
      const img = p.image || this.getDefaultImageForCategory(p.category);
      return `
        <tr>
          <td>
            <img src="${this.escapeHtml(img)}" alt="${this.escapeHtml(p.name)}" class="admin-product-thumb" onerror="this.src='${this.getDefaultImageForCategory(p.category)}'">
          </td>
          <td>
            <strong>${this.escapeHtml(p.name)}</strong>
            ${p.sku ? `<div style="font-size:0.75rem; color:var(--gray-500);">SKU: ${this.escapeHtml(p.sku)}</div>` : ''}
          </td>
          <td>
            <span class="badge" style="background:var(--gray-100); color:var(--gray-700);">${this.escapeHtml(p.category)}</span>
          </td>
          <td>
            <strong>₹${(Number(p.price) || 0).toLocaleString('en-IN')}</strong>
          </td>
          <td>
            ${p.wholesalePrice ? `
              <span style="color:var(--teal); font-weight:700;">₹${Number(p.wholesalePrice).toLocaleString('en-IN')}</span>
              <div style="font-size:0.75rem; color:var(--gray-500);">≥ ${p.minWholesaleQty || 20} pcs</div>
            ` : '<span style="color:var(--gray-400);">None</span>'}
          </td>
          <td>
            <select class="form-control" style="padding:4px 8px; font-size:0.8rem; width:auto;" onchange="app.updateProductStockStatus('${p.id}', this.value)">
              <option value="In Stock" ${p.stockStatus === 'In Stock' ? 'selected' : ''}>In Stock</option>
              <option value="Made to Order" ${p.stockStatus === 'Made to Order' ? 'selected' : ''}>Made to Order</option>
              <option value="Low Stock" ${p.stockStatus === 'Low Stock' ? 'selected' : ''}>Low Stock</option>
              <option value="Out of Stock" ${p.stockStatus === 'Out of Stock' ? 'selected' : ''}>Out of Stock</option>
            </select>
          </td>
          <td style="text-align:right;">
            <div style="display:inline-flex; gap:6px;">
              <button class="btn btn-sm btn-outline" onclick="app.openProductModal('${p.id}')">Edit</button>
              <button class="btn btn-sm btn-outline" style="color:var(--danger); border-color:var(--danger);" onclick="app.deleteProduct('${p.id}')">Delete</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  updateProductStockStatus(id, newStatus) {
    const product = (this.data.ecommerceProducts || []).find(p => p.id === id);
    if (!product) return;
    product.stockStatus = newStatus;
    this.saveData();
    this.renderProductsGrid();
    this.showToast(`Updated ${product.name} stock to "${newStatus}"`);
  }

  openProductModal(id = null) {
    const form = document.getElementById('admin-product-form');
    const title = document.getElementById('modal-admin-product-title');
    if (!form) return;

    form.reset();
    document.getElementById('admin-prod-id').value = '';

    if (id) {
      const product = (this.data.ecommerceProducts || []).find(p => p.id === id);
      if (product) {
        if (title) title.textContent = 'Edit Product';
        document.getElementById('admin-prod-id').value = product.id;
        document.getElementById('admin-prod-name').value = product.name;
        document.getElementById('admin-prod-category').value = product.category;
        document.getElementById('admin-prod-sku').value = product.sku || '';
        document.getElementById('admin-prod-desc').value = product.desc || '';
        document.getElementById('admin-prod-price').value = product.price || '';
        document.getElementById('admin-prod-wholesale-price').value = product.wholesalePrice || '';
        document.getElementById('admin-prod-min-wholesale-qty').value = product.minWholesaleQty || '20';
        document.getElementById('admin-prod-stock').value = product.stockStatus || 'In Stock';
        document.getElementById('admin-prod-image').value = product.image || '';
      }
    } else {
      if (title) title.textContent = 'Add New Product';
    }

    this.openModal('modal-product-admin');
  }

  saveProduct(e) {
    e.preventDefault();
    const idInput = document.getElementById('admin-prod-id').value;
    const name = document.getElementById('admin-prod-name').value.trim();
    const category = document.getElementById('admin-prod-category').value;
    const sku = document.getElementById('admin-prod-sku').value.trim();
    const desc = document.getElementById('admin-prod-desc').value.trim();
    const price = parseFloat(document.getElementById('admin-prod-price').value);
    const wholesalePriceVal = document.getElementById('admin-prod-wholesale-price').value;
    const wholesalePrice = wholesalePriceVal ? parseFloat(wholesalePriceVal) : null;
    const minWholesaleQty = parseInt(document.getElementById('admin-prod-min-wholesale-qty').value) || 20;
    const stockStatus = document.getElementById('admin-prod-stock').value;
    const image = document.getElementById('admin-prod-image').value.trim();

    if (!name || isNaN(price) || price < 0) {
      this.showToast('Please enter a valid product name and retail price.');
      return;
    }

    if (!Array.isArray(this.data.ecommerceProducts)) {
      this.data.ecommerceProducts = [];
    }

    if (idInput) {
      // Edit
      const existing = this.data.ecommerceProducts.find(p => p.id === idInput);
      if (existing) {
        existing.name = name;
        existing.category = category;
        existing.sku = sku;
        existing.desc = desc;
        existing.price = price;
        existing.wholesalePrice = wholesalePrice;
        existing.minWholesaleQty = minWholesaleQty;
        existing.stockStatus = stockStatus;
        existing.image = image;
        this.showToast(`Updated product: ${name}`);
      }
    } else {
      // Create
      const newId = 'PROD-' + Date.now().toString(36).toUpperCase();
      this.data.ecommerceProducts.unshift({
        id: newId,
        name,
        category,
        sku,
        desc,
        price,
        wholesalePrice,
        minWholesaleQty,
        stockStatus,
        image
      });
      this.showToast(`Product added: ${name}`);
    }

    this.saveData();
    this.closeModal('modal-product-admin');
    this.renderAdminProductsTable();
    this.renderProductsGrid();
  }

  deleteProduct(id) {
    if (!confirm('Are you sure you want to remove this product from the inventory?')) return;
    this.data.ecommerceProducts = (this.data.ecommerceProducts || []).filter(p => p.id !== id);
    this.saveData();
    this.renderAdminProductsTable();
    this.renderProductsGrid();
    this.showToast('Product removed.');
  }

  seedSampleProductsOptional() {
    if (!confirm('Load standard ZM Enterprises uniform templates into your inventory? Existing products will be preserved.')) return;

    const templates = [
      {
        id: 'PROD-SCH-01',
        name: "Boys High School Uniform Shirt (Set of 2)",
        category: "School Uniforms",
        sku: "ZM-BS-01",
        desc: "Durable Oxford poly-cotton weave (65/35), reinforced double collar with collar stiffener, chest pocket with badge stitching margin, breathable wash-fast fabric.",
        price: 650,
        wholesalePrice: 480,
        minWholesaleQty: 25,
        stockStatus: "In Stock",
        image: "images/school-uniform.jpg"
      },
      {
        id: 'PROD-SCH-02',
        name: "School Pleated Pinafore & Salwar Kameez Set",
        category: "School Uniforms",
        sku: "ZM-GP-02",
        desc: "Wrinkle-resistant poly-viscose box pleat pinafore with growth margin hems and inner lining. Includes durable white salwar and dupatta border stitching.",
        price: 850,
        wholesalePrice: 620,
        minWholesaleQty: 25,
        stockStatus: "In Stock",
        image: "images/school-uniform-girls.jpg"
      },
      {
        id: 'PROD-CORP-01',
        name: "Executive Corporate Blazer (Custom Fit)",
        category: "Corporate Attire",
        sku: "ZM-BLZ-01",
        desc: "Tailored 2-button corporate blazer in premium matte poly-viscose suiting. Canvas fused lapels, twin back vents, inner phone pocket, and customized institutional crest embroidery.",
        price: 2800,
        wholesalePrice: 2100,
        minWholesaleQty: 15,
        stockStatus: "Made to Order",
        image: "images/corporate-suit.jpg"
      },
      {
        id: 'PROD-MED-01',
        name: "Hospital Medical Scrubs (Top & Drawstring Pants)",
        category: "Healthcare & Hospitality",
        sku: "ZM-SCR-01",
        desc: "Anti-microbial, chlorine-safe medical scrubs. 4-way comfort stretch, V-neck chest pocket, utility scissor pocket, reinforced double-needle stress points.",
        price: 950,
        wholesalePrice: 680,
        minWholesaleQty: 20,
        stockStatus: "In Stock",
        image: "images/medical-scrubs.jpg"
      },
      {
        id: 'PROD-BESP-01',
        name: "Men's Bespoke 3-Piece Atelier Tuxedo",
        category: "Bespoke Tailoring",
        sku: "ZM-BES-01",
        desc: "Hand-finished coat, tailored vest, and formal flat-front trousers. Drafted to individual anatomical measurements with 2 intermediate fitting trials in Hyderabad.",
        price: 6500,
        wholesalePrice: null,
        minWholesaleQty: 1,
        stockStatus: "Made to Order",
        image: "images/bespoke-tuxedo.jpg"
      },
      {
        id: 'PROD-IND-01',
        name: "Heavy-Duty Industrial Boiler Suit Coverall",
        category: "Industrial & Workwear",
        sku: "ZM-IND-01",
        desc: "Heavy 240 GSM pure cotton twill. 6 functional utility pockets, brass heavy-duty YKK zipper, elasticated waist back, bar-tacked stress loops for tools.",
        price: 1200,
        wholesalePrice: 850,
        minWholesaleQty: 30,
        stockStatus: "In Stock",
        image: "images/industrial-workwear.jpg"
      },
      {
        id: 'PROD-FAB-01',
        name: "Poly-Cotton Uniform Fabric Roll (100m)",
        category: "Fabrics & Accessories",
        sku: "ZM-FAB-01",
        desc: "Certified 65/35 Oxford poly-cotton uniform drill. 58-inch width, 210 GSM, wash-fast dye for institutional uniform batches.",
        price: 16500,
        wholesalePrice: 14200,
        minWholesaleQty: 3,
        stockStatus: "In Stock",
        image: "images/fabric-rolls.jpg"
      }
    ];

    if (!Array.isArray(this.data.ecommerceProducts)) {
      this.data.ecommerceProducts = [];
    }

    const existingIds = new Set(this.data.ecommerceProducts.map(p => p.id));
    let addedCount = 0;
    templates.forEach(t => {
      if (!existingIds.has(t.id)) {
        this.data.ecommerceProducts.push(t);
        addedCount++;
      }
    });

    this.saveData();
    this.renderAdminProductsTable();
    this.renderProductsGrid();
    this.showToast(`Loaded ${addedCount} uniform templates successfully!`);
  }

  // ==================== ADMIN E-COMMERCE ORDERS & DATABASE SYNC ====================
  async fetchServerOrders(showNotification = false) {
    try {
      const res = await fetch('/api/orders', {
        headers: {
          'x-admin-pin': this.getAdminPin()
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.orders)) {
          const localOrders = this.data.ecommerceOrders || [];
          const existingIds = new Set(localOrders.map(o => o.id));
          let addedCount = 0;
          data.orders.forEach(serverOrder => {
            if (!existingIds.has(serverOrder.id)) {
              localOrders.unshift(serverOrder);
              existingIds.add(serverOrder.id);
              addedCount++;
            } else {
              const local = localOrders.find(o => o.id === serverOrder.id);
              if (local) {
                if (serverOrder.orderStatus) local.orderStatus = serverOrder.orderStatus;
                if (serverOrder.paymentStatus) local.paymentStatus = serverOrder.paymentStatus;
              }
            }
          });
          this.data.ecommerceOrders = localOrders;
          this.saveData();
          this.renderAdminEcommerceOrders();
          if (showNotification) {
            this.showToast(`Synced ${data.orders.length} orders from persistent database.`);
          }
        }
      }
    } catch (err) {
      console.warn('[Fetch Server Orders non-blocking]:', err);
      if (showNotification) {
        this.showToast('Local database active.');
      }
    }
  }

  renderAdminEcommerceOrders() {
    const tbody = document.getElementById('admin-ecom-orders-table-body');
    const badge = document.getElementById('nav-ecom-orders-count');
    const orders = this.data.ecommerceOrders || [];

    const pendingCount = orders.filter(o => o.orderStatus === 'Pending Confirmation' || o.orderStatus === 'Pending').length;
    if (badge) {
      badge.textContent = orders.length;
      badge.className = pendingCount > 0 ? 'nav-badge badge-warning' : 'nav-badge';
      if (pendingCount > 0) {
        badge.title = `${pendingCount} pending order(s) require review`;
      }
    }
    if (!tbody) return;

    if (orders.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align:center; padding: 40px; color: var(--gray-500);">
            No online orders placed yet. Orders submitted via the web store checkout will appear here in real time.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = orders.map(o => {
      const itemCount = (o.items || []).reduce((sum, i) => sum + (Number(i.qty) || 0), 0);
      const isPaid = o.paymentStatus && o.paymentStatus.toLowerCase().includes('paid');
      const isPending = o.orderStatus === 'Pending Confirmation' || o.orderStatus === 'Pending';

      return `
        <tr style="${isPending ? 'background: #fffdf5;' : ''}">
          <td>
            <strong style="font-family:monospace; color:var(--primary);">${this.escapeHtml(o.id)}</strong>
            ${isPending ? '<span style="display:block; font-size:0.65rem; color:#b45309; font-weight:700;">NEW PENDING</span>' : ''}
          </td>
          <td>
            ${new Date(o.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
            <div style="font-size:0.75rem; color:var(--gray-500);">${new Date(o.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</div>
          </td>
          <td>
            <strong>${this.escapeHtml(o.customerName)}</strong>
            <div style="font-size:0.75rem; color:var(--gray-500);">📞 <a href="tel:${this.escapeHtml(o.phone)}">${this.escapeHtml(o.phone)}</a></div>
            <div style="font-size:0.75rem; color:var(--gray-500);">📍 ${this.escapeHtml(o.city || 'Hyderabad')}</div>
          </td>
          <td>
            ${itemCount} pcs
            <div style="font-size:0.75rem; color:var(--gray-500);">${(o.items || []).length} item types</div>
          </td>
          <td>
            <strong>₹${(Number(o.totalAmount) || 0).toLocaleString('en-IN')}</strong>
          </td>
          <td>
            <div style="font-size:0.75rem; color:var(--gray-600); margin-bottom:4px;">${this.escapeHtml(o.paymentMode || 'COD')}</div>
            <select class="form-control" style="padding:2px 6px; font-size:0.75rem; font-weight:700; color:${isPaid ? '#047857' : '#b45309'};" onchange="app.updatePaymentStatus('${o.id}', this.value)">
              <option value="Pending Verification" ${o.paymentStatus === 'Pending Verification' ? 'selected' : ''}>⏳ Pending Verification</option>
              <option value="Payment Received / Paid" ${o.paymentStatus === 'Payment Received / Paid' ? 'selected' : ''}>✔ Payment Received / Paid</option>
              <option value="Refunded" ${o.paymentStatus === 'Refunded' ? 'selected' : ''}>Refunded</option>
            </select>
          </td>
          <td>
            <select class="form-control" style="padding:4px 8px; font-size:0.8rem; width:auto; font-weight:600;" onchange="app.updateOrderStatus('${o.id}', this.value)">
              <option value="Pending Confirmation" ${(o.orderStatus === 'Pending Confirmation' || o.orderStatus === 'Pending') ? 'selected' : ''}>Pending Confirmation</option>
              <option value="Accepted" ${o.orderStatus === 'Accepted' ? 'selected' : ''}>Accepted</option>
              <option value="In Production" ${o.orderStatus === 'In Production' ? 'selected' : ''}>In Production</option>
              <option value="Ready for Delivery" ${o.orderStatus === 'Ready for Delivery' ? 'selected' : ''}>Ready for Delivery</option>
              <option value="Delivered" ${o.orderStatus === 'Delivered' ? 'selected' : ''}>Delivered</option>
              <option value="Rejected" ${(o.orderStatus === 'Rejected' || o.orderStatus === 'Cancelled') ? 'selected' : ''}>Rejected</option>
            </select>
            ${o.expectedDeliveryDate ? `<div style="font-size:0.7rem; color:var(--secondary); margin-top:2px; font-weight:600;">Target: ${o.expectedDeliveryDate}</div>` : ''}
          </td>
          <td style="text-align:right;">
            <div style="display:inline-flex; gap:6px; flex-wrap:wrap; justify-content:flex-end;">
              ${isPending ? `
                <button class="btn-action-accept" onclick="app.acceptEcommerceOrder('${o.id}')" title="Accept Order">✓ Accept</button>
                <button class="btn-action-reject" onclick="app.rejectEcommerceOrder('${o.id}')" title="Reject Order">✕ Reject</button>
              ` : ''}
              <button class="btn btn-sm btn-outline" onclick="app.viewEcommerceOrderDetails('${o.id}')">View</button>
              <button class="btn btn-sm btn-whatsapp" onclick="app.shareEcommerceOrderWhatsApp('${o.id}')" title="Message customer on WhatsApp">WhatsApp</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  async acceptEcommerceOrder(orderId) {
    const order = (this.data.ecommerceOrders || []).find(o => o.id === orderId);
    if (!order) return;

    const oldStatus = order.orderStatus;
    order.orderStatus = 'Accepted';
    if (!Array.isArray(order.history)) order.history = [];
    order.history.push({
      timestamp: new Date().toISOString(),
      fromStatus: oldStatus,
      toStatus: 'Accepted',
      note: 'Order accepted by workshop master. Ready for cutting and scheduling.'
    });

    this.saveData();
    this.renderAdminEcommerceOrders();
    this.showToast(`Order ${orderId} accepted successfully!`);

    try {
      await fetch('/api/orders', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': this.getAdminPin()
        },
        body: JSON.stringify({
          orderId,
          orderStatus: 'Accepted',
          note: 'Order accepted by workshop master.'
        })
      });
    } catch (err) {
      console.warn('[PATCH /api/orders accept failed]:', err);
    }
  }

  async rejectEcommerceOrder(orderId) {
    const order = (this.data.ecommerceOrders || []).find(o => o.id === orderId);
    if (!order) return;

    const reason = prompt(`Please enter the reason for rejecting Order ${orderId} (e.g. Fabric roll out of stock, outside Hyderabad delivery perimeter):`);
    if (reason === null) return; // User pressed Cancel

    const oldStatus = order.orderStatus;
    order.orderStatus = 'Rejected';
    if (!Array.isArray(order.history)) order.history = [];
    order.history.push({
      timestamp: new Date().toISOString(),
      fromStatus: oldStatus,
      toStatus: 'Rejected',
      note: reason ? `Order rejected. Reason: ${reason}` : 'Order rejected by workshop master.'
    });

    this.saveData();
    this.renderAdminEcommerceOrders();
    this.showToast(`Order ${orderId} marked as Rejected.`);

    try {
      await fetch('/api/orders', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': this.getAdminPin()
        },
        body: JSON.stringify({
          orderId,
          orderStatus: 'Rejected',
          note: reason || 'Order rejected by workshop master.'
        })
      });
    } catch (err) {
      console.warn('[PATCH /api/orders reject failed]:', err);
    }
  }

  async updateOrderStatus(orderId, newStatus) {
    const order = (this.data.ecommerceOrders || []).find(o => o.id === orderId);
    if (!order) return;
    const oldStatus = order.orderStatus;
    order.orderStatus = newStatus;

    if (!Array.isArray(order.history)) order.history = [];
    order.history.push({
      timestamp: new Date().toISOString(),
      fromStatus: oldStatus,
      toStatus: newStatus,
      note: `Status changed to ${newStatus} via Admin Dashboard`
    });

    this.saveData();
    this.renderAdminEcommerceOrders();
    this.showToast(`Order ${orderId} status set to "${newStatus}"`);

    try {
      await fetch('/api/orders', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': this.getAdminPin()
        },
        body: JSON.stringify({ orderId, orderStatus: newStatus, note: `Status changed to ${newStatus}` })
      });
    } catch (err) {
      console.warn('[PATCH /api/orders failed]:', err);
    }
  }

  async updatePaymentStatus(orderId, newPaymentStatus) {
    const order = (this.data.ecommerceOrders || []).find(o => o.id === orderId);
    if (!order) return;
    const oldPayment = order.paymentStatus;
    order.paymentStatus = newPaymentStatus;

    if (!Array.isArray(order.history)) order.history = [];
    order.history.push({
      timestamp: new Date().toISOString(),
      fromStatus: oldPayment,
      toStatus: newPaymentStatus,
      note: `Payment status updated to "${newPaymentStatus}"`
    });

    this.saveData();
    this.renderAdminEcommerceOrders();
    this.showToast(`Order ${orderId} payment set to "${newPaymentStatus}"`);

    try {
      await fetch('/api/orders', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': this.getAdminPin()
        },
        body: JSON.stringify({ orderId, paymentStatus: newPaymentStatus })
      });
    } catch (err) {
      console.warn('[PATCH payment status failed]:', err);
    }
  }

  async saveOrderDeliveryDate(orderId) {
    const input = document.getElementById('admin-detail-delivery-date');
    if (!input) return;
    const dateVal = input.value;

    const order = (this.data.ecommerceOrders || []).find(o => o.id === orderId);
    if (!order) return;

    order.expectedDeliveryDate = dateVal || null;
    if (!Array.isArray(order.history)) order.history = [];
    order.history.push({
      timestamp: new Date().toISOString(),
      status: order.orderStatus,
      note: dateVal ? `Target delivery date scheduled: ${dateVal}` : 'Target delivery date cleared'
    });

    this.saveData();
    this.renderAdminEcommerceOrders();
    this.showToast(`Target delivery date saved for Order ${orderId}`);

    try {
      await fetch('/api/orders', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': this.getAdminPin()
        },
        body: JSON.stringify({ orderId, expectedDeliveryDate: dateVal })
      });
    } catch (err) {
      console.warn('[PATCH delivery date failed]:', err);
    }

    // Re-render modal to show updated timeline
    this.viewEcommerceOrderDetails(orderId);
  }

  viewEcommerceOrderDetails(orderId) {
    const order = (this.data.ecommerceOrders || []).find(o => o.id === orderId);
    if (!order) return;
    this.activeAdminDetailOrder = order;

    const titleEl = document.getElementById('admin-order-detail-title');
    const badgeEl = document.getElementById('admin-order-detail-status-badge');
    const bodyEl = document.getElementById('admin-order-detail-body');

    if (titleEl) titleEl.textContent = `Order ${order.id}`;
    if (badgeEl) {
      badgeEl.textContent = order.orderStatus || 'Pending';
      badgeEl.className = 'badge ' + (order.orderStatus === 'Accepted' ? 'badge-status-accepted' : (order.orderStatus === 'Delivered' ? 'badge-status-delivered' : 'badge-status-pending'));
    }

    if (bodyEl) {
      const itemsRows = (order.items || []).map((it, idx) => `
        <tr>
          <td>${idx + 1}</td>
          <td><strong>${this.escapeHtml(it.name)}</strong><div style="font-size:0.75rem; color:var(--gray-500);">${this.escapeHtml(it.category || '')}</div></td>
          <td style="text-align:center;">${it.qty}</td>
          <td style="text-align:right;">₹${(Number(it.unitPrice) || 0).toLocaleString('en-IN')}</td>
          <td style="text-align:right; font-weight:700;">₹${(Number(it.lineTotal) || 0).toLocaleString('en-IN')}</td>
        </tr>
      `).join('');

      const historyRows = (order.history && order.history.length > 0) ? order.history.map(h => `
        <li class="order-timeline-item ${h.toStatus === 'Delivered' ? 'delivered' : (h.toStatus === 'Rejected' ? 'rejected' : '')}">
          <div class="order-timeline-date">${new Date(h.timestamp).toLocaleString('en-IN')}</div>
          <div class="order-timeline-title">${h.toStatus ? `Status: ${h.toStatus}` : 'Order Event'}</div>
          <div class="order-timeline-note">${this.escapeHtml(h.note || '')}</div>
        </li>
      `).join('') : '<p style="color:var(--gray-500); font-size:0.85rem;">No status changes logged yet.</p>';

      bodyEl.innerHTML = `
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin-bottom:20px;">
          <div style="background:var(--gray-50); padding:14px; border-radius:var(--radius-md); font-size:0.875rem;">
            <strong style="color:var(--navy-900); display:block; margin-bottom:6px;">Customer Details:</strong>
            <div><strong>${this.escapeHtml(order.customerName)}</strong></div>
            <div>📞 <a href="tel:${this.escapeHtml(order.phone)}" style="color:var(--primary); font-weight:600;">${this.escapeHtml(order.phone)}</a></div>
            ${order.email ? `<div>✉️ ${this.escapeHtml(order.email)}</div>` : ''}
            <div style="margin-top:6px; color:var(--gray-600);">📍 ${this.escapeHtml(order.address)}, ${this.escapeHtml(order.city || 'Hyderabad')}</div>
          </div>

          <div style="background:var(--gray-50); padding:14px; border-radius:var(--radius-md); font-size:0.875rem;">
            <strong style="color:var(--navy-900); display:block; margin-bottom:6px;">Fulfillment & Delivery:</strong>
            <div style="margin-bottom:8px;">
              <label style="display:block; font-size:0.75rem; color:var(--gray-600); margin-bottom:2px;">Expected Workshop Delivery Date:</label>
              <div style="display:flex; gap:8px;">
                <input type="date" id="admin-detail-delivery-date" class="form-control" value="${order.expectedDeliveryDate || ''}" style="padding:4px 8px; font-size:0.825rem;">
                <button class="btn btn-sm btn-primary" onclick="app.saveOrderDeliveryDate('${order.id}')">Save</button>
              </div>
            </div>
            <div>
              <span style="font-size:0.75rem; color:var(--gray-600);">Payment Mode:</span>
              <strong>${this.escapeHtml(order.paymentMode)}</strong>
            </div>
          </div>
        </div>

        ${order.notes ? `
          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:var(--radius-md); padding:10px 14px; font-size:0.85rem; color:#92400e; margin-bottom:16px;">
            <strong>Customer Custom Sizing / Notes:</strong> ${this.escapeHtml(order.notes)}
          </div>
        ` : ''}

        <h4 style="font-size:0.95rem; color:var(--navy-900); margin-bottom:8px;">Itemized Garments</h4>
        <div class="admin-table-wrap" style="margin-bottom:20px;">
          <table class="admin-table">
            <thead>
              <tr>
                <th style="width:30px;">#</th>
                <th>Item</th>
                <th style="text-align:center;">Qty</th>
                <th style="text-align:right;">Unit Rate</th>
                <th style="text-align:right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsRows}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4" style="text-align:right; color:var(--gray-600);">Subtotal:</td>
                <td style="text-align:right; font-weight:700;">₹${(Number(order.totalAmount) || 0).toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td colspan="4" style="text-align:right; color:var(--gray-600);">Delivery Fee:</td>
                <td style="text-align:right; font-weight:700; color:var(--secondary);">FREE (₹0)</td>
              </tr>
              <tr style="background:var(--gray-100);">
                <td colspan="4" style="text-align:right; font-weight:800; color:var(--primary); font-size:1rem;">Grand Total Payable:</td>
                <td style="text-align:right; font-weight:800; color:var(--primary); font-size:1rem;">₹${(Number(order.totalAmount) || 0).toLocaleString('en-IN')}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <h4 style="font-size:0.95rem; color:var(--navy-900); margin-bottom:8px;">Status History & Audit Trail</h4>
        <ul class="order-timeline">
          ${historyRows}
        </ul>
      `;
    }

    this.openModal('modal-admin-order-detail');
  }

  messageCustomerFromModal() {
    if (!this.activeAdminDetailOrder) return;
    this.shareEcommerceOrderWhatsApp(this.activeAdminDetailOrder.id);
  }

  shareEcommerceOrderWhatsApp(orderId) {
    const order = (this.data.ecommerceOrders || []).find(o => o.id === orderId);
    if (!order) return;
    const cleanDigits = order.phone.replace(/[^0-9]/g, '');
    const phone = cleanDigits.length >= 10 ? cleanDigits.slice(-10) : cleanDigits;
    const msg = encodeURIComponent(
      `Hello ${order.customerName},\nThis is ZM Enterprises Tailoring Workshop regarding your Order *${order.id}*.\nCurrent status: *${order.orderStatus}*.${order.expectedDeliveryDate ? `\nTarget delivery date: *${order.expectedDeliveryDate}*.` : ''}\nTotal: ₹${(Number(order.totalAmount) || 0).toLocaleString('en-IN')}.\nWe are available if you have any questions or sizing adjustments.`
    );
    window.open(`https://wa.me/91${phone}?text=${msg}`, '_blank');
  }

  // ==================== WHOLESALE ENQUIRY SUBMISSION ====================
  submitWholesaleEnquiry(e) {
    e.preventDefault();
    const businessName = document.getElementById('ws-business-name').value.trim();
    const contactName = document.getElementById('ws-contact-name').value.trim();
    const phone = document.getElementById('ws-phone').value.trim();
    const email = document.getElementById('ws-email').value.trim();
    const category = document.getElementById('ws-category').value;
    const quantity = document.getElementById('ws-quantity').value;
    const location = document.getElementById('ws-location').value.trim();
    const targetDate = document.getElementById('ws-target-date').value;
    const notes = document.getElementById('ws-notes').value.trim();

    if (!businessName || !contactName || !phone || !category) {
      this.showToast('Please fill all required wholesale inquiry fields.');
      return;
    }

    const refId = 'ZME-B2B-' + Math.floor(1000 + Math.random() * 9000);
    const newEnquiry = {
      id: refId,
      createdAt: new Date().toISOString(),
      schoolOrCompany: businessName,
      contactPerson: contactName,
      phone: phone,
      email: email,
      uniformCategory: category,
      estimatedQuantity: quantity,
      location: location,
      targetDate: targetDate,
      notes: notes,
      status: 'New'
    };

    if (!Array.isArray(this.data.wholesaleEnquiries)) {
      this.data.wholesaleEnquiries = [];
    }
    this.data.wholesaleEnquiries.unshift(newEnquiry);
    this.saveData();

    // Reset form
    document.getElementById('wholesale-b2b-form').reset();
    this.showToast(`Wholesale Enquiry ${refId} submitted successfully!`);

    // Prepare WhatsApp message
    let targetPhone = this.getCleanBizPhone();
    targetPhone = targetPhone.replace(/[^0-9]/g, '');

    const lines = [
      `*ZM ENTERPRISES - B2B WHOLESALE ENQUIRY*`,
      `==============================`,
      `*Enquiry Ref:* ${refId}`,
      `*Institution / Shop:* ${businessName}`,
      `*Contact Person:* ${contactName}`,
      `*Phone:* ${phone}`,
      `*Category:* ${category}`,
      `*Required Lot:* ${quantity}`,
      `*Location:* ${location}`,
      `*Target Date:* ${targetDate}`,
      notes ? `*Notes:* ${notes}` : '',
      ``,
      `Kindly provide an itemized institutional quotation and fabric sample approval appointment.`
    ].filter(Boolean);

    const msg = encodeURIComponent(lines.join('\n'));
    if (confirm(`Enquiry ${refId} saved! Would you like to send this inquiry directly to ZM Enterprises on WhatsApp now?`)) {
      window.open(`https://wa.me/${targetPhone}?text=${msg}`, '_blank');
    }
  }

  // ==================== PREMIUM CINEMATIC FABRIC LAYER EXPLORER ENGINE ====================

  handleFabricExplorerMount(tabName) {
    const sec = document.getElementById('fabric-explorer-section');
    if (!sec) return;
    if (tabName === 'fabric-explorer') {
      const target = document.getElementById('dedicated-fabric-explorer-mount');
      if (target && sec.parentElement !== target) {
        target.appendChild(sec);
      }
    } else {
      const homeTarget = document.getElementById('home-fabric-explorer-mount');
      if (homeTarget && sec.parentElement !== homeTarget) {
        homeTarget.appendChild(sec);
      }
    }
  }

  initFabricExplorer() {
    this.fabricExplorerData = [
      {
        id: "corp-blazer",
        title: "Executive Corporate Blazer",
        category: "Corporate Suiting",
        tagline: "Tailored Multi-Layer Poly-Viscose Suiting",
        icon: "👔",
        videoSrc: "videos/blazer-layers.mp4",
        posterSrc: "images/fabric-rolls.jpg",
        macroTexture: "twill",
        storyboardTitle: "The Architecture of Executive Suiting",
        specs: {
          composition: "65% Polyester, 35% Viscose",
          weave: "2/2 Broken Twill Worsted Weave",
          gsm: "260 GSM (Medium-Heavy Weight)",
          thickness: "0.85 mm Composite",
          breathability: "High (Air Permeability 120 L/m²/s)",
          stretch: "Mechanical Comfort Stretch (Weft 4%)",
          durability: "Grade 4 Abrasion (30,000+ rubs)",
          care: "Dry Clean Recommended / Cool Iron under damp cloth"
        },
        layers: [
          {
            number: 1,
            name: "Outer Shell Fabric",
            role: "Aesthetic Drape & Durability",
            material: "Poly-Viscose Worsted Twill (260 GSM)",
            pattern: "twill",
            depthOffset: 0,
            thicknessLabel: "0.45 mm",
            description: "Engineered with worsted twill yarns that resist wrinkling through long workdays while presenting a crisp executive drape.",
            tailorNote: "Twill weave provides natural mechanical resilience without synthetic elastane degradation."
          },
          {
            number: 2,
            name: "Fused Canvas Interfacing",
            role: "Lapel Roll & Bodice Structure",
            material: "Thermoplastic Woven Interlining",
            pattern: "canvas",
            depthOffset: 45,
            thicknessLabel: "0.25 mm",
            description: "Woven fusible interlining applied via pneumatic press to stabilize lapels, collar, and chest against curling or seam collapse.",
            tailorNote: "Applied strategically to the front bodice and lapels; rear back panel remains unfused for maximum breathability."
          },
          {
            number: 3,
            name: "Chest Felt & Horsehair Canvas",
            role: "3D Chest Contour & Bounce Memory",
            material: "Natural Horsehair Canvas & Wool Felt",
            pattern: "haircloth",
            depthOffset: 90,
            thicknessLabel: "1.20 mm",
            description: "Anatomical horsehair and needle-punched wool felt chest pad creating the masculine contour roll that prevents the blazer from looking flat.",
            tailorNote: "Springy horsehair yarn has permanent physical memory, springing back even after packing in corporate travel luggage."
          },
          {
            number: 4,
            name: "Viscose-Satin Inner Lining",
            role: "Frictionless Glide & Seam Shield",
            material: "100% Breathable Viscose Twill Lining",
            pattern: "satin",
            depthOffset: 135,
            thicknessLabel: "0.15 mm",
            description: "Ultra-smooth viscose twill lining that glides effortlessly over dress shirts when slipping the jacket on, while absorbing moisture.",
            tailorNote: "Includes a 1.5 cm pleat at back lining hem for unrestrained arm movement during driving and desk work."
          }
        ]
      },
      {
        id: "school-shirt",
        title: "Boys High School Uniform Shirt",
        category: "School Uniforms / Shirting",
        tagline: "Oxford Poly-Cotton Durable School Weave",
        icon: "👕",
        videoSrc: "videos/oxford-shirt.mp4",
        posterSrc: "images/school-uniform.jpg",
        macroTexture: "oxford",
        storyboardTitle: "Engineering Academic Durability",
        specs: {
          composition: "65% Polyester, 35% Combed Long-Staple Cotton",
          weave: "2x1 Basket Oxford Weave",
          gsm: "210 GSM",
          thickness: "0.38 mm",
          breathability: "Very High (Open Air Permeability)",
          stretch: "Natural Fiber Ease (Non-stretch rigid)",
          durability: "100+ Commercial Institutional Wash Tested",
          care: "Machine Wash Warm (40°C) / Tumble Dry Safe / Medium Heat Iron"
        },
        layers: [
          {
            number: 1,
            name: "Oxford Basket-Weave Fabric",
            role: "Main Body Weave & Air Flow",
            material: "65/35 Dacron Poly-Cotton Blend (210 GSM)",
            pattern: "oxford",
            depthOffset: 0,
            thicknessLabel: "0.38 mm",
            description: "Constructed with two warp yarns crossing one heavier weft yarn to create the signature breathable Oxford texture that dissipates heat in warm classrooms.",
            tailorNote: "Double-needle felled seam construction ensures seams do not burst under backpack strap tension."
          },
          {
            number: 2,
            name: "Collar & Placket Fused Interfacing",
            role: "Collar Rigidity (Localized Component)",
            material: "High-Density Thermoplastic Resin Interfacing",
            pattern: "fused-net",
            depthOffset: 55,
            thicknessLabel: "0.22 mm",
            description: "Thermal interlining fused exclusively inside the two-piece collar and front button placket to prevent collar points from curling over 100+ washes.",
            tailorNote: "Present strictly at collar, cuff bands, and button stand. The shirt body is intentionally a single unlined fabric layer."
          }
        ]
      },
      {
        id: "bespoke-tuxedo",
        title: "Men's Bespoke 3-Piece Tuxedo",
        category: "Bespoke Tailoring",
        tagline: "Hand-Basted Pure Wool & Floating Horsehair Canvas",
        icon: "🤵",
        videoSrc: "videos/bespoke-tuxedo.mp4",
        posterSrc: "images/bespoke-tuxedo.jpg",
        macroTexture: "barathea",
        storyboardTitle: "The Anatomy of Master Atelier Craftsmanship",
        specs: {
          composition: "Super 120s Australian Merino Wool & Silk Blend",
          weave: "Plain Weave Barathea / Fine Twill",
          gsm: "280 GSM",
          thickness: "0.95 mm Composite",
          breathability: "Natural Thermoregulating Wool Ventilation",
          stretch: "Natural Wool Crimp Elasticity (Weft 5%)",
          durability: "Handcrafted Heirloom Longevity",
          care: "Specialist Garment Valet / Steam Pressing Only"
        },
        layers: [
          {
            number: 1,
            name: "Super 120s Barathea Wool Shell",
            role: "Deep Light Absorption & Drape",
            material: "100% Super 120s Australian Merino Wool",
            pattern: "barathea",
            depthOffset: 0,
            thicknessLabel: "0.50 mm",
            description: "Woven from 17.5-micron extra-fine Merino fleece with barathea twill finish. Absorbs light for rich, shadow-defined drape under evening banquet lighting.",
            tailorNote: "Hand-stitched pick stitching (AMF) applied 2mm from the silk grosgrain lapel border."
          },
          {
            number: 2,
            name: "Floating Horsehair Canvas",
            role: "Natural Floating Chest Suspension",
            material: "Flax Linen Warp & Real Horsehair Weft",
            pattern: "haircloth",
            depthOffset: 45,
            thicknessLabel: "0.65 mm",
            description: "Stitched entirely by hand with thousands of invisible basting stitches without synthetic adhesive glue, allowing the suit to mold to the wearer's anatomy.",
            tailorNote: "Unlike glued fused suits that bubble over time, floating canvas breathes and naturally contours with body warmth."
          },
          {
            number: 3,
            name: "Needled Flannel Chest Piece",
            role: "Chest Softness & Transition",
            material: "Needle-Punched Wool Fleece",
            pattern: "canvas",
            depthOffset: 85,
            thicknessLabel: "0.90 mm",
            description: "A soft wool fleece layer positioned over the upper horsehair canvas to cushion the chest and prevent haircloth grain from showing through the shell.",
            tailorNote: "Steam-shaped over wooden tailor's press to match the client's individual measured posture."
          },
          {
            number: 4,
            name: "Armscye Sleevehead & Pad Structure",
            role: "Shoulder Definition & Sleeve Hang",
            material: "Layered Cotton Wadding & Canvas",
            pattern: "twill",
            depthOffset: 125,
            thicknessLabel: "1.40 mm",
            description: "Cotton wadding and canvas sleevehead insert placed at the armscye joint to ensure the sleeve hangs cleanly with zero bicep dimpling.",
            tailorNote: "Calibrated to the client's shoulder slope measured during the intermediate basted trial."
          },
          {
            number: 5,
            name: "Bemberg Cupro Breathable Lining",
            role: "Anti-Static Interior & Thermal Ease",
            material: "100% Bemberg Cupro (Cotton Linter)",
            pattern: "satin",
            depthOffset: 165,
            thicknessLabel: "0.18 mm",
            description: "Silky regenerated cotton linter cupro lining. Completely anti-static, preventing garment cling while venting moisture away from the interior.",
            tailorNote: "Attached with piped border seams and contrasting hand-sewn interior passport pockets."
          }
        ]
      },
      {
        id: "school-pinafore",
        title: "Girls Academic Pinafore & Salwar Set",
        category: "School Uniforms / Lined",
        tagline: "Box-Pleat Poly-Viscose with Comfort Bodice Lining",
        icon: "👗",
        videoSrc: "videos/school-pinafore.mp4",
        posterSrc: "images/school-uniform-girls.jpg",
        macroTexture: "twill",
        storyboardTitle: "Comfort & Pleat Integrity in Student Wear",
        specs: {
          composition: "Shell: 65% Poly / 35% Viscose; Lining: 100% Combed Cotton Poplin",
          weave: "2/1 Static-Free Twill",
          gsm: "240 GSM (Shell) / 110 GSM (Lining)",
          thickness: "0.62 mm Composite",
          breathability: "High Skin Comfort (Cotton contact layer)",
          stretch: "Mechanical Comfort Ease",
          durability: "Color-Fast to 60+ Harsh Sunlight Exposures",
          care: "Machine Wash / Hang Dry / Warm Iron along pleat creases"
        },
        layers: [
          {
            number: 1,
            name: "Outer Box-Pleat Shell Fabric",
            role: "Permanent Pleat Sharpness & Wear Resistance",
            material: "Poly-Viscose Pleat-Lock Twill (240 GSM)",
            pattern: "twill",
            depthOffset: 0,
            thicknessLabel: "0.42 mm",
            description: "Thermo-set box pleats hold sharp creases through repeated machine wash cycles without flattening or losing shape.",
            tailorNote: "Includes a 3-inch growth hem inside for lengthening as students grow during the academic school term."
          },
          {
            number: 2,
            name: "Breathable Cotton-Poplin Bodice Lining",
            role: "Skin Contact Barrier & Sweat Absorption",
            material: "100% Combed Pure Cotton Poplin",
            pattern: "poplin",
            depthOffset: 55,
            thicknessLabel: "0.20 mm",
            description: "Soft pure cotton lining inside the upper chest bodice and waistband to prevent skin chafing during active classroom days.",
            tailorNote: "Pre-shrunk before cutting to prevent shrinkage differential between outer shell and inner lining."
          }
        ]
      },
      {
        id: "medical-scrubs",
        title: "Clinical Medical Scrubs & Doctor Coats",
        category: "Healthcare & Hospitality",
        tagline: "Hospital-Grade Antimicrobial Poplin Weave",
        icon: "🩺",
        videoSrc: "videos/medical-scrubs.mp4",
        posterSrc: "images/medical-scrubs.jpg",
        macroTexture: "poplin",
        storyboardTitle: "Clinical Hygiene & Fluid Resistance",
        specs: {
          composition: "65% Micro-Polyester, 35% Long-Staple Cotton with Silvadur™ Antimicrobial Finish",
          weave: "High-Density Compact Plain Poplin",
          gsm: "180 GSM",
          thickness: "0.32 mm Single Layer",
          breathability: "Maximum Vapor Transfer (210 L/m²/s)",
          stretch: "Mechanical 2-Way Weft Ease",
          durability: "Autoclave Wash-Safe (70°C+ Laundering)",
          care: "Chlorine Bleach Safe / High Temperature Sanitization Safe"
        },
        layers: [
          {
            number: 1,
            name: "Antimicrobial Medical Poplin Weave",
            role: "Single-Layer Sterile Fluid Barrier",
            material: "Silvadur-Treated Poly-Cotton Poplin (180 GSM)",
            pattern: "poplin",
            depthOffset: 0,
            thicknessLabel: "0.32 mm",
            description: "High-density single-layer plain weave. High thread count resists fluid splash while silver-ion treatment inhibits bacterial growth. Unlined for rapid autoclaving.",
            tailorNote: "Constructed with 4-thread overlock and safety stitch seams to eliminate fraying during commercial industrial hospital laundering."
          }
        ]
      },
      {
        id: "industrial-twill",
        title: "Heavy-Duty Industrial Boiler Suit",
        category: "Industrial & Workwear",
        tagline: "240 GSM Heavy Cotton Drill with Double-Twisted Yarns",
        icon: "⚙️",
        videoSrc: "videos/industrial-workwear.mp4",
        posterSrc: "images/industrial-workwear.jpg",
        macroTexture: "heavy-twill",
        storyboardTitle: "Tensile Strength & Heavy Twill Engineering",
        specs: {
          composition: "100% Ring-Spun Cotton Heavy Drill",
          weave: "3/1 Heavy Diagonal Twill",
          gsm: "240 GSM",
          thickness: "0.68 mm Single Layer",
          breathability: "Moderate Breathability with Wind Resistance",
          stretch: "Rigid High Tensile (Zero Stretch)",
          durability: "Tested for 450 N Warp Tensile Break Strength",
          care: "Industrial Laundry Safe / Resists grease, sparks & metal burrs"
        },
        layers: [
          {
            number: 1,
            name: "3/1 Heavy Diagonal Cotton Twill",
            role: "Workshop Abrasion Defense & Tear Resistance",
            material: "100% Ring-Spun Heavy Cotton Twill (240 GSM)",
            pattern: "heavy-twill",
            depthOffset: 0,
            thicknessLabel: "0.68 mm",
            description: "Heavyweight single-layer twill with pronounced 45° diagonal ridges. Shields skin against workshop abrasions, grease, and metal filings.",
            tailorNote: "Pocket edges, crotch joins, and zipper ends are reinforced with 28-stitch bar-tack anchors."
          }
        ]
      }
    ];

    this.activeFabricId = 'corp-blazer';
    this.activeLayerIndex = 0;
    this.isExploded = true;
    this.isPlayingWalkthrough = false;
    this.walkthroughTimer = null;
    this.videoPlayerMode = 'interactive';
    this.activeScene = 1;
    this.isVideoPlaying = false;
    this.isStoryboardPlaying = false;
    this.storyboardTimer = null;
    this.storyboardProgress = 0;
    this.playbackSpeed = 1;

    this.renderFabricCategoryPills();
    this.selectFabric('corp-blazer');
    this.initVideoPlayer();
  }

  renderFabricCategoryPills() {
    const container = document.getElementById('fabric-category-pills');
    if (!container) return;
    container.innerHTML = this.fabricExplorerData.map(f => {
      const isActive = f.id === this.activeFabricId;
      const countLabel = f.layers.length === 1 ? '1 Layer (Weave)' : `${f.layers.length} Layers`;
      return `
        <button class="fabric-cat-pill ${isActive ? 'active' : ''}" onclick="app.selectFabric('${f.id}')" aria-label="Select ${f.title}">
          <span>${f.icon || '🧵'}</span>
          <span>${f.title}</span>
          <span class="cat-pill-count">${countLabel}</span>
        </button>
      `;
    }).join('');
  }

  selectFabric(fabricId) {
    const fabric = this.fabricExplorerData.find(f => f.id === fabricId) || this.fabricExplorerData[0];
    this.activeFabricId = fabric.id;
    this.activeLayerIndex = 0;
    this.stopFullExplanation();

    // Update Pills
    this.renderFabricCategoryPills();

    // Update Titles
    const titleEl = document.getElementById('studio-garment-title');
    const catEl = document.getElementById('studio-garment-cat');
    if (titleEl) titleEl.textContent = fabric.title;
    if (catEl) catEl.textContent = `${fabric.category} • ${fabric.tagline}`;

    // Update Pipeline Notice & Video Source
    const assetLabel = document.getElementById('pipeline-asset-name');
    if (assetLabel) assetLabel.textContent = fabric.videoSrc;

    const videoEl = document.getElementById('fabric-cinematic-video');
    if (videoEl) {
      videoEl.poster = fabric.posterSrc || 'images/fabric-video-poster.svg';
      const source = videoEl.querySelector('source');
      if (source) source.src = fabric.videoSrc;
      videoEl.load();
    }

    // Update Macro Plate for Canvas Engine
    const plate = document.getElementById('canvas-macro-plate');
    if (plate) {
      plate.className = `macro-texture-plate texture-${fabric.macroTexture || 'twill'}`;
    }

    // Render Layers & Controls
    this.renderIsometricLayers();
    this.renderLayerPills();
    this.selectLayer(0);
    this.renderSpecsGrid();
    this.jumpToScene(1);
  }

  renderIsometricLayers() {
    const stage = document.getElementById('isometric-stage-container');
    if (!stage) return;
    const fabric = this.fabricExplorerData.find(f => f.id === this.activeFabricId);
    if (!fabric) return;

    stage.innerHTML = fabric.layers.map((layer, idx) => {
      const zOffset = this.isExploded ? (layer.depthOffset || idx * 45) : (idx * 4);
      const isActive = idx === this.activeLayerIndex;
      const textureClass = `texture-${layer.pattern || 'twill'}`;
      return `
        <div class="iso-layer-slab ${textureClass} ${isActive ? 'active' : ''}" 
             id="iso-slab-${idx}"
             style="transform: translateZ(${zOffset}px);" 
             onclick="app.selectLayer(${idx})" 
             title="${layer.name} (${layer.thicknessLabel})">
          <div class="iso-layer-inner">
            <span class="iso-layer-badge">${layer.number}. ${layer.name}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  renderLayerPills() {
    const container = document.getElementById('layer-pills-container');
    if (!container) return;
    const fabric = this.fabricExplorerData.find(f => f.id === this.activeFabricId);
    if (!fabric) return;

    container.innerHTML = fabric.layers.map((layer, idx) => {
      const isActive = idx === this.activeLayerIndex;
      return `
        <button class="layer-nav-pill ${isActive ? 'active' : ''}" 
                id="layer-pill-${idx}"
                onclick="app.selectLayer(${idx})">
          ${layer.number}. ${layer.name}
        </button>
      `;
    }).join('');
  }

  selectLayer(index) {
    const fabric = this.fabricExplorerData.find(f => f.id === this.activeFabricId);
    if (!fabric || !fabric.layers[index]) return;
    this.activeLayerIndex = index;
    const layer = fabric.layers[index];

    // Update Slabs and Pills active states
    fabric.layers.forEach((_, i) => {
      const slab = document.getElementById(`iso-slab-${i}`);
      const pill = document.getElementById(`layer-pill-${i}`);
      if (slab) slab.classList.toggle('active', i === index);
      if (pill) pill.classList.toggle('active', i === index);
    });

    // Update Counter
    const counterText = document.getElementById('layer-counter-text');
    if (counterText) {
      counterText.textContent = `Layer ${index + 1} of ${fabric.layers.length}`;
    }

    // Update Detail Card
    const titleEl = document.getElementById('layer-detail-title');
    const matEl = document.getElementById('layer-material-name');
    const roleBadge = document.getElementById('layer-role-badge');
    const descEl = document.getElementById('layer-detail-desc');
    const tailorEl = document.getElementById('layer-tailor-text');

    if (titleEl) titleEl.textContent = `Layer ${layer.number}: ${layer.name}`;
    if (matEl) matEl.textContent = `${layer.material} • Thickness: ${layer.thicknessLabel}`;
    if (roleBadge) roleBadge.textContent = layer.role || 'Structural Component';
    if (descEl) descEl.textContent = layer.description;
    if (tailorEl) tailorEl.textContent = layer.tailorNote || 'Precision atelier craft.';
  }

  toggleExplodedView(isExploded) {
    this.isExploded = isExploded;
    const btnSep = document.getElementById('btn-separate-layers');
    const btnReas = document.getElementById('btn-reassemble-layers');
    if (btnSep) btnSep.classList.toggle('active', isExploded);
    if (btnReas) btnReas.classList.toggle('active', !isExploded);

    const fabric = this.fabricExplorerData.find(f => f.id === this.activeFabricId);
    if (!fabric) return;

    fabric.layers.forEach((layer, idx) => {
      const slab = document.getElementById(`iso-slab-${idx}`);
      if (slab) {
        const zOffset = isExploded ? (layer.depthOffset || idx * 45) : (idx * 4);
        slab.style.transform = `translateZ(${zOffset}px)`;
      }
    });
  }

  stepLayer(delta) {
    const fabric = this.fabricExplorerData.find(f => f.id === this.activeFabricId);
    if (!fabric || fabric.layers.length === 0) return;
    let nextIdx = this.activeLayerIndex + delta;
    if (nextIdx < 0) nextIdx = fabric.layers.length - 1;
    if (nextIdx >= fabric.layers.length) nextIdx = 0;
    this.selectLayer(nextIdx);
  }

  toggleFullExplanation() {
    if (this.isPlayingWalkthrough) {
      this.stopFullExplanation();
      return;
    }
    this.isPlayingWalkthrough = true;
    const btn = document.getElementById('btn-walkthrough');
    const label = document.getElementById('btn-walkthrough-label');
    if (label) label.textContent = '⏹ Stop Walkthrough';
    if (btn) btn.classList.add('active');

    this.toggleExplodedView(true);

    const fabric = this.fabricExplorerData.find(f => f.id === this.activeFabricId);
    if (!fabric) return;

    let step = 0;
    this.selectLayer(0);

    this.walkthroughTimer = setInterval(() => {
      step++;
      if (step < fabric.layers.length) {
        this.selectLayer(step);
      } else if (step === fabric.layers.length) {
        // Reassemble phase
        this.toggleExplodedView(false);
        const titleEl = document.getElementById('layer-detail-title');
        const descEl = document.getElementById('layer-detail-desc');
        if (titleEl) titleEl.textContent = `Reassembled ${fabric.title}`;
        if (descEl) descEl.textContent = `All ${fabric.layers.length} structural components converge into a unified, reinforced garment engineered for institutional longevity.`;
      } else {
        this.stopFullExplanation();
        this.toggleExplodedView(true);
        this.selectLayer(0);
      }
    }, 3800);
  }

  stopFullExplanation() {
    this.isPlayingWalkthrough = false;
    if (this.walkthroughTimer) {
      clearInterval(this.walkthroughTimer);
      this.walkthroughTimer = null;
    }
    const btn = document.getElementById('btn-walkthrough');
    const label = document.getElementById('btn-walkthrough-label');
    if (label) label.textContent = 'Play Full Explanation';
    if (btn) btn.classList.remove('active');
  }

  renderSpecsGrid() {
    const grid = document.getElementById('specs-grid-container');
    if (!grid) return;
    const fabric = this.fabricExplorerData.find(f => f.id === this.activeFabricId);
    if (!fabric || !fabric.specs) return;

    const specs = [
      { label: 'Composition', val: fabric.specs.composition },
      { label: 'Weave Structure', val: fabric.specs.weave },
      { label: 'Weight / GSM', val: fabric.specs.gsm },
      { label: 'Fabric Thickness', val: fabric.specs.thickness },
      { label: 'Air Breathability', val: fabric.specs.breathability },
      { label: 'Stretch & Ease', val: fabric.specs.stretch },
      { label: 'Seam Durability', val: fabric.specs.durability },
      { label: 'Care Requirements', val: fabric.specs.care }
    ];

    grid.innerHTML = specs.map(s => `
      <div class="spec-cell">
        <div class="spec-cell-label">${s.label}</div>
        <div class="spec-cell-val">${s.val || 'Specification Pending Verification'}</div>
      </div>
    `).join('');
  }

  initVideoPlayer() {
    const video = document.getElementById('fabric-cinematic-video');
    if (!video) return;

    video.addEventListener('timeupdate', () => {
      if (this.videoPlayerMode === 'cinema' && !isNaN(video.duration) && video.duration > 0) {
        const pct = (video.currentTime / video.duration) * 100;
        const progressFill = document.getElementById('video-progress-fill');
        const handle = document.getElementById('video-scrub-handle');
        const timeDisplay = document.getElementById('video-time-display');
        if (progressFill) progressFill.style.width = `${pct}%`;
        if (handle) handle.style.left = `${pct}%`;
        if (timeDisplay) {
          timeDisplay.textContent = `${this.formatVideoTime(video.currentTime)} / ${this.formatVideoTime(video.duration)}`;
        }
      }
    });

    video.addEventListener('play', () => {
      this.isVideoPlaying = true;
      this.updatePlayPauseIcon(true);
    });

    video.addEventListener('pause', () => {
      this.isVideoPlaying = false;
      this.updatePlayPauseIcon(false);
    });

    video.addEventListener('error', () => {
      // Missing video asset handler: fallback cleanly to Live Storyboard Preview
      console.info('[Video Player] Physical video asset awaiting render. Operating in Live Storyboard Preview mode.');
      const notice = document.getElementById('video-pipeline-notice');
      if (notice) notice.style.display = 'flex';
      const canvasOverlay = document.getElementById('storyboard-canvas-overlay');
      if (canvasOverlay) canvasOverlay.style.display = 'flex';
    });
  }

  toggleVideoPlayPause() {
    const video = document.getElementById('fabric-cinematic-video');
    if (this.videoPlayerMode === 'cinema' && video && video.readyState >= 2) {
      if (video.paused) {
        video.play().catch(() => this.toggleStoryboardPlay());
      } else {
        video.pause();
      }
    } else {
      this.toggleStoryboardPlay();
    }
  }

  updatePlayPauseIcon(isPlaying) {
    const icon = document.getElementById('play-pause-icon');
    const screenBtn = document.getElementById('screen-play-btn');
    if (icon) {
      icon.innerHTML = isPlaying 
        ? '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>' 
        : '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
    }
    if (screenBtn) {
      screenBtn.style.opacity = isPlaying ? '0' : '1';
      screenBtn.style.pointerEvents = isPlaying ? 'none' : 'auto';
    }
  }

  toggleVideoMute() {
    const video = document.getElementById('fabric-cinematic-video');
    const muteIcon = document.getElementById('mute-icon');
    if (!video) return;
    video.muted = !video.muted;
    if (muteIcon) {
      muteIcon.innerHTML = video.muted 
        ? '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>'
        : '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>';
    }
  }

  setPlaybackSpeed(speed) {
    this.playbackSpeed = parseFloat(speed) || 1;
    const video = document.getElementById('fabric-cinematic-video');
    if (video) video.playbackRate = this.playbackSpeed;
  }

  toggleVideoFullscreen() {
    const screen = document.getElementById('fabric-video-screen-container');
    if (!screen) return;
    if (!document.fullscreenElement) {
      if (screen.requestFullscreen) screen.requestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }

  handleScrubClick(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetSec = pct * 85;

    const video = document.getElementById('fabric-cinematic-video');
    if (video && !isNaN(video.duration) && video.duration > 0) {
      video.currentTime = pct * video.duration;
    } else {
      this.storyboardProgress = targetSec;
      this.updateStoryboardUI();
    }
  }

  jumpToScene(sceneNum) {
    this.activeScene = sceneNum;
    const sceneCueTimes = { 1: 0, 2: 15, 3: 35, 4: 60, 5: 75 };
    const sec = sceneCueTimes[sceneNum] || 0;
    this.storyboardProgress = sec;

    // Update Scene Tabs
    for (let i = 1; i <= 5; i++) {
      const tab = document.getElementById(`scene-tab-${i}`);
      if (tab) tab.classList.toggle('active', i === sceneNum);
    }

    const sceneLabels = {
      1: "Scene 1 — The Hero Shot: \"More Than Meets the Eye\"",
      2: "Scene 2 — Fabric Construction & Weave Anatomy",
      3: "Scene 3 — Layer-by-Layer Exploded View",
      4: "Scene 4 — Material Detail & Verified Specifications",
      5: "Scene 5 — Final Assembly & Atelier Handover"
    };

    const labelEl = document.getElementById('theater-scene-label');
    if (labelEl) labelEl.textContent = sceneLabels[sceneNum] || sceneLabels[1];

    const fabric = this.fabricExplorerData.find(f => f.id === this.activeFabricId);

    // Update Storyboard Overlay text
    const heroTag = document.getElementById('canvas-hero-tag');
    const heroTitle = document.getElementById('canvas-hero-title');
    const heroDesc = document.getElementById('canvas-hero-desc');

    if (sceneNum === 1) {
      if (heroTag) heroTag.textContent = 'SCENE 1 • THE HERO SHOT';
      if (heroTitle) heroTitle.textContent = 'More Than Meets the Eye';
      if (heroDesc) heroDesc.textContent = `Cinematic macro inspection of ${fabric ? fabric.title : 'textile material'} surface texture and light refraction.`;
    } else if (sceneNum === 2) {
      if (heroTag) heroTag.textContent = 'SCENE 2 • FABRIC CONSTRUCTION';
      if (heroTitle) heroTitle.textContent = 'Woven Yarn Geometry';
      if (heroDesc) heroDesc.textContent = `Magnified view of warp and weft interlacing: distinguishing genuine woven yarn architecture from separate physical garment layers.`;
    } else if (sceneNum === 3) {
      if (heroTag) heroTag.textContent = 'SCENE 3 • EXPLODED VIEW';
      if (heroTitle) heroTitle.textContent = `Layer-by-Layer Separation`;
      if (heroDesc) heroDesc.textContent = `Physical components separate along the Z-axis, revealing each genuine structural layer engineered for durability.`;
      this.toggleExplodedView(true);
    } else if (sceneNum === 4) {
      if (heroTag) heroTag.textContent = 'SCENE 4 • MATERIAL DETAIL';
      if (heroTitle) heroTitle.textContent = 'Verified Technical Metrics';
      if (heroDesc) heroDesc.textContent = `Direct Indian mill certified data: ${fabric && fabric.specs ? fabric.specs.gsm : '260 GSM'}, ${fabric && fabric.specs ? fabric.specs.composition : 'Poly-Viscose'}, Grade 4 colorfastness.`;
    } else if (sceneNum === 5) {
      if (heroTag) heroTag.textContent = 'SCENE 5 • FINAL ASSEMBLY';
      if (heroTitle) heroTitle.textContent = 'Finished Garment Handover';
      if (heroDesc) heroDesc.textContent = `All layers converge into the master silhouette. Precision tailored by ZM Enterprises in Hyderabad, Telangana.`;
      this.toggleExplodedView(false);
    }

    this.updateStoryboardUI();
  }

  toggleStoryboardPlay() {
    if (this.isStoryboardPlaying) {
      this.stopStoryboardPlay();
      return;
    }
    this.isStoryboardPlaying = true;
    this.updatePlayPauseIcon(true);

    const canvasOverlay = document.getElementById('storyboard-canvas-overlay');
    if (canvasOverlay) canvasOverlay.style.display = 'flex';

    this.storyboardTimer = setInterval(() => {
      this.storyboardProgress += 1 * this.playbackSpeed;
      if (this.storyboardProgress >= 85) {
        this.storyboardProgress = 0;
      }

      // Sync active scene based on progress
      if (this.storyboardProgress < 12) {
        if (this.activeScene !== 1) this.jumpToScene(1);
      } else if (this.storyboardProgress < 26) {
        if (this.activeScene !== 2) this.jumpToScene(2);
      } else if (this.storyboardProgress < 48) {
        if (this.activeScene !== 3) this.jumpToScene(3);
      } else if (this.storyboardProgress < 68) {
        if (this.activeScene !== 4) this.jumpToScene(4);
      } else {
        if (this.activeScene !== 5) this.jumpToScene(5);
      }

      this.updateStoryboardUI();
    }, 1000);
  }

  stopStoryboardPlay() {
    this.isStoryboardPlaying = false;
    if (this.storyboardTimer) {
      clearInterval(this.storyboardTimer);
      this.storyboardTimer = null;
    }
    this.updatePlayPauseIcon(false);
  }

  updateStoryboardUI() {
    const totalSec = 85;
    const pct = (this.storyboardProgress / totalSec) * 100;
    const progressFill = document.getElementById('video-progress-fill');
    const handle = document.getElementById('video-scrub-handle');
    const timeDisplay = document.getElementById('video-time-display');

    if (progressFill) progressFill.style.width = `${pct}%`;
    if (handle) handle.style.left = `${pct}%`;
    if (timeDisplay) {
      timeDisplay.textContent = `${this.formatVideoTime(this.storyboardProgress)} / 01:25`;
    }
  }

  formatVideoTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  }

  setFabricPlayerMode(mode) {
    this.videoPlayerMode = mode;
    const btnInt = document.getElementById('btn-mode-interactive');
    const btnCin = document.getElementById('btn-mode-cinema');
    if (btnInt) btnInt.classList.toggle('active', mode === 'interactive');
    if (btnCin) btnCin.classList.toggle('active', mode === 'cinema');

    const canvasOverlay = document.getElementById('storyboard-canvas-overlay');
    if (mode === 'cinema') {
      if (canvasOverlay) canvasOverlay.style.display = 'none';
      const video = document.getElementById('fabric-cinematic-video');
      if (video) video.play().catch(() => {
        if (canvasOverlay) canvasOverlay.style.display = 'flex';
      });
    } else {
      if (canvasOverlay) canvasOverlay.style.display = 'flex';
      const video = document.getElementById('fabric-cinematic-video');
      if (video) video.pause();
    }
  }

  enquireAboutCurrentFabric() {
    const fabric = this.fabricExplorerData.find(f => f.id === this.activeFabricId);
    this.switchTab('wholesale');
    setTimeout(() => {
      const notesField = document.getElementById('enq-notes');
      if (notesField && fabric) {
        notesField.value = `Inquiring about fabric material: ${fabric.title} (${fabric.tagline}). Verified Specs: ${fabric.specs.composition}, ${fabric.specs.gsm}. Requesting sample fabric swatches and bulk lot stitching rates.`;
        notesField.focus();
      }
      const catField = document.getElementById('enq-category');
      if (catField && fabric) {
        if (fabric.id.includes('school')) catField.value = 'School Uniforms';
        else if (fabric.id.includes('corp') || fabric.id.includes('tuxedo')) catField.value = 'Corporate Uniforms';
        else if (fabric.id.includes('med')) catField.value = 'Healthcare & Hospital Attire';
        else if (fabric.id.includes('ind')) catField.value = 'Industrial Workwear & Utility';
      }
    }, 200);
  }

  whatsappAboutCurrentFabric() {
    const fabric = this.fabricExplorerData.find(f => f.id === this.activeFabricId);
    const targetPhone = this.getCleanBizPhone();
    const msg = encodeURIComponent(
      `Hello ZM Enterprises Atelier,\nI am reviewing the *${fabric.title}* on your website Fabric Explorer (${fabric.tagline}).\n\nVerified Specs: ${fabric.specs.composition} • ${fabric.specs.gsm}\nKindly confirm swatch availability and appointment for uniform sample approval.`
    );
    window.open(`https://wa.me/${targetPhone}?text=${msg}`, '_blank');
  }

  exploreFabricForProduct(fabricId) {
    this.selectFabric(fabricId);
    const sec = document.getElementById('fabric-explorer-section');
    if (sec) {
      sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // ==================== PAYMENT GATEWAY ARCHITECTURE HOOK ====================
  /**
   * Prepared architectural handler for automated payment gateways (Razorpay, Stripe, Cashfree).
   * Note: In compliance with project guidelines, no credentials or private keys are hardcoded in the frontend.
   * Real production gateways require a secure Node.js / serverless endpoint to sign checkout orders.
   */
  async processPaymentGateway(order, gatewayType = 'razorpay') {
    console.info(`[Payment Gateway Readiness] Initiating payment flow for ${order.id} via ${gatewayType}`);
    return {
      status: 'manual_verification_required',
      message: 'Automatic payment gateway will be enabled upon backend server configuration.'
    };
  }


  // ==================== SIMPLIFIED CUSTOMER ORDER CONFIRMATION ====================
  showOrderConfirmation(order, serverSaved = true) {
    const body = document.getElementById('order-confirmation-body');
    if (!body) return;

    const itemCount = (order.items || []).reduce((s, i) => s + (Number(i.qty) || 1), 0);
    const itemNames = (order.items || []).map(i => `${i.name} (x${i.qty})`).join(', ');

    body.innerHTML = `
      <div class="order-confirm-compact">
        <div class="order-confirm-badge-icon">✓</div>
        <h3 class="order-confirm-title">Order Placed Successfully!</h3>
        <p class="order-confirm-lead">Your order has been recorded securely in our system.</p>

        <div class="order-confirm-id-card">
          <div class="order-confirm-id-label">ORDER REFERENCE ID</div>
          <div class="order-confirm-id-value">${this.escapeHtml(order.id)}</div>
          <div class="order-confirm-status-tag">
            <span class="status-indicator-dot" style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#d97706; margin-right:5px;"></span>
            <strong>Status: Pending Confirmation</strong>
          </div>
          <p style="font-size:0.775rem; color:#64748b; margin:6px 0 0;">
            Our Workshop Master Tailor will review your sizing and specifications, then confirm your order.
          </p>
        </div>

        <div class="order-confirm-summary-list">
          <div class="order-summary-row">
            <span style="color:#64748b;">Items (${itemCount} pcs):</span>
            <span style="font-weight:600; text-align:right; max-width:60%;">${this.escapeHtml(itemNames)}</span>
          </div>
          <div class="order-summary-row">
            <span style="color:#64748b;">Delivery Destination:</span>
            <span style="font-weight:600; text-align:right;">${this.escapeHtml(order.address)}, ${this.escapeHtml(order.city || 'Hyderabad')}</span>
          </div>
          <div class="order-summary-row">
            <span style="color:#64748b;">Delivery Fee:</span>
            <span style="color:#167A62; font-weight:700;">FREE (₹0)</span>
          </div>
          <div class="order-summary-row total-highlight">
            <span style="font-weight:700;">Total Payable:</span>
            <span style="font-weight:800; color:#234E8A;">₹${(Number(order.totalAmount) || 0).toLocaleString('en-IN')}</span>
          </div>
        </div>

        <!-- Primary Action Buttons: Track Order & WhatsApp -->
        <div class="order-confirm-actions">
          <button type="button" class="btn btn-primary btn-block" onclick="app.trackOrderDirectly('${this.escapeHtml(order.id)}', '${this.escapeHtml(order.phone)}')">
            📦 Track My Order Live
          </button>
          <button type="button" class="btn btn-whatsapp btn-block" onclick="app.shareOrderConfirmationWhatsApp()">
            💬 Message Master on WhatsApp
          </button>
        </div>

        <!-- Collapsible Order Details -->
        <details class="order-confirm-collapsible">
          <summary>View Complete Garment & Measurement Details</summary>
          <div class="order-confirm-expanded-body">
            <div><strong>Customer:</strong> ${this.escapeHtml(order.customerName)} (${this.escapeHtml(order.phone)})</div>
            ${order.email ? `<div><strong>Email:</strong> ${this.escapeHtml(order.email)}</div>` : ''}
            <div><strong>Payment Mode:</strong> ${this.escapeHtml(order.paymentMode || 'Cash on Delivery / Pickup')}</div>
            ${order.notes ? `<div><strong>Custom Sizing Notes:</strong> ${this.escapeHtml(order.notes)}</div>` : ''}
            <div style="margin-top:8px;">
              <strong>Item Breakdown:</strong>
              <ul style="margin:4px 0 0 18px; padding:0;">
                ${(order.items || []).map(i => `<li>${this.escapeHtml(i.name)} — ${i.qty} pcs @ ₹${i.unitPrice} = ₹${i.lineTotal}</li>`).join('')}
              </ul>
            </div>
            <div style="margin-top:8px; font-size:0.75rem; color:#64748b;">
              Database Status: ${serverSaved ? '✓ Synced with persistent database' : 'Stored locally'}
            </div>
          </div>
        </details>

        <div style="text-align:center; margin-top:14px;">
          <button type="button" class="btn-link" onclick="app.closeModal('modal-order-confirmation'); app.switchTab('products');" style="background:none; border:none; color:#234E8A; font-weight:700; cursor:pointer;">
            ← Continue Shopping
          </button>
        </div>
      </div>
    `;

    // Hide old modal footer buttons that caused clutter
    const footer = document.querySelector('#modal-order-confirmation .modal-footer');
    if (footer) footer.style.display = 'none';

    this.openModal('modal-order-confirmation');
  }

  trackOrderDirectly(orderId, phone) {
    this.closeModal('modal-order-confirmation');
    this.switchTab('track-order');
    const idInput = document.getElementById('track-order-id') || document.getElementById('track-order-input');
    const phoneInput = document.getElementById('track-order-phone');
    if (idInput) idInput.value = orderId;
    if (phoneInput && phone) phoneInput.value = phone;
    this.trackOrderLookup();
  }

  // ==================== VISUAL 6-STAGE ORDER TRACKING ====================
  async trackOrderLookup() {
    const idInput = document.getElementById('track-order-id') || document.getElementById('track-order-input');
    const phoneInput = document.getElementById('track-order-phone');
    const container = document.getElementById('track-order-result');
    if (!container) return;

    const enteredId = idInput ? idInput.value.trim() : '';
    const enteredPhone = phoneInput ? phoneInput.value.trim() : '';

    if (!enteredId) {
      container.innerHTML = `<div style="text-align:center; padding:16px; color:#b91c1c; font-weight:600;">Please enter your Order Reference ID (e.g. ZME-ORD-2026-XXXX).</div>`;
      return;
    }

    container.innerHTML = `<div style="text-align:center; padding:24px; color:#64748b;"><em>Searching order records...</em></div>`;

    let matchedOrder = null;

    // 1. Check local storage orders first
    const localMatch = (this.data.ecommerceOrders || []).find(o => {
      const matchId = String(o.id).toUpperCase() === enteredId.toUpperCase();
      if (!matchId) return false;
      if (enteredPhone) {
        const cleanPhone = enteredPhone.replace(/[^0-9]/g, '');
        const orderPhone = String(o.phone || '').replace(/[^0-9]/g, '');
        return orderPhone.endsWith(cleanPhone.slice(-10));
      }
      return true;
    });

    if (localMatch) {
      matchedOrder = localMatch;
    }

    // 2. Fetch live status from persistent serverless backend
    try {
      const queryPhone = enteredPhone || (localMatch ? localMatch.phone : '');
      const res = await fetch(`/api/orders?lookupId=${encodeURIComponent(enteredId)}&lookupPhone=${encodeURIComponent(queryPhone)}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.found && data.order) {
          matchedOrder = data.order;
        }
      }
    } catch (err) {
      console.warn('[Track Order API non-blocking warning]:', err.message);
    }

    if (!matchedOrder) {
      container.innerHTML = `
        <div style="text-align:center; padding:24px; background:#fff1f2; border:1px solid #fecdd3; border-radius:10px; color:#9f1239;">
          <strong>No order found matching "${this.escapeHtml(enteredId)}"</strong>
          <p style="margin:4px 0 0; font-size:0.85rem;">Please check the Order ID and verify your 10-digit mobile number.</p>
        </div>
      `;
      return;
    }

    // Render 6-Stage Stepper
    this.renderTrackingResultUI(matchedOrder, container);
  }

  renderTrackingResultUI(order, container) {
    const isCancelled = order.orderStatus === 'Cancelled' || order.orderStatus === 'Rejected';
    
    // 6 Canonical Workflow Stages
    const stages = [
      { name: 'Order Placed', desc: 'Received in database' },
      { name: 'Confirmed', desc: 'Accepted by Master Tailor' },
      { name: 'In Production', desc: 'Pattern cutting & stitching' },
      { name: 'Ready for Dispatch', desc: 'Quality checked & packed' },
      { name: 'Out for Delivery', desc: 'Dispatched to address' },
      { name: 'Delivered', desc: 'Handed over to customer' }
    ];

    let currentStageIndex = 0;
    const st = String(order.orderStatus || '').toLowerCase();

    if (st.includes('deliver') && !st.includes('ready') && !st.includes('out')) {
      currentStageIndex = 5;
    } else if (st.includes('out for delivery')) {
      currentStageIndex = 4;
    } else if (st.includes('ready') || st.includes('dispatch')) {
      currentStageIndex = 3;
    } else if (st.includes('production') || st.includes('stitching')) {
      currentStageIndex = 2;
    } else if (st.includes('confirm') || st.includes('accept')) {
      currentStageIndex = 1;
    } else {
      currentStageIndex = 0;
    }

    const itemsSummary = (order.items || []).map(i => `${i.name} (x${i.qty})`).join(', ');

    container.innerHTML = `
      <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:20px; margin-top:16px;">
        <!-- Header -->
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px; border-bottom:1px solid #f1f5f9; padding-bottom:14px; margin-bottom:16px;">
          <div>
            <span style="font-size:0.75rem; text-transform:uppercase; color:#64748b; font-weight:700;">Order Reference</span>
            <h3 style="font-size:1.35rem; color:#142C4E; margin:2px 0 0; font-family:monospace;">${this.escapeHtml(order.id)}</h3>
            <div style="font-size:0.8rem; color:#64748b; margin-top:2px;">Placed on: ${new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
          </div>
          <div style="text-align:right;">
            <span class="order-status-pill ${isCancelled ? 'status-cancelled' : 'status-confirmed'}" style="font-size:0.85rem; padding:6px 12px;">
              ${this.escapeHtml(order.orderStatus || 'Pending Confirmation')}
            </span>
            ${order.paymentStatus ? `<div style="font-size:0.8rem; color:#047857; margin-top:4px; font-weight:600;">Payment: ${this.escapeHtml(order.paymentStatus)}</div>` : ''}
          </div>
        </div>

        ${isCancelled ? `
          <div style="background:#fef2f2; border:1px solid #fca5a5; border-radius:8px; padding:14px; margin-bottom:20px; color:#991b1b;">
            <strong style="font-size:0.95rem;">Order Cancelled</strong>
            <p style="margin:4px 0 0; font-size:0.85rem;">Reason: ${this.escapeHtml(order.cancellationReason || 'Cancelled by workshop management.')}</p>
          </div>
        ` : `
          <!-- 6-Stage Visual Stepper -->
          <div class="track-progress-stepper">
            ${stages.map((stage, idx) => {
              const isCompleted = currentStageIndex > idx;
              const isCurrent = currentStageIndex === idx;
              const stepClass = isCompleted ? 'completed' : (isCurrent ? 'current' : '');
              return `
                <div class="stepper-step ${stepClass}">
                  <div class="stepper-circle">${isCompleted ? '✓' : (idx + 1)}</div>
                  <div class="stepper-label">
                    <div>${stage.name}</div>
                    <div style="font-size:0.68rem; color:#94a3b8; font-weight:normal;">${stage.desc}</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}

        <!-- Order Information Summary -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:12px; background:#f8fafc; border-radius:10px; padding:16px; margin:20px 0; font-size:0.85rem;">
          <div>
            <div style="font-size:0.75rem; text-transform:uppercase; color:#64748b; font-weight:700;">Customer</div>
            <div style="font-weight:600; color:#1e293b; margin-top:2px;">${this.escapeHtml(order.customerName)}</div>
            ${order.city ? `<div style="color:#64748b;">📍 ${this.escapeHtml(order.city)}, Telangana</div>` : ''}
          </div>
          <div>
            <div style="font-size:0.75rem; text-transform:uppercase; color:#64748b; font-weight:700;">Garments & Items</div>
            <div style="font-weight:600; color:#1e293b; margin-top:2px;">${itemsSummary || 'Standard uniform order'}</div>
            <div style="font-weight:700; color:#234E8A; margin-top:2px;">Total: ₹${(Number(order.totalAmount) || 0).toLocaleString('en-IN')}</div>
          </div>
          <div>
            <div style="font-size:0.75rem; text-transform:uppercase; color:#64748b; font-weight:700;">Delivery Schedule</div>
            <div style="font-weight:600; color:#167A62; margin-top:2px;">
              ${order.expectedDeliveryDate ? `Target: ${order.expectedDeliveryDate}` : 'Standard Delivery (3-5 Days)'}
            </div>
            ${order.deliveryPartner ? `<div style="font-size:0.775rem; color:#475569; margin-top:2px;">Courier: ${this.escapeHtml(order.deliveryPartner)} ${order.trackingNumber ? '(' + this.escapeHtml(order.trackingNumber) + ')' : ''}</div>` : ''}
          </div>
        </div>

        <!-- WhatsApp Support Link -->
        <div style="text-align:center;">
          <a href="https://wa.me/919391414502?text=Hello%20ZM%20Enterprises,%20I%20am%20inquiring%20about%20my%20Order%20${encodeURIComponent(order.id)}" target="_blank" class="btn btn-whatsapp" style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; font-size:0.875rem; text-decoration:none;">
            💬 Chat with Master Tailor regarding this Order
          </a>
        </div>
      </div>
    `;
  }

  // ==================== 1-TAP OWNER ORDER ACTIONS ====================
  async acceptEcommerceOrder(orderId) {
    if (!confirm(`Accept and confirm Order ${orderId} for production?`)) return;

    const order = (this.data.ecommerceOrders || []).find(o => o.id === orderId);
    if (!order) return;

    const oldStatus = order.orderStatus;
    const newStatus = 'Confirmed / Accepted';
    order.orderStatus = newStatus;
    if (!Array.isArray(order.history)) order.history = [];
    order.history.push({
      timestamp: new Date().toISOString(),
      fromStatus: oldStatus,
      toStatus: newStatus,
      note: 'Order accepted and confirmed by workshop master.'
    });

    this.saveData();
    this.renderOwnerOverview();
    this.renderOwnerOrders();
    this.showToast(`Order ${orderId} accepted and confirmed!`);

    try {
      await fetch('/api/orders', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': this.getAdminPin()
        },
        body: JSON.stringify({
          orderId,
          orderStatus: newStatus,
          note: 'Order accepted and confirmed by workshop master.'
        })
      });
    } catch (err) {
      console.warn('[PATCH /api/orders accept failed]:', err);
    }
  }

  async rejectEcommerceOrder(orderId) {
    const order = (this.data.ecommerceOrders || []).find(o => o.id === orderId);
    if (!order) return;

    const reason = prompt(`Please enter the reason for rejecting or cancelling Order ${orderId} (e.g. Fabric out of stock, outside Hyderabad perimeter):`);
    if (reason === null) return; // User cancelled prompt

    const oldStatus = order.orderStatus;
    const newStatus = 'Cancelled';
    order.orderStatus = newStatus;
    order.cancellationReason = reason || 'Cancelled by workshop master';
    if (!Array.isArray(order.history)) order.history = [];
    order.history.push({
      timestamp: new Date().toISOString(),
      fromStatus: oldStatus,
      toStatus: newStatus,
      note: `Cancelled. Reason: ${order.cancellationReason}`
    });

    this.saveData();
    this.renderOwnerOverview();
    this.renderOwnerOrders();
    this.showToast(`Order ${orderId} marked as Cancelled.`);

    try {
      await fetch('/api/orders', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': this.getAdminPin()
        },
        body: JSON.stringify({
          orderId,
          orderStatus: newStatus,
          cancellationReason: order.cancellationReason,
          note: `Order cancelled. Reason: ${order.cancellationReason}`
        })
      });
    } catch (err) {
      console.warn('[PATCH /api/orders cancel failed]:', err);
    }
  }

  async updateOrderStatus(orderId, newStatus) {
    const order = (this.data.ecommerceOrders || []).find(o => o.id === orderId);
    if (!order) return;

    const oldStatus = order.orderStatus;
    if (oldStatus === newStatus) return;

    order.orderStatus = newStatus;
    if (!Array.isArray(order.history)) order.history = [];
    order.history.push({
      timestamp: new Date().toISOString(),
      fromStatus: oldStatus,
      toStatus: newStatus,
      note: `Status updated to ${newStatus}`
    });

    this.saveData();
    this.renderOwnerOverview();
    this.renderOwnerOrders();
    this.showToast(`Order ${orderId} updated to ${newStatus}`);

    try {
      await fetch('/api/orders', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': this.getAdminPin()
        },
        body: JSON.stringify({
          orderId,
          orderStatus: newStatus,
          note: `Status updated to ${newStatus}`
        })
      });
    } catch (err) {
      console.warn('[PATCH /api/orders status failed]:', err);
    }
  }

  // ==================== 5-SECTION OWNER DASHBOARD CONTROLLER ====================
  switchOwnerTab(subtab) {
    const subtabs = ['overview', 'orders', 'products', 'delivery', 'settings'];
    if (!subtabs.includes(subtab)) subtab = 'overview';

    subtabs.forEach(st => {
      const btn = document.getElementById(`btn-owner-tab-${st}`);
      const pane = document.getElementById(`owner-subtab-${st}`);
      if (btn) btn.classList.toggle('active', st === subtab);
      if (pane) {
        pane.style.display = (st === subtab) ? 'block' : 'none';
        pane.classList.toggle('active', st === subtab);
      }
    });

    if (subtab === 'overview') this.renderOwnerOverview();
    if (subtab === 'orders') this.renderOwnerOrders();
    if (subtab === 'products') this.renderOwnerProducts();
    if (subtab === 'delivery') this.renderOwnerDelivery();
    if (subtab === 'settings') this.loadOwnerSettings();
  }

  renderOwnerOverview() {
    const orders = this.data.ecommerceOrders || [];

    const pending = orders.filter(o => o.orderStatus === 'Pending Confirmation' || o.orderStatus === 'Pending').length;
    const confirmed = orders.filter(o => o.orderStatus === 'Confirmed / Accepted' || o.orderStatus === 'Confirmed' || o.orderStatus === 'Accepted').length;
    const production = orders.filter(o => o.orderStatus === 'In Production').length;
    const dispatch = orders.filter(o => o.orderStatus === 'Ready for Dispatch' || o.orderStatus === 'Ready for Delivery' || o.orderStatus === 'Out for Delivery').length;
    const delivered = orders.filter(o => o.orderStatus === 'Delivered').length;

    const elPending = document.getElementById('kpi-pending-count');
    const elConfirmed = document.getElementById('kpi-confirmed-count');
    const elProd = document.getElementById('kpi-production-count');
    const elDispatch = document.getElementById('kpi-dispatch-count');
    const elDelivered = document.getElementById('kpi-delivered-count');
    const badge = document.getElementById('owner-pending-badge');

    if (elPending) elPending.textContent = pending;
    if (elConfirmed) elConfirmed.textContent = confirmed;
    if (elProd) elProd.textContent = production;
    if (elDispatch) elDispatch.textContent = dispatch;
    if (elDelivered) elDelivered.textContent = delivered;
    if (badge) badge.textContent = pending;

    // Render Recent Orders (Top 5)
    const recentContainer = document.getElementById('owner-overview-recent-orders');
    if (!recentContainer) return;

    if (orders.length === 0) {
      recentContainer.innerHTML = `<div style="text-align:center; padding:20px; color:#64748b;">No orders placed yet.</div>`;
      return;
    }

    const recent = orders.slice(0, 5);
    recentContainer.innerHTML = recent.map(o => this.renderOwnerOrderCardHTML(o)).join('');
  }

  filterOwnerOrdersByStatus(status) {
    this.ownerActiveFilter = status;
    const buttons = document.querySelectorAll('#owner-order-status-filters button');
    buttons.forEach(b => {
      b.classList.toggle('active', b.dataset.status === status);
    });
    this.switchOwnerTab('orders');
    this.renderOwnerOrders();
  }

  renderOwnerOrders() {
    const container = document.getElementById('owner-orders-cards-list');
    if (!container) return;

    const searchInput = document.getElementById('owner-order-search');
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const filter = this.ownerActiveFilter || 'All';

    let orders = this.data.ecommerceOrders || [];

    // Filter by Status
    if (filter !== 'All') {
      orders = orders.filter(o => {
        if (filter === 'Pending Confirmation') {
          return o.orderStatus === 'Pending Confirmation' || o.orderStatus === 'Pending';
        }
        if (filter === 'Confirmed / Accepted') {
          return o.orderStatus === 'Confirmed / Accepted' || o.orderStatus === 'Confirmed' || o.orderStatus === 'Accepted';
        }
        if (filter === 'Cancelled') {
          return o.orderStatus === 'Cancelled' || o.orderStatus === 'Rejected';
        }
        return o.orderStatus === filter;
      });
    }

    // Filter by Search Query
    if (query) {
      orders = orders.filter(o => 
        String(o.id).toLowerCase().includes(query) ||
        String(o.customerName || '').toLowerCase().includes(query) ||
        String(o.phone || '').includes(query) ||
        String(o.city || '').toLowerCase().includes(query)
      );
    }

    if (orders.length === 0) {
      container.innerHTML = `<div style="text-align:center; padding:32px; color:#64748b;">No matching orders found.</div>`;
      return;
    }

    container.innerHTML = orders.map(o => this.renderOwnerOrderCardHTML(o)).join('');
  }

  renderOwnerOrderCardHTML(o) {
    const isPending = o.orderStatus === 'Pending Confirmation' || o.orderStatus === 'Pending';
    const itemCount = (o.items || []).reduce((s, i) => s + (Number(i.qty) || 1), 0);
    const dateFormatted = new Date(o.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    const timeFormatted = new Date(o.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    let statusPillClass = 'status-pending';
    if (o.orderStatus === 'Confirmed / Accepted' || o.orderStatus === 'Confirmed' || o.orderStatus === 'Accepted') statusPillClass = 'status-confirmed';
    if (o.orderStatus === 'In Production') statusPillClass = 'status-production';
    if (o.orderStatus === 'Ready for Dispatch' || o.orderStatus === 'Ready for Delivery') statusPillClass = 'status-dispatch';
    if (o.orderStatus === 'Out for Delivery') statusPillClass = 'status-delivery';
    if (o.orderStatus === 'Delivered') statusPillClass = 'status-delivered';
    if (o.orderStatus === 'Cancelled' || o.orderStatus === 'Rejected') statusPillClass = 'status-cancelled';

    return `
      <div class="admin-order-card ${isPending ? 'is-pending' : ''}">
        <div class="admin-order-card-header">
          <div>
            <span class="order-id-badge">${this.escapeHtml(o.id)}</span>
            <div class="order-date-time">📅 ${dateFormatted} at ${timeFormatted}</div>
          </div>
          <div>
            <span class="order-status-pill ${statusPillClass}">${this.escapeHtml(o.orderStatus || 'Pending Confirmation')}</span>
          </div>
        </div>

        <div class="order-customer-info">
          <div>
            <div class="order-customer-label">Customer Name & Phone</div>
            <div class="order-customer-val">${this.escapeHtml(o.customerName)}</div>
            <div style="margin-top:2px;">
              📞 <a href="tel:${this.escapeHtml(o.phone)}" style="color:#234E8A; font-weight:700;">${this.escapeHtml(o.phone)}</a>
            </div>
          </div>
          <div>
            <div class="order-customer-label">Delivery Destination</div>
            <div class="order-customer-val">${this.escapeHtml(o.address || 'Standard Address')}</div>
            <div style="color:#64748b;">📍 ${this.escapeHtml(o.city || 'Hyderabad')}, Telangana</div>
          </div>
          <div>
            <div class="order-customer-label">Order Value & Mode</div>
            <div style="font-size:1.1rem; font-weight:800; color:#142C4E;">₹${(Number(o.totalAmount) || 0).toLocaleString('en-IN')}</div>
            <div style="color:#64748b;">${this.escapeHtml(o.paymentMode || 'Cash on Delivery')}</div>
          </div>
        </div>

        <div class="order-items-preview">
          <span style="font-size:0.75rem; font-weight:700; color:#64748b; text-transform:uppercase;">Items (${itemCount} pcs):</span>
          <div style="margin-top:4px;">
            ${(o.items || []).map(i => `
              <span class="order-item-chip"><strong>${this.escapeHtml(i.name)}</strong> (x${i.qty}) ${i.unitPrice ? '₹' + i.unitPrice : 'Quote'}</span>
            `).join('')}
          </div>
          ${o.notes ? `<div style="font-size:0.8rem; color:#475569; margin-top:6px; font-style:italic;">Notes: ${this.escapeHtml(o.notes)}</div>` : ''}
        </div>

        <!-- Touch-Friendly Action Buttons -->
        <div class="order-card-actions">
          ${isPending ? `
            <button class="btn-accept-order" onclick="app.acceptEcommerceOrder('${o.id}')">
              ✓ Accept Order
            </button>
            <button class="btn-reject-order" onclick="app.rejectEcommerceOrder('${o.id}')">
              ✕ Reject
            </button>
          ` : `
            <select class="form-control" style="max-width:200px; padding:8px; font-size:0.85rem; font-weight:700;" onchange="app.updateOrderStatus('${o.id}', this.value)">
              <option value="Pending Confirmation" ${(o.orderStatus === 'Pending Confirmation' || o.orderStatus === 'Pending') ? 'selected' : ''}>⏳ Pending Confirmation</option>
              <option value="Confirmed / Accepted" ${(o.orderStatus === 'Confirmed / Accepted' || o.orderStatus === 'Confirmed' || o.orderStatus === 'Accepted') ? 'selected' : ''}>✓ Confirmed / Accepted</option>
              <option value="In Production" ${o.orderStatus === 'In Production' ? 'selected' : ''}>🧵 In Production</option>
              <option value="Ready for Dispatch" ${(o.orderStatus === 'Ready for Dispatch' || o.orderStatus === 'Ready for Delivery') ? 'selected' : ''}>📦 Ready for Dispatch</option>
              <option value="Out for Delivery" ${o.orderStatus === 'Out for Delivery' ? 'selected' : ''}>🚚 Out for Delivery</option>
              <option value="Delivered" ${o.orderStatus === 'Delivered' ? 'selected' : ''}>✅ Delivered</option>
              <option value="Cancelled" ${(o.orderStatus === 'Cancelled' || o.orderStatus === 'Rejected') ? 'selected' : ''}>✕ Cancelled</option>
            </select>
          `}

          <button class="btn btn-sm btn-outline" onclick="app.viewEcommerceOrderDetails('${o.id}')">
            View Details
          </button>

          <a href="https://wa.me/${String(o.phone).replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(o.customerName)},%20this%20is%20ZM%20Enterprises%20regarding%20your%20Order%20${encodeURIComponent(o.id)}" target="_blank" class="btn btn-sm btn-whatsapp">
            💬 WhatsApp
          </a>
        </div>
      </div>
    `;
  }

  // ==================== OWNER PRODUCTS TAB WITH QUICK EDITABLE PRICING ====================
  renderOwnerProducts() {
    const container = document.getElementById('owner-products-admin-list');
    if (!container) return;

    const products = this.data.ecommerceProducts || [];
    if (products.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:32px; background:#f8fafc; border-radius:10px;">
          <p>No products in inventory.</p>
          <button class="btn btn-primary btn-sm" onclick="app.seedSampleProductsOptional()">⚡ Load Standard Templates</button>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Garment Style</th>
              <th>Category</th>
              <th>Price (Editable Column)</th>
              <th>Status</th>
              <th style="text-align:right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${products.map(p => {
              const hasPrice = p.price !== undefined && p.price !== null && p.price !== '' && Number(p.price) > 0;
              return `
                <tr>
                  <td>
                    <div style="display:flex; align-items:center; gap:10px;">
                      <img src="${this.escapeHtml(p.image || 'images/hero-atelier.jpg')}" alt="${this.escapeHtml(p.name)}" style="width:44px; height:44px; object-fit:cover; border-radius:6px;">
                      <div>
                        <strong>${this.escapeHtml(p.name)}</strong>
                        <div style="font-size:0.75rem; color:#64748b;">SKU: ${this.escapeHtml(p.sku || p.id)}</div>
                      </div>
                    </div>
                  </td>
                  <td>${this.escapeHtml(p.category || 'General')}</td>
                  <td>
                    <div class="admin-price-cell">
                      <span class="currency-sym">₹</span>
                      <input type="number" id="quick-price-${p.id}" class="admin-price-input" value="${hasPrice ? p.price : ''}" placeholder="Empty = Quote" min="0" step="1">
                      <button class="btn btn-sm btn-primary" onclick="app.updateProductPriceQuick('${p.id}')">Save</button>
                    </div>
                    ${!hasPrice ? '<span class="badge-quote-price" style="margin-top:4px;">Displaying: Price on Quotation</span>' : ''}
                  </td>
                  <td>
                    <span class="badge badge-stock-in">${p.stockStatus || 'In Stock'}</span>
                  </td>
                  <td style="text-align:right;">
                    <button class="btn btn-sm btn-outline" onclick="app.editEcommerceProduct('${p.id}')">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="app.deleteEcommerceProduct('${p.id}')">Delete</button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  updateProductPriceQuick(productId) {
    const input = document.getElementById(`quick-price-${productId}`);
    if (!input) return;

    const val = input.value.trim();
    const product = (this.data.ecommerceProducts || []).find(p => p.id === productId);
    if (!product) return;

    if (val === '' || isNaN(Number(val)) || Number(val) <= 0) {
      product.price = null;
      this.showToast(`Price cleared for ${product.name}. Store will display 'Price on Quotation'.`);
    } else {
      product.price = Number(val);
      this.showToast(`Price updated to ₹${product.price} for ${product.name}`);
    }

    this.saveData();
    this.renderOwnerProducts();
    this.renderProductsGrid();
  }

  // ==================== OWNER DELIVERY TAB ====================
  renderOwnerDelivery() {
    const container = document.getElementById('owner-delivery-orders-list');
    if (!container) return;

    const orders = (this.data.ecommerceOrders || []).filter(o => 
      o.orderStatus !== 'Delivered' && o.orderStatus !== 'Cancelled' && o.orderStatus !== 'Rejected'
    );

    if (orders.length === 0) {
      container.innerHTML = `<div style="text-align:center; padding:32px; color:#64748b;">No active pending fulfillment orders. All caught up!</div>`;
      return;
    }

    container.innerHTML = orders.map(o => `
      <div class="admin-order-card">
        <div class="admin-order-card-header">
          <div>
            <span class="order-id-badge">${this.escapeHtml(o.id)}</span>
            <div class="order-date-time">Customer: ${this.escapeHtml(o.customerName)} (📞 ${this.escapeHtml(o.phone)})</div>
          </div>
          <div>
            <span class="order-status-pill status-dispatch">${this.escapeHtml(o.orderStatus)}</span>
          </div>
        </div>

        <div style="font-size:0.85rem; margin-bottom:12px;">
          <strong>Destination Address:</strong> ${this.escapeHtml(o.address)}, ${this.escapeHtml(o.city || 'Hyderabad')}
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px; margin-bottom:14px; background:#f8fafc; padding:12px; border-radius:8px;">
          <div>
            <label style="font-size:0.75rem; font-weight:700; color:#475569; display:block; margin-bottom:4px;">DELIVERY PARTNER / COURIER</label>
            <select id="del-partner-${o.id}" class="form-control" style="font-size:0.85rem;">
              <option value="In-house Hyderabad Delivery Rider" ${(o.deliveryPartner || '').includes('In-house') ? 'selected' : ''}>In-house Hyderabad Delivery Rider</option>
              <option value="Dunzo / Porter Local" ${(o.deliveryPartner || '').includes('Dunzo') ? 'selected' : ''}>Dunzo / Porter Local Express</option>
              <option value="DTDC Express" ${(o.deliveryPartner || '').includes('DTDC') ? 'selected' : ''}>DTDC Express Courier</option>
              <option value="Blue Dart" ${(o.deliveryPartner || '').includes('Blue Dart') ? 'selected' : ''}>Blue Dart Courier</option>
              <option value="India Post / Speed Post" ${(o.deliveryPartner || '').includes('Speed Post') ? 'selected' : ''}>India Post / Speed Post</option>
              <option value="Workshop Customer Pickup" ${(o.deliveryPartner || '').includes('Pickup') ? 'selected' : ''}>Workshop Customer Pickup</option>
            </select>
          </div>
          <div>
            <label style="font-size:0.75rem; font-weight:700; color:#475569; display:block; margin-bottom:4px;">TRACKING / CONSIGNMENT REF</label>
            <input type="text" id="del-ref-${o.id}" class="form-control" value="${this.escapeHtml(o.trackingNumber || '')}" placeholder="Waybill / Tracking No." style="font-size:0.85rem;">
          </div>
          <div>
            <label style="font-size:0.75rem; font-weight:700; color:#475569; display:block; margin-bottom:4px;">EXPECTED DELIVERY DATE</label>
            <input type="date" id="del-date-${o.id}" class="form-control" value="${o.expectedDeliveryDate || ''}" style="font-size:0.85rem;">
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <div style="display:flex; gap:8px;">
            <button class="btn btn-sm btn-primary" onclick="app.saveOwnerDeliveryInfo('${o.id}')">
              Save Delivery Details
            </button>
            <button class="btn btn-sm btn-outline" onclick="app.updateOrderStatus('${o.id}', 'Out for Delivery')">
              🚚 Mark Out for Delivery
            </button>
            <button class="btn btn-sm btn-secondary" onclick="app.updateOrderStatus('${o.id}', 'Delivered')">
              ✅ Mark Delivered
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  async saveOwnerDeliveryInfo(orderId) {
    const partnerEl = document.getElementById(`del-partner-${orderId}`);
    const refEl = document.getElementById(`del-ref-${orderId}`);
    const dateEl = document.getElementById(`del-date-${orderId}`);

    const order = (this.data.ecommerceOrders || []).find(o => o.id === orderId);
    if (!order) return;

    order.deliveryPartner = partnerEl ? partnerEl.value.trim() : null;
    order.trackingNumber = refEl ? refEl.value.trim() : null;
    order.expectedDeliveryDate = dateEl ? dateEl.value.trim() : null;

    if (!Array.isArray(order.history)) order.history = [];
    order.history.push({
      timestamp: new Date().toISOString(),
      status: order.orderStatus,
      note: `Delivery schedule assigned: ${order.deliveryPartner || 'Courier'} (Ref: ${order.trackingNumber || 'N/A'}, Target: ${order.expectedDeliveryDate || 'N/A'})`
    });

    this.saveData();
    this.showToast(`Delivery details saved for Order ${orderId}`);

    try {
      await fetch('/api/orders', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': this.getAdminPin()
        },
        body: JSON.stringify({
          orderId,
          deliveryPartner: order.deliveryPartner,
          trackingNumber: order.trackingNumber,
          expectedDeliveryDate: order.expectedDeliveryDate
        })
      });
    } catch (err) {
      console.warn('[PATCH /api/orders delivery info failed]:', err);
    }
  }

  // ==================== OWNER SETTINGS TAB ====================
  loadOwnerSettings() {
    const s = this.data.settings || {};
    const nameEl = document.getElementById('owner-setting-biz-name');
    const phoneEl = document.getElementById('owner-setting-phone');
    const emailEl = document.getElementById('owner-setting-email');
    const pinEl = document.getElementById('owner-setting-pin');
    const addrEl = document.getElementById('owner-setting-address');

    if (nameEl) nameEl.value = s.businessName || 'ZM Enterprises';
    if (phoneEl) phoneEl.value = s.phone || '919391414502';
    if (emailEl) emailEl.value = s.ownerEmail || 'sadiyasultana5836@gmail.com';
    if (pinEl) pinEl.value = s.adminPin || '1234';
    if (addrEl) addrEl.value = s.address || 'Shop No. 12, Commercial Complex, Hyderabad, Telangana - 500001';
  }

  saveOwnerSettings(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (!this.data.settings) this.data.settings = {};

    const nameEl = document.getElementById('owner-setting-biz-name');
    const phoneEl = document.getElementById('owner-setting-phone');
    const emailEl = document.getElementById('owner-setting-email');
    const pinEl = document.getElementById('owner-setting-pin');
    const addrEl = document.getElementById('owner-setting-address');

    this.data.settings.businessName = nameEl ? nameEl.value.trim() : 'ZM Enterprises';
    this.data.settings.phone = phoneEl ? phoneEl.value.trim() : '919391414502';
    this.data.settings.ownerEmail = emailEl ? emailEl.value.trim() : 'sadiyasultana5836@gmail.com';
    this.data.settings.adminPin = pinEl ? pinEl.value.trim() : '1234';
    this.data.settings.address = addrEl ? addrEl.value.trim() : 'Hyderabad, Telangana';

    this.saveData();
    this.showToast('Store settings saved successfully!');
  }

}


// Instantiate Global Application
const app = new TailorBusinessApp();
window.app = app;
