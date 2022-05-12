<%!String tituloString="Búsqueda de Empresas por Glosario"; %>
<% session.setAttribute("titulo", tituloString);%>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/functions" prefix = "fn" %>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>

<%@include file="../cabecera.jsp"%>
<div class="section">
	<div id="contenido-interior">
		<div id="informacion">
		    <div id="contenido-home">
				<jsp:include page="../servicios/glosario.jsp" flush="true">
					  <jsp:param name="strTipo" value="productos" />
					  <jsp:param name="strTipoId" value="productosGlosario" />
					  <jsp:param name="strPlaceholder" value="Texto de la ISO..." />
			
				</jsp:include> 
		
			
				<div class="lista-filtro col-xs-12 ">
				<h3><span class="oculto">Empiezan por</span> A</h3>
				<ul class="dictionary">
					<c:forEach var="iso" items="${isoAlfabeticos}">
				
						<c:set var="strClaseInicio" value="hidden"  />
						<c:if test = "${fn:startsWith(iso.n1n2n3, 'A')}">
				        	 <c:set var="strClaseInicio" value=""  />
				     	 </c:if>
						<li class="<c:out value="${strClaseInicio}"/>">
							<div class="row <$strClase$>">
								<div class="pull-left">
									<p class="filtrado pull-left"><a target="blank" href="<$urlEmpresa$>?id=<$ID_INS$>">${iso.n1n2n3}<img src="<$URLImagenes$>/ventana_nueva.gif" alt="abre en ventana nueva" /></a></p>
								</div>	
						</div>	
														
						</li>
					</c:forEach>
			
				</div>
			</div>
		</div>
	</div>
</div>
<jsp:include page="../footer.jsp" />