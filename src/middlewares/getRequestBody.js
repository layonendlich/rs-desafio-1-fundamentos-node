export async function getRequestBody (request, response) {
    const streamParts = []

    for await (const chunk of request) {
        streamParts.push(chunk)
    }

    try {
        const str = Buffer.concat(streamParts).toString()
        request.body = JSON.parse(str)
    } catch {
        request.body = null
    }
}