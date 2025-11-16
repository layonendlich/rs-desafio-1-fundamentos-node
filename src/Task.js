import { buildRoutePath } from "./utils/buildRoutePath.js"
import { Database } from "./Database.js"

export class Task {

    async create (app) {
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

    async get (app) {
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

    async getById (app) {
        const {id} = app.request.params
        const res = app.database.select('task', { id })
        if (res.length) {
            return { data: res[0] }
        }
        return { status: 404, data: null }
    }

    async update (app) {
        const { id } = app.request.params
        const data = {}
        for (const key of [ 'title', 'description', 'completed_at' ]) {
            if (app.request.body[key]) {
                data[key] =  app.request.body[key]
            }
        }

        if (data.title && data.title === '') {
            return {
                status: 400,
                data: { message: '"title" is required.'}
            }
        }

        const res = app.database.update('task', id, data)

        if (res) {
            return { data: res }
        }

        return { status: 404, data: null }
    }

    async updateCompletedAt (app) {
        const { id } = app.request.params
        const data = { completed_at: new Date().toISOString() }

        const res = app.database.update('task', id, data)

        if (res) {
            return { data: res }
        }

        return { status: 404, data: null }
    }

    async delete (app) {
        const { id } = app.request.params
        const res = app.database.delete('task', id)

        if (res) {
            return { data: res }
        }

        return { status: 404, data: null }
    }

    getRoutes () {
        return [
            
            {
                // path: buildRoutePath('/task/:id'),
                path: '/task/:id',
                method: 'DELETE',
                handler: async (app) => {
                    const { id } = app.request.params

                    const res = app.database.delete('task', id)

                    if (res) {
                        return { data: res }
                    }

                    return { status: 404, data: null }
                }
            },
        ]
    }
}