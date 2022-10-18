// .....................................................................
// ReglasREST.js
// .....................................................................
module.exports.cargar = function (servidorExpress, laLogica) {
    // .......................................................
    // GET /prueba
    // .......................................................
    servidorExpress.get('/prueba/', function (peticion, respuesta) {
        console.log(" * GET /prueba ")
        respuesta.send("¡Funciona!")
    }) // get /prueba
    // .......................................................
    // GET /longitud/<palabra>
    // .......................................................
    servidorExpress.get('/longitud/:palabra',
        function (peticion, respuesta) {
            console.log(" * GET /longitud ")
            var palabra = peticion.params.palabra
            var solucion = { palabra: palabra, longitud: palabra.length }
            respuesta.send(JSON.stringify(solucion))
        }) // get /longitud
    // .......................................................
    // GET /dividir?a=<num>&b=<num>
    // .......................................................
    servidorExpress.get(
        '/dividir',
        function (peticion, respuesta) {
            console.log(" * GET /dividir ")
            var a = peticion.query.a
            var b = peticion.query.b
            if (isNaN(a) || isNaN(b) || b == 0) {
                // si a o b no son números, o b es 0
                // no se puede dividir
                // (400 = bad request)
                respuesta.status(400).send(" no puedo dividir ");
                return
            }
            var solucion = { a: a, b: b, division: a / b }
            respuesta.send(JSON.stringify(solucion))
        }) // get /dividir
    // .......................................................
    // POST /alta
    // .......................................................
    servidorExpress.post(
        '/alta',
        async function (peticion, respuesta) {
            console.log(" * POST /alta ")
            var datos = JSON.parse(peticion.body)
            console.log(datos.id)
            console.log(datos.medicion)
            // supuesto procesamiento
            try {

                await laLogica.insertarMedicion(datos)
            }

            catch (e) {
                error = e
            }

        }) // post /alta

        servidorExpress.get('/busca',
        async function (peticion, respuesta) {
            console.log(" * GET /busca ")
            try {

                var res = await laLogica.buscarMedicionConId("5")
                //respuesta.send(res[0].medicion)
                
                respuesta.send(res[0])
                console.log(res[0])//se muestra en el cmd
               
            }

            catch (e) {
                error = e
            }
        }) // get /busca



} // ()
