
<%@include file="cabecera.jsp"%>
		<header>
			<h1>CEAPAT</h1>
		</header>
		<div class="starter-template">
			<h1>Lista Departamentos</h1>
			<table
				class="table table-striped table-hover table-condensed table-bordered">
				<tr>
					<th>Id_dep</th>
					<th>Departamento</th>
					<th>Literal_dep</th>
				</tr>
				<c:forEach var="dep" items="${departamentos}">
					<tr>
						<td>${dep.id_dep}</td>
						<td>${dep.departamento}</td>
						<td>${dep.literal_dep}</td>
					</tr>
				</c:forEach>
			</table>
		</div>

			<div id="accordionEmpresa" class="informacion rs_preserve procedimiento ">
				<ul>
					<c:forEach var="dep" items="${departamentos}">
						<li>
							<h4 id="empresa_${dep.departamento}"  >
									<span>${dep.literal_dep}</span>
							</h4>
							<div class="col-md-12 oculto" style="display:none">
							</div>
						</li>
					</c:forEach>
				</ul>
			</div>
			
			<div id="accordionEmpresasPorDepartamento" class="informacion rs_preserve procedimiento ">
				<ul>
					<c:forEach var="empdep" items="${empresaspordepartamentos}">
						<li>
							<h4 id="empresa_departamento_${empdep.literal_dep}"  >
									<span>${empdep.literal_dep}</span>
							</h4>
							<div class="col-md-12 oculto" style="display:none">
							</div>
						</li>
					</c:forEach>
				</ul>
			</div>
	<jsp:include page="footer.jsp" />