package entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.websocket.Encoder.Binary;

@Entity
@Table(name="userinfo")
public class Userinfo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer id;
	
	@OneToOne
	@JoinColumn(name="userid")
	User userid;
	
	
	String firstname;
	
	String lastname;
	
	String proftitle;
	
	String bio;
	
	String location;
	
	String phoneno;
	
	String linkedin;
	
	byte[] photo;
	
	
	public Userinfo( String firstname, String lastname, String proftitle, String bio, String location, String phoneno, String linkedin, byte[] photo) {
		super();
//		this.userid = userid;
		this.firstname = firstname;
		this.lastname = lastname;
		this.proftitle = proftitle;
		this.bio = bio;
		this.location = location;
		this.phoneno = phoneno;
		this.linkedin = linkedin;
		this.photo = photo;
	}

	public Userinfo() {
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

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getProftitle() {
		return proftitle;
	}

	public void setProftitle(String proftitle) {
		this.proftitle = proftitle;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getPhoneno() {
		return phoneno;
	}

	public void setPhoneno(String phoneno) {
		this.phoneno = phoneno;
	}

	public String getLinkedin() {
		return linkedin;
	}

	public void setLinkedin(String linkedin) {
		this.linkedin = linkedin;
	}

	public byte[] getPhoto() {
		return photo;
	}

	public void setPhoto(byte[] bs) {
		this.photo = bs;
	}
	
	
	
}
