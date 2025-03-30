import axios from 'axios';

export const getTareas = () => axios.get('/api/tareas').then(res => res.data);
export const getTarea = (id) => axios.get(`/api/tareas/${id}`).then(res => res.data);
export const getTareasByUserId = (usuario_id) => axios.get('/api/tareas', { params: { usuario_id } }).then(res => res.data)
export const crearTarea = (data) => axios.post('/api/tareas', data).then(res => res.data);
export const actualizarTarea = (id, data) => axios.put(`/api/tareas/${id}`, data).then(res => res.data);
export const eliminarTarea = (id) => axios.delete(`/api/tareas/${id}`);
export const editarTarea = (id, data) => axios.put(`/api/tareas/${id}`, data).then(res => res.data)
export const getTareasByProyecto = async (proyecto_id) => {
    const { data } = await axios.get(`/api/tareas?proyecto_id=${proyecto_id}`)
    return data
  }
  export const getComentariosByTarea = (tareaId) => axios.get(`/api/tareas/${tareaId}/comentarios`).then(res => res.data);
export const crearComentario = (data) => axios.post('/api/comentarios', data).then(res => res.data);