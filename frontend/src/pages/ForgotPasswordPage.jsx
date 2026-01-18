import { useState } from 'react'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (event) => {
  event.preventDefault()
  setStatus('')

  try {
    const response = await fetch('/api/auth/forgot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.error || 'Erro ao solicitar recuperacao')
    }

    setStatus(data.message || 'Se o email existir, enviaremos instrucoes.')
  } catch (error) {
    setStatus(error.message)
  }
  }


  return (
    <div className="container my-4">
      <h2 className="mb-3">Recuperar senha</h2>
      {status && <div className="alert alert-info">{status}</div>}
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Enviar
          </button>
        </div>
      </form>
    </div>
  )
}

export default ForgotPasswordPage
