package com.agriworkconnect.api.service;

import com.agriworkconnect.api.entity.Driver1;
import com.agriworkconnect.api.model.Driver1IdRequest;
import com.agriworkconnect.api.model.Driver1ReqBody;
import com.agriworkconnect.api.repositories.Driver1Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class Driver1Service {

  @Autowired
  private Driver1Repository driver1Repository;


  public Driver1 createDriver1(Driver1ReqBody driver1ReqBody) {
    System.out.println("Received Request to Create Driver: " + driver1ReqBody);

    Driver1 newDriver = new Driver1();
    newDriver.setLabourId(driver1ReqBody.getLabourId());
    newDriver.setLabourFirstName(driver1ReqBody.getLabourFirstName());
    newDriver.setLabourLastName(driver1ReqBody.getLabourLastName());
    newDriver.setAddress(driver1ReqBody.getAddress());
    newDriver.setPhoneNo(driver1ReqBody.getPhoneNo());
    newDriver.setExperience(driver1ReqBody.getExperience());
    newDriver.setGender(driver1ReqBody.getGender());

    Driver1 savedDriver = driver1Repository.save(newDriver);
    System.out.println("Saved Driver: " + savedDriver);

    return savedDriver;
  }


  public Driver1 updateDriver1(Driver1ReqBody driver1ReqBody) {
    Optional<Driver1> optionalDriver = driver1Repository.findById(driver1ReqBody.getLabourId());
    if (!optionalDriver.isPresent()) {
      throw new EntityNotFoundException("Driver with ID " + driver1ReqBody.getLabourId() + " not found.");
    }

    Driver1 existingDriver = optionalDriver.get();
    existingDriver.setLabourFirstName(driver1ReqBody.getLabourFirstName());
    existingDriver.setLabourLastName(driver1ReqBody.getLabourLastName());
    existingDriver.setAddress(driver1ReqBody.getAddress());
    existingDriver.setPhoneNo(driver1ReqBody.getPhoneNo());
    existingDriver.setExperience(driver1ReqBody.getExperience());
    existingDriver.setGender(driver1ReqBody.getGender());

    return driver1Repository.save(existingDriver);
  }

  public Page<Driver1> listAllDriver1FromDb(int pageNumber, int size) {
    Pageable pageable = PageRequest.of(pageNumber, size);
    return driver1Repository.listAllDriver1FromDb(pageable);
  }

  public String deleteDriver1(Driver1IdRequest driver1IdReq) {
    if (!driver1Repository.existsById(driver1IdReq.getLabourId())) {
      throw new EntityNotFoundException("Driver not found with ID: " + driver1IdReq.getLabourId());
    }
    driver1Repository.deleteById(driver1IdReq.getLabourId());
    return "Driver deleted successfully.";
  }


  public String countNumberOfDriver1() {
    return driver1Repository.countNumberOfDriver1();
  }
//
//
//  public Driver1 approveDriver1(int labourId) {
//    Optional<Driver1> optionalDriver1 = driver1Repository.findById(labourId);
//    if (!optionalDriver1.isPresent()) {
//      throw new EntityNotFoundException("Labour with ID " + labourId + " not found.");
//    }
//
//
//    Driver1 driver1 = optionalDriver1.get();
//    driver1.setDriver1Type("Approved");
//    return driver1Repository.save(driver1);
//  }

    public List<Driver1> listDriver1ByLabourId(int labourId) {
      return driver1Repository.findByLabourId(labourId);
    }


}
