import { buildRoutePath } from "./utils/buildRoutePath.js"
import { Task } from "./Task.js"

const task = new Task

const routes = [
    {
        path: buildRoutePath('/'),
        method: 'GET',
        handler: async (app) => {
            return { status: 200, data: { message: 'It works!' } }
        }
    },
    {
        path: buildRoutePath('/task'),
        method: 'POST',
        handler: async (app) => await task.create(app)
    },
    {
        path: buildRoutePath('/task/:id'),
        method: 'GET',
        handler: async (app) => await task.getById(app)
    },
    {
        path: buildRoutePath('/task'),
        method: 'GET',
        handler: async (app) => await task.get(app)
    },
    {
        path: buildRoutePath('/task/:id'),
        method: 'PUT',
        handler: async (app) => task.update(app)
    },
    {
        path: buildRoutePath('/task/:id'),
        method: 'PATCH',
        handler: async (app) => await task.updateCompletedAt(app)
    },
    {
        path: buildRoutePath('/task/:id'),
        method: 'DELETE',
        handler: async (app) => await task.delete(app)
    },
]

export {routes}