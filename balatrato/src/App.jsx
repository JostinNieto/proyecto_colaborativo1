import { useState } from 'react'
import Login from './components/Login'

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
        </>
      )}
    </div>
  )
}

export default App
