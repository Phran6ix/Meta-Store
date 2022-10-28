const { Router } = require("express");
const { protect } = require("../controllers/authController");
const cartController = require("../controllers/cartController");

const router = Router();

router.use(protect);

router.patch("/actiononcart", cartController.addRemoveProductToCart);
router.get("/viewcart", cartController.viewCart);
router.get("/checkout", cartController.checkOut);

module.exports = router;
