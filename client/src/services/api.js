import axios from 'axios';
import { MOCK_COURSES, MOCK_CATEGORIES } from './mockData';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Attach JWT token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('skillvault_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');

// Courses API
export const getCourses = async (params = {}) => {
  try {
    return await API.get('/courses', { params });
  } catch (error) {
    console.warn('API Error, falling back to mock courses:', error);
    let courses = [...MOCK_COURSES];
    const { category, search, sort } = params;

    if (category) {
      courses = courses.filter((c) => c.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      courses = courses.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (sort) {
      if (sort === 'popular') {
        courses.sort((a, b) => b.studentsEnrolled - a.studentsEnrolled);
      } else if (sort === 'rating') {
        courses.sort((a, b) => b.rating - a.rating);
      } else if (sort === 'price-low') {
        courses.sort((a, b) => a.price - b.price);
      } else if (sort === 'price-high') {
        courses.sort((a, b) => b.price - a.price);
      }
    }
    return {
      data: {
        courses,
        total: courses.length,
      },
    };
  }
};

export const getCourse = async (id) => {
  try {
    return await API.get(`/courses/${id}`);
  } catch (error) {
    console.warn(`API Error, falling back to mock course detail for ${id}:`, error);
    const course = MOCK_COURSES.find((c) => c._id === id);
    if (!course) throw error;
    return { data: { course } };
  }
};

export const getFeaturedCourses = async () => {
  try {
    return await API.get('/courses/featured');
  } catch (error) {
    console.warn('API Error, falling back to mock featured courses:', error);
    const courses = MOCK_COURSES.filter((c) => c.isBestseller);
    return { data: { courses } };
  }
};

export const getCategories = async () => {
  try {
    return await API.get('/courses/categories');
  } catch (error) {
    console.warn('API Error, falling back to mock categories:', error);
    return { data: { categories: MOCK_CATEGORIES } };
  }
};
export const enrollCourse = (id) => API.post(`/courses/${id}/enroll`);

// User API
export const getMyCourses = () => API.get('/users/my-courses');
export const updateProfile = (data) => API.put('/users/profile', data);

export default API;
