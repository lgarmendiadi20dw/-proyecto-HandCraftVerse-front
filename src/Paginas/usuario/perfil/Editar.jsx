import React, { useState, useEffect } from 'react';
import Text from '../../../components/inputs/Text';
import TextArea from '../../../components/inputs/TextArea';
import Button from '../../../components/inputs/Button';

const Editar = ({ apiIp, user }) => {
  const [formData, setFormData] = useState({
    nombre: user.nombre || '',
    apellido: user.apellido || '',
    telefono: user.telefono || '',
    direccion: user.direccion || '',
    descripcion: user.descripcion || '',
    email: user.email || '',
    dni: user.dni || '',
    username: user.username || '',
    password: user.password , // Puede ser vacío inicialmente, ya que lo actualizan los usuarios
  });

  useEffect(() => {
    // Aseguramos que cuando el `user` cambie, se actualice el estado
    setFormData({
      nombre: user.nombre || '',
      apellido: user.apellido || '',
      telefono: user.telefono || '',
      direccion: user.direccion || '',
      email: user.email || '',
      username: user.username || '',
      password: '',
    });
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const enviarFormulario = (event) => {
    event.preventDefault(); // Evitar comportamiento por defecto

    // Enviar datos de formulario a la API
    fetch(`${apiIp}member/update/${user.id}`, {
      method: 'PUT', // Cambiar a PUT
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
      },
      body: JSON.stringify(formData),
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        // Redirigir al perfil del usuario después de actualizar
        window.location.href = `/perfil/${user.id}`;
      })
      .catch((error) => {
        
        console.error('Error:', error);
      });
  };
  console.log(user);

  return (
    <form onSubmit={enviarFormulario} className="row">
      <img src={`/img/${user.imagen}`} alt="Avatar" className="userImagePerfil col-4" />
      <div className="userInfo col-8">
        <Text
          type="text"
          text="Nombre de usuario"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required={true}
        />
        <Text
          text="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required={true}
        />
        {/* <Text type="password" text="Contraseña" name="password"  value={formData.password} onChange={handleChange} required={true}/> */}
        <Text
          type="text"
          text="Teléfono"
          name="telefono"
          value={formData.telefono === 0 ? '' : formData.telefono} // Evitar mostrar "0"
          onChange={handleChange}
        />
        <Text
          type="text"
          text="Dirección"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
        />
        {/* <TextArea
          text="Descripción"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
        /> */}
        <div className="tw-mt-6">
          <Button text="Guardar" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default Editar;
