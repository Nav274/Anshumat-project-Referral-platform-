package Services;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import entities.User;
import entities.Tokens;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import repositories.LoginRepository;
import repositories.TokenRepository;


@Service
public class LoginService {

		
//	private final Key SIGNING_KEY;
	private final BCryptPasswordEncoder passwordencoder;
	
	private  LoginRepository loginrepository;
//	private final TokenRepository tokenrepository;


	public LoginService(LoginRepository loginRepository, TokenRepository tokenrepository, @Value("${jwt_secret}") String jwtSecret) {

		this.loginrepository = loginRepository;
//		this.tokenrepository = tokenrepository;
		this.passwordencoder = new BCryptPasswordEncoder();
//
//		if (jwtSecret.getBytes(StandardCharsets.UTF_8).length < 64) {
//			throw new IllegalArgumentException(
//					"JWT_SECRET in application.properties must be at least 64 bytes long for HS512.");
//		}
//
//		this.SIGNING_KEY = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
	}
	
	public User LoginService(String useremail, String password){
		

			User user = loginrepository.findByUseremail(useremail).orElseThrow(()->new RuntimeException("user not found"));
			
			if(!passwordencoder.matches(password, user.getPassword())) {
				
				throw new IllegalArgumentException("Check username and password");
				
			}
	
			return user;
		        
	}
	
	
//	public String generateToken(User user) {
//
//		String token;
//		
//		LocalDateTime now = LocalDateTime.now();
//		
//		Optional<Tokens> existingToken = tokenrepository.findByuser_id(user.getId());
//
//		if (existingToken.isPresent() && now.isBefore(existingToken.get().getExpires_at())) {
//			
//			token = existingToken.get().gettoken();
//			
//		} else {
//
//			token = generateNewToken(user);
//			existingToken.ifPresent(tokenValue -> tokenrepository.delete(existingToken.get()));
//
//			saveToken(user, token);
//		}
//		return token;
//	}
//	

//	private String generateNewToken(User user) {
//		return Jwts.builder().setSubject(user.getId().toString())
//				.setIssuedAt(new Date()).setExpiration(new Date(System.currentTimeMillis() + 3600000)) // 1 hour
//				.signWith(SIGNING_KEY, SignatureAlgorithm.HS512).compact();
//	}

	
//	public void saveToken(User user, String token) {
//		Tokens jwtToken = new Tokens(user, token, LocalDateTime.now().plusHours(1));
//		tokenrepository.save(jwtToken);
//	}
//	
//
//	public void logout(User user) {
//		tokenrepository.deleteById(user.getId());
//	}
//
//	
//	public boolean validateToken(String token) {
//		
//		try {
//
//			System.err.println("VALIDATING TOKEN...");
//
//			Jwts.parserBuilder().setSigningKey(SIGNING_KEY).build().parseClaimsJws(token);
//
//			Optional<Tokens> jwtToken = tokenrepository.findBytoken(token);
//			
//			if (jwtToken.isPresent()) {
//				System.err.println("Token Expiry: " + jwtToken.get().getExpires_at());
//				System.err.println("Current Time: " + LocalDateTime.now());
//				return jwtToken.get().getExpires_at().isAfter(LocalDateTime.now());
//			}
//			
//			return false;
//			
//		} catch (Exception e) {
//			
//			System.err.println("Token validation failed: " + e.getMessage());
//			return false;
//		}
//	}
//	
//
//	public String extractUserid(String token) {
//		
//		return Jwts.parserBuilder().setSigningKey(SIGNING_KEY).build().parseClaimsJws(token).getBody().getSubject();
//		
//	}
//	
}



