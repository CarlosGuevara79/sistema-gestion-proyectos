/// se movio hacia el dashboard 

// // src/pages/proyectos/index.js
// import { useQuery } from '@tanstack/react-query'
// import { getProyectos } from '@/services/proyectos'
// import Link from 'next/link'

// export default function ListaProyectos() {
//   const { data: proyectos, isLoading } = useQuery({
//     queryKey: ['proyectos'],
//     queryFn: getProyectos
//   })

//   if (isLoading) return <p className="p-10">Cargando proyectos...</p>

//   return (
//     <div className="p-6">
//        <Link href={`/dashboard`}>
//       <h1 className="text-3xl font-bold mb-6">Mis Proyectos</h1>
//     </Link>
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//         {proyectos?.map((proyecto) => (
//           <Link
//             key={proyecto.id}
//             href={`/proyectos/${proyecto.id}`}
//             className="border p-4 rounded shadow hover:shadow-lg transition bg-white"
//           >
//             <h2 className="text-xl font-semibold">{proyecto.nombre}</h2>
//             <p className="text-gray-600 mt-2 line-clamp-2">{proyecto.descripcion}</p>
//             <div className="mt-4 flex justify-between text-sm text-gray-500">
//               <span>Inicio: {proyecto.fecha_inicio || 'N/D'}</span>
//               <span>Fin: {proyecto.fecha_fin || 'N/D'}</span>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   )
// }


// // import { useState } from 'react';
// // import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// // import { getProyectos, crearProyecto, eliminarProyecto } from '@/services/proyectos';
// // import Link from 'next/link';
// // import { useAuth } from '@/context/AuthContext'

// // export default function Proyectos() {
  
// //   const queryClient = useQueryClient();
// //   const { user } = useAuth()
// //   const esAdminOGerente = user?.rol === 'Administrador' || user?.rol === 'Gerente'
// //   // Obtener proyectos de la base de datos
// //   const { data: proyectos, isLoading, error } = useQuery({
// //     queryKey: ['proyectos'],
// //     queryFn: getProyectos,
// //   });

// //   // Estado del formulario
// //   const [form, setForm] = useState({ nombre: '', descripcion: '' });

// //   // Mutación para crear proyecto
// //   const crearMutation = useMutation({
// //     mutationFn: crearProyecto,
// //     onSuccess: () => {
// //       queryClient.invalidateQueries(['proyectos']);
// //       setForm({ nombre: '', descripcion: '' });
// //     },
// //   });

// //   // Mutación para eliminar proyecto
// //   const eliminarMutation = useMutation({
// //     mutationFn: eliminarProyecto,
// //     onSuccess: () => queryClient.invalidateQueries(['proyectos']),
// //   });

// //   if (isLoading) return <div className="p-10">Cargando proyectos...</div>;
// //   if (error) return <div className="p-10">Error cargando proyectos</div>;

// //   return (
// //     <div className="p-10">
// //       <Link href="/dashboard">
// //         <h1 className="text-3xl font-bold mb-6">Gestión de Proyectos</h1>
// //       </Link>

// //       {/* Formulario para crear proyecto */}
// //       {esAdminOGerente && (
// //         <div className="mb-4 bg-white p-6 rounded shadow">
// //           <h2 className="text-xl font-bold mb-2">Crear nuevo proyecto</h2>
// //           <input
// //             type="text"
// //             placeholder="Nombre del proyecto"
// //             value={form.nombre}
// //             onChange={e => setForm({ ...form, nombre: e.target.value })}
// //             className="border rounded p-2 w-full mb-2"
// //           />
// //           <textarea
// //             placeholder="Descripción"
// //             value={form.descripcion}
// //             onChange={e => setForm({ ...form, descripcion: e.target.value })}
// //             className="border rounded p-2 w-full mb-2"
// //           />
// //           <button
// //             onClick={() => crearMutation.mutate(form)}
// //             className="bg-green-500 text-white py-2 px-4 rounded"
// //           > Guardar Proyecto
// //           </button>
// //         </div>
// //       )}

// //       {/* Lista de proyectos */}
// //       <div className="grid gap-4">
// //         {proyectos.map((proyecto) => (
// //           <div key={proyecto.id} className="p-4 bg-white shadow rounded flex justify-between items-center">
// //             <Link href={`/proyectos/${proyecto.id}`} className="font-bold">
// //               {proyecto.nombre}
// //             </Link>
// //             {esAdminOGerente && (
// //               <button onClick={() => eliminarMutation.mutate(proyecto.id)} className="text-red-500">
// //                 Eliminar
// //               </button>
// //             )}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }
