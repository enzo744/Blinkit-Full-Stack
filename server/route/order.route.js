import { Router } from "express";
import auth from "../middleware/auth.js";
import { CashOnDeliveryOrderController, getOrderDetailsController, PaymentController, webhookStripe } from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post("/cash-on-delivery", auth, CashOnDeliveryOrderController)
orderRouter.post("/checkout", auth, PaymentController)
orderRouter.post("/webhook", webhookStripe)
orderRouter.get("/order-list", auth, getOrderDetailsController)


export default orderRouter;