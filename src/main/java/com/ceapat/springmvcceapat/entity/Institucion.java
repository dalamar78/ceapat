package com.ceapat.springmvcceapat.entity;

import javax.persistence.*;
import java.util.Set;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "institucion", schema = "catalogo_pruebas1")
public class Institucion
{
	@Id 
	private Integer id_ins;
	private String nombre;
	private String acronimo;
	private String web;
	private String correo;
	private String comentario;
	private String fecha_baja;
	
	public Institucion()
	{
	}

	public Institucion(Integer id_ins, String nombre, String acronimo, String web, String correo, String comentario, String fecha_baja)
	{
		this.id_ins = id_ins;
		this.nombre = nombre;
		this.acronimo = acronimo;
		this.web = web;
		this.correo = correo;
		this.comentario = comentario;
		this.fecha_baja = fecha_baja;
	}
	public Integer getId_ins() {
		return id_ins;
	}

	public void setId_ins(Integer id_ins) {
		this.id_ins = id_ins;
	}
	public String getNombre() {
		return nombre;
	}

	public void setNombre(String departamento) {
		this.nombre = departamento;
	}
	public String getAcronimo() {
		return acronimo;
	}

	public void setgetAcronimo(String acronimo) {
		this.acronimo = acronimo;
	}
	public String getWeb() {
		return web;
	}

	public void setWeb(String web) {
		this.web = web;
	}
	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}
	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}
	public String getFecha_baja() {
		return fecha_baja;
	}

	public void setFecha_baja(String fecha_baja) {
		this.fecha_baja = fecha_baja;
	}
}