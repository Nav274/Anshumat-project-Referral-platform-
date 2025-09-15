package contollers;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import entities.User;
import entities.Profile;
import entities.Useredu;
import entities.Useremp;
import entities.Userinfo;
import enums.Explevel;
import jakarta.servlet.http.HttpServletRequest;
import repositories.UserEduRepository;
import repositories.UserEmpRepository;
import repositories.UserInfoRepository;

@RestController
public class ProfileController {
	
	@Autowired
	UserInfoRepository userinforepository;
	
	@Autowired
	UserEduRepository useredurepository;
	
	@Autowired
	UserEmpRepository useremprepository;
	
	@PostMapping("/profile")
	public ResponseEntity<String> updateProfile(@RequestBody Map<String, Object> profile){
		
		try {
						
		
			Userinfo userinfo = new Userinfo();
			
			if(!profile.get("firstname").toString().isBlank() && !(profile.get("firstname")==null))			
				userinfo.setFirstname(profile.get("firstname").toString());
			
			if(!profile.get("lastname").toString().isBlank() && !(profile.get("lastname")==null))
				userinfo.setLastname(profile.get("lastname").toString());
			
			if(!profile.get("proftitle").toString().isBlank() && !(profile.get("proftitle")==null))
				userinfo.setProftitle(profile.get("proftitle").toString());
			
			if(!profile.get("bio").toString().isBlank() && !(profile.get("bio")==null))
				userinfo.setBio(profile.get("bio").toString());
			
			if(!profile.get("location").toString().isBlank() && !(profile.get("location")==null))
				userinfo.setLocation(profile.get("location").toString());
			
						
			if(!profile.get("phoneno").toString().isBlank() && !(profile.get("phoneno")==null))
				userinfo.setPhoneno(profile.get("phoneno").toString());
			
			
			if(!profile.get("linkedin").toString().isBlank() && !(profile.get("linkedin")==null))
				userinfo.setLinkedin(profile.get("linkedin").toString());
			
			System.out.println("2"+profile.get("lastname").toString());
			
//			if(!profile.get("photo").toString().isBlank() && !(profile.get("photo")==null))
//				userinfo.setPhoto(((String) profile.get("photo")).getBytes());
			

			
			Useredu useredu = new Useredu();
			
			if(!profile.get("university").toString().isBlank() && !(profile.get("university")==null))
				useredu.setUniversity(profile.get("university").toString());
			
			
			if(!profile.get("degree").toString().isBlank() && !(profile.get("degree")==null))
				useredu.setDegree(profile.get("degree").toString());
			
			if(!profile.get("fieldofstudy").toString().isBlank() && !(profile.get("fieldofstudy")==null))
				useredu.setFieldofstudy(profile.get("fieldofstudy").toString());
						
			
			if(!profile.get("yop").equals(null) && !(profile.get("fieldofstudy")==null))
				useredu.setYop(Integer.parseInt((profile.get("yop").toString())));
			
			
			Useremp useremp = new Useremp();
			
			if(!profile.get("currentcompany").toString().isBlank() && !(profile.get("currentcompany")==null))
				useremp.setCurrentcompany(profile.get("currentcompany").toString());
			
			if(!profile.get("currentrole").toString().isBlank() && !(profile.get("currentrole")==null))
				useremp.setCurrentrole(profile.get("currentrole").toString());
			
			
			if(!profile.get("currentstartdate").toString().isBlank() && !(profile.get("currentstartdate")==null))
				useremp.setCurrentstartdate(profile.get("currentstartdate").toString());
			
			
			if(((String)profile.get("experiencelevel")!=null))
				useremp.setExperiencelevel(Explevel.valueOf((String) profile.get("experiencelevel")));
	
			
			if(!profile.get("userroledesc").toString().isBlank() && !(profile.get("userroledesc")==null))
				useremp.setUserroledesc(profile.get("userroledesc").toString());
			
			
			userinforepository.save(userinfo);
			useredurepository.save(useredu);
			useremprepository.save(useremp);
				
			return ResponseEntity.ok("Updated successfully");
				
		}
		catch(RuntimeException e) {
			
			return ResponseEntity.internalServerError().body("Internal server error");
		}
		
	}
	
	@GetMapping("/profile")
	public ResponseEntity getProfile(HttpServletRequest httprequest){
		
		try {
			
			Integer userid = (Integer)httprequest.getAttribute("id");
			
			Optional<Userinfo> userinfo = userinforepository.findByUserid(3);
			
			Optional<Useredu> useredu = useredurepository.findByUserid(3);
			
			Optional<Useremp> useremp = useremprepository.findByUserid(3);
			
			Map<String, Object> user = new HashMap<>();
			
			user.put("userinfomation", userinfo);
			
			user.put("usereducation", useredu);
			
			user.put("useremployement", useremp);
			
			return ResponseEntity.ok(user);
		}
		
		catch(Exception e) {
			
			return ResponseEntity.internalServerError().body("some error occurred");
		}
		
	}
}
