import Image from 'next/image';
// 1. Importamos la bodega de datos que creamos en el paso anterior
import { CATALOGO_MUEBLES } from '@/data/muebles';

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">
      
      {/* SECCIÓN HERO (La que ya tenías con tu súper estilo premium) */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-neutral-900 to-neutral-950">
        <h1 className="text-4xl md:text-6xl font-extrabold text-orange-500 max-w-3xl tracking-tight">
          Muebles Inteligentes a Medida
        </h1>
        <p className="mt-4 text-base md:text-xl text-neutral-400 max-w-xl">
          Diseño premium, cotización exacta en tiempo real y el poder de la IA para visualizar tu espacio.
        </p>
        <a 
          href="#catalogo" 
          className="mt-8 px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-lg shadow-lg shadow-orange-600/20 transition-all transform hover:scale-105 text-lg"
        >
          Ver Catálogo
        </a>
      </section>

      {/* SECCIÓN DEL CATÁLOGO (Fase 1: Mobile-First) */}
      <section id="catalogo" className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-200">
            Nuestro Catálogo de Diseños
          </h2>
          <p className="mt-2 text-neutral-400">
            Modelos base listos para personalizar a la medida de tu hogar
          </p>
        </div>

        {/* CONTENEDOR GRID: 1 columna en celular, 2 en tablet, 3 en pantallas grandes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* 2. Aquí usamos .map() para recorrer los muebles de la bodega */}
          {CATALOGO_MUEBLES.map((mueble) => {
            // Creamos el mensaje automático para WhatsApp
            const mensajeWhatsApp = encodeURIComponent(
              `¡Hola! Estoy interesado en el "${mueble.nombre}". Me gustaría recibir más información.`
            );
            const linkWhatsApp = `https://wa.me/573000000000?text=${mensajeWhatsApp}`; // <-- Reemplaza con tu número real en el futuro

            return (
              <div 
                key={mueble.id} 
                className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-xl flex flex-col justify-between hover:border-neutral-700 transition-colors"
              >
                {/* Contenedor de la Imagen */}
                <div className="relative h-64 w-full bg-neutral-800">
                  <img 
                    src={mueble.imagenUrl} 
                    alt={mueble.nombre}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute top-3 right-3 bg-neutral-950/80 backdrop-blur-sm text-orange-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-neutral-700">
                    {mueble.categoria}
                  </span>
                </div>

                {/* Información del Mueble */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-100 mb-2">
                      {mueble.nombre}
                    </h3>
                    <p className="text-neutral-400 text-sm line-clamp-3 mb-4">
                      {mueble.descripcion}
                    </p>
                    
                    {/* Dimensiones sugeridas sugeridas de carpintería */}
                    <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 text-xs text-neutral-400 mb-4 grid grid-cols-3 text-center gap-2">
                      <div><span className="block font-semibold text-neutral-300">Ancho</span> {mueble.dimensionesPorDefecto.ancho} cm</div>
                      <div><span className="block font-semibold text-neutral-300">Alto</span> {mueble.dimensionesPorDefecto.alto} cm</div>
                      <div><span className="block font-semibold text-neutral-300">Fondo</span> {mueble.dimensionesPorDefecto.fondo} cm</div>
                    </div>
                  </div>

                  <div>
                    {/* Precio formateado a Pesos Colombianos (COP) */}
                    <div className="flex items-baseline justify-between mb-4">
                      <span className="text-xs text-neutral-500 uppercase font-bold">Precio Base</span>
                      <span className="text-2xl font-black text-orange-500">
                        ${mueble.precioBase.toLocaleString('es-CO')} COP
                      </span>
                    </div>

                    {/* Botón de acción hacia WhatsApp (Fase 1) */}
                    <a 
                      href={linkWhatsApp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full block text-center bg-neutral-800 hover:bg-neutral-700 text-neutral-100 font-medium py-2.5 px-4 rounded-lg transition-colors border border-neutral-700 text-sm"
                    >
                      Cotizar por WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </section>

    </main>
  );
}