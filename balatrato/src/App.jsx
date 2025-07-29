import { useState } from 'react'
import Login from './components/Login'
import TaskManager from './components/TaskManager'
import Proyecto from './components/proyecto'

import './components/proyecto.css'

function App() {
  const [usuarioActual, setUsuarioActual] = useState(null)

  return (
    <div>
      <h1>Gestor de Proyectos Colaborativos</h1>

      {!usuarioActual ? (
        <Login onLogin={setUsuarioActual} />
      ) : (
        <>
          <p>Bienvenido, {usuarioActual} 👋</p>

          <div className="main-content">
            <div className="task-section">
              <TaskManager />
            </div>
            <div className="project-section">
              <Proyecto />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App


