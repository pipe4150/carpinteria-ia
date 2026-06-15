// 1. El "Plano" o Contrato de cómo debe ser cada mueble en nuestro sistema
export interface Mueble {
  id: string;
  nombre: string;
  linea: 'Milán Nordik' | 'Habitat Smart'; // Usamos unión de tipos para restringir las opciones
  descripcion: string;
  precioBase: number; // Siempre en número limpio para poder hacer operaciones matemáticas después
  dimensionesPorDefecto: {
    ancho: number; // en centímetros
    alto: number;
    fondo: number;
  };
  materialesDisponibles: string[];
  imagenUrl: string;
}

// 2. Nuestra "Bodega" real con los dos productos inspirados en tus referencias
export const CATALOGO_MUEBLES: Mueble[] = [
  {
    id: 'milan-nordik-tv',
    nombre: 'Centro de Entretenimiento Milán Nordik',
    linea: 'Milán Nordik',
    descripcion: 'Panel central con acabado tipo piedra premium, iluminación posterior LED cálida integrada y sección lateral en alistonado de madera noble. Mueble inferior flotante con sistema de apertura push.',
    precioBase: 1850000, // Precio estimado en COP para iniciar
    dimensionesPorDefecto: {
      ancho: 200,
      alto: 160,
      fondo: 35
    },
    materialesDisponibles: ['Melamina RH Nogal', 'Poliuretano Blanco Brillante', 'Mármol Sintético'],
    imagenUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80' // Imagen temporal de prueba
  },
  {
    id: 'habitat-smart-desk',
    nombre: 'Escritorio Flotante Studio Habitat',
    linea: 'Habitat Smart',
    descripcion: 'Optimizado para productividad y teletrabajo. Incluye fondo alistonado decorativo, módulo superior de almacenamiento aéreo con puertas batientes y pasacables oculto bajo la cubierta principal.',
    precioBase: 1200000,
    dimensionesPorDefecto: {
      ancho: 140,
      alto: 120,
      fondo: 50
    },
    materialesDisponibles: ['Melamina RH Encino', 'Gris Grafito Mate', 'Blanco Niebla'],
    imagenUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&q=80' // Imagen temporal de prueba
  }
];