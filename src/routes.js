import { buildRoutePath } from "./utils/buildRoutePath.js"

const routes = [
    {
        path: buildRoutePath('/'),
        method: 'GET',
        handler: async (app) => {
            return { status: 200, data: { message: 'It works!' } }
        }
    },
    {
        path: buildRoutePath('/task/:id'),
        method: 'GET',
        handler: async (app) => {
            return { data: null }
        }
    },
    {
        path: buildRoutePath('/task/:id/user/:userId'),
        method: 'GET',
        handler: async (app) => {
            return { data: null }
        }
    }
]

export {routes}