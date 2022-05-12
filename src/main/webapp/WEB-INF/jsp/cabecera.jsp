<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
   
    <title> <%=session.getAttribute("titulo") %></title>
    
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
    

    
    
</head>
<body>

  <div class="container">

  </div>
		<ul class="oculto">
			<li><a accesskey="s" title="Ir al contenido principal de la página [s]" href="#main-content">Ir al contenido principal de la página [s].</a></li>
			<li><a accesskey="m" title="Ir al menú de navegación principal de la página [m]" href="#nav-cabecera">Ir al menú de navegación principal de la página [m].</a></li>
		</ul>
			
	
	<div id="content-header">
    <div class="section">
    
    

<a class="col-lg-4 col-md-4 col-sm-4" target="_blank" title="Abre nueva ventana" href="http://www.imserso.es">
	<img src="${contextPath}/resources/img/logo-header.jpg" alt="Logo del Imserso. Página principal del Imserso" />
</a>

<a class="col-lg-4 col-md-4 col-sm-4" target="_blank" title="Abre nueva ventana" href="https://www.agenda2030.gob.es/es">
	<img src="${contextPath}/resources/img/logo-agenda_2030.jpg" alt="Logo de la Agenda 2030" />
</a>

	<a class="col-lg-2 col-md-2 col-sm-2 col-xs-2" target="_blank" title="Abre nueva ventana" href="/ceapat_01/index.htm"><img src="${contextPath}/resources/img/logo-ceapat_catalogo.jpg" alt="Logo del Centro de Referencia Estatal de Autonomía Personal y Ayudas Técnicas. Página principal del Centro" /></a>
	<a class="col-lg-2 col-md-2 col-sm-2 col-xs-2" href="/index"><img src="${contextPath}/resources/img/logo-sipa.jpg" alt="Logo del Catálogo de Productos de Apoyo. Página principal del Sitio" /></a>
	<h1 class="col-lg-4 col-md-4 col-sm-9 col-xs-9">
		<span class="titulo">
			<span class="i">C</span>atálogo de
				<br /><span class="i">P</span>roductos de <span class="i">A</span>poyo
		</span>
	</h1>
</div>
	
    
    <div id="nav-cabecera" class="row">
    	<div class="section">
    	
    <ul class="sf-menu col-lg-12 col-md-12 col-sm-12 col-xs-12">
	<li class="activa"><a href="/index">Inicio</a></li>
	<li class="desplegable"><a class="sf-with-ul" href="#">Catálogo de Productos de Apoyo</a>
		<ul class="oculto">
				<li><a href="/catalogo_01/clasif_iso/index.htm">Clasificación <abbr title="Organización Internacional de Normalización">ISO</abbr> 9999:2016</a></li>
				<li><a href="/catalogo_01/prod/index.htm">Productos de Apoyo</a></li>
				<li><a href="/catalogo_01/empr/index.htm">Empresas</a></li>

		</ul>
	</li>
	
				<c:if test="${pageContext.request.userPrincipal.name != null}">
				<li class="usuario">
			        <form id="logoutForm" method="POST" action="${contextPath}/logout">
			            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
			        </form>
			        Bienvenido ${pageContext.request.userPrincipal.name} | <as tyle="display:inlinet !important;" onclick="document.forms['logoutForm'].submit()">Salir</a>
				 </li>
			   </c:if>

			    
	
</ul>

			<!--SS_END_SNIPPET(fragment4,Cabecera2_SIPA)-->
    		
    	</div>
    </div>
    </div>
    
    <div id="main-content">