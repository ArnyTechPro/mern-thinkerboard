import Note from '../models/Note.js';

export async function getAllNotes(_, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });  // -1 will sort in desc. order (newest first)
        res.status(200).send(notes);
    } catch (error) {
        console.error('Error in getAllNotes controller:', error);
        res.status(500).json({ message: 'Internal Server Error: ' + error});
    }
};

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: `Note (ID: ${req.params.id}) not found!` });
        res.status(200).json(note);
    } catch (error) {
        console.error('Error in getNoteById controller:', error);
        res.status(500).json({ message: 'Internal Server Error: ' + error});        
    }
};

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const savedNote = await new Note({ title, content }).save();
        res.status(201).json(savedNote);    
    } catch (error) {
        console.error('Error in createNote controller:', error);
        res.status(500).json({ message: 'Internal Server Error: ' + error});        
    }
};

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: 'true' }
        );

        if (!updatedNote) return res.status(404).json({ message: `Note (ID: ${req.params.id}) not found!` });
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error('Error in updateNote controller:', error);
        res.status(500).json({ message: 'Internal Server Error: ' + error});        
    }
};

export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) return res.status(404).json({ message: `Note (ID: ${req.params.id}) not found!` });
        res.status(200).json({ message: `Note (ID: ${req.params.id}) deleted successfully!` });
    } catch (error) {
        console.error('Error in deleteNote controller:', error);
        res.status(500).json({ message: 'Internal Server Error: ' + error});        
    }
};