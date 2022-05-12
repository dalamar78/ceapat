<%!String tituloString="Productos de apoyo"; %>
<% session.setAttribute("titulo", tituloString);%>
<%@include file="../cabecera.jsp"%>

<div class="section">
    <div id="contenido-home">
	<jsp:include page="../servicios/buscadorGeneral.jsp" flush="true">
		  <jsp:param name="strTipoDeBusqueda" value="todos" />
		  <jsp:param name="strTipoDeBusquedaLiteral" value="por categoría" />
		  <jsp:param name="strNameId" value="productoscat" />
		  <jsp:param name="strFiltro" value="productos" />
		  <jsp:param name="strBoton" value="botonBuscarProducto" />
		  <jsp:param name="strNombreFormulario" value="busquedaProductoTextoLibre" />
		  <jsp:param name="strUrlSugerencias" value="/servicios/llamada " />
		  <jsp:param name="autocomepleID" value="id de autocompletado" />
	</jsp:include> 
	<div class="enlaces row">
		<ul>
			<li class="unacategoria col-lg-6 col-md-6 col-sm-12 col-xs-12">		<a href="/prodcutos/todascategorias">Búsqueda<br>de Productos en una Categoría</a>		</li>
			<li class="variascategorias col-lg-6 col-md-6 col-sm-12 col-xs-12">		<a href="/prodcutos/buscadorcategorias">Búsqueda<br>de Productos en varias Categorías</a></li>
		</ul>

	</div>
	</div>	
</div>
<jsp:include page="../footer.jsp" />