import axios from 'axios';

export const getProyectos = () => axios.get('/api/proyectos').then(res => res.data);
export const getProyecto = (id) => axios.get(`/api/proyectos/${id}`).then(res => res.data);
export const crearProyecto = (data) => axios.post('/api/proyectos', data).then(res => res.data);
export const actualizarProyecto = (id, data) => axios.put(`/api/proyectos/${id}`, data).then(res => res.data);
export const eliminarProyecto = (id) => axios.delete(`/api/proyectos/${id}`);
export const getUsuariosDelProyecto = (proyectoId) =>  axios.get(`/api/proyectos/${proyectoId}/usuarios`).then(res => res.data)
export const asignarUsuarioAProyecto = (proyectoId, usuario_id) => axios.post(`/api/proyectos/${proyectoId}/asignar`, { usuario_id })
export const desasignarUsuarioDeProyecto = (proyectoId, usuario_id) => axios.post(`/api/proyectos/${proyectoId}/desasignar`, { usuario_id }).then(res => res.data)
  