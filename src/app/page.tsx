'use client';

import { useState, useEffect } from 'react';
import { calcularPresupuesto, ParametrosCotizacion, ResultadoCotizacion } from '@/data/cotizador';

export default function CotizarPage() {
  // ==========================================
  // 1. ESTADOS DE CONTROL (Memoria de la App)
  // ==========================================
  const [categoria, setCategoria] = useState<ParametrosCotizacion['categoria']>('centro-entretenimiento');
  const [ancho, setAncho] = useState<number>(1.80);
  const [alto, setAlto] = useState<number>(1.20);
  const [fondo, setFondo] = useState<string>('');
  const [material, setMaterial] = useState<ParametrosCotizacion['tipoMaterial']>('estandar');
  const [herraje, setHerraje] = useState<ParametrosCotizacion['tipoHerraje']>('estandar');
  const [resultado, setResultado] = useState<ResultadoCotizacion | null>(null);

  // Estados exclusivos para el flujo del Asistente de IA
  const [ideaUsuario, setIdeaUsuario] = useState<string>('');
  const [cargandoIA, setCargandoIA] = useState<boolean>(false);
  const [feedbackIA, setFeedbackIA] = useState<string>('');
  const [colorSugerido, setColorSugerido] = useState<string>('');

  // ==========================================
  // 2. EFECTOS REACTIVOS (Cálculo en Tiempo Real)
  // ==========================================
  useEffect(() => {
    const fondoNum = fondo !== '' ? parseFloat(fondo) : undefined;
    
    // Ejecuta la función matemática pura de cotización
    const presupuesto = calcularPresupuesto({
      categoria,
      anchoMts: ancho,
      altoMts: alto,
      fondoMts: fondoNum,
      tipoMaterial: material,
      tipoHerraje: herraje
    });
    setResultado(presupuesto);
  }, [categoria, ancho, alto, fondo, material, herraje]);

  // ==========================================
  // 3. MANEJADORES DE EVENTOS (Flujo de la IA)
  // ==========================================
  const procesarIdeaConIA = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaUsuario.trim()) return;

    setCargandoIA(true);
    setFeedbackIA('');

    try {
      // Simulación de envío al backend de Next.js (Fase 2 de la arquitectura)
      const respuesta = await fetch('/api/asistente-ia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensajeUsuario: ideaUsuario }),
      });

      const datos = await respuesta.json();

      if (datos.error) {
        setFeedbackIA('No pude procesar tu idea en este momento. Intenta de nuevo.');
      } else {
        const sug = datos.configuracionSugerida;
        
        // Sincronización del estado: La IA actualiza los controles del formulario
        if (sug.categoria) setCategoria(sug.categoria);
        if (sug.anchoMts) setAncho(sug.anchoMts);
        if (sug.altoMts) setAlto(sug.altoMts);
        if (sug.tipoMaterial) setMaterial(sug.tipoMaterial);
        if (sug.tipoHerraje) setHerraje(sug.tipoHerraje);
        
        setFeedbackIA(datos.analisisExplicativo);
        if (datos.colorSugerido) setColorSugerido(datos.colorSugerido);
      }
    } catch (error) {
      setFeedbackIA('Ocurrió un error al conectar con el servidor de diseño.');
    } finally {
      setCargandoIA(false);
    }
  };

  // ==========================================
  // 4. INTERFAZ VISUAL (Renderizado JSX)
  // ==========================================
  return (
    <main className="min-h-screen bg-neutral-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* ENCABEZADO */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-neutral-900 tracking-tight">
            Cotizador <span className="text-amber-600">3D Inteligente</span>
          </h1>
          <p className="mt-2 text-neutral-600 max-w-xl mx-auto text-sm">
            Describe tu idea en texto o manipula los controles manuales para obtener un presupuesto industrial instantáneo en Bogotá.
          </p>
        </div>

        {/* CONTENEDOR DEL ASISTENTE IA (DISEÑO ACTUALIZADO DE ALTO CONTRASTE) */}
        <div className="bg-white border border-neutral-200 p-6 rounded-2xl shadow-sm mb-8">
          <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2 mb-1">
            ✨ Asistente de Diseño IA (Co-Diseñador de Carpintería)
          </h2>
          <p className="text-neutral-500 text-xs md:text-sm mb-4">
            Escribe con tus propias palabras qué mueble imaginas. Nuestro cerebro digital configurará los planos por ti.
          </p>
          
          <form onSubmit={procesarIdeaConIA} className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              required
              disabled={cargandoIA}
              value={ideaUsuario}
              onChange={(e) => setIdeaUsuario(e.target.value)}
              placeholder="Ej: Necesito un clóset moderno para mi alcoba con espacio para maletas..."
              className="flex-1 px-4 py-3 rounded-xl border border-neutral-300 text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:bg-neutral-100"
            />
            <button
              type="submit"
              disabled={cargandoIA}
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors shadow disabled:bg-neutral-300 flex items-center justify-center min-w-[140px]"
            >
              {cargandoIA ? 'Analizando...' : 'Diseñar con IA'}
            </button>
          </form>

          {/* CAJA DE RESPUESTA INTEGRADA: SIN CUADRO NEGRO */}
          {feedbackIA && (
            <div className="mt-5 bg-amber-50/60 border-l-4 border-amber-500 p-5 rounded-r-xl animate-fadeIn">
              <p className="font-bold text-amber-800 text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                🤖 Propuesta de Configuración:
              </p>
              <p className="text-neutral-800 leading-relaxed text-sm font-medium">
                {feedbackIA}
              </p>
              {colorSugerido && (
                <div className="mt-3 pt-3 border-t border-neutral-200/80 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  <p className="text-xs font-semibold text-neutral-600">
                    🎨 Color de melamina sugerido: <span className="text-neutral-900 font-bold">{colorSugerido}</span>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* CUADRICULA DE CONFIGURACIÓN Y RESULTADO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* CONTROLES MANUALES (FORMULARIO) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 space-y-6">
            <h2 className="text-xl font-bold text-neutral-800 border-b pb-3">Configuración Manual del Mueble</h2>
            
            {/* Selector de Categorías */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Tipo de Mueble</label>
              <div className="grid grid-cols-2 gap-3">
                {(['centro-entretenimiento', 'cocina', 'alcoba', 'bano'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategoria(cat)}
                    className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all text-center capitalize ${
                      categoria === cat 
                        ? 'border-amber-600 bg-amber-50 text-amber-700 font-semibold shadow-sm' 
                        : 'border-neutral-200 hover:bg-neutral-50 text-neutral-600'
                    }`}
                  >
                    {cat.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Rangos de Dimensiones */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">Dimensiones (Metros)</h3>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600 font-medium">Ancho: <strong className="text-neutral-900">{ancho.toFixed(2)} mts</strong></span>
                  <span className="text-xs text-neutral-400">Máx (Lámina): 2.44 mts</span>
                </div>
                <input
                  type="range" min="0.50" max="5.00" step="0.05"
                  value={ancho}
                  onChange={(e) => setAncho(parseFloat(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600 font-medium">Alto: <strong className="text-neutral-900">{alto.toFixed(2)} mts</strong></span>
                </div>
                <input
                  type="range" min="0.30" max="2.60" step="0.05"
                  value={alto}
                  onChange={(e) => setAlto(parseFloat(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">Fondo / Profundidad</label>
                <div className="relative">
                  <input
                    type="number" step="0.01" min="0.10" max="1.20"
                    placeholder={`Por defecto técnico: ${resultado?.fondoUtilizadoMts.toFixed(2)} mts`}
                    value={fondo}
                    onChange={(e) => setFondo(e.target.value)}
                    className="w-full border border-neutral-200 bg-neutral-50 rounded-xl px-4 py-2.5 text-neutral-800 text-sm focus:outline-none focus:border-amber-500"
                  />
                  <span className="absolute right-4 top-2.5 text-sm text-neutral-400 font-medium">mts</span>
                </div>
              </div>
            </div>

            {/* Materiales y Herrajes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Tipo de Madera</label>
                <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value as any)}
                  className="w-full border border-neutral-200 bg-neutral-50 rounded-xl px-4 py-3 text-neutral-800 text-sm focus:outline-none focus:border-amber-500"
                >
                  <option value="estandar">Melamina Estándar</option>
                  <option value="rh">Melamina RH (Resistente a Humedad)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Sistema de Herrajes</label>
                <select
                  value={herraje}
                  onChange={(e) => setHerraje(e.target.value as any)}
                  className="w-full border border-neutral-200 bg-neutral-50 rounded-xl px-4 py-3 text-neutral-800 text-sm focus:outline-none focus:border-amber-500"
                >
                  <option value="estandar">Extensión Corriente / Bisagra Común</option>
                  <option value="cierre-lento">Cierre Lento Premium</option>
                  <option value="push-to-open">Sistemas Push To Open</option>
                </select>
              </div>
            </div>
          </div>

          {/* COLUMNA DE COSTOS Y RESPUESTA MATEMÁTICA */}
          <div className="lg:col-span-5 space-y-6">
            {resultado && (
              <div className="bg-neutral-900 text-white p-6 rounded-2xl shadow-xl border border-neutral-800 flex flex-col justify-between">
                <div>
                  <h2 className="text-amber-500 font-bold uppercase tracking-wider text-xs mb-4">Resumen del Presupuesto</h2>
                  
                  <div className="mb-6">
                    <p className="text-3xl md:text-4xl font-black text-white">
                      ${resultado.precioTotal.toLocaleString('es-CO')} <span className="text-sm font-normal text-neutral-400">COP</span>
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">*Precio estimado de fabricación e instalación en Bogotá.</p>
                  </div>

                  {resultado.requiereEstructuraModular && (
                    <div className="bg-amber-950 border border-amber-800 rounded-xl p-3 text-xs text-amber-300 mb-6">
                      ⚠️ <strong>Aviso Estructural:</strong> El ancho ({ancho}m) exige división en <strong>{resultado.numeroModulosEstimados} módulos</strong>.
                    </div>
                  )}

                  <div className="border-t border-neutral-800 py-4 space-y-2.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Profundidad aplicada:</span>
                      <span className="font-semibold text-neutral-200">{resultado.fondoUtilizadoMts.toFixed(2)} mts</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Tiempo estimado taller:</span>
                      <span className="font-semibold text-amber-500">{resultado.tiempoEntregaDias} días hábiles</span>
                    </div>
                  </div>

                  <div className="border-t border-neutral-800 pt-4 space-y-2 text-xs text-neutral-400">
                    <p className="font-bold uppercase text-[10px] tracking-widest text-neutral-500 mb-2">Desglose de Costos</p>
                    <div className="flex justify-between">
                      <span>Consumo de madera base:</span>
                      <span>${resultado.desglose.materialBase.toLocaleString('es-CO')} COP</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sistemas de herrajes:</span>
                      <span>${resultado.desglose.herrajes.toLocaleString('es-CO')} COP</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mano de obra y montaje:</span>
                      <span>${resultado.desglose.manoObraInstalacion.toLocaleString('es-CO')} COP</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    const texto = `¡Hola! Usé el asistente IA. Quiero fabricar un mueble de categoría: *${categoria.toUpperCase()}*.\n\n*Medidas:*\n- Ancho: ${ancho}m\n- Alto: ${alto}m\n- Fondo: ${resultado.fondoUtilizadoMts}m\n\n*Especificaciones:*\n- Material: Melamina ${material.toUpperCase()}\n- Herrajes: ${herraje.toUpperCase()}\n\n*Precio:* $${resultado.precioTotal.toLocaleString('es-CO')} COP.`;
                    window.open(`https://wa.me/573001234567?text=${encodeURIComponent(texto)}`, '_blank');
                  }}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white text-center font-bold py-3.5 rounded-xl transition-all shadow-md mt-6 text-sm"
                >
                  Confirmar y Enviar a WhatsApp
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}