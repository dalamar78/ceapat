package com.ceapat.springmvcceapat.entity;


import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "iso_n1n2n3", schema = "catalogo_pruebas1")
public class Iso_n1n2n3 {
	   @Id
		@Column(name = "id_n1n2n3")
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Integer id_n1n2n3;
	
	   @Column(name = "id_padre")
	    private String id_padre;

	    @Column(name = "n1n2n3")
	    private String n1n2n3; 

	    public Integer getId_n1n2n3() {
	        return id_n1n2n3;
	    }

	    public String getId_padre() {
	        return id_padre;
	    }

	    public void setId_padre(String id_padre) {
	        this.id_padre = id_padre;
	    }
	    public String getN1n2n3() {
	        return n1n2n3;
	    }

	    public void setN1n2n3(String n1n2n3) {
	        this.n1n2n3 = n1n2n3;
	    }
}
