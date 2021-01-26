const express = require('express') //Exportamos la libreria
const app = express() //Funcion que nos entrega el entorno de la app donde él va a trabajar(instancia)
const morgan = require('morgan')
require('dotenv').config()//Confgurar el archvo.env
app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Reto base de datos MySQL")
})


const tipoMarca = require('./routes/tipoMarca')
const tipoLinea = require('./routes/tipoLinea')
const vehiculos = require('./routes/vehiculos')

//Routes
app.use('/api', tipoMarca) 
app.use('/api', tipoLinea) 
app.use('/api', vehiculos)
  

app.set('port',process.env.PORT || 9000);
app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`)
})



