<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="strFiltro" value="<%=strFiltro %>"/>
<div class="row cargando hidden ">
			<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-md-offset-3">
				<div class="text-center">
					<img alt="cargando..." src="${contextPath}/resources/img/cargando.gif" />
				</div>
				<div class="text-center">
					<p>Buscando... </p>
				</div>
			</div>
</div>
<div class="center_sindatos hidden">
</div>
<div class="center hidden">
	<div id="demo_<%=strNameId%>" class="box jplist " style="margin: 20px 0 50px 0">
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>				
		<form id="abreNuevo" method="post">
			<input type="hidden" name="lista_navegacion_url" id="lista_navegacion_url" value="" />
			<input type="hidden" name="lista_navegacion" id="lista_navegacion" value="" />
			<input type="hidden" name="lista_navegacion_guarda" id="lista_navegacion_guarda" value="" />
			<input type="hidden" name="siguiente_id" id="siguiente_id" value="" />
			<input type="hidden" name="anterior_id" id="anterior_id" value="" />
		</form >
		<!-- ios button: show/hide panel -->
		<div class="jplist-ios-button">
			<i class="fa fa-sort"></i>
				jPList Actions
		</div>
					
		<!-- panel -->
		<div class="jplist-panel box panel-top <%=strFiltro%>">
			<c:if test="${strFiltro == 'empresas'}">
			<div class="row grupoDeFiltros">
							<div class="col-lg-4 col-md-4 col-sm-6 col-xs-6 col-md-offset-4 col-sm-offset-4 col-xs-offset-4 jplist-group">
								<ul>

									<li class="filtrado filtroProductosLabel active">							
									 <input 	class="hidden filtroProductos"								
										 data-control-type="radio-buttons-filters"
										 data-control-action="filter"
										 data-control-name="PRODUCTO" 
										 data-path=".PRODUCTO" 
										 
										 id="PRODUCTO" 
										 type="radio" 
										 name="jplist"
										 checked="checked"
									 /> 
										 
									 <label for="PRODUCTO">Productos</label>
									</li>
									<li class="filtrado filtroEmpresaLabel"> 
									 <input class="hidden filtroEmpresa"
									 
										 data-control-type="radio-buttons-filters"
										 data-control-action="filter"
										 data-control-name="EMPRESA" 
										 data-path=".EMPRESA" 
										 
										 id="EMPRESA" 
										 type="radio"
										 name="jplist"
									 /> 
										 
									 <label for="EMPRESA">Empresas</label>
									</li> 
									<li class="filtrado filtroDocumentoLabel"> 
													 
									 <p class="titDocumentoFiltro"><strong>Documentos</strong></p>
									</li> 
								</ul>
															
							</div>
							
							
							

							<div class="col-lg-4 col-md-4 col-sm-6 col-xs-6 col-md-offset-5 col-sm-offset-4 col-xs-offset-4 divCompara hidden">
									<a target="_blank" href="#" data-ids=""><span class="label label-danger ">Comparar productos</span></a>
							
							</div>	
						</div>
			<c:if test="${pageContext.request.userPrincipal.name != null}">
			 filtro departamentos
			</c:if>
			</c:if>
		
		
			<c:if test="${strFiltro == 'productos'}">
			111111111111111111111111
				<div class="col-md-3 col-sm-12">
					<c:if test="${pageContext.request.userPrincipal.name != null}">
						<!-- informes -->
						<div class="divSelTodosInformecol-lg-12 col-md-12 col-sm-12">
							<div class="col-lg-6 col-md-6 col-sm-6">
								<input type="buttom"  name="selTodosInforme" class=" btn btn-primary " id="selTodosInforme" value="Seleccionar todos" />
							</div>
							<div class="col-lg-6 col-md-6 col-sm-6">
								<input data-cual="" type="button" class=" btn btn-primary " id="GeneraInforme" name="GeneraInforme" value="Generar Informe"/>
							</div>			
						</div>	
				</c:if>
			<!-- documentos -->
			<div class="tab-filtro-categoriras esLisDocMuestra " onclick="muestraDocRelaciondos()">Documentos Relacionados <span class="glyphicon glyphicon-chevron-down"></span>
			</div>
			<div  class="esLisDoc  col-sm-12 jplist-group esLisDocMuestra">
			</div>
			<c:if test="${pageContext.request.userPrincipal.name != null}">
			<!-- filtro orden -->
			<div class="tab-filtro-categoriras" >Ordenar Productos</div>
 				<div  class="esFiltro esOrden jplist-group col-sm-12" >
 
					 <select 
					         class="jplist-select " 
					         data-control-type="sort-select" 
					         data-control-name="sort" 
					         data-control-action="sort">
					         
					           <option data-path="default">Ordenar por</option>
					           <option data-path=".title" data-order="asc" data-type="text">Nombre A-Z</option>
					           <option data-path=".title" data-order="desc" data-type="text">Nombre Z-A</option>
					           <option data-path=".desc" data-order="asc" data-type="text">Descripción A-Z</option>
					           <option data-path=".desc" data-order="desc" data-type="text">Descripción Z-A</option>
							   <option data-path=".label_filtro" data-order="asc" data-type="text">Categorías A-Z</option>
					           <option data-path=".label_filtro" data-order="desc" data-type="text">Categorías Z-A</option>
												
					      </select>	
			           
				</div>
				<div class="tab-filtro-categoriras" >Filtrar</div>
					<div class="jplist-group col-sm-12 esFiltro" data-control-type="checkbox-text-filter" data-control-action="filter" data-control-name="keywords_checked" data-path=".keywords_checked" data-logic="and">
						<ul class="filtro_checked nivelUno">
							<li id="li_gratuito">
								<input value="GRATUITO_SI" id="GRATUITO_SI" type="checkbox" class="compruebaResultadoChecked">
								<label for="GRATUITO_SI">Gratuito</label>
							</li>
							<li id="li_enExpo">
								<input value="EXPO_SI" id="EXPO_SI" type="checkbox" class="compruebaResultadoChecked">
								<label for="EXPO_SI">En exposición</label>
							</li>
						</ul>
					</div>
				<div class="tab-filtro-categoriras" >Filtrar Activos</div>
					<div class="jplist-group col-sm-12 esFiltro" data-control-type="radio-buttons-filters" data-control-action="filter" data-control-name="keywords_estado" data-path=".keywords_estado" data-logic="or">
						
						<ul class="filtro_checked nivelUno">
							<li id="li_ACTIVO">
							<input 	class=" filtroACTIVO compruebaResultadoChecked"								
																 data-control-type="radio-buttons-filters"
																 data-control-action="filter"
																 data-control-name="ESTADO_ACTIVO" 
																 data-path=".ESTADO_ACTIVO" 
																  
															
																 id="ESTADO_ACTIVO" 
																 type="radio" 
																 name="jplist"
																 checked="checked"
															 /> 
							
							
								<label for="ESTADO_ACTIVO">Activos</label>
							</li>
							<li id="li_INACTIVO">
							
							
							 <input class=" filtroINACTIVO compruebaResultadoChecked"
															 
																 data-control-type="radio-buttons-filters"
																 data-control-action="filter"
																 data-control-name="ESTADO_INACTIVO" 
																 data-path=".ESTADO_INACTIVO" 
																 
																
																 id="ESTADO_INACTIVO" 
																 type="radio"
																 name="jplist"
															 /> 
								
								<label for="ESTADO_INACTIVO">Inactivos</label>
							</li>
							<li id="li_BORRADOR">
							
							<input class=" filtroBORRADOR compruebaResultadoChecked"
															 
																 data-control-type="radio-buttons-filters"
																 data-control-action="filter"
																 data-control-name="ESTADO_BORRADOR" 
																 data-path=".ESTADO_BORRADOR" 
																  
																 id="ESTADO_BORRADOR" 
																 type="radio"
																 name="jplist"
															 /> 
								
								<label for="ESTADO_BORRADOR">Borradores</label>
							</li>
						</ul>
					</div>
					filtro departametnos falta
			</c:if>
			filtro categorias falta
			</div>
						
			<div class="row  col-md-8 col-sm-12 tieneFiltro 1">
				<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-md-offset-5 col-sm-offset-4 col-xs-offset-4 divCompara hidden">
					<a target="_blank" href="#" data-ids=""><span class="label label-danger ">Comparar productos</span></a>
				</div>	
			</div>
		</c:if>
		<c:if test="${strFiltro == 'todos'}">
					<div class="col-md-3 col-sm-12">
							<div class="row grupoDeFiltros">
								<div class="col-lg-4 col-md-4 col-sm-6 col-xs-6 col-md-offset-4 col-sm-offset-4 col-xs-offset-4 jplist-group">
									<ul>
	
										<li class="filtrado filtroProductosLabel active">							
										 <input 	class="hidden filtroProductos"								
											 data-control-type="radio-buttons-filters"
											 data-control-action="filter"
											 data-control-name="PRODUCTO" 
											 data-path=".PRODUCTO" 
											 
											 id="PRODUCTO" 
											 type="radio" 
											 name="jplist"
											 checked="checked"
										 /> 
											 
										 <label for="PRODUCTO">Productos</label>
										</li>
										<li class="filtrado filtroEmpresaLabel"> 
										 <input class="hidden filtroEmpresa"
										 
											 data-control-type="radio-buttons-filters"
											 data-control-action="filter"
											 data-control-name="EMPRESA" 
											 data-path=".EMPRESA" 
											 
											 id="EMPRESA" 
											 type="radio"
											 name="jplist"
										 /> 
											 
										 <label for="EMPRESA">Empresas</label>
										</li> 
										<li class="filtrado filtroDocumentoLabel"> 
														 
										 <p class="titDocumentoFiltro"><strong>Documentos</strong></p>
										</li> 
									</ul>
															
								</div>
								<div class="col-lg-4 col-md-4 col-sm-6 col-xs-6 col-md-offset-5 col-sm-offset-4 col-xs-offset-4 divCompara hidden">
											<a target="_blank" href="#" data-ids=""><span class="label label-danger ">Comparar productos</span></a>
									</div>	
								</div>
							<c:if test="${pageContext.request.userPrincipal.name != null}">
								tengo que mapear departamentos  y pintar li  como en Generea_filtro_de_departamentos_portada
							</c:if>
						</div>
					</c:if>
		
		
		<!-- configuracion inicio  -->
			<div class="row   col-md-8 col-sm-12 tieneFiltro 2">
				<div class="col-md-4 col-sm-6 col-xs-6 col-md-offset-0 col-sm-offset-5 col-xs-offset-5">
					<!-- pagination info label -->
					<div
						class="pull-left jplist-pagination-info pull-left"
						data-type="<strong>Página {current} de {pages}</strong><br/><small>{start} - {end} de {all}</small>"
						data-control-type="pagination-info"
						data-control-name="paging"
						data-control-action="paging"></div>
	
					<!-- items per page dropdown -->
					<div
						class="dropdown pull-left jplist-items-per-page"
						data-control-type="boot-items-per-page-dropdown"
						data-control-name="paging"
						data-control-action="paging">
	
						<button
							class="btn btn-primary dropdown-toggle"
							type="button"
							data-toggle="dropdown"
							id="dropdown-menu-1"
							aria-expanded="true">
							<span data-type="selected-text">Items por página</span>
							<span class="caret"></span>
						</button>
	
						<ul class="dropdown-menu" role="menu" aria-labelledby="dropdown-menu-1">
							<li role="presentation">		<a role="menuitem" tabindex="-1" href="#" data-number="3">3 por página</a></li>
							<li role="presentation"><a role="menuitem" tabindex="-1" href="#" data-number="5" data-default="true">5 por página</a></li>
							<li role="presentation"><a role="menuitem" tabindex="-1" href="#" data-number="10">10 por página</a></li>
							<li role="presentation" class="divider"></li>
							<li role="presentation"><a role="menuitem" tabindex="-1" href="#" data-number="all">Todos</a></li>
							</ul>
						</div>
	
					</div>
								
					<div class="col-md-6 col-sm-7 col-xs-9">
					<!-- bootstrap pagination control -->
									<ul
											class="pagination pull-left jplist-pagination paginacion"
											data-control-type="boot-pagination"
											data-control-name="paging"
											data-control-action="paging"
											data-range="5"
											data-mode="google-like">
									</ul>
								</div>
							
								<div class="col-md-2 col-sm-5 col-xs-3 pull-right">
	
														<div 
											 class="jplist-views pull-right" 
											 data-control-type="views" 
											 data-control-name="views" 
											 data-control-action="views"
											 data-default="jplist-list-view">
	
										<div class="col-md-6 col-xs-12"> 									
											<p>
												<button type="button" class="jplist-view jplist-list-view botonList" data-type="jplist-list-view"></button>
											</p>
										 <p>Lista</p>
										 </div>
										 <div class="col-md-6 col-xs-12">
											<p>
												<button type="button" class="jplist-view jplist-grid-view botonGrid" data-type="jplist-grid-view"></button>
											</p>
											<p>Cuadricula</p>
										 </div>
										</div>	
								</div>	
			</div>	
		<!-- configuracion fin -->
		</div>	
		<!-- /panel -->	
	</div>				
</div>					
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
						
				