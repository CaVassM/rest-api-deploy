import express, { json } from "express" // Para la API

import { corsMiddleware } from "./middlewares/cors.js"
import { moviesRouter } from "./routes/movies.js"

const app = express()
const PORT = 1234
app.disable("x-powered-by") // Quitamos la cabecera.

// ############# MIDDLEWARE ################### //
app.use(json()) // Watafak, usaremos el resumido. Hm pa que era esto? revisarlo luego.
app.use(corsMiddleware())
/*
// ############# METODOS ################### //
// Declaramos ahoa los petodos.

// ### GET ### //
app.get("/", (req, res) => {
    res.json({ "message": 'hola mundo' })
})

// Declaramos metodo.
// Todos los recursos que sean MOVIES se identifica con /movies
app.get("/movies", todo ) // Devolveremos todas las peliculas.


// Ahora para obtener una pelicula por ID
// El :id es un segmento dinamico. Se va a rellenar
app.get("/movies/:id", todo)

// ##### POST ######
app.post('/movies', todo)

// ######## PATCH ##############
// Actualizar una parte de la pelicula

app.patch("/movies/:id", todo)

// /movies sera el prefijo. moviesRouter se encargara de ejecutar respecto al prefijo
app.use('/movies', moviesRouter)

// Revisarlo cuando estamos x desplegar.
const PORT = process.env.PORT || 1234
*/

app.use('/movies', moviesRouter)
// Declaramos el servidor como activo.
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})

// ##### COMO TAREA, PAGINACION #####
