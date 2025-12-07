import { BookOpen } from 'lucide-react';
import { BookCard } from '../moleculas/BookCard';

export const BookGrid = ({ books, onReserve, onCancel, activeReservationId }) => {
  if (books.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <BookOpen size={48} className="mx-auto mb-4" />
        <h3 className="text-xl font-semibold">No se encontraron libros</h3>
        <p>Intenta ajustar tus filtros de búsqueda.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map(book => {
        const isReserved = activeReservationId === book.id;
        // Esta es la lógica clave: deshabilita si hay una reserva activa Y NO es este libro.
        const isDisabled = activeReservationId !== null && activeReservationId !== book.id;

        return (
          <BookCard
            key={book.id}
            book={book}
            isReserved={isReserved}
            isDisabled={isDisabled}
            onReserve={() => onReserve(book)}
            onCancel={() => onCancel(book)}
          />
        );
      })}
    </div>
  );
};