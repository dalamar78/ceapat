<%!String tituloString="Inicio"; %>
<% session.setAttribute("titulo", tituloString);%>

<%@include file="cabecera.jsp"%>

<div class="section">
    <div id="contenido-home">
	<jsp:include page="./servicios/buscadorGeneral.jsp" flush="true">
		  <jsp:param name="strTipoDeBusqueda" value="todos" />
		  <jsp:param name="strTipoDeBusquedaLiteral" value="productos y empresas" />
		  <jsp:param name="strNameId" value="todos" />
		  <jsp:param name="strFiltro" value="todos" />
		  <jsp:param name="strBoton" value="botonBuscarProducto" />
		  <jsp:param name="strNombreFormulario" value="busquedaProductoTextoLibre" />
		  <jsp:param name="strUrlSugerencias" value="/servicios/llamada " />
		  <jsp:param name="autocomepleID" value="id de autocompletado" />
	</jsp:include> 

			<div class="enlaces row">
				<ul>
					<li class="papoyo col-lg-6 col-md-6 col-sm-12 col-xs-12"><a href="/productos/productos">Productos de Apoyo</a></li>
					<li class="empresas col-lg-6 col-md-6 col-sm-12 col-xs-12"><a href="/empresas/empresas">Empresas</a></li>
					
				<c:if test="${pageContext.request.userPrincipal.name != null}">
			      <li class="avanzadas col-lg-6 col-md-6 col-sm-12 col-xs-12"><a href="/productos/busquedas_avanzadas">Búsquedas Avanzadas</a></li>
					<li class="estadisticas col-lg-6 col-md-6 col-sm-12 col-xs-12"><a href="/productos/estadisticas">Estadísticas</a></li>
			 
			    </c:if>
			       
					
				</ul>
			</div>
	</div>	
</div>
<jsp:include page="footer.jsp" />
    
	
	
	
