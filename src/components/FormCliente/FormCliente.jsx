import "./FormCliente.css";
import { useForm } from "react-hook-form";
import { createUser } from "../../services/userService";
import { useState } from "react";

const FormCliente = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [menuEmpresa, setMenuEmpresa] = useState(false);

  const handleChange = (event) => {
    if (event.target.value === "opcion1") {
      setMenuEmpresa(true);
    } else {
      setMenuEmpresa(false);
    }
  };

  const registrar = async (data) => {
    try {
      let { nombre, apellido, correo, telefono } = data;

      const cliente_data = {
        nombre,
        apellido,
        correo,
        telefono,
        rol: "Cliente",
      };
      const registrarservicio = await createUser(cliente_data);

      if (registrarservicio) {
        alert("Usuario registrado correctamente");
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`formcliente ${menuEmpresa ? "alargarTarjeta" : ""}`}>
      <h1 className="titleFormCliente">
        Registrar&nbsp;<span className="clienteColor">cliente</span>
      </h1>
      <form>
        <div className="personalInformation">
          <div className="ContenedorUno">
            <label htmlFor="">Nombres</label>
            <input
              type="text"
              name=""
              id=""
              placeholder="example@dominio.com"
              {...register("nombre", { required: "El nombre es obligatorio" })}
            />

            <label htmlFor="">Correo</label>
            <input
              type="email"
              name=""
              id=""
              placeholder="example@dominio.com"
              {...register("correo", { required: "El correo es obligatorio" })}
            />
          </div>

          <div className="ContenedorDos">
            <label htmlFor="">Apellidos</label>
            <input
              type="text"
              name=""
              id=""
              placeholder="example@dominio.com"
              {...register("apellido", {
                required: "El apellido es obligatorio",
              })}
            />

            <label htmlFor="">Telefono</label>
            <input
              type="text"
              name=""
              id=""
              placeholder="example@dominio.com"
              {...register("telefono", {
                required: "El telefono es obligatorio",
              })}
            />
          </div>
        </div>

        <label className="TitleEmpresaApartado">
          Registrar y asignar empresa
        </label>
        <div className="optionEmpresa">
          <div className="opcionUno">
            <input
              type="radio"
              name="opciones"
              value="opcion1"
              onChange={handleChange}
            />
            <label htmlFor="">Si</label>
          </div>

          <div className="opcionDos">
            <input
              type="radio"
              name="opciones"
              value="opcion2"
              onChange={handleChange}
            />
            <label htmlFor="">No</label>
          </div>
        </div>

        <div
          className={`buttonFormCliente ${
            menuEmpresa ? "hidden" : "buttonFormCliente"
          }`}>
          <button type="submit" onClick={handleSubmit(registrar)}>
            Registrar
          </button>
        </div>

        {menuEmpresa && (
          <>
            <h2 className="titleFormEmpresa">
              &nbsp;<span className="clienteColor">Empresa</span>
            </h2>
            <div className="FormEmpresa">
              <div className="ContenedorUno">
                <label htmlFor="">Nit</label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="example@dominio.com"
                  {...register("Nit", {
                    required: "El nit es obligatorio",
                  })}
                />

                <label htmlFor="">Correo</label>
                <input
                  type="email"
                  name=""
                  id=""
                  placeholder="example@dominio.com"
                  {...register("correo", {
                    required: "El correo es obligatorio",
                  })}
                />

                <label htmlFor="">Sector empresarial</label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="example@dominio.com"
                  {...register("correo", {
                    required: "El Sector empresarial es obligatorio",
                  })}
                />
              </div>

              <div className="ContenedorDos">
                <label htmlFor="">Nombres</label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="example@dominio.com"
                  {...register("apellido", {
                    required: "los nombres es obligatorios",
                  })}
                />

                <label htmlFor="">Telefono</label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="example@dominio.com"
                  {...register("telefono", {
                    required: "El telefono es obligatorio",
                  })}
                />
                <div className="buttonFormEmpresa">
                  <button type="submit" onClick={handleSubmit(registrar)}>
                    Registrar
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* <h1 className="PRUEBA">PRUEBA 1</h1> */}
      </form>
    </div>
  );
};

export default FormCliente;
