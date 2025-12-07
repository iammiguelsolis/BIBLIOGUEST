import { Home, Laptop, SquareUser, Book, Heart, Menu, BookOpen, Users, Settings, Shield, Search, LogOut, User } from 'lucide-react';
import { SidebarItem } from '../molecules/SidebarItem';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '../atoms/Icon';
import LogoCompletoDOS from '../../../assets/LogoCompletoDOS.svg';
import { useAuth } from '../../hooks/useAuth';

// Menús por rol
const menusPorRol = {
  // Sin autenticar - menú básico
  public: [
    { name: 'Inicio', icon: Home, path: '/' },
    { name: 'Catálogo', icon: Book, path: '/catalogo' },
    { name: 'Donar', icon: Heart, path: '/donar' },
  ],
  estudiante: [
    { name: 'Inicio', icon: Home, path: '/' },
    { name: 'Catálogo', icon: Book, path: '/catalogo' },
    { name: 'Laptops', icon: Laptop, path: '/laptops' },
    { name: 'Cubículos', icon: SquareUser, path: '/cubiculos' },
    { name: 'Mis Préstamos', icon: BookOpen, path: '/prestamos' },
    { name: 'Donar', icon: Heart, path: '/donar' },
  ],
  bibliotecario: [
    { name: 'Inicio', icon: Home, path: '/' },
    { name: 'Catálogo', icon: Book, path: '/catalogo' },
    { divider: true, label: 'Gestión' },
    { name: 'Préstamos', icon: BookOpen, path: '/gestion/prestamos' },
    { name: 'Reservas Laptops', icon: Laptop, path: '/gestion/reservas/laptops' },
    { name: 'Reservas Cubículos', icon: SquareUser, path: '/gestion/reservas/cubiculos' },
    { name: 'Usuarios', icon: Search, path: '/gestion/usuarios' },
  ],
  administrador: [
    { name: 'Inicio', icon: Home, path: '/' },
    { name: 'Catálogo', icon: Book, path: '/catalogo' },
    { divider: true, label: 'Administración' },
    { name: 'Bibliotecarios', icon: Users, path: '/admin/bibliotecarios' },
    { name: 'Sanciones', icon: Shield, path: '/admin/sanciones' },
    { name: 'Configuración', icon: Settings, path: '/admin/config' },
    { divider: true, label: 'Gestión' },
    { name: 'Préstamos', icon: BookOpen, path: '/gestion/prestamos' },
    { name: 'Reservas Laptops', icon: Laptop, path: '/gestion/reservas/laptops' },
    { name: 'Reservas Cubículos', icon: SquareUser, path: '/gestion/reservas/cubiculos' },
    { name: 'Usuarios', icon: Search, path: '/gestion/usuarios' },
  ],
};

export const Sidebar = ({ isExpanded, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { usuario, isAuthenticated, logout } = useAuth();

  // Obtener menú según rol del usuario
  const rol = usuario?.rol || 'public';
  const menuItems = menusPorRol[rol] || menusPorRol.public;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className={`
        h-screen bg-[#D9232D] text-white flex flex-col p-4 shadow-lg
        transition-all duration-300 ease-in-out
        ${isExpanded ? 'w-64' : 'w-20'}
      `}
    >
      {/* Encabezado con logo y botón de colapsar */}
      <header className="flex items-center justify-between mb-6">
        <div
          className={`overflow-hidden transition-all ${
            isExpanded ? 'w-40' : 'w-0'
          }`}
        >
          <img src={LogoCompletoDOS} alt="Logo Completo" />
        </div>
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
          {menuItems.map((item, index) => (
            item.divider ? (
              // Separador
              <li key={`divider-${index}`} className={`pt-4 ${!isExpanded && 'hidden'}`}>
                <span className="text-xs text-white/50 uppercase tracking-wider">
                  {item.label}
                </span>
              </li>
            ) : (
              <SidebarItem
                key={item.name}
                icon={item.icon}
                text={item.name}
                active={location.pathname === item.path}
                isExpanded={isExpanded}
                to={item.path}
              />
            )
          ))}
        </ul>
      </nav>

      {/* Usuario y Logout */}
      {isAuthenticated && (
        <div className={`mt-4 pt-4 border-t border-white/20 ${!isExpanded && 'hidden'}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <User size={20} />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">{usuario?.nombre}</p>
              <p className="text-xs text-white/70 capitalize">{usuario?.rol}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm"
          >
            <LogOut size={18} />
            Cerrar Sesión
          </button>
        </div>
      )}

      {/* Botón Login si no está autenticado */}
      {!isAuthenticated && isExpanded && (
        <div className="mt-4 pt-4 border-t border-white/20">
          <button
            onClick={() => navigate('/login')}
            className="w-full px-4 py-2 bg-white text-red-600 rounded-lg font-medium hover:bg-white/90 transition-colors"
          >
            Iniciar Sesión
          </button>
        </div>
      )}

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