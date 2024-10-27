const express = require("express");
const {
  postABook,
  getAllBooks,
  getABook,
  editABook,
  deleteABook,
} = require("./book.controller");
const verifyAdminToken = require("../middleware/verifyAdminToken");
const router = express.Router();

// Post a book
router.post("/create-book", verifyAdminToken, postABook);
// Get all Books
router.get("/get-books", getAllBooks);
// Get A Book
router.get("/get-book/:id", getABook);
// Edit a book
router.put("/edit-book/:id", verifyAdminToken, editABook);
// Delete a book
router.delete("/delete-book/:id", verifyAdminToken, deleteABook);

module.exports = router;
