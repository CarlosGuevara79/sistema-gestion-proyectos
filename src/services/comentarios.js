import axios from 'axios'

export const getComentariosByTarea = (tareaId) => axios.get(`/api/comentarios?tarea_id=${tareaId}`).then(res => res.data);

export const crearComentario = (data) => axios.post('/api/comentarios', data).then(res => res.data);
