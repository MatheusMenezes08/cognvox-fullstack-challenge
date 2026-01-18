import { useState } from 'react'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      localStorage.setItem('access_token', data.access_token)
      setStatus('Login OK. Token salvo no navegador.')
    } catch (error) {
      setStatus(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="loginsection">
      <div className="glasscard">
        <div className="avatarwrapper">
          <img
            loading="lazy"
            src="/templates/login_files/estudantesCognvox.png"
            alt="Cognvox"
          />
        </div>

        <div className="icons">
          <a
            href="https://cognvox.com.br/"
            target="_blank"
            rel="noreferrer"
            title="Abrir site da Cognvox"
          >
            <img
              loading="lazy"
              src="/templates/login_files/web.svg"
              alt="Site Cognvox"
              width="24"
              height="24"
              className="iconstyle-2 coffee"
            />
          </a>
          <a
            href="https://www.instagram.com/cognvox?igsh=MXRyMWh6MXZ0bGp1NQ=="
            target="_blank"
            rel="noreferrer"
            title="Abrir Instagram da Cognvox"
          >
            <img
              loading="lazy"
              src="/templates/login_files/instagram.svg"
              alt="Instagram"
              width="24"
              height="24"
              className="iconstyle-2 heart"
            />
          </a>
          <a href="mailto:suporte@cognvox.com.br" title="Enviar email de suporte">
            <img
              loading="lazy"
              src="/templates/login_files/at-sign.svg"
              alt="Suporte por email"
              className="iconstyle-2 email"
            />
          </a>
        </div>

        <div className="contentwrapper">
          <div className="innercontent">
            <div className="centeredcontent">
              <img
                loading="lazy"
                src="/templates/login_files/logoOficial.png"
                alt="Cognvox"
              />
              <div className="textwrapper my-3">
                <div className="tit_lablemaiusc">Area Restrita</div>
              </div>

              <div className="w-form">
                <form onSubmit={handleSubmit} className="login-form">
                  <input
                    type="email"
                    className="inputlogin w-input"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                  <input
                    type="password"
                    className="inputlogin senha w-input"
                    placeholder="Senha"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />

                  <div className="div-block-24 row">
                    <div className="col-md-6" id="entrar">
                      <button
                        type="submit"
                        className="bt_login w-button"
                        disabled={loading}
                      >
                        {loading ? 'Aguarde...' : 'ENTRAR'}
                      </button>
                    </div>
                    {loading && (
                    <div className="col-md-6" id="aguarde">
                      <img
                        src="/templates/login_files/aguarde.gif"
                        height="50"
                        alt="Aguarde"
                      />
                    </div>
                    )}
                    <div className="col-md-12 my-2">
                      <a className="esqueceuasenha" href="#forgot">Esqueceu a Senha?</a>
                    </div>
                  </div>
                </form>
              </div>

              {status && <div className="login-status">{status}</div>}
            </div>
          </div>
        </div>
      </div>

      <div className="blurbg"></div>
      <div className="overlay"></div>
    </div>
  )
}

export default LoginPage
