package com.agriworkconnect.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.agriworkconnect.api.entity.User;
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
}
