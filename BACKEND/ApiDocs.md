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