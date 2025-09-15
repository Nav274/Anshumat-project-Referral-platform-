package Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import entities.User;
import repositories.LoginRepository;

@Service
public class RegistrationService {
	
	@Autowired
	LoginRepository loginrepository;
	
	
	BCryptPasswordEncoder passwordencoder = new BCryptPasswordEncoder();
	
	
	
	public User RegisterUser(User user){
		

			if(loginrepository.findByUseremail(user.getUseremail()).isPresent()) {
				
				throw new RuntimeException("User already exits");
			}
			
			user.setUseremail(user.getUseremail());
			
			user.setPassword(passwordencoder.encode(user.getPassword()));
			
			User registereduser = loginrepository.save(user);
					 
			return registereduser;
		
	}
	

}
