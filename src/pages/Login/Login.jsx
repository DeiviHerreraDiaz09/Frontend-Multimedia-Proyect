import "./Login.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../../services/loginService"
import { useEffect } from "react";
import { userInfo } from "../../services/loginService";


const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const navegate = useNavigate();
  const [errorService, setErrorService] = useState(null);

  const loginData = async (data) => {
    try {
      let { correo, clave } = data; 
      const credentials = { correo, clave }
      const response = await auth(credentials)
      const join = response.token_type + " " + response.token
      sessionStorage.setItem("token", join)
      const infoUser = await userInfo(join)

      const infoUserToString = JSON.stringify(infoUser);

      sessionStorage.setItem("userInfo", infoUserToString)
      navegate("/dashboardTest")
    } catch (error) {
      setErrorService(error)
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("userInfo") != null) {
      navegate("/Dashboard")
    }
  
  }, [navegate])

  return (
    <div className="loginContainer">
      <div className="containerOne">
        <div className="login">
          <h1>Fedora</h1>
          <h3>El lugar perfecto para ti</h3>

          {errorService != null && (
            <>
              <p className="errorMessage">EL usuario o la contraseña no son correctos</p>
            </>
          )}

          <label htmlFor="">Correo</label>
          <input type="text" placeholder="example@dominio.com" {...register("correo", { required: "El correo es obligatorio"})}/>
          {errors.correo && <p className="errorMessage">{errors.correo.message}</p>}

          <label htmlFor="">Contraseña</label>
          <input type="password" placeholder="**********" {...register("clave", { required: "El correo es obligatorio"})} />
          {errors.clave && <p className="errorMessage">Este campo es requerido</p>}

          <div className="options">
            <div className="remember">
              <input type="checkbox" />
              <h5>Recuerdame</h5>
            </div>

            <div className="forgerPassword">
              <a href="">Olvide mi contraseña</a>
            </div>
          </div>

          <div className="icons">
            <a
              href="https://www.google.com"
              target="_blank"
              className="cardIconG">
              <div></div>
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              className="cardIconF">
              <div></div>
            </a>
            <a
              href="https://www.microsoft.com"
              target="_blank"
              className="cardIconM">
              <div></div>
            </a>
          </div>

          <div className="loginButton">
            <button type="submit" onClick={handleSubmit(loginData)}>Iniciar Sesión</button>
          </div>
        </div>
      </div>

      <div className="containerTwo">
        <h2>La melodia que tranforma tu mensaje en <br />una experiencia inolvidable</h2>

        <div className="slider">
          <div className="imgSlider"></div>

          <div className="nextImgContainer">
            <div className="nextImg"></div>
            <div className="nextImg"></div>
            <div className="nextImg"></div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
