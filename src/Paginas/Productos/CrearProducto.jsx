import React, { useEffect, useState } from 'react';
// import Navbar from '../Nav/Navbar';
import './FormulariosProductos.scss';

const CrearProducto = () => {
    const [categorias, setCategorias] = useState([]);
    const [colores, setColores] = useState([]);
    const [selectedCategorias, setSelectedCategorias] = useState([]);
    const [selectedColores, setSelectedColores] = useState([]);

    useEffect(() => {
        fetch('https://localhost:8443/categorias/all')
            .then(response => response.json())
            .then(data => {
                setCategorias(data);
            });

        fetch('https://localhost:8443/colores/all')
            .then(response => response.json())
            .then(data => {
                setColores(data);
            });
    }, []);

    const updateButtonText = (type, value) => {
        if (type === 'categorias') {
            setSelectedCategorias(prev => 
                prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
            );
        } else {
            setSelectedColores(prev => 
                prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
            );
        }
    };

    const enviarFormulario = (event) => {
        event.preventDefault();
        
        const producto = {
            vendedorId: event.target.vendedorId.value,
            nombre: event.target.nombre.value,
            precio: parseFloat(event.target.precio.value),
            stock: parseInt(event.target.stock.value),
            descripcion: event.target.descripcion.value,
            categorias: selectedCategorias,
            colores: selectedColores
        };

        console.log(producto);
       
        fetch('https://localhost:8443/productos/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('mensaje').innerText = 'Producto creado exitosamente';
        })
        .catch((error) => {
            document.getElementById('mensaje').innerText = 'Error al crear el producto';
            console.error('Error:', error);
        });
    };

    return (
            <div className="container">
                <h2>Crear Producto</h2>
                <form onSubmit={enviarFormulario} name="nuevo">
                    <div className="form-group">
                        <label htmlFor="vendedorId">ID del Vendedor:</label>
                        <input type="number" className="form-control" name="vendedorId" id="vendedorId" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre del Producto:</label>
                        <input type="text" className="form-control" name="nombre" id="nombre" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="precio">Precio:</label>
                        <input type="number" className="form-control" name="precio" id="precio" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="stock">Stock:</label>
                        <input type="number" className="form-control" name="stock" id="stock" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="descripcion">Descripción:</label>
                        <textarea className="form-control" id="descripcion" name="descripcion" rows="3"></textarea>
                    </div>
                    <div className="dropdown">
                <label htmlFor="categorias">Categorías:</label>
                <div id="selectionButtonCategorias">
                    {selectedCategorias.length > 0 ? selectedCategorias.join(', ') : 'Seleccionar opciones'}
                </div>
                <div className="dropdown-content" id="categorias">
                    {categorias && Array.isArray(categorias) && categorias.map(categoria => (
                        <label key={categoria.nombre}>
                            <input 
                                type="checkbox" 
                                value={categoria.nombre} 
                                onChange={() => updateButtonText('categorias', categoria.nombre)} 
                            />
                            {categoria.nombre}
                        </label>
                    ))}
                </div>
            </div>
            <div className="dropdown">
                <label htmlFor="colores">Colores:</label>
                <div id="selectionButtonColores">
                    {selectedColores.length > 0 ? selectedColores.join(', ') : 'Seleccionar opciones'}
                </div>
                <div className="dropdown-content" id="colores">
                    {colores && Array.isArray(colores) && colores.map(color => (
                        <label key={color.nombre}>
                            <input 
                                type="checkbox" 
                                value={color.hex} 
                                onChange={() => updateButtonText('colores', color.nombre)} 
                            />
                            <span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: color.hex, marginRight: '5px' }}></span>
                            {color.nombre}
                        </label>
                    ))}
                </div>
            </div>
                    <input type="submit" value="Crear" />
                </form>
                <div id="mensaje" className="mt-3"></div>
            </div>
    );
};

export default CrearProducto;
