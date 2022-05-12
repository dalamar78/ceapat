<%!String tituloString="Empresas"; %>
<% session.setAttribute("titulo", tituloString);%>
<%@include file="../cabecera.jsp"%>


<div class="section">
	<div id="contenido-interior">
	    <div id="contenido-home">
		<jsp:include page="../servicios/buscadorGeneral.jsp" flush="true">
			  <jsp:param name="strTipoDeBusqueda" value="todos" />
			  <jsp:param name="strTipoDeBusquedaLiteral" value="de empresas" />
			  <jsp:param name="strNameId" value="empresas" />
			  <jsp:param name="strFiltro" value="empresas" />
			  <jsp:param name="strBoton" value="botonBuscarProducto" />
			  <jsp:param name="strNombreFormulario" value="busquedaEmpresasTextoLibre" />
			  <jsp:param name="strUrlSugerencias" value="/servicios/llamada " />
			  <jsp:param name="autocomepleID" value="id de autocompletado" />
		</jsp:include> 
	
			<div class="informacion navegacion">
				<ul>
				<li class="glosario col-lg-6 col-md-6 col-sm-12 col-xs-12">		<a href="/empresas/glosario">Búsqueda<br>de Empresas por Glosario</a></li>
				<c:if test="${pageContext.request.userPrincipal.name != null}">
					<li class="alta col-lg-6 col-md-6 col-sm-12 col-xs-12">		<a href="/empresas/alta">Alta<br>de Empresas</a></li>
					<li class="papelera col-lg-6 col-md-6 col-sm-12 col-xs-12">		<a href="/empresas/papelera">Papelera<br>de Empresas</a></li>
					<li class="contactos col-lg-6 col-md-6 col-sm-12 col-xs-12">		<a href="/empresas/contactos">Directorio<br>de contactos</a></li>
					<li class="alta col-lg-6 col-md-6 col-sm-12 col-xs-12">		<a href="/empresas/altaContactos">Alta<br>de Contacto</a></li>
					<li class="alta col-lg-6 col-md-6 col-sm-12 col-xs-12">		<a href="/empresas/empresasDepartamento">Listado<br>de empresas por departamento</a></li>
				 </c:if>
				</ul>
			</div>
				

				

		</div>		
    </div>
</div>


<jsp:include page="../footer.jsp" />