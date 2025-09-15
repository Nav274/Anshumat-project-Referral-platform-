package repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import entities.User;
import entities.Postedreferral;

@Repository
public interface PostedReferralRepository extends JpaRepository<Postedreferral, Integer> {
	
	Optional<List<Postedreferral>> findByUser_id(Integer id);
	

}
