import axios from 'axios'

export const getRoles = () => axios.get('/api/roles').then(res => res.data)
