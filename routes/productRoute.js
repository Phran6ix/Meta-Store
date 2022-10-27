const { Router } = require("express");
const productController = require("../controllers/productController");
const { protect, restrictTo } = require("../controllers/authController");
const router = Router();

router.use(protect);
router.get("/getallproducts", productController.getAllProducts);
router.get("/getaproduct/:id", productController.getAProduct);
router.get("/getproductsbycategory", productController.getProductByCategory);
router.use(restrictTo("admin"));

router.post("/createproduct", productController.createProduct);
router.patch("/updateproduct/:id", productController.updateAProduct);
router.delete("/deleteproduct/:id", productController.deleteAProduct);

module.exports = router;
