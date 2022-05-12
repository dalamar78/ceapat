<%!String tituloString="Productos de apoyo"; %>
<% session.setAttribute("titulo", tituloString);%>
<%@include file="../cabecera.jsp"%>

<div class="section">
    <div id="contenido-home">
	<jsp:include page="../servicios/buscadorGeneral.jsp" flush="true">
		  <jsp:param name="strTipoDeBusqueda" value="todos" />
		  <jsp:param name="strTipoDeBusquedaLiteral" value="por ISO" />
		  <jsp:param name="strNameId" value="productosiso" />
		  <jsp:param name="strFiltro" value="productos" />
		  <jsp:param name="strBoton" value="botonBuscarProducto" />
		  <jsp:param name="strNombreFormulario" value="busquedaProductoTextoLibre" />
		  <jsp:param name="strUrlSugerencias" value="/servicios/llamada " />
		  <jsp:param name="autocomepleID" value="id de autocompletado" />
	</jsp:include> 
	<div class="enlaces row">
		<ul>	
			<li class="glosario col-lg-6 col-md-6 col-sm-12 col-xs-12">		<a href="/productos/glosario">B�squeda<br>de Productos por Glosario de la clasificaci�n <abbr title="Organizaci�n Internacional de Normalizaci�n">ISO</abbr></a></li>
			<li class="iso col-lg-6 col-md-6 col-sm-12 col-xs-12">		<a href="/sipa_01/prod/iso/varias/index.htm">B�squeda<br>de Productos por niveles <abbr title="Organizaci�n Internacional de Normalizaci�n">ISO</abbr></a></li>
		</ul>
	</div>
	</div>	
</div>
<jsp:include page="../footer.jsp" />