import { Home, Laptop, SquareUser, Book, Heart, Menu } from 'lucide-react';
import { SidebarItem } from '../molecules/SidebarItem';
import { useLocation } from 'react-router-dom';
import { Icon } from '../atoms/Icon';
import LogoCompletoDOS from '../../../assets/LogoCompletoDOS.svg';

export const Sidebar = ({ isExpanded, onToggle }) => {
  const location = useLocation();

  const menuItems = [
    { name: 'Inicio', icon: Home, path: '/inicio' },
    { name: 'Laptops', icon: Laptop, path: '/laptop' },
    { name: 'Cubiculos', icon: SquareUser, path: '/cubiculos' },
    { name: 'Libros', icon: Book, path: '/libros' },
    { name: 'Donar', icon: Heart, path: '/donar' },
  ];

  return (
    // El ancho cambia con 'isExpanded'
    <aside
      className={`
        h-screen bg-[#D9232D] text-white flex flex-col p-4 shadow-lg
        transition-all duration-300 ease-in-out
        ${isExpanded ? 'w-64' : 'w-20'}
      `}
    >
      {/* Encabezado con logo y botón de colapsar */}
      <header className="flex items-center justify-between mb-6">
        {/* El logo se oculta con una transición */}
        <div
          className={`overflow-hidden transition-all ${
            isExpanded ? 'w-40' : 'w-0'
          }`}
        >
          <img src={LogoCompletoDOS} alt="Logo Completo" />
        </div>
        {/* El botón 'onToggle' controla el estado en el layout padre */}
        <button
          onClick={onToggle}
          className="p-1 rounded-lg hover:bg-white/10 cursor-pointer"
        >
          <Icon icon={Menu} />
        </button>
      </header>

      {/* Navegación */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.name}
              icon={item.icon}
              text={item.name}
              active={location.pathname === item.path}
              isExpanded={isExpanded}
              to={item.path}
            />
          ))}
        </ul>
      </nav>

      {/* Pie de página */}
      <footer
        className={`p-4 mt-auto border-t border-white/20 overflow-hidden ${
          !isExpanded && 'hidden'
        }`}
      >
        <p className="text-sm text-center text-white/70">
          © {new Date().getFullYear()} BiblioGuest
        </p>
      </footer>
    </aside>
  );
};