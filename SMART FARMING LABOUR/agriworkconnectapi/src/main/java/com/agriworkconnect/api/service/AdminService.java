package com.agriworkconnect.api.service;

import com.agriworkconnect.api.entity.Admin;
import com.agriworkconnect.api.repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Optional for securing passwords.

    public Admin registerAdmin(Admin admin) {
        // Encrypt password before saving
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }

    public Admin loginAdmin(String username, String password) {
        Admin admin = adminRepository.findByUsername(username);
        if (admin != null && passwordEncoder.matches(password, admin.getPassword())) {
            return admin;
        }
        throw new RuntimeException("Invalid credentials");
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }
}
