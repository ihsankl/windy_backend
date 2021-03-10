import dotenv from 'dotenv'
import knex from 'knex'
import formidable from 'express-formidable'

dotenv.config()
const { DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } = process.env

export const query = knex({
    client: 'mysql2',
    connection: {
        host: DB_SERVER,
        port: DB_PORT,
        database: DB_DATABASE,
        user: DB_USER,
        password: DB_PASSWORD
    }
});

export const formidableConfig = (app, path) => {
    app.use(formidable({
        uploadDir: path,
        multiples: false,
        keepExtensions: true,
    }))
}


//   staging: {
//     client: 'mysql2',
//     connection: {
//       database: 'windy_rooms',
//       user:     'root',
//       password: ''
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   },

//   production: {
//     client: 'mysql2',
//     connection: {
//       database: 'windy_rooms',
//       user:     'root',
//       password: ''
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   }
