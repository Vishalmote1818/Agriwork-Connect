package com.agriworkconnect.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.agriworkconnect.api.model.WorkAllocationReqBody;
import com.agriworkconnect.api.model.WorkAllocationIdRequest;
import com.agriworkconnect.api.service.WorkAllocationService;

@CrossOrigin(origins = "*") // Allow all origins
@RestController
public class WorkAllocationController {

  @Autowired
  private WorkAllocationService workAllocationService;

  @PostMapping(value = "/createWorkAllocation")
  public ResponseEntity<?> createWorkAllocation(@RequestBody WorkAllocationReqBody workAllocationReqBody) throws Exception {
    return ResponseEntity.ok(workAllocationService.createWorkAllocation(workAllocationReqBody));
  }

  @RequestMapping(value = "/updateWorkAllocation", method = RequestMethod.PUT)
  public ResponseEntity<?> updateWorkAllocation(@RequestBody WorkAllocationReqBody workAllocationReqBody) throws Exception {
    return ResponseEntity.ok(workAllocationService.updateWorkAllocation(workAllocationReqBody));
  }

  @RequestMapping(value = "/listAllWorkAllocations", method = RequestMethod.GET)
  public ResponseEntity<?> listAllWorkAllocations(@RequestParam(defaultValue = "0") final Integer pageNumber,
                                                  @RequestParam(defaultValue = "10") final Integer size) throws Exception {
    return ResponseEntity.ok(workAllocationService.listAllWorkAllocationsFromDb(pageNumber, size));
  }

  @RequestMapping(value = "/deleteWorkAllocation", method = RequestMethod.DELETE)
  public ResponseEntity<?> deleteWorkAllocation(@RequestBody WorkAllocationIdRequest workAllocationIdRequest) throws Exception {
    return ResponseEntity.ok(workAllocationService.deleteWorkAllocation(workAllocationIdRequest));
  }

  @RequestMapping(value = "/workAllocationsCount", method = RequestMethod.GET)
  public ResponseEntity<?> countNumberOfWorkAllocations() throws Exception {
    return ResponseEntity.ok((workAllocationService.countNumberOfWorkAllocations()));
  }


  @RequestMapping(value = "/listWorkAllocationsById", method = RequestMethod.GET)
  public ResponseEntity<?> listWorkAllocationsById(@RequestParam int workAllocationId) {
    return ResponseEntity.ok(workAllocationService.listWorkAllocationsByWorkAllocationId(workAllocationId));
  }
}
