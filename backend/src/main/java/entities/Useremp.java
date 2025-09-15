package entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import enums.Explevel;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="useremp")
public class Useremp {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer id;
	
	@OneToOne
	@JoinColumn(name="userid")
	User userid;
	
	String currentcompany;
	
	String currentrole;
	
	String currentstartdate;
	
	@Enumerated(EnumType.STRING)
	Explevel experiencelevel;
	
	String userroledesc;
	
	

	public Useremp( String currentcompany, String currentrole, String currentstartdate, Explevel experiencelevel, String userroledesc) {
		super();
//		this.userid = userid;
		this.currentcompany = currentcompany;
		this.currentrole = currentrole;
		this.currentstartdate = currentstartdate;
		this.experiencelevel = experiencelevel;
		this.userroledesc = userroledesc;
	}

	public Useremp() {
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

	public String getCurrentcompany() {
		return currentcompany;
	}

	public void setCurrentcompany(String currentcompany) {
		this.currentcompany = currentcompany;
	}

	public String getCurrentrole() {
		return currentrole;
	}

	public void setCurrentrole(String currentrole) {
		this.currentrole = currentrole;
	}

	public String getCurrentstartdate() {
		return currentstartdate;
	}

	public void setCurrentstartdate(String currentstartdate) {
		this.currentstartdate = currentstartdate;
	}

	public Explevel getExperiencelevel() {
		return experiencelevel;
	}

	public void setExperiencelevel(Explevel experiencelevel) {
		this.experiencelevel = experiencelevel;
	}

	public String getUserroledesc() {
		return userroledesc;
	}

	public void setUserroledesc(String userroledesc) {
		this.userroledesc = userroledesc;
	}
	
	
	

}
