package entities;

import java.sql.Date;
import java.time.LocalDateTime;

import enums.Explevel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.websocket.Encoder.Binary;


public class Profile {
	
	
	User userid;
	
	String firstname;
	
	String lastname;
	
	String proftitle;
	
	String bio;
	
	String location;
	
	String phoneno;
	
	String linkedin;
	
	String photo;
	
	String currentcompany;
	
	String currentrole;
	
	LocalDateTime currentstartdate;
	
	@Enumerated(EnumType.STRING)
	Explevel experiencelevel;
	
	String userroledesc;
	
	String university;
	
	String degree;
	
	String fieldofstudy;
	
	Date yop;
	
	String skill;

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

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
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

	public LocalDateTime getCurrentstartdate() {
		return currentstartdate;
	}

	public void setCurrentstartdate(LocalDateTime currentstartdate) {
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

	public Date getYop() {
		return yop;
	}

	public void setYop(Date yop) {
		this.yop = yop;
	}

	public String getSkill() {
		return skill;
	}

	public void setSkill(String skill) {
		this.skill = skill;
	}
	
	
	

}
