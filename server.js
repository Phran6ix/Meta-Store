 require('dotenv').config()
const app = require('./app')
const db = require('./db/db')

const port = process.env.PORT
async function runServer (){
    await db()
    app.listen(port, () => {
        console.log(`MetaSneaker is running on ${port}`)
    })
}

runServer()