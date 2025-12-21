import Note from '../models/Note.js';

// An '-' before 'res' indicates that the parameter 'req' is unused
export async function getAllNotes(_, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error fetching notes: ", error);
        res.status(500).json({ message: "Internal Server Error !" });
    }
}

export async function getNoteById(req, res) {
    try {
        // const id = req.params.id; //Below is an alternative way of writing it using destructuring
        const { id } = req.params;
        const note = await Note.findById(id);
        if (note != null) {
            return res.status(200).json(note);
        } else {
            return res.status(404).json({ message: "Note not found !" });
        }
    } catch (error) {
        console.error("Error fetching note by ID: ", error);
        res.status(500).json({ message: "Internal Server Error !" });
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        //This is short for const newNote = new Note({ title: title, content: content });
        const newNote = new Note({ title, content });
        const createdNote = await newNote.save();
        res.status(201).json({ message: "Note Created Successfully !", note: createdNote });
    } catch (error) {
        console.error("Error creating note: ", error);
        res.status(500).json({ message: "Internal Server Error !" });
    }
}

export async function updateNote(req, res) {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        // { new: true } returns the updated document
        const note = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
        if (note == null) {
            res.status(404).json({ message: "Note not found !" });
        } else {
            res.status(200).json({
                message: "Note updated successfully !",
                note: note
            });
        }
    } catch (error) {
        console.error("Error updating note: ", error);
        res.status(500).json({ message: "Internal Server Error !" });
    }
}

export async function deleteNote(req, res) {
    try {
        const { id } = req.params;
        const deletedNote = await Note.findByIdAndDelete(id);
        if (deletedNote == null) return res.status(404).json({ message: "Note not found !" });
        res.status(200).json({ message: "Note deleted successfully !", note: deletedNote });
    } catch (error) {
        console.error("Error deleting note: ", error);
        res.status(500).json({ message: "Internal Server Error !" });
    }
}