package entities;

import java.sql.Date;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="useredu")
public class Useredu {
	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer id;
	
	@OneToOne
	@JoinColumn(name="userid", nullable=true)
	User userid;
	
	String university;
	
	String degree;
	
	String fieldofstudy;
	
	Integer yop;
	
	
	public Useredu( String university, String degree, String fieldofstudy, Integer yop) {
		super();
		
//		this.userid = userid;
		this.university = university;
		this.degree = degree;
		this.fieldofstudy = fieldofstudy;
		this.yop = yop;

	}
	

	public Useredu() {
		// TODO Auto-generated constructor stub
	}


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public User getUserid() {
		return userid;
	}

	public void setUserid(User userid) {
		this.userid = userid;
	}

	public String getUniversity() {
		return university;
	}

	public void setUniversity(String university) {
		this.university = university;
	}

	public String getDegree() {
		return degree;
	}

	public void setDegree(String degree) {
		this.degree = degree;
	}

	public String getFieldofstudy() {
		return fieldofstudy;
	}

	public void setFieldofstudy(String fieldofstudy) {
		this.fieldofstudy = fieldofstudy;
	}

	public Integer getYop() {
		return yop;
	}

	public void setYop(Integer yop) {
		this.yop = yop;
	}


	

	
	
}
