const db = require('../config/db');
const oracledb = require('oracledb');

exports.getHorariosLaptopsDisponibles = async (data) => {
  const connection =  await db.getConnection();
  try {
    // Convertir horaInicio de formato "HH:MM" a NUMBER (ej: "08:30" => 8.5)
    console.log('data.horaInicioNum:', data.horaInicioNum);

    let horaInicioNum = null;
    if (data.horaInicioNum) {
      const partes = data.horaInicioNum.toString().split(':');
      if (partes.length === 2) {
        horaInicioNum = parseInt(partes[0]) + (parseInt(partes[1]) / 60);
      } else {
        horaInicioNum = parseFloat(data.horaInicioNum);
      }
    }

    console.log('horaInicioNum:', horaInicioNum);
    

    const result = await connection.execute(
      `
      BEGIN
        PRC_HORARIOS_DISP_LAPTOP(
          :p_fecha_reserva,
          :p_hora_inicio,
          :p_duracion_horas,
          :p_sistema_oper,
          :p_marca,
          :p_result
        );
      END;
      `,
      {
        p_fecha_reserva: { val: data.fecha ? new Date(data.fecha) : new Date(), type: oracledb.DATE },
        p_hora_inicio:   { val: horaInicioNum, type: oracledb.NUMBER },
        p_duracion_horas:{ val: data.duracionHoras ? parseFloat(data.duracionHoras) : null, type: oracledb.NUMBER },
        p_sistema_oper:  { val: data.sistemaOperativo || null, type: oracledb.STRING },
        p_marca:         { val: data.marca || null, type: oracledb.STRING },
        p_result:        { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
      }
    );

    const resultSet = result.outBinds.p_result;
    const rows = await resultSet.getRows(); // Obtener todas las filas
    await resultSet.close(); // Cerrar el cursor
    await connection.close(); // Cerrar la conexión

    const map = new Map();

    for (const row of rows) {
      let laptop = map.get(row.idLaptop);
      if (!laptop) {
        laptop = {
          idLaptop: row.idLaptop,
          sistemaOperativo: row.sistemaOperativo,
          marca: row.marca,
          horarios: [],
        };
        map.set(row.idLaptop, laptop);
      }

      laptop.horarios.push({
        inicio: row.fechaHoraInicio,
        fin: row.fechaHoraFin,
      });
    }

    return Array.from(map.values());
  } catch (err) {
    try{
      await connection.close();
    } catch {}
    throw err;
  }
}