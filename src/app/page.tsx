"use client"; // 1. OBLIGATORIO: Le dice a Next.js que esta página tendrá interactividad en vivo

import { useState } from 'react'; // 2. IMPORTAMOS EL ESTADO (La memoria de la página)
import Image from 'next/image';
import { catalogoMuebles } from '@/data/muebles';

export default function HomePage() {
  const whatsappLink = "https://wa.me/573000000000?text=Hola!%20Estoy%20interesado%20en%20cotizar%20un%20mueble%20a%20medida.";

  // 3. CREAMOS EL ESTADO: 
  // 'categoriaSeleccionada' guardará la categoría activa (por defecto empieza en 'Todos')
  // 'setCategoriaSeleccionada' es la función que usaremos para cambiar esa memoria.
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('Todos');

  // Herramienta para dar formato de moneda colombiana
  const formatearPesoColombiano = (valor: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(valor);
  };

  // 4. LÓGICA DE FILTRADO: 
  // Si la memoria dice 'Todos', mostramos todo el catálogo.
  // Si dice algo específico (ej: 'Cocina'), filtramos el arreglo para dejar solo las cocinas.
  const mueblesFiltrados = categoriaSeleccionada === 'Todos'
    ? catalogoMuebles
    : catalogoMuebles.filter(mueble => mueble.categoria === categoriaSeleccionada);

  // Lista de botones que queremos mostrar en la barra de filtros
  const categoriasBotones = ['Todos', 'Cocina', 'Closet', 'Entretenimiento'];

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans">
      
      {/* ENCABEZADO */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
            </svg>
            <span className="font-bold text-lg tracking-tight text-neutral-900">Carpintería IA</span>
          </div>
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors flex items-center gap-1.5"
          >
            Contacto
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative bg-neutral-950 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80" 
            alt="Taller de carpintería" 
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative max-w-3xl mx-auto text-center space-y-6">
          <span className="inline-block bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            Bogotá D.C.
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-100">
            Muebles a Medida Diseñados para tu Espacio
          </h1>
          <p className="text-lg text-neutral-300 max-w-xl mx-auto">
            Combinamos la ebanistería tradicional con tecnología para crear el mueble exacto que necesitas. Personaliza materiales, colores y medidas.
          </p>
          <div className="pt-4">
            <a 
              href="#catalogo" 
              className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-8 py-3.5 rounded-lg shadow-lg transition-all inline-block w-full sm:w-auto"
            >
              Ver Catálogo de Diseños
            </a>
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-neutral-900">¿Cómo funciona?</h2>
          <p className="text-neutral-600 mt-2">Un proceso transparente desde la idea hasta la instalación en tu hogar.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl border border-neutral-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-700 font-bold">1</div>
            <h3 className="font-semibold text-lg text-neutral-900">Explora y Elige</h3>
            <p className="text-sm text-neutral-600">Revisa nuestros diseños base y selecciona el que te guste.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-neutral-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-700 font-bold">2</div>
            <h3 className="font-semibold text-lg text-neutral-900">Personaliza a Medida</h3>
            <p className="text-sm text-neutral-600">Elige la distribución, tipos de madera, colores y herrajes.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-neutral-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-700 font-bold">3</div>
            <h3 className="font-semibold text-lg text-neutral-900">Cotización Automática</h3>
            <p className="text-sm text-neutral-600">Te damos un precio claro y, tras tu aprobación, lo fabricamos.</p>
          </div>
        </div>
      </section>

      {/* CATÁLOGO CON FILTROS DINÁMICOS */}
      <section id="catalogo" className="py-16 bg-neutral-100 border-t border-b border-neutral-200/60">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* ENCABEZADO DEL CATÁLOGO */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900">Modelos Disponibles</h2>
              <p className="text-neutral-600 mt-1">Diseños estructurales listos para adaptarse a tu espacio.</p>
            </div>

            {/* 5. SECCIÓN DE FILTROS (Diseño horizontal scrolleable en celulares) */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none snap-x">
              {categoriasBotones.map((cat) => {
                // Verificamos si este botón en particular es el que está guardado en la memoria
                const esActivo = categoriaSeleccionada === cat;
                return (
                  <button
                    key={cat}
                    // Al hacer clic, actualizamos la memoria usando 'setCategoriaSeleccionada'
                    onClick={() => setCategoriaSeleccionada(cat)}
                    className={`snap-start shrink-0 text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
                      esActivo
                        ? 'bg-amber-700 border-amber-700 text-white shadow-sm' // Estilo si está seleccionado
                        : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300' // Estilo normal
                    }`}
                  >
                    {cat === 'Todos' ? 'Todos los diseños' : cat + 's'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* GRID DE MUEBLES FILTRADOS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 6. AHORA MAPEAMOS 'mueblesFiltrados' EN LUGAR DE TODO EL CATÁLOGO */}
            {mueblesFiltrados.map((mueble) => (
              <div key={mueble.id} className="bg-white rounded-xl overflow-hidden border border-neutral-200 shadow-sm flex flex-col group animate-fadeIn">
                <div className="relative h-56 w-full bg-neutral-200 overflow-hidden">
                  <Image 
                    src={mueble.imagen} 
                    alt={mueble.nombre} 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-neutral-800 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
                    {mueble.categoria}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl text-neutral-950">{mueble.nombre}</h3>
                    <p className="text-sm text-neutral-600 line-clamp-2">{mueble.descripcion}</p>
                    
                    <div className="flex flex-wrap gap-1 pt-2">
                      {mueble.materialesDisponibles.map((material, idx) => (
                        <span key={idx} className="text-[10px] bg-neutral-100 border border-neutral-200 text-neutral-600 px-2 py-0.5 rounded-full">
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-neutral-400 font-medium uppercase">Precio base</p>
                      <p className="text-base font-bold text-neutral-900">
                        {formatearPesoColombiano(mueble.precioBase)}
                      </p>
                    </div>
                    <a 
                      href={`${whatsappLink}%20Me%20interesa%20el%20modelo:%20${encodeURIComponent(mueble.nombre)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold bg-neutral-900 text-white px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors"
                    >
                      Cotizar
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mensaje por si acaso un filtro se queda vacío */}
          {mueblesFiltrados.length === 0 && (
            <div className="text-center py-12 text-neutral-500 text-sm">
              No hay modelos disponibles en esta categoría por el momento.
            </div>
          )}

        </div>
      </section>

      {/* BOTÓN WHATSAPP */}
      <a 
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center group"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm6.59-4.846c1.66.986 3.296 1.48 4.973 1.481 5.391 0 9.777-4.39 9.78-9.783a9.697 9.697 0 0 0-2.848-6.915A9.702 9.702 0 0 0 11.993 1.12C6.604 1.12 2.219 5.508 2.216 10.9a9.75 9.75 0 0 0 1.512 5.234l-.165.6-.979 3.57 3.645-.956zm10.933-5.415c-.293-.146-1.733-.856-2.001-.954-.269-.098-.465-.147-.66.147-.196.293-.759.954-.93 1.15-.172.197-.343.22-.636.073-.293-.146-1.239-.457-2.361-1.458-.873-.78-1.462-1.742-1.633-2.036-.172-.293-.018-.452.129-.597.133-.13.293-.342.44-.513.147-.171.196-.293.294-.488.098-.196.049-.366-.024-.513-.073-.147-.659-1.59-.903-2.175-.237-.573-.479-.496-.66-.505-.171-.007-.367-.008-.561-.008-.196 0-.514.073-.783.366-.269.293-1.026 1.002-1.026 2.442 0 1.439 1.047 2.83 1.194 3.025.147.195 2.062 3.149 4.996 4.413.698.301 1.243.481 1.668.616.702.223 1.341.191 1.847.115.564-.084 1.733-.708 1.978-1.393.245-.684.245-1.27.172-1.393-.073-.122-.269-.196-.562-.342z"/>
        </svg>
      </a>

      {/* PIE DE PÁGINA */}
      <footer className="bg-neutral-950 text-neutral-500 text-xs py-8 border-t border-neutral-900 text-center">
        <p>© {new Date().getFullYear()} Carpintería IA. Todos los derechos reservados.</p>
        <p className="mt-1 text-neutral-600">Bogotá D.C., Colombia</p>
      </footer>
    </div>
  );
}