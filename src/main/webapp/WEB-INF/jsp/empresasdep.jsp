
	<!DOCTYPE html>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html lang="en">
<head>

<link rel="stylesheet" type="text/css"
	href="webjars/bootstrap/3.3.7/css/bootstrap.min.css" />

<c:url value="/css/main.css" var="jstlCss" />
<link href="${jstlCss}" rel="stylesheet" />

<c:url value="/resources/static/sipa.css" var="sipacss" />
<link href="${sipacss}" rel="stylesheet" />

<c:url value="/resources/static/tabs-css.css" var="tabscss" />
<link href="${tabscss}" rel="stylesheet" />

<script type="text/javascript" src="/ceapat/resources/static/jquery-1_11_1_min.js"></script>
<script type="text/javascript" src="/ceapat/resources/static/jquery2.js"></script>
<script type="text/javascript" src="/ceapat/resources/static/basatec_js.js"></script>
<script type="text/javascript" src="/ceapat/resources/static/tabs-js.js"></script>




</head>
<body>		
		<div>

				
				<ul>
					<c:forEach var="emp" items="${empresas}">
						<li>
							
									<span>${emp.nombre}</span>
							
						</li>
					</c:forEach>
				</ul>
			
			
			
	</div>
		
	<script type="text/javascript"
		src="webjars/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</body>

</html>