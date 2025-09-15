package contollers;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Services.LoginService;
import Services.RegistrationService;
import entities.User;
import jakarta.servlet.http.HttpServletResponse;

@RequestMapping("/auth")
@RestController
public class AuthController {
	
	@Autowired
	LoginService loginservice;
	
	@Autowired
	RegistrationService registrationservice;
	
	@PostMapping("/login")
	public ResponseEntity<Object> LoginRequest(@RequestBody User user,  HttpServletResponse response){
		
		try {
			
			
			if(user.getUseremail().isEmpty() || user.getPassword().isEmpty()) {
				
				throw new RuntimeException("Enter username and password");
				
			}
			
			User userentity = loginservice.LoginService(user.getUseremail(), user.getPassword());
			
//			String token = loginservice.generateToken(userentity.get());
//
//		    // Use Spring ResponseCookie (supports SameSite)
//		    	ResponseCookie cookie = ResponseCookie.from("authtoken", token)
//		            .httpOnly(true)              // prevent JS access
//		            .secure(true)                // required for SameSite=None
//		            .sameSite("None")            // explicitly allow cross-site
//		            .path("/")
//		            .maxAge(3600)                // 1 hour
//		            .build();
//
//		    response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

		    return ResponseEntity.ok("Login Successful");
		
			
		}catch(Exception e) {
			
			return ResponseEntity.badRequest().body(e.getMessage());

		}
			
		
	}
		@PostMapping("/signup")
		public ResponseEntity<String> RegisterRequest(@RequestBody User user) {
			
			try {
				
				if(user.getUseremail().isEmpty() || user.getPassword().isEmpty()) {
					
					throw new RuntimeException("Enter username and password");
				
				}
				User userentity = registrationservice.RegisterUser(user);
				

				return ResponseEntity.ok("User Created Sucessfully");
			
				
			}catch(Exception e) {
			
				return ResponseEntity.badRequest().body(e.getMessage());
		}
			
	}

}
