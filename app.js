const express = require("express") // Para la API
const movies = require("./movies.json") // La data
const crypto = require('node:crypto') // Para ids
const cors = require('cors')
const { validateMovie, validatePartialMovie } = require("./schemas/movies")


const app = express()
app.disable("x-powered-by") // Quitamos la cabecera.

// ############# MIDDLEWARE ################### //
app.use(express.json()) // Watafak, usaremos el resumido. Hm pa que era esto? revisarlo luego.
app.use(cors())

// ############# METODOS ################### //
// Declaramos ahoa los petodos.

// ### GET ### //
app.get("/", (req, res) => {
    res.json({ "message": 'hola mundo' })
})

// Declaramos metodo.
// Todos los recursos que sean MOVIES se identifica con /movies
app.get("/movies", (req, res) => {
    // Leer el query param de format.
    const { genre } = req.query // Tenemos un objeto donde se encuentra transformado todos los params. Lo mismo con search
    if(genre){
        // Ojo, los generos en las peliculas son en array
        const filteredMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === g.toLowerCase())
        )
        return res.json(filteredMovies)
    }


    res.json(movies) // Devolveremos todas las peliculas.
})

// Ahora para obtener una pelicula por ID
// El :id es un segmento dinamico. Se va a rellenar
app.get("/movies/:id", (req, res) => {
    const { id } = req.params // Asi capturamos el ID.
    // Tenemos un JSON, le hariamos una busqueda.
    const movie = movies.find(movie => movie.id === id) // Retorna el valor.
    if(movie) return res.json(movie) // Devolvemos la pelicula.
    // Caso contrario, debemos de indicarle un 404 not found
    res.status(404).json({ message: "Movie not found" })
})

// ##### POST ######
app.post('/movies', (req, res) => {
    
    // El Middleware ya se encarga de parsearlo a JSON Object
    // ### VALIDACIONES -  Recomendable no hacerlo a mano ###
    const result = validateMovie(req.body)

    // El error que devuelve es en formato JSON. Recordar parsearlo.
    if(result.error){
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    
    // Ya se encuentra validado
    // El result.data es el body practicamente.
    // Siempre usar el result.data. Ese es el valor ya validado.
    // Esto pues, nos pueden meter un SQL Injection.
    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    }

    movies.push(newMovie)
    res.status(201).json(newMovie) // Tenemos que indicar que se ha creado un recurso. Devuelve el movie.
})

// ######## PATCH ##############
// Actualizar una parte de la pelicula

app.patch("/movies/:id", (req, res) => {
    // Etapa de validacion
    const result = validatePartialMovie(req.body)
    if(!result.success){
        return res.status(404).json( { error: JSON.parse(result.error.message) })
    }

    // Si todo funciona bien, procedemos ahora con sacar el movie.
    const { id } = req.params

    const movieIndex = movies.findIndex(movie => movie.id === id)
    // Mejor el index para luego actualizarlo directamente.
    if(movieIndex < 0) {
        return res.status(404).json( { message: "Movie not found" })
    }
    // Caso contrario, procedemos con actualizar la pelicula.
    // Podemmos mutarlo directamente
    // Los puntos indica: todo lo que tenemos en tal objeto y todo lo que tenemo en otro objeto.
    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }
    movies[movieIndex] = updateMovie
    return res.json(updateMovie)
})

// Revisarlo cuando estamos x desplegar.
const PORT = process.env.PORT || 1234

// Declaramos el servidor como activo.
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})

// ##### COMO TAREA, PAGINACION #####
