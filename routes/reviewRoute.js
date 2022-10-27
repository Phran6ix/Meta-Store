const { Router } = require("express");

const { protect, restrictTo } = require("../controllers/authController");
const reviewController = require("../controllers/reviewController");

const router = Router();

router.use(protect);
router.post(
  "/:product",
  restrictTo("user"),
  reviewController.setTourUserId,
  reviewController.createReview
);

router.use(restrictTo("admin"));
router
  .route("/:id")
  .get(reviewController.getReview)
  .delete(reviewController.deleteReview);
router.get("/", reviewController.getReviews);

module.exports = router;
