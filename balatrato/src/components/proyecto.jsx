import { useEffect, useState } from 'react';

export default function ProjectManager() {
  const [proyectos, setProyectos] = useState([]);
  const [db, setDb] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [proyectoActual, setProyectoActual] = useState(null);

  const [formProyecto, setFormProyecto] = useState({
    nombre: '',
    integrantes: '',
    telefono: '',
    fechaInicio: '',
    fechaFin: '',
    descripcion: ''
  });

  // ===============================
  // INICIALIZAR BASE DE DATOS
  // ===============================
  useEffect(() => {
    const request = indexedDB.open("GestorProyectosDB", 1);

    request.onupgradeneeded = (e) => {
      const database = e.target.result;
      database.createObjectStore("proyectos", {
        keyPath: "id",
        autoIncrement: true
      });
    };

    request.onsuccess = (e) => {
      const database = e.target.result;
      setDb(database);
    };

    request.onerror = () => {
      console.error("Error al abrir IndexedDB");
    };
  }, []);

  useEffect(() => {
    if (db) cargarProyectosDesdeDB();
  }, [db]);

  function cargarProyectosDesdeDB() {
    const transaction = db.transaction(["proyectos"], "readonly");
    const store = transaction.objectStore("proyectos");
    const request = store.getAll();

    request.onsuccess = () => {
      setProyectos(request.result);
    };
  }

  function guardarProyectoEnDB(proyecto, esNuevo) {
    const transaction = db.transaction(["proyectos"], "readwrite");
    const store = transaction.objectStore("proyectos");

    if (esNuevo) {
      store.add(proyecto);
    } else {
      store.put(proyecto);
    }

    transaction.oncomplete = () => {
      cargarProyectosDesdeDB();
    };
  }

  function eliminarProyecto(id) {
    if (confirm("¿Estás seguro de que quieres eliminar este proyecto?")) {
      const transaction = db.transaction(["proyectos"], "readwrite");
      const store = transaction.objectStore("proyectos");
      store.delete(id);

      transaction.oncomplete = () => {
        cargarProyectosDesdeDB();
      };
    }
  }

  function abrirModal(proyecto = null) {
    setProyectoActual(proyecto);
    if (proyecto) {
      setFormProyecto({ ...proyecto });
    } else {
      setFormProyecto({
        nombre: '',
        integrantes: '',
        telefono: '',
        fechaInicio: '',
        fechaFin: '',
        descripcion: ''
      });
    }
    setMostrarModal(true);
  }

  function cerrarModal() {
    setMostrarModal(false);
    setProyectoActual(null);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormProyecto(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function guardarProyecto(e) {
    e.preventDefault();
    const { nombre, integrantes, telefono, fechaInicio, fechaFin, descripcion } = formProyecto;

    const telefonoValido = /^\d{10}$/.test(telefono);
    if (!telefonoValido) {
      alert("El número de teléfono debe contener exactamente 10 dígitos.");
      return;
    }

    if (nombre && integrantes && telefono && fechaInicio && fechaFin && descripcion) {
      const proyectoAGuardar = { ...formProyecto };
      if (proyectoActual) {
        guardarProyectoEnDB(proyectoAGuardar, false);
      } else {
        guardarProyectoEnDB(proyectoAGuardar, true);
      }
      cerrarModal();
    } else {
      alert("Por favor completa todos los campos.");
    }
  }

  return (
    <section className="project-section">
      <h2>Gestor de Proyectos</h2>
      <button onClick={() => abrirModal()} style={{ marginBottom: '20px' }}>
        Añadir Proyecto
      </button>

      <div id="project-list">
        {proyectos.map((proyecto) => (
          <div key={proyecto.id} className="project-item">
            <h3>{proyecto.nombre}</h3>
            <p><strong>Integrantes:</strong> {proyecto.integrantes}</p>
            <p><strong>Teléfono:</strong> {proyecto.telefono}</p>
            <p><strong>Fecha inicio:</strong> {proyecto.fechaInicio}</p>
            <p><strong>Fecha fin:</strong> {proyecto.fechaFin}</p>
            <p><strong>Descripción:</strong> {proyecto.descripcion}</p>

            <button
              className="complete-btn"
              style={{ backgroundColor: '#f59e0b' }}
              onClick={() => abrirModal(proyecto)}
            >
              Editar
            </button>
            <button
              className="complete-btn"
              style={{ backgroundColor: '#ef4444' }}
              onClick={() => eliminarProyecto(proyecto.id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {mostrarModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={cerrarModal}>&times;</span>
            <h3>{proyectoActual ? 'Editar Proyecto' : 'Nuevo Proyecto'}</h3>
            <form onSubmit={guardarProyecto}>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre del proyecto"
                value={formProyecto.nombre}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="integrantes"
                placeholder="Integrantes"
                value={formProyecto.integrantes}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="telefono"
                placeholder="Teléfono (10 dígitos)"
                value={formProyecto.telefono}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="fechaInicio"
                value={formProyecto.fechaInicio}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="fechaFin"
                value={formProyecto.fechaFin}
                onChange={handleChange}
                required
              />
              <textarea
                name="descripcion"
                placeholder="Descripción del proyecto"
                value={formProyecto.descripcion}
                onChange={handleChange}
                required
              />
              <button type="submit">
                {proyectoActual ? 'Guardar Cambios' : 'Guardar Proyecto'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
