package com.agriworkconnect.api.controller;

import com.agriworkconnect.api.entity.Admin;
import com.agriworkconnect.api.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/admins")
public class AdminController {

  @Autowired
  private AdminService adminService;

  @PostMapping("/register")
  public ResponseEntity<Admin> registerAdmin(@RequestBody Admin admin) {
    return ResponseEntity.ok(adminService.registerAdmin(admin));

  }

  @PostMapping("/login")
  public ResponseEntity<Admin> loginAdmin(@RequestBody Admin loginDetails) {
    try {
      return ResponseEntity.ok(adminService.loginAdmin(loginDetails.getUsername(), loginDetails.getPassword()));
    } catch (RuntimeException e) {
      return ResponseEntity.status(401).build();
    }
  }

  @GetMapping
  public ResponseEntity<List<Admin>> getAllAdmins() {
    return ResponseEntity.ok(adminService.getAllAdmins());
  }
}
