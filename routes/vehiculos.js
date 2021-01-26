const { Router } = require('express') //Se trae por destructuring en objeto Router de express (enrutador)
const router = Router()
const { cnn_mysql } = require('../config/database')

//Consultar todos los vehículos registrados
router.get('/vehiculos', (req, res) => {
    cnn_mysql.query(`SELECT * FROM vehiculos`, (error, resulset, fields) => {
        if (error) {
            console.log(error)
            return res.status(404).send('No se pudo encontrar el recurso necesario.')
        } else {
            return res.json(resulset)
        }
    })
})

//Consultar y validar el número de vehiculos registrados
router.get('/vehiculos/reg', (req, res) => {
    cnn_mysql.query(`SELECT COUNT(nro_placa) AS registros_vehiculos, IF(COUNT(nro_placa) = 30, 'Número de registros cumple con la cantida de registros solicitados.','Número de registros no cumple con la cantida de registros solicitados.')AS Respuesta_vehiculos FROM vehiculos`, (error, resulset, fields) => {
        if (error) {
            console.log(error)
            return res.status(404).send('No se pudo encontrar el recurso necesario.')
        } else {
            res.json(resulset)
        }
    })
})

//Consultar vehículos filtrados por fecha de vencimiento de seguro (recibe parametros)
router.get('/vehiculos/fecha_ven_seguro/:fecha_ven_seguro', (req, res) => { 
    const { fecha_ven_seguro } = req.params;
    
    cnn_mysql.query(`SELECT *  FROM vehiculos WHERE fecha_ven_seguro <= ?`, [fecha_ven_seguro],
        (err, rows, fields) => {
            if ("!err") {
                res.status(200).json(rows);
                
            } else {
                res.status(404);
            }
        }
    );
});

//Consultar vehículos filtrados por modelos (recibe parametros)
router.get('/vehiculos/modelo/:modelo', (req, res) => { 
    const { modelo } = req.params;
    
    cnn_mysql.query(`SELECT *  FROM vehiculos WHERE modelo <= ?`, [modelo],
        (err, rows, fields) => {
            if ("!err") {
                res.status(200).json(rows);
               console.log(modelo)
            } else {
                res.status(404);
            }
        }
    );
});

//Consultar el modelo máximo y minimo almacenado 
router.get('/vehiculo/modelo_maximo_minimo', async (req, res) => {
    const [rows] = await cnn_mysql.promise().query(`SELECT MAX(modelo) AS modelo_maximo, MIN(modelo) AS modelo_minimo FROM vehiculos`)
    if (rows[0]) {
        res.json(rows[0])
    } else {
        res.json({})
    }
})

//Insertar vehículos
router.post('/vehiculos', async (req, res) => {
    /*Si aparece alguna excepción o error el se va directamebte 
    por el catch y se pueda hacer una captura del error*/
    try {

        const { nro_placa, id_linea, modelo, fecha_ven_seguro, fecha_ven_tecnomecanica, fecha_ven_contrato } = req.body
        //Hacemos un destructuring que es lo que trae la consulta([rows])
        const [rows, fields] = await cnn_mysql.promise().execute(`INSERT INTO vehiculos(nro_placa, id_linea, modelo,fecha_ven_seguro,fecha_ven_tecnomecanica,fecha_ven_contrato) VALUES (?, ?, ?, ?, ?, ?)`, [nro_placa, id_linea, modelo, fecha_ven_seguro, fecha_ven_tecnomecanica, fecha_ven_contrato])
        console.log(rows);
        //rows.affectedRows son las columnas alteradas y con esta funcion la muestra
        if (rows.affectedRows > 0) {
            res.status(201).json({
                nro_placa: rows.insertId,
                id_linea: id_linea,
                modelo: modelo,
                fecha_ven_seguro: fecha_ven_seguro,
                fecha_ven_tecnomecanica: fecha_ven_tecnomecanica,
                fecha_ven_contrato: fecha_ven_contrato
            })
        } else {
            res.json({ message: "Error, verifique que todo este bien en el servidor e intente de nuevo" })
        }
    } catch (e) {
        console.log(e);
        res.status(400).json({ errorCode: e, message: "Digito algún valor erroneo, intente nuevamente" })
    }
})

  //Sumar todos los modelos
  router.get('/vehiculos/sumaModelo', (req, res) => {
      try{
          //SELECT modelo, nro_placa, CONVERT(modelo, INT) FROM vehiculos;
          //Se tienen dificultades porque los modelos se almacenan como enum no como INT, con lo cual no se puede hacer operaciones
        cnn_mysql.query(`SELECT SUM(CONVERT(modelo, INT)) AS suma_modelos FROM vehiculos`, (error, resulset, fields) => {
            if (error) {
                console.log(error)
                return res.status(404).send('No se pudo encontrar el recurso necesario.')
            } else {    
                res.status(200).send(resulset)
            }  
        })
      }
      catch (e){
          console.log(e);
          res.status(400).json({ errorCode: e, message: "Digito algún valor erroneo, intente nuevamente" })

      }
})

router.get('/vehiculos/promedioModelo', (req, res) => {
    try{
      cnn_mysql.query(`SELECT SUM(modelo)/5 AS promedio_modelos FROM vehiculos`, (error, resulset, fields) => {
          if (error) {
              console.log(error)
              return res.status(404).send('No se pudo encontrar el recurso necesario.')
          } else {    
              res.status(200).send(resulset)
          }  
      })
    }
    catch (e){
        console.log(e);
        res.status(400).json({ errorCode: e, message: "Digito algún valor erroneo, intente nuevamente" })

    }
})

module.exports = router; //(enrutador)