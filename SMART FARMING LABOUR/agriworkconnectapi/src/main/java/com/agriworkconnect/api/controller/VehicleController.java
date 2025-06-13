package com.agriworkconnect.api.controller;

import com.agriworkconnect.api.entity.LoginRequestDTO;
import com.agriworkconnect.api.entity.Vehicle;
import com.agriworkconnect.api.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Optional;

@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "*") // Temporarily allow all origins
@RestController
public class VehicleController {

  @Autowired
  private VehicleService vehicleService;

  // Register a new vehicle
  @PostMapping("/register")
  public ResponseEntity<?> registerVehicle(@RequestBody Vehicle vehicle) {
    try {
      Vehicle registeredVehicle = vehicleService.registerVehicle(vehicle);
      return ResponseEntity.ok(registeredVehicle);
    } catch (RuntimeException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  // ✅ **Updated Login Method**
  @PostMapping("/login")
  public ResponseEntity<String> login(@RequestBody LoginRequestDTO loginRequest, HttpSession session) {
    Optional<Vehicle> vehicle = vehicleService.authenticateVehicle(loginRequest.getEmail(), loginRequest.getPassword());

    if (vehicle.isPresent()) {
      session.setAttribute("vehicleId", vehicle.get().getDriverId());
      session.setAttribute("vehicleEmail", vehicle.get().getEmail());
      return ResponseEntity.ok("Login successful");
    } else {
      return ResponseEntity.status(401).body("Invalid credentials");
    }
  }


  @PostMapping("/logout")
  public ResponseEntity<String> logout(HttpSession session) {
    session.invalidate();
    return ResponseEntity.ok("Logged out successfully");
  }

  @GetMapping("/session")
  public ResponseEntity<?> checkSession(HttpSession session) {
    Object vehicleEmail = session.getAttribute("vehicleEmail");
    if (vehicleEmail != null) {
      return ResponseEntity.ok("Logged in as: " + vehicleEmail);
    } else {
      return ResponseEntity.status(401).body("Not logged in");
    }
  }

  // Get vehicle by ID
  @GetMapping("/{id}")
  public ResponseEntity<?> getVehicleById(@PathVariable int id) {
    Optional<Vehicle> vehicle = vehicleService.getVehicleById(id);
    return vehicle.map(ResponseEntity::ok)
      .orElseGet(() -> ResponseEntity.notFound().build());
  }

  // Update vehicle details
  @PutMapping("/update")
  public ResponseEntity<?> updateVehicle(@RequestBody Vehicle vehicle) {
    Vehicle updatedVehicle = vehicleService.updateVehicle(vehicle);
    return ResponseEntity.ok(updatedVehicle);
  }

  // Delete vehicle
  @DeleteMapping("/delete/{id}")
  public ResponseEntity<?> deleteVehicle(@PathVariable int id) {
    vehicleService.deleteVehicle(id);
    return ResponseEntity.ok("Vehicle deleted successfully.");
  }
}
