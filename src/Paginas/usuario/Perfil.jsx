import React, { useContext, useEffect, useState, useCallback  } from "react";
import { AuthContext } from "../../Context";
import "./Perfil.scss";
import GridProductos from "../../components/gridProductos/GridProductos";
import { ReactComponent as Telf } from "../../assets/svg/iconos/telf.svg";
import { ReactComponent as Email } from "../../assets/svg/iconos/email.svg";

const Perfil = ({apiIp}) => {
  const userData = useContext(AuthContext);
  const [productos, setProductos] = useState([]);

  const cargarProductos = useCallback(() => {
    fetch(`${apiIp}member/seller/${userData.id}/productos`, {
      method: "GET",
      credentials: "include",
  })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        if (data.length > 0) {
          setProductos(data);
        }
      })
      .catch((error) => console.error("Error al cargar los productos:", error));
  }, [apiIp, userData.id]);

  useEffect(() => {
    cargarProductos();
  }, [userData.id, cargarProductos]);

  return (
    <div className="container tw-mt-6 tw-flex tw-justify-center tw-items-center">
      <div className="  formulario  col-12">
        <div className="row">
          <img src={`/img/${userData.imagen}`} alt="Avatar" className="userImagePerfil col-4"/>
          <div className="userInfo col-8">
            <h2 className="textoTitulo">{userData.username}</h2>
            <p >Nombre: {userData.username}</p>
            <p><Email className="profileIcon"/>Correo: {userData.email}</p>
            <p><Telf className="profileIcon"/> {userData.telefono}</p>
            <p>Dirección: {userData.direccion}</p>
          </div>
        </div>
        <div className="row">
          {productos.length > 0 && <GridProductos productos={productos} apiIp={apiIp} />}
        </div>
      </div>
    </div>
  );
};
export default Perfil;
