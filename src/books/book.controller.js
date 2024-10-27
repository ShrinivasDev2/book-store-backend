const Book = require("./book.model");

const postABook = async (req, res) => {
  try {
    const newBook = await Book({ ...req.body });
    await newBook.save();
    res.status(200).send({ message: "Book saved successfully", book: newBook });
  } catch (error) {
    console.error("Error in uploading!", error);
    res.status(500).send({ error: "Could't upload book" });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).send(books);
  } catch (error) {
    console.error("Error Fetching Books!", error);
    res.status(500).send({ error: "Failed to fetch books!" });
  }
};

const getABook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send(book);
  } catch (error) {
    console.error("Error Fetching Book!", error);
    res.status(500).send({ error: "Failed to fetch book!" });
  }
};

const editABook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(201)
      .send({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    console.error("Error updating Book!", error);
    res.status(500).send({ error: "Failed to update book!" });
  }
};

const deleteABook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    res
      .status(201)
      .send({ message: "Book deleted successfully", book: deletedBook });
  } catch (error) {
    console.error("Error deleting Book!", error);
    res.status(500).send({ error: "Failed to delete the book!" });
  }
};

module.exports = { postABook, getAllBooks, getABook, editABook, deleteABook };
