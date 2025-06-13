package com.agriworkconnect.api.service;

import com.agriworkconnect.api.entity.WorkAllocation;
import com.agriworkconnect.api.model.WorkAllocationIdRequest;
import com.agriworkconnect.api.model.WorkAllocationReqBody;
import com.agriworkconnect.api.repositories.WorkAllocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class WorkAllocationService {

  @Autowired
  private WorkAllocationRepository workAllocationRepository;

  @Autowired
  private EmailService emailService; // Inject the EmailService

  public WorkAllocation createWorkAllocation(WorkAllocationReqBody workAllocationReqBody) {
    System.out.println("Received Work Allocation Request: " + workAllocationReqBody);

    // Validate required fields
    if (workAllocationReqBody.getFarmerName() == null || workAllocationReqBody.getFarmerName().isEmpty()) {
      throw new IllegalArgumentException("Farmer Name is required.");
    }
    if (workAllocationReqBody.getFarmAddress() == null || workAllocationReqBody.getFarmAddress().isEmpty()) {
      throw new IllegalArgumentException("Farm Address is required.");
    }
    // More validation checks...

    // Create and save the work allocation
    WorkAllocation newWorkAllocation = new WorkAllocation();
    newWorkAllocation.setFarmerName(workAllocationReqBody.getFarmerName());
    newWorkAllocation.setFarmerMail(workAllocationReqBody.getFarmerMail());
    newWorkAllocation.setFarmAddress(workAllocationReqBody.getFarmAddress());
    newWorkAllocation.setFarmerPhoneNo(workAllocationReqBody.getFarmerPhoneNo());
    newWorkAllocation.setDriverName(workAllocationReqBody.getDriverName());
    newWorkAllocation.setDriverMail(workAllocationReqBody.getDriverMail());
    newWorkAllocation.setVehicleNo(workAllocationReqBody.getVehicleNo());
    newWorkAllocation.setDriverPhoneNo(workAllocationReqBody.getDriverPhoneNo());
    newWorkAllocation.setPlatformCharges(workAllocationReqBody.getPlatformCharges());
    newWorkAllocation.setWorkType(workAllocationReqBody.getWorkType());

    try {
      newWorkAllocation.setWorkDate(workAllocationReqBody.getWorkDate());
    } catch (Exception e) {
      throw new IllegalArgumentException("Invalid Work Date format.");
    }

    WorkAllocation savedWorkAllocation = workAllocationRepository.save(newWorkAllocation);

    // Send emails to farmer and driver (handle errors gracefully)
    try {
      String subject = "Work Allocated Successfully!";
      String text = "Work Allocated Successfully! Visit our website for more details.";
      emailService.sendEmail(savedWorkAllocation.getFarmerMail(), subject, text);
      emailService.sendEmail(savedWorkAllocation.getDriverMail(), subject, text);
      System.out.println("Emails sent successfully to farmer and driver.");
    } catch (Exception e) {
      System.err.println("Failed to send emails: " + e.getMessage());
      // Log the error or notify the admin (optional)
      // You can also add a flag to indicate that emails were not sent
    }

    return savedWorkAllocation;
  }

  public WorkAllocation updateWorkAllocation(WorkAllocationReqBody workAllocationReqBody) {
    Optional<WorkAllocation> optionalWorkAllocation = workAllocationRepository.findById(workAllocationReqBody.getWorkAllocationId());
    if (!optionalWorkAllocation.isPresent()) {
      throw new EntityNotFoundException("Work Allocation with ID " + workAllocationReqBody.getWorkAllocationId() + " not found.");
    }

    WorkAllocation existingWorkAllocation = optionalWorkAllocation.get();
    existingWorkAllocation.setFarmerName(workAllocationReqBody.getFarmerName());
    existingWorkAllocation.setFarmerMail(workAllocationReqBody.getFarmerMail());
    existingWorkAllocation.setFarmAddress(workAllocationReqBody.getFarmAddress());
    existingWorkAllocation.setFarmerPhoneNo(workAllocationReqBody.getFarmerPhoneNo());
    existingWorkAllocation.setDriverName(workAllocationReqBody.getDriverName());
    existingWorkAllocation.setDriverMail(workAllocationReqBody.getDriverMail());
    existingWorkAllocation.setVehicleNo(workAllocationReqBody.getVehicleNo());
    existingWorkAllocation.setDriverPhoneNo(workAllocationReqBody.getDriverPhoneNo());
    existingWorkAllocation.setPlatformCharges(workAllocationReqBody.getPlatformCharges());
    existingWorkAllocation.setWorkType(workAllocationReqBody.getWorkType());
    existingWorkAllocation.setWorkDate(workAllocationReqBody.getWorkDate());

    return workAllocationRepository.save(existingWorkAllocation);
  }

  public Page<WorkAllocation> listAllWorkAllocationsFromDb(int pageNumber, int size) {
    Pageable pageable = PageRequest.of(pageNumber, size);
    return workAllocationRepository.listAllWorkAllocationsFromDb(pageable);
  }

  public String deleteWorkAllocation(WorkAllocationIdRequest workAllocationIdReq) {
    if (!workAllocationRepository.existsById(workAllocationIdReq.getWorkAllocationId())) {
      throw new EntityNotFoundException("Work Allocation not found with ID: " + workAllocationIdReq.getWorkAllocationId());
    }
    workAllocationRepository.deleteById(workAllocationIdReq.getWorkAllocationId());
    return "Work Allocation deleted successfully.";
  }

  public String countNumberOfWorkAllocations() {
    return workAllocationRepository.countNumberOfWorkAllocations();
  }

  public List<WorkAllocation> listWorkAllocationsByWorkAllocationId(int workAllocationId) {
    return workAllocationRepository.findByWorkAllocationId(workAllocationId);
  }
}
