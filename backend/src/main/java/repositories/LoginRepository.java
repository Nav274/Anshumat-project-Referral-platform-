package repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import entities.User;

@Repository
public interface LoginRepository extends JpaRepository<User, Integer>{
	
	@Query("Select u from User u where u.Useremail=:useremail AND u.Password=:password")
	Optional<User> fetchByUseremailAndPassword(@Param("useremail") String useremail, @Param("password") String password);
	
	@Query("Select u from User u where u.Useremail=:useremail")
	Optional<User> findByUseremail(@Param("useremail") String useremail);
	
	

}
