import { useState } from 'react'

function TaskManager() {
  const [tareas, setTareas] = useState([
    {
      nombre: "Diseñar interfaz",
      proyecto: "App Web CRM",
      fechaLimite: "2025-06-01",
      estado: "Pendiente"
    },
    {
      nombre: "Revisión de código",
      proyecto: "Sistema Contable",
      fechaLimite: "2025-06-05",
      estado: "En progreso"
    },
    {
      nombre: "Presentar informe",
      proyecto: "Auditoría interna",
      fechaLimite: "2025-06-10",
      estado: "Pendiente"
    }
  ])

  const [tareaActualIndex, setTareaActualIndex] = useState(null)
  const [mostrarModalAdd, setMostrarModalAdd] = useState(false)
  const [mostrarModalEdit, setMostrarModalEdit] = useState(false)

  const [form, setForm] = useState({
    nombre: '',
    proyecto: '',
    fechaLimite: '',
    estado: 'Pendiente'
  })

  const abrirEditarTarea = (index) => {
    setTareaActualIndex(index)
    setForm(tareas[index])
    setMostrarModalEdit(true)
  }

  const guardarEdicionTarea = () => {
    const nuevasTareas = [...tareas]
    nuevasTareas[tareaActualIndex] = form
    setTareas(nuevasTareas)
    setMostrarModalEdit(false)
  }

  const eliminarTarea = (index) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
      setTareas(tareas.filter((_, i) => i !== index))
    }
  }

  const marcarCompletada = (index) => {
    const nuevasTareas = [...tareas]
    nuevasTareas[index].estado = "Completada"
    setTareas(nuevasTareas)
  }

  const agregarTarea = () => {
    setTareas([...tareas, form])
    setForm({ nombre: '', proyecto: '', fechaLimite: '', estado: 'Pendiente' })
    setMostrarModalAdd(false)
  }

  return (
    <div>
    <h2>Tareas Asignadas</h2>
      <button id="add-task-btn" onClick={() => setMostrarModalAdd(true)}>Añadir Tarea</button>

      <div id="task-list">
        {tareas.map((tarea, index) => (
          <div className="task-card" key={index}>
            <h3>{tarea.nombre}</h3>
            <p><strong>Proyecto:</strong> {tarea.proyecto}</p>
            <p><strong>Fecha límite:</strong> {tarea.fechaLimite}</p>
            <p><strong>Estado:</strong> {tarea.estado}</p>
            <button className="complete-btn" onClick={() => marcarCompletada(index)}>Marcar como completada</button>
            <button className="complete-btn" onClick={() => abrirEditarTarea(index)} style={{ backgroundColor: '#f59e0b' }}>Editar</button>
            <button className="complete-btn" onClick={() => eliminarTarea(index)} style={{ backgroundColor: '#ef4444' }}>Eliminar</button>
          </div>
        ))}
      </div>

      {mostrarModalAdd && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setMostrarModalAdd(false)}>&times;</span>
            <h3>Nueva Tarea</h3>
            <label>Nombre</label>
            <input value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
            <label>Proyecto</label>
            <input value={form.proyecto} onChange={e => setForm({ ...form, proyecto: e.target.value })} />
            <label>Fecha límite</label>
            <input type="date" value={form.fechaLimite} onChange={e => setForm({ ...form, fechaLimite: e.target.value })} />
            <label>Estado</label>
            <select value={form.estado} onChange={e => setForm({ ...form, estado: e.target.value })}>
              <option>Pendiente</option>
              <option>En progreso</option>
              <option>Completada</option>
            </select>
            <button id="save-new-task-btn" onClick={agregarTarea}>Guardar Tarea</button>
          </div>
        </div>
      )}

      {mostrarModalEdit && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setMostrarModalEdit(false)}>&times;</span>
            <h3>Editar Tarea</h3>
            <label>Nombre</label>
            <input value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
            <label>Proyecto</label>
            <input value={form.proyecto} onChange={e => setForm({ ...form, proyecto: e.target.value })} />
            <label>Fecha límite</label>
            <input type="date" value={form.fechaLimite} onChange={e => setForm({ ...form, fechaLimite: e.target.value })} />
            <label>Estado</label>
            <select value={form.estado} onChange={e => setForm({ ...form, estado: e.target.value })}>
              <option>Pendiente</option>
              <option>En progreso</option>
              <option>Completada</option>
            </select>
            <button id="save-edit-task-btn" onClick={guardarEdicionTarea}>Guardar Cambios</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskManager
