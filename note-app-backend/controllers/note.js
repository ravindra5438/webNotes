import Note from "../models/Note.js";

const getNotes = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const notes = await Note.find().limit(limit);
    console.log(notes)
    res.status(200).json({
      data: notes,
      message: "All Notes found",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getNotes };
