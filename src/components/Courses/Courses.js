import React, { useState } from 'react';
import './Courses.css';

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Courses', count: 12 },
    { id: 'programming', name: 'Programming', count: 5 },
    { id: 'design', name: 'Design', count: 3 },
    { id: 'business', name: 'Business', count: 2 },
    { id: 'data', name: 'Data Science', count: 2 }
  ];

  const courses = [
    {
      id: 1,
      title: 'React Development Masterclass',
      instructor: 'Dr. Sarah Smith',
      category: 'programming',
      level: 'Intermediate',
      duration: '12 weeks',
      students: 1250,
      rating: 4.8,
      progress: 85,
      image: '⚛️',
      description: 'Master React development with hooks, context, and modern patterns',
      enrolled: true
    },
    {
      id: 2,
      title: 'JavaScript Fundamentals',
      instructor: 'Prof. Mike Johnson',
      category: 'programming',
      level: 'Beginner',
      duration: '8 weeks',
      students: 2100,
      rating: 4.9,
      progress: 92,
      image: '🟨',
      description: 'Complete guide to JavaScript from basics to advanced concepts',
      enrolled: true
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      instructor: 'Ms. Emily Davis',
      category: 'design',
      level: 'Beginner',
      duration: '10 weeks',
      students: 890,
      rating: 4.7,
      progress: 67,
      image: '🎨',
      description: 'Learn design thinking and create beautiful user interfaces',
      enrolled: true
    },
    {
      id: 4,
      title: 'Python for Data Science',
      instructor: 'Dr. Alex Chen',
      category: 'data',
      level: 'Intermediate',
      duration: '14 weeks',
      students: 1500,
      rating: 4.8,
      progress: 0,
      image: '🐍',
      description: 'Analyze data and build machine learning models with Python',
      enrolled: false
    },
    {
      id: 5,
      title: 'Digital Marketing Strategy',
      instructor: 'Ms. Lisa Brown',
      category: 'business',
      level: 'Beginner',
      duration: '6 weeks',
      students: 750,
      rating: 4.6,
      progress: 0,
      image: '📈',
      description: 'Master digital marketing and grow your online presence',
      enrolled: false
    },
    {
      id: 6,
      title: 'Advanced CSS & Animations',
      instructor: 'Mr. Tom Wilson',
      category: 'programming',
      level: 'Advanced',
      duration: '8 weeks',
      students: 650,
      rating: 4.9,
      progress: 0,
      image: '🎭',
      description: 'Create stunning animations and advanced CSS layouts',
      enrolled: false
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return '#27ae60';
      case 'Intermediate': return '#f39c12';
      case 'Advanced': return '#e74c3c';
      default: return '#7f8c8d';
    }
  };

  return (
    <div className="courses">
      <div className="courses-header">
        <h1>📚 My Courses</h1>
        <p>Continue your learning journey</p>
      </div>

      <div className="courses-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      <div className="courses-grid">
        {filteredCourses.map(course => (
          <div key={course.id} className={`course-card ${course.enrolled ? 'enrolled' : ''}`}>
            <div className="course-image">
              <span className="course-icon">{course.image}</span>
              {course.enrolled && (
                <div className="enrollment-badge">Enrolled</div>
              )}
            </div>

            <div className="course-content">
              <div className="course-meta">
                <span 
                  className="level-badge" 
                  style={{ backgroundColor: getLevelColor(course.level) }}
                >
                  {course.level}
                </span>
                <span className="duration">{course.duration}</span>
              </div>

              <h3 className="course-title">{course.title}</h3>
              <p className="course-instructor">by {course.instructor}</p>
              <p className="course-description">{course.description}</p>

              <div className="course-stats">
                <div className="stat">
                  <span className="stat-icon">👥</span>
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="stat">
                  <span className="stat-icon">⭐</span>
                  <span>{course.rating}</span>
                </div>
              </div>

              {course.enrolled && course.progress > 0 && (
                <div className="course-progress">
                  <div className="progress-info">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="course-actions">
                {course.enrolled ? (
                  <button className="btn-primary">
                    {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                  </button>
                ) : (
                  <button className="btn-secondary">Enroll Now</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
