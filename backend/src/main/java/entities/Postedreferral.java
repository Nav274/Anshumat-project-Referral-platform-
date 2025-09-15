package entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import enums.Explevel;
import enums.JobType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="postedreferral")
public class Postedreferral {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer id;
	
	
	String companyname;
	
	String jobtitle;
		
	@Enumerated(EnumType.STRING)
	JobType jobtype;
	
	String location;
	
	@Enumerated(EnumType.STRING)
	@Column(name="Experiencelevel")
	Explevel experiencelevel;
		
	String salaryrange;
	
	@Column(name="jd")
	String jd;
	
	String requirements;
	
	@Column(name="benefits")
	String Benefits;
	
	@ManyToOne
	@JoinColumn(name="userid")
	User user;
	
	LocalDate posteddate = LocalDate.now();

	public LocalDate getPosteddate() {
		return posteddate;
	}

	public void setPosteddate(LocalDate posteddate) {
		this.posteddate = posteddate;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getCompanyname() {
		return companyname;
	}

	public void setCompanyname(String companyname) {
		this.companyname = companyname;
	}

	public String getJobtitle() {
		return jobtitle;
	}

	public void setJobtitle(String jobtitle) {
		this.jobtitle = jobtitle;
	}

	public JobType getJobtype() {
		return jobtype;
	}

	public void setJobtype(JobType jobtype) {
		this.jobtype = jobtype;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Explevel getExperiencelevel() {
		return experiencelevel;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setExperiencelevel(Explevel experiencelevel) {
		experiencelevel = experiencelevel;
	}

	public String getSalaryrange() {
		return salaryrange;
	}

	public void setSalaryrange(String salaryrange) {
		this.salaryrange = salaryrange;
	}

	public String getJD() {
		return jd;
	}

	public void setJD(String jD) {
		jd = jD;
	}

	public String getRequirements() {
		return requirements;
	}

	public void setRequirements(String requirements) {
		this.requirements = requirements;
	}

	public String getBenefits() {
		return Benefits;
	}

	public void setBenefits(String benefits) {
		Benefits = benefits;
	}
	
	

}
