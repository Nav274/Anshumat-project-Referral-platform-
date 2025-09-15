package contollers;

import java.net.http.HttpRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import entities.User;
import enums.Explevel;
import enums.JobType;
import entities.Postedreferral;
import jakarta.servlet.http.HttpServletRequest;
import repositories.PostedReferralRepository;


@RestController
public class ReferralController {
	
	@Autowired
	PostedReferralRepository postedreferralrepository;
	
	@GetMapping("/referrals")
	public ResponseEntity getAllUserReferrals(HttpServletRequest request){
		
		try {
			
			Integer userid = (Integer) request.getAttribute("id");
											
			 List<Postedreferral> listofreferrals = postedreferralrepository.findAll();
					
			return ResponseEntity.ok(listofreferrals);
			
		}
		catch(RuntimeException e) {
			
			return ResponseEntity.badRequest().body(e.getMessage());
		}
		
	}
	
	
	@GetMapping("/referral/{id}")
	public ResponseEntity getReferral(HttpServletRequest request, @PathVariable Integer id){
		
		try {
			
			Integer userid = (Integer) request.getAttribute("id");
			
			if(id==null) {
				
				throw new IllegalArgumentException("Not found");
			}
											
			Postedreferral referral = postedreferralrepository.findById(id).orElseThrow(()->new IllegalArgumentException("Refrerral not found"));
					
			return ResponseEntity.ok(referral);
			
		}
		catch(RuntimeException e) {
			
			return ResponseEntity.badRequest().body(e.getMessage());
		}
		
	}
	
	@PostMapping("/referrals")
	public ResponseEntity postNewReferral(HttpServletRequest request, @RequestBody Postedreferral referral) {
		
		try {
			
			if(referral==null) {
				
				throw new RuntimeException("Enter a value");
			}
			
			
			postedreferralrepository.save(referral);
			
			return ResponseEntity.ok("Successfully inserted");
				
		}
		catch(Exception e) {
			
			return ResponseEntity.badRequest().body(e.getMessage());
		}
		
		
	}
	
	@PutMapping("/referral/{id}")
	public ResponseEntity UpdateReferral(HttpServletRequest request, @RequestBody Map<String, Object> referral, @PathVariable Integer id) {
		
		try {
			
	
			Postedreferral referralid = postedreferralrepository.findById(id).orElseThrow(()-> new RuntimeException("referral not found"));
			
			
				
				if(!(referral.get("jobtitle")==null) && !(referral.get("jobtitle").toString().isBlank())) {
					
					referralid.setJobtitle((String)referral.get("jobtitle"));
				}
				
				if(!(referral.get("companyname")==null) && !(referral.get("companyname").toString().isBlank())) {
					
					referralid.setCompanyname((String)referral.get("companyname"));
				}
				
				if(!(referral.get("location")==null) && !(referral.get("location").toString().isBlank())) {
					
					referralid.setLocation((String)referral.get("location"));
				}
				
				if(!(referral.get("jobtype")==null) && !(referral.get("jobtype").toString().isBlank())) {
					
					referralid.setJobtype(JobType.valueOf((String)referral.get("jobtype")));
				}
				
				if(!(referral.get("experiencelevel")==null) && !(referral.get("experiencelevel").toString().isBlank())) {
					
					referralid.setExperiencelevel(Explevel.valueOf(((String)referral.get("experiencelevel"))));
				}
				
				if(!(referral.get("salaryrange")==null) && !(referral.get("salaryrange").toString().isBlank())) {
					
					referralid.setSalaryrange((String)referral.get("salaryrange"));
				}
				
				if(!(referral.get("jd")==null) && !(referral.get("jd").toString().isBlank())) {
					
					referralid.setJD((String)referral.get("jd"));
				}
				
				if(!(referral.get("requirements")==null) && !(referral.get("requirements").toString().isBlank())) {
					
					referralid.setRequirements((String)referral.get("requirements"));
				}
				
				if(!(referral.get("benefits")==null) && !(referral.get("benefits").toString().isBlank())) {
					
					referralid.setBenefits((String)referral.get("benefits"));
				}
				
				postedreferralrepository.save(referralid);
				
				return ResponseEntity.ok("Updated Successfully");
							
	
		}
		catch(Exception e) {
		
			return ResponseEntity.badRequest().body(e.getLocalizedMessage());
		
		}
	
	}
	
	@DeleteMapping("/referral/{id}")
	public ResponseEntity deleteReferral(@PathVariable Integer id) {
		
		try {
			
			Postedreferral referral = postedreferralrepository.findById(id).orElseThrow(()-> new RuntimeException("referral not found"));
			
			postedreferralrepository.delete(referral);
			
			return ResponseEntity.ok("Deleted successfully");
		}
		
		catch(Exception e) {
			
			return ResponseEntity.internalServerError().body("referral with this is id not found Try again");
					
		}
	}
	
}
