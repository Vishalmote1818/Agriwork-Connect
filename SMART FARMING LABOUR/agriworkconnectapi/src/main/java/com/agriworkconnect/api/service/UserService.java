package com.agriworkconnect.api.service;

import com.agriworkconnect.api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.util.Optional;
import com.agriworkconnect.api.entity.User;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmailService emailService;
  @Autowired
  private JavaMailSender mailSender;

    // Register a new user
    public User registerUser(User user) {

      System.out.println("Registering user: " + user.getFirstName() + " - Email: " + user.getEmail());

      User newUser = new User();
      newUser.setFirstName(user.getFirstName());
      newUser.setLastName(user.getLastName());
      newUser.setEmail(user.getEmail());
      newUser.setPassword(user.getPassword());
      newUser.setPhoneNumber(user.getPhoneNumber());

      // Save the user
      User savedUser = userRepository.save(newUser);

      // Send Welcome Email
      String subject = "Welcome to Agriwork Connect, Farmer! 🌾🚜";
      String text = "Thank you for joining Agriwork Connect: Smart Labour Hiring System for Farming! 🌿\n\n"
        + "We’re thrilled to have you as part of our farming community. Now, you can post your farming work, connect with skilled laborers, and get the right help to boost your productivity.\n\n"
        + "Start posting your job today and let us help you grow! 🌱\n\n"
        + "Happy Farming!\n— Agriwork Connect Team";

      emailService.sendEmail(savedUser.getEmail(), subject, text);

      return savedUser;
    }


  public void sendEmail(String to, String subject, String text) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(to);
    message.setSubject(subject);
    message.setText(text);
    mailSender.send(message);
  }

  // Authenticate user by email and password
    public Optional<User> authenticateUser(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            return Optional.of(user);
        }
        return Optional.empty();
    }

    // Fetch user by ID
    public Optional<User> getUserById(int userId) {
        return userRepository.findById(userId);
    }

    // Update user details
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    // Delete user
    public void deleteUser(int userId) {
        userRepository.deleteById(userId);
    }



}
