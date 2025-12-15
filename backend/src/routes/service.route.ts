import { Router } from "express";
import { createService, getServices } from "../controllers/service.controller";
import { protect } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

router.get("/", getServices);
router.post("/", protect, authorize("provider"), createService);

export default router;