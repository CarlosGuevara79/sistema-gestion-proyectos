import axios from 'axios';

export const getTareas = () => axios.get('/api/tareas').then(res => res.data);
export const getTarea = (id) => axios.get(`/api/tareas/${id}`).then(res => res.data);
export const crearTarea = (data) => axios.post('/api/tareas', data).then(res => res.data);
export const actualizarTarea = (id, data) => axios.put(`/api/tareas/${id}`, data).then(res => res.data);
export const eliminarTarea = (id) => axios.delete(`/api/tareas/${id}`);