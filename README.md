# ZM Enterprises – School & Corporate Uniform Tailoring & Atelier Management Suite

Welcome to **ZM Enterprises**, a professional production-ready web platform built for high-quality tailoring, bulk B2B school uniform stitching, and corporate attire manufacturing in **Hyderabad, Telangana**, combined with a comprehensive atelier management suite.

---

## 🌟 Business Overview & Key Capabilities

- **Enterprise Name:** ZM Enterprises
- **Core Industry:** Tailoring, Garment Stitching & Bulk Institutional Uniform Manufacturing
- **Primary Market:** Schools, Junior Colleges, Corporate Organizations, Hospitals & Hospitality in Hyderabad & Telangana
- **Key Proposition:** Direct workshop pricing, individual & batch custom sizing, reinforced seam durability, sample fitting approvals, and guaranteed on-time institutional handovers.

---

## 🚀 Features & Architecture

### 1. 🌐 Public Business Homepage
- **Prominent ZM Enterprises Branding:** Emerald Green (`#059669`, `#10b981`), Deep Obsidian (`#070a10`), and Warm Gold (`#d97706`) luxury atelier aesthetic.
- **Clear Value Proposition:** Precision tailoring & bulk uniform stitching in Hyderabad.
- **Core Services Showcase:**
  1. *Bulk School Uniform Stitching* (Boys & Girls complete academic sets, blazers, pinafores, sportswear, crest embroidery).
  2. *Corporate & Institutional Uniforms* (Executive blazers, formal shirts, staff trousers, healthcare scrubs, security workwear).
  3. *Bespoke Tailoring & Couture* (Bespoke 3-piece suits, sherwanis, kurtas, designer padded blouses, lehengas).
  4. *Fitting Adjustments & Alterations* (Tapering, waist adjustments, 24–48 hr fast turnaround).
- **5-Step Institutional Process:** Requirement consultation ➔ Sample approval ➔ Measurement session ➔ Workshop cutting & stitching ➔ Department/class-wise handover.
- **Prominent Calls-to-Action:** Direct links to *Request a Bulk Quotation*, *WhatsApp Master Tailor*, and *Explore Uniform Services*.

### 2. 👔 Institutional Uniform Services & Gallery
- **Dedicated School Uniforms Section:** Primary & High school shirts, trousers, pleated skirts, pinafores, salwar kameez sets, school blazers, house sports kits, and reinforced seams with growth margin hems.
- **Dedicated Corporate Uniforms Section:** Executive suiting, daily office formal wear, hospitality uniforms, medical scrubs, doctor coats, and heavy-duty utility wear.
- **Authentic Workshop Photo Gallery:**
  - Integrated photo upload manager allowing genuine workshop photographs to be added (`+ Upload Real Workshop Photo`).
  - Categorization by *School Uniforms*, *Corporate Uniforms*, and *Workshop*.
  - Persistent storage in browser local storage and JSON backups.
  - No fake stock photos or invented manufacturing claims.
- **Editable Uniform Specifications:** Seamless integration with the Services Catalog for rate and turnaround adjustments.

### 3. 📋 B2B Bulk Order Quotation Enquiry Form
- **Comprehensive Data Collection:**
  - School or Company Name
  - Contact Person's Full Name & Role/Designation
  - Contact Mobile Number (Validated 10-digit Indian phone or international format)
  - Official Email Address (Optional)
  - City or Locality in Hyderabad / Telangana (Quick area selector: Banjara Hills, Hitec City, Gachibowli, Secunderabad, Kukatpally, Madhapur, Charminar, Jubilee Hills, etc.)
  - Uniform Category (School Uniforms, College, Corporate, Hospitality, Healthcare, Security, Sports)
  - Estimated Quantity (25-50 pcs, 50-100 pcs, 100-250 pcs, 250-500 pcs, 500-1000 pcs, 1000+ pcs)
  - Target Delivery Date (Validated future date)
  - Fabric Supply Preference (ZM Sourced vs Client Provided vs Sample Swatches)
  - Logo Crest & Embroidery Specifications
  - Additional Requirements & Notes
- **Interactive Validation:** Immediate friendly error highlights for required fields.
- **Confirmation & WhatsApp Bridge:**
  - Generates unique Enquiry Reference ID (`ENQ-2026-XXXXXX`).
  - Itemized submission summary table.
  - One-click **"📲 Send Details on WhatsApp"** button pre-filling all specifications directly to ZM Enterprises!
  - Print/Download Quotation Request copy.

### 4. 📬 B2B Enquiry Management (Workshop Suite)
- **Persistent Local Storage:** All submitted genuine enquiries are saved persistently in `localStorage` under `ZM_TAILORING_PRO_DATA_V2` and included in offline JSON backups.
- **Enquiry Pipeline Tracking:**
  - Statuses: `New`, `In Discussion`, `Quotation Sent`, `Converted to Order`, `Closed`.
  - Search & filter by organization, contact person, phone number, city/area, status, and category.
  - Active badge counter on the sidebar navigation for pending enquiries (`#nav-enquiry-count`).
  - Real-time notification banner on the Workshop Dashboard for new quotation requests.
- **✂️ "Convert to Tailoring Order" Feature:**
  - Bridges B2B enquiries directly to workshop production!
  - Automatically registers or selects the institution in Customer Records.
  - Pre-fills the **+ New Order** modal with uniform category, item type, quantity, delivery date, and specifications.
  - Updates enquiry status to `Converted to Order` with linked reference.
- **Internal Tailor Notes:** Add private workshop notes (pricing quoted, sample dates, fabric discussion).

### 5. 💬 Configurable WhatsApp Contact Integration
- **Floating WhatsApp Button:** Fixed at bottom-right corner with direct click-to-chat.
- **Header & Action Buttons:** One-click WhatsApp contact on Hero banner, quotation confirmation, and order tables.
- **Configurable Phone Number:**
  - Powered by the store phone setting in **Store Settings** (`setting-biz-phone`).
  - Does NOT invent or hardcode phone numbers.
  - If unconfigured, automatically opens a guided setup modal: *"WhatsApp Business Setup Required – Enter your 10-digit mobile number in Store Settings to enable messaging."*

### 6. 🔍 Local SEO for Hyderabad & Telangana
- **Semantic HTML & Meta Tags:** Page titles, meta descriptions, semantic headings (`<h1>`, `<h2>`, `<h3>`), canonical tags, Open Graph, and Twitter Cards.
- **Schema.org Structured Data:** Valid `LocalBusiness` / `Tailor` JSON-LD embedded in `<head>` targeting school uniform stitching, corporate uniform tailoring, and bespoke stitching in Hyderabad, Telangana.
- **Organic Keyword Targeting:** Natural search phrases targeting *school uniform stitching in Hyderabad* and *corporate uniform stitching in Hyderabad* without keyword stuffing. No misleading claims of guaranteed Google rankings.

### 7. ✂️ Complete Tailoring Atelier Management (Preserved)
- **👥 Customer Registration & Detailed Measurements:**
  - Profiles for Men, Women, and Kids.
  - Over 30 detailed tailor measurements (Upper Body, Lower Body, Women's Couture, Posture, Lining & Fit Preferences).
  - Printable Measurement Sheet for workshop cutting masters.
- **✂️ Order Creation & Production Lifecycle:**
  - Stages: `Received` ➔ `Cutting` ➔ `Stitching` ➔ `Trial Ready` ➔ `Completed` ➔ `Delivered`.
  - Priority levels: Standard, Express, 24-hr Rush.
  - Itemized billing: Stitching, Fabric, Lining, Embroidery, Alterations, Discounts.
- **📅 Timeline Alerts:**
  - Trials Scheduled Today / Overdue Deliveries alert banners.
- **🧾 Branded Tax Invoices & Receipts:**
  - Printable A4 / 80mm receipts with ZM Enterprises header, terms, and balance breakdown.
  - WhatsApp share button.
- **💾 Offline Data Backup & Restore:**
  - Export full JSON backup of customers, orders, enquiries, services, and photo gallery.
  - Safe import and restore with schema validation.

---

## 🚀 How to Run Locally

### Option 1: Direct Browser Launch
1. Double-click **`Launch App.bat`** (or open **`index.html`** in any modern web browser like Google Chrome or Microsoft Edge).

### Option 2: Local PowerShell Web Server
1. Open PowerShell in this folder:
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\server.ps1
   ```
2. Open your browser to:
   ```
   http://localhost:8080/
   ```

---

## ⚙️ Remaining Configuration Needed

1. **Configure Business WhatsApp Number:**
   - Open **Store Settings** in the left sidebar menu.
   - Enter your active WhatsApp mobile number (e.g., `9876543210` or `919876543210`) in the **WhatsApp Business Contact Phone** field.
   - Click **Save Business Details**.
   - *This activates all website WhatsApp buttons and client quotation forwarding.*
2. **Update Atelier Workshop Address:**
   - In **Store Settings**, enter your exact studio/workshop street address in Hyderabad (e.g., your shop number, building, and locality).
3. **Upload Real Uniform Photographs:**
   - Go to **Uniform Services (B2B)** in the menu.
   - Click **📷 + Upload Real Workshop Photo** to attach authentic pictures of your finished school and corporate uniform batches.

---

## 🌐 Steps to Publish Safely to GitHub & Vercel

The application is built as a zero-dependency, ultra-fast static web application that is 100% compatible with GitHub repositories and Vercel static deployments.

### Safe GitHub Update Steps:
1. Open a terminal or Git command prompt in this project folder:
   ```bash
   cd "C:\Users\sadiy\Desktop\ZM Enterprises Tailoring App"
   ```
2. Check modified files:
   ```bash
   git status
   ```
3. Stage the files:
   ```bash
   git add index.html styles.css app.js vercel.json .gitignore server.ps1 README.md
   ```
4. Commit your changes:
   ```bash
   git commit -m "feat: Upgrade ZM Enterprises with B2B uniform stitching website, enquiry form, and SEO"
   ```
5. Push to your GitHub repository:
   ```bash
   git push origin main
   ```

### Safe Vercel Deployment Steps:
1. If your Vercel project is connected to your GitHub repository:
   - Pushing your commit to `main` will **automatically trigger an instant deployment** on Vercel.
2. If deploying via Vercel CLI:
   ```bash
   npx vercel --prod
   ```
3. Verify your live Vercel deployment:
   - Check that the homepage loads with the B2B uniform highlights.
   - Test submitting a quotation enquiry.
   - Verify WhatsApp button links.
   - Confirm that the Tailor Management Suite (Dashboard, Orders, Customers) remains fully operational.
