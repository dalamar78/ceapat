<%!String tituloString="Productos de apoyo"; %>
<% session.setAttribute("titulo", tituloString);%>
<%@include file="../cabecera.jsp"%>

<div class="section">
    <div id="contenido-home">
	<jsp:include page="../servicios/buscadorGeneral.jsp" flush="true">
		  <jsp:param name="strTipoDeBusqueda" value="todos" />
		  <jsp:param name="strTipoDeBusquedaLiteral" value="productos" />
		  <jsp:param name="strNameId" value="productos" />
		  <jsp:param name="strFiltro" value="productos" />
		  <jsp:param name="strBoton" value="botonBuscarProducto" />
		  <jsp:param name="strNombreFormulario" value="busquedaProductoTextoLibre" />
		  <jsp:param name="strUrlSugerencias" value="/servicios/llamada " />
		  <jsp:param name="autocomepleID" value="id de autocompletado" />
	</jsp:include> 
	<div class="enlaces row">
			<ul>
			<li class="categoria col-lg-6 col-md-6 col-sm-12 col-xs-12">		<a href="/productos/categorias">Búsqueda<br>de Productos por Categoría</a></li>
			<li class="iso col-lg-6 col-md-6 col-sm-12 col-xs-12">		<a href="/productos/iso">Búsqueda<br>de Productos por clasificación <abbr title="Organización Internacional de Normalización">ISO</abbr></a></li>
			<c:if test="${pageContext.request.userPrincipal.name != null}">
				<li class="alta col-lg-6 col-md-6 col-sm-12 col-xs-12">		<a href="/sipa_01/prod/alta/index.htm">Alta<br>de Productos</a></li>
				<li class="papelera col-lg-6 col-md-6 col-sm-12 col-xs-12">		<a href="/sipa_01/prod/baja/index.htm">Productos<br>no Publicados</a></li>
				<li class="departamentos col-lg-6 col-md-6 col-sm-12 col-xs-12">		<a href="/sipa_01/prod/depar/index.htm">Listado<br>productos departamentos</a></li>
				<li class="documentos col-lg-6 col-md-6 col-sm-12 col-xs-12">		<a href="/sipa_01/prod/docu/index.htm">Gestión<br>de documentos</a></li>
			 </c:if>
			</ul>

	</div>
	</div>	
</div>
<jsp:include page="../footer.jsp" />