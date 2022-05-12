var siteId = document.URL;
var siteId = document.URL;
siteId = siteId.replace("//", "");
siteId = siteId.substring(siteId.indexOf("/") + 1);
siteId = siteId.substring(0, siteId.indexOf("/"));
siteId = siteId.replace("_01", "").toUpperCase();

var sufijoIdioma = "";
if (siteId.indexOf("_") != -1) {
	sufijoIdioma = siteId.substring(siteId.indexOf("_"));
}

//lodefino para quitar el error y hacerpruebas 
var rutaJS = "ruta";
var instancia = rutaJS.substring(rutaJS.indexOf("instancia"));
instancia = rutaJS.substring(rutaJS.indexOf("=") + 1);
var presentacion=1;
//var HttpCgiPath = "https://www.imserso.es/InterPresent1/idcplg";
HttpCgiPath = "/" + instancia +"/idcplg";
if (document.URL.indexOf("desaimser01") != -1 || document.URL.indexOf("interpro01") != -1) {
	presentacion=0;
}

var URLImagenes = "/" + instancia + "/groups/imagenes/documents/imagen";
var URLImagenes_link = "/IDC_Name/groups/imagenes/documents/imagen";
var URLImagenes_bbdd = "/" + instancia + "/groups/imagenes/documents/imagen/imagenesBasatec";
var URLDocumentos_bbdd = "/" + instancia + "/groups/imagenes/documents/imagen/documentosBasatec";
if (siteId.indexOf("SIPA") != -1) {
var URLDocumentos_ver = "https://sipaceapat.imserso.es/documentosBasatec";
}
if (siteId.indexOf("CATALOGO") != -1) {
var URLDocumentos_ver = "https://catalogoceapat.imserso.es/documentosBasatec";
}
if (instancia != "InterElabora"  &&  instancia != "DInterElabora" ) {
	URLImagenes_bbdd = "/imagenesBasatec";
	URLDocumentos_bbdd = "/documentosBasatec";
}

var URLSistema = "/" + instancia + "/groups/sistema/documents/sistema";

//Literales castellano
var wwmrSeleccioneOpcion = "Seleccione una opción...";
var wwmrCargando = "Cargando...";
var wwsagNuevaVentana = "Abre nueva ventana";
var wwmrFormatoTelefono = "El número de teléfono no tiene un formato correcto";
var wwmrFormatoTelefonoVarios = "El formato de alguno de los número de teléfono no es correcto";
var wwmrFormatoCorreo = "La dirección de correo electrónico no tiene un formato correcto";


function mi_funcion() {
	$('label abbr[title="obligatorio"]').each(function (idx) {
		var campo = $(this).parent().next();
		var tipoCampo = $(campo).prop('tagName');
		if (tipoCampo.toLowerCase() == "input" || tipoCampo.toLowerCase() == "textarea") {
			$(campo).bind('focusout', function(e){
				if ($(this).val().replace(/^\s*|\s*$/g, "") == "") {
					$(this).addClass('obligatorio');
					$(this).next().addClass('obligatorio');
				}
			}).bind('keyup', function(e){
				if ($(this).val().replace(/^\s*|\s*$/g, "") != "") {
					$(this).removeClass('obligatorio');
					$(this).next().removeClass('obligatorio');
				}
			});
		}
		if (tipoCampo.toLowerCase() == "select" && $(campo).hasClass('disabled') == false) {
			$(campo).bind('focusout', function(e){
				if ($(this).children('option:selected').val() == "0") {
					$(this).addClass('obligatorio');
					$(this).next().addClass('obligatorio');
				}
			}).bind('change', function(e){
				if ($(this).children('option:selected').val() != "0") {
					$(this).removeClass('obligatorio');
					$(this).next().removeClass('obligatorio');
				} else {
					$(this).addClass('obligatorio');
					$(this).next().addClass('obligatorio');
				}
			});
		}
	});
}

// cuando seleccionon un inforfmre cargamos sus datos de un json
	jQuery(".selInforme").on('change', function() {
	
		jQuery('.seccionesContenedor').html('');
		jQuery("#titulo").val('');
		if (this.value != 0){
			var request = jQuery.ajax({
				url: HttpCgiPath + "?IdcService=IM_GET_INFORME",
				dataType: "json",
				method: "GET",
				data: 'parametro='+this.value,
				error: function(xhr, textStatus, error){
				console.log(xhr.statusText);
				 console.log(textStatus);
				console.log(error);
				},
				success: function (data) {
					console.log(data);
					jQuery.each(data, function(index, item) {
						console.log(item.titulo);
						jQuery("#titulo").val(item.titulo);
						
						var cuantasSeccionesHay=1;
								jQuery.each(item.secciones, function(index, seccion) {
									cuantasSeccionesHay=cuantasSeccionesHay+1;
									var valmanda="";
									var htmli="";
									jQuery.each(seccion.productos_seccion, function(index, producto) {
										htmli+='<li id="sel_env_inf_'+producto.id+'" data-nombre="'+producto.nombre+'" data-id="'+producto.id+'">'+producto.nombre+' <span class="eliminaIDSel" onclick="eliminaSeleccionadoSec(\'mandaProductosSeccion_'+seccion.seccion_orden+'\',\'inf_'+producto.id+'\',\''+producto.nombre+'\')">X</span></li>';
										valmanda=valmanda+","+producto.id;
									});
									valmanda=valmanda.substring(1);
									var html='';
									html+='<div id="seccion_'+seccion.seccion_orden+'" class="cursorMove">';
									html+='<span class="handle"></span>';
									html+='<input type="button"  value="Eliminar Sección" class="borraSeccion" onclick="borraSeccion(\''+seccion.seccion_orden+'\')">';
									html+='<input type="hidden"  name="mandaProductosSeccion_'+seccion.seccion_orden+'" id="mandaProductosSeccion_'+seccion.seccion_orden+'" class="mandaProductosSeccion" value="'+valmanda+'">';
									html+='<div class="tituloSeccion">';
									html+='<label for="tituloSeccion_'+seccion.seccion_orden+'">Título de la sección:</label>';
									html+='<input type="text"  name="tituloSeccion_'+seccion.seccion_orden+'" id="tituloSeccion_'+seccion.seccion_orden+'" value="'+seccion.seccion_titulo+'">';
									html+='</div>';
									html+='<div class="mandaProductosSeccionNombres_'+seccion.seccion_orden+'" id="mandaProductosSeccionNombres_'+seccion.seccion_orden+'"><ul class="listadoInformes" id="prodSel_'+seccion.seccion_orden+'">';
										html+=htmli;
									html+='</ul></div>'
									html+='</div>';
									console.log(html);
									jQuery('.seccionesContenedor').append(html);
									
								});
								jQuery('#cuantasSeccionesHay').val(cuantasSeccionesHay);
									var html_fechai="";
								jQuery.each(item.fechas, function(index, fecha) {
									
										html_fechai+='<li>'+fecha.departamento+'( '+fecha.fecha+') </li>';
										
								});
								
									var html_fecha='';
									html_fecha+='<div id="fechas" class="fechasInforme"><ul>';
									html_fecha+=html_fechai;
									html_fecha+='</ul></div>';
									
									console.log(html_fecha);
									jQuery('.fechasInformesViejos').html(html_fecha);
								
					});
				}
			});

		}else{jQuery('.fechasInformesViejos').html('');}
	});	
function mostrarOcultarMensaje(elem) {
	var tipoCampo = $(elem).prop('tagName');
	var nombreCampo = $(elem).attr('name');
	var nombreCampoIso = $(elem).attr('name').split('_')[1];
	var esCampoEmpresa = false;
	if (nombreCampo == "_fab_1" || nombreCampo == "_dist_1" || nombreCampo == "_dise_1") {
		esCampoEmpresa = true;
	}
	if (tipoCampo.toLowerCase() == "input" || tipoCampo.toLowerCase() == "textarea") {
		if ($(elem).val().replace(/^\s*|\s*$/g, "") == "") {
			$(elem).addClass('obligatorio');
			$(elem).prev().addClass('obligatorio');
		} else {
			$(elem).removeClass('obligatorio');
			$(elem).prev().removeClass('obligatorio');
		}
	}
	if (nombreCampoIso == "ison4"){
		if ( $(elem).val() == "") {
			$(".easy-autocomplete").prev().addClass('obligatorio');
			
		} else {
			$(".easy-autocomplete").prev().removeClass('obligatorio');
		}
	}
	if (tipoCampo.toLowerCase() == "select" && !esCampoEmpresa) {
		if ($(elem).children('option:selected').val() == "0") {
			$(elem).addClass('obligatorio');
			$(elem).prev().addClass('obligatorio');
		} else {
			$(elem).removeClass('obligatorio');
			$(elem).prev().removeClass('obligatorio');
		}
	}
	if (tipoCampo.toLowerCase() == "select" && esCampoEmpresa) {
		var aEmpresas = new Array("_fab_1","_dist_1","_dise_1");
		var empresaVacia = 1;
		var x = 0;
		while (aEmpresas[x]) {
			if ($('[id="' + aEmpresas[x] + '"]').children('option:selected').val() != "0") {
				empresaVacia = 0;
				break;
			}
			x++;
		}
		x = 0;
		while (aEmpresas[x]) {
			if (empresaVacia) {
				$('[id="' + aEmpresas[x] + '"]').addClass('obligatorio');
				$('[id="' + aEmpresas[x] + '"]').prev().addClass('obligatorio');
			} else {
				$('[id="' + aEmpresas[x] + '"]').removeClass('obligatorio');
				$('[id="' + aEmpresas[x] + '"]').prev().removeClass('obligatorio');
			}
			x++;
		}
	}
}

function nuevoAjax() {
	var xmlhttp = false;
	try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		try {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (ex) {
			if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
				xmlhttp = new XMLHttpRequest();
			}
		}
	}
	return xmlhttp;
}

function buscarEnArray(array, dato) {
	var x = 0;
	while (array[x]) {
		if (array[x] == dato) {
			return x;
		}
		x++;
	}
	return null;
}



//Formatea (cadena separada por "-") las opciones seleccionadas de un select multiple
function formatearCampo(campo) {
	var listaValoresCampo = "";
	if (campo.length != 0 ){
		for (i = 0; i < campo.length; i++) {
			if (campo[i].selected) {
				listaValoresCampo += campo[i].value + "-";
			}
		}
	}
	
		if (listaValoresCampo != "") {
			listaValoresCampo = listaValoresCampo.substring(0, listaValoresCampo.length - 1);
		}
	
	return listaValoresCampo;
}



//Valida el formulario, formatea los campos y "envia" el formulario por Categoria
function validarCamposBusquedaPorCategoria(form, esAND) {
	
	//Se formatean las opciones seleccionadas de los campos (selects multiples)
	var listaCat="";
	if (jQuery("#categorias1 :selected").length != 0 ){listaCat = form.listaCategorias1.value;}
	if (jQuery("#categorias2 :selected").length != 0 ){listaCat +="-"+form.listaCategorias2.value;}
	if (jQuery("#categorias3 :selected").length != 0 ){listaCat +="-"+form.listaCategorias3.value;}
	
	form.listaCategorias.value=listaCat.replace(/\--/g, '-').slice(0,-1);
	if (listaCat == ""){
		jQuery('.mensaje').removeClass("hidden");
		jQuery(".mensaje p").html("por favor seleccione al menos una Categoría.");
	}else{
		buscarJson ('IM_RESULTADOS_PROA_BUSQUEDA_TEMPLATE','listaCategorias');
	}
	
}
//abre ventana nuevva para insertar nueva iso
function abreAltaSimilarIso(iso) {
	if ( iso == "1"){
		var iso=jQuery('#botonSimilarISO').attr("data-iso");
		}
	if (siteId.indexOf("SIPA") != -1) {
	window.open('/sipa_01/prod/alta/index.htm?id_de_iso_busqueda='+iso);
	}
	if (siteId.indexOf("CATALOGO") != -1) {
	window.open('/catalogo_01/prod/alta/index.htm?id_de_iso_busqueda='+iso);
	}
}
//Valida el formulario, formatea los campos y "envia" el formulario por ISO
function validarCamposBusquedaPorISO(form, esAND) {
	console.log(33333333333);
	//Se formatean las opciones seleccionadas de los campos (selects multiples)
	var listaIsos="";
	if (jQuery("#ison1 :selected").length != 0 ){listaIsos = form.listaIso1.value;}
	if (jQuery("#ison1 :selected").length != 0 ){listaIsos = form.listaIso1.value;}
	if (jQuery("#ison2 :selected").length != 0 ){listaIsos +="-"+form.listaIso2.value;}
	if (jQuery("#ison3 :selected").length != 0 ){listaIsos +="-"+form.listaIso3.value; var compara}
	//listaIsos=listaIsos.substring(1,listaIsos.length-1);
	
	
	form.listaIso.value=listaIsos.replace(/\--/g, '-');
	form.listaISO.value=listaIsos.replace(/\--/g, '-');

	if (listaIsos == ""){
	console.log("aqui se queda y no pasa");
		jQuery('.mensaje').removeClass("hidden");
		jQuery(".mensaje p").html("por favor seleccione al menos una ISO.");
	}else{
	console.log("si que pasa pasa");
	jQuery(".mensaje p").html("");
	//vemos si hay una iso de nivel 3 para poner el boton de alta similar
	var cadena = jQuery("#listaIso3").val();
 console.log("cadena="+cadena);
		var indices = [];
		for(var i = 0; i < cadena.length; i++) {
			if (cadena[i].toLowerCase() === "-") indices.push(i);
		}
	console.log("hay="+indices.length);
	if( indices.length === 1){ 
	console.log("siiiii");
		var iso =jQuery("#listaIso3").val().replace("-", "");
		console.log("iso="+iso);
		jQuery('.divContinuarIso').removeClass("hidden");
		jQuery('#botonSimilarISO').attr("data-iso",iso);
		jQuery('#botonSimilarISO').attr("value","Alta en la ISO "+iso);
	}else{
	console.log("noooo");
		jQuery('#botonSimilarISO').attr("data-iso","");
		jQuery('.divContinuarIso').addClass("hidden");
		jQuery('#botonSimilarISO').attr("value","Alta en la ISO  ...");
	}
	//fin vemos si hay una iso de nivel 3 para poner el boton de alta similar
		buscarJson ('IM_RESULTADOS_PROA_BUSQUEDA_ISO_TEMPLATE','listaISO');} 
}
function muestraOcultaMensaje (){
	//if (jQuery('.mensaje').not(".hidden")){
		//	var listaIsos="";
			//if (jQuery("#ison1 :selected").length != 0 ){listaIsos = form.listaIso1.value;}
			//if (jQuery("#ison2 :selected").length != 0 ){listaIsos +="-"+form.listaIso2.value;}
			//if (jQuery("#ison3 :selected").length != 0 ){listaIsos +="-"+form.listaIso3.value;}
				
			//if (listaIsos == ""){
			//	jQuery('.mensaje').removeClass("hidden");
				//jQuery(".mensaje p").html("por favor seleccione al menos una ISO.");
			//}else{
			//	jQuery('.mensaje').addClass("hidden");
				//	jQuery(".mensaje p").html("");
			//} 
		
		//}

}
function muestraOcultaMensajeCategorias (){
	if (jQuery('.mensaje').not(".hidden")){
			var listaCat="";
	if (jQuery("#categorias1 :selected").length != 0 ){listaCat = listaCategorias1.value;}
	if (jQuery("#categorias2 :selected").length != 0 ){listaCat +="-"+listaCategorias2.value;}
	if (jQuery("#categorias3 :selected").length != 0 ){listaCat +="-"+listaCategorias3.value;}
				
			if (listaCat == ""){
				jQuery('.mensaje').removeClass("hidden");
				jQuery(".mensaje p").html("por favor seleccione al menos una Categoría.");
			}else{
				jQuery(".mensaje p").html("");
				jQuery('.mensaje').addClass("hidden");
					jQuery(".mensaje p").html("");
			} 
		
		}

}
jQuery('form[name="busquedaProaPorISO"] input').on("keydown",function search(e) {

	muestraOcultaMensaje();
});


//Carga la jerarquia de las Categorias mostrando o no los hijos en funcion de si los padres de estos estan o no seleccionados
function cargarCategorias_(form, obligatorio) {
	//Se almacenan en una lista las opciones de las categorias y subcategorias seleccionadas
	form.listaCategorias.value = formatearCampo(form.categorias.options);
	var opcionesCategSeleccionadas = form.listaCategorias.value;
	opcionesCategSeleccionadas = "-" + opcionesCategSeleccionadas + "-";
	
	if (window.XMLHttpRequest) {
		//var ajax=nuevoAjax();
		var ajax = new XMLHttpRequest();
		//obligatorio vale 1 (insertar, actualizar) o 0 (busqueda) en funcion de si se debe poner en el literal del campo como obligatorio
		ajax.open("GET", HttpCgiPath + "?IdcService=IM_CARGAR_CATEGORIAS_TEMPLATE" + unescape("&") + "opcionesCategSeleccionadas=" + opcionesCategSeleccionadas + unescape("&") + "sufijoIdioma=" + sufijoIdioma + unescape("&") + "obligatorio=" + obligatorio, true);
		//ajax.send();
		ajax.onreadystatechange = function() {
			var selectDestino = document.getElementById("categorias");
			//if (ajax.readyState == 1) {
			if (ajax.readyState != 4) {
				selectDestino.length = 0;
				var nuevaOpcion = document.createElement("option");
				nuevaOpcion.value = 0;
				nuevaOpcion.innerHTML = eval("wwmrCargando" + sufijoIdioma);
				selectDestino.appendChild(nuevaOpcion);
				//? Si se deja el disabled, al refrescar la pagina, se carga el combo inicial con las opciones deshabilitadas
				//selectDestino.disabled = true;
			}
			if (/*ajax.status == 200 && */ajax.readyState == 4) {
				selectDestino.parentNode.innerHTML = ajax.responseText;
			}
		}
		ajax.send(/*null*/);
	}
}

function cargarCategorias(form, select) {
	//Para el select sobre el que se hace la seleccion se hace la llamada pasando como parametros su nivel correspondiente y el nivel maximo
	var nivel = select.name.substring(select.name.length - 1);
	var nivelMax = 0;
	while (eval("form.categorias" + (nivelMax + 1)) != undefined) {
		nivelMax = nivelMax + 1;
	}
	
	cargarCategoriasNivel(form, parseInt(nivel), nivelMax);
}

function cargarCategoriasNivel(form, nivel, nivelMax) {
	//Se formatean las opciones seleccionadas del select sobre el que se hace la seleccion. Se usa para saber lo que hay que cargar en el select dependiente (siguiente)
	eval("form.listaCategorias" + nivel).value = formatearCampo(eval("form.categorias" + nivel + ".options"));
	var opcionesSeleccionadas = eval("form.listaCategorias" + nivel + ".value");
	if (opcionesSeleccionadas != "") {
		opcionesSeleccionadas = "-" + opcionesSeleccionadas + "-";
	}
	
	//Se formatean las opciones seleccionadas del select dependiente (siguiente) sobre el que se hace la seleccion para no perderlas al generarlo nuevamente
	var nivelSig = nivel + 1;
	
	eval("form.listaCategorias" + nivelSig).value = formatearCampo(eval("form.categorias" + nivelSig + ".options"));
	var opcionesSeleccionadasSig = eval("form.listaCategorias" + nivelSig + ".value");
	if (opcionesSeleccionadasSig != "") {
		opcionesSeleccionadasSig = "-" + opcionesSeleccionadasSig + "-";
	}
	
	if (window.XMLHttpRequest) {
		//var ajax=nuevoAjax();
		var ajax = new XMLHttpRequest();
		ajax.open("GET", HttpCgiPath + "?IdcService=IM_CARGAR_CATEGORIAS_TEMPLATE" + unescape("&") + "opcionesSeleccionadas=" + opcionesSeleccionadas + unescape("&") + "opcionesSeleccionadasSig=" + opcionesSeleccionadasSig + unescape("&") + "sufijoIdioma=" + sufijoIdioma + unescape("&") + "nivelSig=" + nivelSig + unescape("&") + "nivelMax=" + nivelMax, true);
		//ajax.send();
		ajax.onreadystatechange = function() {
			var selectDestino = document.getElementById("categorias" + nivelSig);
			var elemPadre = selectDestino.parentNode;
			var selectDestinoId = selectDestino.id;
			//Se elimina el select dependiente (siguiente o destino) sobre el que se hace la seleccion
			$('#' + selectDestinoId).remove();
			//if (ajax.readyState == 1) {
			if (ajax.readyState != 4) {
				var mensajeCarga = '<p id="' + selectDestinoId + '">' + eval("wwmrCargando" + sufijoIdioma) + "</p>";
				elemPadre.innerHTML += mensajeCarga;
			}
			if (/*ajax.status == 200 && */ajax.readyState == 4) {
				elemPadre.innerHTML += ajax.responseText;
				
				//EL template solo devuelve la generacion del select dependiente (siguiente o destino) sobre el que se hace la seleccion
				//Por lo tanto hay que modificar mediante el DOM todos los demas selects siguientes
				for (var i = nivel + 2; i <= nivelMax; i++) {
					//Para poder modificar cada uno de dichos selects restantes siguientes, hay que obtener las opciones seleccionadas del select anterior para saber lo que hay que cargar
					eval("form.listaCategorias" + (i - 1)).value = formatearCampo(eval("form.categorias" + (i - 1) + ".options"));
					opcionesSeleccionadas = eval("form.listaCategorias" + (i - 1) + ".value");
					if (opcionesSeleccionadas != "") {
						opcionesSeleccionadas = "-" + opcionesSeleccionadas + "-";
					}
					
					//Se obtienen los elementos optgroup de las opciones del select (select actual de los selects restantes siguientes)
					var optgroupSigArray = eval("form.categorias" + i + ".children");
					//El select tiene elementos optgroup
					//El mensaje de aviso no se tiene en cuenta porque se comprueba que el select no esta deshabilitado, es decir, hay opciones cargadas
					if (optgroupSigArray.length > 0 && eval("form.categorias" + i + ".disabled") == false) {
						//Se almacenan solo los optgroup a eliminar, es decir, los que no se corresponden con opciones seleccionadas en el select anterior
						var optgroupSigEliminar = "";
						var strSize = 0;
						for (var j = 0; j < optgroupSigArray.length; j++) {
							if (opcionesSeleccionadas.indexOf("-" + optgroupSigArray[j].id + "-") == -1) {
								optgroupSigEliminar = optgroupSigEliminar + optgroupSigArray[j].id + ",";
								//Para pintar el select con el tamano exacto, se tiene que tener en cuenta el numero de opciones de cada optgroup a eliminar y se suma siempre 1 porque hay que tener en cuenta el propio optgroup
								strSize = strSize + $("#" + optgroupSigArray[j].id + " > option").length + 1;
							}
						}
						
						//Si hay optgroup que eliminar, se eliminan y se actualiza el tamano del select
						if (optgroupSigEliminar != "") {
							optgroupSigEliminar = optgroupSigEliminar.substring(0, optgroupSigEliminar.length - 1);
							var optgroupSigEliminarArray = optgroupSigEliminar.split(",");
							for (var j = 0; j < optgroupSigEliminarArray.length; j++) {
								document.getElementById(optgroupSigEliminarArray[j]).parentNode.removeChild(document.getElementById(optgroupSigEliminarArray[j]));
							}
							eval("form.categorias" + i).setAttribute("size", eval("form.categorias" + i + ".size") - strSize);
						}
						
						//Se obtienen, nuevamente, los elementos optgroup de las opciones del select (select actual de los selects restantes siguientes)
						//Si, debido al cambio, el select esta vacio, entonces se deshabilita, se elimina el tamano y se anade el mensaje de aviso
						optgroupSigArray = eval("form.categorias" + i + ".children");
						if (optgroupSigArray.length == 0) {
							eval("form.categorias" + i).setAttribute("disabled", "disabled");
							eval("form.categorias" + i).removeAttribute("size");
							
							var nuevaOpcion = document.createElement("option");
							nuevaOpcion.innerHTML = "Seleccione categorías de nivel " + (i - 1);
							eval("form.categorias" + i).appendChild(nuevaOpcion);
						}
					}
					//El select no tiene elementos optgroup
					//La unica opcion es el mensaje de aviso. Ademas, se comprueba que el select esta deshabilitado, es decir, no hay opciones cargadas
					if (optgroupSigArray.length == 1 && eval("form.categorias" + i + ".disabled") == true) {
						eval("form.categorias" + i).children[0].innerHTML = "Seleccione categorías de nivel " + (i - 1);
					}
				}
			}
		}
		ajax.send(/*null*/);
	}
}


//Carga la jerarquia de la ISO mostrando o no los hijos en funcion de si los padres de estos estan o no seleccionados
function cargarISO(form, obligatorio) {
	//Se almacenan en una lista las opciones de las ISO seleccionadas
	form.listaISO.value = formatearCampo(form.ISO.options);
	var opcionesISOSeleccionadas = form.listaISO.value;
	opcionesISOSeleccionadas = "-" + opcionesISOSeleccionadas + "-";
	
	//alert(opcionesISOSeleccionadas);
	if (window.XMLHttpRequest) {
		//var ajax=nuevoAjax();
		var ajax = new XMLHttpRequest();
		//obligatorio vale 1 (insertar, actualizar) o 0 (busqueda) en funcion de si se debe poner en el literal del campo como obligatorio
		ajax.open("GET", HttpCgiPath + "?IdcService=IM_CARGAR_ISO_TEMPLATE" + unescape("&") + "opcionesISOSeleccionadas=" + opcionesISOSeleccionadas + unescape("&") + "sufijoIdioma=" + sufijoIdioma + unescape("&") + "obligatorio=" + obligatorio, true);
		//ajax.send();
		ajax.onreadystatechange = function() {
			var selectDestino = document.getElementById("ISO");
			//if (ajax.readyState == 1) {
			if (ajax.readyState != 4) {
				selectDestino.length = 0;
				var nuevaOpcion = document.createElement("option");
				nuevaOpcion.value = 0;
				nuevaOpcion.innerHTML = eval("wwmrCargando" + sufijoIdioma);
				selectDestino.appendChild(nuevaOpcion);
				//? Si se deja el disabled, al refrescar la pagina, se carga el combo inicial con las opciones deshabilitadas
				//selectDestino.disabled = true;
			}
			if (/*ajax.status == 200 && */ajax.readyState == 4) {
				selectDestino.parentNode.innerHTML = ajax.responseText;
			}
		}
		ajax.send(/*null*/);
	}
}

//Carga la jerarquia de la ISO mostrando o no los hijos en funcion de si los padres de estos estan o no seleccionados
function cargarISOBusqueda(form, obligatorio) {
	//Se almacenan en una lista las opciones de las ISO seleccionadas
	form.listaISO.value = formatearCampo(form.ISO.options);
	var opcionesISOSeleccionadas = form.listaISO.value;
	opcionesISOSeleccionadas = "-" + opcionesISOSeleccionadas + "-";
	
	//alert(opcionesISOSeleccionadas);
	if (window.XMLHttpRequest) {
		//var ajax=nuevoAjax();
		var ajax = new XMLHttpRequest();
		//obligatorio vale 1 (insertar, actualizar) o 0 (busqueda) en funcion de si se debe poner en el literal del campo como obligatorio
		ajax.open("GET", HttpCgiPath + "?IdcService=IM_CARGAR_ISO_BUSQUEDA_TEMPLATE" + unescape("&") + "opcionesISOSeleccionadas=" + opcionesISOSeleccionadas + unescape("&") + "sufijoIdioma=" + sufijoIdioma + unescape("&") + "obligatorio=" + obligatorio, true);
		//ajax.send();
		ajax.onreadystatechange = function() {
			var selectDestino = document.getElementById("ISO");
			//if (ajax.readyState == 1) {
			if (ajax.readyState != 4) {
				selectDestino.length = 0;
				var nuevaOpcion = document.createElement("option");
				nuevaOpcion.value = 0;
				nuevaOpcion.innerHTML = eval("wwmrCargando" + sufijoIdioma);
				selectDestino.appendChild(nuevaOpcion);
				//? Si se deja el disabled, al refrescar la pagina, se carga el combo inicial con las opciones deshabilitadas
				//selectDestino.disabled = true;
			}
			if (/*ajax.status == 200 && */ajax.readyState == 4) {
				selectDestino.parentNode.innerHTML = ajax.responseText;
			}
		}
		ajax.send(/*null*/);
	}
}

function cargarISO(form, select) {
	//Para el select sobre el que se hace la seleccion se hace la llamada pasando como parametros su nivel correspondiente y el nivel maximo
	var nivel = select.name.substring(select.name.length - 1);
	var nivelMax = 0;
	while (eval("form.ison" + (nivelMax + 1)) != undefined) {
		nivelMax = nivelMax + 1;
	}
	
	cargarISONivel(form, parseInt(nivel), nivelMax);
}

function cargarISONivel(form, nivel, nivelMax) {
	//Se formatean las opciones seleccionadas del select sobre el que se hace la seleccion. Se usa para saber lo que hay que cargar en el select dependiente (siguiente)
	eval("form.listaISOn" + nivel).value = formatearCampo(eval("form.ison" + nivel + ".options"));
	var opcionesSeleccionadas = eval("form.listaISOn" + nivel + ".value");
	if (opcionesSeleccionadas != "") {
		opcionesSeleccionadas = "-" + opcionesSeleccionadas + "-";
	}
	
	//Se formatean las opciones seleccionadas del select dependiente (siguiente) sobre el que se hace la seleccion para no perderlas al generarlo nuevamente
	var nivelSig = nivel + 1;
	
	eval("form.listaISOn" + nivelSig).value = formatearCampo(eval("form.ison" + nivelSig + ".options"));
	var opcionesSeleccionadasSig = eval("form.listaISOn" + nivelSig + ".value");
	if (opcionesSeleccionadasSig != "") {
		opcionesSeleccionadasSig = "-" + opcionesSeleccionadasSig + "-";
	}
	
	if (window.XMLHttpRequest) {
		//var ajax=nuevoAjax();
		var ajax = new XMLHttpRequest();
		ajax.open("GET", HttpCgiPath + "?IdcService=IM_CARGAR_ISO_BUSQUEDA_TEMPLATE" + unescape("&") + "opcionesSeleccionadas=" + opcionesSeleccionadas + unescape("&") + "opcionesSeleccionadasSig=" + opcionesSeleccionadasSig + unescape("&") + "sufijoIdioma=" + sufijoIdioma + unescape("&") + "nivelSig=" + nivelSig + unescape("&") + "nivelMax=" + nivelMax, true);
		//ajax.send();
		ajax.onreadystatechange = function() {
			var selectDestino = document.getElementById("ison" + nivelSig);
			var elemPadre = selectDestino.parentNode;
			var selectDestinoId = selectDestino.id;
			//Se elimina el select dependiente (siguiente o destino) sobre el que se hace la seleccion
			$('#' + selectDestinoId).remove();
			//if (ajax.readyState == 1) {
			if (ajax.readyState != 4) {
				var mensajeCarga = '<p id="' + selectDestinoId + '">' + eval("wwmrCargando" + sufijoIdioma) + "</p>";
				elemPadre.innerHTML += mensajeCarga;
			}
			if (/*ajax.status == 200 && */ajax.readyState == 4) {
				elemPadre.innerHTML += ajax.responseText;
				
				//EL template solo devuelve la generacion del select dependiente (siguiente o destino) sobre el que se hace la seleccion
				//Por lo tanto hay que modificar mediante el DOM todos los demas selects siguientes
				for (var i = nivel + 2; i <= nivelMax; i++) {
					//Para poder modificar cada uno de dichos selects restantes siguientes, hay que obtener las opciones seleccionadas del select anterior para saber lo que hay que cargar
					eval("form.listaISOn" + (i - 1)).value = formatearCampo(eval("form.ison" + (i - 1) + ".options"));
					opcionesSeleccionadas = eval("form.listaISOn" + (i - 1) + ".value");
					if (opcionesSeleccionadas != "") {
						opcionesSeleccionadas = "-" + opcionesSeleccionadas + "-";
					}
					
					//Se obtienen los elementos optgroup de las opciones del select (select actual de los selects restantes siguientes)
					var optgroupSigArray = eval("form.ison" + i + ".children");
					//El select tiene elementos optgroup
					//El mensaje de aviso no se tiene en cuenta porque se comprueba que el select no esta deshabilitado, es decir, hay opciones cargadas
					if (optgroupSigArray.length > 0 && eval("form.ison" + i + ".disabled") == false) {
						//Se almacenan solo los optgroup a eliminar, es decir, los que no se corresponden con opciones seleccionadas en el select anterior
						var optgroupSigEliminar = "";
						var strSize = 0;
						for (var j = 0; j < optgroupSigArray.length; j++) {
							if (opcionesSeleccionadas.indexOf("-" + optgroupSigArray[j].id + "-") == -1) {
								optgroupSigEliminar = optgroupSigEliminar + optgroupSigArray[j].id + ",";
								//Para pintar el select con el tamano exacto, se tiene que tener en cuenta el numero de opciones de cada optgroup a eliminar y se suma siempre 1 porque hay que tener en cuenta el propio optgroup
								strSize = strSize + $("#" + optgroupSigArray[j].id + " > option").length + 1;
							}
						}
						
						//Si hay optgroup que eliminar, se eliminan y se actualiza el tamano del select
						if (optgroupSigEliminar != "") {
							optgroupSigEliminar = optgroupSigEliminar.substring(0, optgroupSigEliminar.length - 1);
							var optgroupSigEliminarArray = optgroupSigEliminar.split(",");
							for (var j = 0; j < optgroupSigEliminarArray.length; j++) {
								document.getElementById(optgroupSigEliminarArray[j]).parentNode.removeChild(document.getElementById(optgroupSigEliminarArray[j]));
							}
							eval("form.ison" + i).setAttribute("size", eval("form.ison" + i + ".size") - strSize);
						}
						
						//Se obtienen, nuevamente, los elementos optgroup de las opciones del select (select actual de los selects restantes siguientes)
						//Si, debido al cambio, el select esta vacio, entonces se deshabilita, se elimina el tamano y se anade el mensaje de aviso
						optgroupSigArray = eval("form.ison" + i + ".children");
						if (optgroupSigArray.length == 0) {
							eval("form.ison" + i).setAttribute("disabled", "disabled");
							eval("form.ison" + i).removeAttribute("size");
							
							var nuevaOpcion = document.createElement("option");
							nuevaOpcion.innerHTML = "Seleccione clasificación ISO de nivel " + (i - 1);
							eval("form.ison" + i).appendChild(nuevaOpcion);
						}
					}
					//El select no tiene elementos optgroup
					//La unica opcion es el mensaje de aviso. Ademas, se comprueba que el select esta deshabilitado, es decir, no hay opciones cargadas
					if (optgroupSigArray.length == 1 && eval("form.ison" + i + ".disabled") == true) {
						eval("form.ison" + i).children[0].innerHTML = "Seleccione clasificación ISO de nivel " + (i - 1);
					}
				}
			}
		}
		ajax.send(/*null*/);
	}
}



//Carga de los selects dependientes al Insertar y Actualizar
function cargaContenido(idSelectOrigen, listadoSelects, form) {

	var posicionSelectDestino = buscarEnArray(listadoSelects, idSelectOrigen) + 1;
	var idSelectDestino = listadoSelects[posicionSelectDestino];
	var selectOrigen = document.getElementById(idSelectOrigen);
	var opcionSeleccionada = selectOrigen.options[selectOrigen.selectedIndex].value;
	// console.log(selectOrigen);
	//Se deshabilitan los selects dependientes correspondientes
	if (opcionSeleccionada == 0) {
		var x = posicionSelectDestino, selectActual = null;
		
		while (listadoSelects[x]) {
			selectActual = document.getElementById(listadoSelects[x]);
			selectActual.length = 0;
			
			var nuevaOpcion = document.createElement("option");
			nuevaOpcion.value = 0;
			nuevaOpcion.innerHTML = eval("wwmrSeleccioneOpcion" + sufijoIdioma);
			selectActual.appendChild(nuevaOpcion);
			selectActual.disabled = true;
			
			//Se quita la clase obligatorio en los selects que se deshabiliten
			$(selectActual).removeClass('obligatorio');
			$(selectActual).prev().removeClass('obligatorio');
			
			x++;
		}
	//Se cargan los selects dependientes correspondientes
	//?
	} else if (idSelectOrigen != listadoSelects[listadoSelects.length - 1]) {
		//El array de selects dependientes se pasa a cadena separada por comas
		var strListadoSelects = "";
		for (i = 0; i < listadoSelects.length; i++) {
			strListadoSelects += listadoSelects[i] + ",";
		}
		strListadoSelects = strListadoSelects.substring(0, strListadoSelects.length - 1);
		
		//Servicio correspondiente al select destino
		var servicio = "";
		if (idSelectDestino.indexOf("provincia") != -1) {
			servicio = "IM_GET_PROA_PROVINCIA";
		}
		if (idSelectDestino.indexOf("localidad") != -1) {
			servicio = "IM_GET_PROA_LOCALIDAD";
		}
		if (idSelectDestino.indexOf("iso") != -1) {
			servicio = "IM_GET_PROA_ISO_HIJOS";
		}
		var selectDestino = document.getElementById(idSelectDestino);
		if (window.XMLHttpRequest) {
			//var ajax=nuevoAjax();
			var ajax = new XMLHttpRequest();
			var url = HttpCgiPath + "?IdcService=IM_CAMPOS_DEPENDIENTES_TEMPLATE" + unescape("&") + "listadoSelects=" + strListadoSelects + unescape("&") + "servicio=" + servicio + unescape("&") + "select=" + idSelectDestino + unescape("&") + "opcion=" + encodeURI(opcionSeleccionada) + unescape("&") + "sufijoIdioma=" + sufijoIdioma;
			ajax.open("GET", url, true);
			//ajax.send();
			ajax.onreadystatechange = function() {
				//if (ajax.readyState == 1) {
				if (ajax.readyState != 4) {
					selectDestino.length = 0;
					var nuevaOpcion = document.createElement("option");
					nuevaOpcion.value = 0;
					//Solo sale en IE
					nuevaOpcion.innerHTML = eval("wwmrCargando" + sufijoIdioma);
					selectDestino.appendChild(nuevaOpcion);
					selectDestino.disabled=true;
					
					//Si se vuelve a escoger una opcion en un select con una opcion ya seleccionada, se deshabilitan los select dependientes correspondientes (excepto el siguiente inmediato)
					var posicionSelectSiguiente = buscarEnArray(listadoSelects, idSelectOrigen) + 2;
					//?
					//El select que se vuelve a recargar debe ser anterior al penultimo select
					if (posicionSelectSiguiente <= listadoSelects.length - 1) {
						var x = posicionSelectSiguiente;
						while (listadoSelects[x]) {
						 // console.log(listadoSelects[x]);
							selectActual = document.getElementById(listadoSelects[x]);
							selectActual.length = 0;
							
							var nuevaOpcion = document.createElement("option");
							nuevaOpcion.value = 0;
							nuevaOpcion.innerHTML = eval("wwmrSeleccioneOpcion" + sufijoIdioma);
							selectActual.appendChild(nuevaOpcion);
							selectActual.disabled = true;
							
							x++;
						}
					}
				}
				if (/*ajax.status == 200 && */ajax.readyState == 4) {
					var elemPadre = selectDestino.parentNode;
					$('#' + idSelectDestino).remove();
					elemPadre.innerHTML += ajax.responseText;
					if( form != "" ){
						$('#' + idSelectDestino+' option[value="'+form+'"]').prop('selected',true);
						$('#' + idSelectDestino+' option[value="'+form+'"]').attr('selected','selected');
					return 1;
					}
				}
			}
			ajax.send(/*null*/);
		}
	}
}


//Valida el formulario, formatea los campos y "envia" el formulario
function validarCamposBusquedaEmpresaTL(form, nodeId) {
	//Carga los resultados de busqueda
	
	cargarBusquedaEmpresaTL("", nodeId);
}


//Carga los resultados de busqueda
function cargarBusquedaEmpresaTL(_NextRow, nodeId) {
	if (window.XMLHttpRequest) {
		//var ajax=nuevoAjax();
		var ajax = new XMLHttpRequest();
		
		var form = document.getElementById("busquedaEmpresaTextoLibre");
		
		//encodeURI(form.xxx.value) para que al ejecutar el servicio Java los caracteres raros no se interpreten como '?'
		var url = HttpCgiPath + "?IdcService=IM_RESULTADOS_PROA_BUSQUEDA_EMPRESA_TL_TEMPLATE" + unescape("&") + "textoLibre=" + encodeURI(form.textoLibre.value) + unescape("&") + "sufijoIdioma=" + sufijoIdioma + unescape("&") + "siteId=" + siteId;
		url += unescape("&") + "URLImagenes=" + URLImagenes + unescape("&") + "URLSistema=" + URLSistema;
		url += unescape("&") + "esTL=" + form.esTL.value;
		url += unescape("&") + "nodeId=" + nodeId;
		// url += unescape("&") + "esTL=" + form.esTL.value;
		if (_NextRow != "") {
			url = url + unescape("&") + "_NextRow=" + _NextRow;
		}
		
		ajax.open("GET", url, true);
		//ajax.send();
		ajax.onreadystatechange = function() {
			//if (ajax.readyState == 1) {
			if (ajax.readyState != 4) {
				document.getElementById("resultadosEmpresaTL").innerHTML = eval("wwmrCargando" + sufijoIdioma);
			}
			if (/*ajax.status == 200 && */ajax.readyState == 4) {
				document.getElementById("resultadosEmpresaTL").innerHTML = ajax.responseText;
			}
			//Para que al buscar (la primera vez al pulsar el boton, no en la paginacion) se posicione al principio de los resultados de busqueda
			if (_NextRow == "") {
				location.href = document.getElementById("busquedaEmpresaTextoLibre").action + "#resultadosEmpresaTL";
			}
		}
		ajax.send(/*null*/);
	}
}



//Valida el formulario, formatea los campos y "envia" el formulario
function validarCamposBusquedaProductoTL(form, esAND, nodeId) {
	//Carga los resultados de busqueda
	
	cargarBusquedaProductoTL("", esAND, nodeId);
}



//Carga los resultados de busqueda
function cargarBusquedaProductoTL(_NextRow, esAND, nodeId) {
	if (window.XMLHttpRequest) {
		//var ajax=nuevoAjax();
		var ajax = new XMLHttpRequest();
		
		var form = document.getElementById("busquedaProductoTextoLibre");
		
		//encodeURI(form.xxx.value) para que al ejecutar el servicio Java los caracteres raros no se interpreten como '?'
		var url = HttpCgiPath + "?IdcService=IM_RESULTADOS_PROA_BUSQUEDA_PRODUCTO_TL_TEMPLATE" + unescape("&") + "textoLibre=" + encodeURI(form.textoLibre.value) + unescape("&") + "sufijoIdioma=" + sufijoIdioma + unescape("&") + "siteId=" + siteId;
		url += unescape("&") + "URLImagenes=" + URLImagenes + unescape("&") + "URLSistema=" + URLSistema + unescape("&") + "esAND=" + esAND;
		url += unescape("&") + "esTL=" + form.esTL.value;
		url += unescape("&") + "nodeId=" + nodeId;
		// url += unescape("&") + "esTL=" + form.esTL.value;
		if (_NextRow != "") {
			url = url + unescape("&") + "_NextRow=" + _NextRow;
		}
		
		ajax.open("GET", url, true);
		//ajax.send();
		ajax.onreadystatechange = function() {
			//if (ajax.readyState == 1) {
			if (ajax.readyState != 4) {
				document.getElementById("resultadosBasatecTL").innerHTML = eval("wwmrCargando" + sufijoIdioma);
			}
			if (/*ajax.status == 200 && */ajax.readyState == 4) {
				document.getElementById("resultadosBasatecTL").innerHTML = ajax.responseText;
			}
			//Para que al buscar (la primera vez al pulsar el boton, no en la paginacion) se posicione al principio de los resultados de busqueda
			if (_NextRow == "") {
				location.href = document.getElementById("busquedaProductoTextoLibre").action + "#resultadosBasatecTL";
			}
		}
		ajax.send(/*null*/);
	}
}


//Carga los resultados de busqueda ES EL VIEJO .EL NUEVO SE HACE CON buscarJson . ESTE NO SE UTILIZA HAY QUE ELIMINARLO AL LIMPIAR EL CODIGO
function cargarBusqueda(_NextRow, esAND) {
	if (window.XMLHttpRequest) {
		//var ajax=nuevoAjax();
		var ajax = new XMLHttpRequest();
		
		var form = document.getElementById("busquedaProaPorCategoria");
		
		//encodeURI(form.xxx.value) para que al ejecutar el servicio Java los caracteres raros no se interpreten como '?'
		var url = HttpCgiPath + "?IdcService=IM_RESULTADOS_PROA_BUSQUEDA_TEMPLATE" + unescape("&") + "listaCategorias=" + encodeURI(form.listaCategorias.value) + unescape("&") + "sufijoIdioma=" + sufijoIdioma;
		url += unescape("&") + "URLImagenes=" + URLImagenes + unescape("&") + "URLSistema=" + URLSistema + unescape("&") + "esAND=" + esAND;
		// url += unescape("&") + "esTL=" + form.esTL.value;
		if (_NextRow != "") {
			url = url + unescape("&") + "_NextRow=" + _NextRow;
		}
		
		ajax.open("GET", url, true);
		//ajax.send();
		ajax.onreadystatechange = function() {
			//if (ajax.readyState == 1) {
			if (ajax.readyState != 4) {
				document.getElementById("resultadosBasatecPorCategoria").innerHTML = eval("wwmrCargando" + sufijoIdioma);
			}
			if (/*ajax.status == 200 && */ajax.readyState == 4) {
				document.getElementById("resultadosBasatecPorCategoria").innerHTML = ajax.responseText;
			}
			//Para que al buscar (la primera vez al pulsar el boton, no en la paginacion) se posicione al principio de los resultados de busqueda
			if (_NextRow == "") {
				location.href = document.getElementById("busquedaProaPorCategoria").action + "#resultadosBasatecPorCategoria";
			}
		}
		ajax.send(/*null*/);
	}
}

//Carga los resultados de busqueda ES EL VIEJO .EL NUEVO SE HACE CON buscarJson . ESTE NO SE UTILIZA HAY QUE ELIMINARLO AL LIMPIAR EL CODIGO
function cargarBusquedaPorISO(_NextRow, esAND) {
	if (window.XMLHttpRequest) {
		//var ajax=nuevoAjax();
		var ajax = new XMLHttpRequest();
		
		var form = document.getElementById("busquedaProaPorISO");
		
		//encodeURI(form.xxx.value) para que al ejecutar el servicio Java los caracteres raros no se interpreten como '?'
		var url = HttpCgiPath + "?IdcService=IM_RESULTADOS_PROA_BUSQUEDA_ISO_TEMPLATE" + unescape("&") + "listaISO=" + encodeURI(form.listaISO.value) + unescape("&") + "sufijoIdioma=" + sufijoIdioma;
		url += unescape("&") + "URLImagenes=" + URLImagenes + unescape("&") + "URLSistema=" + URLSistema + unescape("&") + "esAND=" + esAND;
		// url += unescape("&") + "esTL=" + form.esTL.value;
		if (_NextRow != "") {
			url = url + unescape("&") + "_NextRow=" + _NextRow;
		}
		
		ajax.open("GET", url, true);
		//ajax.send();
		ajax.onreadystatechange = function() {
			//if (ajax.readyState == 1) {
			if (ajax.readyState != 4) {
				document.getElementById("resultadosBasatecPorISO").innerHTML = eval("wwmrCargando" + sufijoIdioma);
			}
			if (/*ajax.status == 200 && */ajax.readyState == 4) {
				document.getElementById("resultadosBasatecPorISO").innerHTML = ajax.responseText;
			}
			//Para que al buscar (la primera vez al pulsar el boton, no en la paginacion) se posicione al principio de los resultados de busqueda
			if (_NextRow == "") {
				location.href = document.getElementById("busquedaProaPorISO").action + "#resultadosBasatecPorISO";
			}
		}
		ajax.send(/*null*/);
	}
}

//Valida el formulario (opcion "si" o "no") y envia el formulario
function validarBorrarProducto(form, boton) {
	var respuesta = confirm("¿Desea borrar el producto?");
	if (respuesta) {
		boton.disabled = true;
		form.submit();
	}
}

//Valida el formulario (opcion "si" o "no") y envia el formulario
function validarBorrarEmpresa(form, boton) {
	var respuesta = confirm("¿Desea borrar la empresa?");
	if (respuesta) {
		boton.disabled = true;
		form.submit();
	}
}

function habDeshabAnnadir(elem) {

	var elemAux = elem.name;
	elemAux = elemAux.substring(0, elemAux.lastIndexOf("_"));
	var elemVacios = 0;
	console.log(elemAux);
	$('[id^="' + elemAux + '"]').each(function (idx) {
	console.log(this.value);
		if (elemAux == "_dir" || elemAux == "_enlace" ) {
			if (this.value.replace(/^\s*|\s*$/g, "") == "") {
				elemVacios = elemVacios + 1;
			}
		} else {
			if (this.options[this.selectedIndex].value == "0") {
				elemVacios = elemVacios + 1;
			}
		}
		
		if (elemVacios == 0) {
		
			$('[name="' + elemAux + '_botonAnnadir"]').removeProp('disabled');
		} else {
				
			$('[name="' + elemAux + '_botonAnnadir"]').prop('disabled', 'disabled');
		}
	});
	
	elemVacios = 0;
}

function habDeshabBorrar(elem) {
	var elemAux = elem.name;
	elemAux = elemAux.substring(0, elemAux.lastIndexOf("_"));
	var cuantos = $('[id^="' + elemAux + '"]').length;
	
	if (cuantos > 1) {
		$('[name="' + elemAux + '_botonBorrar"]').removeProp('disabled');
	} else {
		$('[name="' + elemAux + '_botonBorrar"]').prop('disabled', 'disabled');
	}
}

//Carga de los selects dependientes al Insertar y Actualizar
function annadirBoton(elem) {
	var elemAux = elem.name;
	elemAux = elemAux.substring(0, elemAux.lastIndexOf("_"));
	var cuantos = $('[id^="' + elemAux + '"]').length;
	var nuevo = cuantos + 1;

	if (window.XMLHttpRequest) {
		//var ajax=nuevoAjax();
		var ajax = new XMLHttpRequest();
		var url = HttpCgiPath + "?IdcService=IM_ANNADIR" + elemAux.toUpperCase() + "_TEMPLATE" + unescape("&") + "nuevo=" + nuevo + unescape("&") + "sufijoIdioma=" + sufijoIdioma;
		ajax.open("GET", url, true);
		//ajax.send();
		var nuevoFieldset = document.createElement("fieldset");
		var elemAuxFieldset = elemAux.replace("_", "");
		nuevoFieldset.id = elemAuxFieldset + nuevo;
		console.log(elemAuxFieldset);
		$('#' + elemAuxFieldset + cuantos).after(nuevoFieldset)
		ajax.onreadystatechange = function() {
			//if (ajax.readyState == 1) {
			if (ajax.readyState != 4) {
				var nuevoLegend = document.createElement("legend");
				//Solo sale en IE
				nuevoLegend.innerHTML = eval("wwmrCargando" + sufijoIdioma);
				nuevoFieldset.appendChild(nuevoLegend);
			}
			if (/*ajax.status == 200 && */ajax.readyState == 4) {
			
				nuevoFieldset.innerHTML = ajax.responseText;
				jQuery('#_contacto_'+nuevo).selectpicker('refresh');
				jQuery("#response-div_"+ nuevo).find("script").each(function(i) {
      eval(jQuery(this).text());
        });
				habDeshabAnnadir(elem);
				habDeshabBorrar(elem);
				
			}
		}
		ajax.send(/*null*/);
	}
}

function borrarBoton(elem) {
	var elemAux = elem.name;
	elemAux = elemAux.substring(0, elemAux.lastIndexOf("_"));
	var elemAuxFieldset = elemAux.replace("_", "");
	var cual = $('[id^="' + elemAux + '"]').length;
	
	$('#' + elemAuxFieldset + cual).remove();
	habDeshabAnnadir(elem);
	habDeshabBorrar(elem);
}
function borrarBotonEste(elem) {
	var elemAux = elem.name;
	elemAux = elemAux.substring(0, elemAux.lastIndexOf("_"));
	var elemAuxFieldset = elemAux.replace("_", "");
	var cual = $('[id^="' + elemAux + '"]').length;
	console.log(elemAux);
	$('#' + elemAux).remove();
}


//Carga la jerarquia representada en la tabla "jer" mostrando o no los hijos en funcion de si los padres de estos estan o no seleccionados
function cargarJerarquia(form, obligatorio, jer) {
	//Se almacenan en una lista las opciones de "jer" seleccionadas
	form.listaJerarquia.value = formatearCampo(form.jer.options);
	var opcionesCatSeleccionadas = form.listaJerarquia.value;
	opcionesJerSeleccionadas = "-" + opcionesJerSeleccionadas + "-";
	
	if (window.XMLHttpRequest) {
		//var ajax=nuevoAjax();
		var ajax = new XMLHttpRequest();
		//obligatorio vale 1 (insertar, actualizar) o 0 (busqueda) en funcion de si se debe poner en el literal del campo como obligatorio
		ajax.open("GET", HttpCgiPath + "?IdcService=IM_CARGAR_JERARQUIA_TEMPLATE" + unescape("&") + "opcionesJerSeleccionadas=" + opcionesJerSeleccionadas + unescape("&") + "sufijoIdioma=" + sufijoIdioma + unescape("&") + "obligatorio=" + obligatorio, true);
		//ajax.send();
		ajax.onreadystatechange = function() {
			var selectDestino = document.getElementById("jer");
			//if (ajax.readyState == 1) {
			if (ajax.readyState != 4) {
				selectDestino.length = 0;
				var nuevaOpcion = document.createElement("option");
				nuevaOpcion.value = 0;
				nuevaOpcion.innerHTML = eval("wwmrCargando" + sufijoIdioma);
				selectDestino.appendChild(nuevaOpcion);
				//? Si se deja el disabled, al refrescar la pagina, se carga el combo inicial con las opciones deshabilitadas
				//selectDestino.disabled = true;
			}
			if (/*ajax.status == 200 && */ajax.readyState == 4) {
				selectDestino.parentNode.innerHTML = ajax.responseText;
			}
		}
		ajax.send(/*null*/);
	}
}


//Valida el formulario, formatea las listas correspondientes y envia el formulario
function validarCamposInsertarActualizarProducto(form, boton,estado) {

	var listaCat="";
	if (jQuery("#categorias1 :selected").length != 0 ){listaCat = form.listaCategorias1.value;}
	if (jQuery("#categorias2 :selected").length != 0 ){listaCat +="-"+form.listaCategorias2.value;}
	if (jQuery("#categorias3 :selected").length != 0 ){listaCat +="-"+form.listaCategorias3.value;}
	
	form.listaCategorias.value=listaCat.replace(/\--/g, '-').slice(0,-1);

	
	//Se formatean las opciones seleccionadas de los campos (selects multiples)
	var listaIsos="";
	//if (jQuery("#ison1 :selected").length != 0 ){listaIsos = form.ison1.value;}
	//se descomenta  ison2 para poder insertar isos a 2º nivel que ahora si lo quieren OSCAR
	if (jQuery("#ison2 :selected").length != 0 ){listaIsos +=form.listaIso2.value;}
	if (jQuery("#ison3 :selected").length != 0 ){listaIsos +=form.listaIso3.value+"-";}
	

	if ( jQuery("#nombre").val() != "" ){

		form.listaIso.value=listaIsos.replace(/\--/g, '-').slice(0,-1);
		form.listaISO.value= listaIsos.replace(/\--/g, '-').slice(0,-1);
		
		//INDICAMOS QUE ES UPDATE Y ENVIAMOS 
		form.enviado.value=1;
		form.estado.value=estado;
		jQuery("#cuantosFicheros").val();
		jQuery("#imagenesBorrar").val();
		cargaCuantosFicheros();
		cargaCualesFotosBorrar();
		cargaEmpresasInput();
		
		boton.disabled = true;
		form.submit();
	}else{
		alert("Rellene al menos el nombre antes de guardar el producto");
	}


}

//Valida el formulario, formatea las listas correspondientes y envia el formulario
function validarCamposInsertarActualizarEmpresa(form, boton) {
	form.enviado.value=1;
	boton.disabled = true;
	cargaCualesDireccionesBorrar();
	/*if (!validarCamposCorreo(jQuery("#correo").val())) {
				return false;
	}*/
	form.submit();
}
function cargaCuantosFicheros(){
	var elemLLenos = 0;
	var elemAux = '_otrasImagenes1';
	jQuery('[id^="' + elemAux + '"]').each(function (idx) {
	
		//var fileName = $(this).val();
			//if (fileName) {
				elemLLenos = elemLLenos + 1;
			//} 
	jQuery("#cuantosFicheros").val(elemLLenos);
	
	
	});	
	if (jQuery("#imagenPortada").val()){
	jQuery("#cuantosFicherosPortada").val('1');}
}
function cargaCualesFotosBorrar(){

	var elemBorrar = "";
	var elemAux = 'EliminarFotos_';
	jQuery('[id^="' + elemAux + '"]').each(function (idx) {
		if (jQuery(this).is(':checked')) {
			var numero = $(this).attr('id').split("_");
			if (numero) {
				elemBorrar+=+numero['1']+",";
				
			} 
		}
	});	
	if ( elemBorrar != "" ) {
		jQuery("#imagenesBorrar").val(elemBorrar.substring(0,elemBorrar.length-1));

	}	
}

function cargaCualesDireccionesBorrar(){
	var elemBorrar = "";
	var elemAux = 'EliminarDireccion_';
	jQuery('[id^="' + elemAux + '"]').each(function (idx) {
		if (jQuery(this).is(':checked')) {
			var numero = $(this).attr('id').split("_");
			if (numero) {
				elemBorrar+=+numero['1']+",";
			} 
		}
	});	
	if ( elemBorrar != "" ) {
		jQuery("#direccionesBorrar").val(elemBorrar.substring(0,elemBorrar.length-1));

	}	
}
// recorre el las empresas del formulario de insertar y crea un campo oculto con las empresas que tengan algun input seleccionado.
function cargaEmpresasInput(){
	var filtro = jQuery('.dictionary .checkbox');
	var empresas_envio=""; 
		filtro.each(function(i) {
			var id_empresa=jQuery(this).attr('id');
			if (jQuery('#_dist_'+id_empresa).is(':checked')) {var dist=1; }else{var dist=0;}
			if (jQuery('#_fab_'+id_empresa).is(':checked')) {var fab=1; }else{var fab=0;}
			if (jQuery('#_dise_'+id_empresa).is(':checked')) {var dise=1; }else{var dise=0;}
			if (jQuery('#_ventTienda_'+id_empresa).is(':checked')) {var ventTienda=1;}else{var ventTienda=0;}
			if (jQuery('#_ventInternet_'+id_empresa).is(':checked')) {var ventInternet=1; }else{var ventInternet=0;}
			if ( dist == 1 || fab == 1 || dise == 1 || ventTienda == 1 || ventInternet == 1 ){
				empresas_envio+=id_empresa+'-'+dist+fab+dise+ventTienda+ventInternet+',';
			}
		})
	empresas_envio=empresas_envio.substring(0,empresas_envio.length - 1);
	var el = '<input type="hidden" name="listadoEmpresas" value="'+empresas_envio+'"></input>';
	jQuery('#insertarProducto').append(el);
}



//valida al vuelo el minimo de caracteres 
	jQuery('#todos,#productos,#empresas,#productosiso,#productoscat').on('keyup', function(){
		
  var value = jQuery(this).val().length;
   	 if (value >= 3)
		{
			jQuery("#menBuscar").addClass('hidden');
			jQuery("#buscar").removeAttr('disabled');
			jQuery("#buscarcat").removeAttr('disabled');
			jQuery("#buscariso").removeAttr('disabled');
		
		}else if (value == 0){
			jQuery("#menBuscar").addClass('hidden');
			jQuery("#buscar").attr('disabled', true);
			$("#buscarcat").attr('disabled', true);
			$("#buscariso").attr('disabled', true);
		}else{
			jQuery("#menBuscar").removeClass('hidden');
			jQuery("#buscar").attr('disabled', true);
			$("#buscarcat").attr('disabled', true);
			$("#buscariso").attr('disabled', true);
		}
		}).keyup();


		jQuery('#todos,#productos,#empresas,#productosiso,#productoscat').on('change', function(){
    var value = jQuery(this).val().length;
   	 if (value >= 3)
		{
		jQuery("#menBuscar").addClass('hidden');
		jQuery("#buscar").removeAttr('disabled');
		jQuery("#buscarcat").removeAttr('disabled');
		jQuery("#buscariso").removeAttr('disabled');
		}else if (value == 0){
			jQuery("#menBuscar").addClass('hidden');
			jQuery("#buscar").attr('disabled', true);
			jQuery("#buscarcat").attr('disabled', true);
			jQuery("#buscariso").attr('disabled', true);
			
		}else{
		jQuery("#menBuscar").removeClass('hidden');
		jQuery("#buscar").attr('disabled', true);
		jQuery("#buscarcat").attr('disabled', true);
		jQuery("#buscariso").attr('disabled', true);
		}
		});
		
			







// javascript para formularios carga la paginacion jplist y easyautocomplet productos y empresas , en pagina de inicio.

		var options = {
			url: function(phrase) {
			return HttpCgiPath + "?IdcService=IM_GET_JSON_PROA_BUSQUEDA_PHRASE_TEMPLATE&tipobusqueda=todos";
			},

			getValue: "nombre"
			,

			ajaxSettings: {
				dataType: "json",
				method: "GET",
				data: {
					dataType: "json"
				}
			},

			preparePostData: function(data) {

				data.phrase = jQuery("#todos").val();

				return data;
			},
			minCharNumber:3,
			requestDelay: 400,
			template: {
				type: "custom",
				method: function(value, item) {
				if(item.tipo == "EMPRESA") { var color = "label-info";}else{ var color="label-success";}
					
					return '<span >'+value +'</span><span class="pull-right label '+color+'">'+item.tipo+'</span>' ;
				}
				},
		list: {
				match: {
					enabled: true
				},
				maxNumberOfElements: 10
			},
			adjustWidth:false,
		};
		
		
		
		jQuery('document').ready(function(){	
			//irArriba();
			jQuery('#demo_todos').jplist({				
				itemsBox: '.list' 
				,itemPath: '.list-item' 
				,panelPath: '.jplist-panel'	
			});
			
			jQuery(".filtrado").click(function(){ 
				jQuery(".filtrado ").removeClass("active");
				jQuery(this).addClass("active");
			});
		
			
			jQuery("#todos").easyAutocomplete(options);
			
			
			jQuery(".botonBuscarTodos").click(function(){
				buscarJson ('IM_GET_HTML_BUSQUEDA_TEMPLATE','todos');
			});
		
			jQuery('#todos').keydown(function (event) {
			
				var keypressed = event.keyCode || event.which;
				
				if (keypressed == 13) {
				
				$('.easy-autocomplete-container ul').css('display','none');
				event.preventDefault();
				var value = jQuery('#todos').val().length;
				   if (value >= 3)
						{
						buscarJson ('IM_GET_HTML_BUSQUEDA_TEMPLATE','todos');
						jQuery("#menBuscar").addClass('hidden');
						jQuery("#buscar").removeAttr('disabled');
						}else if (value == 0){
							jQuery("#menBuscar").removeClass('hidden');
							jQuery("#buscar").attr('disabled', true);
							
						}else{
						jQuery("#menBuscar").removeClass('hidden');
						jQuery("#buscar").attr('disabled', true);
						jQuery("#buscarcat").attr('disabled', true);
						jQuery("#buscariso").attr('disabled', true);
						}
				  return false;

				}
			});


	
	});
		
	// FIN javascript para formularios carga la paginacion jplist y easyautocomplet	
	
	// javascript para formularios carga la paginacion jplist y easyautocomplet glosario productos iso 


		var optionsGlosarioIso = {
			url: function(phrase) {
			return HttpCgiPath + "?IdcService=IM_GET_JSON_PRO_GLOSARIO_BUSQUEDA_PHRASE_TEMPLATE&tipobusqueda=glosario";
			},

			getValue: "nombre"
			,

			ajaxSettings: {
				dataType: "json",
				method: "GET",
				data: {
					dataType: "json"
				}
			},

			preparePostData: function(data) {

				data.phrase = jQuery("#productosGlosario").val();

				return data;
			},
			minCharNumber:3,
		list: {
				match: {
					enabled: true
				},
				maxNumberOfElements: 10
			},
			adjustWidth:false,
		};
		$(document).ready(function(){
		$("#productosGlosario").easyAutocomplete(optionsGlosarioIso);
	});
	// javascript para formularios carga la paginacion jplist y easyautocomplet empresas


		var optionsEmpresa = {
			url: function(phrase) {
			return HttpCgiPath + "?IdcService=IM_GET_JSON_PROA_BUSQUEDA_PHRASE_TEMPLATE&tipobusqueda=EMPRESA";
			},

			getValue: "nombre"
			,

			ajaxSettings: {
				dataType: "json",
				method: "GET",
				data: {
					dataType: "json"
				}
			},

			preparePostData: function(data) {

				data.phrase = jQuery("#empresas").val();

				return data;
			},
			minCharNumber:3,
		list: {
				match: {
					enabled: true
				},
				maxNumberOfElements: 10
			},
			adjustWidth:false,
		};
		
		$(document).ready(function(){		
			jQuery('#demo_empresas').jplist({				
				itemsBox: '.list' 
				,itemPath: '.list-item' 
				,panelPath: '.jplist-panel'	
			});
			jQuery("#empresas").easyAutocomplete(optionsEmpresa);
		});	
			jQuery(".filtrado").click(function(){ 
				jQuery(".filtrado ").removeClass("active");
				jQuery(this).addClass("active");
			});
		
			
			
			
			
			jQuery(".botonBuscarEmpresa").click(function(){
				buscarJson ('IM_GET_HTML_BUSQUEDA_TEMPLATE_EMPRESA','empresas');
			});
		
			jQuery('#empresas').keydown(function (event) {
			
				var keypressed = event.keyCode || event.which;
				if (keypressed == 13) {
				$('.easy-autocomplete-container ul').css('display','none');
				event.preventDefault();
				var value = jQuery('#empresas').val().length;
				   if (value >= 3)
						{
						buscarJson ('IM_GET_HTML_BUSQUEDA_TEMPLATE_EMPRESA','empresas');
						jQuery("#menBuscar").addClass('hidden');
						jQuery("#buscar").removeAttr('disabled');
						}else if (value == 0){
							jQuery("#menBuscar").removeClass('hidden');
							jQuery("#buscar").attr('disabled', true);
							
						}else{
						jQuery("#menBuscar").removeClass('hidden');
						jQuery("#buscar").attr('disabled', true);
						jQuery("#buscarcat").attr('disabled', true);
						jQuery("#buscariso").attr('disabled', true);
						}
				  return false;

				}				
			});
	
		
	// FIN javascript para formularios carga la paginacion jplist y easyautocomplet	empresas
	
	
		// javascript para formularios carga la paginacion jplist y easyautocomplet productos


		var optionsProducto = {
			url: function(phrase) {
			return HttpCgiPath + "?IdcService=IM_GET_JSON_PROA_BUSQUEDA_PHRASE_TEMPLATE&tipobusqueda=PRODUCTO";
			},

			getValue: "nombre"
			,

			ajaxSettings: {
				dataType: "json",
				method: "GET",
				data: {
					dataType: "json"
				}
			},

			preparePostData: function(data) {

				data.phrase = jQuery("#productos").val();

				return data;
			},
			minCharNumber:3,
		list: {
				match: {
					enabled: true
				},
				maxNumberOfElements: 10
			},
			adjustWidth:false,
		};
		$(document).ready(function(){
			$("#productos").easyAutocomplete(optionsProducto);
			jQuery('#demo_productos').jplist({				
				itemsBox: '.list' 
				,itemPath: '.list-item' 
				,panelPath: '.jplist-panel'	
			});
		});
	
				
			

			
			
			
			jQuery(".botonBuscarProducto").click(function(){
				buscarJson ('IM_GET_HTML_BUSQUEDA_TEMPLATE_PRODUCTO','productos');
			 
			});
		
			jQuery('#productos').keydown(function (event) {
				var keypressed = event.keyCode || event.which;
				
				if (keypressed == 13) {
				event.preventDefault();
				$('.easy-autocomplete-container ul').css('display','none');
				var value = jQuery('#productos').val().length;
				   if (value >= 3)
						{
						buscarJson ('IM_GET_HTML_BUSQUEDA_TEMPLATE_PRODUCTO','productos');
						jQuery("#menBuscar").addClass('hidden');
						jQuery("#buscar").removeAttr('disabled');
						}else if (value == 0){
							jQuery("#menBuscar").removeClass('hidden');
							jQuery("#buscar").attr('disabled', true);
							
						}else{
						jQuery("#menBuscar").removeClass('hidden');
						jQuery("#buscar").attr('disabled', true);
						jQuery("#buscarcat").attr('disabled', true);
						jQuery("#buscariso").attr('disabled', true);
						}
				  return false;

				}
			
			});
	
		
	// FIN javascript para formularios carga la paginacion jplist y easyautocomplet	producto
	
	// javascript para formularios carga la paginacion jplist y easyautocomplet productos_iso


		var optionsProducto_iso = {
			url: function(phrase) {
			return HttpCgiPath + "?IdcService=IM_GET_JSON_PROA_ISO_BUSQUEDA_PHRASE_TEMPLATE&tipobusqueda=PRODUCTO_ISO";
			},

			getValue: "nombre"
			,

			ajaxSettings: {
				dataType: "json",
				method: "GET",
				data: {
					dataType: "json"
				}
			},

			preparePostData: function(data) {

				data.phrase = jQuery("#productosiso").val();

				return data;
			},
			minCharNumber:3,
		list: {
				match: {
					enabled: true
				},
				maxNumberOfElements: 10
			},
			adjustWidth:false,
		};
		$(document).ready(function(){
			jQuery("#productosiso").easyAutocomplete(optionsProducto_iso);
			jQuery('#demo_productosiso').jplist({				
				itemsBox: '.list' 
				,itemPath: '.list-item' 
				,panelPath: '.jplist-panel'	
			});
		});
		
				
	

			jQuery(".filtrado").click(function(){ 
				jQuery(".filtrado ").removeClass("active");
				jQuery(this).addClass("active");
			});
			
			
			jQuery(".botonBuscarProductoiso").click(function(){
				buscarJson ('IM_RESULTADOS_PROA_BUSQUEDA_ISO_TEMPLATE','productosiso');
			 
			});
		
			jQuery('#productosiso').keydown(function (event) {
				var keypressed = event.keyCode || event.which;
				if (keypressed == 13) {
				event.preventDefault();
				$('.easy-autocomplete-container ul').css('display','none');
				var value = jQuery('#productosiso').val().length;
				   if (value >= 3)
						{
						buscarJson ('IM_RESULTADOS_PROA_BUSQUEDA_ISO_TEMPLATE','productosiso');
						jQuery("#menBuscar").addClass('hidden');
						jQuery("#buscar").removeAttr('disabled');
						}else if (value == 0){
							jQuery("#menBuscar").removeClass('hidden');
							jQuery("#buscar").attr('disabled', true);
							
						}else{
						jQuery("#menBuscar").removeClass('hidden');
						jQuery("#buscar").attr('disabled', true);
						jQuery("#buscarcat").attr('disabled', true);
						jQuery("#buscariso").attr('disabled', true);
						}
				  return false;

				}
				
			});
	
		
	// FIN javascript para formularios carga la paginacion jplist y easyautocomplet	producto_iso	

	// javascript para formularios carga la paginacion jplist y easyautocomplet productos_cat


		var optionsProducto_cat = {
			url: function(phrase) {
			return HttpCgiPath + "?IdcService=IM_GET_JSON_PROA_CAT_BUSQUEDA_PHRASE_TEMPLATE&tipobusqueda=PRODUCTO_CAT";
			},

			getValue: "nombre"
			,

			ajaxSettings: {
				dataType: "json",
				method: "GET",
				data: {
					dataType: "json"
				}
			},

			preparePostData: function(data) {

				data.phrase = jQuery("#productoscat").val();

				return data;
			},
			minCharNumber:3,
		list: {
				match: {
					enabled: true
				},
				maxNumberOfElements: 10
			},
			adjustWidth:false,
		};
		$(document).ready(function(){
			jQuery("#productoscat").easyAutocomplete(optionsProducto_cat);
			jQuery('#demo_productoscat').jplist({				
				itemsBox: '.list' 
				,itemPath: '.list-item' 
				,panelPath: '.jplist-panel'	
			});
		});
		//jQuery("#productoscat").easyAutocomplete(optionsProducto_cat);
				


			jQuery(".filtrado").click(function(){ 
				jQuery(".filtrado ").removeClass("active");
				jQuery(this).addClass("active");
			});
			
			
			jQuery(".botonBuscarProductocat").click(function(){
				buscarJson ('IM_RESULTADOS_PROA_BUSQUEDA_TEMPLATE','productoscat');
			 
			});
		
			jQuery('#productoscat').keydown(function (event) {
				var keypressed = event.keyCode || event.which;
				if (keypressed == 13) {
				event.preventDefault();
				var value = jQuery('#productos').val().length;
				   if (value >= 3)
						{
						buscarJson ('IM_RESULTADOS_PROA_BUSQUEDA_TEMPLATE','productoscat');
						jQuery("#menBuscar").addClass('hidden');
						jQuery("#buscar").removeAttr('disabled');
						}else if (value == 0){
							jQuery("#menBuscar").removeClass('hidden');
							jQuery("#buscar").attr('disabled', true);
							
						}else{
						jQuery("#menBuscar").removeClass('hidden');
						jQuery("#buscar").attr('disabled', true);
						jQuery("#buscarcat").attr('disabled', true);
						jQuery("#buscariso").attr('disabled', true);
						}
				  return false;

				}

			});
	
		
	// FIN javascript para formularios carga la paginacion jplist y easyautocomplet	producto_iso	

	$(document).ready(function(){
		jQuery('#demo_listaCategorias').jplist({				
			itemsBox: '.list' 
			,itemPath: '.list-item' 
			,panelPath: '.jplist-panel'	
		});
		jQuery('#demo_listaISO').jplist({				
			itemsBox: '.list' 
			,itemPath: '.list-item' 
			,panelPath: '.jplist-panel'	
		});
		
		jQuery('#demo_productos_empresas').jplist({				
			itemsBox: '.list' 
			,itemPath: '.list-item' 
			,panelPath: '.jplist-panel'	
		});
	});
			
		/*	jQuery('.botonGrid').click(function() {
			//console.log('grid');
				jQuery('.list-item').addClass('col-md-4 col-sm-12');
			
			});
			jQuery('.botonList').click(function() {
			//console.log('list');
				jQuery('.list-item').removeClass('col-md-4 col-sm-12');
			
			});
			*/
			
			

//escapa caracteres en las cadenas devueltas json 
String.prototype.escapeSpecialChars = function() { 
  return this.replace(/\n/g, "\\n") 
	  .replace("B\\&J", "B&J")
	  .replace("\r\n", "\\n") 
	  .replace(/\r/g, "\\r")
	  .replace(/\t/g, "\\t")
	  .replace(/\f/g, "\\f")
	  .replace(/\u001c/g, "")
		 .replace(/\u001d/g, ""); 
}; 
    
String.prototype.escapeSpecialCharsDescripcion = function() { 
  return this.replace(/"/g, '\\"'); 
}; 
// funcion que carga el json para los 5 templates , busqueda general,busqued por empresas, busqueda por productos, busqueda por categorias de producto, busqueda por iso
		function buscarJson (template,tipo) {
		
				//iniciamos la busqueda vaciando divs y jplist
				if (jQuery(".center").not("hidden") || jQuery(".center_sindatos").not("hidden")) {
					jQuery(".center_sindatos ").addClass("hidden");
					jQuery(".center ").addClass("hidden");
					jQuery('#demo_'+tipo).jplist({
						command: 'empty'
					});	
				}	 
			 var url_categorias=jQuery("#url_categorias").val();
// peticion de ajax	
			var busqueda= jQuery("#"+tipo).val();
			var bustexto=0;			
		if (tipo == "productosiso"){
		
			if(busqueda.indexOf('-') !== -1 )
			{
			//SI
			busqueda=busqueda.split('-')[0];
			}else{
			//NO
			var bustexto=1;
			// console.log(222);
			}
		}	
			 var request = jQuery.ajax({
								url: HttpCgiPath + "?IdcService="+template,
								type: 'GET',
								dataType: "json",
								data: { buscar: busqueda, tipobusqueda : tipo, URLSistema : URLSistema, URLImagenes : URLImagenes,sufijoIdioma : sufijoIdioma, tex:bustexto} ,
								beforeSend: function() {
									 jQuery('.cargando').removeClass("hidden");
								 },
								 complete: function(){
									 jQuery('.cargando').addClass("hidden");
								 },
								error: function(xhr, textStatus, error){
									 // console.log(xhr.statusText);
									 // console.log(textStatus);
									 // console.log(error);
								 },
								success: function (data) {
//p: si hay resultados , emp: si hay alguna empresa, pro: si hay algun producto								
									var p=1;
									var emp=0;
									var pro=0;
									var act=0;
									var inact=0;
									var borra=0;
									var compara="1";
									var listaIdCat="";
									var listaIdCatArr=[];
									var id_li="";
									var id_li2="";
									//si hay datos 
								
									var lista_navegacion_productos="";
									var lista_navegacion_productos_activos="";
									var lista_navegacion_productos_inactivos="";
									var lista_navegacion_productos_borrador="";
									var lista_navegacion_empresas="";
									var count = Object.keys(data).length;
									var estado="";
									if (data != 0 ){
											var datos='';
											var categorias_lista="";
											
											jQuery(".filtro_categorias li").css("display","none");
										jQuery.each(data, function(index, item) {
											listaIdCat="";
											if (!item.hasOwnProperty('foto') || item.foto == ""){
											item.foto="sin_imagen.jpg";
											
											}
											 
											if ( tipo == "productoscat" ||tipo == "productosiso" || tipo == "productos" || tipo == "categorias" || tipo == "listaCategorias"|| tipo == "listaIso" || tipo == "listaISO" || tipo == "productos_empresas"){
											
												emp=1;
												pro=1;
												categorias_lista="";
												//jQuery(".filtro_categorias li").css("display","none");
												lista_navegacion_productos=lista_navegacion_productos+item.id_prod+",";
													if (typeof item.categorias_arbol !== 'undefined') {
													console.log("aaaaaaaaaaaaaa"+item.categorias_arbol);
														var myarraycat = item.categorias_arbol.toString().split('_');
														for(var i = 0; i < myarraycat.length; i++){
															listaIdCat=listaIdCat+"cat_a"+myarraycat[i]+"a,";
								  
														}
														
														
													}
												if (typeof item.categorias !== 'undefined') {
													if(item.categorias.length > 1){
														categorias_lista+='<ul class="theme">'+ '\r\n';;
													}

												 jQuery.each(item.categorias, function(index, categoria) {
													if(item.categorias.length > 1){
														categorias_lista+='<li>'+ '\r\n';;
													}
													categorias_lista+='<a title="" id="tol_'+categoria.id+'_'+item.id_prod+'" onmouseout="quitaToltip();return true;" onMouseOver="pintaToltipCategoria('+categoria.id+','+item.id_prod+'); return true"    class="toltipcat" target="_blank" href="'+url_categorias+'?tipo=listaCategorias&value='+categoria.id+'" ><span class="label label_filtro '+categoria.nombre+'  '+categoria.id+' label-danger ">'+categoria.nombre+'</span></a>'+ '\r\n';
															listaIdCat=listaIdCat+"cat_a"+categoria.id+"a,";
															if (listaIdCatArr.indexOf(categoria.id) == -1){
																listaIdCatArr.push(categoria.id);
															}
															jQuery("#li_cat_a"+categoria.id+"a").css("display","block");
															jQuery("#li_cat_a"+categoria.id+"a").parents('li').css("display","block");
															id_li=jQuery("#li_cat_"+categoria.id).parents('li').attr("id");
																if(id_li){
																id_li="cat_a"+id_li.split('_')[2];
																jQuery("#"+id_li).addClass('filtroSuperior');
																jQuery("#"+id_li).attr('onClick', 'filtraTodos(this.id);');
																jQuery("#li_cat_a"+categoria.id+"a").addClass("filtroClass_"+id_li);
																id_li2=jQuery("#li_cat_a"+id_li.split('_')[1]).parents('li').attr("id");
																	if(id_li2){
																		id_li2="cat_a"+id_li2.split('_')[2];
																		jQuery("#"+id_li2).addClass('filtroSuperior');
																		jQuery("#"+id_li2).attr('onClick', 'filtraTodos(this.id);');
																		jQuery("#li_cat_a"+categoria.id).addClass("filtroClass_"+id_li2);
																		}
										
														}
									
													if(item.categorias.length > 1){
														categorias_lista+='</li>'+ '\r\n';
													}
												})
													if(item.categorias.length > 1){
														categorias_lista+='</ul>'+ '\r\n';;
													}
												}
												if (typeof item.estado !== 'undefined') {
												 
													 estado=+item.estado;
													if	(item.estado == "ACTIVO"){
														act=1; 
														lista_navegacion_productos_activos=lista_navegacion_productos_activos+item.id_prod+",";
													}
													if	(item.estado == "INACTIVO"){
														inact=1;
														lista_navegacion_productos_inactivos=lista_navegacion_productos_inactivos+item.id_prod+",";
													}
													if	(item.estado == "BORRADOR"){
														borra=1;
														lista_navegacion_productos_borrador=lista_navegacion_productos_borrador+item.id_prod+",";
													}
												
												}else{ estado=""}
												// si es una busqueda iso cargamos la comparativa
												if ( tipo == "listaISO" && jQuery("#listaIso3").val() != "" ){
													var compara="";
													if (count >1){
														compara='<p class="compara"><input class="es_comparado" onclick="comparaCheck('+item.id_prod+')" type="checkbox" name="comparar_'+item.id_prod+'" id="comparar_'+item.id_prod+'"/><label for="comparar_'+item.id_prod+'">Comparar</label></p>' + '\r\n';
													}
												}else{
													var compara="";
												}
												if (typeof item.modelo !== 'undefined' && item.modelo != "" ) {
													item.nombre=item.nombre+" - "+item.modelo;
												}
												 lista_navegacion_productos=lista_navegacion_productos+item.id_prod+",";
														var informe="";
														informe='<p class="informe"><input value="'+item.id_prod+'" class="es_informe"  type="checkbox" name="informe_'+item.id_prod+'" id="informe_'+item.id_prod+'"/><label for="informe_'+item.id_prod+'">Informe</label></p>' + '\r\n';

												datos+='<li class="list-item box" id="'+item.id_prod+'">'+ '\r\n' +
														 '<div class="img left">' + '\r\n' +
															'<img src="'+URLImagenes_bbdd+'/'+item.foto+'" alt="'+item.desc_foto+'" />'+ '\r\n' +
														 '</div>' + '\r\n' +
														 '<div class="block rigth">'+ '\r\n' +
															'<p class="title">' + '\r\n' +
																'<a target="_blank" title="' + eval("wwsagNuevaVentana" + sufijoIdioma) + ' '+item.nombre+'" href="'+jQuery('#url').val()+'?id='+item.id_prod+'" onclick="cargaEnNueva2(this.href,\''+jQuery('#url').val()+'\',\''+item.id_prod+'\',\'PRODUCTO\',\'_blank\',\''+item.estado+'\'); return false;" >'+item.nombre+'<img src="'+URLImagenes+'/ventana_nueva.gif" alt="' + eval("wwsagNuevaVentana" + sufijoIdioma) + '" /></a>' + '\r\n' +
															'</p>' + '\r\n' +
															compara+
															'<p class="desc">'+item.descripcion+'</p>' + '\r\n';
															
															datos+='<p class="keywords hidden">'+listaIdCat+'</p>'+ '\r\n';
															datos+='<p class="keywords_estado ESTADO_'+item.estado+' hidden">ESTADO_'+item.estado+'</p>'+ '\r\n';
															if (typeof item.gratuito === 'undefined' ||  item.gratuito == "" ){item.gratuito="NO";}
															if (typeof item.exposicion === 'undefined' ||  item.exposicion == "" ){item.exposicion="NO";}

															datos+='<p class="keywords_checked hidden">GRATUITO_'+item.gratuito+',EXPO_'+item.exposicion+'</p>'+ '\r\n';
															//datos+='<p class="label label_filtro keywords_departamentotodos hidden DEPTodos">DEPTodos</p>'+ '\r\n';
															datos+='<p class="label label_filtro keywords_departamentotodos '; 
															
															if (typeof item.departamentos !== 'undefined') {
																jQuery.each(item.departamentos, function(index, departamento) {
																datos+=' '+departamento.nombre+' ';
																});
															}
															
															datos+=' DEPTodos ';
															datos+='hidden">'+ '\r\n';
															
															
															if (typeof item.departamentos !== 'undefined') {
																jQuery.each(item.departamentos, function(index, departamento) {
																datos+=departamento.nombre+',';
																});
															}
															datos+='DEPTodos</p>'+ '\r\n';
															
															
															datos+='<p class="theme">';
															if (typeof item.categorias !== 'undefined') {
																if(item.categorias.length == 1){
																
																datos+=categorias_lista+'\r\n';
																}
															}
															datos+='</p>' + '\r\n';
															if (typeof item.categorias !== 'undefined') {
																if(item.categorias.length > 1){
																datos+=categorias_lista+'\r\n';
																}
															}
															//añadimos informes
															console.log("pinta informes"+presentacion);
															if (presentacion == 0 ){datos+=informe;}
															
															datos+='</div>' + '\r\n' +
												'</li>' + '\r\n'; 
											

												}else if (tipo == "empresas" ){
												// busqueda de solo empresas, el servicio devuelve empresas y productos se filtra.
													var p=0;
													pro=1;
													 if (item.tipo == "EMPRESA"){
													 p++;
													 emp++;
													 if (typeof item.modelo !== 'undefined' && item.modelo != "") {
															item.nombre=item.nombre+" - "+item.modelo;
														}
														datos+='<li class="list-item box list-item-empresa" id="'+item.id_prod+'">'+ '\r\n' +
															 '<div class="img left">' + '\r\n' +
															'<img src="'+URLImagenes_bbdd+'/img_empresa.jpg" alt="Imagen genérica de una empresa" />'+ '\r\n' +
														 '</div>' + '\r\n' +
															 '<div class="block right">'+ '\r\n' +
																'<p class="title">' + '\r\n' +
																	'<a target="_blank" class="enviasub" title="' + eval("wwsagNuevaVentana" + sufijoIdioma) + ' '+item.nombre+'" href="'+jQuery('#urlEmpresa').val()+'?id='+item.id_prod+'" onclick="cargaEnNueva2(this.href,\''+jQuery('#urlEmpresa').val()+'\',\''+item.id_prod+'\',\''+item.tipo+'\',\'_blank\',\'empresa\'); return false;">'+item.nombre+'<img src="'+URLImagenes+'/ventana_nueva.gif" alt="' + eval("wwsagNuevaVentana" + sufijoIdioma) + '" /></a>' + '\r\n' +
																'</p>' + '\r\n' +
																'<p class="desc">'+item.contenido+'</p>' + '\r\n' +
																'<p class="theme">' + '\r\n';
															//	datos+='<span class="label label_filtro keywords_departamentotodos ';
																//if (typeof item.departamentos !== 'undefined') {
															//	jQuery.each(item.departamentos, function(index, departamento) {
																//datos+=' '+departamento.nombre+' ';
																//});
																//}	
																
																//datos+=' DEPTodos ';
															//	datos+='hidden">'+ '\r\n';
															
															
														//	if (typeof item.departamentos !== 'undefined') {
															//	jQuery.each(item.departamentos, function(index, departamento) {
																//datos+=departamento.nombre+',';
																//});
															//}
															//datos+=',DEPTodos </span>'+ '\r\n';
																datos+='</p>' + '\r\n' +
															'</div>' + '\r\n' +
													'</li>' + '\r\n'; 
													lista_navegacion_empresas=lista_navegacion_empresas+item.id_prod+",";
													}
												}else if (tipo = "todos"){
												
												
												//busqueda general de productos y empresas juntos (buscador principal)
													var oculta="";
													if (typeof item.desc_foto === 'undefined') {
															item.desc_foto="sin imagen propia del producto";
														}
													var imagen= '<div class="img left">' + '\r\n' +
																'<img src="'+URLImagenes_bbdd+'/'+item.foto+'" alt="'+item.desc_foto+'" />'+ '\r\n' +
														 '</div>' + '\r\n';
													//controlamos si existe alguna empresa o producto para pintar que no hay 													
													if (item.tipo == "EMPRESA" ){ 
														lista_navegacion_empresas=lista_navegacion_empresas+item.id_prod+",";
														emp++;
														var clase="label-info";
														var esempresa= "list-item-empresa";
														var categorias_lista="";
														var url =jQuery('#urlEmpresa').val();
														var imagen= '<div class="img left">' + '\r\n' +
																'<img src="'+URLImagenes_bbdd+'/img_empresa.jpg" alt="'+item.desc_foto+'" />'+ '\r\n' +
														 '</div>' + '\r\n';
														var compara="";
														if (typeof item.modelo !== 'undefined' && item.modelo != "") {
															item.nombre=item.nombre+" - "+item.modelo;
														}
													}
													else if ( item.tipo == "PRODUCTO" ){
														lista_navegacion_productos=lista_navegacion_productos+item.id_prod+",";
														pro++;
														var clase="label-success";
														var esempresa= "";
														var categorias='';
														item.contenido=item.contenido +" ...";
														if (typeof item.modelo !== 'undefined') {
															item.nombre=item.nombre+" - "+item.modelo;
														}
														
														var url =jQuery('#url').val();
														// console.log(item.categorias);
															categorias_lista="";
															if (typeof item.categorias !== 'undefined') {
															
															if(item.categorias.length > 1){
																categorias_lista+='<ul class="theme">'+ '\r\n';;
															}
															var listado_cat="";
															 jQuery.each(item.categorias, function(index, categoria) {
																if (listado_cat.indexOf(categoria.id) == -1) {
																		if(item.categorias.length > 1){
																			categorias_lista+='<li>'+ '\r\n';;
																		}
																		categorias_lista+='<a title="" id="tol_'+categoria.id+'_'+item.id_prod+'" onmouseout="quitaToltip();return true;" onMouseOver="pintaToltipCategoria('+categoria.id+','+item.id_prod+'); return true"   class="toltipcat"  href="'+url_categorias+'?tipo=listaCategorias&value='+categoria.id+'" ><span class="label label_filtro '+categoria.id+' '+categoria.nombre+' label-danger ">'+categoria.nombre+'</span></a>'+ '\r\n';
																			if(item.categorias.length > 1){
																				categorias_lista+='</li>'+ '\r\n';;
																			}
																}
																listado_cat=listado_cat+","+categoria.id;
															})
															if(item.categorias.length > 1){
																categorias_lista+='</ul>'+ '\r\n';;
															}
															}
														
														if (item.categorias == "" ){
														
														jQuery.each(item.categorias, function(index, categoria) {
														categorias+='<a title="" id="tol_'+categoria.id+'_'+item.id_prod+'" onmouseout="quitaToltip();return true;" onMouseOver="pintaToltipCategoria('+categoria.id+','+item.id_prod+'); return true"   class="toltipcat" href="'+url_categorias+'?tipo=listaCategorias&value='+categoria.id+'" ><span class="label label_filtro '+categoria.nombre+'  '+categoria.id+' label-danger ">'+categoria.nombre+'</span></a>'+ '\r\n';
														var imagen= '<div class="img left">' + '\r\n' +
																'<img src="'+URLImagenes_bbdd+'/'+item.foto+'" alt="'+item.desc_foto+'" />'+ '\r\n' +
														 '</div>' + '\r\n';
														})
														
														}
														
														//var compara="";
														//if (count >1){
														
														//	compara='<p class="compara"><input class="es_comparado" onclick="comparaCheck('+item.id_prod+')" type="checkbox" name="comparar_'+item.id_prod+'" id="comparar_'+item.id_prod+'"/><label for="comparar_'+item.id_prod+'">Comparar</label></p>' + '\r\n';
															//}
													}
													//caso de que el json devuelva que no hay ni empresas ni productos
													if( item.nombre == "No_existen_sugerencias"){
														pro++;
														emp++;
														clase= "hidden";
														item.nombre="No existen sugerencias";
														item.contenido="";
														oculta="hidden";
														categorias="";
														imagen="";
													}
												
													datos+='<li class="list-item box '+esempresa+'" id="'+item.id_prod+'">'+ '\r\n' +
														imagen +
														 '<div class="block right">'+ '\r\n' +
															'<p class="title">' + '\r\n' +
																'<a target="_blank" title="' + eval("wwsagNuevaVentana" + sufijoIdioma) + ' '+item.nombre+'" class="enviasub" data-group="'+item.tipo+'" href="'+url+'?id='+item.id_prod+'" onclick="cargaEnNueva2(this.href,\''+url+'\',\''+item.id_prod+'\',\''+item.tipo+'\',\'_blank\',\'ACTIVO_PRODUCTOS\'); return false;">'+item.nombre+'<img class="'+oculta+'"src="'+URLImagenes+'/ventana_nueva.gif" alt="' + eval("wwsagNuevaVentana" + sufijoIdioma) + '" /></a>' + '\r\n' +
															'</p>' + '\r\n' +
															//compara+
															'<p class="desc">'+item.contenido+'</p>' + '\r\n' +
															'<p class="theme">' + '\r\n' ;
																datos+='<span class="label label_filtro keywords_departamentotodos ';
																//if (item.tipo == "EMPRESA" ){ 	datos+='<span class="label label_filtro keywords_departamentotodos terapia arquitectura transporte taller comunicacion documentacion ';}
																//if ( item.tipo == "PRODUCTO" ){datos+='<span class="label label_filtro keywords_departamentotodos  ';}
																if ( item.tipo == "PRODUCTO" ){
																	if (typeof item.departamentos !== 'undefined') {
																	
																	datos+=' '+item.departamentos+' ';
																	
																	}	
																}																
																if (item.tipo == "EMPRESA" ){ datos+=' DEPTodos terapia arquitectura transporte taller comunicacion documentacion ';}
																 if ( item.tipo == "PRODUCTO" ){datos+=' DEPTodos ';}
																//datos+=' DEPTodos terapia arquitectura transporte taller comunicacion documentacion ';
																datos+='hidden">DEPTodos '+ '\r\n';
															
															if ( item.tipo == "PRODUCTO" ){
																	if (typeof item.departamentos !== 'undefined') {
																	
																	datos+=' '+item.departamentos+' ';
																	
																	}	
																}																
																if (item.tipo == "EMPRESA" ){ datos+='  terapia arquitectura transporte taller comunicacion documentacion ';}
															
														
															datos+='</span>'+ '\r\n';
																
															
																datos+='<span class=" hidden label label_filtro '+item.tipo+'">'+item.tipo+'</span>'+ '\r\n';
																if (typeof item.categorias !== 'undefined') {
																	if(item.categorias.length == 1){
																		datos+=categorias_lista+'\r\n';
																	}
																}
																 
															'</p>' + '\r\n';
															if ( typeof item.categorias !== 'undefined') {
																if( item.categorias.length > 1){
																	datos+=categorias_lista+'\r\n';
																}
															}
														datos+='</div>' + '\r\n' +
														
													'</li>' + '\r\n'; 
												}else{
													datos+='<div class="list-item box">'+ '\r\n' +
														 '<div class="block right">'+ '\r\n' +
															'<p class="title">No existen sugerencias</p>' + '\r\n' +
														'</div>' + '\r\n' +
													'</div>' + '\r\n';
												}

										});	
										//vemos si pintamos el lateral
										console.log(lista_navegacion_productos);
										jQuery(".esLisDocMuestra").addClass("hidden");
										
										if (lista_navegacion_productos != "" || lista_navegacion_productos != "," ){
										//	pinta_documentos_lateral(lista_navegacion_productos+"0",tipo)
										//ahora no se pinta si es todos ya que esto devuelve ul ulo li 
											if (tipo == "todos"){pinta_documentos_lateral(lista_navegacion_productos+"0",tipo)}else{pinta_documentos_lateral(lista_navegacion_productos_activos+"0",tipo)}
										
										}
												
											
											
											
											
											
											//no existe ningun producto
											if ( pro == 0){
													datos+='<li class="list-item box">'+ '\r\n' +
														 '<div class="block right">'+ '\r\n' +
															'<p class="title">No existen sugerencias</p>' + '\r\n' +
															'<p class="themes">' + '\r\n' +
																'<span class="label label_filtro PRODUCTO hidden ">PRODUCTO</span>'+ '\r\n'+
																
															'</p>' + '\r\n' +
														'</div>' + '\r\n' +
												'</li>' + '\r\n';
											}
											//no existe ninguna empresa
											if ( emp == 0 ){
														datos+='<li class="list-item box">'+ '\r\n' +
														 '<div class="block right">'+ '\r\n' +
															'<p class="title">No existen sugerencias</p>' + '\r\n' +
															'<p class="themes">' + '\r\n' +
																'<span class="label label_filtro EMPRESA hidden ">EMPRESA</span>'+ '\r\n'+
																 
															'</p>' + '\r\n' +
														'</div>' + '\r\n' +
												'</li>' + '\r\n';
											}
											// solo ejecutamos filtro si  no estamos en presentación
											if (presentacion == 0 && tipo != "todos" && tipo != "empresas"){
												
												// si solo hay una categoria  extendemos la vis a sm 12
												//if (listaIdCatArr.length < 2){
													//jQuery(".esFiltro").css("display","none");
												//	jQuery(".tieneFiltro").removeClass("col-md-8");
												//	jQuery(".tieneFiltro").addClass("col-md-12");
												//}else{
													//jQuery(".tieneFiltro").css("display","block");
													//jQuery(".tieneFiltro").removeClass("col-md-12");
													//jQuery(".tieneFiltro").addClass("col-md-8");
												//}
											
												if ( act == 0){
														datos+='<li class="list-item box">'+ '\r\n' +
															 '<div class="block right">'+ '\r\n' +
																'<p class="title">No existen sugerencias</p>' + '\r\n' +
																'<p class="themes">' + '\r\n' +
																	'<span class="label label_filtro PRODUCTO hidden ">PRODUCTO</span>'+ '\r\n'+
																	'<span class="label label_filtro keywords_estado ESTADO_ACTIVO hidden ">ACTIVO</span>'+ '\r\n'+  
																'</p>' + '\r\n' +
															'</div>' + '\r\n' +
													'</li>' + '\r\n';
												}
												if ( inact == 0){
														datos+='<li class="list-item box">'+ '\r\n' +
															 '<div class="block right">'+ '\r\n' +
																'<p class="title">No existen sugerencias</p>' + '\r\n' +
																'<p class="themes">' + '\r\n' +
																	'<span class="label label_filtro PRODUCTO hidden ">PRODUCTO</span>'+ '\r\n'+
																	'<span class="label label_filtro keywords_estado ESTADO_INACTIVO hidden ">INACTIVO</span>'+ '\r\n'+ 
																'</p>' + '\r\n' +
															'</div>' + '\r\n' +
													'</li>' + '\r\n';
												}
												if ( borra == 0){
														datos+='<li class="list-item box">'+ '\r\n' +
															 '<div class="block right">'+ '\r\n' +
																'<p class="title">No existen sugerencias</p>' + '\r\n' +
																'<p class="themes">' + '\r\n' +
																	'<span class="label label_filtro PRODUCTO hidden ">PRODUCTO</span>'+ '\r\n'+
																	'<span class="label label_filtro keywords_estado ESTADO_BORRADOR hidden ">ESTADO_BORRADOR</span>'+ '\r\n'+
																'</p>' + '\r\n' +
															'</div>' + '\r\n' +
													'</li>' + '\r\n';
												}
												
												//console.log(datos);
												//miramos  y checkeamod dependiendo si hay acti inac o borra
												//31/01/2020 reyes pide quitarlo,  que simpre muestre activos
												/*if ( act == 0 && inact == 1 ){
															jQuery(".filtroACTIVO").prop('checked', false);
															jQuery(".filtroACTIVO").removeProp('checked');
															jQuery(".filtroACTIVO").trigger('change');
															jQuery(".filtroACTIVOLabel").removeClass('active');
															jQuery(".filtroBORRADOR").prop('checked', false);
															jQuery(".filtroBORRADOR").removeProp('checked');
															jQuery(".filtroBORRADOR").trigger('change');
															jQuery(".filtroBORRADORLabel").removeClass('active');
															jQuery(".filtroINACTIVO").prop('checked', true);
															jQuery(".filtroINACTIVO").trigger('change');
															jQuery(".filtroINACTIVOLabel").addClass('active');
															
												
												
												
												}
												if ( act == 0 && inact == 0 &&  borra ==1  ){
															jQuery(".filtroBORRADOR").prop('checked', true);
															jQuery(".filtroBORRADOR").trigger('change');
															jQuery(".filtroBORRADORLabel").addClass('active');
															jQuery(".filtroINACTIVO").prop('checked', false);
															jQuery(".filtroINACTIVO").removeProp('checked');
															jQuery(".filtroINACTIVO").trigger('change');
															jQuery(".filtroINACTIVOLabel").removeClass('active');
															jQuery(".filtroACTIVO").prop('checked', false);
															jQuery(".filtroACTIVO").removeProp('checked');
															jQuery(".filtroACTIVO").trigger('change');
															jQuery(".filtroACTIVOLabel").removeClass('active');
															
												}*/
											}
											//controlamos que haya empresas o sea producto
											if ( p >= 1 ) {
												datos=datos.trim();
												//datos=[{"id_prod":"188","nombre":"PRUEBAS 161616116161","descripcion":"PRUEBAS 161616116161 ...","foto":"188-2019_03_05_13_07_48-546b1ff59c5a6b79b39e32d4f80081fa.png"},{"id_prod":"191","nombre":"PRUEBAS 19","descripcion":"PRUEBAS 19 ...","foto":"191-2019_02_27_13_14_09-11.png"},{"id_prod":"192","nombre":"PRUEBAS 20","descripcion":"PRUEBAS 20 ...","foto":"192-2019_02_27_13_24_59-Captura.PNG"},{"id_prod":"196","nombre":"pruebas 24","descripcion":"pruebas 24 ...","foto":"196-2019_02_27_13_51_49-11.png"},{"id_prod":"201","nombre":"PRUEBAS 29","descripcion":"PRUEBAS 29 ...","foto":"201-2019_02_28_08_52_18-formacion_crea_comunicacion.jpg"},{"id_prod":"155","nombre":"pruebas 6","descripcion":"pruebas 6 ...","foto":"155-2019_02_18_09_30_23-11.png"},{"id_prod":"156","nombre":"pruebas 7","descripcion":"pruebas 7 ...","foto":"156-2019_02_18_09_58_58-11.png"}];
												var $items = jQuery(datos);
												
												if ( tipo == "todos"){
												
													if ( pro == 0 && emp >=1){
														jQuery(".filtroEmpresa").prop('checked', true);
														jQuery(".filtroEmpresa").trigger('change');
														jQuery(".filtroEmpresaLabel").addClass('active');
														jQuery(".filtroProductos").prop('checked', false);
														jQuery(".filtroProductos").removeProp('checked');
														jQuery(".filtroProductos").trigger('change');
														jQuery(".filtroProductosLabel").removeClass('active');
														
													}
													if ( pro >= 1 && emp >=0){
														jQuery(".filtroEmpresa").prop('checked', false);
														jQuery(".filtroEmpresa").removeProp('checked');
														jQuery(".filtroEmpresa").trigger('change');
														jQuery(".filtroEmpresaLabel").removeClass('active');
														jQuery(".filtroProductos").prop('checked', true);
														jQuery(".filtroProductos").trigger('change');
														jQuery(".filtroProductosLabel").addClass('active');
													}
													if ( pro == 0 && emp ==0){
														jQuery(".filtroEmpresa").prop('checked', false);
														jQuery(".filtroEmpresa").trigger('change');
														jQuery(".filtroEmpresaLabel").removeClass('active');
														jQuery(".filtroProductos").prop('checked', true);
														jQuery(".filtroProductos").trigger('change');
														jQuery(".filtroProductosLabel").addClass('active');
													}
												 
												}
											jQuery(".listadoResultado").html('');
											jQuery(".listadoResultado").removeClass('hidden');
												jQuery('#demo_'+tipo).jplist({ 
													command: 'add'
													,commandData: {
														$items: $items
														,index: 0
													}
												});
												
												
												if (lista_navegacion_empresas != ""){
													lista_navegacion_empresas=lista_navegacion_empresas.slice(0,-1);
													jQuery("#lista_navegacion_empresas").val(lista_navegacion_empresas);
												}
												if (lista_navegacion_productos != ""){
													lista_navegacion_productos=lista_navegacion_productos.slice(0,-1);
													if (tipo = "todos"){
														jQuery("#lista_navegacion_productos_activos").val(lista_navegacion_productos);
													}
													
													jQuery("#lista_navegacion_productos").val(lista_navegacion_productos);
													
												}
												if (lista_navegacion_productos_activos != ""){
													lista_navegacion_productos_activos=lista_navegacion_productos_activos.slice(0,-1);
													jQuery("#lista_navegacion_productos_activos").val(lista_navegacion_productos_activos);
												}
												if (lista_navegacion_productos_inactivos != ""){
													lista_navegacion_productos_inactivos=lista_navegacion_productos_inactivos.slice(0,-1);
													jQuery("#lista_navegacion_productos_inactivos").val(lista_navegacion_productos_inactivos);
												}
												if (lista_navegacion_productos_borrador != ""){
													lista_navegacion_productos_borrador=lista_navegacion_productos_borrador.slice(0,-1);
													jQuery("#lista_navegacion_productos_borrador").val(lista_navegacion_productos_borrador);
												}
												jQuery(".center ").removeClass("hidden");
											}else{
												jQuery(".center_sindatos ").html("No se encontraron coincidencias 1 " + tipo);
												jQuery(".center_sindatos ").removeClass("hidden");
											}
									
									}else{
									//no existen datos
										
										if ( tipo == "listaISO" && presentacion == 0){
										
										var cadena = jQuery("#listaIso3").val();
										 console.log("cadena="+cadena);
												var indices = [];
												for(var i = 0; i < cadena.length; i++) {
													if (cadena[i].toLowerCase() === "-") indices.push(i);
												}
											console.log("hay="+indices.length);
											if( indices.length === 1){ 
											var iso =jQuery("#listaIso3").val().replace("-", "");
											jQuery(".center_sindatos ").html('<div class="jplist-panel box panel-top"><div class="col-md-3 col-sm-12"><div class="col-md-12 divContinuarIso"><input type="button" class="botonContinuar" id="botonSimilarISO" data-iso="'+iso+'" value="Alta en la ISO '+iso+'" onclick="event.preventDefault();abreAltaSimilarIso('+iso+');"></div></div><div class="col-md-7 col-sm-12">No se encontraron coincidencias		</div></div>');

											}
										
										
										
										
										

										}else{jQuery(".center_sindatos ").html("No se encontraron coincidencias");}
										jQuery(".center_sindatos ").removeClass("hidden");
									}
								
								}	
														
									
									
									
									
							});



				//request.fail(function(jqXHR, textStatus) {
					 // jQuery(".center ").removeClass("hidden");
				//});
			
			
			}
	//hace checked a todos  los hijos de una categoria		
			function filtraTodos(id){ 
				
				var isChecked = $("#"+id).prop('checked');
				$("#li_"+id).children('ul').children().each(function () {
					if($(this).css('display') == 'block')
					{
						$("#cat_"+this.id.split('_')[2]).prop('checked', isChecked);
						$("#cat_"+this.id.split('_')[2]).trigger('change');
						
						$(this).children('ul').children().each(function () {
							if($(this).css('display') == 'block')
							{
								$("#cat_"+this.id.split('_')[2]).prop('checked', isChecked);
								$("#cat_"+this.id.split('_')[2]).trigger('change');
								
							}
						});
					}
				});

				
				$(".filtroClass_"+id+" input").prop('checked', isChecked);
				$(".filtroClass_"+id+" input").trigger('change');
				
			

				
			}	
 // filtra por nombre del glosario al dar de alta un producto, o al buscar un producto 
 
							var triggers = jQuery('ul.alphabet li a');
							var filters = jQuery('ul.dictionary li p');

							triggers.click(function() {
								jQuery('ul.alphabet li').removeClass("activa");
								jQuery('div.alphabet div').removeClass("activa");
								jQuery(this).parent().addClass("activa");
								jQuery("#div_"+jQuery(this).attr('id').split('_')[1]).parent().addClass("activa");

								var takeLetter = jQuery(this).text();
								filters.parent().parent().parent().addClass("hidden");
								jQuery(".lista-filtro h3").html('<span class="oculto">Empiezan por</span> '+takeLetter);
								filters.each(function(i) {
									var compareFirstLetter = jQuery(this).text().substr(0,1);
									if ( compareFirstLetter == takeLetter ) {
										jQuery(this).parent().parent().parent().removeClass("hidden");
									}
								});

							});
// filtra por nombre del glosario al dar de alta un producto, o al buscar un producto si estaen div
 
							var triggers = jQuery('div.alphabet div a');
							var filters = jQuery('ul.dictionary li p');

							triggers.click(function() {
								
								jQuery('div.alphabet div').removeClass("activa");
								jQuery('ul.alphabet li').removeClass("activa");
								
								jQuery("#li_"+jQuery(this).attr('id').split('_')[1]).parent().addClass("activa");
								jQuery(this).parent().addClass("activa");
								var takeLetter = jQuery(this).text();
								filters.parent().parent().parent().addClass("hidden");
								jQuery(".lista-filtro h3").html('<span class="oculto">Empiezan por</span> '+takeLetter);
								filters.each(function(i) {
									var compareFirstLetter = jQuery(this).text().substr(0,1);
									if ( compareFirstLetter == takeLetter ) {
										jQuery(this).parent().parent().parent().removeClass("hidden");
									}
								});

							});						
// ejecuta el filtro del glosario de iso al pulsar o dar intro 

	jQuery(".botonFiltrarGlosarioReset").click(function(){
		var triggers = jQuery('ul.alphabet li a');
		var filters = jQuery('ul.dictionary li p');
		var takeLetter = "A";
		jQuery('.filtroGlosario').val("");
		jQuery('ul.alphabet li').removeClass("activa");
		jQuery('div.alphabet a').removeClass("activa");
		jQuery('ul.alphabet li').first().addClass("activa");
		jQuery('div.alphabet a').first().addClass("activa");
		filters.parent().parent().parent().addClass("hidden");
		jQuery(".lista-filtro h3").html('<span class="oculto">Empiezan por</span> '+takeLetter);
			filters.each(function(i) {
			var compareFirstLetter = jQuery(this).text().substr(0,1);
				if ( compareFirstLetter == takeLetter ) {
					jQuery(this).parent().parent().parent().removeClass("hidden");
				}
			});
	});
	
jQuery(".botonFiltrarGlosario").click(function(){

	filtrarGlosarioJson ();
});
		
jQuery('.filtroGlosario').keydown(function (event) {
	var keypressed = event.keyCode || event.which;
	if (keypressed == 13) {
	event.preventDefault();
		filtrarGlosarioJson ();
		  

	}
});							

function filtrarGlosarioJson (){
jQuery('ul.alphabet li').removeClass("activa");
	if ((jQuery("ul.dictionary li p a").length > 0)){
		var filtroDom='ul.dictionary li p a';
		
	}else{
		var filtroDom='ul.dictionary li p';
	}
var filters = jQuery(filtroDom);
var palabraFiltro=jQuery('.filtroGlosario').val().toLowerCase();

	if ((jQuery("ul.dictionary li p a").length > 0)){
		filters.parent().parent().parent().parent().addClass("hidden");	
		
	}else{
		filters.parent().parent().parent().addClass("hidden");	
	}

	filters.each(function(i) {
	var compareText = jQuery(this).text().toLowerCase();
	var resultado = compareText.indexOf(palabraFiltro);
	jQuery(".lista-filtro h3").html('Resultados para '+palabraFiltro );
		if ( resultado != -1 ) {
			if ((jQuery("ul.dictionary li p a").length > 0)){
				jQuery(this).parent().parent().parent().parent().removeClass("hidden");
				
			}else{
				jQuery(this).parent().parent().parent().removeClass("hidden");
			}
			
		}
	});
}

function habilitarDeshabitarInput (id){
	var seleccionado = jQuery("#"+id).children("option:selected"). val();
	var inputObjetivo = id.split('_')[2];
	
	if ( seleccionado == 0 ){
	jQuery("#_ison4_"+inputObjetivo).prop('readonly', false);
	jQuery("#_ison4_"+inputObjetivo).css("background-color","");
	jQuery(".easy-autocomplete").prev().addClass('obligatorio');
	}else {
	jQuery("#_ison4_"+inputObjetivo).prop('readonly', true);
	jQuery("#_ison4_"+inputObjetivo).css("background-color","#ddd");
	jQuery(".easy-autocomplete").prev().removeClass('obligatorio');
	}
	jQuery("#_ison4_"+inputObjetivo).val("");
}


function ponValorInput (id){

	var seleccionado = jQuery("#"+id).children("option:selected"). val();
	var seleccionadoTexto = jQuery("#"+id).children("option:selected"). text();
	var inputObjetivo = id.split('_')[2];
	if ( id.split('_')[1] == "ison3" ){
		if ( seleccionado != 0 ){
		jQuery("#_ison4_"+inputObjetivo).val(seleccionadoTexto);
		jQuery(".easy-autocomplete").prev().removeClass('obligatorio');
		}else{
		jQuery("#_ison4_"+inputObjetivo).val("");
		}
	}
	else{
		jQuery("#_ison4_"+inputObjetivo).val("");
		}
	
}


//previsualización de imagenes en la subida de fotos boton añadir y borrar imagen

function CompruebaDescripcion (objetivo){

	if (document.getElementById(objetivo).value == "" ){ 
		jQuery('#'+objetivo).addClass('obligatorio');
		jQuery('.clase_'+objetivo).removeClass('hidden');
	}else{
		jQuery('#'+objetivo).removeClass('obligatorio');
		jQuery('.clase_'+objetivo).addClass('hidden');
	}


}
function Espacios(string){
    //Uso de split y join para buscar y reemplazar caracteres
    //Reemplazando espacios por guiones
	console.log("ejecuta espacios");
    string = string.split("\"").join("");
	string = string.split("\'").join("");
	 return string
}
	function myFunctionImagenes(idcarga,id,objetivo,boton){
	
 var x = document.getElementById(id);
 var txt = "";
 var extensiones = new RegExp(/.gif|.jpg|.jpeg|.png/i); //Extensiones válidas
 var error = {
     state: false,
     msg: ''
   };
 if ('files' in x) {
  if (x.files.length == 0) {
	jQuery('.'+boton).addClass('hidden');
	txt = "Seleccione uno o mas ficheros.";
  } else {
   for (var i = 0; i < x.files.length; i++) {
		var file = x.files[i];
		var ext = file.name.substring(file.name,file.name.length);
		if (!extensiones.test(ext)) {
        error.state = true;
        error.msg+= 'La extensión del archivo <b>'+ file.name +'</b> no es válida.<br>';
    }
	if ( id =="imagenPortada" ){
	var estilo="padding:5px;"; 
	var texto=" de portada";
		
	}else{ 
		
	var estilo="padding:5px; 	 border-bottom: 1px solid #ededed;";
	var texto = (i+1);
	
	}
	CompruebaDescripcion(objetivo)
  
	 txt+='<div class="col-md-12" style="'+estilo+'">';
		txt+='<div class="col-md-6">';
			txt += "<p><br><strong>Imagen " + texto + "</strong><br></p>";
		  
			if ('name' in file) {
			 txt += "<p>Nombre: " + file.name + "<br></p>";
			}
			if ('size' in file) {
			 txt += "<p>Tamaño: " + file.size + " bytes <br></p>";
			}
		txt+="</div>";
		txt+='<div class="col-md-6">';
			txt +='<img class="img-responsive img-thumbnail" src="'+URL.createObjectURL(file)+'" />';
		txt+="</div>";
	  txt+="</div>";
	 }
  jQuery('#'+boton).removeClass('hidden');
  }
 }else {
  if (x.value == "") {
   txt += "Seleccione uno o mas ficheros.";
  } else {
   txt += "The files property is not supported by your browser!";
   txt += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
  }
 }
 if (error.state){
 document.getElementById(idcarga).innerHTML = error.msg;
 
 } else{
 console.log(idcarga);
 document.getElementById(idcarga).innerHTML = txt;}
 
}

function habDeshabAnnadirImagen(elem) {
	var elemAux = elem.name;
	elemAux = elemAux.substring(0, elemAux.lastIndexOf("_"));
	var elemLLenos = 0;
	
	var fileName = $(elemAux).val();
	var cuantos = $('[id^="' + elemAux + '"]').length;
  
	$('[id^="' + elemAux + '"]').each(function (idx) {
	
		var fileName = $(this).val();
			if (fileName) {
				elemLLenos = elemLLenos + 1;
			} 
			
			if (elemLLenos >= cuantos ) {
			
				$('[name="' + elemAux + '_botonAnnadir"]').removeProp('disabled');	
			} else {
			
				$('[name="' + elemAux + '_botonAnnadir"]').prop('disabled', 'disabled');
			}
	});
	
	elemLLenos = 0;
}
function habDeshabBorrarContacto(elem) {

	var elemAux = elem.name;
	elemAux = elemAux.substring(0, elemAux.lastIndexOf("_"));
	var cuantos = $('[id^="' + elemAux + '"]').length;
	if (cuantos > 1) {
		$('[name="' + elemAux + 'botonBorrar"]').removeProp('disabled');
	} else {
	
		$('[name="' + elemAux + 'botonBorrar"]').prop('disabled', 'disabled');
	}
}
function habDeshabAnnadirContacto(elem) {
	var elemAux = elem.name;
	elemAux = elemAux.substring(0, elemAux.lastIndexOf("_"));
	var elemLLenos = 0;
	var fileName = $(elemAux).val();
	var cuantos = $('[id^="' + elemAux + '"]').length;
  
	$('[id^="' + elemAux + '"]').each(function (idx) {
	
		var fileName = $(this).val();
			if (fileName) {
				elemLLenos = elemLLenos + 1;
			} 
			
			if (elemLLenos >= cuantos ) {
			
				$('[name="' + elemAux + '_botonAnnadir"]').removeProp('disabled');	
			} else {
			
				$('[name="' + elemAux + '_botonAnnadir"]').prop('disabled', 'disabled');
			}
	});
	
	elemLLenos = 0;
}
function habDeshabBorrarImagen(elem) {

	var elemAux = elem.name;
	elemAux = elemAux.substring(0, elemAux.lastIndexOf("_"));
	var cuantos = $('[id^="' + elemAux + '"]').length;
	if (cuantos > 1) {
		$('[name="' + elemAux + '_borrarImagen"]').removeProp('disabled');
	} else {
	
		$('[name="' + elemAux + '_borrarImagen"]').prop('disabled', 'disabled');
	}
}

//Carga de los selects dependientes al Insertar y Actualizar
function annadirBotonImagen(elem) {
	var elemAux = elem.name;
	elemAux = elemAux.substring(0, elemAux.lastIndexOf("_"));
	var cuantos = $('[id^="' + elemAux + '"]').length;
	var nuevo = cuantos + 1;
	var nuevoFieldset = document.createElement("fieldset");
	nuevoFieldset.id = 'otrasImagenes1'+nuevo;
	$('#otrasImagenes1'+ cuantos).after(nuevoFieldset);
	var objetivo= 'imagenPortadaDescripcion'+nuevo;
	nuevoFieldset.innerHTML = '<div class="row" style="padding-top:30px; ">'+
							 '<div class="col-md-6">'+
							  '<label for="_otrasImagenes1_'+nuevo+'">Imágenes interior '+nuevo+': </label>'+
								' <input class="imagenProducto" type="file" name="_otrasImagenes1_'+nuevo+'" id="_otrasImagenes1_'+nuevo+'" data-cual="'+nuevo+'" size="50" onchange="myFunctionImagenes(\'show\'+this.id,this.id,\''+objetivo+'\',\'eliminaFile1_'+nuevo+'\');habDeshabAnnadirImagen(this);habDeshabBorrarImagen(this);">'+
								'<input type="button" class="eliminaFile hidden"  id="eliminaFile1_'+nuevo+'" onclick="eliminaFile(\'_otrasImagenes1_'+nuevo+'\',\'imagenPortadaDescripcion'+nuevo+'\',\'otro\',\'eliminaFile1_'+nuevo+'\');" value="Vaciar fichero seleccionado" data-cual="_otrasImagenes1_'+nuevo+'"  data-cualdes="imagenPortadaDescripcion'+nuevo+'" data-tipo="otro"/>'+
								' <label for="imagenPortadaDescripcion'+nuevo+'"><abbr title="obligatorio" class="hidden clase_imagenPortadaDescripcion1'+nuevo+'">*</abbr>Descripción de la Imagen: </label>'+
								'<span class=" hidden clase_imagenPortadaDescripcion'+nuevo+'">Por favor, rellene una descripción de la foto</span>'+
								'<input  type="input" name="imagenPortadaDescripcion'+nuevo+'" id="imagenPortadaDescripcion'+nuevo+'" onchange="CompruebaDescripcion(this.id);">'+
							 '</div>'+
							 '<div id="show_otrasImagenes1_'+nuevo+'" class="col-md-6">'+
									'<div class="col-md-12" style="padding:5px;">'+
										'<div class="col-md-6">'+
											'<p>'+
											'<strong>Imagen</strong>'+
											'</p>'+
											'<p>Seleccione al menos un fichero<br>'+
											'</p>'+
										'</div>'+
										'<div class="col-md-6">'+
											'<img class="img-responsive img-thumbnail" src="'+URLImagenes_bbdd+'/sin_imagen.jpg" />'+
										'</div>'+
									'</div>'+

							 '</div>'+
							'</div>';
	habDeshabAnnadirImagen(elem);
	habDeshabBorrarImagen(elem);
		
}

function borrarBotonImagen(elem) {
	var elemAux = elem.name;
	elemAux = elemAux.substring(0, elemAux.lastIndexOf("_"));
	var elemAuxFieldset = elemAux.replace("_", "");
	var cual = $('[id^="' + elemAux + '"]').length;
	
	$('#' + elemAuxFieldset + cual).remove();
	habDeshabAnnadirImagen(elem);
	habDeshabBorrarImagen(elem);
}
jQuery("#botonEliminaPortada").click(function(){ 
	jQuery(".muestraFotoPortada ").removeClass("hidden");
	jQuery(".ocultaFotoPortada ").addClass("hidden");
	jQuery("div#imagenPortada_show img").attr("src",URLImagenes_bbdd+"/sin_imagen.jpg");
});

function pad(input, length, padding) { 
 var str = input + "";
 return (length <= str.length) ? str : pad(str+padding, length, padding);
}
//// NUEVO FILTRADO ISO Y CATEGORIAS

	var listado="";	
   console.log(2);

 function PonQuitaCategorias(tipo) {

 if (tipo == 'ison'){
  console.log(111111);
		var listado="";	
		var listado2="";	
					jQuery('#ison3 option:selected').each(function() {
						listado += this.value+",";
					});//each
					
					jQuery('#ison2 option:selected').each(function() {
					//hacemos esto para que no herede y se cargue solo ison3
						if(	listado.indexOf(this.value) == -1 || listado.length == 0 ) {
							listado2 += this.value+"00,";
						}
					});//each
		listado=listado+listado2;
		
		listado=listado.substr(0, listado.length - 1);
		// SI NO ES BUSQUEDA AVANZADA LO EJECUTAMOS
		if ( jQuery( ".insertarProducto" ).length  || jQuery( ".id_de_iso" ).length) {
		console.log("ponquitacategorias => annadirCategoriasdeIsoNuevo");
			annadirCategoriasdeIsoNuevo(globalClone1,globalClone2,globalClone3,'categorias',listado);
		}
		}
	if (tipo == 'doc'){
		var listado="";	
		var listado2="";	
		var listado3="";	
					jQuery('#ison3 option:selected').each(function() {
						listado += this.value+",";
					});//each
					
					jQuery('#ison2 option:selected').each(function() {
					//hacemos esto para que no herede y se cargue solo ison3
						
							listado2 += this.value+"00,";
						
					});//each
					jQuery('#ison1 option:selected').each(function() {
					
						
							listado3 += this.value+"0000,";
					
					});//each
		listado=listado+listado2+listado3;
		console.log("aaaaaaaaaaaaaa"+listado);
		listado=listado.substr(0, listado.length - 1);
		// si no es busqueda avanzada saca documentos
		if ( jQuery( ".insertarProducto" ).length || jQuery( ".id_de_iso" ).length) {
			annadirDocumentosIsoNuevo(listado);
		}
	}
 } 
 
 
  function limpiaAsignaCat (){
		var textoCat ="";
		jQuery('#categorias_text').html('');
		jQuery('[data-id=\"categorias1"] .filter-option-inner-inner').html('');
	
			var j =0;
			textoCat+='<ul>';
			jQuery('#categorias1 option:selected').each(function() {
				var grupo1 =this.value;
				textoCat+='<li id="selccionado_'+this.value+'">';
				textoCat+='<p>'+this.text+'</p>';
				textoCat+='<ul>';
				jQuery('#categorias2 option:selected').each(function() {
					var grupo2 =this.value;	
					if ( jQuery(this).attr("data-group") == grupo1 ){
					textoCat+='<li id="selccionado_'+this.value+'">';
						textoCat+='<p >'+this.text+'</p>';
						textoCat+='<ul>';
						jQuery('#categorias3 option:selected').each(function() {
						
							var grupo=jQuery(this).attr("data-group");
							if ( grupo == grupo2 ){
								textoCat+='<li id="selccionado_'+this.value+'"><p>'+this.text+'</p></li>';
							}
							
						});//each cat3
						textoCat+='</ul>';// cat3
					grupo2 ="";
					textoCat+='</li>'; // cat2
					}
	
				
				});//each cat2
				grupo1="";
				textoCat+='</ul>';
				textoCat+='</li>'; // cat1
				j++;
			
			});//each cat 1
			textoCat+='</ul>';			
			if ( j == 0 ){
			textoCat="Ninguna opción seleccionada";
			}
					
		jQuery('#categorias_text').html(textoCat);
		
	}

	var num=0;
  function limpiaAsignaiso (numeroIso,tipo){
	console.log("limpiaAsignaiso num:"+numeroIso+" tipo "+tipo);
							
		var copiarEnListaiso="";
		var textoiso ="<ul>";
		jQuery('#'+tipo+numeroIso+'_text').html('');
		jQuery('[data-id=\"'+tipo+numeroIso+'"] .filter-option-inner-inner').html('');
	
			var j =0;
			jQuery('#'+tipo+numeroIso+' option:selected').each(function() {
			
				textoiso+="<li>"+this.text+"</li>";
				jQuery('#'+tipo+numeroIso+'_text').html(textoiso);
				copiarEnListaiso+=this.value+"-";
				if ( tipo == 'ison'){
					jQuery('#listaIso'+numeroIso).val(copiarEnListaiso);
				}else if (tipo == 'categorias'){
					jQuery('#listaCategorias'+numeroIso+'').val(copiarEnListaiso);
				}else if ( tipo == 'direcciones'){
					jQuery('#listaDirecciones'+numeroIso+'').val(copiarEnListaiso);
				}else if ( tipo == 'nombreEmpresa'){
					jQuery('#listaEmpresas'+numeroIso+'').val(copiarEnListaiso);
				}else{jQuery('#listaCategorias'+numeroIso+'').val(copiarEnListaiso);}
				j++;
			});//each
			textoiso +="</ul>";			
			if ( j == 0 ){
			//arreglo bug , al descamrcar y no haber ninguno  se quedaban marcados los anteriores
				if ( tipo == 'ison'){
					jQuery('#listaIso'+numeroIso).val('');
				}else if (tipo == 'categorias'){
					jQuery('#listaCategorias'+numeroIso+'').val('');
				}else if ( tipo == 'direcciones'){
					jQuery('#listaDirecciones'+numeroIso+'').val('');
				}else if ( tipo == 'nombreEmpresa'){
					jQuery('#listaEmpresas'+numeroIso+'').val('');
				}else{
				jQuery('#listaCategorias'+numeroIso+'').val('');
				}
			
			
			textoiso="Ninguna opción seleccionada";
			}
					
		
		jQuery('#'+tipo+numeroIso+'_text').html(textoiso);

		if( (jQuery('#listaIso2').length || jQuery('#listaIso3').length) && jQuery('#busquedaIso').length == 0 && tipo == "ison"){
			// si es busqeda avanzada sacamos unos campos especificos diferentees
			if(	jQuery('#busquedaAvanzada').length ){
				cargaCamposEspecificos ('IM_GET_CAMPOS_ISO_BUSQUEDAS');
				
			}else{
			
				if( jQuery( ".id_de_iso" ).length ) {
				//incidencia que ponen, no rellena campos iso pq coge los de nivel 2, solucion solo lo haga a 3
					if ( numeroIso == 3 ){
					
						cargaCamposEspecificos ('IM_GET_CAMPOS_ISO');
					}
				}else{
				
					if( jQuery( ".presel" ).length ) {
					console.log("no ejecuta get campos iso");
					}else{cargaCamposEspecificos ('IM_GET_CAMPOS_ISO');}
				}
				
			}	
		}
		
		if( jQuery( ".id_de_iso" ).length && tipo == "ison") {
			PonQuitaCategorias('ison')
			console.log(2222222222222);
		}
		if ( tipo != 'direcciones'){
		limpiaAsignaCat();
		console.log(33333333333);
		}else{
		limpiaAsignaDir();
		}
	}
   

	 
	 function AsignaInputSubIso (numeroIso,tipo){
		var origen=numeroIso-1;
		var destino=numeroIso+1;
		var selections = jQuery('#'+tipo+origen).val();	
		if (!selections){	
				
			jQuery('#'+tipo+numeroIso+' optgroup').each(function(){
				jQuery(this).children().attr("selected",false);
				jQuery(this).remove();
					
			});	
			var textoiso="Ninguna opción seleccionada";				
			jQuery('#'+tipo+numeroIso+'_text').html(textoiso);
				
		}else{			
			jQuery('#'+tipo+numeroIso+' optgroup').each(function(){ 
				if( selections.indexOf(String(jQuery(this).data('group'))) === -1 ){
				//Remove the option from the DOM
					jQuery(this).children().attr("selected",false);
					jQuery(this).remove();
				} //if
			}); // each
		}//else
		jQuery('#'+tipo+numeroIso).selectpicker('refresh');	

	}

	////////////////// añade iso del formulario y lo carga
		function annadirBotonIso(globalCloneIso2globalCloneIso2,globalCloneIso3,tipo) {

			var IsoValue =jQuery("#"+tipo+"4").val();
			
			IsoValue=IsoValue.split("-");
			IsoValue=IsoValue[0].trim();
			IsoValueLongitud=IsoValue.length;
			

	//si lalongitud es 6, se añade 3 niveles de iso
			if (IsoValueLongitud == 6){
				var selected2 = [];
				jQuery('#'+tipo+'2 option:selected').each(function() {
					selected2.push(this.value ); 
				});
				
				var selected3 = [];
				jQuery('#'+tipo+'3 option:selected').each(function() {
					selected3.push(this.value ); 
				});
				//reiniciamos los select y le cargamos los datos que ya tienen
				cargayReiniciaSeleccionados(2,globalCloneIso2,selected2,tipo);
				cargayReiniciaSeleccionados(3,globalCloneIso3,selected3,tipo);
	
				// seleccionamos el input nuevo de nivel 1 
				var IsoValue1=IsoValue.slice(0,2);
				jQuery('#'+tipo+'1 option[value="' + IsoValue1 + '"]').prop("selected",true);
				
				jQuery('#'+tipo+'1').selectpicker('refresh');
				limpiaAsignaiso(1,tipo);
				
							
				// seleccionamos el input nuevo de nivel 2 
				var IsoValue2=IsoValue.slice(0,4);
				jQuery('#'+tipo+'2 option[value="' + IsoValue2 + '"]').prop("selected",true);
				AsignaInputSubIso (2,tipo);
				limpiaAsignaiso(2,tipo);
				
		
				// seleccionamos el input nuevo de nivel 3
				jQuery('#'+tipo+'3 option[value="' + IsoValue + '"]').prop("selected",true);
				AsignaInputSubIso (3,tipo);
				limpiaAsignaiso(3,tipo);


			}
			//si lalongitud es 4, se añade 2 niveles de iso
			if (IsoValueLongitud == 4){
			
				var selected2 = [];
				jQuery('#'+tipo+'2 option:selected').each(function() {
					selected2.push(this.value ); 
				});
				
				var selected3 = [];
				jQuery('#'+tipo+'3 option:selected').each(function() {
					selected3.push(this.value ); 
				});
			
				//reiniciamos los select y le cargamos los datos que ya tienen
				cargayReiniciaSeleccionados(2,globalCloneIso2,selected2,tipo);
				cargayReiniciaSeleccionados(3,globalCloneIso3,selected3,tipo);
			
				// seleccionamos el input nuevo de nivel 1 
				var IsoValue1=IsoValue.slice(0,2);
				jQuery('#'+tipo+'1 option[value="' + IsoValue1 + '"]').attr("selected",true);
				jQuery('#'+tipo+'1').selectpicker('refresh');
				limpiaAsignaiso(1,tipo);
				
				// seleccionamos el input nuevo de nivel 2 
				jQuery('#'+tipo+'2 option[value="' + IsoValue + '"]').attr("selected",true);
				AsignaInputSubIso (2,tipo);
				limpiaAsignaiso(2,tipo);
		

			}
		
		// deshabilitamos botones y vaciamos el campo
		jQuery('[name="ison3_botonAnnadirIso"]').prop('disabled', 'disabled');
		jQuery("#ison4").val('');
		jQuery(".mensaje p").html("");
		jQuery("#ison4").removeClass("obligatorio");
		}//annadirBotonIso
	
	//reinicia el html vacion y carga los elementos previamente seleccionados
	function cargayReiniciaSeleccionados (numeroIso,globalCloneIso,selected,tipo){
		jQuery('#'+tipo+numeroIso).html(globalCloneIso);	
		jQuery.each(selected, function( index, value ) {
			jQuery('#'+tipo+numeroIso+' option[value="' + value + '"]').attr("selected",true);
			jQuery('#'+tipo+numeroIso+' option[value="' + value + '"]').prop("selected",true);
		});
			
	
	}
	

 
   
	// cargamos el array con los options de 1 ,2 y 3 nivel
		var globalCloneIso1 = jQuery('#ison1 options');
		var globalCloneIso2 = jQuery('#ison2 optgroup');
		var globalCloneIso3 = jQuery('#ison3 optgroup');  
		var globalClone1 = jQuery('#categorias1 options');
		var globalClone2 = jQuery('#categorias2 optgroup');
		var globalClone3 = jQuery('#categorias3 optgroup'); 
			if( jQuery( ".id_de_iso" ).length) {
			limpiaAsignaiso (1,'ison')
			console.log(555555);
		}
				console.log("aqui1111111111");
		console.log(globalClone2);
		jQuery( '#ison3_botonAnnadirIso').click(function() {
			//jQuery( '#cargandoIso').removeClass('hidden');
		
			var IsoValue1 =jQuery("#ison4").val();
			annadirBotonIso(globalCloneIso2,globalCloneIso3,'ison');
					
			IsoValue1=IsoValue1.split("-");
			IsoValue1=IsoValue1[0].trim();
			IsoValueLongitud1=IsoValue1.length;

			muestraOcultaMensaje();
			
			if ( jQuery( ".insertarProducto" ).length  || jQuery( ".id_de_iso" ).length ) {
				PonQuitaCategorias('ison');
				PonQuitaCategorias('doc');
			}else{
				if ( jQuery( ".busquedaProaISO" ).length ) {
					console.log("no carga empresas");
				}else{cargaCamposSelectEmpresas ();}
			}
			
			//PonQuitaCategorias('ison');
			//PonQuitaCategorias('doc');
			//jQuery( '#cargandoIso').addClass('hidden');
		});
			var selected=[];
			cargayReiniciaSeleccionados(2,globalCloneIso2,selected,'ison');
			cargayReiniciaSeleccionados(3,globalCloneIso3,selected,'ison');	
			
			 
			
			AsignaInputSubIso (2,'ison');
			limpiaAsignaiso(2,'ison');
			AsignaInputSubIso (3,'ison');
			limpiaAsignaiso(3,'ison');
		//	PonQuitaCategorias('ison');
		
		jQuery('#ison1').on('change', function(){
		
			jQuery(".mensaje p").html("");
			jQuery("#ison4").removeClass("obligatorio");
			limpiaAsignaiso(1,'ison');
			//grabamos la lista input seleccionados de iso1 en un array
			var selections = jQuery('#ison1').val();
			// cargamos el todos los input de iso2
			var selected=[];
			cargayReiniciaSeleccionados(2,globalCloneIso2,selected,'ison');
			cargayReiniciaSeleccionados(3,globalCloneIso3,selected,'ison');	
			
			 
			
			AsignaInputSubIso (2,'ison');
			limpiaAsignaiso(2,'ison');
			AsignaInputSubIso (3,'ison');
			limpiaAsignaiso(3,'ison');
			muestraOcultaMensaje();

			PonQuitaCategorias('ison');
			PonQuitaCategorias('doc');
		});
	
		jQuery('#ison2').on('change', function(){
			limpiaAsignaiso(2,'ison');
			//grabamos la lista input seleccionados de iso1 en un array
			var selections = jQuery('#ison2').val();
			// cargamos el todos los input de iso3
			var selected=[];
			cargayReiniciaSeleccionados(3,globalCloneIso3,selected,'ison');	
		
			AsignaInputSubIso (3,'ison');
			limpiaAsignaiso(3,'ison');
			muestraOcultaMensaje();
			if ( jQuery( ".insertarProducto" ).length ) {
			PonQuitaCategorias('ison');
			PonQuitaCategorias('doc');
	}
	});

		jQuery('#ison3').on('change', function(){
		console.log("change33333333")
			limpiaAsignaiso(3,'ison');
			muestraOcultaMensaje();
			// SI ES  ALTA O MODIFICACION NO BUSQUEDA AVANZADA
			if ( jQuery( ".insertarProducto" ).length ) {
				PonQuitaCategorias('ison');
				PonQuitaCategorias('doc');
			}else{
				if ( jQuery( ".busquedaProaISO" ).length ) {
					console.log("no carga empresas");
				}else{cargaCamposSelectEmpresas ();}
			}
			
		});
	
///// definimos para categorias
	// cargamos el array con los options de 1 ,2 y 3 nivel
		 
		// cargamos el array con los options de 1 ,2 y 3 nivel
		  
		var selected=[];
		console.log("aqui222222");
		console.log(globalClone2);
		cargayReiniciaSeleccionados(2,globalClone2,selected,'categorias');
		cargayReiniciaSeleccionados(3,globalClone3,selected,'categorias');	
		AsignaInputSubIso (2,'categorias');
		limpiaAsignaiso(2,'categorias');
		AsignaInputSubIso (3,'categorias');
		limpiaAsignaiso(3,'categorias');
		jQuery('#categorias1').on('change', function(){
			jQuery(".mensaje p").html("");
			limpiaAsignaiso(1,'categorias');
			//grabamos la lista input seleccionados de iso1 en un array
			var selections = jQuery('#categorias1').val();
			// cargamos el todos los input de iso2
			var selected=[];
			cargayReiniciaSeleccionados(2,globalClone2,selected,'categorias');
			cargayReiniciaSeleccionados(3,globalClone3,selected,'categorias');	
			
			 
			
			AsignaInputSubIso (2,'categorias');
			limpiaAsignaiso(2,'categorias');
			AsignaInputSubIso (3,'categorias');
			limpiaAsignaiso(3,'categorias');
			muestraOcultaMensajeCategorias();
		});
	
		jQuery('#categorias2').on('change', function(){
			limpiaAsignaiso(2,'categorias');
			//grabamos la lista input seleccionados de iso1 en un array
			var selections = jQuery('#categorias2').val();
			// cargamos el todos los input de iso3
			var selected=[];
			cargayReiniciaSeleccionados(3,globalClone3,selected,'categorias');	
		
			AsignaInputSubIso (3,'categorias');
			limpiaAsignaiso(3,'categorias');
			muestraOcultaMensajeCategorias();

		});

		jQuery('#categorias3').on('change', function(){
			limpiaAsignaiso(3,'categorias');
			muestraOcultaMensajeCategorias();

		});
	
// si hay una modificacion inicimos los datos que vengan cargados para iso y categorias
		if (jQuery('[name="accionProd"]').val() == "modificar" || jQuery('[name="insertaDoc"]').val() == "0"){
		
					limpiaAsignaiso(1,'ison');
					//grabamos la lista input seleccionados de iso1 en un array
					var selections = jQuery('#ison1').val();
					// cargamos el todos los input de iso2
					var selected=[];
					cargayReiniciaSeleccionados(2,globalCloneIso2,selected,'ison');
					cargayReiniciaSeleccionados(3,globalCloneIso3,selected,'ison');	
					
					 
					
					AsignaInputSubIso (2,'ison');
					limpiaAsignaiso(2,'ison');
					AsignaInputSubIso (3,'ison');
					limpiaAsignaiso(3,'ison');
					
					limpiaAsignaiso(1,'categorias');
					//grabamos la lista input seleccionados de categorias1 en un array
					var selections = jQuery('#categorias1').val();
					// cargamos el todos los input de iso2
					var selected=[];
					cargayReiniciaSeleccionados(2,globalClone2,selected,'categorias');
					cargayReiniciaSeleccionados(3,globalClone3,selected,'categorias');	
					
					 
					
					AsignaInputSubIso (2,'categorias');
					limpiaAsignaiso(2,'categorias');
					AsignaInputSubIso (3,'categorias');
					limpiaAsignaiso(3,'categorias');			
							
					

		}

		
							var optionsIso = {
								url: function(phrase) {
								return HttpCgiPath + "?IdcService=IM_GET_JSON_PROA_ALTA_PHRASE_TEMPLATE";
								},

								getValue: function(element) {
									return element.nombre;
								},

								ajaxSettings: {
									dataType: "json",
									method: "GET",
									data: {
										dataType: "json"
									}
								},

								preparePostData: function(data) {

									data.phrase = jQuery("#ison4").val();

									return data;
								},list: {
									match: {
										enabled: true
									},
									maxNumberOfElements: 20,
									onHideListEvent:function() {
										
										var idInput = "#ison4"
													
										
											var inputObjetivo = idInput.split('_')[2];
											var textoInput = jQuery(idInput).val();
											if (textoInput == "" ){
											jQuery('[name="ison3_botonAnnadirIso"]').prop('disabled', 'disabled');
											}else{
											jQuery('[name="ison3_botonAnnadirIso"]').removeProp('disabled');
											
											}
										
									},
								
								
								},

								requestDelay: 400
							};
							$(document).ready(function(){
								jQuery("#ison4").easyAutocomplete(optionsIso);
							});
							

							
	function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}
		function clearCookies (names) {
	var i = 0, namesLength = names.length;
	for (i; i < namesLength; i += 1) {
		document.cookie = names[i] + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
	}
}
		
				
							
							
							// cargamos los resultados en la pagina de busqueda para una categoria o iso
	$('document').ready(function(){
	irArriba();
	if ( jQuery( ".listadoDepar" ).length ) {
	// datatable de listado producto-departamento
 jQuery.fn.dataTable.ext.search.push(
    function( settings, searchData, index, rowData, counter ) {
      var position = jQuery( "#estadoProd option:selected" ).text();
      var office = jQuery( "#office option:selected" ).text();

      // Display the row if both inputs are empty
      if (position.length ===0 && office.length === 0) {
        return true;
      }
      
      // Display row if position matches position selection
      hasPosition = true;
      
      if (position !== searchData[1]) {
        hasPosition = false; //Doesn't match - don't display
      }
      
      // Display the row if office matches the office selection
      hasOffice = true;
 
      if (office !== searchData[2]) {
        hasOffice = false; //Doesn't match - don't display
      }

      // If either position or office matched then display the row        
      return true ? hasPosition || hasOffice : false;
    });
 
   var table = jQuery('.listadoDepar').DataTable( {
	        initComplete: function () {
            this.api().columns([1]).every( function () {
                var column = this;
                var select = jQuery('<select><option value=""></option></select>')
                    .appendTo( jQuery(column.header()).empty() )
                    .on( 'change', function () {
                      jQuery('.listadoDepar').DataTable().draw();
                    } );
 
                column.data().unique().sort().each( function ( d, j ) {
                    select.append( '<option value="'+d+'">'+d+'</option>' )
                } );
            } );
        },
        orderCellsTop: true,
        fixedHeader: true,
		"ordering": true,
    columnDefs: [{
      orderable: false,
      targets: "no-sort"
    }],
	"aoColumns" : [
            { sWidth: '40%' },
            { sWidth: '5%' },
            { sWidth: '50%' },

        ],
	"aLengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Todos"]],
		"dom": "l<'#myFilter'>frtip",
		 "rowReorder": true,
		 "language": {
      "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
    }
    } );
	
      }        
   	
		$(document).on('change', '.compruebaResultadoChecked', function() {
			if ( jQuery(".listadoResultado").hasClass("jplist-hidden") ) 
				{
					jQuery(".listadoResultadoSin").removeClass("hidden");	
				}else{
					jQuery(".listadoResultadoSin").addClass("hidden");	
				}
		});
		
		
		$(document).on('change', '.compruebaResultados', function() {
			
			var padre="";
			
			// al hacer cclik en una categoria  si no hay resultados  muestra un p con la frane no hay coincidencias
								
				var padre =jQuery(this).data('padre');
				console.log(jQuery(this).attr('id')+"--------"+padre);
				if ( padre != "cat_0" ){
					var numc=0;
					jQuery("."+padre).each(function() {
						if(jQuery(this).is(':checked')){numc=1;}
					});
					
					if (numc == 0 ){
						jQuery("#"+padre).prop('checked', false);
						jQuery("#"+padre).trigger('change');		
						var padre =jQuery("#"+padre).data('padre');
								
							if ( padre != "cat_0" ){
								var numc=0;
								jQuery("."+padre).each(function() {
									if(jQuery(this).is(':checked')){numc=1;}
								});
								
								if (numc == 0 ){
									jQuery("#"+padre).prop('checked', false);
									jQuery("#"+padre).trigger('change');		
									var padre =jQuery("#"+padre).data('padre');
								}
							}
					}
				}
				if ( jQuery(".listadoResultado").hasClass("jplist-hidden") ) 
				{
					jQuery(".listadoResultadoSin").removeClass("hidden");	
				}else{
					jQuery(".listadoResultadoSin").addClass("hidden");	
				}
			});
		
			if ($('#enExpo').is(':checked')) {
			$("#descripcion").attr("onkeyup","");
			$("#descripcion").attr("onblur","");
			 $("label[for='descripcion']").html('Descripción del Producto:');
			}
			
			$('#enExpo').change(function() {
				
				if(this.checked) {
				
				 $("label[for='descripcion']").html('Descripción del Producto:');
				
					$("#descripcion").attr("onkeyup","");
					$("#descripcion").attr("onblur","");
				}else{
				 $("label[for='descripcion']").html('<abbr title="obligatorio">*</abbr> Descripción del Producto:');
				
					$("#descripcion").attr("onkeyup","mostrarOcultarMensaje(this)");
					$("#descripcion").attr("onblur","mostrarOcultarMensaje(this)");
					}
			})
		
		
		
		$('#todos,#productos,#empresas,#productosiso,#productoscat').keypress(function( event ) {
    var value = $(this).val().length;
	

   	 if (value >= 3)
		{
		$("#menBuscar").addClass('hidden');
		$("#buscar").removeAttr('disabled');
		}else if (value == 0){
			$("#menBuscar").addClass('hidden');
			$("#buscar").attr('disabled', true);
			$("#buscarcat").attr('disabled', true);
			$("#buscariso").attr('disabled', true);
		}else{
		$("#menBuscar").removeClass('hidden');
		$("#buscar").attr('disabled', true);
		$("#buscarcat").attr('disabled', true);
		$("#buscariso").attr('disabled', true);
		}
});
	
		if ( $("#busquedaPorId").val() == 1 ){
			var tipo =$("#busquedaPorId_tipo").val();
			var template =$("#busquedaPorId_template").val();
			buscarJson (template,tipo);
			}

			if ( $( "#demo_productos_empresas" ).length ) {
				buscarJson ('IM_RESULTADOS_PROA_CONTIENEN_EMPRESA_TEMPLATE_JSON','productos_empresas');
		 
			}
	
	
	$('#todos','#productos','#empresas','#productosiso','#productoscat').focus();	
	
	$("#myInputenexpo").on("keyup", function() {
	var value = $(this).val().toLowerCase();
		$("#enexpo tr").filter(function() {
		 $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});
	
	$("#myInputinactivo").on("keyup", function() {
  var value = $(this).val().toLowerCase();
		$("#inactivos tr").filter(function() {
		 $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});
	
	$("#myInputborrador").on("keyup", function() {
	var value = $(this).val().toLowerCase();
		$("#borrador tr").filter(function() {
		 $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});	
		if ($("#nombre").length > 0 ){
			if ($("#nombre").val().length > 0  ){
				var textoTitulo=$("#nombre").val();
				if ($("#modelo").length > 0 ){
					if ($("#modelo").val().length > 0 ){
						textoTitulo = textoTitulo+" - "+$("#modelo").val();
					}
				}
				// console.log("("+textoTitulo+")")
				$("#ceapat").append(" ("+textoTitulo+")");
			}
		}
		// Para ocultar la ficha de caracteristicas si no tiene contenido ->
		// miramos si el html esta vacio o si  pone sin datos y ocultamos el tab2 que es el suyo  lo hacemos si existe la clase contenidoFichaTab 
		// que exista implica que estamos en ficha de  producto.
		if ($(".contenidoFichaTab")[0]){
			// hacer  class exists
			var contenidoFicha=$(".fichaCaracteristicas").text().trim();
			if ( contenidoFicha == '' ||  contenidoFicha == "sin datos" ){
				$(".contenidoFichaTab").hide();
			}
		} 
		$(".contenidoFichaTabEmpresas").each(function(){
			var id_contenido= $(this).attr("aria-controls");
		var contenidoFicha=$("#"+id_contenido).text().trim();
			if ( contenidoFicha == '' ||  contenidoFicha == "sin datos" ){
				$(this).hide();
			}
		})
		$(".contenidoFichaTab").each(function(){
			var id_contenido= $(this).attr("aria-controls");
		var contenidoFicha=$("#"+id_contenido).text().trim();
			if ( contenidoFicha == '' ||  contenidoFicha == "sin datos" ){
				$(this).hide();
			}
		})
		// js de los desplegables
		$('#accordionEmpresa h4').each(function(idx){
				$(this).attr('tabindex',0);
				$(this).attr({title:"Mostrar contenido"});
				/*$(this).next().addClass('oculto');*/
				$(this).bind('click', function(e){
					if($(this).hasClass('desplegado')){
						$(this).removeClass('desplegado').next().hide().addClass('oculto').show();
						$(this).attr({title:"Mostrar contenido"});
					}else{
						$(this).addClass('desplegado').next().hide().removeClass('oculto').slideDown('slow');
						$(this).attr({title:"Ocultar contenido"});
					}
				}).bind('mousedown', function(e){
					$(this).data('mouseDown', true);
				}).bind('mouseup', function(e){
					$(this).removeData('mouseDown');
				}).bind('focus', function(e){
					if (!$(this).data('mouseDown')){
						$(this).trigger('click');
					}
				});
			});
$('#accordionEmpresa h4 + div').bind('focusin', function(e){
	if(!$(this).prev().hasClass('desplegado')){
	$(this).prev().addClass('desplegado').next().hide().removeClass('oculto').slideDown('slow');
	}
});
	if (jQuery(".seccionesContenedor")[0]){
    jQuery(".seccionesContenedor").sortable({
        tolerance: 'pointer',
        revert: 'invalid',
		forceHelperSize: true,
        stop : function(event, ui){
		var arrays= jQuery(this).sortable('serialize').replace("&", "").split('seccion[]=');
		var orden="";
		console.log(arrays);
		for (var i = 1; i < arrays.length; i++) {
			orden=orden+arrays[i]+',';
			
		}
		jQuery('#ordenSeccionesHay').val(orden);
         // substring(siteId.indexOf("/") + 1);
        }
    });
	
}
	
	jQuery('.miracomillas').keypress(function(tecla)

   {
console.log('presiona camillas');
    //  if( tecla.charCode == 39 || tecla.charCode == 34)

      //{
		//console.log('presiona camillas1');
         //return false;

      //}else{
	  
	  var dInput = this.value;
    console.log(tecla);
	 
		  var letters = /^[A-Za-z]+$/;
		  var letters =/[a-z0-9ñçáéíóú\s]/i;
		  if(tecla.key.match(letters))
		  {
			console.log("es letra");
			return true;
		  }
		  else 
		  {
		    console.log('no es letra');
			if( tecla.charCode == 46 || tecla.charCode == 44)

					  {
						console.log('presiona camillas1');
						 return true;

					  }else{return false;}
			
			
			
		  }
		  
	 
	  
	 // }

	});
	
	    jQuery(document).on('click', '#selTodosInforme', function() {
  console.log("selecciona informe todos")
    if (jQuery(this).val() == 'Seleccionar todos') {
      jQuery('.es_informe').prop('checked', true);
      jQuery(this).val('Deseleccionar todos');
    } else {
      jQuery('.es_informe').prop('checked', false);
      jQuery(this).val('Seleccionar todos');
    }
  });
  
  	jQuery(document).on('click', '#GeneraInforme', function() {
	var idsInformes="";
			jQuery("input:checkbox[class=es_informe]:checked").each(function () {
			idsInformes+=jQuery(this).val()+",";
            console.log("Id: " + jQuery(this).attr("id") + " Value: " + jQuery(this).val());
			
    });
	idsInformes=idsInformes.slice(0, -1)
	jQuery("#GeneraInforme").attr('data-cual',idsInformes);
	if (siteId.indexOf("SIPA") != -1) {
	window.open( "/sipa_01//prod/informeHtml/index.htm?ids="+idsInformes);
	}
	if (siteId.indexOf("CATALOGO") != -1) {
	window.open( "/catalogo_01//prod/informeHtml/index.htm?ids="+idsInformes);
	}
  
  });
  
  jQuery('#exampleModalCenter').on('show.bs.modal', function (event) {
console.log(333333);
  var button = jQuery(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  console.log("11111"+recipient);
  var modal = jQuery(this)
  modal.find('.modal-title').text('Añadir ' + recipient)
 // modal.find('.modal-body input').val(recipient)
})

//Toltip de documentos con la informacion
jQuery('[data-toggle="tooltip"]').tooltip();  
	});
	
	function enviarProdPapelera(id,template,tipo){
	// ser utiliza para todos los servicios docuemntos productos empresas, etc etc
	
		var respuesta="";
		
		if (tipo == "PRODUCTO" ){	var texto ="¿Desea dejar inactivo el producto? ";	}
		else if ( tipo == "PRODUCTO_RECUPERA" ) {var texto ="¿Desea activar producto?";	}
		else if ( tipo == "PRODUCTO_PUBLICA" ) {var texto ="¿Desea publicar producto?";	}
		else if ( tipo == "EMPRESA" ) {var texto ="¿Desea mandar a la papelera la empresa?";}
		else if ( tipo == "EMPRESA_RECUPERA" ) {var texto ="¿Desea sacar de la papelera la empresa?";	}
		else if ( tipo == "PRODUCTO_BORRA" ) {var texto ="¿Desea eliminar definitivamente el producto?";	}
		else if ( tipo == "EMPRESA_BORRA" ) {var texto ="¿Desea eliminar definitivamente la empresa?";	}
		else if ( tipo == "DOC_BORRA" ) {var texto ="¿Desea eliminar definitivamente el documento?";	}
		else if ( tipo == "CON_BORRA" ) {var texto ="¿Desea eliminar definitivamente el contacto?";	}
		else { respuesta = false;}
	
		respuesta = confirm(texto);
		if (respuesta) {
			console.log(tipo);
			console.log(template);
			var request = jQuery.ajax({
				url: HttpCgiPath + "?IdcService="+template,
				type: 'POST',
				data: { id: id,TIPO:tipo} ,
				error: function (jqXHR, exception) {
					var msg = '';
					if (jqXHR.status === 0) {
						msg = 'Not connect.\n Verify Network.';
					} else if (jqXHR.status == 404) {
						msg = 'Requested page not found. [404]';
					} else if (jqXHR.status == 500) {
						msg = 'Internal Server Error [500].';
					} else if (exception === 'parsererror') {
						msg = 'Requested JSON parse failed.';
					} else if (exception === 'timeout') {
						msg = 'Time out error.';
					} else if (exception === 'abort') {
						msg = 'Ajax request aborted.';
					} else {
						msg = 'Uncaught Error.\n' + jqXHR.responseText;
					}
					jQuery('#mensaje').html('<strong>ocurrio un error, consulte con el administrador:' +msg+'</strong>');
					},
					success: function (data) {

					//ok se reenvia a la papelera
						if (data == 0 ){
							if (tipo == "PRODUCTO" || tipo == "EMPRESA" ){
							alert("¡Se desactivó  correctamente!");
							window.location.replace(jQuery('#url_papelera').val());	
						console.log(jQuery('#url_papelera').val());
							}else if ( tipo == "DOC_BORRA"  || tipo == "PRODUCTO_BORRA" || tipo == "EMPRESA_BORRA" ) {
							alert("¡Se eliminó correctamente!");
							location.reload();
							}else if (  tipo == "PRODUCTO_RECUPERA" || tipo == "EMPRESA_RECUPERA" ) {
							alert("¡Se activó correctamente!");
							location.reload();
							}else if (  tipo == "PRODUCTO_PUBLICA" ) {
							alert("¡Se publicó correctamente!");
							location.reload();
							}else if (  tipo == "CON_BORRA" ) {
							alert("¡Se eliminó correctamente el contacto!");
							if (siteId.indexOf("SIPA") != -1) {
							jQuery(location).attr('href','/sipa_01/empr/dircontacto/index.htm')
							}
							if (siteId.indexOf("CATALOGO") != -1) {
							jQuery(location).attr('href','/catalogo_01/empr/dircontacto/index.htm')
							}
							}
							else { jQuery('#mensaje').html('<strong>ocurrió un error, consulte con el administrador</strong>');}
					
						
						}else{
							jQuery('#mensaje').html('<strong>ocurrio un error al enviar a la papelera , consulte con el administrador</strong>');
						}
								
					}	
			});	
		}
	}
	
	function enviarPapeleraTodos(template,tipo){
		var respuesta="";
		
		if ( tipo == "PRODUCTO_RECUPERA" ) {
		var texto ="¿Desea sacar de la papelera TODOS los producto?";	
		}
		else if ( tipo == "EMPRESA_RECUPERA" ) {
		var texto ="¿Desea sacar de la papelera TODAS las empresa?";	
		}
		else if ( tipo == "PRODUCTO_BORRA" ) {
		var texto ="¿Desea eliminar definitivamente TODOS los producto?";	
		}
		else if ( tipo == "EMPRESA_BORRA" ) {
		var texto ="¿Desea eliminar definitivamente TODAS las empresa?";	
		}
		else{ respuesta = false;}
	
		respuesta = confirm(texto);
		if (respuesta) {
			jQuery('#listado > tbody > tr').each(function(){
				var id_elem =jQuery(this).attr('id');
				var request = jQuery.ajax({
					url: HttpCgiPath + "?IdcService="+template,
					type: 'POST',
					data: { id: id_elem,TIPO:tipo} ,
					error: function (jqXHR, exception) {
						var msg = '';
						if (jqXHR.status === 0) {
							msg = 'Not connect.\n Verify Network.';
						} else if (jqXHR.status == 404) {
							msg = 'Requested page not found. [404]';
						} else if (jqXHR.status == 500) {
							msg = 'Internal Server Error [500].';
						} else if (exception === 'parsererror') {
							msg = 'Requested JSON parse failed.';
						} else if (exception === 'timeout') {
							msg = 'Time out error.';
						} else if (exception === 'abort') {
							msg = 'Ajax request aborted.';
						} else {
							msg = 'Uncaught Error.\n' + jqXHR.responseText;
						}
						jQuery('#mensaje').html('<strong>ocurrio un error , consulte con el administrador:' +msg+'</strong>');
						},
						success: function (data) {

						
						//ok se reenvia a la papelera
							if (data == 0 ){
								jQuery("#"+id_elem).hide();
									if ( tipo == "PRODUCTO_RECUPERA" ) {
										var texto ='<strong>Restaurado producto con id : '+id_elem+' </strong></br>';	
									}
									else if ( tipo == "EMPRESA_RECUPERA" ) {
										var texto ='<strong>Restaurado empresa con id : '+id_elem+' </strong></br>';	
									}
									else if ( tipo == "PRODUCTO_BORRA" ) {
										var texto ='<strong>Borrado producto con id : '+id_elem+' </strong></br>';	
									}
									else if ( tipo == "EMPRESA_BORRA" ) {
										var texto ='<strong>borrada empresa con id : '+id_elem+' </strong></br>';	
									}
								jQuery('#mensaje').append(texto);
							}else{

								jQuery('#mensaje').append('<strong>ocurrio con '+id_elem+' , consulte con el administrador</strong></br>');
							}
									
						}	
				});	
			
			
			});

		}
	}
function annadirDocumentosIsoNuevo (parametro){
console.log("sacamos documentos");
ID_PROD=jQuery('#id').val();
	jQuery.ajaxSetup({async: false}); 
	jQuery.ajax({
				url: HttpCgiPath + "?IdcService=IM_GET_HTML_DOCUMENTOS_ISO",
				type: 'POST',
				data: { parametros: parametro,ID_PROD:ID_PROD} ,
				error: function (jqXHR, exception) {
					var msg = '';
					if (jqXHR.status === 0) {
						msg = 'Not connect.\n Verify Network.';
					} else if (jqXHR.status == 404) {
						msg = 'Requested page not found. [404]';
					} else if (jqXHR.status == 500) {
						msg = 'Internal Server Error [500].';
					} else if (exception === 'parsererror') {
						msg = 'Requested JSON parse failed.';
					} else if (exception === 'timeout') {
						msg = 'Time out error.';
					} else if (exception === 'abort') {
						msg = 'Ajax request aborted.';
					} else {
						msg = 'Uncaught Error.\n' + jqXHR.responseText;
					}
					ejecuta=0;
					},
					success: function (data) {
						if ( data != 0 ){
						jQuery('.docContent').html(data);
						
						}	
				}
	
	});	
}
////////////////// añade las categorias de una iso onchange iso pone categorias 
	function annadirCategoriasdeIsoNuevo(globalClone1,globalClone2,globalClone3,tipo,parametro) {
	console.log(44444444444);
		var ejecuta;
		jQuery.ajaxSetup({async: false}); 
		jQuery.ajax({
				url: HttpCgiPath + "?IdcService=IM_GET_CATEGORIAS_DE_ISO",
				type: 'POST',
				data: { parametros: parametro} ,
				error: function (jqXHR, exception) {
					var msg = '';
					if (jqXHR.status === 0) {
						msg = 'Not connect.\n Verify Network.';
					} else if (jqXHR.status == 404) {
						msg = 'Requested page not found. [404]';
					} else if (jqXHR.status == 500) {
						msg = 'Internal Server Error [500].';
					} else if (exception === 'parsererror') {
						msg = 'Requested JSON parse failed.';
					} else if (exception === 'timeout') {
						msg = 'Time out error.';
					} else if (exception === 'abort') {
						msg = 'Ajax request aborted.';
					} else {
						msg = 'Uncaught Error.\n' + jqXHR.responseText;
					}
					ejecuta=0;
					},
					success: function (data) {
					if ( data != 0 ){
						data=data.substring(1);
						data=data.replace(/ /g, "")
						data=data.split("-");
						var listaId=data[0];
						var listaJer=data[1];	
						listaJer = listaJer.substring(1);
						var myarrayId = listaId.split(',');
						var myarrayJer = listaJer.split(',');
						
						console.log(listaId);
						console.log(listaJer);
						ejecuta = 1;	
							var selected=[];
								jQuery('#'+tipo+'1 option').attr("selected",false);
								for(var i = 0; i < myarrayId.length; i++)
								{
								console.log(myarrayId[i]+"-----"+myarrayJer[i]);
									if (myarrayId[i] == 1 && myarrayId[i] != ""){							
										jQuery('#categorias1 option[value="' + myarrayJer[i] + '"]').prop('selected', true);
									}
								  
								}
								
								
								limpiaAsignaiso(1,'categorias');
								jQuery('#categorias1').selectpicker('refresh');	
								jQuery('#'+tipo+'2 option').prop("selected",false);
								var selected2 = [];
								for(var i = 0; i < myarrayId.length; i++)
								{
								
									if ( myarrayId[i] == 2 && myarrayId[i] != "" ){
										selected2.push(myarrayJer[i] ); 
										
									}
								  
								}
								cargayReiniciaSeleccionados(2,globalClone2,selected2,'categorias');
								AsignaInputSubIso (2,tipo);
								limpiaAsignaiso(2,tipo);			
								jQuery('#categorias2').selectpicker('refresh');
								jQuery('#'+tipo+'3 option').prop("selected",false);
								var selected3 = [];
								for(var i = 0; i < myarrayId.length; i++)
								{
									if ( myarrayId[i] == 3 && myarrayId[i] != "" ){
										selected3.push(myarrayJer[i] ); 
									}
								  
								}
								cargayReiniciaSeleccionados(3,globalClone3,selected3,'categorias');
								AsignaInputSubIso (2,tipo);
								limpiaAsignaiso(2,tipo);
								jQuery('#categorias2').selectpicker('refresh');
								AsignaInputSubIso (3,tipo);
								limpiaAsignaiso(3,tipo);
								jQuery('#categorias3').selectpicker('refresh');
								
					}else{
								var selected=[];
								
								jQuery('#categorias1 option').prop("selected",false);
								jQuery('#categorias2 option').prop("selected",false);
								jQuery('#categorias13 option').prop("selected",false);
								
								jQuery('#categorias1 option').attr("selected",false);
								jQuery('#categorias2 option').attr("selected",false);
								jQuery('#categorias13 option').attr("selected",false);
								cargayReiniciaSeleccionados(2,globalClone2,selected,'categorias');
								cargayReiniciaSeleccionados(3,globalClone3,selected,'categorias');
								jQuery('#categorias1').selectpicker('refresh');	
								jQuery('#categorias2').selectpicker('refresh');	
								jQuery('#categorias3').selectpicker('refresh');	
								limpiaAsignaiso(1,'categorias');
								limpiaAsignaiso(2,'categorias');
								limpiaAsignaiso(3,'categorias');
								
								AsignaInputSubIso (2,'categorias');
								limpiaAsignaiso(2,'categorias');
								AsignaInputSubIso (3,'categorias');
								limpiaAsignaiso(3,'categorias');
					}	
				}
	
			});			
	}//annadirCategoriasdeIsonuevo
		
	// añade los campos especificos de una iso	
		function cargaCamposEspecificos (template){
		var ids_isos = jQuery('#listaIso2').val()+jQuery('#listaIso3').val();
		ids_isos=ids_isos.slice(0,-1);
				jQuery.ajax({
				url: HttpCgiPath + "?IdcService="+template,
				type: 'POST',
				data: { ids_isos: ids_isos, id:jQuery('#id').val()} ,
				error: function (jqXHR, exception) {
					var msg = '';
					if (jqXHR.status === 0) {
						msg = 'Not connect.\n Verify Network.';
					} else if (jqXHR.status == 404) {
						msg = 'Requested page not found. [404]';
					} else if (jqXHR.status == 500) {
						msg = 'Internal Server Error [500].';
					} else if (exception === 'parsererror') {
						msg = 'Requested JSON parse failed.';
					} else if (exception === 'timeout') {
						msg = 'Time out error.';
					} else if (exception === 'abort') {
						msg = 'Ajax request aborted.';
					} else {
						msg = 'Uncaught Error.\n' + jqXHR.responseText;
					}
					jQuery('#mensaje').html('<strong>ocurrio un error al cargar campos especificos , consulte con el administrador:' +msg+'</strong>');
					},
					success: function (data) {
						jQuery('#camposEspecificos').html(data);
						
						jQuery('.iso_select_multiple').each(function() {
						jQuery(this).selectpicker('refresh');
						cargaValoresSelecteEspeIso (this.id);
						});
						jQuery('.jer_select_multiple').each(function() {
						jQuery(this).selectpicker('refresh');
						
						});
					}	
			});
		
		
		}
		// funcion viene no tiene en cuenta los  filtros por lo que daba error la dejo duarnate un tiempo 31/01/2020
		// habra que borrarlo
	function cargaEnNueva(href,url,id,tipo,target,estado) {
		if ( tipo == 'PRODUCTO' ){
		console.log(estado);
			if ( estado == 'ACTIVO'){listado_productos=jQuery("#lista_navegacion_productos_activos").val();}
			else if  ( estado == 'INACTIVO'){listado_productos=jQuery("#lista_navegacion_productos_inactivos").val();}
			else if   ( estado == 'BORRADOR'){listado_productos=jQuery("#lista_navegacion_productos_borrador").val();}
			else if   ( estado == 'ACTIVO_PRODUCTOS' ){listado_productos=jQuery("#lista_navegacion_productos").val();
				console.log("AAAAA"+listado_productos);
			}
			else if   ( estado == '' ){listado_productos=jQuery("#lista_navegacion_productos").val();}
			else{listado_productos=jQuery("#lista_navegacion_productos").val();}
		
		}
		else{
		listado_productos=jQuery("#lista_navegacion_empresas").val();}
		
		
		listado_productos=listado_productos.split(',');
		var index = listado_productos.indexOf(id);
		jQuery('#abreNuevo').attr('target',target);
		jQuery("#lista_navegacion_url").val(url);
		jQuery('#abreNuevo').attr('action',href);
		jQuery('#siguiente_id').val(listado_productos[index+1]);
		jQuery('#anterior_id').val(listado_productos[index-1]);
		jQuery('#abreNuevo').submit();
	
	return false;
	
	} 
	function cargaEnNueva2(href,url,id,tipo,target,estado) {
		if (estado != 'nave' && estado != 'navp'){
			var listado_productos ="";
			
			
			if( tipo == "EMPRESA"){
				jQuery('.list-item-empresa').each(function(i)
				{
					console.log(jQuery(this).attr('id')); 
					listado_productos=listado_productos+','+jQuery(this).attr('id');
				});
				
			}else{
			
				jQuery('.list-item').each(function(i)
				{
					console.log(jQuery(this).attr('id')); 
					listado_productos=listado_productos+','+jQuery(this).attr('id');
				});
				
			}
			listado_productos = listado_productos.substring(1);
			jQuery("#lista_navegacion").val(listado_productos);
			listado_productos=listado_productos.split(',');
		}else{
			if ( estado == "nave"){
				console.log(jQuery("#lista_navegacion_guarda").val());
				jQuery("#lista_navegacion").val(jQuery("#lista_navegacion_guarda").val());
			}
			listado_productos=jQuery("#lista_navegacion").val();
			listado_productos=listado_productos.split(',');
		}
		
		
		
		var index = listado_productos.indexOf(id);
		jQuery('#abreNuevo').attr('target',target);
		jQuery("#lista_navegacion_url").val(url);
		jQuery('#abreNuevo').attr('action',href);
		jQuery('#siguiente_id').val(listado_productos[index+1]);
		jQuery('#anterior_id').val(listado_productos[index-1]);
		console.log('abre bnuevo'); 
		jQuery('#abreNuevo').submit();
	return false;
	
	} 
	// carga los valores de la iso multiples en selectpicker
	function cargaValoresSelecteEspeIso (id) {
		jQuery('#datos_'+id).html('');
		
		var texto ="<ul>";
		var hay=0;
		var values="";
		jQuery('#'+id+' option:selected').each(function() {
		hay=1;
		texto+='<li >'+this.text+'</li>';
		values+=this.value+",";
		});
		texto +="</ul>";
		if ( hay == 1 ){
		values=values.slice(0,-1);
		var hay ='<p>Seleccionados para '+jQuery('#datos_'+id).attr('data-tipo')+':</p>';
		jQuery('#'+id+'_LISTADO').attr('value',values);
		}else{
		jQuery('#'+id+' option').each(function() {
		jQuery(this).prop("selected",false);
		jQuery(this).attr("selected",false);
		jQuery('#'+id+'_LISTADO').attr('value','');
		});
		
		
		var hay ='<p>Ninguno seleccionado</p>';}
		jQuery('#datos_'+id).html(hay+texto);

	}
	// abre un modal
	  jQuery('.abreModal').click(function(e){
				 
          e.preventDefault();
					var id = this.id;
          var splitid = id.split('_');
          var empresaid = splitid[1];
					var template ="IM_GET_RESUMEN_EMPRESA"
          // AJAX request
          jQuery.ajax({
           url: HttpCgiPath + "?IdcService="+template,
            type: 'POST',
            data: {id: empresaid,
						URLImagenes:URLImagenes,
						urlInfo:jQuery("#url_info").val(),
						},
            success: function(response){ 
              // Add response in Modal body
              jQuery('.modal-body-carga').html(response); 
              // Display Modal
							jQuery('#empModal').appendTo("body").modal('show');
             
            }
          });
     });	
		// abre un modal
		
		function cargaContenidoLocalidad(idSelectOrigen, listadoSelects, localidad,provincia) {
				var posicionSelectDestino = buscarEnArray(listadoSelects, idSelectOrigen) + 1;
				var idSelectDestino = listadoSelects[posicionSelectDestino];
				var selectOrigen = document.getElementById(idSelectOrigen); 
				var opcionSeleccionada = provincia;
			var selectDestino = document.getElementById(idSelectDestino);
			servicio = "IM_GET_PROA_LOCALIDAD";	
			var strListadoSelects = "";
			for (i = 0; i < listadoSelects.length; i++) {
				strListadoSelects += listadoSelects[i] + ",";
			}
			strListadoSelects = strListadoSelects.substring(0, strListadoSelects.length - 1);			
			//var ajax=nuevoAjax();
			var ajax = new XMLHttpRequest();
			var url = HttpCgiPath + "?IdcService=IM_CAMPOS_DEPENDIENTES_TEMPLATE" + unescape("&") + "listadoSelects=" + strListadoSelects + unescape("&") + "servicio=" + servicio + unescape("&") + "select=" + idSelectDestino + unescape("&") + "opcion=" + encodeURI(opcionSeleccionada) + unescape("&") + "sufijoIdioma=" + sufijoIdioma;
			ajax.open("GET", url, true);
			//ajax.send();
			ajax.onreadystatechange = function() {
				//if (ajax.readyState == 1) {
				
				if (/*ajax.status == 200 && */ajax.readyState == 4) {
					var elemPadre = selectDestino.parentNode;
					$('#localidad').remove();
					$('.localidad').append(ajax.responseText) ;
					if( localidad != "" ){
					
					setTimeout(function () {
					
						  $('#' + idSelectDestino+' option[value="'+localidad+'"]').prop('selected',true);
											$('#' + idSelectDestino+' option[value="'+localidad+'"]').attr('selected','selected');
						}, 500);
						
					
					}
				}
			}
			ajax.send(/*null*/);
		
     }
	 
	 jQuery('.updateDir').click(function(e){
	  e.preventDefault();
		var datastring = jQuery("#EditarDir").serialize();
		var template ="IM_GET_ACTUALIZAR_DIRECCION_HTML"
		var orden= jQuery('#dir_orden').val();
			jQuery.ajax({
				url: HttpCgiPath + "?IdcService="+template,
				type: "POST",
				data: datastring,
				success: function(response) {
				
					jQuery('.dirPostal_'+orden).html(response); 
					jQuery('#dirModal').modal('hide'); 
					jQuery('#actualiza_'+orden).data('tel2',jQuery('#telefono_2').val());
					jQuery('#actualiza_'+orden).data('tel1',jQuery('#telefono_1').val());
					jQuery('#actualiza_'+orden).data('dir1',jQuery('#dir').val());
					jQuery('#actualiza_'+orden).data('cp',jQuery('#cp').val());
					jQuery('#actualiza_'+orden).data('ccaa',jQuery( "#ccaa option:selected" ).val());
					jQuery('#actualiza_'+orden).data('provincia',jQuery( "#provincia option:selected" ).val());
					jQuery('#actualiza_'+orden).data('localidad',jQuery( "#localidad option:selected" ).val());
				
					
				//	jQuery('.dirPostal_'+orden).effect("highlight", {color:"#ff0000"}, 3000);
				},
				error: function() {
					alert('error al actualizar la direccion , pongase en contacto con el administrador.');
				}
			});
	  
	  });
	  
	  jQuery('.EditarDireccionModal').click(function(e){
				 
        e.preventDefault();
				var id = this.id;
				var provin=jQuery(this).data('provincia');
				var local=jQuery(this).data('localidad')
				jQuery('#dirModal').appendTo("body").modal('show');
        jQuery('#EditarDir').trigger("reset");
				jQuery('#dir_id_ins').val( jQuery(this).data('id_ins'));
				jQuery('#dir_orden').val( jQuery(this).data('orden'));
				jQuery('#dir').val( jQuery(this).data('dir1'));
				jQuery('#cp').val( jQuery(this).data('cp'));
				jQuery('#telefono_1').val( jQuery(this).data('tel1'));
				jQuery('#telefono_2').val( jQuery(this).data('tel2'));
				jQuery('#ccaa option[value='+jQuery(this).data('ccaa')+']').prop('selected',true);
				cargaContenido("ccaa", new Array('ccaa','provincia','localidad'), jQuery(this).data('provincia'));
				jQuery('#provincia option[value='+jQuery(this).data('provincia')+']').prop('selected',true);
				jQuery('#provincia option[value='+jQuery(this).data('provincia')+']').attr('selected','selected');
				setTimeout(function () {
					cargaContenidoLocalidad("provincia", new Array('ccaa','provincia','localidad'),local,provin);

				}, 1000);
				
				
     });
	
		jQuery('.updateDes').click(function(e){
			e.preventDefault();
			var datastring = jQuery("#EditarDes").serialize();
			var template ="IM_GET_ACTUALIZAR_DESCRIPCION_FOTO_HTML"
		
				jQuery.ajax({
					url: HttpCgiPath + "?IdcService="+template,
					type: "POST",
					data: datastring,
					success: function(response) {
					if( response == 0){
						orden= jQuery('#des_orden').val();
						jQuery('#desModal').modal('hide'); 
						jQuery('#actualizaDes_'+orden).data('des',jQuery('#descripcion_up').val());
						jQuery('#cont_'+orden).html(jQuery('#descripcion_up').val());
					}else{
						alert('error 2 al actualizar la descripción de la foto , pongase en contacto con el administrador.');
					}
					
					},
					error: function() {
						alert('error 1 al actualizar la descripción de la foto , pongase en contacto con el administrador.');
					}
			});
	  
	  });


	 
	jQuery('.EditarDescripcionModal').click(function(e){
				
        e.preventDefault();
				var id = this.id;
				var descripcion=jQuery(this).data('des');
				//console.log(descripcion);
				jQuery('#desModal').appendTo("body").modal('show');
				jQuery('#EditarDes').trigger("reset");
				jQuery('#des_id_prod').val( jQuery(this).data('id_prod'));
				jQuery('#des_orden').val( jQuery(this).data('orden'));
				jQuery('#descripcion_up').val( descripcion);
				
     });	
		jQuery('.abreModalCompara').click(function(e){
          e.preventDefault();
					var template ="IM_GET_COMPARATIVA_ISO"
					var ids =jQuery(this).attr("data-ids");
					var urlIr =jQuery("#urlIr").val();
					var ids_isos=jQuery('#listaIso3').val()
					window.open(urlIr+"?ids="+ids+"&ids_isos="+ids_isos);
		
     });				
				
		function abreModalEmpresa(id){
		
					
          var splitid = id.split('_');
          var empresaid = splitid[1];
					var template ="IM_GET_RESUMEN_EMPRESA"
          // AJAX request
          jQuery.ajax({
           url: HttpCgiPath + "?IdcService="+template,
            type: 'POST',
            data: {id: empresaid,
						URLImagenes:URLImagenes,
						urlInfo:jQuery("#url_info").val(),
						},
            success: function(response){ 
              // Add response in Modal body
              jQuery('.modal-body-carga').html(response); 

              // Display Modal
              jQuery('#empModal').modal('show'); 
            }
          });
		
		
		
		}		


		// segun estes o no seleccionada una empresa se pinta arriba
		jQuery('.selEmpresa').on('change', function(){
		
			var id_empresa=this.id.split("_");
			id_empresa=id_empresa[2];
			if (jQuery('#_dist_'+id_empresa).is(':checked') || jQuery('#_fab_'+id_empresa).is(':checked') || jQuery('#_dise_'+id_empresa).is(':checked') || jQuery('#_ventTienda_'+id_empresa).is(':checked') || jQuery('#_ventInternet_'+id_empresa).is(':checked') ) {
				if ( jQuery('#listadoEmpresas ul li').length == 0 ){
					jQuery('#listadoEmpresas').append('<ul></ul>');
				}
				var pariente=jQuery('#klone_'+id_empresa).prev().attr('id');
				
				jQuery('#klone_'+id_empresa).remove();
				jQuerycontenido = jQuery('#clone_'+id_empresa).clone();
				jQuerycontenido.prop('id', 'klone_'+id_empresa );
				jQuerycontenido.addClass('estaClonado');
				jQuerycontenido.removeClass('hidden');
				if(typeof pariente === "undefined"){
					jQuery('#listadoEmpresas ul').prepend(jQuerycontenido);
				}else{
					jQuery('#'+pariente).after(jQuerycontenido);
				}
			
				jQuery('#klone_'+id_empresa+' input').prop("disabled", true);
				jQuery('#klone_'+id_empresa+' p').removeClass("abreModal");
				jQuery('#klone_'+id_empresa+' input').removeAttr('id');
				jQuery('#klone_'+id_empresa+' input').removeAttr('name');
				jQuery('#klone_'+id_empresa+' input').removeAttr('value');
				//jQuery('#klone_'+id_empresa+' label').removeAttr('for');
				jQuery('#klone_'+id_empresa+' label').addClass('esclon');
				jQuery('#klone_'+id_empresa+' label').each(function(){
							if (jQuery(this).next().is(':checked')) {
							jQuery(this).next().remove();
								//jQuery(this).next().addClass('esclonSi');
								jQuery(this).append().append('<span class="glyphicon glyphicon-ok text-success"></span>');
							}else {
								jQuery(this).next().remove();
								//jQuery(this).next().addClass('esclonNo');
								jQuery(this).append().append('<span class="glyphicon glyphicon-minus text-danger"></span>');
								}
					});
			
				jQuery('#klone_'+id_empresa+' input').removeClass('selEmpresa');
				if ( jQuery('#listadoEmpresas ul li').length == 0 ){
					jQuery('#listadoEmpresas ul').remove();
				}
			}else{
				if ( jQuery('#listadoEmpresas ul li').length == 1 ){
						jQuery('#listadoEmpresas ul').remove();
				}
				jQuery('#klone_'+id_empresa).remove();
			}
					
		});
		
		// pintamos los input de las empresas seleccionadas al arrancar la pagina 
		if(jQuery("#listaSel").length){
			var listadoEmpresas=jQuery("#listaSel").val().substr(0, jQuery("#listaSel").val().length - 1);
			if ( listadoEmpresas.length > 0 ){
				jQuery('#listadoEmpresas').append('<ul></ul>');
				listadoEmpresas=listadoEmpresas.split(',');
				for (var k = 0; k < listadoEmpresas.length; k++) {
					 var id_empresa=listadoEmpresas[k];
					
					jQuerycontenido = jQuery('#clone_'+id_empresa).clone();
					jQuerycontenido.prop('id', 'klone_'+id_empresa );
					jQuerycontenido.addClass('estaClonado');
					jQuerycontenido.removeClass('hidden');
					jQuery('#listadoEmpresas ul').append(jQuerycontenido);
					jQuery('#klone_'+id_empresa+' input').prop("disabled", true);
					jQuery('#klone_'+id_empresa+' p').removeClass("abreModal");
					jQuery('#klone_'+id_empresa+' input').removeAttr('id');
					jQuery('#klone_'+id_empresa+' input').removeAttr('name');
					jQuery('#klone_'+id_empresa+' input').removeAttr('value');
					jQuery('#klone_'+id_empresa+' :input').removeAttr('id');
					jQuery('#klone_'+id_empresa+' label').each(function(){
							if (jQuery(this).next().is(':checked')) {
							jQuery(this).next().remove();
								//jQuery(this).next().addClass('esclonSi');
								jQuery(this).append().append('<span class="glyphicon glyphicon-ok text-success"></span>');
							}else {
								jQuery(this).next().remove();
								//jQuery(this).next().addClass('esclonNo');
								jQuery(this).append().append('<span class="glyphicon glyphicon-minus text-danger"></span>');
								}
					});
					//jQuery('#klone_'+id_empresa+' label').removeAttr('for');
					jQuery('#klone_'+id_empresa+' input').removeClass('selEmpresa');
					}
			}	
		}
		// js comparar

		 function comparaCheck(id) {
		 var lista_compara="";
		 var numero_comparar=0;
			jQuery(".es_comparado").each(function(){
				
				if(jQuery(this).is(":checked")) {
					id=this.id.split("_");
						lista_compara+=id[1]+",";
						numero_comparar++;
				
				}	
			})
			if (numero_comparar >= 1 && numero_comparar < 3){
				jQuery(".divCompara").removeClass('hidden');
				jQuery(".divCompara a ").attr('data-ids',lista_compara);
				jQuery(".es_comparado").prop('disabled',false);	
			}else{
				jQuery(".divCompara").addClass('hidden');
				jQuery(".divCompara a ").attr('data-ids','');
			}
			
			if (numero_comparar >= 3 ){
				jQuery(".divCompara a ").attr('data-ids',lista_compara);
				jQuery(".divCompara").removeClass('hidden');
				jQuery(".es_comparado").prop('disabled',true);	
				lista_compara_activa=lista_compara.split(',');
				for (var k = 0; k < lista_compara_activa.length; k++) {
					jQuery("#comparar_"+lista_compara_activa[k]).prop('disabled',false);	
				}
			}
						
		}	
		function eliminarRef(id,ref){
			jQuery('#'+id).remove();
			if (jQuery('.nuevaRef_'+id).length > 0 ){
			jQuery('.eliminar_REF_'+id).removeClass('hidden');
			}else{
				jQuery('.eliminar_REF_'+id).addClass('hidden');
			}
			alert("Eliminada referencia.");
			evalRef (ref);
		}
	
		
		
		
		function clonarRef(id){
		
		var num = jQuery('#cuantos_'+id).val();
		
		var numProx=parseInt(num)+1;
		var template ="IM_GET_REFERENCIAS_ISO_HTML"
          // AJAX request
          jQuery.ajax({
           url: HttpCgiPath + "?IdcService="+template,
            type: 'POST',
            data: {
						strCampo: id,
						siguiente:numProx,
						},
            success: function(response){ 
						
              // Add response in Modal body
             jQuery('.anadirSubRef_'+id).append(response);
						
						jQuery('.iso_select_multiple').each(function() {
						console.log(numProx);
						console.log(this.id);
						jQuery(this).selectpicker('refresh');
						//cargaValoresSelecteEspeIso (this.id);
						});



						
						 jQuery('#cuantos_'+id).val(numProx);
						 
						 
						jQuery('.divAnadeRef_'+id).removeProp('disabled');
						
						if (jQuery('.nuevaRef_'+id).length > 0 ){
						
						jQuery('.divAnadeRef_'+id).prop('disabled', 'disabled');
							
							jQuery('.eliminar_REF_'+id).removeClass('hidden');
						}else{
							// console.log(22222222);
							jQuery('.divAnadeRef_'+id).removeProp('disabled');
							
						}
						
            }
          
					
					});
		
		
		alert("Añadida nueva referencia.");
		
		}
		
		
		function evalRef (ref){
			var numero=jQuery('#cuantos_'+ref).val();
		
			var j=0;
			
		
			jQuery('.anadirSubRef_'+ref).children().find('input').each(function(i) {
				
				if (jQuery(this).val() != '' ){j=1;}
			
			});
			
			if (j == 1){
			jQuery('.divAnadeRef_'+ref).removeProp('disabled');
			
				jQuery('.referencia').each(function(i) {
					
					if ( !jQuery( this ).hasClass( "referencia_"+ref ) ) {
						jQuery(this).children().find('input').each(function(i) {
							jQuery(this).val('');
						
						});
						jQuery(this).addClass('hidden');
						var miRef=jQuery(this).attr('data-ref');
						jQuery('.botonera_'+miRef).addClass('hidden');
					
					}
				
				});
			
			}else{
				jQuery('.divAnadeRef_'+ref).prop('disabled', 'disabled');
					jQuery('.referencia').each(function(i) {
					
						if ( !jQuery( this ).hasClass( "referencia_"+ref ) ) {
							
							jQuery(this).children().find('input').each(function(i) {
								jQuery(this).val('');
							
							});
							jQuery(this).removeClass('hidden');
							var miRef=jQuery(this).attr('data-ref');
							jQuery('.botonera_'+miRef).removeClass('hidden');
						}
				
				});
			
			
			
			}
		}
		
		
		
	function limpiaAsignaJER (numeroIso,tipo){
									
		var copiarEnListaiso="";
		
		jQuery('[data-id=\"'+tipo+numeroIso+'"] .filter-option-inner-inner').html('');
		
			jQuery('#'+tipo+numeroIso+' option:selected').each(function() {
				copiarEnListaiso+=this.value+"-";
				
				
			});//each
					
			if (jQuery('#'+tipo+numeroIso+' option:selected').length == 0 ){
				jQuery('#'+tipo+'_listaJER'+numeroIso).val('');
			}else{
				copiarEnListaiso=copiarEnListaiso.slice(0,-1);
				jQuery('#'+tipo+'_listaJER'+numeroIso).val(copiarEnListaiso);
			}
		
		
	}
   
	 function AsignaInputSubJER (numeroIso,tipo,campo){
	
		var origen=numeroIso-1;
		var destino=numeroIso+1;
		var selections = jQuery('#'+tipo+origen).val();

		if (!selections){	
			jQuery('#'+tipo+numeroIso+' optgroup').each(function(){
				jQuery(this).children().attr("selected",false);
				jQuery(this).remove();
					
			});	
			var textoiso="Ninguna opción seleccionada";				
			jQuery('#'+tipo+numeroIso+'_text').html(textoiso);
				
		}else{		

			
			jQuery('#'+tipo+numeroIso+' optgroup').each(function(){ 
				if( selections.indexOf(String(jQuery(this).data('group'))) === -1 ){
				//Remove the option from the DOM
					jQuery(this).children().attr("selected",false);
					jQuery(this).remove();
				} //if
			}); // each
		}//else
		jQuery('#'+tipo+numeroIso).selectpicker('refresh');	
		limpiaAsignaJER_TOTAL(tipo,campo);
	}
	
		//reinicia el html vacion y carga los elementos previamente seleccionados
	function cargayReiniciaSeleccionadosJER (numeroIso,globalCloneIso,selected,tipo,campo){
		jQuery('#'+tipo+numeroIso).html(globalCloneIso);

		
		jQuery.each(selected, function( index, value ) {
			jQuery('#'+tipo+numeroIso+' option[value="' + value + '"]').attr("selected",true);
			jQuery('#'+tipo+numeroIso+' option[value="' + value + '"]').prop("selected",true);
		});
			
	}
	
	  function limpiaAsignaJER_TOTAL (tipo,campo){
		// console.log(campo);
		// console.log(tipo);
		var textoCat ="";
		jQuery('#'+campo+'_JER_text').html('');
		
		jQuery('[data-id=\"'+campo+'_JER1"] .filter-option-inner-inner').html('');
	
			var j =0;
			textoCat+='<ul>';
			jQuery('#'+campo+'_JER1 option:selected').each(function() {
				var grupo1 =this.value;
				textoCat+='<li id="selccionado_'+this.value+'">';
				textoCat+='<p>'+this.text+'</p>';
				textoCat+='<ul>';
				jQuery('#'+campo+'_JER2 option:selected').each(function() {
					var grupo2 =this.value;	
					if ( jQuery(this).attr("data-group") == grupo1 ){
					textoCat+='<li id="selccionado_'+this.value+'">';
						textoCat+='<p >'+this.text+'</p>';
						textoCat+='<ul>';
						jQuery('#'+campo+'_JER3 option:selected').each(function() {
							var grupo=jQuery(this).attr("data-group");
							if ( grupo == grupo2 ){
								textoCat+='<li id="selccionado_'+this.value+'"><p>'+this.text+'</p></li>';
							}
							
						});//each cat3
						textoCat+='</ul>';// cat3
					grupo2 ="";
					textoCat+='</li>'; // cat2
					}
	
				
				});//each cat2
				grupo1="";
				textoCat+='</ul>';
				textoCat+='</li>'; // cat1
				j++;
			});//each cat 1
			textoCat+='</ul>';			
			if ( j == 0 ){
			textoCat="Ninguna opción seleccionada";
			}
			
		jQuery('#'+campo+'_JER_text').html(textoCat);
		
	}
	
// INICIO formateo de texto en input
		jQuery('#btnedit-comillas').on("click",function(e) {
  wrapTextComillas();
});
	jQuery('#btnedit-bold').on("click",function(e) {
  wrapText('strong');
});

jQuery('#btnedit-italic').on("click",function(e) {
  wrapText('em');
});

jQuery('#btnedit-underline').on("click",function(e) {
  wrapText('u');
});

jQuery('#btnedit-delete').on("click",function(e) {
  wrapText('del');
});

jQuery('#btnedit-link').on("click",function(e) {
  var textArea = jQuery('.area'),
    len = textArea.val().length,
    start = textArea[0].selectionStart,
    end = textArea[0].selectionEnd,
    selectedText = textArea.val().substring(start, end);
  jQuery('#btnedit-title').val(selectedText);
  jQuery('#btnedit-url').val('');
  jQuery('#prompt').show();
});

jQuery('#btnedit-ok').on("click",function(e) {
  e.preventDefault();
  jQuery('#prompt').hide();
  replacement = '<a title="' + eval("wwsagNuevaVentana" + sufijoIdioma) + '" target="_blank" href="'+jQuery('#btnedit-url').val()+'">' + jQuery('#btnedit-title').val() + '<img src="'+URLImagenes_link+'/ventana_nueva.gif" alt="' + eval("wwsagNuevaVentana" + sufijoIdioma) + '" /></a>';
  wrapLink(replacement);
}); 

jQuery('#btnedit-cancel').on("click",function(e) {
  e.preventDefault();
  jQuery('#prompt').hide();
}); 
 
 jQuery('.area').bind('input propertychange', function() {
content = this.value.replace(/\n/g, "<br />");
                   jQuery('#preview').html(content );            
      
      
});
function wrapLink(link) {
  var textArea = jQuery('.area'),
    len = textArea.val().length,
    start = textArea[0].selectionStart,
    end = textArea[0].selectionEnd,
    selectedText = textArea.val().substring(start, end);
	textArea.val(textArea.val().substring(0, start) + link + textArea.val().substring(end, len));
	content = jQuery('.area').val().replace(/\n/g, "<br />");
    jQuery('#preview').html(content );            
	jQuery('.area').keyup();
}

function wrapText(tag) {
	var textArea = jQuery('.area'),
		len = textArea.val().length,
		start = textArea[0].selectionStart,
		end = textArea[0].selectionEnd,
		selectedText = textArea.val().substring(start, end),
		replacement = '<' + tag + '>' + selectedText + '</' + tag + '>';
		textArea.val(textArea.val().substring(0, start) + replacement + textArea.val().substring(end, len));
		content = jQuery('.area').val().replace(/\n/g, "<br />");
		jQuery('#preview').html(content ); 
		jQuery('.area').keyup();
	
}

function wrapTextComillas() {
	var textArea = jQuery('.area'),
		len = textArea.val().length,
		start = textArea[0].selectionStart,
		end = textArea[0].selectionEnd,
		selectedText = textArea.val().substring(start, end),
		replacement = '«' + selectedText + '»';
		textArea.val(textArea.val().substring(0, start) + replacement + textArea.val().substring(end, len));
		content = jQuery('.area').val().replace(/\n/g, "<br />");
		jQuery('#preview').html(content ); 
		jQuery('.area').keyup();
	
}

// FIN formateo de texto en input

// funcion para imprimir un div
function PrintElem(elem)
{
    
	var nombre=jQuery('.nombreFicha h3').html();
	var modelo=jQuery('.impModelo').html();
	var desc = jQuery('.impDesc').html();
	var img = jQuery('.gallery').html();
	var html =jQuery('div#content-header div.section').html();
	var adddiv = jQuery('div#content-header div.section').clone();
	adddiv.find('a').removeAttr('href', '');
	adddiv.find('a').removeAttr('class');
	adddiv.find('br').remove();
	var cabecera =adddiv.html();
	//console.log(cabecera);
	
	var empresas = jQuery('#tabpanel-3').clone();
	empresas.find('img').remove();
	empresas.find('a').removeAttr('href', '');
	empresas =empresas.html();
	
	var mywindow = window.open('', 'PRINT', 'height=400,width=600');
	mywindow.document.open();
    mywindow.document.write('<html><head >');
	mywindow.document.write('<title>' + document.title  + '</title>');
	mywindow.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"  type="text/css"  media="all" async/>');
	mywindow.document.write('<link rel="stylesheet" href="/DInterElabora/groups/sistema/documents/sistema/sipa.css"  type="text/css"  media="all"  async/>');
	mywindow.document.write('<script src="https://code.jquery.com/jquery-1.11.1.min.js" ></script>');
	mywindow.document.write('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js" async></script>');
	
	mywindow.document.write('<style>');
	mywindow.document.write('@media print {'+
								'body {-webkit-print-color-adjust: exact;}'+
								'.referenciaGrupoTitulo {'+
									'background-color: #eee'+
									' !important;  -webkit-print-color-adjust: exact;'+
								'}'+
								'.img-thumbnail {'+
									'display: inline-block;'+
									' max-width: 200px !important;'+
								'}'+
								'.img-responsive {'+
									'max-width: 200px !important;'+
								'}'+
								'.img-responsive{max-width:200px !important;}'+
								'.logos h1 {'+
									'margin-left:30px;'+  
									'font-size: 1.5em; '+
									'font-weight: normal;'+
									'padding: 0;'+
									'margin-top: .67em;'+
								'}'+
								'ul li.impar {'+
								 '   background-color: #efefef;'+
								'}'+
								
							'}'								
	);
	mywindow.document.write('</style>');
	//necesario para que cargue las imagenes en el modo de impresión
	mywindow.document.write('<script type="text/javascript">window.onload = function() { window.print();setTimeout(function() {window.close();}, 1);};</script>');
    mywindow.document.write('</head><body >');
	mywindow.document.write('<div class="container informacion ficha">');
	
	mywindow.document.write(cabecera);
	
	mywindow.document.write('<div class="col-xs-12">');
  	mywindow.document.write('<h2>' + nombre +" - "+modelo  + '</h2>');
	mywindow.document.write('</div>');
	mywindow.document.write('<div class="col-xs-8"><p><strong>Descripción</strong>:</p>');
	mywindow.document.write('<p>' + desc + '</p></div>');
	mywindow.document.write('<div class="col-xs-4"><p class="col-xs-12"">' + img + '</p></div>');
	mywindow.document.write('<div class="col-xs-12"><p><strong>Características</strong>:</p>');
    mywindow.document.write(document.getElementById(elem).innerHTML);
	mywindow.document.write('</div>');
	mywindow.document.write('<div class="col-xs-12  " ><p><strong>Empresas</strong>:</p>');
    mywindow.document.write(empresas);
	mywindow.document.write('</div>');
	
	
	mywindow.document.write('</div>');
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
	
//	mywindow.close();

 // mywindow.print();
    
    return true;
	
}
// fin funcion para imprimir un div

// funcion para para EXPORTAR A PDF
function PrintElemPdf(elem)
{
    
	var nombre=jQuery('.nombreFicha h3').html();
	var modelo=jQuery('.impModelo').html();
	var desc = jQuery('.impDesc').html();
	var img = jQuery('.galeria').html();
	var html =jQuery('div#content-header div.section').html();
	var adddiv = jQuery('div#content-header div.section').clone();
	adddiv.find('a').removeAttr('href', '');
	//adddiv.find('a').removeAttr('class');
	adddiv.find('br').remove();
	var cabecera =adddiv.html();
	//console.log(cabecera);
	
	var empresas = jQuery('#tabpanel-3'+id_pro).clone();
	empresas.find('img').remove();
	empresas.find('a').removeAttr('href', '');
	empresas =empresas.html();
	
	var mywindow = window.open();
	mywindow.document.open();
    mywindow.document.write('<html><head >');
	mywindow.document.write('<title>' + document.title  + '</title>');
	mywindow.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"  type="text/css"  media="all" async/>');
	mywindow.document.write('<link rel="stylesheet" href="/DInterElabora/groups/sistema/documents/sistema/sipa.css"  type="text/css"  media="all"  async/>');
	mywindow.document.write('<script src="https://code.jquery.com/jquery-1.11.1.min.js" async></script>');
	mywindow.document.write('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js" async></script>');
	mywindow.document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.5/jspdf.min.js" async></script>');
	mywindow.document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js" async></script>');
	//mywindow.document.write('<script src="https://superal.github.io/canvas2image/canvas2image.js"></script>');
	//mywindow.document.write('<script src="http://demos.techumber.com/demo/js/html-to-pdf-2/lib/jquery.min.js"></script>');
	//mywindow.document.write('<script type="text/javascript" src="http://demos.techumber.com/demo/js/html-to-pdf-2/lib/jspdf.min.js"></script>');
	//mywindow.document.write('<script type="text/javascript" src="http://demos.techumber.com/demo/js/html-to-pdf-2/lib/html2canvas.min.js"></script>');

	


	mywindow.document.write('<style>');
	mywindow.document.write(	'body {-webkit-print-color-adjust: exact;}'+
								'.referenciaGrupoTitulo {'+
									'background-color: #eee'+
									' !important;  -webkit-print-color-adjust: exact;'+
								'}'+
								'.img-thumbnail {'+
									'display: inline-block;'+
									' max-width: 200px !important;'+
								'}'+
								'.img-responsive {'+
									'max-width: 200px !important;'+
								'}'+
								'.img-responsive{max-width:200px !important;}'+
								'.logos h1 {'+
									'margin-left:30px;'+  
									'font-size: 1.5em; '+
									'font-weight: normal;'+
									'padding: 0;'+
									'margin-top: .67em;'+
								'}'+
								'ul li.impar {'+
								 '   background-color: #efefef;'+
								'}'+
								'.logos > a {    display: inline-block;    padding: 0;    width: auto;}'
														
	);
	mywindow.document.write('</style>');
	//necesario para que cargue las imagenes en el modo de impresión
    mywindow.document.write('</head><body >');
	mywindow.document.write('<div id="pdf">');
	mywindow.document.write('<div class="informacion ficha" style="max-width:800px !important;">');
	
	mywindow.document.write(cabecera);
	
	mywindow.document.write('<div class="col-xs-12">');
	if (modelo != null){mywindow.document.write('<h2>' + nombre +" - "+modelo  + '</h2>');}
	else{mywindow.document.write('<h2>' + nombre +'</h2>');}
  
	mywindow.document.write('</div>');
	mywindow.document.write('<div class="col-xs-8"><p><strong>Descripción</strong>:</p>');
	if (desc != null){mywindow.document.write('<p>' + desc + '</p>');}
	mywindow.document.write('</div>');
	if (img != null){	mywindow.document.write('<div class="col-xs-4"><p class="col-xs-12"">' + img + '</p></div>');}
	mywindow.document.write('<div class="col-xs-12"><p><strong>Características</strong>:</p>');
    mywindow.document.write(document.getElementById(elem).innerHTML);
	mywindow.document.write('</div>');
	mywindow.document.write('<div class="col-xs-12  " ><p><strong>Empresas</strong>:</p>');
    mywindow.document.write(empresas);
	mywindow.document.write('</div>');
	
	
	mywindow.document.write('</div>');
	mywindow.document.write('</div >');
	//mywindow.document.write('<script type="text/javascript">window.onload = function() { html2canvas(document.body,{onrendered:function(canvas){var imgData = canvas.toDataURL ("image / png");var doc = new jsPDF ('', 'mm', [canvas.width, canvas.height]); doc.addImage (imgData, 'png', 0, 0, canvas.width, canvas.height); doc.save("'+nombre +'-'+modelo+'.pdf");}});setTimeout(function() {window.close();}, 1);};</script>');

	mywindow.document.write('<script type="text/javascript">');

	
//	mywindow.document.write('html2canvas(document.body,{');
	//mywindow.document.write(' onrendered:function(canvas){');
	//	mywindow.document.write('var imgData = canvas.toDataURL ("image / png");');
	//	mywindow.document.write("var doc = new jsPDF ('', 'mm', [canvas.width, canvas.height]); ");
	//	mywindow.document.write("doc.addImage (imgData, 'png', 0, 0, canvas.width, canvas.height); ");
	//	mywindow.document.write('doc.save("'+nombre +'-'+modelo+'.pdf");');
	//	mywindow.document.write('setTimeout(function() {}, 10);');
	//	mywindow.document.write('}');
	//	mywindow.document.write('});');
	
	
	
	mywindow.document.write('html2canvas(document.body,{');
	mywindow.document.write(' onrendered:function(canvas){');
		mywindow.document.write('var imgData=canvas.toDataURL("image/png");');
		mywindow.document.write('var imgWidth = 300; ');
		mywindow.document.write('var pageHeight = 290;');
		mywindow.document.write('var imgHeight = canvas.height * imgWidth/canvas.width; ');
		mywindow.document.write('var heightLeft = imgHeight; ');
		mywindow.document.write('var doc = new jsPDF("p", "mm"); ');
		mywindow.document.write('var position = 0; ');
		
		mywindow.document.write('doc.addImage(imgData, "PNG", 20, position, imgWidth, imgHeight);');
		mywindow.document.write('heightLeft -= pageHeight; ');
		mywindow.document.write('while (heightLeft >= 0) { ');
			mywindow.document.write('position = heightLeft - imgHeight; ');
			mywindow.document.write('doc.addPage(); ');
			mywindow.document.write('doc.addImage(imgData, "PNG", 20, position, imgWidth, imgHeight); ');
			mywindow.document.write('heightLeft -= pageHeight; ');
		mywindow.document.write('}');
		
		mywindow.document.write('doc.save("'+nombre +'-'+modelo+'.pdf");');
		mywindow.document.write('setTimeout(function() {window.close();}, 10);');
		mywindow.document.write('}');
	mywindow.document.write('});');
console.log(222);
//mywindow.document.write('html2canvas(document.body,{onrendered:function(a){var e=a.toDataURL("image/jpeg");options={orientation:"0",unit:"mm",format:"a4"};var t=new jsPDF(options,"","","");t.addImage(e,"jpeg",10,10,300,0);for(var n=new Image,o=1620,g=(n=Canvas2Image.convertToJPEG(a)).height/1620,i=1;i<g;i++){t.addPage();var m=o,r=n.width,d=r,s=a;s.setAttribute("height",n.height-1620*i),s.setAttribute("width",d),s.getContext("2d").drawImage(n,0,m,r,1620,0,0,d,1620);var v=new Image;v=Canvas2Image.convertToJPEG(s),image2Data=v.src,t.addImage(image2Data,"JPEG",10,10,190,0),o+=1620}t.save("sample-file.pdf")}});');
//980
// mywindow.document.write('function makePDF(){var e=document.body;html2canvas(e,{onrendered:function(a){var t=new jsPDF("p","pt","letter");console.log(e.clientHeight),console.log(e.clientHeight/980);for(var n=0;n<=e.clientHeight/980;n++){var o=a,g=980*n;window.onePageCanvas=document.createElement("canvas"),onePageCanvas.setAttribute("width",900),onePageCanvas.setAttribute("height",980),onePageCanvas.getContext("2d").drawImage(o,0,g,900,980,0,0,900,980);var i=onePageCanvas.toDataURL("image/png",1),s=onePageCanvas.width,d=onePageCanvas.clientHeight;n>0&&t.addPage(612,791),t.setPage(n+1),t.addImage(i,"PNG",20,40,.62*s,.62*d)}t.save("Test.pdf")}})}');
//700
//mywindow.document.write('function makePDF(){var e=document.body;html2canvas(e,{onrendered:function(a){var n=new jsPDF("p","pt","letter");console.log(e.clientHeight),console.log("0 es menor que "+e.clientHeight/980);for(var t=0;t<=e.clientHeight/980;t++){var o=a,g=980*t;window.onePageCanvas=document.createElement("canvas"),onePageCanvas.setAttribute("width",900),onePageCanvas.setAttribute("height",980),onePageCanvas.getContext("2d").drawImage(o,0,g,900,980,0,0,900,980);var s=onePageCanvas.toDataURL("image/png",1),i=onePageCanvas.width,d=onePageCanvas.clientHeight;t>0&&n.addPage(612,791),n.setPage(t+1),n.addImage(s,"PNG",20,40,.62*i,.62*d)}n.save("Test.pdf")}})}');
//mywindow.document.write('makePDF()');

//mywindow.document.write('var canvasImage,form=$("#pdf"),cache_width=form.width(),a4=[595.28,990.89],winHeight=a4[1],formHeight=form.height(),formWidth=form.width(),imagePieces=[];function getCanvas(){return form.width(1.33333*a4[0]-80).css("max-width","none"),html2canvas(form,{imageTimeout:2e3,removeContainer:!0})}function splitImage(e){for(var a=Math.round(formHeight/winHeight),t=0;t<a;t++){var i=document.createElement("canvas"),n=i.getContext("2d");i.width=formWidth,i.height=winHeight,n.drawImage(canvasImage,0,t*winHeight,formWidth,winHeight,0,0,i.width,i.height),imagePieces.push(i.toDataURL("image/png"))}console.log(imagePieces.length),createPDF()}function createPDF(){var e=imagePieces.length-1,a=new jsPDF({unit:"px",format:"a4"});imagePieces.forEach(function(t){a.addImage(t,"JPEG",20,40),e&&a.addPage(),e--}),a.save("techumber-html-to-pdf.pdf"),form.width(cache_width)}function main(){getCanvas().then(function(e){(canvasImage=new Image).src=e.toDataURL("image/png"),canvasImage.onload=splitImage})}$("body").scrollTop(0),(imagePieces=[]).length=0,main();');       
//mywindow.document.write('var canvasImage,form=$(".form"),cache_width=form.width(),a4=[595.28,990.89],winHeight=a4[1],formHeight=form.height(),formWidth=form.width(),imagePieces=[];function main(){getCanvas().then(function(e){(canvasImage=new Image).src=e.toDataURL("image/png"),canvasImage.onload=splitImage})}function getCanvas(){return form.width(1.33333*a4[0]-80).css("max-width","none"),html2canvas(form,{imageTimeout:2e3,removeContainer:!0})}function splitImage(e){for(var a=Math.round(formHeight/winHeight),t=0;t<a;t++){var i=document.createElement("canvas"),n=i.getContext("2d");i.width=formWidth,i.height=winHeight,n.drawImage(canvasImage,0,t*winHeight,formWidth,winHeight,0,0,i.width,i.height),imagePieces.push(i.toDataURL("image/png"))}console.log(imagePieces.length),createPDF()}function createPDF(){var e=imagePieces.length-1,a=new jsPDF({unit:"px",format:"a4"});imagePieces.forEach(function(t){a.addImage(t,"JPEG",20,40),e&&a.addPage(),e--}),a.save("techumber-html-to-pdf.pdf"),form.width(cache_width)}$("body").scrollTop(0),(imagePieces=[]).length=0,main();');




	
mywindow.document.write('</script>');
		//mywindow.document.write('<script type="text/javascript">window.onload = function() { setTimeout(function() {window.close();}, 1);};</script>');

    mywindow.document.write('</body></html>');



	
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
  
    return true;
	
}
// fin funcion para EXPORTAR A PDF  un div


// funcion cambia un rango a valor unico al dar de alta  o modificar una iso
/* oscar  6097 <div class="<$clasehastasalto$>_saltos <$srtID$>_inter 111 col-md-8 222 <$verINTERVALO$>">
						
						<label for="<$srtID$>_intervalo">a saltos: </label>
						<input class="form-control" name="<$srtID$>_intervalo" id="<$srtID$>_intervalo" type="text" value="<$strValorIntervalo$>">
					</div>
					
	oscar 6209 	<div class="<$clasehasta$>_saltos <$srtID$>_inter col-md-8 <$verINTERVALO$>">
						<label for="<$srtID$>_intervalo">a saltos: </label>
						<input class="form-control" name="<$srtID$>_intervalo" id="<$srtID$>_intervalo" type="text" value="<$strValorIntervalo$>">
					</div>				
					*/
			function cambiaRango (id_obejtivo,id_propio,literal_desde,id_literal_desde,salto,intervalo){
			console.log (id_propio+"---------------------->"+id_propio)
			console.log ("."+id_obejtivo+"_saltos")
				console.log ("."+id_obejtivo);
				jQuery("#"+salto).val('');
				if (jQuery("#"+id_propio).val() == 'DOS_EXTREMOS' || jQuery("#"+id_propio).val() == 'CONTINUO'){
					jQuery("."+id_obejtivo+"_sup").removeClass('hidden');
					jQuery("."+salto+"_nointer").removeClass('hidden');
					jQuery("."+salto+"_inter").addClass('hidden');
					jQuery(".cambia_"+id_obejtivo).removeClass('col-md-4');
					jQuery(".cambia_"+id_obejtivo).removeClass('col-md-2');
					jQuery(".cambia_"+id_obejtivo).addClass('col-md-3');
					jQuery("#"+id_literal_desde).html(literal_desde+':');
					jQuery(".cambia_"+id_obejtivo+"_saltos").addClass('hidden');
					jQuery("#"+intervalo+"_intervalo").val('');
				} else if ( jQuery("#"+id_propio).val() == 'VALOR_UNICO' ) {
					jQuery("."+salto+"_nointer").removeClass('hidden');
					jQuery("."+salto+"_inter").addClass('hidden');
					jQuery("#"+id_obejtivo).val('');
					jQuery("."+id_obejtivo+"_sup").addClass('hidden');
					jQuery("."+salto+"_inter").addClass('hidden');
					jQuery(".cambia_"+id_obejtivo).removeClass('col-md-3');
					jQuery(".cambia_"+id_obejtivo).removeClass('col-md-4');
					jQuery(".cambia_"+id_obejtivo).removeClass('col-md-2');
					jQuery(".cambia_"+id_obejtivo).addClass('col-md-4');
					jQuery("#"+id_literal_desde).html('Valor:');
					jQuery("#"+intervalo+"_intervalo").val('');
					jQuery(".cambia_"+id_obejtivo+"_saltos").addClass('hidden');
				}else if(jQuery("#"+id_propio).val() == 'A_SALTOS' ) {
					jQuery("#"+id_obejtivo).val('');
					jQuery("#"+salto+"_desde").val('');
					jQuery("#"+salto+"_hasta").val('');
					jQuery("#"+id_literal_desde).html(literal_desde+':');
					
					jQuery("."+id_obejtivo+"_sup").removeClass('hidden');
					jQuery("."+salto+"_nointer").removeClass('hidden');
					jQuery("."+salto+"_inter").removeClass('hidden');
					jQuery("."+salto+"_nointer").removeClass('hidden');
					//jQuery("."+salto+"_nointer").addClass('hidden');
					
					jQuery(".cambia_"+id_obejtivo).removeClass('col-md-3');
					jQuery(".cambia_"+id_obejtivo).removeClass('col-md-4');
					jQuery(".cambia_"+id_obejtivo).addClass('col-md-2');
					jQuery("."+salto+"_inter").addClass('col-md-2');
						jQuery("."+salto+"_nointer").addClass('col-md-2');
					jQuery("."+salto+"_inter").removeClass('hidden');
					jQuery(".cambia_"+id_obejtivo+"_saltos").removeClass('hidden');

				
					
			
					
				}else{
					jQuery("."+id_obejtivo+"_sup").removeClass('hidden');
					jQuery("."+id_obejtivo+"_saltos").addClass('hidden');
					jQuery("."+salto+"_nointer").removeClass('hidden');
					jQuery("."+salto+"_inter").addClass('hidden');
					jQuery(".cambia_"+id_obejtivo).removeClass('col-md-4');
					jQuery(".cambia_"+id_obejtivo).removeClass('col-md-4');
					jQuery(".cambia_"+id_obejtivo).addClass('col-md-3');
					jQuery("#"+id_literal_desde).html(literal_desde+':');}
			
			}
			
// fin funcion cambia un rango a valor unico al dar de alta una iso

// js, actualiza el departemtno de una empresa
function actualizaDepartamento (tipo,id,departamento,departamentoValue){

				jQuery.ajax({
				url: HttpCgiPath + "?IdcService=IM_GET_ASIGNA_DEPARTAMENTO_PRODUCTO",
				type: 'POST',
				data: { tipo: tipo, id:id, departamento: departamento,departamentoValue:departamentoValue} ,
				error: function (jqXHR, exception) {
					var msg = '';
					if (jqXHR.status === 0) {
						msg = 'Not connect.\n Verify Network.';
					} else if (jqXHR.status == 404) {
						msg = 'Requested page not found. [404]';
					} else if (jqXHR.status == 500) {
						msg = 'Internal Server Error [500].';
					} else if (exception === 'parsererror') {
						msg = 'Requested JSON parse failed.';
					} else if (exception === 'timeout') {
						msg = 'Time out error.';
					} else if (exception === 'abort') {
						msg = 'Ajax request aborted.';
					} else {
						msg = 'Uncaught Error.\n' + jqXHR.responseText;
					}
					jQuery('#mensaje').html('<strong>ocurrio un error al modificar el departamento , consulte con el administrador:' +msg+'</strong>');
					},
					success: function (data) {
						jQuery(".alert").removeClass('alert-success');
						jQuery(".alert").removeClass('alert-danger');
							if (data == 0){
							
							jQuery('#mensaje').html('<div class="alert  alert-success alert-dismissible fade show" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>¡Atencion!:  Departamento modificado correctamente</strong></span></div>');
								
							}else{
								jQuery('#mensaje').html('<div class="alert  alert-dangeralert-dismissible fade show" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>¡Atencion!:  No se pudo actualizar consulte al administrador:'+data+'</strong></span></div>');
								
							}
						
					}
				})	;
}
jQuery(".cambiaDep_checkbox").change(function() {
    if(this.checked) {
		jQuery(this).parent('div').addClass('departamentoSeleccionado');
        console.log("si:"+jQuery(this).val()+" id:"+jQuery(this).data("id"));
		actualizaDepartamento('checkbox',jQuery(this).data("id"),jQuery(this).val(),'si');
    }else{
		jQuery(this).parent('div').removeClass('departamentoSeleccionado');
		 console.log("no:"+jQuery(this).val()+" id:"+jQuery(this).data("id"));
		 actualizaDepartamento('checkbox',jQuery(this).data("id"),jQuery(this).val(),'no');
	}
});
	
jQuery(".cambiaDep_radio").change(function() {
	var id =jQuery(this).data("id");
	 console.log("val:"+jQuery(this).val()+" id:"+jQuery(this).data("id"));
	jQuery("#"+id+" :input").removeClass('departamentoSeleccionado');
	
	jQuery("#"+id).find("input").each(function() {
		console.log("#dep_"+jQuery(this).val()+"_"+jQuery(this).data("id"));
		jQuery(this).parent('div').removeClass('departamentoSeleccionado');  	
    });
	jQuery(this).parent('div').addClass('departamentoSeleccionado');
	console.log("si:"+jQuery(this).val()+" id:"+jQuery(this).data("id"));  
	actualizaDepartamento('radio',jQuery(this).data("id"),jQuery(this).val(),'vacio');	
});

	jQuery(".depfiltro").click(function(){ 
	
				jQuery(".depfiltro").removeClass("active");					
				jQuery(this).addClass("active");
				jQuery(".depfiltroinput").each(function() {
					console.log(jQuery(this));
					jQuery(this).prop('checked', false);
					jQuery(this).trigger('change');			
				});
				console.log(jQuery(this).children('input'));
				jQuery(this).children('input').prop('checked', true);
				jQuery(this).children('input').trigger('change');
				
	});
	jQuery(".depfiltroBusquedas").click(function(){ 						
				jQuery(".depfiltroinputBusquedas").each(function() {
					console.log(jQuery(this));
					jQuery(this).prop('checked', false);
					jQuery(this).trigger('change');			
				});
				console.log(jQuery(this).children('input'));
				jQuery(this).children('input').prop('checked', true);
				jQuery(this).children('input').trigger('change');
				
	});

	function validarCamposAltaDoc(form,estado){
			//Se formatean las opciones seleccionadas de los campos (selects multiples)
		var listaIsos="";
		var anna = "no";
		if (jQuery("#ison1 :selected").length != 0 ){
			listaIsos1 = form.listaIso1.value;
			listaIsos2 = form.listaIso2.value;
			var arr1= listaIsos1.split('-');
			var arr2= listaIsos2.split('-');
				jQuery.each( arr1, function( index, value1 ) {
					console.log("INICIA:" +value1  );
					anna = "no";
					jQuery.each( arr2, function( index, value2 ) {
						console.log("comprobamos2: " +value2 +" inicia con1  :"+value1 +"ANNA:"+anna);
						if ( anna == "no" ){
							console.log("comprobamos: " +value2 +" si inicia con: "+value1 +"AAAAAAAAAAAA:" +value2.startsWith(value1));

							if(value2.startsWith(value1)){
							  console.log(value2 +" COINCIDE " +value1  );
							  anna="si";
							}else {
							console.log(value2 +"NOOOOOOOOOOOOOOO COINCIDE " +value1  );
							}
						}
					});
					console.log("coincide alguno :"+anna );
					if  ( anna == "no")
					{
						console.log("no coincide ninguno :"+anna+" : anñadimos  " +value1  );
						value1=value1+"0000";
						listaIsos +=value1+"-";
					}
					console.log("FINALIZA:" +value1  );
					});
				console.log("lista 1 final="+listaIsos);
		}
		
		if (jQuery("#ison2 :selected").length != 0 ){
		
		
			listaIsos1 = form.listaIso2.value;
			listaIsos2 = form.listaIso3.value;
			var arr1= listaIsos1.split('-');
			var arr2= listaIsos2.split('-');
				jQuery.each( arr1, function( index, value1 ) {
					console.log("INICIA:" +value1  );
					anna = "no";
					jQuery.each( arr2, function( index, value2 ) {
						console.log("comprobamos2: " +value2 +" inicia con1  :"+value1 +"ANNA:"+anna);
						if ( anna == "no" ){
							console.log("comprobamos: " +value2 +" si inicia con: "+value1 +"AAAAAAAAAAAA:" +value2.startsWith(value1));

							if(value2.startsWith(value1)){
							  console.log(value2 +" COINCIDE " +value1  );
							  anna="si";
							}else {
							console.log(value2 +"NOOOOOOOOOOOOOOO COINCIDE " +value1  );
							}
						}
					});
					console.log("coincide alguno :"+anna );
					if  ( anna == "no")
					{
						console.log("no coincide ninguno :"+anna+" : anñadimos  " +value1  );
						value1=value1+"00";
						listaIsos +=value1+"-";
					}
					console.log("FINALIZA:" +value1  );
					});
				console.log("lista 1 final="+listaIsos);
		
		
		
		}
		if (jQuery("#ison3 :selected").length != 0 ){listaIsos +=form.listaIso3.value; var compara}
		//listaIsos=listaIsos.substring(1,listaIsos.length-1);
		console.log(listaIsos);
		
		
		form.listaISO.value=listaIsos.replace(/\--/g, '-');
		jQuery(".mensaje p").html("");
		var envia="si";
		if ( jQuery("#ison3 :selected").length === 0  && jQuery('input.presel').is(':checked')){
			jQuery('.mensaje').removeClass("hidden");
			jQuery(".mensaje p").append("por favor seleccione al menos una ISO de nivel 3 si ha seleccionado preseleccionar a todos los documentos.</br>");
			var envia="no";
		}
		if ( jQuery("#esUnUpdate").val() ==  1  ){
			if ( document.getElementById("documento").files.length == 0   ){
				jQuery('.mensaje').removeClass("hidden");
				jQuery(".mensaje p").append("por favor seleccione un documento.</br>");
				var envia="no";
			}
		}
		
		if (!jQuery("#NombreDocumento").val()) {
			jQuery('.mensaje').removeClass("hidden");
			jQuery(".mensaje p").append('<span class="text-danger">por favor añada un nombre al documento.</span></br>');
			var envia="no";
		}
		if (envia === "si"){form.submit();}

		
	}
	jQuery("#cambiaDoc").click(function(){ 
	jQuery("#hay_doc ").removeClass("oculto");
	jQuery("#no_hay_doc ").addClass("oculto");
	jQuery("#actualizaDocumento ").val("1");
});


	jQuery(".docSelecc").click(function(){ 
		var selectDoc="";
		jQuery(".docSelecc").each(function (idx) {
			if (jQuery(this).prop('checked')) {
				selectDoc+=jQuery(this).data("id")+",";
				console.log(jQuery(this).data("id"));
			}		
		});	
		jQuery("#listadoDocumentos").val(selectDoc);
	});
	
	jQuery("#listadoHistorico").on('click', "tr", function(event) {
		
		
	//	jQuery(this).css('background-color', '#00000');
		var anterior =jQuery(this).data("cual");
		var id_hist =jQuery(this).attr("id");
		var id_ins =jQuery(this).data("id_ids");
			if( anterior == 0 ){
				id=id_ins;
				
			}else{
				id=id_hist;
			}
					var request = jQuery.ajax({
				url: HttpCgiPath + "?IdcService=IM_GET_HTML_DIRECCIONES_COMPARATIVA",
				type: 'POST',
				data: { id: id,numero: anterior} ,
				error: function (jqXHR, exception) {
					var msg = '';
					if (jqXHR.status === 0) {
						msg = 'Not connect.\n Verify Network.';
					} else if (jqXHR.status == 404) {
						msg = 'Requested page not found. [404]';
					} else if (jqXHR.status == 500) {
						msg = 'Internal Server Error [500].';
					} else if (exception === 'parsererror') {
						msg = 'Requested JSON parse failed.';
					} else if (exception === 'timeout') {
						msg = 'Time out error.';
					} else if (exception === 'abort') {
						msg = 'Ajax request aborted.';
					} else {
						msg = 'Uncaught Error.\n' + jqXHR.responseText;
					}
					jQuery('#mensaje').html('<strong>ocurrio un error, consulte con el administrador:' +msg+'</strong>');
					},
					success: function (data) {
						jQuery('#a').html(data);
						onDiffTypeChange(document.querySelector('#settings [name="diff_type"]:checked'));
						changed();
													
					}	
				});	
		
			if( anterior == 0 ){
				id=id_hist;
				anterior=1;
			}else{
				id=anterior;
			}
					var request = jQuery.ajax({
				url: HttpCgiPath + "?IdcService=IM_GET_HTML_DIRECCIONES_COMPARATIVA",
				type: 'POST',
				data: { id: id,numero: anterior} ,
				error: function (jqXHR, exception) {
					var msg = '';
					if (jqXHR.status === 0) {
						msg = 'Not connect.\n Verify Network.';
					} else if (jqXHR.status == 404) {
						msg = 'Requested page not found. [404]';
					} else if (jqXHR.status == 500) {
						msg = 'Internal Server Error [500].';
					} else if (exception === 'parsererror') {
						msg = 'Requested JSON parse failed.';
					} else if (exception === 'timeout') {
						msg = 'Time out error.';
					} else if (exception === 'abort') {
						msg = 'Ajax request aborted.';
					} else {
						msg = 'Uncaught Error.\n' + jqXHR.responseText;
					}
					jQuery('#mensaje').html('<strong>ocurrio un error, consulte con el administrador:' +msg+'</strong>');
					},
					success: function (data) {
						jQuery('#b').html(data);
						onDiffTypeChange(document.querySelector('#settings [name="diff_type"]:checked'));
						changed();
													
					}	
				});	
		
		
	
		
		
		
		jQuery("#listadoHistorico td").css('background-color', '#fff');
		jQuery(this).children('td').css('background-color','#e6cd9f');
		
	});
	
	function changed() {
	var diff = JsDiff[window.diffType](a.textContent, b.textContent);
	var fragment = document.createDocumentFragment();
	for (var i=0; i < diff.length; i++) {

		if (diff[i].added && diff[i + 1] && diff[i + 1].removed) {
			var swap = diff[i];
			diff[i] = diff[i + 1];
			diff[i + 1] = swap;
		}

		var node;
		if (diff[i].removed) {
			node = document.createElement('del');
			node.appendChild(document.createTextNode(diff[i].value));
		} else if (diff[i].added) {
			node = document.createElement('ins');
			node.appendChild(document.createTextNode(diff[i].value));
		} else {
			node = document.createTextNode(diff[i].value);
		}
		fragment.appendChild(node);
	}

	result.textContent = '';
	result.appendChild(fragment);
	console.log(result);
}

function onDiffTypeChange(radio) {
	window.diffType = radio.value;
//	document.title = "Diff " + radio.value.slice(4);
}

var radio = document.getElementsByName('diff_type');
for (var i = 0; i < radio.length; i++) {
	radio[i].onchange = function(e) {
		onDiffTypeChange(e.target);
		changed();
	}
}

//Valida el formulario, formatea las listas correspondientes y envia el formulario
function validarCamposAltaCon(form, boton) {



	if ( jQuery("#Nombre").val() != "" ){
			if (!validarCamposTelefono(jQuery("#telefono").val())){
				return false;
			}
			if (!validarCamposTelefono(jQuery("#movil").val()) ){
				return false;
			}
			/*if (!validarCamposCorreo(jQuery("#email").val())) {
				return false;
			}*/
		form.submit();
	}else{
		alert("Rellene al menos el nombre antes de guardar el contacto");
	}


}
function  sumarUno(cual){

	var cuantos=jQuery("#id_contactos").val();
	cuantos=parseInt(cuantos)+1;
	jQuery("#id_contactos").val(cuantos);
	
	var cuantos=jQuery("#cuantos").val();
	cuantos=parseInt(cuantos)+1;
	jQuery("#cuantos").val(cuantos);
	
	
}

jQuery(document).on('keyeeup','.cargo_load',function() {
console.log("keyup"+jQuery("#"+this.id).val());
var datos=jQuery("#"+this.id).val();
var optionsCargo = {     
        url: function (phrase) {
            return "<$HttpCgiPath$>?IdcService=IM_GET_JSON_PROA_BUSQUEDA_CARGOS_TEMPLATE";
        },getValue: "nombre",
        ajaxSettings: {
            dataType: "json",
            method: "POST",
            data: {
                dataType: "json",
            }
        },
        preparePostData: function (data) {
            data.phrase = datos;
            return data;
            console.log(data);
        },
        requestDelay: 400,
            list: {
            onSelectItemEvent: function() {
            // get_order_id = $("#order_line_entry").getSelectedItemData().order_id;
            // console.log(get_order_id);
            }
        }
    };
	console.log("#"+this.id);
//jQuery("#"+this.id).easyAutocomplete(optionsCargo);

});
jQuery(document).delegate(".cargo_load", "focus", function() {
if(jQuery("#eac-container-" + this.id).length == 0) {

console.log("#"+jQuery(this).attr("id"));
var elid="#"+jQuery(this).attr("id");
  var optionsCargo = {     
        url: function (phrase) {
            return "<$HttpCgiPath$>?IdcService=IM_GET_JSON_PROA_BUSQUEDA_CARGOS_TEMPLATE";
        },getValue: "nombre",
        ajaxSettings: {
            dataType: "json",
            method: "POST",
            data: {
                dataType: "json",
            }
        },
        preparePostData: function (data) {
            data.phrase = jQuery(elid).val();
            return data;
            console.log(data);
        },
        requestDelay: 400,
            list: {
            onSelectItemEvent: function() {
            // get_order_id = $("#order_line_entry").getSelectedItemData().order_id;
            // console.log(get_order_id);
            }
        }
    };
	$(document).ready(function(){
		jQuery(this).easyAutocomplete(optionsCargo);
	});
    

}else{console.log(22222222222);}
})


function pinta_documentos_lateral (parametro,tipo){
console.log("paramerro:"+parametro)
//sacamos documentos relacionados y los pintamos
	template="IM_GET_LISTADO_DOC_BUSQUEDA_JSON_TEMPLATE";
	jQuery.ajax({
		url: HttpCgiPath + "?IdcService="+template,
		dataType: "json",
		method: "POST",
		data: { parametro: parametro,URLImagenes:URLImagenes,tipo:tipo} ,
		error: function(xhr, textStatus, error){
			console.log(xhr.statusText);
			console.log(textStatus);
			console.log(error);
		},
		success: function (data) {
		var listaDoc="";
		console.log("data:"+data+"-findata")
			if ( data == "1" ){
				
					jQuery(".esLisDoc").html('');
					jQuery(".esLisDocMuestra").addClass("hidden");
				
			}else{
			
					listaDoc+='<ul class="ulListaDoc"  id="muestraDocRelaciondos" style="display:none;">'+ '\r\n';
					jQuery.each(data, function(index, item) {
						//listaDoc+='<li class="liListaDoc" data-liDoc="id-'+item.iso+'" title="mostar contenido" tabindex="0"> \r\n';
						// listaDoc+='<p>'+item.iso+'</p>';
						
							//listaDoc+='<ul class="theme hidden id-'+item.iso+'">'+ '\r\n';
						//lo comentado elimina  duplicados del por nobre del json, no lu utilizamos  devuelve carmen  no duoplicados en la query por id
							//if(jQuery.inArray(value.nombre_bonito, ids) == -1)
							//{
								//ids.push(value.nombre_bonito);
								//clean.push(value);
							//}
						//});							
						//console.log("ids:  "+ids);	
						//jQuery.each(clean, function(index, documento){							
													
						jQuery.each(item.documentos, function(index, documento) {
							
								listaDoc+='<li>'+ '\r\n';
													
							listaDoc+='<a class=" id-'+documento.id+'" title="abre documento '+documento.nombre_bonito+'" target="_blank" href="'+URLDocumentos_ver+'/'+documento.nombre_link+'">'+documento.nombre_bonito+'<img src="'+URLImagenes+'/ventana_nueva.gif" alt="' + eval("wwsagNuevaVentana" + sufijoIdioma) + '" /></a>'+ '\r\n';
							
								listaDoc+='</li>'+ '\r\n';
														
						});
						
						
							//listaDoc+='</ul>'+ '\r\n';
										
						//listaDoc+='</li>'+ '\r\n';
						
					});
					listaDoc+="</ul>"+ '\r\n';
					//js del desplegable
					var sript="<script>$('.liListaDoc').each(function(idx){$(this).attr('tabindex',0);	$(this).attr({title:'Mostrar contenido'});$(this).bind('click', function(e){var queiso=$(this).attr('data-lidoc');if($(this).hasClass('desplegado')){$(this).removeClass('desplegado');$('.'+queiso).addClass('hidden');$(this).attr({title:'Mostrar contenido'});}else{$(this).addClass('desplegado');	$('.'+queiso).removeClass('hidden');$(this).attr({title:'Ocultar contenido'});}}).bind('mousedown', function(e){$(this).data('mouseDown', true);}).bind('mouseup', function(e){	$(this).removeData('mouseDown');}).bind('focus', function(e){if (!$(this).data('mouseDown')){$(this).trigger('click');}});	});</script>";
var sript1="<script>$('.liListaDoc').on('click',function(){var queiso=$(this).attr('data-lidoc');  $('.'+queiso).toggle(); });<script>";
				//	listaDoc+=sript;
					console.log(listaDoc);
					jQuery(".esLisDocMuestra").removeClass("hidden");
					jQuery(".esLisDoc").html(listaDoc);
					
					if ( tipo == "todos"){
					jQuery(".listadoDocumentos").html(listaDoc);
					jQuery(".ulListaDoc").css("display","block");
					jQuery(".ulListaDoc").addClass("listaBusquedaGeneral");
					}
				}
		}
	});	
}

	
	
	jQuery(".filtroDocumentoLabel").click(function(){ 
				jQuery(".listadoDocumentosNoDOC").addClass("hidden");
				jQuery(".listadoDocumentos").removeClass("hidden");
			});
	jQuery(".filtroProductosLabel,.filtroEmpresaLabel").click(function(){ 
				jQuery(".listadoDocumentosNoDOC").removeClass("hidden");
				jQuery(".listadoDocumentos").addClass("hidden");
	});
	jQuery(".filtroDocumentoLabel,.filtroEmpresaLabel").click(function(){ 
	console.log(1111);
			jQuery(".filtradodep").addClass("hidden");
	});
	jQuery(".filtroProductosLabel").click(function(){ 
	console.log(2222);
			jQuery(".filtradodep").removeClass("hidden");
	});
	function quitaToltip(){
		jQuery(".toltipcat").tooltip('hide');
		console.log("oculta");
	}
	function pintaToltipCategoria(id_cat,id){
			
			var request = jQuery.ajax({
								url: HttpCgiPath + "?IdcService=IM_GET_TOLTIP_CATEGORIA",
								type: 'GET',
								data: { id: id_cat},
								success: function (datos) {
							
									
									jQuery("#tol_"+id_cat+"_"+id).tooltip({  delay: 1000,  title: datos,   html: true });
									jQuery("#tol_"+id_cat+"_"+id).tooltip('show');
									console.log(datos);
								}
						});
			
		
	}
	

	
	
	
	function irArriba(){
		jQuery('.ir-arriba').click(function(){ jQuery('body,html').animate({ scrollTop:'0px' },1000); });
		jQuery(window).scroll(function(){
			if(jQuery(this).scrollTop() > 0){ jQuery('.ir-arriba').slideDown(600); }else{ jQuery('.ir-arriba').slideUp(600); }
		  });
		jQuery('.ir-abajo').click(function(){ jQuery('body,html').animate({ scrollTop:'1000px' },1000); });
}

//Valida el formato de campos especiales del formulario (telefono, correo, ...)
function validarCamposCorreo(correo) {

	if (correo.replace(/^\s*|\s*$/g, "") != "") {
		var RegExPattern = /^[\w\-\_]+(\.[\w\-\_]+)*@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/;
		if (!correo.match(RegExPattern)) {
			alert(eval("wwmrFormatoCorreo" + sufijoIdioma));
			return false;
		}
	}
	
	return true;
}
//Valida el formato de campos especiales del formulario (telefono, correo, ...)
function validarCamposTelefono(telefono) {
	//El metodo split ya devuelve un array
	var aTelefonos = telefono.split(",");
	for (i = 0; i < aTelefonos.length; i++) {
		//Siempre deberia entrar por el IF, ya que antes se han eliminado todos los posibles espacios entre comas que haya
		if (aTelefonos[i].replace(/^\s*|\s*$/g, "") != "") {
			var RegExPattern = /^\+?\d{1,3}?[- .]?\(?(?:\d{1,3})\)?[- .]?\d{2,3}[- .]?\d{3,4}$/;
			var regoscar=/^(\+[1-9][0-9]*(\([0-9]*\)|-[0-9]*-))?[0]?[1-9][0-9\- ]*$/;
			if (!aTelefonos[i].match(regoscar)) {
				if (aTelefonos.length == 1) {
					alert(eval("wwmrFormatoTelefono" + sufijoIdioma));
				} else {
					alert(eval("wwmrFormatoTelefonoVarios" + sufijoIdioma));
				}
				return false;
			}
		}
	}

	return true;
}
function sacaidyuotube(elem){

        var newval = '',
            jQuerythis = jQuery(elem);

        if (newval = jQuerythis.val().match(/(\?|&)v=([^&#]+)/)) {

            jQuerythis.val("https://www.youtube.com/embed/"+newval.pop());

        } else if (newval = jQuerythis.val().match(/(\.be\/)+([^\/]+)/)) {

            jQuerythis.val("https://www.youtube.com/embed/"+newval.pop());

        } else if (newval = jQuerythis.val().match(/(\embed\/)+([^\/]+)/)) {

            jQuerythis.val("https://www.youtube.com/embed/"+newval.pop().replace('?rel=0',''));
			
        }

    }
jQuery('.enlace1').on('change', function(){

        var newval = '',
            jQuerythis = jQuery(this);

        if (newval = jQuerythis.val().match(/(\?|&)v=([^&#]+)/)) {

            jQuerythis.val("https://www.youtube.com/embed/"+newval.pop());

        } else if (newval = jQuerythis.val().match(/(\.be\/)+([^\/]+)/)) {

            jQuerythis.val("https://www.youtube.com/embed/"+newval.pop());

        } else if (newval = jQuerythis.val().match(/(\embed\/)+([^\/]+)/)) {

            jQuerythis.val("https://www.youtube.com/embed/"+newval.pop().replace('?rel=0',''));
			
        }

    });

	
	// js para  la seleccion de comunidades provincias y localidades multiples en el  buscador avanzados, pestaña empresas
		var globalCloneDir1 = jQuery('#direcciones1 options');
		var globalCloneDir2 = jQuery('#direcciones2 optgroup');
		var globalCloneDir3 = jQuery('#direcciones3 optgroup'); 
		
		
	
		  
		var selected=[];
		cargayReiniciaSeleccionados(2,globalCloneDir2,selected,'direcciones');
		cargayReiniciaSeleccionados(3,globalCloneDir3,selected,'direcciones');	
		AsignaInputSubIso (2,'direcciones');
		limpiaAsignaiso(2,'direcciones');
		AsignaInputSubIso (3,'direcciones');
		limpiaAsignaiso(3,'direcciones');
		jQuery('#direcciones1').on('change', function(){
			jQuery(".mensaje p").html("");
			limpiaAsignaiso(1,'direcciones');
			//grabamos la lista input seleccionados de iso1 en un array
			var selections = jQuery('#categorias1').val();
			// cargamos el todos los input de iso2
			var selected=[];
			cargayReiniciaSeleccionados(2,globalCloneDir2,selected,'direcciones');
			cargayReiniciaSeleccionados(3,globalCloneDir3,selected,'direcciones');	
			
			 
			
			AsignaInputSubIso (2,'direcciones');
			limpiaAsignaiso(2,'direcciones');
			AsignaInputSubIso (3,'direcciones');
			limpiaAsignaiso(3,'direcciones');
		
		});
	
		jQuery('#direcciones2').on('change', function(){
			limpiaAsignaiso(2,'direcciones');
			//grabamos la lista input seleccionados de iso1 en un array
			var selections = jQuery('#direcciones2').val();
			// cargamos el todos los input de iso3
			var selected=[];
			cargayReiniciaSeleccionados(3,globalCloneDir3,selected,'direcciones');	
		
			AsignaInputSubIso (3,'direcciones');
			limpiaAsignaiso(3,'direcciones');
			muestraOcultaMensajeCategorias();

		});

		jQuery('#direcciones3').on('change', function(){
			limpiaAsignaiso(3,'direcciones');
			muestraOcultaMensajeCategorias();

		});
		
	function limpiaAsignaDir (){
		var textoCat ="";
		jQuery('#direcciones_text').html('');
		jQuery('[data-id=\"direcciones1"] .filter-option-inner-inner').html('');
	
			var j =0;
			textoCat+='<ul>';
			jQuery('#direcciones1 option:selected').each(function() {
				var grupo1 =this.value;
				textoCat+='<li id="selccionado_'+this.value+'">';
				textoCat+='<p>'+this.text+'</p>';
				textoCat+='<ul>';
				jQuery('#direcciones2 option:selected').each(function() {
					var grupo2 =this.value;	
					if ( jQuery(this).attr("data-group") == grupo1 ){
					textoCat+='<li id="selccionado_'+this.value+'">';
						textoCat+='<p >'+this.text+'</p>';
						textoCat+='<ul>';
						jQuery('#direcciones3 option:selected').each(function() {
						
							var grupo=jQuery(this).attr("data-group");
							if ( grupo == grupo2 ){
								textoCat+='<li id="selccionado_'+this.value+'"><p>'+this.text+'</p></li>';
							}
							
						});//each cat3
						textoCat+='</ul>';// cat3
					grupo2 ="";
					textoCat+='</li>'; // cat2
					}
	
				
				});//each cat2
				grupo1="";
				textoCat+='</ul>';
				textoCat+='</li>'; // cat1
				j++;
			
			});//each cat 1
			textoCat+='</ul>';			
			if ( j == 0 ){
			textoCat="Ninguna opción seleccionada";
			}
					
		jQuery('#direcciones_text').html(textoCat);
		
	}
	
	jQuery(".filtradobus").click(function(){ 
		jQuery(".filtradobus ").removeClass("active");
		jQuery(this).addClass("active");
	 var cual =jQuery(this).data('cual');
		jQuery(".resultadosbus").addClass("oculto");
		jQuery("#"+cual).removeClass("oculto");
		
	});
	function eliminaFile(cual,cualdes,tipo,boton){ 
		
		//var cual =jQuery(this).data('cual');
		//var cualdes =jQuery(this).data('cualdes');
		//var tipo = jQuery(this).data('tipo');
		document.getElementById(cual).value = "";
		console.log("aaaa"+cualdes);
		 if (tipo == 'otro'){
			myFunctionImagenes('show'+cual,cual,cualdes,boton);
		}else{
			myFunctionImagenes('imagenPortada_show',cual,cualdes,boton);
		}
		
		document.getElementById(cualdes).value = "" ;
		jQuery('#'+cualdes).removeClass('obligatorio');
		jQuery('#'+boton).addClass('hidden');
		
		
	};
	
	jQuery(".botonBuscarAvanzado").click(function(){
		buscarJsonAvanzado ('nueva',1);
	});
	
	function buscarJsonAvanzado (tipo,numero) {
		var template ="IM_GET_HTML_BUSQUEDA_TEMPLATE_AVANZADA";
			//iniciamos la busqueda vaciando divs 
			
		
	//	jQuery(".resProductos").html("");
		//jQuery(".resEmpresas ").html("");
		console.log('mira a ver que pasa 1');
		var cuantos =10;
		/*var totalpro=10;
		var maxVisiblepro=5;
		var totalemo=10;
		var maxVisibleemop=5;*/
		var cuantosemp=jQuery('#cuantosEmp :selected').val();
		var cuantospro=jQuery('#cuantosPro :selected').val();
		//alert(cuantospro+tipo);
		if (tipo == "nueva" && cuantospro == 'todos' ){ var totalpro=1;var maxVisiblepro=1;cuantos=cuantospro;}
		if (tipo == "nueva" && cuantospro == '10' ){ 
		//queda algoritmo para calcularlo
			var totalpro=10;
			var maxVisiblepro=5;
			cuantos=cuantospro;
		}
		if (tipo == "nueva" && cuantosemp == 'todos' ){ var totalemp=1;var maxVisibleemp=1;cuantos=cuantosemp;}
		if (tipo == "nueva" && cuantosemp == '10' ){ 
		//queda algoritmo para calcularlo
			var totalpro=10;
			var maxVisiblepro=5;
			cuantos=cuantosemp;
		}
		
		if (tipo== 'Pro' && cuantospro == 'todos'){ var totalpro=1;var maxVisiblepro=1;cuantos='todos';cuantos=cuantospro;}
		if (tipo== 'Pro' && cuantospro == '10'){ var totalpro=10;var maxVisiblepro=5;cuantos='10';cuantos=cuantospro;}
		if (tipo== 'Emp' && cuantosemp == 'todos'){ var totalemp=1;var maxVisibleemp=1;cuantos='todos';cuantos=cuantosemp;}
		if (tipo== 'Emp' && cuantosemp == '10'){ var totalemp=10;var maxVisibleemp=5;cuantos='10';cuantos=cuantosemp;}
			var request = jQuery.ajax({
		
			url: HttpCgiPath + "?IdcService="+template,
			type: 'POST',
			dataType: "json",
			data: jQuery('#busquedaAvanzada').serialize() + "&pagina=" + numero+"&tipo="+tipo+"&cuantos="+cuantos ,
			beforeSend: function() {
				jQuery('.cargando').removeClass("hidden");
				jQuery("#resBusquedaAvan ").addClass("hidden");
				if ( tipo == 'nueva') {
					jQuery(".grupoDeFiltrosAvanzados ").addClass("hidden");
				}
				
			},
			complete: function(){
				jQuery('.cargando').addClass("hidden");
				jQuery("#resBusquedaAvan ").removeClass("hidden");
				 if ( tipo == 'nueva') {
					jQuery(".grupoDeFiltrosAvanzados ").removeClass("hidden");
				}
			},
			error: function(xhr, textStatus, error){
				console.log(xhr.statusText);
				console.log(textStatus);
				console.log(error);
			},
			success: function (data) {
			console.log(data);
				generaHtmlAvanzadas(data,tipo,numero);
			console.log('genero el html que falla ahora');	
				
				//jQuery(".resProductos").html("productos");
				//jQuery(".resEmpresas ").html("empresas");
				//jQuery(".resProductos").append(data);
				//jQuery(".resEmpresas ").append(data);
				if ( tipo == 'nueva'  ) {
				//alert(tipo+cuantos);
                   jQuery('#pagination-herePro,#pagination-herePro_bottom').bootpag({
						total: totalpro,          
						page: numero,            
						maxVisible: maxVisiblepro,     
						leaps: true,
						href: "#result-page-{{number}}",
					})
					jQuery('#pagination-hereEmp,#pagination-hereEmp_bottom').bootpag({
						total: totalemp,          
						page: numero,            
						maxVisible: maxVisibleemp,     
						leaps: true,
						href: "#result-page-{{number}}",
					})
                } 
				if  (  tipo == 'Pro'){
                     jQuery('#pagination-herePro,#pagination-herePro_bottom').bootpag({
						total: totalpro,          
						page: numero,            
						maxVisible: maxVisiblepro,     
						leaps: true,
						href: "#result-page-{{number}}",
					})
                }
				if  ( tipo == 'Emp' ){
                    jQuery('#pagination-hereEmp,#pagination-hereEmp_bottom').bootpag({
						total: totalemp,          
						page: numero,            
						maxVisible: maxVisibleemp,     
						leaps: true,
						href: "#result-page-{{number}}",
					})
                }
			
			}
		});
		
}
jQuery('#pagination-herePro').on("page", function(event, num){
    //show / hide content or pull via ajax etc
	buscarJsonAvanzado ('Pro',num);
});
jQuery('#pagination-hereEmp').on("page", function(event, num){
    //show / hide content or pull via ajax etc
	buscarJsonAvanzado ('Emp',num);
});
jQuery('.cuantosDatos').change( function() {
	var cual =jQuery(this).data('cual');
	buscarJsonAvanzado (cual,1);
});

jQuery(".botonInforme").click(function(){
	var cual =jQuery(this).data('cual');
	
	CargaCamposInformesPredefinidos (cual);
});
jQuery(".GuardarInforme").click(function(){
	
	console.log( jQuery( "#creainformes" ).serialize() );
	var request = jQuery.ajax({
		

			url: HttpCgiPath + "?IdcService=IM_GET_GUARDA_INFORME",
			type: 'GET',
			data: jQuery( "#creainformes" ).serialize(),
			error: function(xhr, textStatus, error){
			 console.log(xhr.statusText);
			 console.log(textStatus);
			 console.log(error);
			},
			success: function (data) {
				if ( data != 0){
					if (jQuery('.inf_'+data).length){
						jQuery('.inf_'+data).text(jQuery('#titulo').val());
					}else{
						jQuery('#selInforme').append('<option class="inf_'+data+'" value="'+data+'" >'+jQuery('#titulo').val()+'</option>');
						jQuery('.inf_'+data).prop('selected', true);
						
					}
				alert("Informe guardado correctamente");
				console.log(data);
			}else{
				alert("¡Error al guardar el informe!");
				console.log(data);
			}
				
					
						
						
					
			}
		});

	
	
	});
	

	
function CargaCamposInformesPredefinidos (parametro){
		var request = jQuery.ajax({
		

			url: HttpCgiPath + "?IdcService=IM_GET_CAMPOS_INFORMES_PREDEFINIDOS",
			type: 'GET',
			data: "parametro="+parametro,
			error: function(xhr, textStatus, error){
			 console.log(xhr.statusText);
			 console.log(textStatus);
			 console.log(error);
			},
			success: function (data) {
				
				var myarrayId = data.slice(1).split(',');
				jQuery(".campoInforme").prop('checked', false);
				jQuery(".campoInforme").removeProp('checked');
				for(var i = 0; i < myarrayId.length; i++)
					{
						console.log("#campo_"+myarrayId[i]);
						jQuery("#campo_"+myarrayId[i]).prop('checked', true);
						jQuery("#campo_"+myarrayId[i]).attr('checked','checked');
						
					}
			}
		});
}
function generaHtmlAvanzadas(data,tipor,pagina){

							//p: si hay resultados , emp: si hay alguna empresa, pro: si hay algun producto								
									var p=1;
									var emp=0;
									var pro=0;
									var act=0;
									var inact=0;
									var borra=0;
									var compara="1";
									var listaIdCat="";
									var listaIdCatArr=[];
									var id_li="";
									var id_li2="";
									//si hay datos 
								
									var lista_navegacion_productos="";
									var lista_navegacion_productos_activos="";
									var lista_navegacion_productos_inactivos="";
									var lista_navegacion_productos_borrador="";
									var lista_navegacion_empresas="";
									var count = Object.keys(data).length;
									var estado="";		
									var url_categorias=jQuery("#url_categorias").val();
									var i = 0;
									var ip = 0;
									
									//console.log(data);
									
									if (data != 0 ){
								
											var datos_productos='';
											var datos_empresas='';
											var categorias_lista="";
											
											jQuery(".filtro_categorias li").css("display","none");
											
										jQuery.each(data, function(index, item) {

											listaIdCat="";
											if (!item.hasOwnProperty('foto') || item.foto == ""){
											item.foto="sin_imagen.jpg";
											
											}
											
											//if ( i <= 11 || ip <= 11) { // quitar !!!
											 //busqueda general de productos y empresas juntos (buscador principal)
													var oculta="";
													if (typeof item.desc_foto === 'undefined') {
															item.desc_foto="sin imagen propia del producto";
														}
													var imagen= '<div class="img left">' + '\r\n' +
																'<img src="'+URLImagenes_bbdd+'/'+item.foto+'" alt="'+item.desc_foto+'" />'+ '\r\n' +
														 '</div>' + '\r\n';
													//controlamos si existe alguna empresa o producto para pintar que no hay 													
													if (item.tipo == "EMPRESA" ){ 
													
														lista_navegacion_empresas=lista_navegacion_empresas+item.id_prod+",";
														emp++;
														var clase="label-info";
														var esempresa= "list-item-empresa";
														var categorias_lista="";
														var url =jQuery('#urlEmpresa').val();
														var imagen= '<div class="img left">' + '\r\n' +
																'<img src="'+URLImagenes_bbdd+'/img_empresa.jpg" alt="'+item.desc_foto+'" />'+ '\r\n' +
														 '</div>' + '\r\n';
														var compara="";
														if (typeof item.modelo !== 'undefined' && item.modelo != "") {
															item.nombre=item.nombre+" - "+item.modelo;
														}
													}
													else if ( item.tipo == "PRODUCTO" ){
													
														lista_navegacion_productos=lista_navegacion_productos+item.id_prod+",";
														pro++;
														var clase="label-success";
														var esempresa= "";
														var categorias='';
														item.contenido=item.contenido +" ...";
														if (typeof item.modelo !== 'undefined') {
															item.nombre=item.nombre+" - "+item.modelo;
														}
														
														var url =jQuery('#url').val();
														// console.log(item.categorias);
															categorias_lista="";
															if (typeof item.categorias !== 'undefined') {
															
															if(item.categorias.length > 1){
																categorias_lista+='<ul class="theme">'+ '\r\n';;
															}
															var listado_cat="";
															 jQuery.each(item.categorias, function(index, categoria) {
																if (listado_cat.indexOf(categoria.id) == -1) {
																if(item.categorias.length > 1){
																	categorias_lista+='<li>'+ '\r\n';;
																}
																	categorias_lista+='<a title="" id="tol_'+categoria.id+'_'+item.id_prod+'" onmouseout="quitaToltip();return true;" onMouseOver="pintaToltipCategoria('+categoria.id+','+item.id_prod+'); return true"   class="toltipcat"  href="'+url_categorias+'?tipo=listaCategorias&value='+categoria.id+'" ><span class="label label_filtro '+categoria.id+' '+categoria.nombre+' label-danger ">'+categoria.nombre+'</span></a>'+ '\r\n';
																if(item.categorias.length > 1){
																	categorias_lista+='</li>'+ '\r\n';
																}
															

																}
																listado_cat=listado_cat+","+categoria.id;
															})
															if(item.categorias.length > 1){
																categorias_lista+='</ul>'+ '\r\n';;
															}
															}
														
														if (item.categorias == "" ){
														
														jQuery.each(item.categorias, function(index, categoria) {
														categorias+='<a title="" id="tol_'+categoria.id+'_'+item.id_prod+'" onmouseout="quitaToltip();return true;" onMouseOver="pintaToltipCategoria('+categoria.id+','+item.id_prod+'); return true"   class="toltipcat" href="'+url_categorias+'?tipo=listaCategorias&value='+categoria.id+'" ><span class="label label_filtro '+categoria.nombre+'  '+categoria.id+' label-danger ">'+categoria.nombre+'</span></a>'+ '\r\n';
														var imagen= '<div class="img left">' + '\r\n' +
																'<img src="'+URLImagenes_bbdd+'/'+item.foto+'" alt="'+item.desc_foto+'" />'+ '\r\n' +
														 '</div>' + '\r\n';
														})
														
														}
														
														//var compara="";
														//if (count >1){
														
														//	compara='<p class="compara"><input class="es_comparado" onclick="comparaCheck('+item.id_prod+')" type="checkbox" name="comparar_'+item.id_prod+'" id="comparar_'+item.id_prod+'"/><label for="comparar_'+item.id_prod+'">Comparar</label></p>' + '\r\n';
															//}
													}
													//caso de que el json devuelva que no hay ni empresas ni productos
													if( item.nombre == "No_existen_sugerencias"){
														pro++;
														emp++;
														clase= "hidden";
														item.nombre="No existen sugerencias";
														item.contenido="";
														oculta="hidden";
														categorias="";
														imagen="";
													}
													
													if (item.tipo == "EMPRESA" ){
														//if ( i <= 11 ){ //quitar
														if (jQuery("#mandaEmpresasSeccion").val().indexOf(item.id_prod) != -1) {
																sisel = "hidden";
																siseli = "liseleccionado";
															}else{
															sisel = "";
															siseli = "";}
														datos_empresas+='<li class="list-item box '+esempresa+' '+siseli+' empresasli" id="'+item.id_prod+'"  data-nombre="'+item.nombre+'">'+'\r\n' +
															imagen +
															 '<div class="block right">'+ '\r\n' +
																'<p class="title">' + '\r\n' +
																'<a target="_blank" title="' + eval("wwsagNuevaVentana" + sufijoIdioma) + ' '+item.nombre+'" class="enviasub" data-group="'+item.tipo+'" href="'+url+'?id='+item.id_prod+'" onclick="cargaEnNueva2(this.href,\''+url+'\',\''+item.id_prod+'\',\''+item.tipo+'\',\'_blank\',\'ACTIVO_PRODUCTOS\'); return false;" data-nombre="'+item.nombre+'">'+item.nombre+'<img class="'+oculta+'"src="'+URLImagenes+'/ventana_nueva.gif" alt="' + eval("wwsagNuevaVentana" + sufijoIdioma) + '" /></a>' + '\r\n' +
																'<span class="'+sisel+'" id="spanSel_'+item.id_prod+'" onclick="mandaSeccion(\'mandaEmpresasSeccion\',\''+item.id_prod+'\',\''+item.nombre+'\')">Seleccionar</span>'+
																'</p>' + '\r\n' +
																//compara+
																'<p class="desc">'+item.contenido+'</p>' + '\r\n' +
																'<p class="theme">' + '\r\n' ;
																	datos_empresas+='<span class="label label_filtro keywords_departamentotodos ';
																	
																	if (typeof item.departamentos !== 'undefined') {
																	
																	datos_empresas+=' '+item.departamentos+' ';
																	
																	}																
																	
																	datos_empresas+=' DEPTodos ';
																	datos_empresas+='hidden">'+ '\r\n';
																
																
																if (typeof item.departamentos !== 'undefined') {
																	datos_empresas+=' '+item.departamentos+' ';
																}
																datos_empresas+='DEPTodos</span>'+ '\r\n';
																	
																	
																	
																	
																	
																	datos_empresas+='<span class=" hidden label label_filtro '+item.tipo+'">'+item.tipo+'</span>'+ '\r\n';
																	if (typeof item.categorias !== 'undefined') {
																		if(item.categorias.length == 1){
																			datos_empresas+=categorias_lista+'\r\n';
																		}
																	}
																	 
																'</p>' + '\r\n';
																if ( typeof item.categorias !== 'undefined') {
																	if( item.categorias.length > 1){
																		datos_empresas+=categorias_lista+'\r\n';
																	}
																}
															datos_empresas+='</div>' + '\r\n' +
															
														'</li>' + '\r\n'; 
														i = i +1; //quitar
													//}//quitar
													}else if ( item.tipo == "PRODUCTO" ){
													//if ( ip <= 11 ){ //quitar
															if (jQuery("#mandaProductosSeccion").val().indexOf(item.id_prod) != -1) {
																sisel = "hidden";
																siseli = "liseleccionado";
															}else{
															sisel = "";
															siseli = "";}
															datos_productos+='<li aaaa class="list-item box '+esempresa+' '+siseli+' productosli" id="'+item.id_prod+'" data-tipo="producto" data-nombre="'+item.nombre+'">' + '\r\n' +
															imagen +
															 '<div class="block right">'+ '\r\n' +
																'<p class="title">' + '\r\n' +
																	'<a target="_blank" title="' + eval("wwsagNuevaVentana" + sufijoIdioma) + ' '+item.nombre+'" class="enviasub" data-group="'+item.tipo+'" href="'+url+'?id='+item.id_prod+'" onclick="cargaEnNueva2(this.href,\''+url+'\',\''+item.id_prod+'\',\''+item.tipo+'\',\'_blank\',\'ACTIVO_PRODUCTOS\'); return false;">'+item.nombre+'<img class="'+oculta+'"src="'+URLImagenes+'/ventana_nueva.gif" alt="' + eval("wwsagNuevaVentana" + sufijoIdioma) + '" /></a>' + '\r\n' +
																'<span  class="'+sisel+'" id="spanSel_'+item.id_prod+'" onclick="mandaSeccion(\'mandaProductosSeccion\',\''+item.id_prod+'\',\''+item.nombre+'\')">Seleccionar</span>'+
																'</p>' + '\r\n' +
																//compara+
																'<p class="desc">'+item.contenido+'</p>' + '\r\n' +
																'<p class="theme">' + '\r\n' ;
																	datos_productos+='<span class="label label_filtro keywords_departamentotodos ';
																	
																	if (typeof item.departamentos !== 'undefined') {
																	
																	datos_productos+=' '+item.departamentos+' ';
																	
																	}																
																	
																	datos_productos+=' DEPTodos ';
																	datos_productos+='hidden">'+ '\r\n';
																
																
																if (typeof item.departamentos !== 'undefined') {
																	datos_productos+=' '+item.departamentos+' ';
																}
																datos_productos+='DEPTodos</span>'+ '\r\n';
																	
																	
																	
																	
																	
																	datos_productos+='<span class=" hidden label label_filtro '+item.tipo+'">'+item.tipo+'</span>'+ '\r\n';
																	if (typeof item.categorias !== 'undefined') {
																		if(item.categorias.length == 1){
																			datos_productos+=categorias_lista+'\r\n';
																		}
																	}
																	 
																'</p>' + '\r\n';
																if ( typeof item.categorias !== 'undefined') {
																	if( item.categorias.length > 1){
																		datos_productos+=categorias_lista+'\r\n';
																	}
																}
															datos_productos+='</div>' + '\r\n' +
															
														'</li>' + '\r\n'; 
													ip = ip +1; //quitar
													//}
													}
													
												//}// quitar id <=10 var i =i+1;
										});	
										
									}
									
		var cuantosemp=jQuery('#cuantosEmp :selected').val();
		var cuantospro=jQuery('#cuantosPro :selected').val();
		console.log("aaaaa"+cuantospro+tipor);
		if (tipor == "nueva" && cuantospro == 'todos' ){jQuery(".cuantosenpgnPro").html('<strong>mostrando del 1 al '+pro+'	de '+pro+'</strong>	');}
		if (tipor == "Pro" && cuantospro == 'todos' ){ 
			jQuery(".cuantosenpgnPro").html('<strong>mostrando del 1 al '+pro+'	 de '+pro+' </strong>	');
		}
		if (tipor == "Pro" && cuantospro == '10' ){ 
			var inipag=pagina-1;
			if ( pagina > 1 ){
			jQuery(".cuantosenpgnPro").html('<strong>mostrando del '+inipag+'1 al '+pagina+'0  o se calculará y se mostrará	</strong>');
			}else{
			jQuery(".cuantosenpgnPro").html('<strong>mostrando del 1 al '+pagina+'0  o se calculará y se mostrará	</strong>');
			}
		}
		if (tipor == "nueva" && cuantosemp == 'todos' ){ jQuery(".cuantosenpgnEmp").html('<strong>mostrando del 1 al '+emp+'	</strong>	');}
		if (tipor == "emp" && cuantosemp == 'todos' ){ 
			jQuery(".cuantosenpgnEmp").html('<strong>mostrando del 1 al '+emp+'	</strong>	');
		}
	console.log(pro);	
	console.log(emp);	
jQuery("#listEmpresas").html(datos_empresas);
jQuery("#listProductos").html(datos_productos);
}

function mandaSeccion(tipo,id,nombre){
//añadimos al listado de productos o empresas segun el tipo 
	var listado=jQuery("#"+tipo).val();
	if (listado == "" ){
	listado = id;
	
	}else{listado=listado+','+id}
	
	jQuery("#"+tipo).val(listado);
	// se añade al div para que se vean los selccionados
	jQuery("#"+tipo+"Nombres ul").append('<li id="sel_env_'+id+'" data-nombre="'+nombre+'" data-id="'+id+'">'+nombre+' <span class="eliminaIDSel" onclick="eliminaSeleccionadoSec(\''+tipo+'\',\''+id+'\',\''+nombre+'\')">X</span></li>')
	jQuery("#spanSel_"+id).addClass('hidden');
	jQuery("#"+id).addClass('liseleccionado');	
	}
function eliminaSeleccionadoSec(tipo,id,nombre) {
	jQuery("#spanSel_"+id).removeClass('hidden');
	jQuery("#sel_env_"+id).toggle("slow").promise().done(function(){
		jQuery("#sel_env_"+id).remove();
	});
	
	
	var listado=jQuery("#"+tipo).val();
	
	listado=listado.replace(','+id,'');
	listado=listado.replace(id,'');
	jQuery("#"+tipo).val(listado);
	jQuery("#"+id).removeClass('liseleccionado');	
}

function seleccionaTodosSel (tipo,cuales){
	jQuery("."+cuales).each(function(i) {
		if (jQuery("#mandaProductosSeccion").val().indexOf(jQuery(this).attr('id')) == -1) {
			mandaSeccion(tipo,jQuery(this).attr('id'),jQuery(this).data('nombre'));														
		}
	});
}
function eliminaTodosSel (tipo,cuales,cont){
	jQuery("#"+tipo).val('');
	jQuery("#"+cont).html('');
	jQuery("."+cuales).each(function(i) {
		eliminaSeleccionadoSec(tipo,jQuery(this).attr('id'),jQuery(this).data('nombre'));														
		
	});
}


function enviarTodosinf (tipo,cuales,cont){
var values=jQuery("#"+tipo).val();
var id_Seccion=jQuery('#cuantasSeccionesHay').val();

var html='';
html+='<div id="seccion_'+jQuery("#cuantasSeccionesHay").val()+'" class="cursorMove">';
html+='<span class="handle"></span>';
html+='<input type="button"  value="Eliminar Sección" class="borraSeccion" onclick="borraSeccion(\''+id_Seccion+'\')">';
html+='<input type="hidden"  name="mandaProductosSeccion_'+id_Seccion+'" id="mandaProductosSeccion_'+id_Seccion+'" class="mandaProductosSeccion" value="'+values+'">';
html+='<div class="tituloSeccion">';
html+='<label for="tituloSeccion_'+jQuery("#cuantasSeccionesHay").val()+'">Título de la sección:</label>';
html+='<input type="text"  name="tituloSeccion_'+jQuery("#cuantasSeccionesHay").val()+'" id="tituloSeccion_'+jQuery("#cuantasSeccionesHay").val()+'">';
html+='</div>';
html+='<div class="mandaProductosSeccionNombres_'+id_Seccion+'" id="mandaProductosSeccionNombres_'+id_Seccion+'"><ul class="listadoInformes" id="prodSel_'+id_Seccion+'">';
	console.log()
	jQuery("#"+cont).find('li').each(function(i) {
		var id= jQuery(this).data('id');
		var nombre=jQuery(this).data('nombre')	;													
		html+='<li id="sel_env_inf_'+id+'" data-nombre="'+nombre+'" data-id="'+id+'">'+nombre+' <span class="eliminaIDSel" onclick="eliminaSeleccionadoSec(\'mandaProductosSeccion_'+id_Seccion+'\',\'inf_'+id+'\',\''+nombre+'\')">X</span></li>';
	});
html+='</ul></div>'
html+='</div>';
jQuery('.seccionesContenedor').append(html);
jQuery('#cuantasSeccionesHay').val(parseInt(id_Seccion)+1);
eliminaTodosSel(tipo,cuales,cont);
alert("Los elementos seleccionados han sido añadidos al informe en una nueva sección." )
}
 
 

function borraSeccion(id_Seccion){
	jQuery('#seccion_'+id_Seccion).toggle("slow").promise().done(function(){
		jQuery('#seccion_'+id_Seccion).remove();
	});
	//
}
	// cuando seleccionon un inforfmre cargamos sus datos de un json
/*	jQuery(".selInforme").on('change', function() {
	
		jQuery('.seccionesContenedor').html('');
		jQuery("#titulo").val('');
		if (this.value != 0){
			var request = jQuery.ajax({
				url: HttpCgiPath + "?IdcService=IM_GET_INFORME",
				dataType: "json",
				method: "GET",
				data: 'parametro='+this.value,
				error: function(xhr, textStatus, error){
				console.log(xhr.statusText);
				 console.log(textStatus);
				console.log(error);
				},
				success: function (data) {
					console.log(data);
					jQuery.each(data, function(index, item) {
						console.log(item.titulo);
						jQuery("#titulo").val(item.titulo);
						
						var cuantasSeccionesHay=1;
								jQuery.each(item.secciones, function(index, seccion) {
									cuantasSeccionesHay=cuantasSeccionesHay+1;
									var valmanda="";
									var htmli="";
									jQuery.each(seccion.productos_seccion, function(index, producto) {
										htmli+='<li id="sel_env_inf_'+producto.id+'" data-nombre="'+producto.nombre+'" data-id="'+producto.id+'">'+producto.nombre+' <span class="eliminaIDSel" onclick="eliminaSeleccionadoSec(\'mandaProductosSeccion_'+seccion.seccion_orden+'\',\'inf_'+producto.id+'\',\''+producto.nombre+'\')">X</span></li>';
										valmanda=valmanda+","+producto.id;
									});
									valmanda=valmanda.substring(1);
									var html='';
									html+='<div id="seccion_'+seccion.seccion_orden+'" class="cursorMove">';
									html+='<span class="handle"></span>';
									html+='<input type="button"  value="Eliminar Sección" class="borraSeccion" onclick="borraSeccion(\''+seccion.seccion_orden+'\')">';
									html+='<input type="hidden"  name="mandaProductosSeccion_'+seccion.seccion_orden+'" id="mandaProductosSeccion_'+seccion.seccion_orden+'" class="mandaProductosSeccion" value="'+valmanda+'">';
									html+='<div class="tituloSeccion">';
									html+='<label for="tituloSeccion_'+seccion.seccion_orden+'">Título de la sección:</label>';
									html+='<input type="text"  name="tituloSeccion_'+seccion.seccion_orden+'" id="tituloSeccion_'+seccion.seccion_orden+'" value="'+seccion.seccion_titulo+'">';
									html+='</div>';
									html+='<div class="mandaProductosSeccionNombres_'+seccion.seccion_orden+'" id="mandaProductosSeccionNombres_'+seccion.seccion_orden+'"><ul class="listadoInformes" id="prodSel_'+seccion.seccion_orden+'">';
										html+=htmli;
									html+='</ul></div>'
									html+='</div>';
									console.log(html);
									jQuery('.seccionesContenedor').append(html);
									
								});
								jQuery('#cuantasSeccionesHay').val(cuantasSeccionesHay);
									var html_fechai="";
								jQuery.each(item.fechas, function(index, fecha) {
									
										html_fechai+='<li>'+fecha.departamento+'( '+fecha.fecha+') </li>';
										
								});
								
									var html_fecha='';
									html_fecha+='<div id="fechas" class="fechasInforme"><ul>';
									html_fecha+=html_fechai;
									html_fecha+='</ul></div>';
									
									console.log(html_fecha);
									jQuery('.fechasInformesViejos').html(html_fecha);
								
					});
				}
			});

		}else{jQuery('.fechasInformesViejos').html('');}
	});	

*/	
	
// select multiple de empresaas para el buscador avanzado
var globalCloneEmp1 = jQuery('#nombreEmpresa1 options');
var selected=[];

jQuery('#nombreEmpresa1').on('change', function(){
console.log(1111111);
			jQuery(".mensaje p").html("");
			limpiaAsignaiso(1,'nombreEmpresa');
			//grabamos la lista input seleccionados de iso1 en un array
			var selections = jQuery('#nombreEmpresa1').val();
	
		});

// clonamos los options de empresas originales.	
var globalCloneEmpresas = jQuery('#nombreEmpresa1 options');
//   carga por ajax los campos de las empresas  dependiendo de la iso en el buscador avanzado
		function cargaCamposSelectEmpresas (template){
		var ids_isos = jQuery('#listaIso2').val()+jQuery('#listaIso3').val();
		ids_isos=ids_isos.slice(0,-1);
				jQuery.ajax({
				url: HttpCgiPath + "?IdcService=IM_GET_SELECT_EMPRESAS_AVANZADO",
				type: 'POST',
				data: { ids_isos: ids_isos} ,
				error: function (jqXHR, exception) {
					var msg = '';
					if (jqXHR.status === 0) {
						msg = 'Not connect.\n Verify Network.';
					} else if (jqXHR.status == 404) {
						msg = 'Requested page not found. [404]';
					} else if (jqXHR.status == 500) {
						msg = 'Internal Server Error [500].';
					} else if (exception === 'parsererror') {
						msg = 'Requested JSON parse failed.';
					} else if (exception === 'timeout') {
						msg = 'Time out error.';
					} else if (exception === 'abort') {
						msg = 'Ajax request aborted.';
					} else {
						msg = 'Uncaught Error.\n' + jqXHR.responseText;
					}
					jQuery('#mensaje').html('<strong>ocurrio un error al cargar EMPRESAS DE UNA ISO , consulte con el administrador:' +msg+'</strong>');
					},
					success: function (data) {
						console.log(data);
						if (data == "" ){
							jQuery('#nombreEmpresa1').html(globalCloneEmpresas);
						}else{
							jQuery('#nombreEmpresa1').html(data);
						}
						jQuery('#nombreEmpresa1').selectpicker('refresh');
						ids_isos=jQuery('#listaEmpresas1').val().slice(0,-1).split("-");
						jQuery.each(ids_isos, function( index, value ) {
						console.log("existe empresa");
							jQuery('#nombreEmpresa1 option[value="' + value + '"]').attr("selected",true);
							jQuery('#nombreEmpresa1 option[value="' + value + '"]').prop("selected",true);
						});
						
						limpiaAsignaiso(1,'nombreEmpresa');
						jQuery('#nombreEmpresa1').selectpicker('refresh');
					}	
			});
		
		
		}
		
// generamos informes
			jQuery(".GenerarInforme").click(function(){
		
		var datastring = jQuery("#creainformes").serialize();
				jQuery.ajax({
				url: HttpCgiPath + "?IdcService=IM_GET_GENERA_INFORME",
				type: 'POST',
				data: datastring ,
				error: function (jqXHR, exception) {
					var msg = '';
					if (jqXHR.status === 0) {
						msg = 'Not connect.\n Verify Network.';
					} else if (jqXHR.status == 404) {
						msg = 'Requested page not found. [404]';
					} else if (jqXHR.status == 500) {
						msg = 'Internal Server Error [500].';
					} else if (exception === 'parsererror') {
						msg = 'Requested JSON parse failed.';
					} else if (exception === 'timeout') {
						msg = 'Time out error.';
					} else if (exception === 'abort') {
						msg = 'Ajax request aborted.';
					} else {
						msg = 'Uncaught Error.\n' + jqXHR.responseText;
					}
					jQuery('#mensaje').html('<strong>ocurrio un error al cargar EMPRESAS DE UNA ISO , consulte con el administrador:' +msg+'</strong>');
					},
					success: function (data) {
						console.log(data);
						alert(1111);
					}	
			});
		
		
		});
		function borrarContacto(id){
			enviarProdPapelera(id,'IM_GET_ELIMINAR_CONTACTO','CON_BORRA');
			
		}
		
			// js de los desplegables inactivos
		$('#accordionBorradores h4').each(function(idx){
				$(this).attr('tabindex',0);
				$(this).attr({title:"Mostrar contenido"});
				/*$(this).next().addClass('oculto');*/
				$(this).bind('click', function(e){
					if($(this).hasClass('desplegado')){
						$(this).removeClass('desplegado').next().hide().addClass('oculto').show();
						$(this).attr({title:"Mostrar contenido"});
					}else{
						$(this).addClass('desplegado').next().hide().removeClass('oculto').slideDown('slow');
						$(this).attr({title:"Ocultar contenido"});
					}
				}).bind('mousedown', function(e){
					$(this).data('mouseDown', true);
				}).bind('mouseup', function(e){
					$(this).removeData('mouseDown');
				}).bind('focus', function(e){
					if (!$(this).data('mouseDown')){
						$(this).trigger('click');
					}
				});
			});
$('#accordionBorradores h4 + div').bind('focusin', function(e){
	if(!$(this).prev().hasClass('desplegado')){
	$(this).prev().addClass('desplegado').next().hide().removeClass('oculto').slideDown('slow');
	}
});

function exportTableToExcel(tableID, filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    
    // Specify file name
    filename = filename?filename+'.xls':'excel_data.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
}
function Export2Doc(element, filename = ''){
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml+document.getElementById(element).innerHTML+postHtml;

    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });
    
    // Specify link url
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    
    // Specify file name
    filename = filename?filename+'.doc':'document.doc';
    
    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob ){
        navigator.msSaveOrOpenBlob(blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = url;
        
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
    
    document.body.removeChild(downloadLink);
}


// en un checked solo deja seleccionar una opcion si tiene la clase solounocheckos, se utilisza en muestra siemrpe y preseleccionaar
jQuery('.solounocheckbos').on('change', function() {
console.log("se mira si check");
    jQuery('.solounocheckbos').not(this).prop('checked', false);  
	var tipo =jQuery("#cambiopreseldato").data('tipo'); 
});
jQuery('.presel').on('change', function() {
console.log("vemos si es update o no ");
 var tipo =jQuery("#cambiopreseldato").data('tipo');   
 if( tipo ==  1 ){
	console.log("tipo inserta");
	
		if(document.getElementById('presel').checked) {
			console.log("selecciona");
			jQuery("#cambiopreseldato").show();  
			jQuery("#cambiopresel").html('');  
		} else {
			console.log("deselecciona");
			jQuery("#cambiopreseldato").hide(); 
			jQuery("#cambiopresel").html('deseleccionandolos');  
		}

	}else{
 
	console.log("tipo modifica");
				if(document.getElementById('presel').checked) {
			console.log("selecciona");
			jQuery("#cambiopreseldato").show();  
			jQuery("#cambiopresel").html('preseleccionandolos');  
		} else {
			console.log("deselecciona");
			jQuery("#cambiopreseldato").show(); 
			jQuery("#cambiopresel").html('');  
		}
 }
});
jQuery('.semuestrasiempre').on('change', function() {
console.log("vemos si es update o no ");
 var tipo =jQuery("#cambiopreseldato").data('tipo');   
 if( tipo ==  1 ){
	console.log("tipo inserta");
	
		if(document.getElementById('presel').checked) {
			console.log("selecciona");
			jQuery("#cambiopreseldato").show();  
			jQuery("#cambiopresel").html('');  
		} else {
			console.log("deselecciona");
			jQuery("#cambiopreseldato").hide(); 
			jQuery("#cambiopresel").html('deseleccionandolos');  
		}

	}else{
 
	console.log("tipo modifica");
				if(document.getElementById('presel').checked) {
			console.log("selecciona");
			jQuery("#cambiopreseldato").show();  
			jQuery("#cambiopresel").html('preseleccionandolos');  
		} else {
			console.log("deselecciona");
			jQuery("#cambiopreseldato").show(); 
			jQuery("#cambiopresel").html('');  
		}
 }
});

function muestraDocRelaciondos() {
  var x = document.getElementById("muestraDocRelaciondos");
  if (x.style.display === "none") {
    x.style.display = "block";
	x.classList.remove('glyphicon-chevron-down');
	x.classList.add('glyphicon-chevron-up');
	
  } else {
    x.style.display = "none";
	x.classList.remove('glyphicon-chevron-up');
	x.classList.add('glyphicon-chevron-down');
	
  }
}
if (jQuery(".lisborra")[0]){
    // Do something if class exists

		jQuery('.lisborra').DataTable({      
				/*initComplete: function () {
					this.api().columns('.select-filter').every( function () {
						var column = this;
						var select = jQuery('<select><option value=""></option></select>')
							.appendTo( jQuery(column.footer()).empty() )
							.on( 'change', function () {
								var val = $.fn.dataTable.util.escapeRegex(
									jQuery(this).val()
								);
		 
								column
									.search( val ? '^'+val+'$' : '', true, false )
									.draw();
							} );
		 
						column.data().unique().sort().each( function ( d, j ) {
							select.append( '<option value="'+d+'">'+d.substr(0,15)+'</option>' )
						} );
					} );
				},*/
			"language": {
			  "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
			},
			"columnDefs": [
					{ "width": "30%", targets: 5 },
					{ "width": "30%", targets: 1}
				],
			
		  });
		  }
if (jQuery(".lisina")[0]){
		jQuery('.lisina').DataTable({      
				/*initComplete: function () {
					this.api().columns('.select-filter').every( function () {
						var column = this;
						var select = jQuery('<select><option value=""></option></select>')
							.appendTo( jQuery(column.footer()).empty() )
							.on( 'change', function () {
								var val = $.fn.dataTable.util.escapeRegex(
									jQuery(this).val()
								);
		 
								column
									.search( val ? '^'+val+'$' : '', true, false )
									.draw();
							} );
		 
						column.data().unique().sort().each( function ( d, j ) {
							select.append( '<option value="'+d+'">'+d.substr(0,15)+'</option>' )
						} );
					} );
				},*/
			"language": {
			  "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
			},
			 "columnDefs": [
					 { "width": "20%", "targets": 5 },
					 { "width": "30%", targets: 1}
				],
		  });
}
if (jQuery(".lisexpo")[0]){
		  jQuery('.lisexpo').DataTable({      
				/*initComplete: function () {
					this.api().columns('.select-filter').every( function () {
						var column = this;
						var select = jQuery('<select><option value=""></option></select>')
							.appendTo( jQuery(column.footer()).empty() )
							.on( 'change', function () {
							console.log(1111111)
								var val = $.fn.dataTable.util.escapeRegex(
									jQuery(this).val()
								);
		 
								column
									.search( val ? '^'+val+'$' : '', true, false )
									.draw();
							} );
		 
						column.data().unique().sort().each( function ( d, j ) {
							select.append( '<option value="'+d+'">'+d.substr(0,15)+'</option>' )
						} );
					} );
				},*/
			"language": {
			  "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
			},
				 "columnDefs": [
					 { "width": "30%", targets: 5 },
					 { "width": "30%", targets: 1}
				],
			
		  });
}
  function printDiv(divName) {
     var printContents = document.getElementById(divName).innerHTML;
     var originalContents = document.body.innerHTML;

     document.body.innerHTML = printContents;

     window.print();

     document.body.innerHTML = originalContents;
}


jQuery('a.estab').click(function(e)
{
    // elimi9na el jum to top al pinchar en los enlaces  de los infomes
    // Canc8el the default action
console.log("es tab")
    e.preventDefault();
});


// se llama solo a la galeria porque ponia las fotos de todos los productos, se quita el rel

if ($('a.galleryInformes').length) {
	$('a.galleryInformes').colorbox({ opacity:0.5 ,   width:'632' , height:'590' });
    			$('a.galleryInformes').colorbox({
    				slideshowStart: 'Iniciar/reanudar transición',
    				slideshowStop: 'Detener transición',
    				current: 'Imagen 1 de 10'.replace("1", "{current}").replace("10", "{total}"),
    				previous: 'Imagen anterior',
    				next: 'Imagen siguiente',
    				close: 'Cerrar',
    				xhrError: 'Error en la carga del contenido.',
    				imgError: 'Error en la carga de la imagen.'
    });
				
	}			
				
				
				// funcion para imprimir un div
function PrintElemInfo(elem)
{

	var html =jQuery('div#content-header div.section').html();
	var adddiv = jQuery('div#content-header div.section').clone();
	adddiv.find('a').removeAttr('href', '');
	//adddiv.find('a').removeAttr('class');
	adddiv.find('#imprimir').remove();
	adddiv.find('br').remove();
	var cabecera =adddiv.html();
	//var mywindow = window.open('', 'PRINT', 'height=400,width=600');
	var mywindow = window.open();


	mywindow.document.open();
	mywindow.document.write('<html><head >');
	mywindow.document.write('<title>' + document.title  + '</title>');
	mywindow.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"  type="text/css"  media="all" async/>');
	mywindow.document.write('<link rel="stylesheet" href="/DInterElabora/groups/sistema/documents/sistema/sipa.css"  type="text/css"  media="all"  async/>');
	mywindow.document.write('<script src="https://code.jquery.com/jquery-1.11.1.min.js" ></script>');
	mywindow.document.write('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js" async></script>');
			
	mywindow.document.write('<style>');
	mywindow.document.write('@media print {'+
										'body {-webkit-print-color-adjust: exact;}'+
										'.informacion.ficha ul li {   background: none !important;	padding: none !important;}'+
										'#accordionEmpresa h4 + div {padding:0 !important;}'+
										'#accordionEmpresa h4 span {background: none !important;}'+
										'#accordionEmpresa h4 {padding:0 !important;}'+
										'#accordionEmpresa h4 + div {padding:0 !important;}'+
										'#accordionEmpresa h4.desplegado span { background: url(flecha-texto-abierto_sede.png) no-repeat right center !important;}'+
										'#accordionEmpresa h4.desplegado span { background: url(flecha-texto-abierto_sede.png) no-repeat right center !important;}'+
										'#content-header .logos > a {    display: inline-block;    padding: 0;    width: auto;}'+
										'#content-header .logos > a:first-child {   margin-right: 2px;}'+
										'#content-header .logos h1 span.i {    font-family: "diezma";    color: #C2410A !important;    font-size: 1.2em;}'+
										'#content-header  .logos {margin-bottom:10px;}'+
										'.referenciaGrupoTitulo {background-color: #eee !important;  -webkit-print-color-adjust: exact;}'+
										'.page-break { display: block; page-break-after: always; }'+
										'.page-breakb { display: block; page-break-after: always; }'+
										'.noPrint{display:none;}'+
										'.noScreen{display:block;}'+	
										'.img-thumbnail {'+
											'display: inline-block;'+
											' max-width: 200px !important;'+
										'}'+
										'.img-responsive {'+
											'max-width: 200px !important;'+
										'}'+
										'.img-responsive{max-width:200px !important;}'+
										'.logos h1 {'+
											'margin-left:30px;'+  
											'font-size: 1.5em; '+
											'font-weight: normal;'+
											'padding: 0;'+
											'margin-top: .67em;'+
											'text-align:center;'+
										'}'+
										'.logos a {float:left !important;}'+ 
										'ul li.impar {'+
										 '   background-color: #efefef;'+
										'}'+
										
										
									'}'								
	);
	mywindow.document.write(
										'body {-webkit-print-color-adjust: exact;}'+
										'.informacion.ficha ul li {   background: none !important;	padding: none !important;}'+
										'#accordionEmpresa h4 + div {padding:0 !important;}'+
										'#accordionEmpresa h4 span {background: none !important;}'+
										'#accordionEmpresa h4 {padding:0 !important;}'+
										'#accordionEmpresa h4 + div {padding:0 !important;}'+
										'#accordionEmpresa h4.desplegado span { background: url(flecha-texto-abierto_sede.png) no-repeat right center !important;}'+
										'#accordionEmpresa h4.desplegado span { background: url(flecha-texto-abierto_sede.png) no-repeat right center !important;}'+
										'#content-header .logos > a {    display: inline-block;    padding: 0;    width: auto;}'+
										'#content-header .logos > a:first-child {   margin-right: 2px;}'+
										'#content-header .logos h1 span.i {    font-family: "diezma";    color: #C2410A !important;    font-size: 1.2em;}'+
										'#content-header  .logos {margin-bottom:10px;}'+
										'.referenciaGrupoTitulo {background-color: #eee !important;  -webkit-print-color-adjust: exact;}'+
										'.page-break { display: block; page-break-after: always; }'+
										'.page-breakb { display: block; page-break-after: always; }'+
										'.img-thumbnail {'+
											'display: inline-block;'+
											' max-width: 200px !important;'+
										'}'+
										'.img-responsive {'+
											'max-width: 200px !important;'+
										'}'+
										'.img-responsive{max-width:200px !important;}'+
										'.logos h1 {'+
											'margin-left:30px;'+  
											'font-size: 1.5em; '+
											'font-weight: normal;'+
											'padding: 0;'+
											'margin-top: .67em;'+
											'text-align:center;'+
										'}'+
										'ul li.impar {'+
										 '   background-color: #efefef;'+
										'}'+
										 '.noPrint{}'+
										'.noScreen{/*display:none;*/}'
										
																
	);
	
	
	mywindow.document.write('</style>');
	//necesario para que cargue las imagenes en el modo de impresión
	mywindow.document.write('<script type="text/javascript">window.onload = function() { window.print();setTimeout(function() {window.close();}, 1);};</script>');
	mywindow.document.write('</head><body >');
	mywindow.document.write('<div class="container informacion ficha">');
	mywindow.document.write('<div id="content-header">');		
		mywindow.document.write(cabecera);
    mywindow.document.write('</div>');
	mywindow.document.write('<div style="padding-top:120px">');		
		 mywindow.document.write('<h1 style="text-align:center;">Informe de productos</h1>');
		 
    mywindow.document.write('</div>');
	mywindow.document.write('<div class="page-break " style="page-break-after: always;"></div>');
	jQuery(".productoInforme").each(function(){
		
		var id_pro=jQuery(this).attr('id');
		var nombre=jQuery('.nombreFicha_'+id_pro+' h3').html();
		var modelo=jQuery('.impModelo_'+id_pro).html();
		var desc = jQuery('.impDesc_'+id_pro).html();
		var img = jQuery('.galeria_'+id_pro).html();
		
		
		var total = 0;
		var maxHeight = 918;
		var total=0;
		console.log("inicio id:"+id_pro);
		var eachRowHeight = 0;
		
		//tab1
			var previousCss  = jQuery('#tabpanel-1'+id_pro).attr("style");

			jQuery('#tabpanel-1'+id_pro).css({
				position:   'absolute', // Optional if #myDiv is already absolute
				visibility: 'hidden',
				display:    'block'
			});
		jQuery('#tabpanel-1'+id_pro).children().each(function(){
            //console.log(this);
           
            var eachRowHeight = jQuery(this).height();
			total =total + eachRowHeight;
            if( total > maxHeight ){
				console.log(this);
                jQuery(this).after('<div class="corta1 page-breakb" style="page-break-before: always;"></div>');
                console.log("reseteo total="+total+" pasa a 0");
				total=0;
            }else if(total == maxHeight){
				console.log(this);
                jQuery(this).after('<div class="corta1 page-breakb" style="page-break-before: always;"></div>');
                console.log("reseteo total="+total+" pasa a 0");
				total=0;
            }
            
			console.log(total);
        });
		jQuery('#tabpanel-1'+id_pro).attr("style", previousCss ? previousCss : "");	
		console.log("total tab1:"+total);
		
		
		//tab 2
		var previousCss  = jQuery('#tabpanel-2'+id_pro).attr("style");

			jQuery('#tabpanel-2'+id_pro).css({
				position:   'absolute', // Optional if #myDiv is already absolute
				visibility: 'hidden',
				display:    'block'
			});
		 jQuery('#tabpanel-2'+id_pro).children().each(function(){
            var eachRowHeight = jQuery(this).height();
			total = total + eachRowHeight;
            if( total > maxHeight ){
				console.log(this);
                jQuery(this).before('<div class="corta1 page-breakb" style="page-break-before: always;"></div>');
                console.log("reseteo total="+total+" pasa a 0");
				total=0;
            }else if(total == maxHeight){
				console.log(this);
                jQuery(this).after('<div class="corta1 page-breakb" style="page-break-before: always;"></div>');
                console.log("reseteo total="+total+" pasa a 0");
				total=0;
            }
            
			console.log(total);
        });
		jQuery('#tabpanel-2'+id_pro).attr("style", previousCss ? previousCss : "");	
		console.log("total tab2:"+total);
		
		
		//tab 3
		var maxHeight = 1200;
		var previousCss  = jQuery('#tabpanel-3'+id_pro).attr("style");
		jQuery('#tabpanel-3'+id_pro).css({
				position:   'absolute', // Optional if #myDiv is already absolute
				visibility: 'hidden',
				display:    'block'
			});
		
		
				jQuery('#tabpanel-3'+id_pro+' ul.principal li').each(function(){
				
				var id_li  = jQuery(this).attr("id");
				var previousCssli  = jQuery('.'+id_li).attr("style");
				jQuery('.'+id_li).removeClass("oculto");
				jQuery('.'+id_li).css({
						position:   'absolute', // Optional if #myDiv is already absolute
						visibility: 'hidden',
						display:    'block'
					});
				
				console.log(this);
					   var eachRowHeight = jQuery(this).height();
						total =total + eachRowHeight;
						if( total > maxHeight ){
							console.log(this);
							jQuery(this).before('<div class="corta1 page-breakb" style="page-break-before: always;"></div>');
							console.log("reseteo total="+total+" pasa a 0");
							total=0;
						}else if(total == maxHeight){
							console.log(this);
							jQuery(this).after('<div class="corta1 page-breakb" style="page-break-before: always;"></div>');
							console.log("reseteo total="+total+" pasa a 0");
							total=0;
						}
            jQuery('.'+id_li).attr("style", previousCss ? previousCss : "");
			//jQuery('.'+id_li).addClass("oculto");			
			console.log(total);
        });
		jQuery('#tabpanel-3'+id_pro).attr("style", previousCss ? previousCss : "");	
		console.log("total tab3:"+total);
		
		
		var empresas = jQuery('#tabpanel-3'+id_pro).clone();
		empresas.find('img').remove();
		empresas.find('.verFichaEmpresa').remove();
		empresas.find('.pdf').remove();
		empresas.find('a').removeAttr('href', '');
		empresas.find('div').removeClass('oculto', '');
		empresas.find('div').css('display', 'block');
		empresas =empresas.html();
		
		var caracteristicas ="";
		caracteristicas = jQuery('#tabpanel-2'+id_pro).html().trim();
		
		//inicia
		mywindow.document.write('<div class="page-break row" style="page-break-after: always;">');
					
			mywindow.document.write('<div class="col-xs-12">');
				if (modelo != null){
				mywindow.document.write('<h2>' + nombre +" - "+modelo  + '</h2>');}
				else{mywindow.document.write('<h2>' + nombre +'</h2>');}
			mywindow.document.write('</div>');
			mywindow.document.write('<div class="col-xs-8">');	
				if (desc != null){
				mywindow.document.write('<div class="col-xs-12"><h3><strong>Descripción</strong>:</h3>');
					mywindow.document.write('<p>' + desc + '</p>');
				mywindow.document.write('</div>');
				}
				
			
				if ( caracteristicas != '<h3 class="noScreen" style="padding-top: 5px;"><strong>Cacterísticas:</strong></h3>' || caracteristicas != ""){	
					//mywindow.document.write('</br><div style="padding-top:10px;" class="col-xs-12"><h3><strong>Características</strong>:</h3>');
						mywindow.document.write(caracteristicas);
					//mywindow.document.write('</div>');
				}
				if (empresas != null){
				//mywindow.document.write('</br><div style="padding-top:10px;" class="col-xs-12  " ><h3><strong>Empresas</strong>:</h3>');
					mywindow.document.write(empresas);
				//mywindow.document.write('</div>');
				}
			mywindow.document.write('</div>');
			if (img != null){	mywindow.document.write('<div class="col-xs-4"><p class="col-xs-12"">' + img + '</p></div>');}else{mywindow.document.write('<div class="col-xs-4"></div>');}
		
		
		mywindow.document.write('</div>');
		//mywindow.document.write('<div class="page-break" style="display: block; page-break-before: always; "></div>');
	
	})
	mywindow.document.write('</div>');
	mywindow.document.write('</body></html>');

	mywindow.document.close(); // necessary for IE >= 10
//	mywindow.focus(); // necessary for IE >= 10*/
			
		//	mywindow.close();

		 // mywindow.print();
			
	return true;		
}
// fin funcion para imprimir un div


				// funcion para imprimir un div
function PrintElemInfoWord(elem)
{

	var html =jQuery('div#content-header div.section').html();
	var adddiv = jQuery('div#content-header div.section').clone();
	adddiv.find('a').removeAttr('href', '');
	//adddiv.find('a').removeAttr('class');
	adddiv.find('#imprimir').remove();
	adddiv.find('br').remove();
	var cabecera =adddiv.html();
	//var mywindow = window.open('', 'PRINT', 'height=400,width=600');
	var mywindow = window.open();


	mywindow.document.open();
	mywindow.document.write('<html id="contenedor"><head >');
	mywindow.document.write('<title>' + document.title  + '</title>');
	mywindow.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"  type="text/css"  media="all" async/>');
	if (siteId.indexOf("SIPA") != -1) {
	mywindow.document.write('<link rel="stylesheet" href="https://sipaceapat.imserso.es/InterPresent1/groups/sistema/documents/sistema/sipa.css"  type="text/css"  media="all"  async/>');
	}
	if (siteId.indexOf("CATALOGO") != -1) {
	mywindow.document.write('<link rel="stylesheet" href="https://catalogoceapat.imserso.es/InterPresent1/groups/sistema/documents/sistema/sipa.css"  type="text/css"  media="all"  async/>');
	}
	mywindow.document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js" ></script>');
	mywindow.document.write('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js" async></script>');
	
	//mywindow.document.write('<script src="https://markswindoll.github.io/js/jquery-1.11.1.min.js" async></script>');
//	mywindow.document.write('<script src="https://markswindoll.github.io/js/FileSaver.js" ></script>');
	//mywindow.document.write('<script src="https://markswindoll.github.io/jquery-word-export/jquery.wordexport.js"></script>');
	
	
	
	
	
	mywindow.document.write('<script src="/DInterElabora/groups/sistema/documents/sistema/filesaver.js"></script>');
	mywindow.document.write('<script src="/DInterElabora/groups/sistema/documents/sistema/jquery.wordexport.js" ></script>');
	
	
	
	
	
		mywindow.document.write('<script type="text/javascript">');
		mywindow.document.write('function convertImgToBase64(url, callback, outputFormat){');
		mywindow.document.write("var canvas = document.createElement('CANVAS');");
		mywindow.document.write("var ctx = canvas.getContext('2d');");
		mywindow.document.write('var img = new Image;');
		mywindow.document.write("img.crossOrigin = 'Anonymous';");
		mywindow.document.write('img.onload = function(){');
			mywindow.document.write('canvas.height = img.height;');
			mywindow.document.write('canvas.width = img.width;');
	  		mywindow.document.write('ctx.drawImage(img,0,0);');
	  		mywindow.document.write("var dataURL = canvas.toDataURL(outputFormat || 'image/png');");
	  	mywindow.document.write('	callback.call(this, dataURL);');
	  		mywindow.document.write('canvas = null; ');
		mywindow.document.write('};');
		mywindow.document.write('img.src = url;');
	mywindow.document.write('}');
	mywindow.document.write('$(document).ready(function($) {');
		mywindow.document.write("$('.img-responsive').each( function( index, element ){");
		mywindow.document.write('$(element).before("<h3><strong>Foto:</strong></h3>");');
			mywindow.document.write("$(element).attr('width', 200);");
			mywindow.document.write("$(element).attr('height', 200);");
			mywindow.document.write("$(element).attr('title', 'Imagen del producto');");
			mywindow.document.write("$(element).css('position', 'relative');");
			mywindow.document.write('});');
			mywindow.document.write("$('img').each( function( index, element ){");
				
			mywindow.document.write("$(element).attr('title', 'Imagen del producto');");

			mywindow.document.write('});');
		//mywindow.document.write('});');
	mywindow.document.write('$("#contenedor").wordExport("Informe_basatec");');
		//mywindow.document.write('try {$("#contenedor").wordExport("Informe_basatec");}catch(err) { alert("error en descarga");}finally{setTimeout(function() {window.close();}, 5);}');
		//mywindow.document.write('');
	mywindow.document.write('});');
mywindow.document.write('</script>');
			
	mywindow.document.write('<style>');
	
		mywindow.document.write('@page {'+
										'mso-page-orientation: portrait;' +
										'size:21cm 29.7cm;'+
										'margin:2.5cm 1cm 2.5cm 1cm;'+
										'body {-webkit-print-color-adjust: exact;}'+
										'.informacion.ficha ul li {   background: none !important;	padding: none !important;}'+
										'#accordionEmpresa h4 + div {padding:0 !important;}'+
										'#accordionEmpresa h4 span {background: none !important;}'+
										'#accordionEmpresa h4 {padding:0 !important;}'+
										'#accordionEmpresa h4 + div {padding:0 !important;}'+
										'#accordionEmpresa h4.desplegado span { background: url(flecha-texto-abierto_sede.png) no-repeat right center !important;}'+
										'#accordionEmpresa h4.desplegado span { background: url(flecha-texto-abierto_sede.png) no-repeat right center !important;}'+
										'#content-header .logos > a {    display: inline-block;    padding: 0;    width: auto;}'+
										'#content-header .logos > a:first-child {   margin-right: 2px;}'+
										'#content-header .logos h1 span.i {    font-family: "diezma";    color: #C2410A !important;    font-size: 1.2em;}'+
										'#content-header  .logos {margin-bottom:10px;}'+
										'.referenciaGrupoTitulo {background-color: #eee !important;  -webkit-print-color-adjust: exact;}'+
										'.page-break { display: block; page-break-after: always; }'+
										'.page-breakb { display: block; page-break-after: always; }'+
										'.noPrint{display:none;}'+
										'.noScreen{display:block;}'+	
										'.img-thumbnail {'+
											'display: inline-block;'+
											' max-width: 200px !important;'+
										'}'+
										'.img-responsive {'+
											'max-width: 200px !important;'+
										'}'+
										'.img-responsive{max-width:200px !important;}'+
										'.logos h1 {'+
											'margin-left:30px;'+  
											'font-size: 1.5em; '+
											'font-weight: normal;'+
											'padding: 0;'+
											'margin-top: .67em;'+
											'text-align:center;'+
										'}'+
										'.logos a {float:left !important;}'+ 
										'ul li.impar {'+
										 '   background-color: #efefef;'+
										'}'+
										
										
									'}'								
	);
	
	mywindow.document.write('@page container {'+
	'margin:2.5cm 1cm 2.5cm 1cm;'+
    'mso-header-margin:.5in;'+
    'mso-footer-margin:.5in;'+
    'mso-header: h1;'+
    'mso-footer: f1;'+
    '}')
	mywindow.document.write('@media print {'+
										'mso-page-orientation: portrait;' +
										'size:21cm 29.7cm;'+
										'margin:2.5cm 1cm 2.5cm 1cm;'+
										'body {-webkit-print-color-adjust: exact;}'+
										'.informacion.ficha ul li {   background: none !important;	padding: none !important;}'+
										'#accordionEmpresa h4 + div {padding:0 !important;}'+
										'#accordionEmpresa h4 span {background: none !important;}'+
										'#accordionEmpresa h4 {padding:0 !important;}'+
										'#accordionEmpresa h4 + div {padding:0 !important;}'+
										'#accordionEmpresa h4.desplegado span { background: url(flecha-texto-abierto_sede.png) no-repeat right center !important;}'+
										'#accordionEmpresa h4.desplegado span { background: url(flecha-texto-abierto_sede.png) no-repeat right center !important;}'+
										'#content-header .logos > a {    display: inline-block;    padding: 0;    width: auto;}'+
										'#content-header .logos > a:first-child {   margin-right: 2px;}'+
										'#content-header .logos h1 span.i {    font-family: "diezma";    color: #C2410A !important;    font-size: 1.2em;}'+
										'#content-header  .logos {margin-bottom:10px;}'+
										'.referenciaGrupoTitulo {background-color: #eee !important;  -webkit-print-color-adjust: exact;}'+
										'.page-break { display: block; page-break-after: always; }'+
										'.page-breakb { display: block; page-break-after: always; }'+
										'.noPrint{display:none;}'+
										'.noScreen{display:block;}'+	
										'.img-thumbnail {'+
											'display: inline-block;'+
											' max-width: 200px !important;'+
										'}'+
										'.img-responsive {'+
											'max-width: 200px !important;'+
										'}'+
										'.img-responsive{max-width:200px !important;}'+
										'.logos h1 {'+
											'margin-left:30px;'+  
											'font-size: 1.5em; '+
											'font-weight: normal;'+
											'padding: 0;'+
											'margin-top: .67em;'+
											'text-align:center;'+
										'}'+
										'.logos a {float:left !important;}'+ 
										'ul li.impar {'+
										 '   background-color: #efefef;'+
										'}'+
										
										
									'}'								
	);
	mywindow.document.write(
										'mso-page-orientation: portrait;' +
										'size:21cm 29.7cm;'+
										'margin:2.5cm 1cm 2.5cm 1cm;'+
										'body {-webkit-print-color-adjust: exact;}'+
										'.informacion.ficha ul li {   background: none !important;	padding: none !important;}'+
										'#accordionEmpresa h4 + div {padding:0 !important;}'+
										'#accordionEmpresa h4 span {background: none !important;}'+
										'#accordionEmpresa h4 {padding:0 !important;}'+
										'#accordionEmpresa h4 + div {padding:0 !important;}'+
										'#accordionEmpresa h4.desplegado span { background: url(flecha-texto-abierto_sede.png) no-repeat right center !important;}'+
										'#accordionEmpresa h4.desplegado span { background: url(flecha-texto-abierto_sede.png) no-repeat right center !important;}'+
										'#content-header .logos > a {    display: inline-block;    padding: 0;    width: auto;}'+
										'#content-header .logos > a:first-child {   margin-right: 2px;}'+
										'#content-header .logos h1 span.i {    font-family: "diezma";    color: #C2410A !important;    font-size: 1.2em;}'+
										'#content-header  .logos {margin-bottom:10px;}'+
										'.referenciaGrupoTitulo {background-color: #eee !important;  -webkit-print-color-adjust: exact;}'+
										'.page-break { display: block; page-break-after: always; }'+
										'.page-breakb { display: block; page-break-after: always; }'+
										'.img-thumbnail {'+
											'display: inline-block;'+
											' max-width: 200px !important;'+
										'}'+
										'.img-responsive {'+
											'max-width: 200px !important;'+
										'}'+
										'.img-responsive{max-width:200px !important;}'+
										'.logos h1 {'+
											'margin-left:30px;'+  
											'font-size: 1.5em; '+
											'font-weight: normal;'+
											'padding: 0;'+
											'margin-top: .67em;'+
											'text-align:center;'+
										'}'+
										'ul li.impar {'+
										 '   background-color: #efefef;'+
										'}'+
										 '.noPrint{}'+
										'.noScreen{/*display:none;*/}'
										
																
	);
	
	
	mywindow.document.write('</style>');
	//necesario para que cargue las imagenes en el modo de impresión
	//mywindow.document.write('<script type="text/javascript">window.onload = function() { setTimeout(function() {window.close();}, 1);};</script>');
	mywindow.document.write('</head><body >');
	mywindow.document.write('<div  class="container informacion ficha">');
	
	var toc = '<p class=MsoToc1>\n';
            toc += '<!--[if supportFields]>\n';
            toc += '<span style=\'mso-element:field-begin\'></span>\n';
            toc += 'TOC \o "1-3" \\u \n';
            toc += '<span style=\'mso-element:field-separator\'></span>\n';
            toc += '<![endif]-->\n';
            toc += '<span style=\'mso-no-proof:yes\'>Tabla de contenido - actualicela para ver el indice.</span>\n';
            toc += '<!--[if supportFields]>\n';
            toc += '<span style=\'mso-element:field-end\'></span>\n';
            toc += '<![endif]-->\n';
            toc += '</p>\n';
	
	mywindow.document.write('<div id="content-header">');		
		mywindow.document.write(cabecera);
    mywindow.document.write('</div>');
	mywindow.document.write('<div style="padding-top:120px">');		
		 mywindow.document.write('<h1 style="text-align:center;">Informe de productos</h1>');
		 
    mywindow.document.write('</div>');
	
	mywindow.document.write('<br clear=all style="mso-special-character:line-break;page-break-before:always">');
	mywindow.document.write(toc);
	
	
	jQuery(".productoInforme").each(function(){
		
		var id_pro=jQuery(this).attr('id');
		var nombre=jQuery('.nombreFicha_'+id_pro+' h3').html();
		var modelo=jQuery('.impModelo_'+id_pro).html();
		var desc = jQuery('.impDesc_'+id_pro).html();
		var img = jQuery('.galeria_'+id_pro).html();
		
		
		var total = 0;
		var maxHeight = 918;
		var total=0;
		console.log("inicio id:"+id_pro);
		var eachRowHeight = 0;
		
		//tab1
			var previousCss  = jQuery('#tabpanel-1'+id_pro).attr("style");

			jQuery('#tabpanel-1'+id_pro).css({
				position:   'absolute', // Optional if #myDiv is already absolute
				visibility: 'hidden',
				display:    'block'
			});
		jQuery('#tabpanel-1'+id_pro).children().each(function(){
            //console.log(this);
           
            var eachRowHeight = jQuery(this).height();
			total =total + eachRowHeight;
            if( total > maxHeight ){
				console.log(this);
                jQuery(this).after('<div class="corta1 page-breakb" style="page-break-before: always;"></div>');
				jQuery(this).after('<br clear=all style="mso-special-character:line-break;page-break-before:always">');
                console.log("reseteo total="+total+" pasa a 0");
				total=0;
            }else if(total == maxHeight){
				console.log(this);
                jQuery(this).after('<div class="corta1 page-breakb" style="page-break-before: always;"></div>');
				jQuery(this).after('<br clear=all style="mso-special-character:line-break;page-break-before:always">');

                console.log("reseteo total="+total+" pasa a 0");
				total=0;
            }
            
			console.log(total);
        });
		jQuery('#tabpanel-1'+id_pro).attr("style", previousCss ? previousCss : "");	
		console.log("total tab1:"+total);
		
		
		//tab 2
		var previousCss  = jQuery('#tabpanel-2'+id_pro).attr("style");

			jQuery('#tabpanel-2'+id_pro).css({
				position:   'absolute', // Optional if #myDiv is already absolute
				visibility: 'hidden',
				display:    'block'
			});
		 jQuery('#tabpanel-2'+id_pro).children().each(function(){
            var eachRowHeight = jQuery(this).height();
			total = total + eachRowHeight;
            if( total > maxHeight ){
				console.log(this);
                jQuery(this).before('<div class="corta1 page-breakb" style="page-break-before: always;"></div>');
				jQuery(this).before('<br clear=all style="mso-special-character:line-break;page-break-before:always">');

                console.log("reseteo total="+total+" pasa a 0");
				total=0;
            }else if(total == maxHeight){
				console.log(this);
                jQuery(this).after('<div class="corta1 page-breakb" style="page-break-before: always;"></div>');
				jQuery(this).after('<br clear=all style="mso-special-character:line-break;page-break-before:always">');

                console.log("reseteo total="+total+" pasa a 0");
				total=0;
            }
            
			console.log(total);
        });
		jQuery('#tabpanel-2'+id_pro).attr("style", previousCss ? previousCss : "");	
		console.log("total tab2:"+total);
		
		
		//tab 3
		var maxHeight = 1200;
		var previousCss  = jQuery('#tabpanel-3'+id_pro).attr("style");
		jQuery('#tabpanel-3'+id_pro).css({
				position:   'absolute', // Optional if #myDiv is already absolute
				visibility: 'hidden',
				display:    'block'
			});
		
		
				jQuery('#tabpanel-3'+id_pro+' ul.principal li').each(function(){
				
				var id_li  = jQuery(this).attr("id");
				var previousCssli  = jQuery('.'+id_li).attr("style");
				jQuery('.'+id_li).removeClass("oculto");
				jQuery('.'+id_li).css({
						position:   'absolute', // Optional if #myDiv is already absolute
						visibility: 'hidden',
						display:    'block'
					});
				
				console.log(this);
					   var eachRowHeight = jQuery(this).height();
						total =total + eachRowHeight;
						if( total > maxHeight ){
							console.log(this);
							jQuery(this).before('<div class="corta1 page-breakb" style="page-break-before: always;"></div>');
							jQuery(this).before('<br clear=all style="mso-special-character:line-break;page-break-before:always">');

							console.log("reseteo total="+total+" pasa a 0");
							total=0;
						}else if(total == maxHeight){
							console.log(this);
							jQuery(this).after('<div class="corta1 page-breakb" style="page-break-before: always;"></div>');
							jQuery(this).after('<br clear=all style="mso-special-character:line-break;page-break-before:always">');

							console.log("reseteo total="+total+" pasa a 0");
							total=0;
						}
            jQuery('.'+id_li).attr("style", previousCss ? previousCss : "");
			//jQuery('.'+id_li).addClass("oculto");			
			console.log(total);
        });
		jQuery('#tabpanel-3'+id_pro).attr("style", previousCss ? previousCss : "");	
		console.log("total tab3:"+total);
		
		
		var empresas = jQuery('#tabpanel-3'+id_pro).clone();
		//INTENTO CAMCIAR H4 PARA QUE LORECONOCA PERO NO VA
/*empresas.find('.desplegado span').replaceWith(function () {
     return $('<div/>', {
        class: 'myClass',
        html: this.innerHTML
    });
});*/
		empresas.find('img').remove();
		empresas.find('.verFichaEmpresa').remove();
		empresas.find('.pdf').remove();
		empresas.find('a').removeAttr('href', '');
		empresas.find('div').removeClass('oculto', '');
		empresas.find('div').css('display', 'block');
		empresas =empresas.html();
		
		var caracteristicas ="";
		caracteristicas = jQuery('#tabpanel-2'+id_pro).html().trim();
		console.log("aaa"+caracteristicas+"bbb");
		//inicia
		mywindow.document.write('<br clear=all style="mso-special-character:line-break;page-break-after:always">');
		mywindow.document.write('<div class="page-break row" style="page-break-after: always;">');
					
			mywindow.document.write('<div class="col-xs-12">');
				mywindow.document.write('<h2>' + nombre +'</h2>');
			mywindow.document.write('</div>');
							if (modelo != null){
				mywindow.document.write('<div class="col-xs-12"><h3><strong>Modelo</strong>:</h3>');
					mywindow.document.write('<p>' + modelo + '</p>');
				mywindow.document.write('</div>');
				}
			mywindow.document.write('<div class="col-xs-12">');	
				if (desc != null){
				mywindow.document.write('<div class="col-xs-12"><h3><strong>Descripción</strong>:</h3>');
					mywindow.document.write('<p>' + desc + '</p>');
				mywindow.document.write('</div>');
				}

			
				if ( caracteristicas != '<h3 class="noScreen" style="padding-top: 5px;"><strong>Cacterísticas:</strong></h3>' || caracteristicas != ""){	
					//mywindow.document.write('</br><div style="padding-top:10px;" class="col-xs-12"><h3><strong>Características</strong>:</h3>');
						mywindow.document.write(caracteristicas);
					//mywindow.document.write('</div>');
				}
				if (empresas != null){
				mywindow.document.write('</br><div style="padding-top:10px;" class="col-xs-12  " ><h3><strong>Empresas</strong>:</h3>');
					mywindow.document.write(empresas);
				mywindow.document.write('</div>');
				}
			mywindow.document.write('</div>');
			if (img != null){	mywindow.document.write('<div class="col-xs-12"><p class="col-xs-12"">' + img + '</p></div>');}else{mywindow.document.write('<div class="col-xs-4"></div>');}
		
		
		mywindow.document.write('</div>');
		//mywindow.document.write('<div class="page-break" style="display: block; page-break-before: always; "></div>');
	
	})
	
	
	mywindow.document.write('</div>');
			
	mywindow.document.write('</body></html>');

	mywindow.document.close(); // necessary for IE >= 10
//	mywindow.focus(); // necessary for IE >= 10*/
			
		//	mywindow.close();

		 // mywindow.print();
			
	return true;		
}
// fin funcion para imprimir un div word

//muestra o quita pestaña producto en expo
//hay que amopliar luego para que desactive etc cuando desmarque y que se copien las cosas
function miraenexpo() {
  // Get the checkbox
  var checkBox = document.getElementById("enExpo");
  // Get the output text
 

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
 
  jQuery('#tab-7').attr("style", "");	
   
  } else {
 
  jQuery('#tab-7').css("display", "none");	
  }
}
/*jQuery('#exampleModalCenter').on('show.bs.modal', function (event) {
console.log(333333);
  var button = jQuery(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  console.log("11111"+recipient);
  var modal = $jQuery(this)
  modal.find('.modal-title').text('Añadir ' + recipient)
  modal.find('.modal-body input').val(recipient)
})*/


function validarCamposEstadisticasPorISO(form, esAND) {
	console.log("estadisticas por iso");
	//Se formatean las opciones seleccionadas de los campos (selects multiples)
	var listaIsos="";
	if (jQuery("#ison1 :selected").length != 0 ){listaIsos = form.listaIso1.value;}
	if (jQuery("#ison1 :selected").length != 0 ){listaIsos = form.listaIso1.value;}
	if (jQuery("#ison2 :selected").length != 0 ){listaIsos +="-"+form.listaIso2.value;}
	if (jQuery("#ison3 :selected").length != 0 ){listaIsos +="-"+form.listaIso3.value; var compara}
	//listaIsos=listaIsos.substring(1,listaIsos.length-1);
	
	
	form.listaIso.value=listaIsos.replace(/\--/g, '-');
	form.listaISO.value=listaIsos.replace(/\--/g, '-');

	if (listaIsos == ""){
	console.log("aqui se queda y no pasa1");
		jQuery('.mensaje').removeClass("hidden");
		jQuery(".mensaje p").html("por favor seleccione al menos una ISO.");
	}else{
	console.log("si que pasa pasa 2");
	jQuery(".mensaje p").html("");
	//vemos si hay una iso de nivel 3 para poner el boton de alta similar
	var cadena = jQuery("#listaIso3").val();
	var tipoiso= jQuery("#tipoiso").val();
	var tipoes= jQuery("#tipoes").val();
jQuery("#chart_estaISO").html("pinta las estadisticas correspondientes de iso nivel "+tipoiso +" y tipo "+tipoes+ "con grafico y tabla");
}
}