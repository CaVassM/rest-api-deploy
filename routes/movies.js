import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'

// Router es una clase especial que permitira crearnos un enrutador por 
// la que permitira responder todos los paths
export const moviesRouter = Router()

// Como nos dimos cuenta, refactorizar todo esto hace que no se pueda manejar errores
// Para ello, como usamos async-await, lo envolveremos todo en try-catch
// Esto lo haremos en el middleware, puesto que mucho try-catch en todo esto de la API.
moviesRouter.get('/', MovieController.getAll)
moviesRouter.get("/:id", MovieController.getById)
moviesRouter.post("/", MovieController.create)
moviesRouter.patch("/:id", MovieController.update)

