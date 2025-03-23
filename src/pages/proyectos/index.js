import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProyectos, crearProyecto, eliminarProyecto } from '@/services/proyectos';
import Link from 'next/link';

export default function Proyectos() {
  const queryClient = useQueryClient();

  // Obtener proyectos de la base de datos
  const { data: proyectos, isLoading, error } = useQuery({
    queryKey: ['proyectos'],
    queryFn: getProyectos,
  });

  // Estado del formulario
  const [form, setForm] = useState({ nombre: '', descripcion: '' });

  // Mutación para crear proyecto
  const crearMutation = useMutation({
    mutationFn: crearProyecto,
    onSuccess: () => {
      queryClient.invalidateQueries(['proyectos']);
      setForm({ nombre: '', descripcion: '' });
    },
  });

  // Mutación para eliminar proyecto
  const eliminarMutation = useMutation({
    mutationFn: eliminarProyecto,
    onSuccess: () => queryClient.invalidateQueries(['proyectos']),
  });

  if (isLoading) return <div className="p-10">Cargando proyectos...</div>;
  if (error) return <div className="p-10">Error cargando proyectos</div>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Gestión de Proyectos</h1>

      {/* Formulario para crear proyecto */}
      <div className="bg-white shadow rounded p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Nuevo Proyecto</h2>
        <input
          className="w-full p-2 border rounded mb-2"
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
        <textarea
          className="w-full p-2 border rounded mb-2"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        />
        <button
          onClick={() => crearMutation.mutate(form)}
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Crear Proyecto
        </button>
      </div>

      {/* Lista de proyectos */}
      <div className="grid gap-4">
        {proyectos.map((proyecto) => (
          <div key={proyecto.id} className="p-4 bg-white shadow rounded flex justify-between items-center">
            <Link href={`/proyectos/${proyecto.id}`} className="font-bold">
              {proyecto.nombre}
            </Link>
            <button
              onClick={() => eliminarMutation.mutate(proyecto.id)}
              className="text-red-500"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
