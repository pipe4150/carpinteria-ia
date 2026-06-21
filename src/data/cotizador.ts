export interface ParametrosCotizacion {
  categoria: 'cocina' | 'bano' | 'alcoba' | 'centro-entretenimiento';
  anchoMts: number;
  altoMts: number;
  fondoMts?: number; // Lo hacemos opcional (?) para aplicar el fondo estándar inteligente si viene vacío
  tipoMaterial: 'estandar' | 'rh'; 
  tipoHerraje: 'estandar' | 'cierre-lento' | 'push-to-open';
}

export interface ResultadoCotizacion {
  precioTotal: number;
  tiempoEntregaDias: number;
  fondoUtilizadoMts: number;
  numeroModulosEstimados: number;
  requiereEstructuraModular: boolean;
  desglose: {
    materialBase: number;
    herrajes: number;
    manoObraInstalacion: number;
  };
}

export function calcularPresupuesto(params: ParametrosCotizacion): ResultadoCotizacion {
  const { categoria, anchoMts, altoMts, tipoMaterial, tipoHerraje } = params;

  // --- MEJORA 1: FONDOS ESTÁNDAR INTELIGENTES DE LA INDUSTRIA ---
  // Si el cliente no especifica fondo, el sistema asigna el estándar técnico de Bogotá
  let fondoReal = params.fondoMts || 0.50; // Valor por defecto si no se envía

  if (!params.fondoMts) {
    switch (categoria) {
      case 'cocina':
        fondoReal = 0.60; // Estándar internacional para mesones y electrodomésticos empotrados
        break;
      case 'bano':
        fondoReal = 0.45; // Muebles de baño suelen ser más esbeltos para optimizar el paso
        break;
      case 'alcoba':
        fondoReal = 0.60; // Fondo necesario para que los ganchos de ropa queden holgados
        break;
      case 'centro-entretenimiento':
        fondoReal = 0.40; // Ideal para consolas, decodificadores y gestión de cables flotantes
        break;
    }
  }

  // --- MEJORA 2: RESTRICCIONES FÍSICAS (VALIDACIÓN DE LÁMINA DE MADERA) ---
  // En Colombia, la lámina estándar de marcas como Pelíkano o Primadera mide 2.44 mts de largo.
  // Si el mueble es más ancho que una lámina, físicamente se debe fabricar acoplando múltiples módulos.
  const LIMITE_LARGO_LAMINA = 2.44;
  let numeroModulos = 1;
  let requiereEstructuraModular = false;

  if (anchoMts > LIMITE_LARGO_LAMINA) {
    requiereEstructuraModular = true;
    // Dividimos el ancho total entre el límite y redondeamos hacia arriba (ej: 3mts / 2.44 = 1.22 -> 2 módulos)
    numeroModulos = Math.ceil(anchoMts / LIMITE_LARGO_LAMINA);
  }

  // Costo base del metro cuadrado de material
  let costoMetroCuadradoLamina = 120000;
  let diasBase = 10;

  if (categoria === 'cocina') {
    costoMetroCuadradoLamina = 150000;
    diasBase = 15;
  } else if (categoria === 'bano') {
    costoMetroCuadradoLamina = 130000;
    diasBase = 8;
  } else if (categoria === 'alcoba') {
    diasBase = 12;
  }

  // --- GEOMETRÍA TRIDIMENSIONAL DEL CASCO ---
  // Fachada (puertas) y fondo
  const areaFrenteYFondo = 2 * (anchoMts * altoMts);   
  // Piso y Techo
  const areaPisoYTecho = 2 * (anchoMts * fondoReal);    

  // Laterales: Si el mueble se divide en N módulos, se duplican los laterales internos de ensamble.
  // Un mueble de 1 módulo tiene 2 laterales. Un mueble acoplado de 2 módulos tiene 4 laterales reales.
  const totalLateralesFisicos = numeroModulos * 2;
  const areaLaterales = totalLateralesFisicos * (altoMts * fondoReal);     

  // Sumatoria del consumo real de madera en metros cuadrados
  const metrosCuadradosMaterial = areaFrenteYFondo + areaPisoYTecho + areaLaterales;

  // Incremento por tipo de material (RH para resistencia a la humedad)
  let factorMaterial = 1.0;
  if (tipoMaterial === 'rh') {
    factorMaterial = 1.30; // 30% más costoso por las propiedades hidrófugas del aglomerado
  }

  const costoMadera = metrosCuadradosMaterial * costoMetroCuadradoLamina * factorMaterial;

  // --- CÁLCULO DE HERRAJES ---
  let costoHerrajeBase = 60000;
  if (tipoHerraje === 'cierre-lento') costoHerrajeBase = 120000;
  if (tipoHerraje === 'push-to-open') costoHerrajeBase = 160000;

  // A mayor volumen y más módulos, más bisagras, patas regulables o sistemas de unión minifix se requieren
  const volumenMueble = anchoMts * altoMts * fondoReal;
  const multiplicadorModulos = 1 + (numeroModulos * 0.15); // Aumenta 15% el costo de herrajes por cada módulo extra
  const costoHerrajesTotal = costoHerrajeBase * (1 + volumenMueble) * multiplicadorModulos;

  // Mano de obra, corte en seccionadora y pegado de cantos
  const manoObra = (costoMadera + costoHerrajesTotal) * 0.40;

  // Sumatoria final aplicando un margen comercial del 30% de utilidad (factor 1.3)
  const precioFinalAntesDeMargen = costoMadera + costoHerrajesTotal + manoObra;
  const precioPublico = precioFinalAntesDeMargen * 1.3;

  return {
    precioTotal: Math.round(precioPublico),
    tiempoEntregaDias: diasBase,
    fondoUtilizadoMts: fondoReal,
    numeroModulosEstimados: numeroModulos,
    requiereEstructuraModular: requiereEstructuraModular,
    desglose: {
      materialBase: Math.round(costoMadera),
      herrajes: Math.round(costoHerrajesTotal),
      manoObraInstalacion: Math.round(manoObra)
    }
  };
}