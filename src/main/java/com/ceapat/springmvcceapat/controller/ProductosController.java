package com.ceapat.springmvcceapat.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.ceapat.springmvcceapat.dto.Iso_n1n2n3AlfabeticoDTO;
import com.ceapat.springmvcceapat.entity.User;
import com.ceapat.springmvcceapat.repository.DepartamentoRepository;
import com.ceapat.springmvcceapat.repository.Iso_n1n2n3Repository;


@Controller
public class ProductosController {
	@Autowired
	Iso_n1n2n3Repository ison1n2n3Repo;

	@RequestMapping("/productos/productos")
	public String productos(Model model) {
		
		return "/productos/productos";
	}
	@RequestMapping("/productos/categorias")
	public String categorias(Model model) {
		
		return "/productos/categorias";
	}
	@RequestMapping("/productos/iso")
	public String iso(Model model) {
		
		return "/productos/iso";
	}
	@RequestMapping("/productos/glosario")
	public String glosario(Model model) {
		model.addAttribute("isoAlfabeticos", ison1n2n3Repo.getIso_n1n2n3Alfabetico());

		return "/productos/glosario";
	}
}