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
              <li><a href="/quienes-somos" className="tw-text-sm tw-hover:underline">¿Quiénes somos?</a></li>
              <li><a href="/trabaja-con-nosotros" className="tw-text-sm tw-hover:underline">Trabaja con nosotros</a></li>
              <li><a href="/sostenibilidad" className="tw-text-sm tw-hover:underline">Sostenibilidad</a></li>
              <li><a href="/prensa" className="tw-text-sm tw-hover:underline">Prensa</a></li>
              <li><a href="/publicidad" className="tw-text-sm tw-hover:underline">Publicidad</a></li>
            </ul>
          </div>

          {/* Descubre Section */}
          <div className="col-md-4">
            <h4 className="tw-text-lg tw-font-semibold tw-mb-3">Descubre</h4>
            <ul className="tw-space-y-2">
              <li><a href="/como-funciona" className="tw-text-sm tw-hover:underline">¿Cómo funciona?</a></li>
              <li><a href="/verificacion" className="tw-text-sm tw-hover:underline">Verificación del artículo</a></li>
              <li><a href="/descargar-app" className="tw-text-sm tw-hover:underline">Descarga la app</a></li>
              <li><a href="/tablon-informativo" className="tw-text-sm tw-hover:underline">Tablón informativo</a></li>
              <li><a href="/HandCraftVerse-pro" className="tw-text-sm tw-hover:underline">HandCraftVerse Pro</a></li>
              <li><a href="/guia-HandCraftVerse-pro" className="tw-text-sm tw-hover:underline">Guía de HandCraftVerse Pro</a></li>
            </ul>
          </div>

          {/* Ayuda Section */}
          <div className="col-md-4 ">
            <h4 className="tw-text-lg tw-font-semibold tw-mb-3">Ayuda</h4>
            <ul className="tw-space-y-2">
              <li><a href="/centro-asistencia" className="tw-text-sm tw-hover:underline">Centro de Asistencia</a></li>
              <li><a href="/vender" className="tw-text-sm tw-hover:underline">Vender</a></li>
              <li><a href="/comprar" className="tw-text-sm tw-hover:underline">Comprar</a></li>
              <li><a href="/confianza-y-seguridad" className="tw-text-sm tw-hover:underline">Confianza y seguridad</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="tw-mt-8 tw-text-center  tw-pt-4">
          <p className="tw-text-sm">
            &copy; {new Date().getFullYear()} HandCraftVerse. Todos los derechos reservados.
          </p>
          <ul className="tw-flex tw-justify-center tw-space-x-4 tw-mt-2">
            <li><a href="/terminos" className="tw-text-sm tw-hover:underline">Términos y Condiciones</a></li>
            <li><a href="/privacidad" className="tw-text-sm tw-hover:underline">Política de Privacidad</a></li>
            <li><a href="/cookies" className="tw-text-sm tw-hover:underline">Política de Cookies</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
