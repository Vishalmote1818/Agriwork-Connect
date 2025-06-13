package com.agriworkconnect.api.controller;

import com.agriworkconnect.api.entity.Employee;
import com.agriworkconnect.api.entity.LoginRequestDTO;
import com.agriworkconnect.api.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/employees")
public class EmployeeController {

  @Autowired
  private EmployeeService employeeService;

  // Register a new employee
  @PostMapping("/register")
  public ResponseEntity<?> registerEmployee(@RequestBody Employee employee) {
    try {
      Employee savedEmployee = employeeService.registerEmployee(employee);
      return ResponseEntity.ok(savedEmployee);
    } catch (RuntimeException e) {
      return ResponseEntity.status(400).body(e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(500).body("Server error. Please try again.");
    }
  }


  // Authenticate employee
  @PostMapping("/login")
  public ResponseEntity<String> login(@RequestBody LoginRequestDTO loginRequest) {
    Optional<Employee> employee = employeeService.authenticateEmployee(loginRequest.getEmail(), loginRequest.getPassword());
    if (employee.isPresent()) {
      return ResponseEntity.ok("Login successful");
    } else {
      return ResponseEntity.status(401).body("Invalid credentials");
    }
  }

  // Get employee by ID
  @GetMapping("/{id}")
  public ResponseEntity<Employee> getEmployeeById(@PathVariable int id) {
    Optional<Employee> employee = employeeService.getEmployeeById(id);
    return employee.map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }

  // Update employee details
  @PutMapping("/{id}")
  public ResponseEntity<Employee> updateEmployee(@PathVariable int id, @RequestBody Employee employee) {
    employee.setEmployeeId(id);
    Employee updatedEmployee = employeeService.updateEmployee(employee);
    return ResponseEntity.ok(updatedEmployee);
  }

  // Delete employee
  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteEmployee(@PathVariable int id) {
    employeeService.deleteEmployee(id);
    return ResponseEntity.ok("Employee deleted successfully");
  }
}
