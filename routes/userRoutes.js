const { Router } = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const cartController = require("../controllers/cartController");

const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.use(authController.protect);
router.patch(
  "/addproducttowishlist/:product",
  userController.addProductToWishlist
);
router.patch('/updatepassword', authController.updatePassword)

router.get("/wishlistproduct", userController.viewWishlistProduct);
router.patch("/addtocart", cartController.addProductToCart);
router.get("/viewcart", cartController.viewCart);

router.use(authController.restrictTo("admin"));
router.get("/getuser", userController.getUser);
module.exports = router;
