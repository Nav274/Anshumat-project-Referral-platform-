package repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import entities.User;
import entities.Useredu;
import entities.Useremp;
import entities.Userinfo;

@Repository
public interface UserEmpRepository extends JpaRepository<Useremp, Integer>{
	
	@Query("Select u from Useremp u where u.userid.id=:id")
	Optional<Useremp> findByUserid(@Param("id")Integer id);

}
