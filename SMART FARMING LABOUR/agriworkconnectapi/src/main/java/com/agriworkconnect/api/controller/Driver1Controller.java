package com.agriworkconnect.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.agriworkconnect.api.model.Driver1ReqBody;
import com.agriworkconnect.api.model.Driver1IdRequest;
import com.agriworkconnect.api.service.Driver1Service;

@CrossOrigin(origins = "*") // Temporarily allow all origins
@RestController
public class Driver1Controller {

  @Autowired
  private Driver1Service driver1Service;

  @PostMapping("/createDriver1")
  public ResponseEntity<?> createDriver1(@RequestBody Driver1ReqBody driver1ReqBody) throws Exception {
    return ResponseEntity.ok(driver1Service.createDriver1(driver1ReqBody));
  }


  @RequestMapping(value = "/updateDriver1", method = RequestMethod.PUT)
  public ResponseEntity<?> updateDriver1(@RequestBody Driver1ReqBody driver1ReqBody) throws Exception {
    return ResponseEntity.ok(driver1Service.updateDriver1(driver1ReqBody));
  }

  @RequestMapping(value = "/listAllDriver1", method = RequestMethod.GET)
  public ResponseEntity<?> listAllDrivers1(@RequestParam(defaultValue = "0") final Integer pageNumber,
                                           @RequestParam(defaultValue = "10") final Integer size) throws Exception {
    return ResponseEntity.ok(driver1Service.listAllDriver1FromDb(pageNumber, size));
  }

  @RequestMapping(value = "/deleteDriver1", method = RequestMethod.DELETE)
  public ResponseEntity<?> deleteDriver1(@RequestBody Driver1IdRequest driver1IdRequest) throws Exception {
    return ResponseEntity.ok(driver1Service.deleteDriver1(driver1IdRequest));
  }

  @RequestMapping(value = "/driver1count", method = RequestMethod.GET)
  public ResponseEntity<?> countNumberOfDrivers1() throws Exception {
    return ResponseEntity.ok(driver1Service.countNumberOfDriver1());
  }

//  @PutMapping("/admin/approveDriver1/{driver1Id}")
//  public ResponseEntity<Driver1> approveDriver1(@PathVariable int driver1Id) {
//    Driver1 driver1 = driver1Service.approveDriver1(driver1Id);
//    return ResponseEntity.ok(driver1);
//  }


@RequestMapping(value = "/listUserDriver1", method = RequestMethod.GET)
public ResponseEntity<?> listUserDriver1(@RequestParam int labourId) {
  return ResponseEntity.ok(driver1Service.listDriver1ByLabourId(labourId));
}

}
