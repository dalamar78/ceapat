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
     <script  src="${contextPath}/resources/js/jquery.easy-autocomplete_newjq.js"></script>
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
        <script type="text/javascript">
	$(document).ready(function(){
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
</body>
</body>
</html>
