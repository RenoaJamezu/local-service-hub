import { Router } from "express";
import { 
  cancelBooking, 
  createBooking, 
  getProviderBookings, 
  getProviderStats, 
  updateBookingStatus 
} from "../controllers/booking.controller";
import { protect } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

// provider views the booking
router.get("/provider", protect, authorize("provider"), getProviderBookings);

// booking stats
router.get("/provider/stats", protect, authorize("provider"), getProviderStats);

// user creates a booking
router.post("/", protect, authorize("user"), createBooking);

// provider accepts/rejects the booking
router.put("/:id/status", protect, authorize("provider"), updateBookingStatus);

// user cancel booking
router.put("/:id/cancel", protect, authorize("user"), cancelBooking);

export default router;