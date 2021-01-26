const { Router } = require('express') //Se trae por destructuring en objeto Router de express (enrutador)
const router = Router()
const { cnn_mysql } = require('../config/database')


router.get('/tipo_linea', (req, res) => {
    cnn_mysql.query(`SELECT * FROM tipo_linea`, (error, resulset, fields) => {
        if (error) {
            console.log(error)
            return res.status(404).send('No se pudo encontrar el recurso necesario.')
        } else {
            return res.json(resulset)
        }
    })
})

router.get('/tipo_linea/reg', (req, res) => {
    cnn_mysql.query(`SELECT COUNT(id_linea) AS registros_lineas, IF(COUNT(id_linea) = 20, 'Número de registros cumple con la cantida de registros solicitados.','Número de registros no cumple con la cantida de registros solicitados.') AS Respuesta_lineas FROM tipo_linea`, (error, resulset, fields) => {
        if (error) {
            console.log(error)
            return res.status(404).send('No se pudo encontrar el recurso necesario.')
        } else {
            res.json(resulset)
        }  
    })
})

router.post('/tipo_linea', async (req, res) => {
    /*Si aparece alguna excepción o error el se va directamebte 
    por el catch y se pueda hacer una captura del error*/
    try {
        const { desc_linea, id_linea, activo } = req.body
        //Hacemos un destructuring que es lo que trae la consulta([rows])
        const [rows, fields] = await cnn_mysql.promise().execute(`INSERT INTO tipo_linea(desc_linea, id_linea, activo) VALUES (?, ?, ?)`, [desc_linea, id_linea, activo])
        console.log(rows);
        //rows.affectedRows son las columnas alteradas y con esta funcion la muestra
        if (rows.affectedRows > 0) {
            res.status(201).json({
                id_linea: rows.insertId,
                desc_linea: desc_linea,
                id_linea: id_linea,
                activo: activo
            })
        } else {
            res.json({ message: "Error, verifique que todo este bien en el servidor intente de nuevo" })
        }
    } catch (e) {
        console.log(e);
        res.status(400).json({ errorCode: e, message: "Digito algún valor erroneo, intente nuevamente" })
    }
})

//Consultar tipo_linea por id y estado
router.get('/tipo_linea/:id_linea/:activo', (req, res) => {
    const {id_linea, activo} = req.params;
    cnn_mysql.query(`SELECT * FROM tipo_linea WHERE id_linea = ? AND activo = ?`,[id_linea, activo], (error, resulset, fields) => {
        if (error) {
            console.log(error)
            return res.status(404).send('No se pudo encontrar el recurso necesario.')
        } else {    
            res.status(200).send(resulset)
        }  
    })
})

//PUT para modificar el estado de alguno de los registros de tipo_linea
router.put('/tipo_linea/:id_linea', async (req, res) => {
    try {
        const {activo} = req.body;
        const {id_linea} = req.params;
        //Hacemos un destructuring que es lo que trae la consulta([rows])
        const [rows, fields] = await cnn_mysql.promise().execute(`UPDATE tipo_linea SET activo = ? WHERE id_linea = ?`, [activo, id_linea] )
        console.log(rows);
        //rows.affectedRows son las columnas alteradas y con esta funcion la muestra
        if (rows.affectedRows > 0) {
            res.status(201).json({message: 'El estado del tipo de linea del id fue cambiado con éxito'})
        } else {
            res.json({message: "Error, verifique que todo este bien en el servidor e intente de nuevo"})
        }
    } catch (e) {
        console.log(e);
        res.status(400).json({ errorCode: e, message: "Digito algún valor erroneo, intente nuevamente" })
    }
})





module.exports = router; //(enrutador)