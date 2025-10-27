import http from 'node:http'

import { routes } from './routes.js'
import { getQueryParams } from './utils/getQueryParams.js'
import { getRequestBody } from './middlewares/getRequestBody.js'
import { Database } from './Database.js'

const database = new Database

const server = http.createServer( async (request, response) =>  {
    response.setHeader('Content-Type', 'Application/json')
    await getRequestBody(request, response)

    const app = { database, request, response }
    const method = request.method
    const url = request.url.toLowerCase()
    
    const route = routes.find( el =>
        el.path.test(url.toLowerCase()) &&
        el.method.toUpperCase() === method.toUpperCase()
    )

    if (route) {
        const routeParams = url.match(route.path)
        const { query , ...params } = routeParams.groups
        request.params = params
        request.query = query ? getQueryParams(query) : {}

        let res
        try {
            res = await route.handler(app)
        } catch (err) {
            console.log('Oops...')
            console.log(err)
            res = {
                status: 500,
                data: {message: 'Oops... try again later.'}
            }
        }

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