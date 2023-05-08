const express = require("express");
const reviews = express.Router({mergeParams: true });
const {
  getAllProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../queries/products");

// INDEX SHOW ALL
reviews.get("/", async (req, res) => {
  try {
    const allReviews = await getAllReviews(bookmarkId);
    res.json(allReviews);
  } catch (err) {
    res.json(err);
  }
});

// SHOW ONE
reviews.get("/:id", async (req, res) => {
  const { id } = req.params;
  const review = await getReview(id);
  if (review) {
    res.json(review);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

// CREATE
reviews.post("/", checkBoolean, checkName, async (req, res) => {
  try {
    const review = await createReview(req.body);
    res.json(review);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// DELETE
reviews.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedReview = await deleteReview(id);
  if (deletedReview.id) {
    res.status(200).json(deletedReview);
  } else {
    res.status(404).json("Review not found");
  }
});

// UPDATE
reviews.put("/:id",checkName, checkBoolean, async (req, res) => {
  const { id } = req.params;
  const updatedReview = await updateReviews(id, req.body);
  res.status(200).json(updatedReview);
});

module.exports = reviews;