package com.agriworkconnect.api.entity;

import lombok.Data;
import javax.persistence.*;

@Entity
@Data
@Table(name = "employees")
public class Employee {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int employeeId;

  @Column(name = "FirstName", nullable = false)
  private String firstName;

  @Column(name = "LastName", nullable = false)
  private String lastName;

  @Column(name = "Email", nullable = false, unique = true)
  private String email;

  @Column(name = "Password", nullable = false)
  private String password;

  @Column(name = "PhoneNumber")
  private String phoneNumber;

  @Column(name = "RouteName")
  private String routeName;
}
