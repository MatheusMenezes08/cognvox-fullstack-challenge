import './App.css'
import { useEffect, useState } from 'react'

import FormPage from './pages/FormPage'
import GridPage from './pages/GridPage'
import LoginPage from './pages/LoginPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import DeleteProfilePage from './pages/DeleteProfilePage'


function App() {
  const [view, setView] = useState('login')
  const [hasToken, setHasToken] = useState(false)


  useEffect(() => {
    const syncView = () => {
      const hash = window.location.hash.replace('#', '')
      setView(hash || 'login')
      setHasToken(!!localStorage.getItem('access_token'))
    }

    syncView()
    window.addEventListener('hashchange', syncView)
    return () => window.removeEventListener('hashchange', syncView)
  }, [])

  const renderView = () => {
    if (view === 'grid') return <GridPage />
    if (view === 'form') return <FormPage />
    if (view === 'forgot') return <ForgotPasswordPage />
    if (view === 'delete') return <DeleteProfilePage />

    return <LoginPage />
  }
  

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    window.location.hash = '#login'
  }

  return (
    <div className="app-root">
      <div className="app-nav">
        <a href="#login">Login</a>
        <a href="#grid">Usuários</a>
        <a href="#form">Cadastro</a>
        <a href="#delete">Excluir</a>
        {hasToken && (
          <button
            type="button"
            className="app-nav-button"
            onClick={handleLogout}
          >
            Sair
          </button>
        )}
      </div>
      {renderView()}
    </div>
  )
}

export default App
