import { Document, Page, View, Text, StyleSheet, Image } from "@react-pdf/renderer";

const burgundy = "#6b1e2e";
const gold = "#c9a84c";
const lightBg = "#f9f6f2";
const border = "#e0d8d0";
const muted = "#888";

const S = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 9, color: "#333", backgroundColor: "#fff", paddingHorizontal: 40, paddingVertical: 36 },
  row: { flexDirection: "row" },
  col: { flexDirection: "column" },

  // Header
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, borderBottom: `1pt solid ${border}`, paddingBottom: 10 },
  ibcSmall: { fontSize: 7, color: muted },
  logoImg: { width: 80, height: 58, objectFit: "contain" },

  // Client + Meta
  clientMetaRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 28 },
  clientBlock: { maxWidth: 220 },
  clientName: { fontSize: 9, fontFamily: "Helvetica-Bold", marginBottom: 2 },
  clientLine: { fontSize: 9, color: "#444", lineHeight: 1.5 },
  metaTable: { width: 200 },
  metaRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
  metaKey: { fontSize: 8, color: muted },
  metaVal: { fontSize: 8, fontFamily: "Helvetica-Bold" },

  // Heading
  heading: { fontSize: 28, fontFamily: "Helvetica-Bold", color: burgundy, marginBottom: 14 },

  // Line items table
  tableHeader: { flexDirection: "row", backgroundColor: lightBg, borderTop: `1pt solid ${border}`, borderBottom: `1pt solid ${border}`, paddingVertical: 5, paddingHorizontal: 8 },
  tableHeaderCell: { fontSize: 7, fontFamily: "Helvetica-Bold", color: burgundy, textTransform: "uppercase" },
  tableRow: { flexDirection: "row", borderBottom: `0.5pt solid ${border}`, paddingVertical: 6, paddingHorizontal: 8 },
  tableRowAlt: { backgroundColor: "#fdfaf7" },
  colDesc: { flex: 3 },
  colQty: { flex: 1, textAlign: "right" },
  colPrice: { flex: 1.5, textAlign: "right" },
  colTax: { flex: 1, textAlign: "right" },
  colAmount: { flex: 1.5, textAlign: "right" },

  // Totals
  totalsSection: { flexDirection: "row", justifyContent: "flex-end", marginTop: 12 },
  totalsBox: { width: 220, borderTop: `1pt solid ${border}` },
  totalRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 4, paddingHorizontal: 8, borderBottom: `0.5pt solid ${border}` },
  totalKey: { fontSize: 8, color: muted },
  totalVal: { fontSize: 8 },
  grandRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 6, paddingHorizontal: 8, backgroundColor: burgundy },
  grandKey: { fontSize: 9, fontFamily: "Helvetica-Bold", color: "#fff" },
  grandVal: { fontSize: 9, fontFamily: "Helvetica-Bold", color: "#fff" },

  // Payment
  paymentSection: { marginTop: 24, paddingTop: 10 },
  paymentLine: { fontSize: 8, color: "#444", marginBottom: 3 },
  paymentBold: { fontFamily: "Helvetica-Bold" },
  tcLine: { fontSize: 7.5, color: muted, marginTop: 6 },

  // Footer
  footer: { position: "absolute", bottom: 28, left: 40, right: 40, borderTop: `0.5pt solid ${border}`, paddingTop: 8, flexDirection: "row", justifyContent: "space-between" },
  footerCol: { flex: 1 },
  footerLabel: { fontSize: 7.5, fontFamily: "Helvetica-Bold", color: "#333", marginBottom: 2 },
  footerLine: { fontSize: 7, color: muted },
});

export type InvoiceLineItem = {
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate: number;
};

export type InvoiceData = {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  deliveryDate: string;
  client: {
    company?: string;
    name?: string;
    street: string;
    city: string;
    country: string;
    email: string;
  };
  lineItems: InvoiceLineItem[];
  totalNet: number;
  totalVat: number;
  totalGross: number;
  bankName: string;
  iban: string;
  bic: string;
};

function fmt(n: number) {
  return n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
}

function InvoicePage({ data, lang }: { data: InvoiceData; lang: "de" | "en" }) {
  const de = lang === "de";

  const L = {
    heading: de ? "Rechnung" : "Invoice",
    desc: de ? "Beschreibung" : "Description",
    qty: de ? "Menge" : "Qty",
    price: de ? "Einzelpreis" : "Unit Price",
    tax: de ? "Steuern" : "Tax",
    amount: de ? "Betrag" : "Amount",
    net: de ? "Nettobetrag" : "Net Amount",
    vat: (r: number) => de ? `Umsatzsteuer ${r} %` : `VAT ${r} %`,
    total: de ? "Gesamt" : "Total",
    invoiceNo: de ? "Rechnungsnr." : "Invoice No.",
    invoiceDate: de ? "Rechnungsdatum" : "Invoice Date",
    dueDate: de ? "Fälligkeit der Rechnung" : "Due Date",
    deliveryDate: de ? "Lieferdatum" : "Delivery Date",
    payRef: de ? "Zahlungsreferenz" : "Payment Reference",
    transfer: de ? "Überweisug auf folgendes Konto" : "Transfer to the following account",
    tc: de ? "Allgemeine Geschäftsbedingungen" : "Terms and Conditions",
  };

  const logoPath = `${process.cwd()}/public/images/logo-new.png`;

  const vatGroups: Record<number, number> = {};
  for (const item of data.lineItems) {
    vatGroups[item.vatRate] = (vatGroups[item.vatRate] ?? 0) + (item.quantity * item.unitPrice * item.vatRate) / 100;
  }

  return (
    <Page size="A4" style={S.page}>
      {/* Header */}
      <View style={S.headerRow}>
        <Text style={S.ibcSmall}>
          IBC Indian Biryani Company | Hektorstraße 11 | 10711 Berlin | Deutschland
        </Text>
        <Image src={logoPath} style={S.logoImg} />
      </View>

      {/* Client + Meta */}
      <View style={S.clientMetaRow}>
        <View style={S.clientBlock}>
          {data.client.company ? <Text style={S.clientName}>{data.client.company}</Text> : null}
          {data.client.name ? <Text style={S.clientLine}>{data.client.name}</Text> : null}
          <Text style={S.clientLine}>{data.client.street}</Text>
          <Text style={S.clientLine}>{data.client.city}</Text>
          <Text style={S.clientLine}>{data.client.country}</Text>
        </View>
        <View style={S.metaTable}>
          <View style={S.metaRow}>
            <Text style={S.metaKey}>{L.invoiceNo}</Text>
            <Text style={S.metaVal}>{data.invoiceNumber}</Text>
          </View>
          <View style={S.metaRow}>
            <Text style={S.metaKey}>{L.invoiceDate}</Text>
            <Text style={S.metaVal}>{data.invoiceDate}</Text>
          </View>
          <View style={S.metaRow}>
            <Text style={S.metaKey}>{L.dueDate}</Text>
            <Text style={S.metaVal}>{data.dueDate}</Text>
          </View>
          <View style={S.metaRow}>
            <Text style={S.metaKey}>{L.deliveryDate}</Text>
            <Text style={S.metaVal}>{data.deliveryDate}</Text>
          </View>
        </View>
      </View>

      {/* Heading */}
      <Text style={S.heading}>{L.heading}</Text>

      {/* Table header */}
      <View style={S.tableHeader}>
        <Text style={[S.tableHeaderCell, S.colDesc]}>{L.desc}</Text>
        <Text style={[S.tableHeaderCell, S.colQty]}>{L.qty}</Text>
        <Text style={[S.tableHeaderCell, S.colPrice]}>{L.price}</Text>
        <Text style={[S.tableHeaderCell, S.colTax]}>{L.tax}</Text>
        <Text style={[S.tableHeaderCell, S.colAmount]}>{L.amount}</Text>
      </View>

      {/* Line items */}
      {data.lineItems.map((item, i) => (
        <View key={i} style={[S.tableRow, i % 2 === 1 ? S.tableRowAlt : {}]}>
          <Text style={[{ fontSize: 9 }, S.colDesc]}>{item.description}</Text>
          <Text style={[{ fontSize: 9 }, S.colQty]}>{item.quantity.toLocaleString("de-DE", { minimumFractionDigits: 2 })}</Text>
          <Text style={[{ fontSize: 9 }, S.colPrice]}>{fmt(item.unitPrice)}</Text>
          <Text style={[{ fontSize: 9 }, S.colTax]}>{item.vatRate}% {de ? "USt" : "VAT"}</Text>
          <Text style={[{ fontSize: 9 }, S.colAmount]}>{fmt(item.quantity * item.unitPrice)}</Text>
        </View>
      ))}

      {/* Totals */}
      <View style={S.totalsSection}>
        <View style={S.totalsBox}>
          <View style={S.totalRow}>
            <Text style={S.totalKey}>{L.net}</Text>
            <Text style={S.totalVal}>{fmt(data.totalNet)}</Text>
          </View>
          {Object.entries(vatGroups).map(([rate, amt]) => (
            <View key={rate} style={S.totalRow}>
              <Text style={S.totalKey}>{L.vat(Number(rate))}</Text>
              <Text style={S.totalVal}>{fmt(amt)}</Text>
            </View>
          ))}
          <View style={S.grandRow}>
            <Text style={S.grandKey}>{L.total}</Text>
            <Text style={S.grandVal}>{fmt(data.totalGross)}</Text>
          </View>
        </View>
      </View>

      {/* Payment */}
      <View style={S.paymentSection}>
        <Text style={S.paymentLine}>
          <Text style={S.paymentBold}>{L.payRef}: </Text>{data.invoiceNumber}
        </Text>
        <View style={{ marginTop: 8, padding: 10, backgroundColor: lightBg, borderLeft: `3pt solid ${burgundy}` }}>
          <View style={[S.metaRow, { marginBottom: 4 }]}>
            <Text style={[S.paymentBold, { fontSize: 8, width: 70 }]}>{de ? "Bank" : "Bank Name"}</Text>
            <Text style={{ fontSize: 8, color: "#444" }}>{data.bankName}</Text>
          </View>
          <View style={[S.metaRow, { marginBottom: 4 }]}>
            <Text style={[S.paymentBold, { fontSize: 8, width: 70 }]}>IBAN</Text>
            <Text style={{ fontSize: 8, color: "#444" }}>{data.iban}</Text>
          </View>
          <View style={S.metaRow}>
            <Text style={[S.paymentBold, { fontSize: 8, width: 70 }]}>BIC / SWIFT</Text>
            <Text style={{ fontSize: 8, color: "#444" }}>{data.bic}</Text>
          </View>
        </View>
        <Text style={S.tcLine}>
          {L.tc}: https://theindianbiryanicompany.odoo.com/terms
        </Text>
      </View>

      {/* Footer */}
      <View style={S.footer} fixed>
        <View style={S.footerCol}>
          <Text style={S.footerLabel}>indianbiryanicompany</Text>
          <Text style={S.footerLine}>Hektorstraße 11</Text>
          <Text style={S.footerLine}>10711 Berlin</Text>
          <Text style={S.footerLine}>Germany</Text>
        </View>
        <View style={S.footerCol}>
          <Text style={S.footerLine}>+49 179 9676142</Text>
          <Text style={S.footerLine}>theindianbiryanicompany@gmail.com</Text>
        </View>
        <View style={S.footerCol}>
          <Text style={S.footerLine}>USt-IdNr.: DE309715048</Text>
          <Text style={S.footerLine}>HRB-Nr.: HRB181636B</Text>
        </View>
        <View style={S.footerCol}>
          <Text style={S.footerLabel}>{data.bankName}</Text>
          <Text style={S.footerLine}>IBAN: {data.iban}</Text>
          <Text style={S.footerLine}>BIC: {data.bic}</Text>
        </View>
      </View>
    </Page>
  );
}

export function InvoiceDocument({ data }: { data: InvoiceData }) {
  return (
    <Document title={`Invoice ${data.invoiceNumber}`} author="Indian Biryani Company">
      <InvoicePage data={data} lang="de" />
      <InvoicePage data={data} lang="en" />
    </Document>
  );
}
