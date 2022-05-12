<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Create an account</title>
    
    <link href="${contextPath}/resources/css/bootstrap-multiselect-css.css" rel="stylesheet">
    <link href="${contextPath}/resources/css/bootstrap-select.min.css" rel="stylesheet">
    <link href="${contextPath}/resources/css/bootstrap-slider-css.css" rel="stylesheet">
    <link href="${contextPath}/resources/css/easy-autocomplete.css" rel="stylesheet">
    <link href="${contextPath}/resources/css/jplistcoremin.css" rel="stylesheet">
    <link href="${contextPath}/resources/css/jplistdemo-pagesmin.css" rel="stylesheet">
    <link href="${contextPath}/resources/css/jplistfilter-toggle-bundlemin.css" rel="stylesheet">
    <link href="${contextPath}/resources/css/jplistlist-grid-viewmin.css" rel="stylesheet">
    <link href="${contextPath}/resources/css/tabs-css.css" rel="stylesheet">
    <link href="${contextPath}/resources/css/sipa.css" rel="stylesheet">
    <link href="${contextPath}/resources/css/bootstrap_min_css.css" rel="stylesheet">
    <script  src="${contextPath}/resources/js/jquery-1_11_1_min.js" ></script>
 	<script  src="${contextPath}/resources/js/jquery2.js" ></script>
    <script  src="${contextPath}/resources/js/basatec_js.js"></script>
    <script  src="${contextPath}/resources/js/bootstrap_min.js"></script>
    <script  src="${contextPath}/resources/js/bootstrap-multiselect-js.js"></script>
    <script  src="${contextPath}/resources/js/bootstrap-select_min_js.js"></script>
    <script  src="${contextPath}/resources/js/bootstrap-slider-js.js"></script>
    <script  src="${contextPath}/resources/js/jplist.bootstrap-filter_js.js"></script>
    <script  src="${contextPath}/resources/js/jplist.bootstrap-pagination_js.js"></script>
    <script  src="${contextPath}/resources/js/jplist.bootstrap-sort_js.js"></script>
    <script  src="${contextPath}/resources/js/jplist.core.min_js.js"></script>
    <script  src="${contextPath}/resources/js/jplist.filter-toggle-bundle_js.js"></script>
    <script  src="${contextPath}/resources/js/jplist.list-grid-view.min.js"></script>
    <script  src="${contextPath}/resources/js/jplist.sort-bundle.min_js.js"></script>
    <script  src="${contextPath}/resources/js/jquery.easy-autocomplete_newjq.js"></script>

    <script  src="${contextPath}/resources/js/tabs-js.js" ></script>
    
    
</head>
<body>
<script type="text/javascript">
	jQuery(document).ready(function(){
		/*jQuery('ul.sf-menu').superfish();*/
		jQuery('ul.sf-menu .desplegable').each(function(idx){
			jQuery(this).children('ul').addClass('oculto');
			jQuery(this).bind('mouseover focusin', function(e){
				jQuery(this).children('ul').removeClass('oculto');
			}).bind('mouseout focusout', function(e){
				jQuery(this).children('ul').addClass('oculto');
			});
		});
			jQuery('#cerrarAviso').each(function(idx){
				jQuery(this).bind('click', function(e){
					jQuery(this).parent().addClass('oculto');
				});
			});
	});
</script>
<sec:authorize access="isAuthenticated()">
<sec:authorize var="loggedIn" access="isAuthenticated()" />
<c:choose>
    <c:when test="${loggedIn}">
        You are logged in2
    </c:when>
    <c:otherwise>
        You are logged out1
    </c:otherwise>
</c:choose>
    <a href="<c:url value="/j_spring_security_logout" />">Salir</a>
</sec:authorize>

  <div class="container">
    <c:if test="${pageContext.request.userPrincipal.name != null}">
        <form id="logoutForm" method="POST" action="${contextPath}/logout">
            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
        </form>

        <h2>Welcome ${pageContext.request.userPrincipal.name} | <a onclick="document.forms['logoutForm'].submit()">Logout</a></h2>
    </c:if>
  </div>
		<ul class="oculto">
			<li><a accesskey="s" title="Ir al contenido principal de la página [s]" href="#main-content">Ir al contenido principal de la página [s].</a></li>
			<li><a accesskey="m" title="Ir al menú de navegación principal de la página [m]" href="#nav-cabecera">Ir al menú de navegación principal de la página [m].</a></li>
		</ul>
			
	
	<div id="content-header">
    <div class="section">
    
    

<a class="col-lg-4 col-md-4 col-sm-4" target="_blank" title="Abre nueva ventana" href="http://www.imserso.es/imserso_01/index.htm">
	<img src="${contextPath}/resources/img/logo-header.jpg" alt="Logo del Imserso. Página principal del Imserso" />
</a>

<a class="col-lg-4 col-md-4 col-sm-4" target="_blank" title="Abre nueva ventana" href="https://www.agenda2030.gob.es/es">
	<img src="${contextPath}/resources/img/logo-agenda_2030.jpg" alt="Logo de la Agenda 2030" />
</a>

	<a class="col-lg-2 col-md-2 col-sm-2 col-xs-2" target="_blank" title="Abre nueva ventana" href="/ceapat_01/index.htm"><img src="${contextPath}/resources/img/logo-ceapat_catalogo.jpg" alt="Logo del Centro de Referencia Estatal de Autonomía Personal y Ayudas Técnicas. Página principal del Centro" /></a>
	<a class="col-lg-2 col-md-2 col-sm-2 col-xs-2" href="/catalogo_01/index.htm"><img src="${contextPath}/resources/img/logo-sipa.jpg" alt="Logo del Catálogo de Productos de Apoyo. Página principal del Sitio" /></a>
	<h1 class="col-lg-4 col-md-4 col-sm-9 col-xs-9">
		<span class="titulo">
			<span class="i">C</span>atálogo de
				<br /><span class="i">P</span>roductos de <span class="i">A</span>poyo
		</span>
	</h1>
</div>
			<!--SS_END_SNIPPET(fragment3,Cabecera2_SIPA)-->
    	
    
    
    <div id="nav-cabecera" class="row">
    	<div class="section">
    	
    	<ul class="sf-menu col-lg-12 col-md-12 col-sm-12 col-xs-12">
	<li class="activa"><a href="/catalogo_01/index.htm">Inicio</a></li>
	
	<li class="desplegable"><a class="sf-with-ul" href="#">Catálogo de Productos de Apoyo</a>
		<ul class="oculto">
				<li>		<a href="/catalogo_01/clasif_iso/index.htm">Clasificación <abbr title="Organización Internacional de Normalización">ISO</abbr> 9999:2016</a>
</li>
				<li>		<a href="/catalogo_01/prod/index.htm">Productos de Apoyo</a>
</li>
				<li>		<a href="/catalogo_01/empr/index.htm">Empresas</a>
</li>
		</ul>
	</li>
	
</ul>

			<!--SS_END_SNIPPET(fragment4,Cabecera2_SIPA)-->
    		
    	</div>
    </div>
    </div>
    
    <div id="main-content">
    
    <!--SS_BEGIN_SNIPPET(fragment7,BarraElaboracion)-->			<!--SS_END_SNIPPET(fragment7,BarraElaboracion)-->
    <div class="section">
    
    	<div id="contenido-home">
		<div class="formulario">
			<div class="row">
				<form class="form_home" name="busquedaEmpresayProductoTextoLibre" id="busquedaEmpresayProductoTextoLibre" action="/catalogo_01/index.htm" method="post">

					<input type="hidden" name="url" id="url" value="/catalogo_01/prod/info/index.htm" />
					<input type="hidden" name="url_categorias" id="url_categorias" value="/catalogo_01/prod/res/index.htm" />
					<input type="hidden" name="urlEmpresa" id="urlEmpresa" value="/catalogo_01/empr/info/index.htm" />
					<fieldset>
						<legend class="oculto">Búsqueda de productos y empresas</legend>
						
						<div class="form-group">
							<div class="col-md-10 col-xs-12">
								<label for="todos">Búsqueda de productos y empresas</label>
								<input name="todos" class="form-control input-lg home" id="todos"  title="Introduzca el texto para la búsqueda de productos y empresas" autofocus />
								<span id="menBuscar" class="hidden">Busque al menos 3 caracteres</span>
							</div>
							<div class="col-md-2 col-xs-12">
							<button type="button" class="botonbuscarcolor col-xs-12 btn btn-primary botonBuscarTodos " id="buscar" name="buscar" value="Buscar">
								<span class="glyphicon glyphicon-search" aria-hidden="true"></span> Buscar</button> 
							</div>
						
						</div>
					</fieldset>
				</form>
			</div>
		</div>
		<div class="row cargando hidden ">
			<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-md-offset-3">
				<div class="text-center">
					<img alt="cargando..." src="/InterPresent1/groups/sistema/documents/sistema/cargando.gif" />
				</div>
				<div class="text-center">
					<p>Buscando... </p>
				</div>
			</div>
		</div>
		<div class="center_sindatos hidden">
		</div>
		<div class="center hidden">
				<!--<><><><><><><><><><><><><><><><><><><><><><><><><><> DEMO START <><><><><><><><><><><><><><><><><><><><><><><><><><>-->
			
			<div id="demo_todos" class="box jplist">
		
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
					<div class="jplist-panel box panel-top">
						
					
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
						
<!-- views -->
						<div class="row col-sm-12 listadoDocumentosNoDOC">
				<!-- pagination results -->
							
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

												<li role="presentation">
													<a role="menuitem" tabindex="-1" href="#" data-number="3">3 por página</a>
												</li>

												<li role="presentation">
													<a role="menuitem" tabindex="-1" href="#" data-number="5" data-default="true">5 por página</a>
												</li>

												<li role="presentation">
													<a role="menuitem" tabindex="-1" href="#" data-number="10">10 por página</a>
												</li>

												<li role="presentation" class="divider"></li>

												<li role="presentation">
													<a role="menuitem" tabindex="-1" href="#" data-number="all">Todos</a>
												</li>
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
												
				
					<div class="row col-sm-12 listadoDocumentosNoDOC">
			<ul class="listadoResultado list box col-sm-12 hidden">
			<li>Sin datos</li>
		</ul>
		<p class="listadoResultadoSin hidden">No se encontraron coincidencias</p>		
<div class="col-md-12 col-md-offset-3 listadoDocumentosNoDOC">

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
	</div>
	<div class="row col-sm-12 listadoDocumentos hidden"></div>
		</div>
				</div>
	</div>

	
			<div class="enlaces row">
				<ul>
					<li class="papoyo col-lg-6 col-md-6 col-sm-12 col-xs-12"><a href="/catalogo_01/prod/index.htm">Productos de Apoyo</a></li>
					<li class="empresas col-lg-6 col-md-6 col-sm-12 col-xs-12"><a href="/catalogo_01/empr/index.htm">Empresas</a></li>
				</ul>
			</div>
			
		</div>
		
	</div>
	
	</div>
	
	<div id="footer-wrapper">
		<h2 class="oculto">Mapa Web</h2>
		<div id="footer-menu">
			<div class="section">
			
				<!--SS_BEGIN_SNIPPET(fragment5,MapaWeb2)-->			<!--SS_END_SNIPPET(fragment5,MapaWeb2)-->
				
			</div>
		</div>
		<div id="footer">
			<div class="section">
				
				<div class="izq">
				
				<!--SS_BEGIN_SNIPPET(fragment5,Copyright2)-->		<p class="copyright">&copy; Instituto de Mayores y Servicios Sociales (<abbr title="Instituto de Mayores y Servicios Sociales">Imserso</abbr>) 2019</p>
			<a class="ir-arriba"  javascript:void(0) title="Volver arriba">
  				<span class="fa-stack">
   				 	<i class="fa fa-circle fa-stack-2x"></i>
   				 	<i class="fa fa-arrow-up fa-stack-1x fa-inverse"></i>
  				</span>
			</a>
		<p class="copyright">Catálogo de Productos de Apoyo del <abbr title="Centro de Referencia Estatal de Autonomía Personal y Ayudas Técnicas">Ceapat</abbr></p>
			<!--SS_END_SNIPPET(fragment5,Copyright2)-->
				
				</div>
				
				<div class="drch">
				
				<!--SS_BEGIN_SNIPPET(fragment6,Inferior2)-->	<ul id="footer-nav">
			<li class="first">		<a href="/catalogo_01/auxiliares/aviso_legal/index.htm">Aviso Legal</a>
</li>
			<li>		<a href="/catalogo_01/auxiliares/accesibilidad/index.htm">Accesibilidad</a>
</li>
			<li class="last">		<a href="/catalogo_01/auxiliares/mapa_web/index.htm">Mapa web</a>
</li>
	</ul>
			<!--SS_END_SNIPPET(fragment6,Inferior2)-->
				
				<!--SS_BEGIN_SNIPPET(fragment5,SellosCertificados2)-->

			<!--SS_END_SNIPPET(fragment5,SellosCertificados2)-->
				
				</div>
				
			</div>
		</div>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
 
</body>
</html>

