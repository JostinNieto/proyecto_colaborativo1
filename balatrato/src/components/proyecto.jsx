import { useState } from 'react';

function Proyecto() {
  const [proyectos, setProyectos] = useState([
    {
      nombre: "Rediseño Web",
      integrantes: "Juan, María",
      telefono: "0999999999",
      fechaInicio: "2025-05-01",
      fechaFin: "2025-06-01",
      descripcion: "Actualización de la interfaz web."
    },
    {
      nombre: "Implementación CRM",
      integrantes: "Pedro, Ana",
      telefono: "0988888888",
      fechaInicio: "2025-05-10",
      fechaFin: "2025-07-15",
      descripcion: "Integración de un CRM para ventas."
    }
  ]);

  const [proyectoActualIndex, setProyectoActualIndex] = useState(null);
  const [formulario, setFormulario] = useState({
    nombre: "",
    integrantes: "",
    telefono: "",
    fechaInicio: "",
    fechaFin: "",
    descripcion: ""
  });
  const [modalAbierto, setModalAbierto] = useState(false);

  const abrirModal = (index = null) => {
    if (index !== null) {
      setFormulario(proyectos[index]);
      setProyectoActualIndex(index);
    } else {
      setFormulario({
        nombre: "",
        integrantes: "",
        telefono: "",
        fechaInicio: "",
        fechaFin: "",
        descripcion: ""
      });
      setProyectoActualIndex(null);
    }
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setFormulario({
      nombre: "",
      integrantes: "",
      telefono: "",
      fechaInicio: "",
      fechaFin: "",
      descripcion: ""
    });
    setProyectoActualIndex(null);
  };

  const guardarProyecto = () => {
    const { nombre, integrantes, telefono, fechaInicio, fechaFin, descripcion } = formulario;

    if (nombre && integrantes && telefono && fechaInicio && fechaFin && descripcion) {
      if (proyectoActualIndex === null) {
        setProyectos([...proyectos, formulario]);
      } else {
        const nuevosProyectos = [...proyectos];
        nuevosProyectos[proyectoActualIndex] = formulario;
        setProyectos(nuevosProyectos);
      }
      cerrarModal();
    } else {
      alert("Por favor completa todos los campos.");
    }
  };

  const eliminarProyecto = (index) => {
    if (confirm("¿Estás seguro de que quieres eliminar este proyecto?")) {
      const nuevosProyectos = proyectos.filter((_, i) => i !== index);
      setProyectos(nuevosProyectos);
    }
  };

  return (
    <div>
      <h2>Proyectos</h2>
      <button id="add-project-btn" onClick={() => abrirModal()}>
        Añadir Proyecto
      </button>

      <div id="project-list">
        {proyectos.map((proyecto, index) => (
          <div className="project-item" key={index}>
            <h3>{proyecto.nombre}</h3>
            <p><strong>Integrantes:</strong> {proyecto.integrantes}</p>
            <p><strong>Teléfono:</strong> {proyecto.telefono}</p>
            <p><strong>Fecha inicio:</strong> {proyecto.fechaInicio}</p>
            <p><strong>Fecha fin:</strong> {proyecto.fechaFin}</p>
            <p><strong>Descripción:</strong> {proyecto.descripcion}</p>
            <button
              className="complete-btn"
              style={{ backgroundColor: "#f59e0b" }}
              onClick={() => abrirModal(index)}
            >
              Editar
            </button>
            <button
              className="complete-btn"
              style={{ backgroundColor: "#ef4444" }}
              onClick={() => eliminarProyecto(index)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {modalAbierto && (
        <div className="modal">
          <div className="modal-content">
            <span id="close-modal" className="close" onClick={cerrarModal}>&times;</span>

            <input
              id="project-name"
              type="text"
              placeholder="Nombre del proyecto"
              value={formulario.nombre}
              onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
            />
            <input
              id="project-members"
              type="text"
              placeholder="Integrantes"
              value={formulario.integrantes}
              onChange={(e) => setFormulario({ ...formulario, integrantes: e.target.value })}
            />
            <input
              id="project-phone"
              type="text"
              placeholder="Teléfono"
              value={formulario.telefono}
              onChange={(e) => setFormulario({ ...formulario, telefono: e.target.value })}
            />
            <input
              id="project-start"
              type="date"
              value={formulario.fechaInicio}
              onChange={(e) => setFormulario({ ...formulario, fechaInicio: e.target.value })}
            />
            <input
              id="project-end"
              type="date"
              value={formulario.fechaFin}
              onChange={(e) => setFormulario({ ...formulario, fechaFin: e.target.value })}
            />
            <textarea
              id="project-desc"
              placeholder="Descripción"
              value={formulario.descripcion}
              onChange={(e) => setFormulario({ ...formulario, descripcion: e.target.value })}
            ></textarea>

            <button id="save-project-btn" onClick={guardarProyecto}>
              Guardar Proyecto
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Proyecto;
  