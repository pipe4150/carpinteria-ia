import { NextResponse } from 'next/server';
import { ParametrosCotizacion } from '@/data/cotizador';

// Definimos la estructura de lo que nos responderá la IA al procesar el texto
interface RespuestaIA {
  analisisExplicativo: string;
  configuracionSugerida: Partial<ParametrosCotizacion>;
  colorSugerido: string;
}

export async function POST(request: Request) {
  try {
    // 1. Recibimos el texto que el usuario escribió en la web
    const body = await request.json();
    const { mensajeUsuario } = body;

    if (!mensajeUsuario) {
      return NextResponse.json({ error: 'El mensaje es requerido' }, { status: 400 });
    }

    // 2. LÓGICA DE PROCESAMIENTO (Simulador del modelo de IA)
    // En el siguiente paso conectaremos la librería oficial de Google Gemini o OpenAI.
    // Por ahora, creamos un motor de reglas heurísticas (Inteligencia de Reglas) para probar el flujo de datos.
    
    const textoMinusc = mensajeUsuario.toLowerCase();
    let categoria: ParametrosCotizacion['categoria'] = 'centro-entretenimiento';
    let herraje: ParametrosCotizacion['tipoHerraje'] = 'estandar';
    let material: ParametrosCotizacion['tipoMaterial'] = 'estandar';
    let ancho = 1.60;
    let alto = 1.00;
    let analiticaTextual = "He procesado tu idea. Basado en un diseño estándar de sala, te sugiero un centro de entretenimiento minimalista.";

    // Simulación de reconocimiento de patrones (NLP básico)
    if (textoMinusc.includes('cocina') || textoMinusc.includes('platos') || textoMinusc.includes('mesón')) {
      categoria = 'cocina';
      ancho = 2.40;
      alto = 2.10;
      material = 'rh'; // Cocinas siempre exigen RH por norma técnica
      analiticaTextual = "Detecté que buscas una Cocina. Al ser un espacio húmedo, configuré automáticamente madera RH de alta resistencia y dimensiones estándar para estufa y lavaplatos.";
    } else if (textoMinusc.includes('baño') || textoMinusc.includes('lavamanos')) {
      categoria = 'bano';
      ancho = 0.80;
      alto = 0.60;
      material = 'rh';
      analiticaTextual = "Para tu mueble de baño he seleccionado herrajes estándar y material RH para garantizar que el vapor de la ducha no sople la madera.";
    } else if (textoMinusc.includes('clóset') || textoMinusc.includes('ropa') || textoMinusc.includes('vestier')) {
      categoria = 'alcoba';
      ancho = 2.00;
      alto = 2.30;
      analiticaTextual = "Diseño modular de clóset optimizado para alcoba. Configurado con una altura ideal para maleteros superiores.";
    }

    // Detección de tipos de apertura
    if (textoMinusc.includes('sin manijas') || textoMinusc.includes('push') || textoMinusc.includes('tocar')) {
      herraje = 'push-to-open';
    } else if (textoMinusc.includes('premium') || textoMinusc.includes('golpes') || textoMinusc.includes('suave')) {
      herraje = 'cierre-lento';
    }

    const respuestaSimulada: RespuestaIA = {
      analisisExplicativo: analiticaTextual,
      configuracionSugerida: {
        categoria,
        anchoMts: ancho,
        altoMts: alto,
        tipoMaterial: material,
        tipoHerraje: herraje
      },
      colorSugerido: textoMinusc.includes('oscuro') ? 'Wengue o Plomo' : 'Roble Claro o Blanco Frost'
    };

    // 3. Retornamos la respuesta al frontend de Next.js
    return NextResponse.json(respuestaSimulada);

  } catch (error) {
    return NextResponse.json({ error: 'Error interno en el motor de IA' }, { status: 500 });
  }
}