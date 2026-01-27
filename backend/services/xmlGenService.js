const { XMLBuilder } = require('fast-xml-parser');
// Note: We might need fast-xml-parser or just build string manually for control.
// Requirement said "pdf-parse" and "tesseract.js" for OCR. I didn't install fast-xml-parser. 
// I will build XML string manually to ensure exact format without extra deps if not needed, or better, use a template.
// Tally XML is verbose. I'll use a template approach.

const generateTallyXML = (data) => {
    // Basic hygiene
    const safe = (str) => str || '-';
    const date = data.invoice_date !== '-' ? data.invoice_date : '20240101'; // Fallback or format

    // Tally often needs specific date format (YYYYMMDD)
    // Assuming Gemini returns something parseable, but for MVP we might pass text. 
    // Tally expects "EffectiveDate" usually. 
    // For this prototype, I will structure it as a standard Vouchertype Sales.

    let xml = `
<ENVELOPE>
 <HEADER>
  <TALLYREQUEST>Import Data</TALLYREQUEST>
 </HEADER>
 <BODY>
  <IMPORTDATA>
   <REQUESTDESC>
    <REPORTNAME>Vouchers</REPORTNAME>
    <STATICVARIABLES>
     <SVCURRENTCOMPANY>${safe(data.seller.name)}</SVCURRENTCOMPANY>
    </STATICVARIABLES>
   </REQUESTDESC>
   <REQUESTDATA>
    <TALLYMESSAGE xmlns:UDF="TallyUDF">
     <VOUCHER VCHTYPE="Sales" ACTION="Create" OBJVIEW="Invoice Voucher View">
      <DATE>20240401</DATE>
      <VOUCHERTYPENAME>Sales</VOUCHERTYPENAME>
      <VOUCHERNUMBER>${safe(data.invoice_number)}</VOUCHERNUMBER>
      <PARTYLEDGERNAME>${safe(data.buyer.name)}</PARTYLEDGERNAME>
      <PERSISTEDVIEW>Invoice Voucher View</PERSISTEDVIEW>
      <ENTEREDBY>SysAdmin</ENTEREDBY>
      <EFFECTIVEDATE>20240401</EFFECTIVEDATE>
      <LEDGERENTRIES.LIST>
       <LEDGERNAME>${safe(data.buyer.name)}</LEDGERNAME>
       <ISDEEMEDPOSITIVE>Yes</ISDEEMEDPOSITIVE>
       <LEDGERFROMITEM>No</LEDGERFROMITEM>
       <REMOVEZEROENTRIES>No</REMOVEZEROENTRIES>
       <ISPARTYLEDGER>Yes</ISPARTYLEDGER>
       <AMOUNT>-${safe(data.total_amount)}</AMOUNT>
      </LEDGERENTRIES.LIST>
`;

    // Items
    data.items.forEach(item => {
        xml += `
      <ALLINVENTORYENTRIES.LIST>
       <STOCKITEMNAME>${safe(item.item_name)}</STOCKITEMNAME>
       <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
       <ISLASTDEEMEDPOSITIVE>No</ISLASTDEEMEDPOSITIVE>
       <AMOUNT>${safe(item.taxable_value)}</AMOUNT>
       <ACTUALQTY>${safe(item.quantity)}</ACTUALQTY>
       <BILLEDQTY>${safe(item.quantity)}</BILLEDQTY>
       <RATE>${safe(item.rate)}</RATE>
       <ACCOUNTINGALLOCATIONS.LIST>
        <LEDGERNAME>Sales</LEDGERNAME>
        <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
        <AMOUNT>${safe(item.taxable_value)}</AMOUNT>
       </ACCOUNTINGALLOCATIONS.LIST>
      </ALLINVENTORYENTRIES.LIST>
`;
    });

    // GST Ledgers
    const gst = data.gst_summary || {};
    if (gst.cgst && gst.cgst !== '-') {
        xml += `
      <LEDGERENTRIES.LIST>
       <LEDGERNAME>CGST</LEDGERNAME>
       <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
       <AMOUNT>${gst.cgst}</AMOUNT>
      </LEDGERENTRIES.LIST>
`;
    }
    if (gst.sgst && gst.sgst !== '-') {
        xml += `
      <LEDGERENTRIES.LIST>
       <LEDGERNAME>SGST</LEDGERNAME>
       <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
       <AMOUNT>${gst.sgst}</AMOUNT>
      </LEDGERENTRIES.LIST>
`;
    }
    if (gst.igst && gst.igst !== '-') {
        xml += `
      <LEDGERENTRIES.LIST>
       <LEDGERNAME>IGST</LEDGERNAME>
       <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
       <AMOUNT>${gst.igst}</AMOUNT>
      </LEDGERENTRIES.LIST>
`;
    }

    xml += `
     </VOUCHER>
    </TALLYMESSAGE>
   </REQUESTDATA>
  </IMPORTDATA>
 </BODY>
</ENVELOPE>
`;
    return xml.trim();
};

module.exports = { generateTallyXML };
