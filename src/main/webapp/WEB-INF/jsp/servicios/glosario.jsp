<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<% 
String strTipo = request.getParameter("strTipo");
String strTipoId = request.getParameter("strTipoId");
String strPlaceholder = request.getParameter("strPlaceholder");
 %>
 
 
<legend class="oculto"><%=strTipo%></legend>
<!--  inicio  alfabeto_glosario_div -->
<div role="list"class="alphabet col-sm-12 hidden-md hidden-lg">
	<div class="grupo col-sm-12 col-xs-12">
		<div role="listitem" class="activa visible-xs-inline-block visible-md-inline-block visible-sm-inline-block visible-lg-inline-block"><a href="#" id="div_a">A</a></div>
		<div role="listitem" class="visible-xs-inline-block visible-md-inline-block visible-sm-inline-block visible-lg-inline-block"><a href="#" id="div_b">B</a></div>
		<div role="listitem" class="visible-xs-inline-block visible-md-inline-block visible-sm-inline-block visible-lg-inline-block"><a href="#" id="div_c">C</a></div>
		<div role="listitem" class="visible-xs-inline-block visible-md-inline-block visible-sm-inline-block visible-lg-inline-block"><a href="#" id="div_d">D</a></div>
		<div role="listitem" class="visible-xs-inline-block visible-md-inline-block visible-sm-inline-block visible-lg-inline-block"><a href="#" id="div_e">E</a></div>
		<div role="listitem" class="visible-xs-inline-block visible-md-inline-block visible-sm-inline-block visible-lg-inline-block"><a href="#" id="div_f">F</a></div>
		<div role="listitem" class="visible-xs-inline-block visible-md-inline-block visible-sm-inline-block visible-lg-inline-block"><a href="#" id="div_g">G</a></div>
		<div role="listitem" class="visible-xs-inline-block visible-md-inline-block visible-sm-inline-block visible-lg-inline-block"><a href="#" id="div_h">H</a></div>
	</div>
	<div class="grupo col-sm-12 col-xs-12">
		<div role="listitem" class="visible-xs-inline-block visible-md-inline-block visible-sm-inline-block visible-lg-inline-block"><a href="#" id="div_i">I</a></div>
		<div role="listitem" class="visible-xs-inline-block visible-md-inline-block visible-sm-inline-block visible-lg-inline-block"><a href="#" id="div_j">J</a></div>
		<div role="listitem" class="visible-xs-inline-block visible-md-inline-block visible-sm-inline-block visible-lg-inline-block"><a href="#" id="div_k">K</a></div>
		<div role="listitem" class="visible-xs-inline-block visible-md-inline-block visible-sm-inline-block visible-lg-inline-block"><a href="#" id="div_l">L</a></div>
		<div role="listitem" class="visible-xs-inline-block visible-md-inline-block visible-sm-inline-block visible-lg-inline-block"><a href="#" id="div_m">M</a></div>
		<div role="listitem" class="visible-xs-inline-block visible-md-inline-block visible-sm-inline-block visible-lg-inline-block"><a href="#" id="div_n">N</a></div>
		<div role="listitem" class="visible-xs-inline-block visible-md-inline-block visible-sm-inline-block visible-lg-inline-block"><a href="#" id="div_o">O</a></div>
		<div role="listitem" class="visible-xs-inline-block visible-md-inline-block visible-sm-inline-block visible-lg-inline-block"><a href="#" id="div_p">P</a></div>
		<div role="listitem" class="visible-xs-inline-block visible-md-inline-block visible-sm-inline-block visible-lg-inline-block"><a href="#" id="div_q">Q</a></div>							
	</div>
	<div class="grupo col-md-4 col-sm-12 col-xs-12">
		<div role="listitem" class="visible-xs-inline-block visible-md-inline-block visible-sm-inline-block visible-lg-inline-block"><a href="#" id="div_r">R</a></div>
		<div role="listitem" class="visible-xs-inline-block visible-md-inline-block visible-sm-inline-block visible-lg-inline-block"><a href="#" id="div_s">S</a></div>
		<div role="listitem" class="visible-xs-inline-block visible-md-inline-block visible-sm-inline-block visible-lg-inline-block"><a href="#" id="div_t">T</a></div>
		<div role="listitem" class="visible-xs-inline-block visible-md-inline-block visible-sm-inline-block visible-lg-inline-block"><a href="#" id="div_u">U</a></div>
		<div role="listitem" class="visible-xs-inline-block visible-md-inline-block visible-sm-inline-block visible-lg-inline-block"><a href="#" id="div_v">V</a></div>
		<div role="listitem" class="visible-xs-inline-block visible-md-inline-block visible-sm-inline-block visible-lg-inline-block"><a href="#" id="div_w">W</a></div>
		<div role="listitem" class="visible-xs-inline-block visible-md-inline-block visible-sm-inline-block visible-lg-inline-block"><a href="#" id="div_x">X</a></div>
		<div role="listitem" class="visible-xs-inline-block visible-md-inline-block visible-sm-inline-block visible-lg-inline-block"><a href="#" id="div_y">Y</a></div>
		<div role="listitem" class="visible-xs-inline-block visible-md-inline-block visible-sm-inline-block visible-lg-inline-block"><a href="#" id="div_z">Z</a></div>
	</div>
</div>
<ul class="alphabet list-inline hidden-sm hidden-xs">
	<li class="activa"><a href="#" id="li_a">A</a></li>
	<li><a href="#" id="li_b">B</a></li>
	<li><a href="#" id="li_c">C</a></li>
	<li><a href="#" id="li_d">D</a></li>
	<li><a href="#" id="li_e">E</a></li>
	<li><a href="#" id="li_f">F</a></li>
	<li><a href="#" id="li_g">G</a></li>
	<li><a href="#" id="li_h">H</a></li>
	<li><a href="#" id="li_i">I</a></li>
	<li><a href="#" id="li_j">J</a></li>
	<li><a href="#" id="li_k">K</a></li>
	<li><a href="#" id="li_l">L</a></li>
	<li><a href="#" id="li_m">M</a></li>
	<li><a href="#" id="li_n">N</a></li>
	<li><a href="#" id="li_o">O</a></li>
	<li><a href="#" id="li_p">P</a></li>
	<li><a href="#" id="li_q">Q</a></li>
	<li><a href="#" id="li_r">R</a></li>
	<li><a href="#" id="li_s">S</a></li>
	<li><a href="#" id="li_t">T</a></li>
	<li><a href="#" id="li_u">U</a></li>
	<li><a href="#" id="li_v">V</a></li>
	<li><a href="#" id="li_w">W</a></li>
	<li><a href="#" id="li_x">X</a></li>
	<li><a href="#" id="li_y">Y</a></li>
	<li><a href="#" id="li_z">Z</a></li>
</ul>
<!--  FIN  alfabeto_glosario_div -->
<span style="clear:both; display:block;"></span>
<!--  INICIO  formulario filtro -->
<div class="buscador col-xs-12">
	<div class="formulario">
		<div class="row">
			<input type="hidden" name="esTL" value="1" />
			<fieldset>
				<legend class="oculto">Filtro de <$strTipo$> del glosario</legend>
					<div class="form-group">
						<div class="col-md-8 col-xs-12">
							<label for="<%=strTipoId%>">Filtro de <%=strTipo%> del glosario</label>
							<input name="<%=strTipoId%>" class="form-control home filtroGlosario" id="<%=strTipoId%>" placeholder="<%=strPlaceholder%>" title="Introduzca el texto para la búsqueda de <%=strTipo%>" />
						</div>
						<div class="col-md-4 col-xs-12">
							<div class="col-xs-6">
								<input type="button" class="btn btn-primary botonFiltrarGlosario col-xs-6" value="Filtrar" />
							</div>
							<div class="col-xs-6">
								<input type="button" class="btn btn-primary botonFiltrarGlosarioReset col-xs-6" value="Ver Todos" />
							</div>
						</div>
					</div>
			</fieldset>
		</div>
	</div>
</div>
<!--  fin  formulario filtro -->