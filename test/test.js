// ........................................................
// test.js
// ........................................................

const Logica = require("../Logica.js")
var assert = require('assert')

describe("Test 1: Usar database.db", function () {
    var laLogica = null

    it("conectar a la base de datos", function (hecho) {
        laLogica = new Logica(
            "../bd/database.db",
            function (err) {
                if (err) {
                    throw new Error("No se ha establecido conexión a database.db")
                }
                hecho()
            })
    }) // it conectar


    it("borrar todas las filas", async function () {
        await laLogica.borrarFilasDe("Mediciones")
    }) // it borrar de

    it("puedo insertar una medicion", async function () {
        await laLogica.insertarMedicion({ id: "5", medicion: "5321" })
        var res = await laLogica.buscarMedicionConId("5")
        assert.equal(res.length, 1, "¿no hay un resulado?")
        assert.equal(res[0].id, "5", "¿no es 5?")
        assert.equal(res[0].medicion, "5321", "¿no es 5321?")
    }) // it insertar medicion

    


    it("no puedo insertar una medicion con id que ya está",
        async function () {
            var error = null
            try {
                await laLogica.insertarMedicion({ id: "5", medicion: "5678" })
            } catch (err) {
                error = err
            }
            assert(error, "¿Ha insertado la id que ya esta (5)?")
        }) // it insertar el que ya esta



    it("cerrar conexión a la base de datos", async function () {
        try {
            await laLogica.cerrar()
        } catch (err) {
            throw new Error("cerrar conexión a BD fallada: " + err)
        }
    }) // it cerrar conexion

})//describe

