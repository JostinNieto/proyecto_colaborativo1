import { useState } from 'react'

export default function Login() {
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    // Aquí puedes poner tu lógica real de validación
    if (usuario === 'admin' && clave === '1234') {
      setMensaje('Inicio de sesión exitoso ✅')
    } else {
      setMensaje('Credenciales incorrectas ❌')
    }
  }

  return (
    <section>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario: </label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Ingrese su usuario"
          />
        </div>
        <div>
          <label>Contraseña: </label>
          <input
            type="password"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            placeholder="Ingrese su contraseña"
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </section>
  )
}

