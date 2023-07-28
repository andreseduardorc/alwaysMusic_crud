const {Pool}= require('pg')

const config ={
    user: 'andresrc',
    host: 'localhost',
    database: 'alwaysmusic',
    password: 'Naruto.09',
    port: 5432,
} 

exports.pool = new Pool (config)