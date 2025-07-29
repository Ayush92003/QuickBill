import Invoice from "../models/Invoice.js";
import PDFDocument from "pdfkit";

export const createInvoice = async (req, res) => {
  const { clientName, clientEmail, clientAddress, items, taxRate } = req.body;
  try {
    const subtotal = items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    const tax = (taxRate / 100) * subtotal;
    const totalAmount = subtotal + tax;

    const newInvoice = new Invoice({
      userId: req.userId,
      clientName,
      clientEmail,
      clientAddress,
      items,
      taxRate,
      totalAmount,
    });

    await newInvoice.save();

    res.status(201).json(newInvoice);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating invoice", error: err.message });
  }
};

export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ userId: req.userId });
    res.status(200).json(invoices);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching invoices", error: err.message });
  }
};

export const updateInvoice = async (req, res) => {
  try {
    const updated = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: "invoice not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", err });
  }
};

export const deleteInvoice = async (req, res) => {
  try {
    const deleted = await Invoice.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Invoice not found" });
    res.status(200).json({ message: "Invoice deleted" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", err });
  }
};

export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });
    res.status(200).json(invoice);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", err });
  }
};

export const downloadInvoicePdf = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename = invoice-${invoice._id}.pdf`
    );

    doc.pipe(res);
    doc.fontSize(25).text("QuickBill Invoice", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Customer : ${invoice.clientName}`);
    doc.text(`Amount : ₹${invoice.totalAmount}`);
    doc.text(`Date : ${new Date(invoice.createdAt).toLocaleDateString()}`);
    doc.moveDown();
    doc.text("Items:", { underline: true });
    invoice.items.forEach((item) => {
      doc.text(`- ${item.name} (Qty: ${item.quantity}, Price: ₹${item.price})`);
    });
    doc.moveDown();
    doc.text(`Tax Rate: ${invoice.taxRate}%`);
    doc.end();
  } catch (err) {
    res.status(500).json({ message: "Failed to generate PDF", err });
  }
};
