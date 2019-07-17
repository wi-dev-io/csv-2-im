const oracledb = require('oracledb')

const connect = (config) => new Promise((resolve, reject) => {
    oracledb.getConnection({
        user: 'prod9',
        password: 'lawson',
        connectString: "LAWPROD2"
    }, (err, connection) => {
        if(err) console.log(err)
        console.log("Connected oracle database.")
        resolve(connection)
    })
})

const query = (conn, query, params) => new Promise((resolve, reject) => {
    conn.execute(query, params, {outFormat: oracledb.OBJECT}, (err, results) => {
        if(err) reject(err)
        resolve(results)
    })
})

const disconnect = (conn) => {
    conn.close()
        .then(console.log("Successfully disconnected from Oracle."))
        .catch((err) => console.log(err) )
}



module.exports = {
    connect, disconnect, query
}