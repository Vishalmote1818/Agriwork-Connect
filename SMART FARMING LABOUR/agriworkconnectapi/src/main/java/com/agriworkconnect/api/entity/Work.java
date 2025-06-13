package com.agriworkconnect.api.entity;

import javax.persistence.*;

@Entity
@Table(name = "works")
public class Work {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "workId", nullable = false)
  private int workId;

  @Column(name = "userId", nullable = false)
  private int userId;

  @Column(name = "firstName", nullable = false)
  private String firstName;

  @Column(name = "lastName", nullable = false)
  private String lastName;

  @Column(name = "phoneNo", nullable = false)
  private String phoneNo;

  @Column(name = "workAddress", nullable = false)
  private String workAddress;

  @Column(name = "workDay", nullable = false)
  private String workDay;

  @Column(name = "workDate", nullable = false)
  private String workDate;

  @Column(name = "workTime", nullable = false)
  private String workTime;

  @Column(name = "noOfWorkers", nullable = false)
  private int noOfWorkers;

  @Column(name = "workType", nullable = false)
  private String workType;

  @Column(name = "workerGender", nullable = false)
  private String workerGender;

  // Getters and Setters

  public int getWorkId() {
    return workId;
  }

  public void setWorkId(int workId) {
    this.workId = workId;
  }

  public int getUserId() {
    return userId;
  }

  public void setUserId(int userId) {
    this.userId = userId;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getPhoneNo() {
    return phoneNo;
  }

  public void setPhoneNo(String phoneNo) {
    this.phoneNo = phoneNo;
  }

  public String getWorkAddress() {
    return workAddress;
  }

  public void setWorkAddress(String workAddress) {
    this.workAddress = workAddress;
  }

  public String getWorkDay() {
    return workDay;
  }

  public void setWorkDay(String workDay) {
    this.workDay = workDay;
  }

  public String getWorkDate() {
    return workDate;
  }

  public void setWorkDate(String workDate) {
    this.workDate = workDate;
  }

  public String getWorkTime() {
    return workTime;
  }

  public void setWorkTime(String workTime) {
    this.workTime = workTime;
  }

  public int getNoOfWorkers() {
    return noOfWorkers;
  }

  public void setNoOfWorkers(int noOfWorkers) {
    this.noOfWorkers = noOfWorkers;
  }

  public String getWorkType() {
    return workType;
  }

  public void setWorkType(String workType) {
    this.workType = workType;
  }

  public String getWorkerGender() {
    return workerGender;
  }

  public void setWorkerGender(String workerGender) {
    this.workerGender = workerGender;
  }
}
