import { Search } from 'lucide-react';

const MOCK_BOOKS = [
  { id: 1, title: 'Cien Años de Soledad', author: 'Gabriel García Márquez', category: 'Ficción', status: 'Disponible', rating: 4.8, imageUrl: 'https://placehold.co/300x450/E8A03E/FFFFFF?text=Libro' },
  { id: 2, title: 'El Código Da Vinci', author: 'Dan Brown', category: 'Misterio', status: 'Disponible', rating: 4.5, imageUrl: 'https://placehold.co/300x450/3B6C9D/FFFFFF?text=Libro' },
  { id: 3, title: '1984', author: 'George Orwell', category: 'Distopía', status: 'Disponible', rating: 4.9, imageUrl: 'https://placehold.co/300x450/2D2D2D/FFFFFF?text=Libro' },
  { id: 4, title: 'El Señor de los Anillos', author: 'J.R.R. Tolkien', category: 'Fantasía', status: 'Disponible', rating: 5.0, imageUrl: 'https://placehold.co/300x450/D9232D/FFFFFF?text=Libro' },
  { id: 5, title: 'Aprendiendo React', author: 'Alex Banks', category: 'Tecnología', status: 'Disponible', rating: 4.3, imageUrl: 'https://placehold.co/300x450/E8A03E/FFFFFF?text=Libro' },
  { id: 6, title: 'Sapiens: De animales a dioses', author: 'Yuval Noah Harari', category: 'Historia', status: 'Disponible', rating: 4.7, imageUrl: 'https://placehold.co/300x450/3B6C9D/FFFFFF?text=Libro' },
  { id: 7, title: 'Duna', author: 'Frank Herbert', category: 'Ciencia Ficción', status: 'Disponible', rating: 4.6, imageUrl: 'https://placehold.co/300x450/2D2D2D/FFFFFF?text=Libro' },
  { id: 8, title: 'Fundamentos de Bases de Datos', author: 'Silberschatz', category: 'Tecnología', status: 'Disponible', rating: 4.2, imageUrl: 'https://placehold.co/300x450/D9232D/FFFFFF?text=Libro' },
];

// Extraer categorías únicas de los datos
const CATEGORIES = ['Todos', ...new Set(MOCK_BOOKS.map(b => b.category))];

export const FilterControls = ({ searchTerm, onSearch, category, onCategoryChange }) => (
  <div className="bg-[#FFFFFF] p-4 rounded-lg shadow-md mb-8 flex flex-col md:flex-row gap-4 items-center">
    {/* Barra de Búsqueda */}
    <div className="relative w-full md:flex-1">
      <input
        type="text"
        placeholder="Buscar por título o autor..."
        value={searchTerm}
        onChange={onSearch}
        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg text-[#2D2D2D] focus:outline-none focus:border-[#E8A03E] transition-colors"
      />
      <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
    </div>
    
    {/* Selector de Categoría */}
    <div className="relative w-full md:w-auto">
      <select
        value={category}
        onChange={onCategoryChange}
        className="w-full appearance-none bg-gray-100 border-2 border-gray-200 text-[#2D2D2D] py-3 px-4 pr-8 rounded-lg focus:outline-none focus:bg-white focus:border-[#E8A03E]"
      >
        {CATEGORIES.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  </div>
);