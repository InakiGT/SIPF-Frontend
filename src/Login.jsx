import { createEffect, createSignal } from 'solid-js';
import styles from './App.module.css';
import Api from './helpers/api';
import { getToken, setToken } from './helpers/token';
import { useNavigate } from '@solidjs/router';

function Login() {
  const api = new Api('http://localhost:5024/api/Autenticacion/Validar');
  const navigate = useNavigate();

  const [ credentials, setCredentials ] = createSignal({
    email: '',
    password: '',
  });

  const [ error, setError ] = createSignal(null);
  const [ cToken, setCToken ] = createSignal(null);

  createEffect(() => {
    setCToken(getToken());
  });

  createEffect(() => {
    if (cToken()) {
      navigate('/');
    }
  });

  const login = async (e) => {
    e.preventDefault();

    if (credentials().email.trim() === '' || credentials().password.trim() === '') {
      setError('Los campos no pueden ir vacíos');

      setTimeout(() => {
        setError(null);
      }, 4000);

      return;
    }
    
    const response = await api.Post({
      email: credentials().email,
      contrasena: credentials().password,
    });

    if (response.status !== 200) {
      setError('Hubo un error, favor de intentar más tarde');

      return;
    }

    const token = response.data.token;

    setToken(token);
    setCToken(token);
  }

  return (
    <div class={`${ styles.verticalCenter } ${ styles.loginBg }`}>
      <div class={ styles.loginCard }>
        <img
          src='https://th.bing.com/th/id/OIG2.Cpvv9ZqmkDzkaY181rLS?w=1024&h=1024&rs=1&pid=ImgDetMain'
        />
        <div class={ styles.loginCardContent }>
          <p class={ styles.loginWelcome }>Bienvenido</p>
          <p class={ styles.loginInstructions }>Ingresa a tu cuenta</p>
          <form>

            { error() ? (
              <div class={ styles.errorCard }><p>{ error() }</p></div>
            ) : ( <></>) }

            <div class={ styles.loginInput }>
              <label>Email:</label>
              <input
                type='email'
                placeholder='correo@gmail.com'
                class={ styles.mainInput }
                value={ credentials().email }
                onInput={ (e) => setCredentials({ ...credentials(), email: e.target.value }) }
                />
            </div>
            <div class={ styles.loginInput }>
              <label>Contraseña:</label>
              <input
                type='password'
                placeholder='Contraseña'
                class={ styles.mainInput }
                value={ credentials().password }
                onInput={ (e) => setCredentials({ ...credentials(), password: e.target.value }) }
              />
            </div>
            <div>
              <p>¿Olvidaste tu contraseña?</p>
            </div>

            <div class={ styles.buttonContainer }>
              <button
                type='submit'
                class={ styles.mainButton }
                onClick={ (e) => login(e) }
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
