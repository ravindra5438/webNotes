import Note from "../models/Note.js";

const socketController = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected.", socket.id);

    Note.find()
      .limit(10)
      .then((notes) => {
        socket.emit("data", notes);
      })
      .catch((err) => console.log(err));

    socket.on("note:create", (data) => {
      const note = new Note({
        title: data.title,
        description: data.description,
        contributors: [data.user],
      });

      note
        .save()
        .then((newNote) => {
          Note.find()
            .limit(10)
            .then((notes) => {
              io.emit("data", notes);
            })
            .catch((err) => console.log(err));
        })
        .catch((error) => console.log("Error creating note", error));
    });

    socket.on("updating", (data) => {
      io.emit("updates", data);
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
          Note.find()
            .limit(10)
            .then((notes) => {
              io.emit("data", notes);
            })
            .catch((err) => console.log(err));
        })
        .catch((error) => console.log("Error updating note", error));
    });

    socket.on("note:delete", (data) => {
      Note.findByIdAndDelete(data.id)
        .then(() => {
          Note.find()
            .limit(10)
            .then((notes) => {
              io.emit("data", notes);
            })
            .catch((err) => console.log(err));
        })
        .catch((error) => console.log("Error deleting note", error));
    });

    socket.on("scroll", (data) => {
      Note.find()
        .limit(data.limit)
        .then((notes) => {
          io.emit("scroll", notes)
        }).catch((err) => console.log(err));
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected.");
    });
  });
};

export default socketController;
