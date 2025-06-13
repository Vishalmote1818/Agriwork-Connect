package com.agriworkconnect.api.model;

public class WorkReqBody {

  private int workId;
  private int userId;
  private String firstName;
  private String lastName;
  private String phoneNo;
  private String workAddress;
  private String workDay;
  private String workDate;
  private String workTime;
  private int noOfWorkers;
  private String workType;
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
