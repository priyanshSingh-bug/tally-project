# 📄 Invoice to Tally Prime Converter

A full-stack application that takes **invoice images or PDFs** as input, extracts data using **OCR and PDF parsing**, and converts the extracted information into **Tally Prime–compatible XML** as well as **structured JSON** format.

This project is designed specifically for **Indian GST-compliant invoices** and enables **direct import into Tally Prime**.

---

## 🚀 Features

* Upload **invoice images (JPG / PNG)** or **PDF files**
* Extract text using:

  * **Tesseract OCR** (for images)
  * **PDF Parser** (for text-based PDFs)
* Parse invoice data according to **Indian GST format**
* Generate:

  * ✅ **Tally Prime–compatible XML**
  * ✅ **Structured JSON output**
* Download XML and JSON files after processing
* Store uploaded invoices securely in an `uploads/` folder
* Modular, scalable backend architecture

---

## 🧠 Tech Stack

### Frontend

* React
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* Multer (file uploads)
* Tesseract.js (OCR)
* pdf-parse (PDF text extraction)

### Output Formats

* JSON
* Tally Prime XML (Sales Voucher + GST ledgers)

---

## 🔄 Application Flow

1. User uploads an invoice (Image or PDF)
2. File is stored in the `uploads/` folder
3. Backend detects file type:

   * Image → processed using **Tesseract OCR**
   * PDF → processed using **pdf-parse**
4. Extracted raw text is parsed into structured invoice data
5. Parsed data is converted into:

   * JSON format
   * Tally Prime–compatible XML format
6. User can download:

   * 📥 JSON file
   * 📥 XML file for Tally Prime import

---

## 🧾 Supported Invoice Fields

* Invoice Number
* Invoice Date
* Seller Name & GSTIN
* Buyer Name & GSTIN
* Place of Supply
* Item Name(s)
* HSN / SAC
* Quantity
* Rate
* Taxable Value
* CGST / SGST / IGST
* Total Invoice Value

---

## 🧩 Tally Prime XML Compatibility

* Sales Voucher format
* Party Ledger creation
* Sales Ledger
* GST Tax Ledgers (CGST / SGST / IGST)
* Correct GST classification
* INR currency support

The generated XML can be **directly imported into Tally Prime** without modification.

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
https://github.com/priyanshSingh-bug/tally-project.git
cd invoice-to-tally
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm start
```

Server will start on:

```
http://localhost:5000
```

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:3000
```

---

## 📥 API Endpoint

### Upload Invoice

```
POST /api/upload
```

**Form Data:**

* `invoice` → Image or PDF file

**Response:**

* Extracted invoice JSON
* Download URLs for JSON & XML
