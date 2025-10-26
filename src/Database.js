import { constants } from 'node:buffer'
import { randomUUID } from 'node:crypto'
import fs from 'node:fs/promises'

// const databasePath = new URL('../storage/database.json', import.meta.url)
const databasePath = 'storage/database/database.json'
const databaseFile = ''

export class Database {
    #database = {}

    constructor () {
        const filePath = new URL('../' + databasePath, import.meta.url)
        fs.readFile(filePath, 'utf8')
            .then( data => {
                this.#database = JSON.parse(data)
            })
            .catch( () => {
                console.log('Creating new database...');
                this.#persist()
                console.log('A new database was created.');
            })
    }
    
    async #persist () {
        const arrPath = databasePath.split('/')
        let strPath = ''
        for (const dir of arrPath) {
            if (!dir.length) continue
            if (dir === arrPath[arrPath.length-1]) continue
            strPath += strPath.length ? '/' + dir : dir

            try {
                await fs.access(strPath, constants.F_OK)
            } catch (err) {
                await fs.mkdir(strPath)   
            }
        }

        const filePath = new URL('../' + databasePath, import.meta.url)
        fs.writeFile(filePath, JSON.stringify(this.#database))
    }

    insert (collection, data) {
        const record = { id: randomUUID(), ... data}
        record.created_at = new Date().toISOString()
        record.updated_at = new Date().toISOString()
        this.#database[collection] = [record]
        this.#persist()
        return record
    }
}