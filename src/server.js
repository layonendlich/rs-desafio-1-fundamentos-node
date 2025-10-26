import http from 'node:http'

import { routes } from './routes.js'

const server = http.createServer( async (request, response) =>  {
    const app = { request, response }
    const { method, url } = request
    
    const route = routes.find( el =>
        el.path.toLowerCase() === url.toLowerCase() &&
        el.method.toUpperCase() === method.toUpperCase()
    )

    if (route) {
        const res = await route.handler(app)

        console.log(new Date().toISOString(), res.status || 200, method, url)

        return response
            .writeHead(res.status || 200)
            .end(JSON.stringify( res.data ? res.data : null ))
    }

    console.log(new Date().toISOString(), 404, method, url)
    return response
        .writeHead(404)
        .end(JSON.stringify( { message: 'Not found'} ))
})

try {
    server.listen(3333)
    console.log('Server is running at http://localhost:3333')
} catch (err) {
    console.log('Fail at starting server.')
    console.error(err)
}