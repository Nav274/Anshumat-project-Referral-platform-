package com.example.refer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = { "com.example.refer", "entities", "contollers", "repositories", "Services", "enums" })
@EnableJpaRepositories(basePackages = "repositories")
@EntityScan(basePackages = "entities")
public class ReferralConnectApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReferralConnectApplication.class, args);
	}

}
