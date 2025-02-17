const sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database(
    './db/2024s-project-rie0050-yer0013.db',
    (err) => {
        if (err) {
            return console.error(err.message)
        }
        console.log('Connected to the in-memory SQlite database.')
    }
)

db.close((err) => {
    if (err) {
        return console.error(err.message)
    }
    console.log('Close the database connection.')
})
