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
        path: buildRoutePath('/task'),
        method: 'POST',
        handler: async (app) => {
            const { title, description, completed_at } = app.request.body
            const data = {}
            for (const key of [ 'title', 'description', 'completed_at' ]) {
                data[key] = app.request.body[key] && app.request.body[key].length ? app.request.body[key] : null
            }

            if (!data.title) {
                return {
                    status: 400,
                    data: { message: '"title" is required.'}
                }
            }

            const res = app.database.insert('task', data)
            return { data: res }
        }
    },
]

export {routes}