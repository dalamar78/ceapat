package com.ceapat.springmvcceapat.entity;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "usuario", schema = "catalogo_pruebas1")
public class User {
      
    
    @Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;
    
  
    @Transient
    @Column(name = "passwordConfirm")
    private String passwordConfirm;

    /*
    @ManyToMany
    private Set<Departamento> departamentos;
	*/
    
    @Column(name = "id_dep")
	private Integer id_dep;

	
	@OneToOne
	@JoinColumn(name = "id_dep", referencedColumnName = "id_dep", insertable = false, updatable = false, nullable = true)
	private Departamento departamento;
	

    public Long getId() {
        return id;
    }

    /*
    public void setId(Long id) {
        this.id = id;
    }
    */

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPasswordConfirm() {
        return passwordConfirm;
    }

    public void setPasswordConfirm(String passwordConfirm) {
        this.passwordConfirm = passwordConfirm;
    }

	public Integer getId_dep() {
		return id_dep;
	}

	public void setId_dep(Integer id_dep) {
		this.id_dep = id_dep;
	}

	public Departamento getDepartamento() {
		return departamento;
	}

	public void setDepartamento(Departamento departamento) {
		this.departamento = departamento;
	}

   
    
   
}