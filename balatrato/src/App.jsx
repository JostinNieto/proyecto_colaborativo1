import { useState } from 'react'
import Login from './components/Login'
import TaskManager from './components/TaskManager'

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
        <div className="main-content"></div>
          <p>Bienvenido, {usuarioActual} 👋</p>
           <TaskManager />
        </>
      )}
    </div>
  )
}

export default App
