package com.agriworkconnect.api.controller;

import com.agriworkconnect.api.entity.LoginRequestDTO;
import com.agriworkconnect.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.agriworkconnect.api.entity.User;

import javax.servlet.http.HttpSession;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
      System.out.println("Received registration request for email: " + user.getEmail());
      User savedUser = userService.registerUser(user);
      return ResponseEntity.ok(savedUser);
    }


  // Authenticate user
//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password) {
//        Optional<User> user = userService.authenticateUser (email, password);
//        if (user.isPresent()) {
//            return ResponseEntity.ok("Login successful");
//        } else {
//            return ResponseEntity.status(401).body("Invalid credentials");
//        }
//    }

  @PostMapping("/login")
  public ResponseEntity<String> login(@RequestBody LoginRequestDTO loginRequest, HttpSession session) {
    Optional<User> user = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
    if (user.isPresent()) {
      session.setAttribute("userEmail", loginRequest.getEmail()); // Store email in session
      session.setAttribute("userId", user.get().getUserId()); // Store user ID
      return ResponseEntity.ok("Login successful");
    } else {
      return ResponseEntity.status(401).body("Invalid credentials");
    }
  }

  // Logout API
  @PostMapping("/logout")
  public ResponseEntity<String> logout(HttpSession session) {
    session.invalidate(); // Destroy session
    return ResponseEntity.ok("Logout successful");
  }


    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update user details
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable int id, @RequestBody User user) {
        user.setUserId(id);
        User updatedUser = userService.updateUser(user);
        return ResponseEntity.ok(updatedUser);
    }

    // Delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }
    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<String> deleteUserbyAdmin(@PathVariable int id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully from Admin's side");
    }




}

