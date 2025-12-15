import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

router.get("/", protect, (req, res) => {
  res.json({
    message: "You access the protected route",
  });
});

router.get("/user", protect, authorize("user"), (req, res) => {
  res.json({
    message: "You access the user",
  });
});

router.get("/provider", protect, authorize("provider"), (req, res) => {
  res.json({
    message: "You access the provider",
  });
});

export default router;