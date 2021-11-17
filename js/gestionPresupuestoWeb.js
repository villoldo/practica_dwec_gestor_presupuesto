import {mostrarPresupuesto}    from './gestionPresupuesto.js';
import {CrearGasto} from './gestionPresupuesto.js';
import {listarGastos} from './gestionPresupuesto.js';
import {anyadirGasto} from './gestionPresupuesto.js';
import {borrarGasto} from './gestionPresupuesto.js';
import {calcularTotalGastos} from './gestionPresupuesto.js';
import {calcularBalance} from './gestionPresupuesto.js';
import {filtrarGastos} from './gestionPresupuesto.js';
import {agruparGastos} from './gestionPresupuesto.js';
import {actualizarPresupuesto} from './gestionPresupuesto.js';



function mostrarDatoEnId(idElemento,valor){
    let elemento = document.getElementById(idElemento);
    elemento.append(valor);

}

function mostrarGastoWeb(idElemento,gasto)
{
    let elemento = document.getElementById(idElemento);
    let div = document.createElement('div');
    let div1 = document.createElement('div');
    div.className = "gasto";

        
        div.innerHTML += 
        `
            <div class="gasto-descripcion">${gasto.descripcion}</div>
            <div class="gasto-fecha">${gasto.fecha}</div> 
            <div class="gasto-valor">${gasto.valor}</div> `;


    for (let etiquetas of gasto.etiquetas)
    {        
        let span = document.createElement('span');
        span.className="gasto-etiquetas-etiqueta";

        let manejadorBorrarEtiqueta = new BorrarEtiquetasHandle();
        manejadorBorrarEtiqueta.gasto = gasto;
        manejadorBorrarEtiqueta.etiqueta = etiquetas;
        span.addEventListener("click", manejadorBorrarEtiqueta);

        span.append(etiquetas);
        div1.append(span);
    }

    div1.className ="gasto-etiquetas";
    
    
    div.append(div1);

    let botEditar = document.createElement('button');
    botEditar.className = "gasto-editar";
    botEditar.type = "button";
    botEditar.textContent = "Editar";

    let manejadorEdit = new EditarHandle();
    manejadorEdit.gasto = gasto;
    botEditar.addEventListener("click", manejadorEdit);
    div.append(botEditar);

    let botBorrar = document.createElement('button');
    botBorrar.className = "gasto-borrar";
    botBorrar.type = "button";
    botBorrar.textContent = "Borrar";

    let manejadorBorrar = new BorrarHandle();
    manejadorBorrar.gasto = gasto;
    botBorrar.addEventListener("click", manejadorBorrar);
    div.append(botBorrar);

    elemento.append(div)

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let elemento = document.getElementById(idElemento);
    let datos = ""
    for (let [clave, valor] of Object.entries(agrup)) {
        datos += 
        `<div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${clave}</span>
            <span class="agrupacion-dato-valor">${valor}</span>
        </div>`
    };
    elemento.innerHTML += 
    `<div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${datos}
        `

}
    function repintar()
    {

        mostrarDatoEnId("presupuesto",mostrarPresupuesto());
        mostrarDatoEnId("gastos-totales", calcularTotalGastos());
        mostrarDatoEnId("balance-total", calcularBalance());


        document.getElementById("listado-gastos-completo").innerHTML = "";
        
        let listagastos = listarGastos();
        
    for (let lista of listagastos)
        {
            mostrarGastoWeb("listado-gastos-completo", lista);
        }
    }

    function actualizarPresupuestoWeb(){

        let nuevoPresupuesto = prompt("Introduzca  un nuevo presupuesto");
        actualizarPresupuesto(parseFloat(nuevoPresupuesto));
    
        repintar();
    }
    let botActualizar = document.getElementById("actualizarpresupuesto");
    botActualizar.addEventListener("click", actualizarPresupuestoWeb);

    function nuevoGastoWeb()
    {
        let nuevadesc = prompt("Introduce una nueva descripción");
        let nuevovalor = prompt("Introduce un  nuevo valor");
        let nuevafecha = prompt("Introduce una nueva fecha");
        let nuevaetiqueta = prompt("Introduce una o varias etiquetas nuevas etiquetas");

        nuevovalor = parseFloat(nuevovalor);
        var arrEtiquetas= nuevaetiqueta.split(', ');
        

        let gasto = new CrearGasto(nuevadesc,nuevovalor,nuevafecha,...arrEtiquetas);
        anyadirGasto(gasto);
       
        repintar();
    }
    let botAnaydir = document.getElementById("anyadirgasto");
    botAnaydir.addEventListener("click", nuevoGastoWeb);

    function EditarHandle()
    {
        this.handleEvent = function(event){

            let nuevadesc = prompt("Introduce nueva descripción");
            this.gasto.actualizarDescripcion(nuevadesc);
    
            let nuevovalor = prompt("Introduce nuevo valor");
            nuevovalor = parseFloat(nuevovalor);
            this.gasto.actualizarValor(nuevovalor);
    
            let nuevafecha = prompt("Introduce nueva fecha");
            nuevafecha = Date.parse(nuevafecha);
            this.gasto.actualizarFecha(nuevafecha);
    
            let nuevaetiqueta = prompt("Introduce nuevas etiquetas");
            nuevaetiqueta = nuevaetiqueta.split(', ');
            this.gasto.anyadirEtiquetas(nuevaetiqueta);
    
            repintar();
        }
    }

    function BorrarHandle()
    {
        this.handleEvent = function(event){

            borrarGasto(this.gasto.id);
    
            repintar()
        }
    }

    function BorrarEtiquetasHandle()
    {
        this.handleEvent = function(event){
       
            this.gasto.borrarEtiquetas(this.etiqueta);
    
            repintar();
        }
    }


export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}