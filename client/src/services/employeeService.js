import axios from 'axios';

export const getEmployees = async (params) => {
    try {
        const response = await axios.get('/api/employees', {
            params: params,
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw new Error('Failed to fetch employees');
    }
};

export const addEmployee = async (employee) => {
    try {
        const response = await axios.post('/api/employees/add', employee, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        });
        return response.data; // Return the response data containing the new employee
    } catch (error) {
        console.error('Error adding employee:', error);
        if (error.response && error.response.data && error.response.data.error) {
            throw new Error(error.response.data.error.message);
        } else {
            throw new Error('Failed to add employee');
        }
    }
};

export const updateEmployee = async (id, updatedEmployee) => {
    try {
        const response = await axios.put(`/api/employees/${id}`, updatedEmployee, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error updating employee:', error);
        throw new Error('Failed to update employee');
    }
};

export const deleteEmployee = async (id) => {
    try {
        const response = await axios.delete(`/api/employees/${id}`, {withCredentials: true});
        return response.data;
    } catch (error) {
        console.error('Error deleting employee:', error);
        throw new Error('Failed to delete employee');
    }
};



