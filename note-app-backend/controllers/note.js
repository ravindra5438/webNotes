import Note from "../models/Note.js";

const getNotes = async (req, res) => {
  const { limit = 10 } = req.query;
  const notes = await Note.find().limit(limit);
  res.status(200).json({
    data: notes,
    message: "All Notes found",
  });
  try {
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getNotes };
