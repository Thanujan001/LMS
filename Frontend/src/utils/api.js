const API_URL = 'http://localhost:5000/api';

export const fetchClasses = async () => {
    const response = await fetch(`${API_URL}/classes`);
    if (!response.ok) throw new Error('Failed to fetch classes');
    return response.json();
};

export const addClass = async (classData, userRole) => {
    const response = await fetch(`${API_URL}/classes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-user-role': userRole
        },
        body: JSON.stringify(classData)
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add class');
    }
    return response.json();
};

export const updateClass = async (id, classData, userRole) => {
    const response = await fetch(`${API_URL}/classes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-user-role': userRole
        },
        body: JSON.stringify(classData)
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update class');
    }
    return response.json();
};

export const deleteClass = async (id, userRole) => {
    const response = await fetch(`${API_URL}/classes/${id}`, {
        method: 'DELETE',
        headers: {
            'x-user-role': userRole
        }
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete class');
    }
    return response.json();
};
