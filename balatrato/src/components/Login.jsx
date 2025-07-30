import { useEffect, useState } from 'react'

export default function Login({ onLogin }) {
  const [usuarios, setUsuarios] = useState([])
  const [modoRegistro, setModoRegistro] = useState(false)
  const [mensaje, setMensaje] = useState('')

  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')

  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [confirmarClave, setConfirmarClave] = useState('')

  const [loaded, setLoaded] = useState(false)

  
  useEffect(() => {
    const almacenados = localStorage.getItem('usuarios')
    if (almacenados) {
      try {
        setUsuarios(JSON.parse(almacenados))
      } catch (error) {
        console.error("Error al parsear usuarios del localStorage", error)
        setUsuarios([])
      }
    }
    setLoaded(true)
  }, [])

  
  useEffect(() => {
    if (loaded) {
      localStorage.setItem('usuarios', JSON.stringify(usuarios))
    }
  }, [usuarios, loaded])

  const limpiarCampos = () => {
    setUsuario('')
    setClave('')
    setConfirmarClave('')
    setNombre('')
    setCorreo('')
  }

  const handleRegistro = (e) => {
    e.preventDefault()

    if (!usuario || !clave || !confirmarClave || !nombre || !correo) {
      setMensaje('Por favor completa todos los campos.')
      return
    }

    if (clave !== confirmarClave) {
      setMensaje('Las contraseñas no coinciden ❌')
      return
    }

    const yaExiste = usuarios.some(u => u.usuario === usuario)
    if (yaExiste) {
      setMensaje('El nombre de usuario ya está en uso ❌')
      return
    }

    const nuevoUsuario = { usuario, clave, nombre, correo }
    setUsuarios([...usuarios, nuevoUsuario])
    setMensaje('Cuenta creada con éxito ✅ Inicia sesión')
    setModoRegistro(false)
    limpiarCampos()
  }

  const handleLogin = (e) => {
    e.preventDefault()
    const encontrado = usuarios.find(u => u.usuario === usuario && u.clave === clave)
    if (encontrado) {
      setMensaje('Inicio de sesión exitoso ✅')
      onLogin(encontrado.nombre || usuario) 
      limpiarCampos()
    } else {
      setMensaje('Usuario o contraseña incorrectos ❌')
    }
  }

  return (
    <section className="container">
      <h2>{modoRegistro ? 'Crear cuenta' : 'Iniciar sesión'}</h2>

      <form onSubmit={modoRegistro ? handleRegistro : handleLogin}>
        {modoRegistro && (
          <>
            <div>
              <label>Nombre completo:</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div>
              <label>Correo electrónico:</label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>
          </>
        )}

        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
          />
        </div>

        {modoRegistro && (
          <div>
            <label>Confirmar contraseña:</label>
            <input
              type="password"
              value={confirmarClave}
              onChange={(e) => setConfirmarClave(e.target.value)}
            />
          </div>
        )}

        <button type="submit" style={{ marginTop: '10px' }}>
          {modoRegistro ? 'Crear cuenta' : 'Iniciar sesión'}
        </button>
      </form>

      {mensaje && <p style={{ marginTop: '10px' }}>{mensaje}</p>}

      <p style={{ marginTop: '20px' }}>
        {modoRegistro ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
        <button
          type="button"
          onClick={() => {
            setModoRegistro(!modoRegistro)
            setMensaje('')
            limpiarCampos()
          }}
          style={{
            background: 'none',
            color: '#2563eb',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline',
            padding: 0,
            fontWeight: 'bold',
          }}
        >
          {modoRegistro ? 'Iniciar sesión' : 'Crear una cuenta'}
        </button>
      </p>
    </section>
  )
}
