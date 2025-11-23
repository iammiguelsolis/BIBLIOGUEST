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

---
## EJEMPLAR

---
### GET /ejemplar?idLibro&idBiblioteca&estado&codigoBarra
#### Campos:
- **idLibro** (Ej: 1, 5, 10)
- **idBiblioteca** (Ej: 1, 2, 3)
- **estado** (ENUM('disponible', 'prestado', 'deteriorado'))
- **codigoBarra** (Ej: "CB-001")

**Ningún campo es obligatorio.**  
Devuelve una lista paginada de ejemplares que coincidan con los filtros enviados.

---
### GET /ejemplar/:id

> Para obtener un ejemplar por su ID

> id debe ser un número entero

Devuelve los datos básicos del ejemplar:
- idEjemplar, idLibro, idBiblioteca, codigoBarra, estado

---
### POST /ejemplar

> Para registrar un nuevo ejemplar de un libro.

#### BODY:

```json
{
  "idLibro": 1,            // NUMBER (obligatorio, FK a LIBRO.id_libro)
  "idBiblioteca": 1,       // NUMBER (opcional, FK a BIBLIOTECA.id_biblioteca)
  "codigoBarra": "CB-001", // STRING (opcional, UNIQUE)
  "estado": "disponible"   // ENUM('disponible', 'prestado', 'deteriorado') (opcional)
}
```

- El campo **idLibro** es obligatorio.
- Si **codigoBarra** ya existe, la BD devolverá error por la restricción UNIQUE.
- Si se envía un **estado** distinto a `disponible`, `prestado` o `deteriorado`, la BD lo rechazará.

---
### PUT /ejemplar/:id

> Para actualizar los datos de un ejemplar.

> id debe ser un número entero

#### BODY (ejemplo):

```json
{
  "idLibro": 1,              // NUMBER (opcional)
  "idBiblioteca": 2,         // NUMBER (opcional)
  "codigoBarra": "CB-001-A", // STRING (opcional)
  "estado": "deteriorado"    // ENUM('disponible', 'prestado', 'deteriorado') (opcional)
}
```

- Ningún campo del body es obligatorio; solo se actualizarán los campos que se envíen.
- Si no se encuentra un ejemplar con ese **id**, se responderá con **404**.

---
### DELETE /ejemplar/:id

> Para eliminar físicamente un ejemplar

> id debe ser un número entero

- Si no existe un ejemplar con ese **id**, se responderá con **404**.
- Si el ejemplar está referenciado en **PrestamoLibro**, la BD no permitirá su eliminación por la restricción de clave foránea.

---
### POST /ejemplar/:id/deteriorar

> Para marcar rápidamente un ejemplar como `deteriorado`.

> id debe ser un número entero

- No requiere body.
- Si no existe un ejemplar con ese **id**, se responderá con **404**.

---
### POST /ejemplar/:id/restaurar

> Para marcar un ejemplar como `disponible` (por ejemplo, luego de reparación).

> id debe ser un número entero

- No requiere body.
- Si no existe un ejemplar con ese **id**, se responderá con **404**.

---
## PRESTAMO LIBRO

---
### GET /prestamoLibro?idUsuario&idBibliotecario&idEjemplar&estado&fechaInicioDesde&fechaInicioHasta&fechaFinDesde&fechaFinHasta
#### Campos:
- **idUsuario** (Ej: 10, 25)
- **idBibliotecario** (Ej: 2, 5)
- **idEjemplar** (Ej: 3, 8)
- **estado** (ENUM('activo', 'finalizado', 'atrasado'))
- **fechaInicioDesde** (YYYY-MM-DD)
- **fechaInicioHasta** (YYYY-MM-DD)
- **fechaFinDesde** (YYYY-MM-DD)
- **fechaFinHasta** (YYYY-MM-DD)

**Ningún campo es obligatorio.**  
Devuelve una lista paginada de préstamos que coincidan con los filtros enviados.

---
### GET /prestamoLibro/:id

> Para obtener un préstamo por su ID

> id debe ser un número entero

Devuelve los datos del préstamo desde la tabla **PrestamoLibro**:
- idPrestamo
- idUsuario
- idBibliotecario
- idEjemplar
- fechaSolicitud
- fechaInicio
- fechaFin
- fechaDevolucionReal
- estado

---
### GET /prestamoLibro/:id/detalle

> Para obtener un préstamo con información adicional

> id debe ser un número entero

Devuelve:
- Datos del préstamo
- Datos del usuario (nombre, código institucional)
- Datos del bibliotecario (nombre) si existe
- Datos del ejemplar (código de barra)
- Datos del libro asociado (idLibro, título)

---
### POST /prestamoLibro

> Para registrar un nuevo préstamo de libro (solicitud virtual).

#### BODY:

```json
{
  "idUsuario": 10,             // NUMBER (obligatorio, FK a USUARIO.id_usuario)
  "idEjemplar": 5,             // NUMBER (obligatorio, FK a EJEMPLAR.id_ejemplar)
  "fechaInicio": "2025-11-25", // YYYY-MM-DD (obligatorio)
  "fechaFin": "2025-11-27"     // YYYY-MM-DD (obligatorio)
}
```

**Reglas:**

- Todos los campos del body son obligatorios.
- Internamente se usa el procedimiento almacenado **pr_crear_prestamo_libro**.
- La **fechaInicio** y **fechaFin** deben cumplir:
  - fechaInicio ≥ fecha actual (no se puede iniciar en una fecha pasada).
  - fechaFin ≥ fechaInicio.
  - La duración `(fechaFin - fechaInicio + 1)` no puede superar el máximo de días permitido por las normas de la biblioteca (**NormasBiblioteca.dias_prestamo_libros**).
- Si el préstamo quiere **iniciar hoy**, la solicitud solo se puede registrar **antes de las 12:00** (mediodía).  
  Si ya pasó las 12:00, solo se permiten préstamos con fechaInicio a partir del día siguiente.
- Al momento de crear el préstamo, **no se asigna bibliotecario**.  
  El bibliotecario se asignará cuando el usuario se acerque a la biblioteca a recoger el libro.

Si todo es correcto, se devuelve el **idPrestamo** creado.

---
### POST /prestamoLibro/:id/entregar

> Para registrar la **entrega física** del libro al usuario en la biblioteca.

> id debe ser un número entero (id del préstamo existente)

#### BODY:

```json
{
  "idBibliotecario": 2   // NUMBER (obligatorio, FK a BIBLIOTECARIO.id_bibliotecario)
}
```

**Comportamiento:**

- Internamente se usa el procedimiento **pr_asignar_bibliotecario_prestamo**.
- El préstamo **no debe tener ya un bibliotecario asignado**.
- La fecha actual debe estar **entre fechaInicio y fechaFin** del préstamo (inclusive).
- La entrega solo se puede registrar si la hora actual está entre **10:00 y 12:00**.
- Al registrar este endpoint, se asigna el bibliotecario responsable de la entrega del libro.

---
### POST /prestamoLibro/:id/devolver

> Para registrar la devolución de un préstamo.

> id debe ser un número entero (id del préstamo existente)

#### BODY (opcional):

```json
{
  "fechaDevolucion": "2025-11-28" // YYYY-MM-DD (opcional)
}
```

**Comportamiento:**

- Si **fechaDevolucion** no se envía, se tomará la fecha actual del sistema.
- Internamente se usa el procedimiento **pr_devolver_prestamo_libro**.
- Solo se puede registrar la devolución si la hora actual está entre **08:00 y 10:00**.
- El sistema validará que el préstamo **no haya sido devuelto antes**.
- Los triggers asociados actualizarán:
  - El estado del préstamo (`activo`, `finalizado` o `atrasado`).
  - El estado del ejemplar a `disponible` cuando corresponda.

---
### POST /prestamoLibro/:id/cancelar

> Para **cancelar** un préstamo de libro antes de que inicie o antes de que sea entregado al usuario.

> `id` debe ser un número entero (id del préstamo existente)

#### BODY:

No requiere body.

**Comportamiento:**

- Internamente se usa el procedimiento **`pr_cancelar_prestamo_libro`**.
- Solo se puede cancelar un préstamo si:
  - El préstamo **no ha sido devuelto** todavía (su `fechaDevolucionReal` es `NULL`).
  - La fecha actual es **anterior** a la `fechaInicio` del préstamo,  
    **o**, si es el mismo día de `fechaInicio`, aún **no tiene bibliotecario asignado** (el libro no ha sido entregado).
- Si la cancelación es válida:
  - El estado del préstamo se actualiza a **`cancelado`**.
  - El **Ejemplar** asociado vuelve a estado **`disponible`**.
- Si el préstamo ya fue devuelto, está en curso/vencido o ya fue entregado, el sistema devolverá un error informando que **no puede ser cancelado**.

---
## AUTOR

---
### GET /autor?nombre&apellido&nacionalidad
#### Campos:
- **nombre** (Ej: "Gabriel", "Mario")
- **apellido** (Ej: "García Márquez", "Vargas Llosa")
- **nacionalidad** (Ej: "Peruana", "Colombiana")

**Ningún campo es obligatorio.**  
Devuelve una lista paginada de autores que coincidan con los filtros enviados.  
También acepta los parámetros estándar de paginación:
- **page** (por defecto: 1)
- **limit** (por defecto: 10)

---
### GET /autor/:id

> Para obtener un autor por su ID

> **id** debe ser un número entero

Devuelve los datos básicos del autor desde la tabla **Autor**:
- idAutor
- nombre
- apellido
- nacionalidad

---
### POST /autor

> Para registrar un nuevo autor.

#### BODY:

```json
{
  "nombre": "Gabriel",
  "apellido": "García Márquez",
  "nacionalidad": "Colombiana"
}
```

**Reglas:**

- Los campos **nombre** y **apellido** son obligatorios.
- El campo **nacionalidad** es opcional.
- Devuelve el **idAutor** creado junto con un mensaje de confirmación.

---
### PUT /autor/:id

> Para actualizar los datos de un autor existente.

> **id** debe ser un número entero (id de un autor existente)

#### BODY (al menos un campo):

```json
{
  "nombre": "Gabriel",
  "apellido": "García Márquez",
  "nacionalidad": "Colombiana"
}
```

**Reglas:**

- Se puede enviar uno o varios campos para actualizar.
- Si no se envía ningún campo en el body, se devolverá un error de validación.
- Si el autor no existe, se responde con **404 - Autor no encontrado**.
- Si la actualización es exitosa, devuelve un mensaje de confirmación.

---
### DELETE /autor/:id

> Para eliminar un autor por su ID.

> **id** debe ser un número entero

**Comportamiento:**

- Se realiza un **DELETE físico** sobre la tabla **Autor**.
- Si el autor no existe, se responde con **404 - Autor no encontrado**.
- Si el autor está referenciado por otras entidades (por ejemplo, en **LibroAutor**),  
  la base de datos devolverá un error de integridad referencial y la API responderá con un error 409 o 500 según como se maneje.
- Si la eliminación es exitosa, devuelve un mensaje de confirmación.

---
## ETIQUETA

---
### GET /etiqueta?nombre&descripcion
#### Campos:
- **nombre** (Ej: "Ficción", "Historia", "Ciencia")
- **descripcion** (Ej: "Libros de divulgación", "Colección especial")

**Ningún campo es obligatorio.**  
Devuelve una lista paginada de etiquetas que coincidan con los filtros enviados.  
También acepta los parámetros estándar de paginación:
- **page** (por defecto: 1)
- **limit** (por defecto: 10)

---
### GET /etiqueta/:id

> Para obtener una etiqueta por su ID

> **id** debe ser un número entero

Devuelve los datos básicos de la etiqueta desde la tabla **Etiquetas**:
- idEtiqueta
- nombre
- descripcion

---
### POST /etiqueta

> Para registrar una nueva etiqueta.

#### BODY:

```json
{
  "nombre": "Ciencia Ficción",
  "descripcion": "Libros relacionados con ciencia ficción y fantasía"
}
```

**Reglas:**

- El campo **nombre** es obligatorio y debe ser único (no puede repetirse entre etiquetas).
- El campo **descripcion** es opcional.
- Devuelve el **idEtiqueta** creado junto con un mensaje de confirmación.

---
### PUT /etiqueta/:id

> Para actualizar los datos de una etiqueta existente.

> **id** debe ser un número entero (id de una etiqueta existente)

#### BODY (al menos un campo):

```json
{
  "nombre": "Ciencia Ficción",
  "descripcion": "Libros de ciencia ficción, futurismo y fantasía"
}
```

**Reglas:**

- Se puede enviar uno o varios campos para actualizar.
- Si no se envía ningún campo en el body, se devolverá un error de validación.
- Si la etiqueta no existe, se responde con **404 - Etiqueta no encontrada**.
- Si el nuevo nombre entra en conflicto con otra etiqueta ya existente, la base de datos devolverá un error de unicidad y la API responderá con un error apropiado (409/500 según manejo).
- Si la actualización es exitosa, devuelve un mensaje de confirmación.

---
### DELETE /etiqueta/:id

> Para eliminar una etiqueta por su ID.

> **id** debe ser un número entero

**Comportamiento:**

- Se realiza un **DELETE físico** sobre la tabla **Etiquetas**.
- Si la etiqueta no existe, se responde con **404 - Etiqueta no encontrada**.
- Debido a que la tabla **LibroEtiquetas** tiene una FK con `ON DELETE CASCADE`,  
  al eliminar una etiqueta se borrarán automáticamente sus asociaciones con libros.
- Si la eliminación es exitosa, devuelve un mensaje de confirmación.

---
## CATEGORÍA

---
### GET /categoria?nombre&descripcion
#### Campos:
- **nombre** (Ej: "Programación", "Matemáticas")
- **descripcion** (Ej: "Libros de desarrollo de software", "Cálculo, álgebra, etc.")

**Ningún campo es obligatorio.**  
Devuelve una lista paginada de categorías que coincidan con los filtros enviados.  
También acepta los parámetros estándar de paginación:
- **page** (por defecto: 1)
- **limit** (por defecto: 10)

---
### GET /categoria/:id

> Para obtener una categoría por su ID

> **id** debe ser un número entero

Devuelve los datos básicos de la categoría desde la tabla **Categorias**:
- idCategoria
- nombre
- descripcion

---
### POST /categoria

> Para registrar una nueva categoría.

#### BODY:

```json
{
  "nombre": "Programación",
  "descripcion": "Libros sobre programación y desarrollo de software"
}
```

**Reglas:**

- El campo **nombre** es obligatorio.
- El campo **descripcion** es opcional.
- Devuelve el **idCategoria** creado junto con un mensaje de confirmación.

---
### PUT /categoria/:id

> Para actualizar los datos de una categoría existente.

> **id** debe ser un número entero (id de una categoría existente)

#### BODY (al menos un campo):

```json
{
  "nombre": "Programación",
  "descripcion": "Libros de programación, algoritmos y desarrollo de software"
}
```

**Reglas:**

- Se puede enviar uno o varios campos para actualizar.
- Si no se envía ningún campo en el body, se devolverá un error de validación.
- Si la categoría no existe, se responde con **404 - Categoría no encontrada**.
- Si la actualización es exitosa, devuelve un mensaje de confirmación.

---
### DELETE /categoria/:id

> Para eliminar una categoría por su ID.

> **id** debe ser un número entero

**Comportamiento:**

- Se realiza un **DELETE físico** sobre la tabla **Categorias**.
- Si la categoría no existe, se responde con **404 - Categoría no encontrada**.
- Debido a que la tabla **CategoriasLibro** tiene una FK con `ON DELETE CASCADE`,  
  al eliminar una categoría se borrarán automáticamente sus asociaciones con libros.
- Si la eliminación es exitosa, devuelve un mensaje de confirmación.
