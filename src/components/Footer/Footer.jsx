import React from 'react';
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="tw-py-8">
      <div className="container tw-mx-auto tw-px-4">
        <div className="row">
          {/* HandCraftVerse Section */}
          <div className="col-md-4">
            <h4 className="tw-text-lg tw-font-semibold tw-mb-3">HandCraftVerse</h4>
            <ul className="tw-space-y-2">
              <li><a href="/quienes-somos" >¿Quiénes somos?</a></li>
              <li><a href="/trabaja-con-nosotros" >Trabaja con nosotros</a></li>
              <li><a href="/sostenibilidad" >Sostenibilidad</a></li>
              <li><a href="/prensa" >Prensa</a></li>
              <li><a href="/publicidad" >Publicidad</a></li>
            </ul>
          </div>

          {/* Descubre Section */}
          <div className="col-md-4">
            <h4 className="tw-text-lg tw-font-semibold tw-mb-3">Descubre</h4>
            <ul className="tw-space-y-2">
              <li><a href="/como-funciona" >¿Cómo funciona?</a></li>
              <li><a href="/verificacion" >Verificación del artículo</a></li>
              <li><a href="/descargar-app" >Descarga la app</a></li>
              <li><a href="/tablon-informativo" >Tablón informativo</a></li>
              <li><a href="/HandCraftVerse-pro" >HandCraftVerse Pro</a></li>
              <li><a href="/guia-HandCraftVerse-pro" >Guía de HandCraftVerse Pro</a></li>
            </ul>
          </div>

          {/* Ayuda Section */}
          <div className="col-md-4 ">
            <h4 className="tw-text-lg tw-font-semibold tw-mb-3">Ayuda</h4>
            <ul className="tw-space-y-2">
              <li><a href="/centro-asistencia" >Centro de Asistencia</a></li>
              <li><a href="/vender" >Vender</a></li>
              <li><a href="/comprar" >Comprar</a></li>
              <li><a href="/confianza-y-seguridad" >Confianza y seguridad</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="tw-mt-8 tw-text-center  tw-pt-4">
          <p className="tw-text-sm">
            &copy; {new Date().getFullYear()} HandCraftVerse. Todos los derechos reservados.
          </p>
          <ul className="tw-flex tw-justify-center tw-space-x-4 tw-mt-2">
            <li className='terminos'><a href="/terminos" >Términos y Condiciones</a></li>
            <li className='terminos'><a href="/privacidad" >Política de Privacidad</a></li>
            <li className='terminos'><a href="/cookies" >Política de Cookies</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
