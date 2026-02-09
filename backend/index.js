const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Class Schema
const classSchema = new mongoose.Schema({
    name: { type: String, required: true },
    instructor: { type: String, required: true },
    type: { type: String, enum: ['theory', 'revision', 'paper'], required: true },
    lessons: [String],
    timeTable: String,
    place: String,
    duration: String,
    students: { type: Number, default: 0 },
    color: { type: String, default: '#667eea' }
});

const Class = mongoose.model('Class', classSchema);

// Helper function to check for "pseudo-auth"
// In a real app, this would use JWT and properly verify the user
const checkTeacherSession = (req, res, next) => {
    const userRole = req.headers['x-user-role'];
    if (userRole === 'teacher' || userRole === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Only teachers can perform this action.' });
    }
};

// Routes
app.get('/api/classes', async (req, res) => {
    try {
        const classes = await Class.find();
        res.json(classes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/classes', checkTeacherSession, async (req, res) => {
    const newClass = new Class(req.body);
    try {
        const savedClass = await newClass.save();
        res.status(201).json(savedClass);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.put('/api/classes/:id', checkTeacherSession, async (req, res) => {
    const { _id, __v, ...updateData } = req.body;
    try {
        const updatedClass = await Class.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedClass) return res.status(404).json({ message: 'Class not found' });
        res.json(updatedClass);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/classes/:id', checkTeacherSession, async (req, res) => {
    try {
        const deletedClass = await Class.findByIdAndDelete(req.params.id);
        if (!deletedClass) return res.status(404).json({ message: 'Class not found' });
        res.json({ message: 'Class deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
