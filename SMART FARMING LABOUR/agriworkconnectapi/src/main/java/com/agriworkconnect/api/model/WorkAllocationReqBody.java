package com.agriworkconnect.api.model;

public class WorkAllocationReqBody {

  private int workAllocationId;
  private String farmerName;
  private String farmerMail;
  private String farmAddress;
  private String farmerPhoneNo;
  private String driverName;
  private String driverMail;
  private String vehicleNo;
  private String driverPhoneNo;
  private double platformCharges;
  private String workType;
  private String workDate;

  // Getters and Setters
  public int getWorkAllocationId() {
    return workAllocationId;
  }

  public void setWorkAllocationId(int workAllocationId) {
    this.workAllocationId = workAllocationId;
  }

  public String getFarmerName() {
    return farmerName;
  }

  public void setFarmerName(String farmerName) {
    this.farmerName = farmerName;
  }

  public String getFarmerMail() {
    return farmerMail;
  }

  public void setFarmerMail(String farmerMail) {
    this.farmerMail = farmerMail;
  }

  public String getFarmAddress() {
    return farmAddress;
  }

  public void setFarmAddress(String farmAddress) {
    this.farmAddress = farmAddress;
  }

  public String getFarmerPhoneNo() {
    return farmerPhoneNo;
  }

  public void setFarmerPhoneNo(String farmerPhoneNo) {
    this.farmerPhoneNo = farmerPhoneNo;
  }

  public String getDriverName() {
    return driverName;
  }

  public void setDriverName(String driverName) {
    this.driverName = driverName;
  }

  public String getDriverMail() {
    return driverMail;
  }

  public void setDriverMail(String driverMail) {
    this.driverMail = driverMail;
  }

  public String getVehicleNo() {
    return vehicleNo;
  }

  public void setVehicleNo(String vehicleNo) {
    this.vehicleNo = vehicleNo;
  }

  public String getDriverPhoneNo() {
    return driverPhoneNo;
  }

  public void setDriverPhoneNo(String driverPhoneNo) {
    this.driverPhoneNo = driverPhoneNo;
  }

  public double getPlatformCharges() {
    return platformCharges;
  }

  public void setPlatformCharges(double platformCharges) {
    this.platformCharges = platformCharges;
  }

  public String getWorkType() {
    return workType;
  }

  public void setWorkType(String workType) {
    this.workType = workType;
  }

  public String getWorkDate() {
    return workDate;
  }

  public void setWorkDate(String workDate) {
    this.workDate = workDate;
  }
}
