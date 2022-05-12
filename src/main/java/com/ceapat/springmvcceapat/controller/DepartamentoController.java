package com.ceapat.springmvcceapat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.ceapat.springmvcceapat.dto.EmpresasDepartamentosDTO;
import com.ceapat.springmvcceapat.repository.DepartamentoRepository;


@Controller
public class DepartamentoController {
	@Autowired
	DepartamentoRepository departamentoRepo;

	@RequestMapping("/departamentos")
	public String departamentos(Model model) {
		model.addAttribute("departamentos", departamentoRepo.findAll());
		return "departamentos";
	}
	
	@RequestMapping("/empresaspordepartamentos")
	public String empresaspordepartamentos(Model model) {
		model.addAttribute("empresaspordepartamentos", departamentoRepo.getEmpresasPorDepartamentos());
		model.addAttribute("departamentos", departamentoRepo.findAll());
		return "empresaspordepartamentos";
	}
	
	@RequestMapping("/empresaspordepartamento")
	public String empresaspordepartamento(Model model) {
		//model.addAttribute("empresaspordepartamento", departamentoRepo.getEmpresasPorDepartamentos());
		model.addAttribute("departamentos", departamentoRepo.findAll());
		return "empresaspordepartamento";
	}
	
	@RequestMapping("/empresasdep")
	public String empresasdep(@RequestParam Integer id_dep,Model model) {
		model.addAttribute("empresas", departamentoRepo.getEmpresasPorDepartamento(id_dep));
		model.addAttribute("departamentos", departamentoRepo.findAll());
		//return "empresaspordepartamento";
		return "empresasdep";
	}
}
