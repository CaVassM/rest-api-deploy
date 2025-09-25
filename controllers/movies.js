import { validateMovie, validatePartialMovie } from "../schemas/movies.js"
import { MovieModel } from '../models/movie.js'


// El controlador es el que sabe como tiene que controlar las peliculas.
export class MovieController {
    static async getAll(req, res) {
        const { genre } = req.query
        // No se tiene acceso a la logica de como hace el filtrado.
        const movies = await MovieModel.getAll({ genre })
        // Que es lo que renderiza
        return res.json(movies)
    }

    static async getById(req, res) {
        const { id } = req.params
        const movie = await MovieModel.getById({ id })
        if (movie) return res.json(movie)
        return res.status(404).json({ message: "Movie not found" })
    }

    static async create(req, res) {
        const result = validateMovie(req.body)
        if (result.error) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        const newMovie = await MovieModel.create(result.data)
        return res.status(201).json(newMovie)
    }

    static async update(req, res) {
        const result = validatePartialMovie(req.body)
        if (!result.success) {
            return res.status(404).json({ error: JSON.parse(result.error.message) })
        }
        const { id } = req.params
        const updatedMovie = await MovieModel.update(id, result.data)
        return updatedMovie ? res.json(updatedMovie) : res.status(404).json({ message: "Movie not found" })
    }


}