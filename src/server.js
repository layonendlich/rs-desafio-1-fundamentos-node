import http from 'node:http'

const server = http.createServer( (request, response) =>  {
    return response.end(JSON.stringify( { message: 'It works!'} ))
})

try {
    server.listen(3333)
    console.log('Server is running at http://localhost:3333')
} catch (err) {
    console.log('Fail at starting server.')
    console.error(err)
}