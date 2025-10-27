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
        path: buildRoutePath('/task'),
        method: 'POST',
        handler: async (app) => {
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
    {
        path: buildRoutePath('/task/:id'),
        method: 'GET',
        handler: async (app) => {
            const {id} = app.request.params
            const res = app.database.select('task', { id })
            if (res.length) {
                return { data: res[0] }
            }
            return { status: 404, data: null }
        }
    },
    {
        path: buildRoutePath('/task'),
        method: 'GET',
        handler: async (app) => {
            let search = null
            if (app.request.query.search) {
                search = {
                    title: app.request.query.search,
                    description: app.request.query.search
                }
            }
            const res = app.database.select('task', search)
            return { data: res }
        }
    },
]

export {routes}