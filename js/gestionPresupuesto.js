'use strict'
let presupuesto = 0;
let gastos = [];
let idGasto = 0; 
function actualizarPresupuesto(presupuesto1) 
{

  if (presupuesto1 === presupuesto)
  {
        return 0;
  }
    
  else
  {
    if (isNaN(presupuesto1))
    {
        return -1;

    }
    else
    {
        if (presupuesto1>0)
        {
            presupuesto = presupuesto1;
            return presupuesto;

            
        }
    
       
        else if (presupuesto1 <0)
        {
            
            return -1;
        }
    }
  }

   


}

function mostrarPresupuesto() {
    
   return 'Tu presupuesto actual es de '+ presupuesto + ' €'
    
}

function CrearGasto(descripcion, valor,fecha,...etiquetas) {
    // TODO
    this.descripcion=descripcion;
    if(valor > 0)
    {
       this.valor=valor;
    }
    else
    {
        this.valor = 0;
    }
    
    if (etiquetas === 0)
    {
            this.etiquetas = []
    }
    else
    {
            this.etiquetas = etiquetas;
    }
    if (fecha)
    {
        this.fecha = Date.parse(fecha)
    }
    else
    {
        this.fecha = Date.now(fecha);
    }
    

       
       this.mostrarGasto = function(){
        return 'Gasto correspondiente a ' + this.descripcion + ' con valor ' + this.valor + ' €' ;
       }

       this.mostrarGastoCompleto = function()
        {
            let fecha2 = new Date(this.fecha);
            let almacen_etiquetas = "";
            for (let i = 0; i<etiquetas.length; i++)
            {
                almacen_etiquetas += `- ` + this.etiquetas[i]+'\n';
            }
            return 'Gasto correspondiente a ' + this.descripcion+ ' con valor ' + valor+' €\n'+
            'Fecha: '+ fecha2+'\n'+
            'Etiquetas:\n' + almacen_etiquetas;


        }    
       
       this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;
        return this.descripcion;
       }
       this.actualizarValor = function(valor){
        if (isNaN(valor)){
            return this.valor;
           }
          
           else if(valor<0)
           {
            return this.valor;   
           }
           else
           {
            this.valor = valor;
            return this.valor;
           }

       }
       

    }
    

function listarGastos()
{
    for (let i = 0; i <gastos.length; i++)
    {
        document.write(gastos[i])
    }
}

function anyadirGasto()
{

}

function borrarGasto()
{

}

function calcularTotalGastos()
{

}
function calcularBalance()
{
   
}  

function gasto()
{
    this
}
 








       
        
        




// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}