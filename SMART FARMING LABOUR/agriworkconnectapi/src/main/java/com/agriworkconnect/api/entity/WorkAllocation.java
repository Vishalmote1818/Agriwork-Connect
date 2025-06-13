package com.agriworkconnect.api.entity;

import javax.persistence.*;

@Entity
@Table(name = "work_allocations")
public class WorkAllocation {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "workAllocationId", nullable = false)
  private int workAllocationId;

  @Column(name = "farmerName", nullable = false)
  private String farmerName;

  @Column(name = "farmerMail", nullable = false)
  private String farmerMail;

  @Column(name = "farmAddress", nullable = false)
  private String farmAddress;

  @Column(name = "farmerPhoneNo", nullable = false)
  private String farmerPhoneNo;

  @Column(name = "driverName", nullable = false)
  private String driverName;

  @Column(name = "driverMail", nullable = false)
  private String driverMail;

  @Column(name = "vehicleNo", nullable = false)
  private String vehicleNo;

  @Column(name = "driverPhoneNo", nullable = false)
  private String driverPhoneNo;

  @Column(name = "platformCharges", nullable = false)
  private double platformCharges;

  @Column(name = "workType", nullable = false)
  private String workType;

  @Column(name = "workDate", nullable = false)
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
