package repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import entities.Userinfo;

@Repository
public interface UserInfoRepository extends JpaRepository<Userinfo, Integer> {
	
	@Query("Select u from Userinfo u where u.userid.id=:id")
	Optional<Userinfo> findByUserid(@Param("id")Integer id);

}
