import React from 'react';
import Text from '../../../components/inputs/Text';
import TextArea from '../../../components/inputs/TextArea';
import Button from '../../../components/inputs/Button';

const Editar = ({ apiIp, user, setUser }) => {
  console.log(user);
  function enviarFormulario(event) {
    event.preventDefault(); // Evitar comportamiento por defecto
    const usuario = {
      "nombre": document.login.nombre.value,
      "apellido": document.login.apellido.value,
      "telefono": document.login.telefono.value,
      "direccion": document.login.direccion.value,
      "descripcion": document.login.descripcion.value,
      "email": document.login.email,
      "dni": document.login.dni.value,
      // "imagen": document.login.imagen.value,
      "username": document.login.username.value,
      "password": document.login.password.value
    };

    fetch(`${apiIp}update/${user.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify(usuario),
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      window.location.href = `/perfil/${user.id}`;
    })
    .catch((error) => {
      document.getElementById('mensaje').innerText = 'Error al iniciar sesiocn';
      console.error('Error:', error);
    });
  }

  return (
    <form onSubmit={enviarFormulario} className="row">
      <img src={`/img/${user.imagen}`} alt="Avatar" className="userImagePerfil col-4"/>
      <div className="userInfo col-8">
        <Text type="text" text="Nombre de usuario" value={user.username} required={true} />
        <Text text="Email" value={user.email} required={true} />
        <Text type="text" text="Teléfono" value={user.telefono} required={true} />
        <Text type="text" text="Dirección" value={user.direccion} required={true} />
        <TextArea text="Descripción" value={user.descripcion} required={true} />
      </div>
      <Button text="Iniciar Sesión" type="submit" />
    </form>
  );
}

export default Editar;