import { Router } from "express";
import protectRoute from "../middleware/auth";
import { createCertificate } from "../controllers/certificate.controller";

const router = Router();

router.post("/create", protectRoute(), createCertificate);
router.get("/:userId", protectRoute(), createCertificate);
router.get("/:id", protectRoute(), createCertificate);
router.delete("/:id", protectRoute(), createCertificate);

export default router;