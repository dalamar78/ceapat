package com.ceapat.springmvcceapat.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ceapat.springmvcceapat.dto.Iso_n1n2n3AlfabeticoDTO;
import com.ceapat.springmvcceapat.entity.Iso_n1n2n3;

public interface Iso_n1n2n3Repository extends JpaRepository<Iso_n1n2n3, Integer>
{
	
	@Query(value = "SELECT ID_N1N2N3, N1N2N3, ID_PADRE FROM catalogo_pruebas1.ISO_N1N2N3 ORDER BY N1N2N3", nativeQuery = true)
	public List<Iso_n1n2n3AlfabeticoDTO> getIso_n1n2n3Alfabetico();
	
	
}


