// ---------------------------------------------------------------------
// LogicaFake.js
// ---------------------------------------------------------------------

const IP_PUERTO = "http://localhost:8080";
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
class LogicaFake {

    async init() {
        var metodo = this;
        
    }

    

    async buscar_muestra() {
        console.log("EMPIEZA LA EJECUCION DE: buscar_muestra()")

        var metodo = this;
        var output = document.getElementById('output')

        //Se crea la peticion /muestra
        var url = IP_PUERTO + '/busca'
        await fetch(url, {
            method: 'GET',
            headers: new Headers(
                {
                    'Users-Agent': 'ruben',
                    'Content-type': 'application/json'
                }),
        
            }).then(response=>
                response.json()).then(data =>
                    output.innerHTML = 'Id: ' + data.id + ' Medición: ' + data.medicion
                    )

        console.log("ACABA LA EJECUCION DE: buscar_muestra()")
    }//buscar_muestra

   
}
