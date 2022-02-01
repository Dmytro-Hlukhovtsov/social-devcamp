import { apiClient } from '../../../config/axios';

export const getProfiles = async () => apiClient.get('/profiles');

export const getProfile = async (id) => apiClient.get(`/profiles/${id}`);

export const editProfile = async (id, data) => apiClient.put(`/profiles/${id}`, data);

export const getEditProfile = async (id) => apiClient.get(`/profiles/${id}/edit`);

export const getProfilePosts = async (id) => apiClient.get(`/profiles/${id}/posts`);
