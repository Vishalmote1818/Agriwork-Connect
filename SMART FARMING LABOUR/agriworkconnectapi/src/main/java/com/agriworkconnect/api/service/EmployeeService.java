package com.agriworkconnect.api.service;

import com.agriworkconnect.api.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import com.agriworkconnect.api.entity.Employee;

@Service
public class EmployeeService {

  @Autowired
  private EmployeeRepository employeeRepository;
  @Autowired
  private EmailService emailService;

  public Employee registerEmployee(Employee employee) {
    // Check if the email already exists
    if (employeeRepository.findByEmail(employee.getEmail()) != null) {
      throw new RuntimeException("Email already exists.");
    }

    Employee newEmployee = new Employee();
    newEmployee.setFirstName(employee.getFirstName());
    newEmployee.setLastName(employee.getLastName());
    newEmployee.setEmail(employee.getEmail());
    newEmployee.setPassword(employee.getPassword());
    newEmployee.setPhoneNumber(employee.getPhoneNumber());
    newEmployee.setRouteName(employee.getRouteName());

    // Save the new employee to the database
    Employee savedEmployee = employeeRepository.save(newEmployee);

    // Send registration email
    emailService.sendEmail(
      savedEmployee.getEmail(),
      "Registration Successful",
      String.format("Hi %s %s, you have successfully registered on Smart Logistics.",
        savedEmployee.getFirstName(), savedEmployee.getLastName())
    );

    return savedEmployee;
  }


  // Authenticate employee by email and password
  public Optional<Employee> authenticateEmployee(String email, String password) {
    Employee employee = employeeRepository.findByEmail(email);
    if (employee != null && employee.getPassword().equals(password)) {
      return Optional.of(employee);
    }
    return Optional.empty();
  }

  // Fetch employee by ID
  public Optional<Employee> getEmployeeById(int employeeId) {
    return employeeRepository.findById(employeeId);
  }

  // Update employee details
  public Employee updateEmployee(Employee employee) {
    return employeeRepository.save(employee);
  }

  // Delete employee
  public void deleteEmployee(int employeeId) {
    employeeRepository.deleteById(employeeId);
  }
}
