import movies from "../movies.json" with { type: 'json' }// La data
import { randomUUID } from 'node:crypto' // Para ids



export class MovieModel {
    // Este es un metodo get de los movies. Logica del negocio al parecer.
    // Static es util pues, pertenece al mismo Model, no a la instancia.
    static async getAll({ genre }) {
        if (genre) {
            return movies.filter(
                movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
            )
        }
        return movies
    }

    static async getById({ id }) {
        const movie = movies.find(movie => movie.id === id)
        return movie
    }

    static async create(input) {
        // En base de datos.
        const newMovie = {
            id: randomUUID(),
            ...input.data
        }
        movies.push(newMovie)
        return newMovie
    }

    static async update({ id, input }) {
        const movieIndex = movies.findIndex(movie => movie.id === id)
        if (movieIndex < 0) return false
        movies[movieIndex] = {
            ...movies[movieIndex],
            ...input
        }
        return movies[movieIndex]
    }



}