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
              <li><a href="/">¿Quiénes somos?</a></li>
              <li><a href="/">Trabaja con nosotros</a></li>
              <li><a href="/">Sostenibilidad</a></li>
              <li><a href="/">Prensa</a></li>
              <li><a href="/">Publicidad</a></li>
            </ul>
          </div>

          {/* Descubre Section */}
          <div className="col-md-4">
            <h4 className="tw-text-lg tw-font-semibold tw-mb-3">Descubre</h4>
            <ul className="tw-space-y-2">
              <li><a href="/">¿Cómo funciona?</a></li>
              <li><a href="/">Verificación del artículo</a></li>
              <li><a href="/">Descarga la app</a></li>
              <li><a href="/">Tablón informativo</a></li>
              <li><a href="/">HandCraftVerse Pro</a></li>
              <li><a href="/">Guía de HandCraftVerse Pro</a></li>
            </ul>
          </div>

          {/* Ayuda Section */}
          <div className="col-md-4 ">
            <h4 className="tw-text-lg tw-font-semibold tw-mb-3">Ayuda</h4>
            <ul className="tw-space-y-2">
              <li><a href="/">Centro de Asistencia</a></li>
              <li><a href="/">Vender</a></li>
              <li><a href="/">Comprar</a></li>
              <li><a href="/">Confianza y seguridad</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="tw-mt-8 tw-text-center  tw-pt-4">
        <p className="tw-text-sm tw-text-center">
  &copy; {new Date().getFullYear()} HandCraftVerse. Todos los derechos reservados.
</p>

          <ul className="tw-flex tw-justify-center tw-space-x-4 tw-mt-2">
            <li className='terminos'><a href="/">Términos y Condiciones</a></li>
            <li className='terminos'><a href="/">Política de Privacidad</a></li>
            <li className='terminos'><a href="/">Política de Cookies</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
