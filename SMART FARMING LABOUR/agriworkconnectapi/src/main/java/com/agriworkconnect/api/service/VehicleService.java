package com.agriworkconnect.api.service;

import com.agriworkconnect.api.entity.Vehicle;
import com.agriworkconnect.api.repositories.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class VehicleService {

  @Autowired
  private VehicleRepository vehicleRepository;

  @Autowired
  private EmailService emailService;

  // Register a new vehicle (driver)
  public Vehicle registerVehicle(Vehicle vehicle) {
    // Check if the email already exists
    if (vehicleRepository.findByEmail(vehicle.getEmail()) != null) {
      throw new RuntimeException("Email already exists.");
    }

    Vehicle newVehicle = new Vehicle();
    newVehicle.setFirstName(vehicle.getFirstName());
    newVehicle.setLastName(vehicle.getLastName());
    newVehicle.setEmail(vehicle.getEmail());
    newVehicle.setPassword(vehicle.getPassword()); // Consider encrypting the password
    newVehicle.setPhoneNumber(vehicle.getPhoneNumber());
    newVehicle.setVehicleNo(vehicle.getVehicleNo());

    // Save the new vehicle to the database
    Vehicle savedVehicle = vehicleRepository.save(newVehicle);

    // Send registration email
    emailService.sendEmail(
      savedVehicle.getEmail(),
      "Registration Successful",
      String.format("Hi %s %s, you have successfully registered as a vehicle driver on Agriwork Connect.",
        savedVehicle.getFirstName(), savedVehicle.getLastName())
    );

    return savedVehicle;
  }

  // Authenticate vehicle driver by email and password
  public Optional<Vehicle> authenticateVehicle(String email, String password) {
    Vehicle vehicle = vehicleRepository.findByEmail(email);
    if (vehicle != null && vehicle.getPassword().equals(password)) {
      return Optional.of(vehicle);
    }
    return Optional.empty();
  }

  // Fetch vehicle details by ID
  public Optional<Vehicle> getVehicleById(int driverId) {
    return vehicleRepository.findById(driverId);
  }

  // Update vehicle details
  public Vehicle updateVehicle(Vehicle vehicle) {
    return vehicleRepository.save(vehicle);
  }

  // Delete vehicle
  public void deleteVehicle(int driverId) {
    vehicleRepository.deleteById(driverId);
  }
}
