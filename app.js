/**
 * ZM ENTERPRISES - TAILORING & GARMENT SOLUTIONS
 * Complete Application Logic (Vanilla JavaScript)
 */

const STORAGE_KEY = 'ZM_TAILOR_APP_DATA_V1';

// Initial Demo Data
const DEFAULT_DATA = {
  settings: {
    businessName: "ZM Enterprises",
    tagline: "Quality Tailoring & Garment Solutions | Custom Stitching, Alterations & Uniforms",
    phone: "+91 98765 43210",
    email: "contact@zmenterprises.com",
    address: "Shop No. 12, Fashion Plaza, Main Market",
    terms: "Fitting alterations accommodated within 7 days of delivery. Perfect fitting guaranteed."
  },
  customers: [
    {
      id: "CUST-101",
      name: "Tariq Ahmed",
      phone: "+91 98450 12345",
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
      phone: "+91 97123 55678",
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
      phone: "+91 98220 99887",
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
      phone: "+91 99881 22334",
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
      category: "Custom Stitching",
      title: "Three-Piece Bespoke Suit (Navy Blue Wool)",
      fabric: "Client provided Italian Super 120s Wool",
      fabricSource: "Client Provided",
      trialDate: "2026-10-12",
      deliveryDate: "2026-10-16",
      status: "Cutting",
      priority: "Express",
      total: 8500,
      advance: 5000,
      balance: 3500,
      paymentMethod: "UPI / Online",
      notes: "Satin lapel trim, personalized monogram 'TA' inside coat.",
      createdAt: "2026-10-05"
    },
    {
      id: "ZM-1002",
      customerId: "CUST-102",
      customerName: "Fatima Sana",
      category: "Ethnic Wear",
      title: "Bridal Heavy Anarkali Suit with Dupatta Bordering",
      fabric: "Pure Georgette with Zari work (ZM Sourced)",
      fabricSource: "ZM Sourced",
      trialDate: "2026-10-10",
      deliveryDate: "2026-10-14",
      status: "Stitching",
      priority: "Standard",
      total: 6200,
      advance: 3000,
      balance: 3200,
      paymentMethod: "Cash",
      notes: "Full flare kali design; handcrafted tassels for back dori.",
      createdAt: "2026-10-06"
    },
    {
      id: "ZM-1003",
      customerId: "CUST-103",
      customerName: "Green Valley Public School",
      category: "Uniform",
      title: "Batch Order: 25 Pairs School Uniform Shirts & Trousers",
      fabric: "Dacron Poly-Cotton Blend (Grey & White)",
      fabricSource: "ZM Sourced",
      trialDate: "2026-10-15",
      deliveryDate: "2026-10-22",
      status: "Received",
      priority: "Standard",
      total: 21500,
      advance: 10000,
      balance: 11500,
      paymentMethod: "Bank Transfer",
      notes: "School embroidered crest badges will be supplied by school office.",
      createdAt: "2026-10-07"
    },
    {
      id: "ZM-1004",
      customerId: "CUST-104",
      customerName: "Priya Verma",
      category: "Alteration",
      title: "Designer Kurti Alteration & Fitting + Palazzo Hemming",
      fabric: "Silk Crepe",
      fabricSource: "Client Provided",
      trialDate: "2026-10-09",
      deliveryDate: "2026-10-10",
      status: "Trial Ready",
      priority: "Standard",
      total: 650,
      advance: 650,
      balance: 0,
      paymentMethod: "UPI / Online",
      notes: "Waist take-in 1.5 inches; palazzo shorten 1 inch.",
      createdAt: "2026-10-07"
    }
  ]
};

class TailorApp {
  constructor() {
    this.data = this.loadData();
    this.currentTab = 'dashboard';
    this.init();
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
    // Default clone
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }

  saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error("Failed to save to local storage", e);
      this.showToast("Warning: Storage limit exceeded or unavailable");
    }
  }

  init() {
    this.bindEvents();
    this.renderSettings();
    this.populateCustomerDropdowns();
    this.renderDashboard();
    this.renderOrdersTable();
    this.renderCustomersGrid();
    this.renderInvoicesTable();
  }

  bindEvents() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = btn.dataset.tab;
        this.switchTab(tab);
      });
    });

    // Quick Actions
    const btnQuickOrder = document.getElementById('btn-quick-order');
    if (btnQuickOrder) btnQuickOrder.addEventListener('click', () => this.openNewOrderModal());

    const btnQuickCustomer = document.getElementById('btn-quick-customer');
    if (btnQuickCustomer) btnQuickCustomer.addEventListener('click', () => this.openCustomerModal());
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

    // Title Updates
    const titleMap = {
      dashboard: "Dashboard Overview",
      orders: "Orders & Stitching Status",
      customers: "Customer Directory & Measurements",
      invoices: "Invoices & Receipts",
      settings: "Store Settings & Data Backup"
    };

    const subtitleMap = {
      dashboard: "Welcome to ZM Enterprises – Quality Tailoring & Garment Solutions",
      orders: "Manage custom stitching, alterations, ethnic wear & uniform production",
      customers: "Detailed body measurements records for men, women, and children",
      invoices: "Generate printable customer receipts with ZM Enterprises branding",
      settings: "Configure store contact details, invoice headers, and export backups"
    };

    document.getElementById('page-title').textContent = titleMap[tabName] || "ZM Enterprises";
    document.getElementById('page-subtitle').textContent = subtitleMap[tabName] || "";

    if (tabName === 'dashboard') this.renderDashboard();
    if (tabName === 'orders') this.renderOrdersTable();
    if (tabName === 'customers') this.renderCustomersGrid();
    if (tabName === 'invoices') this.renderInvoicesTable();
  }

  showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // ==================== DASHBOARD ====================
  renderDashboard() {
    const orders = this.data.orders;
    const activeOrders = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Completed').length;
    const trialReady = orders.filter(o => o.status === 'Trial Ready').length;
    const pendingBalance = orders.reduce((sum, o) => sum + (Number(o.balance) || 0), 0);

    // Deliveries in next 7 days
    const now = new Date();
    const next7Days = new Date();
    next7Days.setDate(now.getDate() + 7);

    const dueDeliveries = orders.filter(o => {
      if (!o.deliveryDate || o.status === 'Delivered') return false;
      const d = new Date(o.deliveryDate);
      return d >= now && d <= next7Days;
    }).length;

    document.getElementById('stat-active-orders').textContent = activeOrders;
    document.getElementById('stat-pending-trials').textContent = trialReady;
    document.getElementById('stat-deliveries-due').textContent = dueDeliveries;
    document.getElementById('stat-pending-balance').textContent = `₹${pendingBalance.toLocaleString('en-IN')}`;

    // Recent orders table
    const tbody = document.getElementById('dashboard-orders-tbody');
    tbody.innerHTML = '';

    const recent = [...orders].slice(-5).reverse();
    if (recent.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 24px; color:#94a3b8;">No orders created yet. Click "+ New Order" to start!</td></tr>`;
      return;
    }

    recent.forEach(order => {
      const tr = document.createElement('tr');
      const statusBadge = this.getStatusBadge(order.status);
      const paymentBadge = Number(order.balance) <= 0 
        ? `<span class="badge badge-paid">Fully Paid</span>` 
        : `<span class="badge badge-partial">₹${order.balance} Due</span>`;

      tr.innerHTML = `
        <td><strong>#${order.id}</strong></td>
        <td>
          <div style="font-weight:600;">${order.customerName}</div>
          <small style="color:#64748b;">${order.category}</small>
        </td>
        <td>${order.title}</td>
        <td>${order.trialDate || '—'}</td>
        <td><strong>${order.deliveryDate || '—'}</strong></td>
        <td>${statusBadge}</td>
        <td>${paymentBadge}</td>
        <td>
          <button class="btn btn-sm btn-outline" onclick="app.viewInvoice('${order.id}')">Receipt</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // ==================== ORDERS ====================
  renderOrdersTable(filteredList = null) {
    const list = filteredList !== null ? filteredList : this.data.orders;
    const tbody = document.getElementById('orders-tbody');
    tbody.innerHTML = '';

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:32px; color:#94a3b8;">No matching orders found.</td></tr>`;
      return;
    }

    list.slice().reverse().forEach(order => {
      const tr = document.createElement('tr');
      const statusBadge = this.getStatusBadge(order.status);
      const isPaid = Number(order.balance) <= 0;
      const billingBadge = isPaid
        ? `<span class="badge badge-paid">Paid (₹${order.total})</span>`
        : `<span class="badge badge-partial">Due: ₹${order.balance}</span>`;

      tr.innerHTML = `
        <td><strong>#${order.id}</strong></td>
        <td>
          <div style="font-weight:600;">${order.customerName}</div>
          <small style="color:#64748b;">${order.fabricSource}</small>
        </td>
        <td><span class="badge badge-cat">${order.category}</span></td>
        <td>
          <div style="max-width:240px; font-weight:500;">${order.title}</div>
          <small style="color:#64748b;">${order.fabric || 'Fabric: As provided'}</small>
        </td>
        <td>${order.trialDate || '—'}</td>
        <td><strong>${order.deliveryDate}</strong></td>
        <td>
          <select class="form-select" style="padding:4px 8px; font-size:0.775rem;" onchange="app.quickUpdateStatus('${order.id}', this.value)">
            ${['Received', 'Cutting', 'Stitching', 'Trial Ready', 'Completed', 'Delivered'].map(s => `
              <option value="${s}" ${s === order.status ? 'selected' : ''}>${s}</option>
            `).join('')}
          </select>
        </td>
        <td>
          <div>Total: ₹${order.total}</div>
          ${billingBadge}
        </td>
        <td>
          <div style="display:flex; gap:6px;">
            <button class="btn btn-sm btn-outline" title="Print Invoice" onclick="app.viewInvoice('${order.id}')">
              Receipt
            </button>
            <button class="btn btn-sm btn-outline" title="Edit Order" onclick="app.editOrder('${order.id}')">
              Edit
            </button>
            <button class="btn btn-sm btn-danger-outline" title="Delete Order" onclick="app.deleteOrder('${order.id}')">
              &times;
            </button>
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

    const filtered = this.data.orders.filter(order => {
      const matchQuery = !query || 
        order.id.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query) ||
        order.title.toLowerCase().includes(query);

      const matchStatus = statusFilter === 'all' || order.status === statusFilter;
      const matchCat = catFilter === 'all' || order.category === catFilter;

      return matchQuery && matchStatus && matchCat;
    });

    this.renderOrdersTable(filtered);
  }

  quickUpdateStatus(orderId, newStatus) {
    const order = this.data.orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      this.saveData();
      this.renderDashboard();
      this.showToast(`Order #${orderId} status set to "${newStatus}"`);
    }
  }

  openNewOrderModal() {
    document.getElementById('modal-order-title').textContent = 'Create New Tailoring Order';
    document.getElementById('order-form').reset();
    document.getElementById('order-id').value = '';
    
    // Set default dates
    const today = new Date().toISOString().split('T')[0];
    const delivery = new Date();
    delivery.setDate(delivery.getDate() + 7);
    const deliveryStr = delivery.toISOString().split('T')[0];

    document.getElementById('order-delivery-date').value = deliveryStr;
    document.getElementById('order-balance').value = '0';
    this.populateCustomerDropdowns();
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
    document.getElementById('order-payment-method').value = order.paymentMethod || 'Cash';
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
      alert("Please select a valid customer.");
      return;
    }

    const total = parseFloat(document.getElementById('order-total').value) || 0;
    const advance = parseFloat(document.getElementById('order-advance').value) || 0;
    const balance = Math.max(0, total - advance);

    const orderData = {
      id: idInput || `ZM-${Math.floor(1000 + Math.random() * 9000)}`,
      customerId: custId,
      customerName: customer.name,
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
      createdAt: idInput ? (this.data.orders.find(o => o.id === idInput)?.createdAt || new Date().toISOString().split('T')[0]) : new Date().toISOString().split('T')[0]
    };

    if (idInput) {
      const index = this.data.orders.findIndex(o => o.id === idInput);
      if (index !== -1) {
        this.data.orders[index] = orderData;
        this.showToast(`Order #${orderData.id} updated successfully!`);
      }
    } else {
      this.data.orders.push(orderData);
      this.showToast(`Order #${orderData.id} created successfully!`);
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

  // ==================== CUSTOMERS & MEASUREMENTS ====================
  populateCustomerDropdowns() {
    const select = document.getElementById('order-cust-id');
    if (!select) return;

    select.innerHTML = '';
    if (this.data.customers.length === 0) {
      select.innerHTML = '<option value="">No customers available - Please add one first</option>';
      return;
    }

    this.data.customers.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = `${c.name} (${c.phone}) - ${c.gender}`;
      select.appendChild(opt);
    });
  }

  onOrderCustomerSelected() {
    // Optional hook if specific defaults are needed
  }

  renderCustomersGrid(filteredList = null) {
    const list = filteredList !== null ? filteredList : this.data.customers;
    const grid = document.getElementById('customers-grid');
    grid.innerHTML = '';

    if (list.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:40px; color:#94a3b8;">No customer profiles found. Click "Add Customer & Measurements" to create one.</div>`;
      return;
    }

    list.slice().reverse().forEach(cust => {
      const card = document.createElement('div');
      card.className = 'customer-card';

      const initials = cust.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
      const m = cust.measurements || {};

      // Count active orders for this customer
      const custOrders = this.data.orders.filter(o => o.customerId === cust.id);

      card.innerHTML = `
        <div class="cust-card-header">
          <div class="cust-avatar">${initials}</div>
          <div class="cust-header-info">
            <h4>${cust.name}</h4>
            <span class="cust-phone-badge">${cust.phone} • <strong style="color:var(--primary);">${cust.gender}</strong></span>
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
          <button class="btn btn-sm btn-outline" style="flex:1;" onclick="app.viewCustomerMeasurements('${cust.id}')">
            View Measures
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

  filterCustomers() {
    const query = (document.getElementById('customer-search').value || '').toLowerCase().trim();
    const genderFilter = document.getElementById('customer-gender-filter').value;

    const filtered = this.data.customers.filter(cust => {
      const matchQuery = !query ||
        cust.name.toLowerCase().includes(query) ||
        cust.phone.toLowerCase().includes(query) ||
        (cust.email && cust.email.toLowerCase().includes(query));

      const matchGender = genderFilter === 'all' || cust.gender === genderFilter;

      return matchQuery && matchGender;
    });

    this.renderCustomersGrid(filtered);
  }

  openCustomerModal() {
    document.getElementById('modal-customer-title').textContent = 'Add Customer & Measurements';
    document.getElementById('customer-form').reset();
    document.getElementById('cust-id').value = '';
    this.openModal('modal-customer');
  }

  editCustomer(custId) {
    const c = this.data.customers.find(item => item.id === custId);
    if (!c) return;

    document.getElementById('modal-customer-title').textContent = `Edit Profile: ${c.name}`;
    document.getElementById('cust-id').value = c.id;
    document.getElementById('cust-name').value = c.name;
    document.getElementById('cust-phone').value = c.phone;
    document.getElementById('cust-gender').value = c.gender;
    document.getElementById('cust-email').value = c.email || '';
    document.getElementById('cust-address').value = c.address || '';
    document.getElementById('cust-notes').value = c.notes || '';

    const m = c.measurements || {};
    document.getElementById('m-length').value = m.length || '';
    document.getElementById('m-chest').value = m.chest || '';
    document.getElementById('m-waist').value = m.waist || '';
    document.getElementById('m-shoulder').value = m.shoulder || '';
    document.getElementById('m-sleeve-length').value = m.sleeveLength || '';
    document.getElementById('m-armhole').value = m.armhole || '';
    document.getElementById('m-neck').value = m.neck || '';
    document.getElementById('m-front-neck').value = m.frontNeck || '';
    document.getElementById('m-back-neck').value = m.backNeck || '';

    document.getElementById('m-pant-length').value = m.pantLength || '';
    document.getElementById('m-hip').value = m.hip || '';
    document.getElementById('m-pant-waist').value = m.pantWaist || '';
    document.getElementById('m-thigh').value = m.thigh || '';
    document.getElementById('m-knee').value = m.knee || '';
    document.getElementById('m-bottom').value = m.bottom || '';
    document.getElementById('m-inseam').value = m.inseam || '';

    this.openModal('modal-customer');
  }

  saveCustomer(e) {
    e.preventDefault();
    const idInput = document.getElementById('cust-id').value;

    const measurements = {
      length: document.getElementById('m-length').value,
      chest: document.getElementById('m-chest').value,
      waist: document.getElementById('m-waist').value,
      shoulder: document.getElementById('m-shoulder').value,
      sleeveLength: document.getElementById('m-sleeve-length').value,
      armhole: document.getElementById('m-armhole').value,
      neck: document.getElementById('m-neck').value,
      frontNeck: document.getElementById('m-front-neck').value,
      backNeck: document.getElementById('m-back-neck').value,
      pantLength: document.getElementById('m-pant-length').value,
      hip: document.getElementById('m-hip').value,
      pantWaist: document.getElementById('m-pant-waist').value,
      thigh: document.getElementById('m-thigh').value,
      knee: document.getElementById('m-knee').value,
      bottom: document.getElementById('m-bottom').value,
      inseam: document.getElementById('m-inseam').value
    };

    const customerObj = {
      id: idInput || `CUST-${Math.floor(100 + Math.random() * 900)}`,
      name: document.getElementById('cust-name').value,
      phone: document.getElementById('cust-phone').value,
      gender: document.getElementById('cust-gender').value,
      email: document.getElementById('cust-email').value,
      address: document.getElementById('cust-address').value,
      notes: document.getElementById('cust-notes').value,
      measurements: measurements,
      createdAt: idInput ? (this.data.customers.find(c => c.id === idInput)?.createdAt || new Date().toISOString().split('T')[0]) : new Date().toISOString().split('T')[0]
    };

    if (idInput) {
      const idx = this.data.customers.findIndex(c => c.id === idInput);
      if (idx !== -1) {
        this.data.customers[idx] = customerObj;
        this.showToast(`Customer "${customerObj.name}" updated!`);
      }
    } else {
      this.data.customers.push(customerObj);
      this.showToast(`Customer "${customerObj.name}" added successfully!`);
    }

    this.saveData();
    this.closeModal('modal-customer');
    this.populateCustomerDropdowns();
    this.renderCustomersGrid();
  }

  viewCustomerMeasurements(custId) {
    const cust = this.data.customers.find(c => c.id === custId);
    if (!cust) return;

    document.getElementById('view-customer-name').textContent = `${cust.name} – Tailoring Measurement Sheet`;
    const body = document.getElementById('view-customer-body');
    const m = cust.measurements || {};

    const orders = this.data.orders.filter(o => o.customerId === cust.id);

    body.innerHTML = `
      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:16px; margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:12px;">
          <div>
            <strong style="font-size:1.1rem; color:var(--dark);">${cust.name}</strong> (${cust.gender})
            <div style="font-size:0.875rem; color:#64748b;">Phone: ${cust.phone} | ${cust.email || 'No email'}</div>
            <div style="font-size:0.875rem; color:#64748b;">Address: ${cust.address || 'N/A'}</div>
          </div>
          <div style="text-align:right;">
            <div class="brand-badge" style="display:inline-flex; width:36px; height:36px; font-size:1rem;">ZM</div>
            <div style="font-size:0.75rem; font-weight:700; color:var(--primary); margin-top:4px;">ZM ENTERPRISES</div>
          </div>
        </div>
      </div>

      <h4 style="color:var(--primary); font-size:0.95rem; margin-bottom:10px; text-transform:uppercase;">Upper Body Measurements (Inches)</h4>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:10px; margin-bottom:20px;">
        <div class="measure-field"><label>Top Length</label><strong>${m.length || '—'}</strong></div>
        <div class="measure-field"><label>Chest / Bust</label><strong>${m.chest || '—'}</strong></div>
        <div class="measure-field"><label>Waist (Upper)</label><strong>${m.waist || '—'}</strong></div>
        <div class="measure-field"><label>Shoulder</label><strong>${m.shoulder || '—'}</strong></div>
        <div class="measure-field"><label>Sleeve Length</label><strong>${m.sleeveLength || '—'}</strong></div>
        <div class="measure-field"><label>Armhole</label><strong>${m.armhole || '—'}</strong></div>
        <div class="measure-field"><label>Neck</label><strong>${m.neck || '—'}</strong></div>
        <div class="measure-field"><label>Front Neck Depth</label><strong>${m.frontNeck || '—'}</strong></div>
        <div class="measure-field"><label>Back Neck Depth</label><strong>${m.backNeck || '—'}</strong></div>
      </div>

      <h4 style="color:var(--primary); font-size:0.95rem; margin-bottom:10px; text-transform:uppercase;">Lower Body Measurements (Inches)</h4>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:10px; margin-bottom:20px;">
        <div class="measure-field"><label>Bottom Length</label><strong>${m.pantLength || '—'}</strong></div>
        <div class="measure-field"><label>Hip</label><strong>${m.hip || '—'}</strong></div>
        <div class="measure-field"><label>Lower Waist</label><strong>${m.pantWaist || '—'}</strong></div>
        <div class="measure-field"><label>Thigh</label><strong>${m.thigh || '—'}</strong></div>
        <div class="measure-field"><label>Knee</label><strong>${m.knee || '—'}</strong></div>
        <div class="measure-field"><label>Bottom Opening</label><strong>${m.bottom || '—'}</strong></div>
        <div class="measure-field"><label>Inseam</label><strong>${m.inseam || '—'}</strong></div>
      </div>

      <div style="background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:12px; margin-bottom:16px;">
        <strong style="font-size:0.85rem; color:#475569;">Fitting Notes & Style Instructions:</strong>
        <p style="font-size:0.9rem; margin-top:4px;">${cust.notes || 'No special notes recorded.'}</p>
      </div>

      <div style="border-top:1px solid #e2e8f0; padding-top:12px;">
        <strong style="font-size:0.85rem; color:#475569;">Associated Orders (${orders.length}):</strong>
        <ul style="font-size:0.85rem; margin-top:6px; padding-left:18px;">
          ${orders.map(o => `<li>#${o.id} - ${o.title} (${o.status}) - Delivery: ${o.deliveryDate}</li>`).join('') || '<li>No orders yet</li>'}
        </ul>
      </div>
    `;

    this.openModal('modal-view-customer');
  }

  newOrderForCustomer(custId) {
    this.openNewOrderModal();
    document.getElementById('order-cust-id').value = custId;
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
        <td><strong style="color:${isPaid ? '#047857' : '#dc2626'}">₹${order.balance.toLocaleString('en-IN')}</strong></td>
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

    const cust = this.data.customers.find(c => c.id === order.customerId) || {
      name: order.customerName,
      phone: "N/A",
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
            <h5>Production & Delivery Status</h5>
            <p><strong>Garment Category:</strong> ${order.category}</p>
            <p><strong>Production Status:</strong> ${order.status}</p>
            <p><strong>Trial Date:</strong> ${order.trialDate || 'Not specified'}</p>
            <p><strong>Fabric:</strong> ${order.fabric || 'Client Provided'} (${order.fabricSource})</p>
          </div>
        </div>

        <!-- Itemized Table -->
        <table class="inv-table">
          <thead>
            <tr>
              <th style="width:50px;">#</th>
              <th>Description / Garment Specification</th>
              <th style="width:120px;">Category</th>
              <th style="width:140px; text-align:right;">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <div style="font-weight:700;">${order.title}</div>
                <div style="font-size:0.8rem; color:#64748b; margin-top:3px;">
                  ${order.notes ? `Notes: ${order.notes}` : 'Custom tailoring and finishing according to client measurement specifications.'}
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
              <td>Advance Received:</td>
              <td style="color:#047857;">- ₹${order.advance.toLocaleString('en-IN')} (${order.paymentMethod || 'Cash'})</td>
            </tr>
            <tr class="inv-total-row">
              <td>Balance Due:</td>
              <td>₹${order.balance.toLocaleString('en-IN')}</td>
            </tr>
          </table>
        </div>

        <!-- Payment Status Banner -->
        <div style="padding:12px 18px; border-radius:8px; margin-bottom:20px; font-weight:700; text-align:center; ${isPaid ? 'background:#ecfdf5; color:#047857; border:1px solid #a7f3d0;' : 'background:#fffbeb; color:#b45309; border:1px solid #fde68a;'}">
          ${isPaid ? '✔ PAYMENT COMPLETE - THANK YOU FOR YOUR PATRONAGE!' : `⏳ BALANCE OF ₹${order.balance.toLocaleString('en-IN')} DUE UPON TRIAL OR DELIVERY`}
        </div>

        <!-- Terms Footer -->
        <div class="inv-footer">
          <p><strong>Terms & Conditions:</strong> ${s.terms}</p>
          <p style="margin-top:6px;">This is a computer generated invoice issued by ZM Enterprises.</p>
        </div>
      </div>
    `;

    this.openModal('modal-invoice');
  }

  // ==================== SETTINGS & BACKUP ====================
  renderSettings() {
    const s = this.data.settings;
    document.getElementById('setting-biz-name').value = s.businessName || '';
    document.getElementById('setting-biz-tagline').value = s.tagline || '';
    document.getElementById('setting-biz-phone').value = s.phone || '';
    document.getElementById('setting-biz-email').value = s.email || '';
    document.getElementById('setting-biz-address').value = s.address || '';
    document.getElementById('setting-biz-terms').value = s.terms || '';
  }

  saveSettings(e) {
    e.preventDefault();
    this.data.settings = {
      businessName: document.getElementById('setting-biz-name').value,
      tagline: document.getElementById('setting-biz-tagline').value,
      phone: document.getElementById('setting-biz-phone').value,
      email: document.getElementById('setting-biz-email').value,
      address: document.getElementById('setting-biz-address').value,
      terms: document.getElementById('setting-biz-terms').value
    };

    this.saveData();
    this.showToast('Business & Invoice details saved!');
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
          alert('Invalid backup file format. Missing customers or orders.');
        }
      } catch (err) {
        alert('Failed to parse the backup JSON file.');
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

  onCategoryChange() {
    // Optional tailoring category dynamic adjustment
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

// Global App Instance
const app = new TailorApp();
window.app = app;
