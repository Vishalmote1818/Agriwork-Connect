package com.agriworkconnect.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.agriworkconnect.api.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
  Employee findByEmail(String email);
}
