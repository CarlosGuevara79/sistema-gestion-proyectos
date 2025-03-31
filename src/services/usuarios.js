// services/usuarios.js
import axios from 'axios'

export const getUsuarios = () => axios.get('/api/usuarios').then(res => res.data)

export const editarUsuario = (id, data) =>
  axios.put(`/api/usuarios/${id}/editar-usuario`, data).then(res => res.data)
export const crearUsuario = (data) =>
  axios.post('/api/usuarios', data).then(res => res.data)