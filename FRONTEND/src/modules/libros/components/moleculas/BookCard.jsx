import { Star } from 'lucide-react';
import { BookCover } from '../atomos/BookCover';
import { Button } from '../atomos/Button';
import { Badge } from '../atomos/Badge';

export const BookCard = ({ book, onReserve, onCancel, isReserved, isDisabled }) => {
  return (
    <div className="bg-[#FFFFFF] rounded-lg shadow-lg overflow-hidden flex flex-col justify-between transition-transform transform hover:-translate-y-1 duration-300">
      <div>
        <BookCover src={book.imageUrl} alt={book.title} />
        <div className="p-4">
          <div className="flex justify-between items-center mb-1">
            <Badge>{book.category}</Badge>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star size={16} fill="currentColor" />
              <span className="font-bold text-sm text-[#2D2D2D]">{book.rating}</span>
            </div>
          </div>
          <h3 className="text-lg font-bold text-[#2D2D2D] truncate" title={book.title}>
            {book.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3">{book.author}</p>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-100">
        {isReserved ? (
          <Button variant="accent" onClick={onCancel} className="w-full">
            Cancelar Reserva
          </Button>
        ) : (
          <Button variant="secondary" onClick={onReserve} disabled={isDisabled} className="w-full">
            {isDisabled ? "Reserva no disponible" : "Reservar Ahora"}
          </Button>
        )}
      </div>
    </div>
  );
};