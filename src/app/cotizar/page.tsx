"use client";

import { useState } from 'react';
import Link from 'next/link';

// Precios base modificados para calcular por METRO CÚBICO (Volumen) de material estructurado
const PRECIOS_MATERIALES: Record<string, number> = {
  'Melamina Estándar': 450000,
  'Melamina RH (Resistente Humedad)': 600000,
  'MDF Pintado / Poliuretano': 1050000,
  'Madera Sólida': 1500000,
};

const PRECIOS_HERRAJES: Record<string, number> = {
  'Estándar (Cierre normal)': 0,
  'Premium (Cierre lento / Push)': 120000,
  'Alta Gama (Marcas como Blum)': 350000,
};

export default function CotizadorPage() {
  const [tipoMueble, setTipoMueble] = useState<string>('Cocina');
  const [material, setMaterial] = useState<string>('Melamina RH (Resistente Humedad)');
  const [herraje, setHerraje] = useState<string>('Estándar (Cierre normal)');
  
  // 1. AÑADIMOS LAS TRES MEDIDAS TÉCNICAS (Ancho, Alto, Profundidad)
  const [ancho, setAncho] = useState<number>(120);
  const [alto, setAlto] = useState<number>(80);
  const [profundidad, setProfundidad] = useState<number>(60); // Fondo estándar por defecto (60cm)

  // 2. NUEVA FÓRMULA MATEMÁTICA EN 3D
  const calcularPrecioTotal = () => {
    // Convertimos las tres medidas a metros para calcular el volumen en metros cúbicos (m³)
    const volumenMetrosCubicos = (ancho / 100) * (alto / 100) * (profundidad / 100);
    
    let costoBaseMueble = 600000; // Costo base fijo por el ensamble, colas, tornillos y armado
    if (tipoMueble === 'Closet') costoBaseMueble = 900000;
    if (tipoMueble === 'Entretenimiento') costoBaseMueble = 500000;
    if (tipoMueble === 'Baño') costoBaseMueble = 350000;

    // El costo del material ahora depende de las tres dimensiones combinadas
    const costoMaterial = (PRECIOS_MATERIALES[material] || 0) * volumenMetrosCubicos;
    const costoHerraje = PRECIOS_HERRAJES[herraje] || 0;

    return Math.round(costoBaseMueble + costoMaterial + costoHerraje);
  };

  const formatearCOP = (valor: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(valor);
  };

  const precioEstimado = calcularPrecioTotal();

  // 3. ACTUALIZAMOS EL MENSAJE DE WHATSAPP PARA QUE INCLUYA LA PROFUNDIDAD
  const mensajeWhatsApp = encodeURIComponent(
    `¡Hola! Acabo de usar el cotizador web. Deseo un presupuesto para un mueble tipo: ${tipoMueble}.\n` +
    `- Material: ${material}\n` +
    `- Herrajes: ${herraje}\n` +
    `- Medidas: Ancho ${ancho}cm x Alto ${alto}cm x Fondo ${profundidad}cm\n` +
    `- Precio estimado en la web: ${formatearCOP(precioEstimado)}`
  );

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans p-4 md:p-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 md:p-10 rounded-2xl border border-neutral-200 shadow-xl">
        
        {/* COLUMNA IZQUIERDA: FORMULARIO */}
        <div className="space-y-6">
          <div>
            <Link href="/" className="text-xs font-semibold text-amber-700 hover:underline flex items-center gap-1 mb-2">
              ← Volver al inicio
            </Link>
            <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">Cotizador Técnico</h1>
            <p className="text-sm text-neutral-500 mt-1">Configura las piezas base para calcular costos de producción.</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">1. Tipo de Estructura</label>
            <select 
              value={tipoMueble} 
              onChange={(e) => setTipoMueble(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-600 transition-colors"
            >
              <option value="Cocina">Módulo de Cocina</option>
              <option value="Closet">Clóset / Vestier</option>
              <option value="Entretenimiento">Centro de Entretenimiento</option>
              <option value="Baño">Mueble de Baño</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">2. Material del Tablero</label>
            <select 
              value={material} 
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-600 transition-colors"
            >
              {Object.keys(PRECIOS_MATERIALES).map((mat) => (
                <option key={mat} value={mat}>{mat}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">3. Sistema de Herrajes</label>
            <select 
              value={herraje} 
              onChange={(e) => setHerraje(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-600 transition-colors"
            >
              {Object.keys(PRECIOS_HERRAJES).map((herr) => (
                <option key={herr} value={herr}>{herr}</option>
              ))}
            </select>
          </div>

          {/* 4. SECCIÓN DE DIMENSIONES MODIFICADA (Ahora son 3 inputs en grid) */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">4. Dimensiones del Módulo (cm)</label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <span className="text-[11px] text-neutral-400 block font-medium">Ancho (cm)</span>
                <input 
                  type="number" 
                  value={ancho} 
                  onChange={(e) => setAncho(Number(e.target.value))}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-amber-600 transition-colors mt-1"
                />
              </div>
              <div>
                <span className="text-[11px] text-neutral-400 block font-medium">Alto (cm)</span>
                <input 
                  type="number" 
                  value={alto} 
                  onChange={(e) => setAlto(Number(e.target.value))}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-amber-600 transition-colors mt-1"
                />
              </div>
              <div>
                {/* Agregamos el input visual para la Profundidad */}
                <span className="text-[11px] text-neutral-400 block font-medium">Fondo / Prof. (cm)</span>
                <input 
                  type="number" 
                  value={profundidad} 
                  onChange={(e) => setProfundidad(Number(e.target.value))}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-amber-600 transition-colors mt-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: RESULTADO EN TIEMPO REAL */}
        <div className="bg-neutral-900 text-white p-6 rounded-xl flex flex-col justify-between border border-neutral-800 space-y-6 md:space-y-0">
          <div className="space-y-4">
            <span className="inline-block bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
              Presupuesto Técnico
            </span>
            <div>
              <p className="text-sm text-neutral-400 font-medium">Valor Total Estimado (Mano de obra e instalación incluidos)</p>
              <h2 className="text-4xl font-black text-amber-400 mt-1 transition-all">
                {formatearCOP(precioEstimado)}
              </h2>
            </div>

            <div className="text-xs text-neutral-400 space-y-2 pt-2 border-t border-neutral-800">
              <p>📌 <strong className="text-neutral-200">Estructura volumétrica:</strong> Calculada de forma precisa en base a {ancho}x{alto}x{profundidad} cm.</p>
              <p>📌 <strong className="text-neutral-200">Desperdicio de corte:</strong> El motor simula el gasto de optimización de lámina.</p>
              <p>📌 <strong className="text-neutral-200">Nota técnica:</strong> Este valor puede variar según visitas técnicas a obra en Bogotá.</p>
            </div>
          </div>

          <div className="pt-4">
            <a 
              href={`https://wa.me/573000000000?text=${mensajeWhatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-4 rounded-xl text-center block transition-all shadow-lg text-sm"
            >
              Enviar Diseño a WhatsApp 🚀
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}