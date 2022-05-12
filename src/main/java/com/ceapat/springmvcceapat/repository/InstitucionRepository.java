package com.ceapat.springmvcceapat.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ceapat.springmvcceapat.dto.EmpresasActivasAlfabeticasDTO;
import com.ceapat.springmvcceapat.dto.EmpresasInactivasDTO;
import com.ceapat.springmvcceapat.entity.Institucion;


public interface InstitucionRepository extends JpaRepository<Institucion, Integer>
{
	
	/*String cadenaSQL ="";
	 cadenaSQL = "SELECT DISTINCT i.ID_INS, i.NOMBRE,i.ACRONIMO FROM INSTITUCION i";
	       // si es presentacion solo se muetran las empresas activas y las que tengan algun producto activo
	 if (!AuthenticationSystem.isLogged()) {
	      cadenaSQL = cadenaSQL + " LEFT OUTER JOIN PRODUCTO_INSTITUCION pi ON pi.ID_INS= i.ID_INS LEFT OUTER JOIN PRODUCTO_FICHA_GENERAL pfg USING (ID_PROD) WHERE  ESTADO = 'ACTIVO'  AND (i.FECHA_BAJA = ''  or i.FECHA_BAJA  IS NULL)";
	 }else{
	    cadenaSQL = cadenaSQL +   " WHERE  i.FECHA_BAJA = ''  or i.FECHA_BAJA  IS NULL";
	 }
	     
	 cadenaSQL = cadenaSQL + " ORDER BY NOMBRE";
	@Query(value = cadenaSQL, nativeQuery = true)*/
	
	@Query(value = "SELECT DISTINCT i.ID_INS, i.NOMBRE,i.ACRONIMO FROM catalogo_pruebas1.institucion i  LEFT OUTER JOIN catalogo_pruebas1.PRODUCTO_INSTITUCION pi ON pi.ID_INS= i.ID_INS LEFT OUTER JOIN catalogo_pruebas1.PRODUCTO_FICHA_GENERAL pfg USING (ID_PROD) WHERE  ESTADO = 'ACTIVO'  AND  i.FECHA_BAJA  IS NULL", nativeQuery = true)
	public List<EmpresasActivasAlfabeticasDTO> getEmpresasActivasAlfabeticas();

@Query(value = "SELECT ID_INS, NOMBRE, FECHA_BAJA from catalogo_pruebas1.institucion WHERE FECHA_BAJA IS NOT NULL  ORDER BY FECHA_BAJA ASC", nativeQuery = true)
	public List<EmpresasInactivasDTO> getEmpresasInactivas();
	
}