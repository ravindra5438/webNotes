import Note from "../models/Note.js";

const socketController = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected.", socket.id);

    Note.find()
      .limit(10)
      .then((notes) => {
        socket.emit("note", notes);
      })
      .catch((error) => console.log("Error fetching notes", error));

    socket.on("note:create", (data) => {
      const note = new Note({
        title: data.title,
        description: data.description,
        contributors: [data.user],
      });

      note
        .save()
        .then((newNote) => {
          io.emit("note:create", newNote);
        })
        .catch((error) => console.log("Error creating note", error));
    });

    socket.on("note:update", (data) => {
      Note.findByIdAndUpdate(
        data.id,
        {
          title: data.title,
          description: data.description,
          $push: { contributors: data.user },
        },
        { new: true }
      )
        .then((updatedNote) => {
          io.emit("note:update", updatedNote);
        })
        .catch((error) => console.log("Error updating note", error));
    });

    socket.on("note:delete", (data) => {
      Note.findByIdAndDelete(data.id)
        .then(() => {
          io.emit("note:delete", data.id);
        })
        .catch((error) => console.log("Error deleting note", error));
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected.");
    });
  });
};

export default socketController;
