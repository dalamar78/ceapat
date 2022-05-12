package com.ceapat.springmvcceapat.controller;

import  com.ceapat.springmvcceapat.entity.User;
import com.ceapat.springmvcceapat.repository.DepartamentoRepository;
import com.ceapat.springmvcceapat.repository.UserRepository;
import com.ceapat.springmvcceapat.service.SecurityService;
import com.ceapat.springmvcceapat.service.UserService;
//import com.ceapat.springmvcceapat.validator.UsuarioValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
@Controller
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private SecurityService securityService;
    
    


   // @Autowired
  //  private UserValidator userValidator;

    @GetMapping("/registration")
    public String registration(Model model) {
        model.addAttribute("userForm", new User());

        return "registration";
    }

 
    /*@PostMapping("/registration")
    public String registration(@ModelAttribute("userForm") User userForm, BindingResult bindingResult) {
        userValidator.validate(userForm, bindingResult);

        if (bindingResult.hasErrors()) {
            return "registration";
        }

        userService.save(userForm);

        securityService.autoLogin(userForm.getUsername(), userForm.getPasswordConfirm());

        return "redirect:/welcome";
    }*/

    @GetMapping("/login")
    public String login(Model model, String error, String logout) {
        if (error != null)
            model.addAttribute("error", "Usuario o contraseña erroneo.");

        if (logout != null)
            model.addAttribute("message", "Te has logueado correctamente.");

        return "login";
    }

    @GetMapping({"/", "/index"})
    public String index(Model model) {
        return "index";
    }
}
