const routes = [
    {
        path: '/',
        method: 'GET',
        handler: async (app) => {
            return { status: 200, data: { message: 'It works!' } }
        }
    },
    {
        path: '/teste',
        method: 'GET',
        handler: async (app) => {
            return { data: null }
        }
    }
]

export {routes}