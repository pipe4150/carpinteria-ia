export interface Mueble {
  id: string;
  nombre: string;
  descripcion: string;
  precioBase: number; 
  imagen: string;
  categoria: 'Cocina' | 'Closet' | 'Entretenimiento' | 'Baño';
  materialesDisponibles: string[]; 
}

// Fíjate bien en este nombre: "catalogoMuebles"
export const catalogoMuebles: Mueble[] = [
  {
    id: '1',
    nombre: 'Cocina Integral Moderna',
    descripcion: 'Optimización de espacio, herrajes de cierre lento y módulo para torre de hornos.',
    precioBase: 3500000, 
    imagen: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    categoria: 'Cocina',
    materialesDisponibles: ['Melamina RH', 'Poliuretano', 'Madera Sólida']
  },
  {
    id: '2',
    nombre: 'Closet de Pared a Pared',
    descripcion: 'Distribución interna a medida con maleteros, zapateras extraíbles y pantaloneros.',
    precioBase: 2200000,
    imagen: 'https://images.unsplash.com/photo-1558882224-cca166733360?auto=format&fit=crop&w=800&q=80',
    categoria: 'Closet',
    materialesDisponibles: ['Melamina Estándar', 'Melamina RH']
  },
  {
    id: '3',
    nombre: 'Centro de Entretenimiento',
    descripcion: 'Diseño flotante con pasacables ocultos y luces LED decorativas empotradas.',
    precioBase: 1800000,
    imagen: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
    categoria: 'Entretenimiento',
    materialesDisponibles: ['Melamina', 'MDF Pintado']
  }
];