package entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="userlogin")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer id;
	
	@Column(name="email")
	String Useremail;
	
	@Column(name="password")
	String Password;
	
	
	public String getUseremail() {
		
		return Useremail;
		
	}
	
	public void setUseremail(String useremail) {
		
		this.Useremail = useremail;
		
	}
	
	public String getPassword() {
		
		return Password;
	}
	
	public void setPassword(String password) {
		
		this.Password = password;
		
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	
	
	

}
