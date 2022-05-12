package com.ceapat.springmvcceapat.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ceapat.springmvcceapat.dto.EmpresasDepartamentosDTO;
import com.ceapat.springmvcceapat.entity.Departamento;


public interface DepartamentoRepository extends JpaRepository<Departamento, Integer>
{
	
	@Query(value = "SELECT DISTINCT ID_DEP,LITERAL_DEP, ID_INS, i.NOMBRE NOMBRE FROM PRODUCTO_DEPARTAMENTO LEFT OUTER JOIN DEPARTAMENTO USING (ID_DEP) LEFT OUTER JOIN PRODUCTO_INSTITUCION USING (ID_PROD) LEFT OUTER JOIN INSTITUCION i USING (ID_INS) WHERE NOMBRE IS NOT NULL ORDER BY 1", nativeQuery = true)
	public List<EmpresasDepartamentosDTO> getEmpresasPorDepartamentos();
	
	@Query(value = "SELECT DISTINCT ID_DEP,LITERAL_DEP, ID_INS, i.NOMBRE NOMBRE FROM PRODUCTO_DEPARTAMENTO LEFT OUTER JOIN DEPARTAMENTO USING (ID_DEP) LEFT OUTER JOIN PRODUCTO_INSTITUCION USING (ID_PROD) LEFT OUTER JOIN INSTITUCION i USING (ID_INS) WHERE NOMBRE IS NOT NULL AND ID_DEP=?1 ORDER BY 1,4", nativeQuery = true)
	public List<EmpresasDepartamentosDTO> getEmpresasPorDepartamento(Integer id_dep);
}