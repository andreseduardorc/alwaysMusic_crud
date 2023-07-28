

const { pool } = require("./config");

const [funcion, nombre, rut, instrumento, nivel] = process.argv.slice(2);

const insertar = async (nombre, rut, instrumento, nivel) => {
  try {
    console.log("Valores recibidos:", nombre, rut, instrumento, nivel);

    const sqlConsulta = {
      text: "insert into alumnos (nombre, rut, instrumento, nivel) values($1, $2, $3, $4) returning *",
      values: [nombre, rut, instrumento, parseInt(nivel)],
    };
    let response = await pool.query(sqlConsulta);
    console.log(`El estudiante ${response.rows[0].nombre} ha sido creado`);
  } catch (error) {
    console.log("Error al insertar:", error);
    console.log(`Error: ${error.code} = ${error.message}`);
  }
};



const consultar = async () => {
  try {
    const sqlConsulta = {
      text: "select * from alumnos",
    };
    let response = await pool.query(sqlConsulta);
    console.log(response.rows);
  } catch (error) {
    console.log(error);
    console.log(`error : ${error.code} - ${error.message}`);
  }
};


const eliminar = async (rut) => {
  try {
    console.log("Valor del rut a eliminar:", rut);

    const sqlConsulta = {
      text: "delete from alumnos where rut = $1",
      values: [rut],
    };
    let response = await pool.query(sqlConsulta);

    response.rowCount === 0
      ? console.log("La persona con el rut no existe para ser eliminada")
      : console.log(`El usuario con el rut ${rut} ha sido eliminado`);
  } catch (error) {
    console.log(error);
    console.log(`Error: ${error.code} - ${error.message}`);
  }
};

const rutEliminar = process.argv[2];



const consultarRut = async (rut) => {
  try {
    const sqlConsulta = {
      text: "select * from alumnos where rut=$1",
      values: [rut],
    };
    let response = await pool.query(sqlConsulta);
    response.rowCount === 0
      ? console.log("La persona con el rut no existe.")
      : console.log(response.rows[0]);
  } catch (error) {
    console.log(`Error ${error.code} - ${error.message}`);
  }
};




const editar = async (nombre, rut, instrumento, nivel) => {
  try {
    const sqlConsulta = {
      text: "update alumnos set nombre=$1, instrumento=$2, nivel=$3 where rut = $4 returning *",
      values: [nombre, instrumento, nivel, rut],
    };
    let response = await pool.query(sqlConsulta);
    response.rowCount === 0
      ? console.log("La persona con el rut no existe.")
      : console.log("Registro actualizado:", response.rows[0]);
  } catch (error) {
    console.log(`Error ${error.code} - ${error.message}`);
  }
};

const args = process.argv.slice(2);
if (args.length === 4) {
  const [nombre, rut, instrumento, nivel] = args;
  editar(nombre, rut, instrumento, nivel);
} 

const funciones = {
  consulta: consultar,
  rut: consultarRut,
  nuevo: insertar,
  editar: editar,
  eliminar: eliminar,
}




if (funcion && funciones[funcion]) {

  (async () => {
    await funciones[funcion](nombre, rut, instrumento, nivel);
  })();
} else {
  console.log("Función no válida o no proporcionada.");

}
