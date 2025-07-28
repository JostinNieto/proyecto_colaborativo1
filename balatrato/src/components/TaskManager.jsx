import { useState } from 'react'

export default function TaskManager() {
  const [tareas, setTareas] = useState([
    {
      id: 1,
      nombre: "Diseñar interfaz",
      proyecto: "App Web CRM",
      fechaLimite: "2025-06-01",
      estado: "Pendiente"
    },
    {
      id: 2,
      nombre: "Revisión de código",
      proyecto: "Sistema Contable",
      fechaLimite: "2025-06-05",
      estado: "En progreso"
    },
    {
      id: 3,
      nombre: "Presentar informe",
      proyecto: "Auditoría interna",
      fechaLimite: "2025-06-10",
      estado: "Pendiente"
    }
  ])

  const [mostrarModalNueva, setMostrarModalNueva] = useState(false)
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false)
  const [tareaActual, setTareaActual] = useState(null)

  // Estados para nueva tarea
  const [nuevaTarea, setNuevaTarea] = useState({
    nombre: '',
    proyecto: '',
    fechaLimite: '',
    estado: 'Pendiente'
  })

  // Estados para editar tarea
  const [editarTarea, setEditarTarea] = useState({
    nombre: '',
    proyecto: '',
    fechaLimite: '',
    estado: ''
  })

  const abrirModalNueva = () => {
    setNuevaTarea({
      nombre: '',
      proyecto: '',
      fechaLimite: '',
      estado: 'Pendiente'
    })
    setMostrarModalNueva(true)
  }

  const cerrarModalNueva = () => {
    setMostrarModalNueva(false)
  }

  const guardarNuevaTarea = (e) => {
    e.preventDefault()
    if (nuevaTarea.nombre && nuevaTarea.proyecto && nuevaTarea.fechaLimite) {
      const nuevaId = Math.max(...tareas.map(t => t.id)) + 1
      setTareas([...tareas, { ...nuevaTarea, id: nuevaId }])
      cerrarModalNueva()
    } else {
      alert("Por favor completa todos los campos.")
    }
  }

  const abrirModalEditar = (tarea) => {
    setTareaActual(tarea)
    setEditarTarea({
      nombre: tarea.nombre,
      proyecto: tarea.proyecto,
      fechaLimite: tarea.fechaLimite,
      estado: tarea.estado
    })
    setMostrarModalEditar(true)
  }

  const cerrarModalEditar = () => {
    setMostrarModalEditar(false)
    setTareaActual(null)
  }

  const guardarEdicionTarea = (e) => {
    e.preventDefault()
    if (editarTarea.nombre && editarTarea.proyecto && editarTarea.fechaLimite) {
      setTareas(tareas.map(t => 
        t.id === tareaActual.id ? { ...tareaActual, ...editarTarea } : t
      ))
      cerrarModalEditar()
    } else {
      alert("Por favor completa todos los campos.")
    }
  }

  const marcarCompletada = (id) => {
    setTareas(tareas.map(t => 
      t.id === id ? { ...t, estado: "Completada" } : t
    ))
  }

  const eliminarTarea = (id) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
      setTareas(tareas.filter(t => t.id !== id))
    }
  }

  return (
    <section className="task-section">
      <h2>Tareas Asignadas</h2>
      <button onClick={abrirModalNueva} style={{ marginBottom: '20px' }}>
        Añadir Tarea
      </button>

      <div id="task-list">
        {tareas.map(tarea => (
          <div key={tarea.id} className="task-card">
            <h3>{tarea.nombre}</h3>
            <p><strong>Proyecto:</strong> {tarea.proyecto}</p>
            <p><strong>Fecha límite:</strong> {tarea.fechaLimite}</p>
            <p><strong>Estado:</strong> {tarea.estado}</p>
            
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => marcarCompletada(tarea.id)}
                className="complete-btn"
                style={{ backgroundColor: '#10b981' }}
              >
                Marcar como completada
              </button>
              <button 
                onClick={() => abrirModalEditar(tarea)}
                className="complete-btn"
                style={{ backgroundColor: '#f59e0b' }}
              >
                Editar
              </button>
              <button 
                onClick={() => eliminarTarea(tarea.id)}
                className="complete-btn"
                style={{ backgroundColor: '#ef4444' }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para Nueva Tarea */}
      {mostrarModalNueva && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={cerrarModalNueva}>&times;</span>
            <h3>Nueva Tarea</h3>
            <form onSubmit={guardarNuevaTarea}>
              <input
                type="text"
                placeholder="Nombre de la tarea"
                value={nuevaTarea.nombre}
                onChange={(e) => setNuevaTarea({...nuevaTarea, nombre: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Proyecto"
                value={nuevaTarea.proyecto}
                onChange={(e) => setNuevaTarea({...nuevaTarea, proyecto: e.target.value})}
                required
              />
              <input
                type="date"
                value={nuevaTarea.fechaLimite}
                onChange={(e) => setNuevaTarea({...nuevaTarea, fechaLimite: e.target.value})}
                required
              />
              <select
                value={nuevaTarea.estado}
                onChange={(e) => setNuevaTarea({...nuevaTarea, estado: e.target.value})}
                required
              >
                <option value="Pendiente">Pendiente</option>
                <option value="En progreso">En progreso</option>
                <option value="Completada">Completada</option>
              </select>
              <button type="submit">Guardar tarea</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal para Editar Tarea */}
      {mostrarModalEditar && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={cerrarModalEditar}>&times;</span>
            <h3>Editar Tarea</h3>
            <form onSubmit={guardarEdicionTarea}>
              <input
                type="text"
                placeholder="Nombre de la tarea"
                value={editarTarea.nombre}
                onChange={(e) => setEditarTarea({...editarTarea, nombre: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Proyecto"
                value={editarTarea.proyecto}
                onChange={(e) => setEditarTarea({...editarTarea, proyecto: e.target.value})}
                required
              />
              <input
                type="date"
                value={editarTarea.fechaLimite}
                onChange={(e) => setEditarTarea({...editarTarea, fechaLimite: e.target.value})}
                required
              />
              <select
                value={editarTarea.estado}
                onChange={(e) => setEditarTarea({...editarTarea, estado: e.target.value})}
                required
              >
                <option value="Pendiente">Pendiente</option>
                <option value="En progreso">En progreso</option>
                <option value="Completada">Completada</option>
              </select>
              <button type="submit">Guardar cambios</button>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}