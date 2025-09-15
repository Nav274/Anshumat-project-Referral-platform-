package entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="tokens")
public class Tokens {
	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	Integer tokenid;

	@Column(name = "token")
	String token;

	@OneToOne
	@JoinColumn(name = "userid")
	User user;

	@Column(nullable = true)
	LocalDateTime created_at = LocalDateTime.now();

	@Column(nullable = true)
	LocalDateTime expires_at;

	public Tokens() {

	}

	public Tokens(User user, String token, LocalDateTime expires_at) {
		super();
		this.token = token;
		this.user = user;
		this.expires_at = expires_at;
	}

	public Integer getTokenid() {
		return tokenid;
	}

	public void setTokenid(Integer tokenid) {
		this.tokenid = tokenid;
	}

	public String gettoken() {
		return token;
	}

	public void setJwttoken(String token) {
		this.token = token;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public LocalDateTime getCreated_at() {
		return created_at;
	}

	public void setCreated_at(LocalDateTime created_at) {
		this.created_at = created_at;
	}

	public LocalDateTime getExpires_at() {
		return expires_at;
	}

	public void setExpires_at(LocalDateTime expires_at) {
		this.expires_at = expires_at;
	}


}
