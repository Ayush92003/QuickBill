import express from 'express';
import {createInvoice,getInvoices,updateInvoice,deleteInvoice,getInvoiceById,downloadInvoicePdf} from "../controllers/invoiceController.js";
import { protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/",protectRoute,createInvoice);
router.get("/",protectRoute,getInvoices);
router.get("/:id",protectRoute,getInvoiceById);
router.put("/:id",protectRoute,updateInvoice);
router.delete("/:id",protectRoute,deleteInvoice);
router.get("/:id/download",protectRoute,downloadInvoicePdf);

export default router;