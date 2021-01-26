const { Router } = require('express') //Se trae por destructuring en objeto Router de express (enrutador)
const router = Router()
const { cnn_mysql } = require('../config/database')

//Consultar todas las marcas registradas
router.get('/tipo_marca', (req, res) => {
    cnn_mysql.query(`SELECT * FROM tipo_marca`, (error, resulset, fields) => {
        if (error) {
            console.log(error)
            return res.status(404).send('No se pudo encontrar el recurso necesario.')
        } else {
            res.status(200).send(resulset)
        }
    })
})

//Consultar y validar el número de marcas registradas
router.get('/tipo_marca/reg', (req, res) => {
    cnn_mysql.query(`SELECT COUNT(id_marca) AS registros_marcas, IF(COUNT(id_marca) = 5, 'Número de registros cumple con la cantida de registros solicitados.','Número de registros no cumple con la cantida de registros solicitados.') AS Respuesta_marcas FROM tipo_marca`, (error, resulset, fields) => {
        if (error) {
            console.log(error)
            return res.status(404).send('No se pudo encontrar el recurso necesario.')
        } else {
            res.status(200).send(resulset)
        }  
    })
})


//Insertar tipo de marca 
router.post('/tipo_marca', async (req, res) => {
    /*Si aparece alguna excepción o error el se va directamebte 
    por el catch y se pueda hacer una captura del error*/
    try {
        const { id_marca, desc_marca, activo} = req.body
        //Hacemos un destructuring que es lo que trae la consulta([rows])
        const [rows, fields] = await cnn_mysql.promise().execute(`INSERT INTO tipo_marca(desc_marca, activo) VALUES (?, ?)`, [desc_marca, activo])
        console.log(rows);
        //rows.affectedRows son las columnas alteradas y con esta funcion la muestra
        if (rows.affectedRows > 0) {
            res.status(201).json({
                id_marca: rows.insertId,
                desc_marca: desc_marca, 
                activo: activo
            })
        } else {
            res.json({message: "Error, verifique que todo este bien en el servidor e intente de nuevo"})
        }
    } catch (e) {
        console.log(e);
        res.status(400).json({ errorCode: e, message: "Digito algún valor erroneo, intente nuevamente" })
    }
})


//Consultar tipo_marca por id y estado
router.get('/tipo_marca/:id_marca/:activo', (req, res) => {
    const {id_marca, activo} = req.params;
    cnn_mysql.query(`SELECT * FROM tipo_marca WHERE id_marca = ? AND activo = ?`,[id_marca, activo], (error, resulset, fields) => {
        if (error) {
            console.log(error)
            return res.status(404).send('No se pudo encontrar el recurso necesario.')
        } else {    
            res.status(200).send(resulset)
        }  
    })
})

//PUT para modificar el estado de alguno de los registros de tipo_marca
router.put('/tipo_marca/:id_marca', async (req, res) => {
    try {
        const {activo} = req.body;
        const {id_marca} = req.params;
        const [rows, fields] = await cnn_mysql.promise().execute(`UPDATE tipo_marca SET activo = ? WHERE id_marca = ?`, [activo, id_marca] )
        console.log(rows);
        if (rows.affectedRows > 0) {
            res.status(201).json({message: 'El estado del tipo de marca del id fue cambiado con éxito'})
        } else {
            res.json({message: "Error, verifique que todo este bien en el servidor e intente de nuevo"})
        }
    } catch (e) {
        console.log(e);
        res.status(400).json({ errorCode: e, message: "Digito algún valor erroneo, intente nuevamente" })
    }
})

//Eliminar un registro 
router.delete('/tipo_marca/:id_marca', async (req, res) => {
    try {
        const {id_marca} = req.params;
        const [rows, fields] = await cnn_mysql.promise().execute(`DELETE FROM tipo_marca WHERE id_marca = ?`, [id_marca])
        console.log(rows);
        if (rows) {
            res.status(201).json({message: 'Tipo de marca eliminado con éxito'})
        } else {
            res.json({message: "Error, verifique que todo este bien en el servidor e intente de nuevo"})
        }
    } catch (e) {
        console.log(e);
        res.status(400).json({ errorCode: e, message: "Digito algún valor erroneo, intente nuevamente" })
    }
})

module.exports = router; //(enrutador)