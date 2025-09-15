package repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import entities.User;
import jakarta.transaction.Transactional;
import entities.Tokens;
import entities.Tokens;

@Repository
public interface TokenRepository extends JpaRepository<Tokens, Integer>{
	
	Optional<Tokens> findBytoken(String token);

	Optional<Tokens> findByuser(User user);

	Optional<Tokens> findByuser_id(Integer id);

	@Modifying
	@Transactional
	@Query("Delete from Tokens t where t.user.id = :userid")
	void deleteByUserid(@Param("userid") int userid);


}
