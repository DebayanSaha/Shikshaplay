import axios from 'axios';
import { BASE_URL } from './config';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add token to requests
api.interceptors.request.use(
  async (config) => {
    // Try to get teacher token first, then student token
    const teacherToken = localStorage.getItem('teacherToken');
    const studentToken = localStorage.getItem('studentToken');
    
    const token = teacherToken || studentToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Clear both tokens on 401
      localStorage.removeItem('teacherToken');
      localStorage.removeItem('teacherData');
      localStorage.removeItem('studentToken');
      localStorage.removeItem('studentData');
      
      // Note: Navigation should be handled by the component that receives the error
      // We can't navigate directly from here without navigation reference
    }
    
    // Log error for debugging
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });
    
    return Promise.reject(error);
  }
);

// ==================== AUTHENTICATION ====================

/**
 * Register a new teacher
 * @param {Object} teacherData - { teacherId, password, schoolName, name, email, phone }
 */
export const registerTeacher = async (teacherData) => {
  try {
    const response = await api.post('/teachers/register', teacherData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Login teacher
 * @param {Object} credentials - { teacherId, password, schoolName }
 */
export const loginTeacher = async (credentials) => {
  try {
    const response = await api.post('/teachers/login', credentials);
    const { token, teacher } = response.data;
    
    // Store token and teacher data
    localStorage.setItem('teacherToken', token);
    localStorage.setItem('teacherData', JSON.stringify(teacher));
    
    return { token, teacher };
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Get current teacher data
 */
export const getCurrentTeacher = async () => {
  try {
    const response = await api.get('/teachers/me');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Logout (clear stored data)
 */
export const logoutTeacher = async () => {
  localStorage.removeItem('teacherToken');
  localStorage.removeItem('teacherData');
};

// ==================== STUDENT AUTHENTICATION ====================

/**
 * Register a new student
 * @param {Object} studentData - { studentId, password, schoolName, name, email, phone, class, address }
 */
export const registerStudent = async (studentData) => {
  try {
    const response = await api.post('/student-auth/register', studentData);
    const { token, student } = response.data;
    
    // Store token and student data
    localStorage.setItem('studentToken', token);
    localStorage.setItem('studentData', JSON.stringify(student));
    
    return { token, student };
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Login student
 * @param {Object} credentials - { studentId, password, schoolName }
 */
export const loginStudent = async (credentials) => {
  try {
    const response = await api.post('/student-auth/login', credentials);
    const { token, student } = response.data;
    
    // Store token and student data
    localStorage.setItem('studentToken', token);
    localStorage.setItem('studentData', JSON.stringify(student));
    
    return { token, student };
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Get current student data
 */
export const getCurrentStudent = async () => {
  try {
    const response = await api.get('/student-auth/me');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Logout student (clear stored data)
 */
export const logoutStudent = async () => {
  localStorage.removeItem('studentToken');
  localStorage.removeItem('studentData');
};

// ==================== STUDENT MEETINGS & INTERACTIONS ====================

/**
 * Get all meetings for the current student
 */
export const getStudentMeetings = async () => {
  try {
    const response = await api.get('/student-meetings');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Get all teachers in the same school
 */
export const getStudentTeachers = async () => {
  try {
    const response = await api.get('/student-meetings/teachers');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ==================== NOTES ====================

/**
 * Get all notes
 */
export const getNotes = async () => {
  try {
    const response = await api.get('/notes');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Upload a note (PDF/DOC)
 * @param {Object} formData - FormData with file and metadata
 */
export const uploadNote = async (formData) => {
  try {
    const response = await api.post('/notes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Delete a note
 * @param {String} noteId - Note ID
 */
export const deleteNote = async (noteId) => {
  try {
    const response = await api.delete(`/notes/${noteId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ==================== STUDENTS ====================

/**
 * Get all students
 */
export const getStudents = async () => {
  try {
    const response = await api.get('/students');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Get student by ID
 * @param {String} studentId - Student ID
 */
export const getStudentById = async (studentId) => {
  try {
    const response = await api.get(`/students/${studentId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ==================== MEETINGS ====================

/**
 * Get all meetings
 */
export const getMeetings = async () => {
  try {
    const response = await api.get('/meetings');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Create a meeting
 * @param {Object} meetingData - { title, description, date, time, studentId }
 */
export const createMeeting = async (meetingData) => {
  try {
    const response = await api.post('/meetings', meetingData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Update a meeting
 * @param {String} meetingId - Meeting ID
 * @param {Object} meetingData - Updated meeting data
 */
export const updateMeeting = async (meetingId, meetingData) => {
  try {
    const response = await api.put(`/meetings/${meetingId}`, meetingData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Delete a meeting
 * @param {String} meetingId - Meeting ID
 */
export const deleteMeeting = async (meetingId) => {
  try {
    const response = await api.delete(`/meetings/${meetingId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ==================== EXAMS ====================

/**
 * Get all exams
 */
export const getExams = async () => {
  try {
    const response = await api.get('/exams');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Create an exam
 * @param {Object} examData - { title, description, date, questions: [{ question, options, correctAnswer }] }
 */
export const createExam = async (examData) => {
  try {
    const response = await api.post('/exams', examData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Update an exam
 * @param {String} examId - Exam ID
 * @param {Object} examData - Updated exam data
 */
export const updateExam = async (examId, examData) => {
  try {
    const response = await api.put(`/exams/${examId}`, examData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Delete an exam
 * @param {String} examId - Exam ID
 */
export const deleteExam = async (examId) => {
  try {
    const response = await api.delete(`/exams/${examId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ==================== HEALTH CHECK ====================

/**
 * Health check endpoint
 */
export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;