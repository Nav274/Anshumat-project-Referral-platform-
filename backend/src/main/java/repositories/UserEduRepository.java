package repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import entities.User;
import entities.Useredu;
import entities.Userinfo;

@Repository
public interface UserEduRepository extends JpaRepository<Useredu, Integer>{
	
	@Query("Select u from Useredu u where u.userid.id=:id")
	Optional<Useredu> findByUserid(@Param("id")Integer id);

}
