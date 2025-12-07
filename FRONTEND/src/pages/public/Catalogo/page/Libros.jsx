import { useState, useMemo } from 'react';
import { CheckCircle } from 'lucide-react';
import { ActiveReservationNotification } from '../components/moleculas/ActiveReservationNotification';
import { FilterControls } from '../components/moleculas/FilterControls';
import { BookGrid } from '../components/organismos/BookGrid';
import { Modal } from '../components/atomos/Modal';

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

export default function LibrosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  
  const [activeReservation, setActiveReservation] = useState(null);

  const [modalInfo, setModalInfo] = useState({ show: false, title: '', message: '' });

  const filteredBooks = useMemo(() => {
    return MOCK_BOOKS.filter(book => {
      const matchesSearch = 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = 
        selectedCategory === 'Todos' || book.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);


  const handleShowModal = (title, message) => {
    setModalInfo({ show: true, title, message });
  };

  const handleReserve = (book) => {
    if (activeReservation) {
      handleShowModal(
        'Límite de Reserva Alcanzado',
        `Ya tienes una reserva activa para "${activeReservation.title}". Solo puedes reservar un libro a la vez.`
      );
    } else {
      // 2. Si no hay reserva, crear una
      setActiveReservation(book);
      handleShowModal(
        'Reserva Exitosa',
        `Has reservado "${book.title}" de ${book.author}. ¡Pasa a recogerlo!`
      );
    }
  };

  const handleCancelReservation = (book) => {
    setActiveReservation(null);
    handleShowModal(
      'Reserva Cancelada',
      `Has cancelado tu reserva de "${book.title}".`
    );
  };

  return (
    // Usamos el color de fondo de la app
    <div className="min-h-screen bg-[#F8F9FA] p-6 md:p-10">
      {/* Título y Encabezado */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-[#2D2D2D] mb-2">Catálogo de Libros</h1>
        <p className="text-lg text-gray-600">Explora, filtra y reserva tu próxima lectura.</p>
      </header>

      {/* Notificación de Reserva Activa */}
      <ActiveReservationNotification 
        reservedBook={activeReservation} 
        onCancel={() => handleCancelReservation(activeReservation)} 
      />

      {/* Controles de Filtro (Molécula) */}
      <FilterControls
        searchTerm={searchTerm}
        onSearch={(e) => setSearchTerm(e.target.value)}
        category={selectedCategory}
        onCategoryChange={(e) => setSelectedCategory(e.target.value)}
      />

      {/* Cuadrícula de Libros (Organismo) */}
      <BookGrid
        books={filteredBooks}
        activeReservationId={activeReservation ? activeReservation.id : null}
        onReserve={handleReserve}
        onCancel={handleCancelReservation}
      />

      {/* Modal para Notificaciones (Átomo) */}
      <Modal
        show={modalInfo.show}
        title={modalInfo.title}
        onClose={() => setModalInfo({ ...modalInfo, show: false })}
      >
        <div className="flex items-center gap-3">
          <CheckCircle size={40} className="text-green-500" />
          <p>{modalInfo.message}</p>
        </div>
      </Modal>
    </div>
  );
}