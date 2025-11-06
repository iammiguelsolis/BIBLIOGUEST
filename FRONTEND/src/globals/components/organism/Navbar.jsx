
    
    function Navbar() {
    return (
        <header className=" shadow-md sticky top-0 z-50">
    
        <nav className="bg-primary text-white px-6 py-6 relative flex items-center">
            
            
            <div className="text-surface font-extrabold text-2xl tracking-wide">
            BiblioGuest
            </div>

            {/* === Enlaces de navegación === */}
            <div className="hidden md:flex gap-6 text-base font-medium absolute left-1/2 -translate-x-1/2">
            <a href="#" className="hover:text-secondary transition-colors duration-200">
                Inicio
            </a>
            <a href="#" className="hover:text-secondary transition-colors duration-200">
                Catálogo
            </a>
            <a href="#" className="hover:text-secondary transition-colors duration-200">
                Mi Perfil
            </a>
            
            </div>

            <div className="text-base font-medium absolute right-8">
                <a href="#" className="hover:text-secondary transition-colors duration-200 ">
                    Iniciar Sesión
                </a>
            </div>

        </nav>
        </header>
    );
    }

    export default Navbar;
