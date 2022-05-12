package com.ceapat.springmvcceapat.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import com.ceapat.springmvcceapat.entity.User;


public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}