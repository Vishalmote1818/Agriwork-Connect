package com.agriworkconnect.api.model;

public class Driver1ReqBody {

  private int labourId;
  private String labourFirstName;
  private String labourLastName;
  private String address;
  private String phoneNo;
  private String experience;
  private String gender;

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
}
