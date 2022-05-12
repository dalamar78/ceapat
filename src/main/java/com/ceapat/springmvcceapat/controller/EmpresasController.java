package com.ceapat.springmvcceapat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.ceapat.springmvcceapat.dto.EmpresasDepartamentosDTO;
import com.ceapat.springmvcceapat.dto.EmpresasInactivasDTO;
import com.ceapat.springmvcceapat.repository.InstitucionRepository;


@Controller
public class EmpresasController {
	
	@Autowired
	InstitucionRepository institucionRepo;
	@RequestMapping("/empresas/empresas")
	public String empresas(Model model) {
		
		return "/empresas/empresas";
	}

	@RequestMapping("/empresas/glosario")
	public String glosario(Model model) {
	model.addAttribute("empresasActivasAlfabeticas", institucionRepo.getEmpresasActivasAlfabeticas());
	return "/empresas/glosario";
	}
	@RequestMapping("/empresas/papelera")
	public String palelera(Model model) {
	model.addAttribute("empresasPapelera", institucionRepo.getEmpresasInactivas());
	return "/empresas/papelera";
	}
}

