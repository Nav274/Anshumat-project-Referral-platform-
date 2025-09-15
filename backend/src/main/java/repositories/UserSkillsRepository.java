package repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import entities.Skills;
import entities.Userinfo;

@Repository
public interface UserSkillsRepository extends JpaRepository<Skills, Integer> {
	
	@Query("Select u from Skills u where u.userid.id=:id")
	Optional<Skills> findByUserid(@Param("id") Integer id);

}
