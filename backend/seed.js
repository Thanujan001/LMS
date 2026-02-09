const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB for seeding...'))
    .catch(err => console.error('Could not connect to MongoDB', err));

const classSchema = new mongoose.Schema({
    name: String,
    instructor: String,
    type: String,
    lessons: [String],
    timeTable: String,
    place: String,
    duration: String,
    students: Number,
    color: String
});

const Class = mongoose.model('Class', classSchema);

const seedClasses = [
    {
        name: 'React Fundamentals',
        instructor: 'Dr. Sarah Smith',
        type: 'theory',
        lessons: ['Components & JSX', 'State & Props', 'Hooks Overview', 'Component Lifecycle'],
        timeTable: 'Mon, Wed, Fri - 10:00 AM',
        place: 'Room 201',
        duration: '12 weeks',
        students: 150,
        color: '#667eea'
    },
    {
        name: 'JavaScript Advanced',
        instructor: 'Prof. Mike Johnson',
        type: 'theory',
        lessons: ['ES6+ Features', 'Async Programming', 'Closures & Scope', 'Prototypes & OOP'],
        timeTable: 'Tue, Thu - 2:00 PM',
        place: 'Room 305',
        duration: '10 weeks',
        students: 200,
        color: '#764ba2'
    },
    {
        name: 'React Quick Review',
        instructor: 'Dr. Sarah Smith',
        type: 'revision',
        lessons: ['Components Review', 'Hooks Deep Dive', 'Performance Tips', 'Common Patterns'],
        timeTable: 'Sat - 4:00 PM',
        place: 'Room 201',
        duration: '4 weeks',
        students: 80,
        color: '#f5576c'
    },
    {
        name: 'React Exam Prep',
        instructor: 'Dr. Sarah Smith',
        type: 'paper',
        lessons: ['Mock Tests', 'Practice Questions', 'Time Management', 'Exam Tips'],
        timeTable: 'Sun - 10:00 AM',
        place: 'Room 201',
        duration: '2 weeks',
        students: 140,
        color: '#00d4ff'
    }
];

const seedDB = async () => {
    await Class.deleteMany({});
    await Class.insertMany(seedClasses);
    console.log('Database Seeded!');
    process.exit();
};

seedDB();
