<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<% 
  
String strTipoDeBusqueda = request.getParameter("strTipoDeBusqueda");
String strTipoDeBusquedaLiteral = request.getParameter("strTipoDeBusquedaLiteral");
String strNameId = request.getParameter("strNameId");
String strFiltro = request.getParameter("strFiltro");
String strBoton = request.getParameter("strBoton");
String strNombreFormulario = request.getParameter("strNombreFormulario");
String strUrlSugerencias = request.getParameter("strUrlSugerencias");
String autocomepleID = request.getParameter("autocomepleID");
 %>

		<div class="formulario">
			<div class="row">
				<form class="form_home" name="<%=strNombreFormulario%>" id="<%=strNombreFormulario%>" action="#" method="post">
				<input type="hidden" name="autocomepleURL" id="autocomepleURL" value="<%=strUrlSugerencias%>">
				<input type="hidden" name="autocomepleID" id="autocomepleID" value="<%=autocomepleID%>">
					<fieldset>
						<legend class="oculto">Búsqueda de <%=strTipoDeBusquedaLiteral%></legend>
						
						<div class="form-group">
							<div class="col-md-10 col-xs-12">
								<label for="<%=strNameId%>">Búsqueda de <%=strTipoDeBusquedaLiteral%></label>
								<input name="<%=strNameId%>" class="form-control input-lg home" id="<%=strNameId%>"  title="Introduzca el texto para la búsqueda" autofocus />
								<span id="menBuscar" class="hidden">Busque al menos 3 caracteres</span>
							</div>
							<div class="col-md-2 col-xs-12">
							<button type="button" class="botonbuscarcolor col-xs-12 btn btn-primary  11 <%=strBoton%>" id="buscar" name="buscar" value="Buscar">
								<span class="glyphicon glyphicon-search" aria-hidden="true"></span> Buscar</button> 
							</div>
						
						</div>
					</fieldset>
				</form>
			</div>
		</div>
		
<%@include file="./jplist.jsp"%>   	