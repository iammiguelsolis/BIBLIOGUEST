## LAPTOP

---
### GET /laptop?idBiblioteca&sistemaOperativo&marca&modelo&estado
#### Campos:
- **idBiblioteca** (Ej: 1, 4, 6)
- **sistemaOperativo** (Ej: 'Windows')
- **marca** 
- **modelo**
- **estado** (ENUM('disponible', 'en uso', 'baja'))

**Ningun campo es obligatorio**

---
### GET /laptop/:id

> Para obtener una laptop por su ID

> id debe ser un numero entero

---

### POST /laptop

> Para registrar una nueva laptop en el sistema.

#### BODY:

```json
{
  "idBiblioteca": 1,          // NUMBER (opcional, FK a Biblioteca.id_biblioteca)
  "numeroSerie": "SN-001",    // STRING (obligatorio, UNIQUE)
  "sistemaOperativo": "Windows 11", // STRING (obligatorio)
  "marca": "Dell",            // STRING (obligatorio)
  "modelo": "Latitude 5420",  // STRING (obligatorio)
  "idUtilidad": 2,            // NUMBER (opcional, FK a Utilidad.id_utilidad)
  "estado": "disponible"      // ENUM('disponible', 'en uso', 'baja') (opcional, por defecto 'disponible')
}
```

- Si estado no se envía, se registra como 'disponible'.
- Si numeroSerie ya existe, la BD devolverá error por la restricción UNIQUE.
- Si idBiblioteca o idUtilidad no existen, fallará por la FK.

---
### PUT /laptop/:id
> Para actualizar los datos de una laptop

> id debe ser numero entero

#### Body:

```json
{
  "idBiblioteca": 1,          // NUMBER (opcional)
  "numeroSerie": "SN-001-A",  // STRING (opcional)
  "sistemaOperativo": "Ubuntu 22.04", // STRING (opcional)
  "marca": "Dell",            // STRING (opcional)
  "modelo": "Latitude 5430",  // STRING (opcional)
  "estado": "en uso"          // ENUM('disponible', 'en uso', 'baja') (opcional)
}
```

- Ningún campo del body es obligatorio, solo se actualizarán los campos que se envíen
- Si no se encuentra una laptop con ese id, se responderá con 404
- Si se envía un estado distinto a 'disponible', 'en uso' o 'baja' la BD lo rechazará por el ENUM
- Si se cambia numeroSerie a un valor que ya existe en otra laptop la BD dará error por el  UNIQUE
---

### DELETE /laptop/:id

> Para eliminar físicamente una laptop

> id debe ser un numero

- Si no existe una laptop con ese id, se responderá con 404.

---

## RESERVA LAPTOP
---
### GET /reservaLaptop?fechaReserva&idUsuario&idLaptop&estado&idBibliotecario
#### Campos:
- **fechaReserva** (YYYY-MM-DD)
- **idUsuario** (Ej: 8, 16, 12, 17)
- **idLaptop** (Ej: 1, 2)
- **estado** (ENUM (activa, cancelada, finalizada))
- **idBibliotecario** (Ej: 4, 6, 2)

**Ningun campo es obligatorio.**

---
### GET /reservaLaptop/disponibilidad?fecha&horaInicioNum&duracionHoras&sistemaOperativo&marca

#### Campos:
- **fecha** (YYYY-MM-DD)
- **horaInicioNum** (Ej: 8, 16, 12, 17)
- **duracionHoras** (Ej: 1, 2)
- **sistemaOperativo** (Ej: Ubuntu)
- **marca** (Ej: Dell)

**Ningun campo es obligatorio.**
- Si fecha esta vacio tomara la fecha actual.
- Si horaInicioNum esta vacio te dara horarios de todas las horas
- Si duracionHoras esta vacio tomara el valor de 1

---
### GET /reservaLaptop/:id

> Para obtener una reserva por su ID

> id debe ser un numero entero

---
### POST /reservaLaptop

#### BODY:

```json
{
  "idUsuario": 1 (NUMBER),
  "idLaptop": 1 (NUMBER),
  "fecha": "YYYY-MM-DD",
  "horaInicio": "10", (HH o tambien HH:MI)
  "horaFin": "17:00", (HH o tambien HH:MI)
  "idBibliotecario": null (esto se llena cuando el bibliotecario confirma que se uso la reserva)
}
```

---
### POST /reservaLaptop/:id/finalizar

#### No es necesario Body

> Esto se ejecutara cuando la reserva se haya llevado a cabo y ya hayan terminado de usarla

- id, debe ser un numero entero, id de una reserva existente y que este en estado activa

---
### DELETE /reservaLaptop/:id

> Para cancelar una reserva

> id debe ser un numero entero

---

## LIBRO

---
### GET /libro?isbn&titulo&subtitulo&editorial&anio
#### Campos:
- **isbn** (Ej: "978-1234567890")
- **titulo** (Ej: "Introducción a la Programación")
- **subtitulo** (Ej: "Enfocado en Java")
- **editorial** (Ej: "Pearson", "McGraw-Hill")
- **anio** (Ej: 2020, 2018)

**Ningún campo es obligatorio.**  
Devuelve una lista paginada de libros que coincidan con los filtros enviados.

---
### GET /libro/:id

> Para obtener un libro por su ID

> id debe ser un número entero

Devuelve los datos básicos del libro (sin autores, categorías ni etiquetas).

---
### GET /libro/:id/detalle

> Para obtener un libro con su información relacionada

> id debe ser un número entero

Devuelve:
- Datos del libro (idLibro, isbn, titulo, subtitulo, editorial, nroEdicion, anio)
- Lista de **autores** asociados
- Lista de **categorías** asociadas
- Lista de **etiquetas** asociadas

---
### POST /libro

> Para registrar un nuevo libro en el sistema.

#### BODY:

```json
{
  "isbn": "978-1234567890",        // STRING (opcional, UNIQUE)
  "titulo": "Introducción a X",    // STRING (obligatorio)
  "subtitulo": "Conceptos básicos",// STRING (opcional)
  "editorial": "Editorial X",      // STRING (opcional)
  "nroEdicion": 2,                 // NUMBER (opcional)
  "anio": 2024                     // NUMBER (opcional)
}
```

- El campo **titulo** es obligatorio.
- Si **isbn** ya existe, la BD devolverá error por la restricción UNIQUE.
- Si no se envían `nroEdicion` o `anio`, se guardarán como NULL.

---
### PUT /libro/:id

> Para actualizar los datos de un libro.

> id debe ser un número entero

#### BODY (ejemplo):

```json
{
  "isbn": "978-9876543210",        
  "titulo": "Título actualizado",
  "subtitulo": "Subtítulo actualizado",
  "editorial": "Otra Editorial",
  "nroEdicion": 3,
  "anio": 2025
}
```

- Ningún campo del body es obligatorio; solo se actualizarán los campos que se envíen.
- Si no se encuentra un libro con ese **id**, se responderá con **404**.
- Si se cambia **isbn** a un valor que ya existe en otro libro, la BD dará error por la restricción UNIQUE.

---
### DELETE /libro/:id

> Para eliminar físicamente un libro

> id debe ser un número entero

- Si no existe un libro con ese **id**, se responderá con **404**.
- Si el libro tiene **ejemplares asociados**, la BD no permitirá su eliminación por la restricción de clave foránea.

---
### POST /libro/:id/autores

> Para asignar o reemplazar la lista de autores asociados a un libro.

> id debe ser un número entero

#### BODY:

```json
{
  "autores": [1, 2, 3]   // ARRAY de IDs de autores (NUMBER)
}
```

- El campo **autores** debe ser un array.
- Se eliminarán las relaciones anteriores (LibroAutor) y se registrarán las nuevas.
- Si algún idAutor no existe, la BD devolverá error por la FK.

---
### DELETE /libro/:id/autores/:idAutor

> Para eliminar la asociación entre un libro y un autor específico.

> id e idAutor deben ser números enteros

- Si no existe la relación libro-autor, se responderá con **404**.

---
### POST /libro/:id/categorias

> Para asignar o reemplazar la lista de categorías asociadas a un libro.

> id debe ser un número entero

#### BODY:

```json
{
  "categorias": [1, 4, 7]   // ARRAY de IDs de categorías (NUMBER)
}
```

- El campo **categorias** debe ser un array.
- Se eliminarán las relaciones anteriores (CategoriasLibro) y se registrarán las nuevas.
- Si algún idCategoria no existe, la BD devolverá error por la FK.

---
### DELETE /libro/:id/categorias/:idCategoria

> Para eliminar la asociación entre un libro y una categoría específica.

> id e idCategoria deben ser números enteros

- Si no existe la relación libro-categoría, se responderá con **404**.

---
### POST /libro/:id/etiquetas

> Para asignar o reemplazar la lista de etiquetas asociadas a un libro.

> id debe ser un número entero

#### BODY:

```json
{
  "etiquetas": [2, 5, 9]   // ARRAY de IDs de etiquetas (NUMBER)
}
```

- El campo **etiquetas** debe ser un array.
- Se eliminarán las relaciones anteriores (LibroEtiquetas) y se registrarán las nuevas.
- Si algún idEtiqueta no existe, la BD devolverá error por la FK.

---
### DELETE /libro/:id/etiquetas/:idEtiqueta

> Para eliminar la asociación entre un libro y una etiqueta específica.

> id e idEtiqueta deben ser números enteros

- Si no existe la relación libro-etiqueta, se responderá con **404**.
