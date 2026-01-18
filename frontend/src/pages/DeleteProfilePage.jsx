import { useState } from 'react'

const DeleteProfilePage = () => {
  const [status, setStatus] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('')

    const token = localStorage.getItem('access_token')
    if (!token) {
      setStatus('Faca login para excluir.')
      return
    }

    try {
      const meResponse = await fetch('/api/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const meData = await meResponse.json()
      if (!meResponse.ok) {
        throw new Error(meData.error || 'Erro ao buscar usuario')
      }

      const deleteResponse = await fetch(`/api/users/${meData.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      const deleteData = await deleteResponse.json()
      if (!deleteResponse.ok) {
        throw new Error(deleteData.error || 'Erro ao excluir usuario')
      }

      setStatus('Perfil excluido com sucesso.')
      localStorage.removeItem('access_token')
    } catch (error) {
      setStatus(error.message)
    }
  }

  return (
    <div className="container my-4">
      <h2 className="mb-3">Excluir perfil</h2>
      {status && <div className="alert alert-warning">{status}</div>}
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-12">
          <p>Essa ação exclui o seu proprio perfil.</p>
        </div>
        <div className="col-12">
          <button className="btn btn-danger" type="submit">
            Excluir meu perfil
          </button>
        </div>
      </form>
    </div>
  )
}

export default DeleteProfilePage
