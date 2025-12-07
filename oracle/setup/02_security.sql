-- 02_security.sql
ALTER SESSION SET CONTAINER = XEPDB1;

-- 1. CREAR EL ROL (El "Llavero")
CREATE ROLE BG_APP_ROLE;

-- 2. DAR PERMISOS AL ROL (Llenar el llavero)
-- Damos permisos sobre las tablas del Dueño (BG_OWNER)
GRANT SELECT, INSERT, UPDATE ON BG_OWNER.Usuario TO BG_APP_ROLE;
GRANT SELECT, INSERT, UPDATE ON BG_OWNER.Bibliotecario TO BG_APP_ROLE;
GRANT SELECT, INSERT, UPDATE ON BG_OWNER.Libro TO BG_APP_ROLE;
GRANT SELECT, INSERT, UPDATE ON BG_OWNER.Ejemplar TO BG_APP_ROLE;
GRANT SELECT, INSERT, UPDATE ON BG_OWNER.PrestamoLibro TO BG_APP_ROLE;
GRANT SELECT, INSERT, UPDATE ON BG_OWNER.ReservaLaptop TO BG_APP_ROLE;
GRANT SELECT, INSERT, UPDATE ON BG_OWNER.ReservaCubiculo TO BG_APP_ROLE;
GRANT SELECT, INSERT, UPDATE ON BG_OWNER.Sancion TO BG_APP_ROLE;
-- ... Agrega aquí el resto de tablas con permisos necesarios ...

-- Para tablas maestras que rara vez cambian, quizás solo SELECT
GRANT SELECT ON BG_OWNER.Areas TO BG_APP_ROLE;
GRANT SELECT ON BG_OWNER.UnidadAcademica TO BG_APP_ROLE;

-- 3. CREAR EL USUARIO DE CONEXIÓN (El que usa Node.js)
-- Nota: Pon una contraseña fuerte aquí o pásala por variable si es posible
CREATE USER BG_CONNECT IDENTIFIED BY "bgconnect123";

-- Le damos permiso para conectarse y usar el Tablespace si necesita ordenar datos
GRANT CREATE SESSION TO BG_CONNECT;
ALTER USER BG_CONNECT QUOTA UNLIMITED ON BiblioGuest; -- Solo para temporales

-- 4. ASIGNAR EL ROL AL USUARIO
GRANT BG_APP_ROLE TO BG_CONNECT;

-- 5. CREAR SINÓNIMOS (Magia para el Backend)
-- Esto permite que en tu Node.js escribas "SELECT * FROM Libro" 
-- en vez de "SELECT * FROM BG_OWNER.Libro"

CREATE OR REPLACE SYNONYM BG_CONNECT.Usuario FOR BG_OWNER.Usuario;
CREATE OR REPLACE SYNONYM BG_CONNECT.Libro FOR BG_OWNER.Libro;
CREATE OR REPLACE SYNONYM BG_CONNECT.Bibliotecario FOR BG_OWNER.Bibliotecario;
CREATE OR REPLACE SYNONYM BG_CONNECT.PrestamoLibro FOR BG_OWNER.PrestamoLibro;
CREATE OR REPLACE SYNONYM BG_CONNECT.ReservaLaptop FOR BG_OWNER.ReservaLaptop;
CREATE OR REPLACE SYNONYM BG_CONNECT.ReservaCubiculo FOR BG_OWNER.ReservaCubiculo;
CREATE OR REPLACE SYNONYM BG_CONNECT.Sancion FOR BG_OWNER.Sancion;
CREATE OR REPLACE SYNONYM BG_CONNECT.Ejemplar FOR BG_OWNER.Ejemplar;
CREATE OR REPLACE SYNONYM BG_CONNECT.Areas FOR BG_OWNER.Areas;
CREATE OR REPLACE SYNONYM BG_CONNECT.UnidadAcademica FOR BG_OWNER.UnidadAcademica;
-- ... Repite para todas las tablas que use tu backend ...