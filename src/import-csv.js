import fs from 'node:fs'
import { parse } from "csv-parse"

const apiUrl = 'http://localhost:3333'

const parser = parse({
    delimiter: ','
}, async (err, data) => {
    if (!data.length) {
        console.log('File is empty.')
        return false
    }
    for (let x = 1; x < data.length; x++) {
        console.log(`[Record ${x}/${data.length-1}]`, 'Sending to API.')
        const payload = {
            title: data[x][0],
            description: data[x][1],
        }
        const res = await fetch (`${apiUrl}/task`, {
            method: 'POST',
            body: JSON.stringify(payload)
        }).then(res => res.json())
        .catch(err => false)

        if (res) {
            console.log(`[Record ${x}/${data.length-1}]`, `Success (id: ${res.id}).`)
        } else {
            console.log(`[Record ${x}/${data.length-1}]`, 'Error.')
        }
    }
})

/** Open CSV file, if it exists */
const filePath = 'storage/planilha.csv'
const path = new URL('../' + filePath, import.meta.url)

fs.access(path, fs.constants.F_OK, err => {
    if (err) {
        console.log('File not found.')
        return false
    }

    fs.createReadStream(path).pipe(parser)
})
