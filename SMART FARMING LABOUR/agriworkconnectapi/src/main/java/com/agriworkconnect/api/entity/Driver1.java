package com.agriworkconnect.api.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "driver1")
public class Driver1 {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "labourId", nullable = false)
  private int labourId;

  @Column(name = "labourFirstName", nullable = false)
  private String labourFirstName;

  @Column(name = "labourLastName", nullable = false)
  private String labourLastName;

  @Column(name = "address", nullable = false)
  private String address;

  @Column(name = "phoneNo", nullable = false)
  private String phoneNo;

  @Column(name = "experience", nullable = false)
  private String experience;

  @Column(name = "gender", nullable = false)
  private String gender;
//
//  @ManyToOne
//  @JoinColumn(name = "driverId", nullable = false)
//  private Vehicle vehicle;

  // Getters and Setters

  public int getLabourId() {
    return labourId;
  }

  public void setLabourId(int labourId) {
    this.labourId = labourId;
  }

  public String getLabourFirstName() {
    return labourFirstName;
  }

  public void setLabourFirstName(String labourFirstName) {
    this.labourFirstName = labourFirstName;
  }

  public String getLabourLastName() {
    return labourLastName;
  }

  public void setLabourLastName(String labourLastName) {
    this.labourLastName = labourLastName;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getPhoneNo() {
    return phoneNo;
  }

  public void setPhoneNo(String phoneNo) {
    this.phoneNo = phoneNo;
  }

  public String getExperience() {
    return experience;
  }

  public void setExperience(String experience) {
    this.experience = experience;
  }

  public String getGender() {
    return gender;
  }

  public void setGender(String gender) {
    this.gender = gender;
  }

//  public Vehicle getVehicle() {
//    return vehicle;
//  }
//
//  public void setVehicle(Vehicle vehicle) {
//    this.vehicle = vehicle;
//  }
}
