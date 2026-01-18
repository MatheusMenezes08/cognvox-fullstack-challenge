import { useEffect, useState } from 'react'

const GridPage = () => {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      setStatus('Faça login para listar usuários.')
      return
    }

    const loadUsers = async () => {
      try {
        const response = await fetch('/api/users/', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.error || 'Erro ao buscar usuários')
        }
        setUsers(data)
      } catch (error) {
        setStatus(error.message)
      }
    }

    loadUsers()
  }, [])

  return (
    <div className="container my-4">
      <h2 className="mb-3">Usuários</h2>
      {status && <div className="alert alert-warning">{status}</div>}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default GridPage
