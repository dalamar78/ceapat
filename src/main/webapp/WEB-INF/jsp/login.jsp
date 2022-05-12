<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<c:set var="contextPath" value="${pageContext.request.contextPath}"/>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Entrar al Catálogo</title>
    

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
	<li class="activa"><a href="/index">Inicio</a></li>
	
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
    
    <div id="main-content" class="container">
     <c:if test="${pageContext.request.userPrincipal.name != null}">
        <form id="logoutForm" method="POST" action="${contextPath}/logout">
            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
        </form>

        <h2>Hola ${pageContext.request.userPrincipal.name} | <a onclick="document.forms['logoutForm'].submit()">Salir</a></h2>
    
    </c:if>
    <c:if test="${pageContext.request.userPrincipal.name == null}">
       
     <form method="POST" action="${contextPath}/login" class="form-signin">
        <h2 class="form-heading">Acceso al Catálogo</h2>

        <div class="form-group ${error != null ? 'has-error' : ''}">
            <span>${message}</span>
            <input name="username" type="text" class="form-control" placeholder="Usuario"
                   autofocus="true"/>
            <input name="password" type="password" class="form-control" placeholder="Contraseña"/>
            <span>${error}</span>
            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>

            <button class="btn btn-lg btn-primary btn-block" type="submit">Entrar</button>
           
        </div>
      </form>

 </div>

    
    </c:if>

      
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
		</div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script  src="${contextPath}/resources/js/bootstrap_min.js"></script>
</body>
</html>