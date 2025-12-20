import { Router } from "express";
import { createService, deleteService, getServices, updateServiceDetails, updateServiceStatus } from "../controllers/service.controller";
import { protect } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

// user get services
router.get("/", protect, getServices);

// provider create a service
router.post("/", protect, authorize("provider"), createService);

// provider delete the service
router.put("/:id/delete", protect, authorize("provider"), deleteService);

// provider update the service status
router.put("/:id/update-status", protect, authorize("provider"), updateServiceStatus);

// provider update the service details
router.put("/:id/update-details", protect, authorize("provider"), updateServiceDetails);

export default router;