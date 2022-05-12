package com.ceapat.springmvcceapat.entity;
import javax.persistence.*;
import java.util.Set;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "departamento", schema = "catalogo_pruebas1")
public class Departamento
{
	@Id 
	private Integer id_dep;
	private String departamento;
	private String literal_dep;
	
	public Departamento()
	{
	}

	public Departamento(Integer id_dep, String departamento, String literal_dep)
	{
		this.id_dep = id_dep;
		this.departamento = departamento;
		this.literal_dep = literal_dep;
	}
	
	/*
	@ManyToMany(mappedBy = "departamentos")
	 private Set<User> users;
	*/
	
	public Integer getId_dep() {
		return id_dep;
	}

	public void setId_dep(Integer id_dep) {
		this.id_dep = id_dep;
	}

	public String getDepartamento() {
		return departamento;
	}

	public void setDepartamento(String departamento) {
		this.departamento = departamento;
	}

	public String getLiteral_dep() {
		return literal_dep;
	}

	public void setLiteral_dep(String literal_dep) {
		this.literal_dep = literal_dep;
	}
	/*
	public Set<User> getUsers() {
        return users;
    }

	public void setUsers(Set<User> users) {
        this.users = users;
    }
    */
}
