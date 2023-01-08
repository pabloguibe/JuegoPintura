//Carga la pagina
window.onload=comienzo;


function comienzo(){
	var sino=false;
	// almacenar colores
	var filaColores=document.getElementById('paleta').getElementsByTagName('tr').item(0).childNodes;
	// array para guardar los colores
	var colores = new Array();
	// Un color por cada celda
	var totalColores=filaColores.length;
	// Bucle para recorrer todos los colores almacenándolos en el array
	for(i=0;i<totalColores;i++){
		// almacenamos la clase asignada a la celda
		claseColor=filaColores.item(i).className;

		if(claseColor.indexOf('seleccionado')!= -1)
			colores[i]=claseColor.substring(0,claseColor.indexOf(" "))
		else
			colores[i]=filaColores.item(i).className;
	}
	// Por defecto cogemos el primer color
	var miColor=colores[0];
	// Creamos una tabla dándole parámetros
	var elementoTabla = document.createElement('div');
	elementoTabla.setAttribute('id','miTabla');
	elementoTabla.style.align='center';
	elementoTabla.style.border='2';
	elementoTabla.style.borderColor='brown';
	elementoTabla.style.borderStyle='solid';
	elementoTabla.style.padding='0px';
	elementoTabla.style.spacing='0px';
	elementoTabla.style.margin='0px';
		elementoTabla.style.float='left';

	var crearEvento = function(elemento,evento,mifuncion){
		
    function w3c_crearEvento(elemento, evento, mifuncion){
      elemento.addEventListener(evento, mifuncion, false);
    }
		
    function ie_crearEvento(elemento, evento, mifuncion){
      var fx = function(){
        mifuncion.call(elemento); 
      };
      
      elemento.attachEvent('on' + evento, fx);
    }
		// Comprueba el tipo de navegador que estamos utilizando
    if (typeof window.addEventListener !== 'undefined'){
      return w3c_crearEvento;
    }else if (typeof window.attachEvent !== 'undefined'){
      return ie_crearEvento;
    }
	}();

	
	var quitarEvento = function(elemento,evento,mifuncion){
		
    function w3c_quitarEvento(elemento, evento, mifuncion){
      elemento.removeEventListener(evento, mifuncion, false);
    }
		
    function ie_quitarEvento(elemento, evento, mifuncion){
     
      elemento.detachEvent('on' + evento, fx);
    }
		// Comprueba el tipo de navegador que estamos utilizando
    if (typeof window.removeEventListener !== 'undefined'){
      return w3c_quitarEvento;
    }else if (typeof window.detachEvent !== 'undefined'){
      return ie_quitarEvento;
    }
	}();

	// Creación de la tabla de dibujo
	for(i=1;i<=30;i++){
		// Creamos el elemento TR
		var elementoTR = document.createElement('div');
		elementoTR.style.padding='0px';
		elementoTR.style.spacing='0px';
		elementoTR.style.margin='0px';
		elementoTR.style.float='left';
		elementoTR.style.clear='left';
		// Creamos 30x30
		for(e=1;e<=30;e++){
			//id diferente para cada una de las casillas de dibujo
			var bx="box_"+i+"_"+e;
			var elementoTD = document.createElement('div');
			elementoTD.setAttribute('id',bx);
			elementoTD.style.width='10px';
			elementoTD.style.height='10px';
			elementoTD.style.border='1px';
			elementoTD.style.borderColor='grey';
			elementoTD.style.borderStyle='solid';
			elementoTD.style.padding='0px';
			elementoTD.style.spacing='0px';
			elementoTD.style.margin='1px';
			elementoTD.style.float='left';
			elementoTD.style.position='relative';
			//Los 30 TD al actual TR
			elementoTR.appendChild(elementoTD);
		}
		//Los 30 TR dentro de la tabla
		elementoTabla.appendChild(elementoTR);
	}
	
	// asignamos a la variable tablero 'zonadibujo'
	var tablero=document.getElementById('zonadibujo');

	tablero.style.align='center';
	// Ponemos un mensaje
	document.getElementsByTagName('p').item(1).innerHTML="Haga CLICK en cualquier celda para activar/desactivar el Pincel";

	// añadimos a 'zonadibujo' la tabla creada anteriormente (30 x 30)
	tablero.appendChild(elementoTabla);

	// comenzar o dejar de pintar
	crearEvento(tablero,'mousedown',comenzar);

	// ponemos en la variable 'objetoClase' el primer 'TR' de la tabla paleta de colores
	var objetoClase = document.getElementById('paleta').getElementsByTagName('tr').item(0);

	// asignamos el evento de pulsación del ratón a cada uno de los colores
	// de la paleta de colores. Cada color con su evento
	for(c=0;c<filaColores.length;c++){
		numColor = filaColores.item(c);
		numColor.className=colores[c];
		crearEvento(numColor,'mousedown',cambio);
	}
	
	// Seleccionamos el primer color por defecto. Cuando pulsemos en otro color cambiará
	filaColores.item(0).className+=" seleccionado";

	// Función que cambia el color según nuestra pulsación sobre los colores
	function cambio(){
		
		for(i=0;i<filaColores.length;i++){
			filaColores.item(i).className=colores[i];
			
			if(filaColores.item(i).className==this.className)
				miColor=colores[i];
		}
	
		this.className=this.className+" seleccionado";
	}
	
	
	comenzar();

	//activa o desactiva el evento mouseover sobre las casillas de dibujo
	function comenzar(){
		if(sino){
			sino=false;
			document.getElementById('pincel').innerHTML="PINCEL ACTIVADO";
			for(i=1;i<=30;i++){
				for(e=1;e<=30;e++){
					var capa = "box_"+i+"_"+e;
					crearEvento(document.getElementById(capa),'mouseover',pintar);
				}
			}
		}else{
			sino=true;
			document.getElementById('pincel').innerHTML="PINCEL DESACTIVADO";
			for(i=1;i<=30;i++){
				for(e=1;e<=30;e++){
					var capa = "box_"+i+"_"+e;
					quitarEvento(document.getElementById(capa),'mouseover',pintar);
				}
			}
		}
	}
	
	// Asigna el color seleccionado al fondo de las casillas sobre las que pasemos
	function pintar(){
		this.className=miColor;
	}
}