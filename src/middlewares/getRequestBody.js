export async function getRequestBody (request, response) {
    const streamParts = []

    for await (const chunk of request) {
        streamParts.push(chunk)
    }

    try {
        let body = {}
        let data = null
        const contentType = request.headers['content-type'].split(';')[0].toLowerCase().trim()
        
        const str = Buffer.concat(streamParts).toString()
        
        switch (contentType) {
            case 'multipart/form-data':
                break
            case 'application/x-www-form-urlencoded':
                data = str.split('&').reduce( (queryParams, param) => {
                    const [key, value] = param.split('=')
                    queryParams[key] = value
                    return queryParams
                }, {})
                body = {...data}
                break
            case 'application/json':
            default:
                body = {...JSON.parse(str)}
                break
        }
        request.body = body
    } catch {
        request.body = null
    }
}