const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'nizar',
    password: 'n1z4r',
    host: 'localhost',
    port: 5432,
    database: 'perntodo'
});

module.exports = pool;