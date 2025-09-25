const z = require("zod") // Para validaciones.


const movieSchema = z.object({
        title: z.string({
            invalid_type_error: "Movie must be a string",
            required_error: "Movie title is required"
        }),
        year: z.number().int().positive().min(1900).max(2025),
        director: z.string(),
        duration: z.number().int().positive(),
        rate: z.number().min(0).max(10).default(5.5),
        poster: z.url({
            message: "Poster must be a valid URL"
        }),
        genre: z.array(
            z.enum(['Crime','Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
            {
                required_error: "Movie genre is required",
                invalid_type_error: "Movie genre must exist"
            }
        )
    })

// Creamos el esquema, luego lo invocamos.
function validateMovie(object){
    return movieSchema.safeParse(object) // Asi es como validamos.
}

// Creamos el esquema, luego lo invocamos.
function validatePartialMovie(object){
    // Hace que cada propiedad lo hace de manera parcial.
    // Si no esta alguna propiedad, no pasa nada. Caso contrario, le realiza su validacion.
    return movieSchema.partial().safeParse(object)
}

module.exports = {
    validateMovie,
    validatePartialMovie
}