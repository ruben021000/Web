
const sqlite3 = require("sqlite3")

module.exports = class Logica {
    // .................................................................
    // nombreBD: Texto
    // -->
    // constructor () -->
    // .................................................................
    constructor(nombreBD, cb) {
        this.laConexion = new sqlite3.Database(nombreBD,
            (err) => {
                if (!err) {
                    this.laConexion.run("PRAGMA foreign_keys = ON")
                }
                cb(err)
            })
    } // ()

    // .................................................................
    // nombreTabla:Texto
    // -->
    // borrarFilasDe() -->
    // .................................................................
    borrarFilasDe(tabla) {
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(
                "delete from " + tabla + ";",
                (err) => (err ? rechazar(err) : resolver())

            )
        })
    } // ()
    // .................................................................
    // datos:{id:Texto, medicion:Texto}
    // -->
    // insertarMedicion() -->
    // .................................................................
    insertarMedicion(datos) {
        var textoSQL = 'insert into Mediciones values( $id, $medicion );'
        var valoresParaSQL = { $id: datos.id, $medicion: datos.medicion }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()
    // .................................................................
    // id:Texto
    // -->
    // buscarMedicionConId() <--
    // <--
    // {id:Texto, medicion:Texto}
    // .................................................................
    buscarMedicionConId(id) {
        var textoSQL = "select * from Mediciones where id=$id";
        var valoresParaSQL = { $id: id }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    // .................................................................
    // cerrar() -->
    // .................................................................
    cerrar() {
        return new Promise((resolver, rechazar) => {
            this.laConexion.close((err) => {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()

} // class


