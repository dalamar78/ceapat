<%!String tituloString="Papelera de Empresas"; %>
<% session.setAttribute("titulo", tituloString);%>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/functions" prefix = "fn" %>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>

<%@include file="../cabecera.jsp"%>
<div class="section">
	<div id="contenido-interior">
		<div class="introduccion">
	    	<h2 id="ceapat">Papelera de Empresas</h2>
		</div>
		<div id="informacion" class="informacion">
			<div id="mensaje"></div>
			<div class="col-md-12">		
				<table class="listado">
				<caption>Papelera de empresas</caption>
					<thead>
						<tr>
							<th id="nombre" scope="col">NOMBRE</th>
							<th id="fecha_baja" scope="col">FECHA ELIMINACION</th>
							<th id="acciones" scope="col">ACCIONES</th>
						</tr>
						</thead>
						<tbody>
						<c:forEach var="emp" items="${empresasPapelera}">
						<tr id="<$ProaInstituciones.ID_INS$>">

							<td headers="nombre">${emp.nombre}</td>
							<td headers="fecha_baja">${emp.fecha_baja}</td>
							<td headers="acciones">
								
								<a href="#" class="restaurar" onclick="enviarProdPapelera(<$ProaInstituciones.ID_INS$>,'IM_GET_ENVIAR_A_PAPELERA','EMPRESA_RECUPERA')"><span class="glyphicon glyphicon-repeat"></span> Restaurar </a>
								<a href="#" class="eliminar" onclick="enviarProdPapelera(<$ProaInstituciones.ID_INS$>,'IM_GET_ENVIAR_A_PAPELERA','EMPRESA_BORRA')"><span class="glyphicon glyphicon-remove"></span> Eliminar</a>
								<a target="_blank" class="previsualizar" title="<$lc('wwsagNuevaVentana' & sufijoIdioma)$>" href="<$url$>?id=${emp.id_ins}"><span class="glyphicon glyphicon-blackboard"></span>Previsualizar</a>

								<ul>
							</td>
						</tr>
						</c:forEach>
				</tbody>
				</table>
			
			<$else$>
				<p> Papelera vacia</p>
			<$endif$>
				
			</div>
		</div>
	</div>
</div>
<jsp:include page="../footer.jsp" />