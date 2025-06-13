package com.agriworkconnect.api.controller;

import com.agriworkconnect.api.entity.Work;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.agriworkconnect.api.model.WorkReqBody;
import com.agriworkconnect.api.model.WorkIdRequest;
import com.agriworkconnect.api.service.WorkService;

@RestController
@CrossOrigin(origins = "*")
public class WorkController {

	@Autowired
	private WorkService workService;

	@RequestMapping(value = "/createWork", method = RequestMethod.POST)
	public ResponseEntity<?> createWork(@RequestBody WorkReqBody workReqBody) throws Exception {
		return ResponseEntity.ok(workService.createWork(workReqBody));
	}

	@RequestMapping(value = "/updateWork", method = RequestMethod.PUT)
	public ResponseEntity<?> updateWork(@RequestBody WorkReqBody workReqBody) throws Exception {
		return ResponseEntity.ok(workService.updateWork(workReqBody));
	}

	@RequestMapping(value = "/listAllWorks", method = RequestMethod.GET)
	public ResponseEntity<?> listAllWorks(@RequestParam(defaultValue = "0") final Integer pageNumber,
			@RequestParam(defaultValue = "10") final Integer size) throws Exception {
		return ResponseEntity.ok(workService.listallworksfromdb(pageNumber, size));
	}

	@RequestMapping(value = "/deleteWork", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteWork(@RequestBody WorkIdRequest workIdRequest) throws Exception {
		return ResponseEntity.ok(workService.deleteWork(workIdRequest));
	}
	@RequestMapping(value = "/workscount", method = RequestMethod.GET)
	public ResponseEntity<?> countNumberOfWorks() throws Exception {
		return ResponseEntity.ok((workService.countNumberOfWorks()));
	}

	@PutMapping("/admin/approve/{workId}")
	public ResponseEntity<Work> approveParcel(@PathVariable int workId) {
		Work work = workService.approveWork(workId);
		return ResponseEntity.ok(work);
	}



  @RequestMapping(value = "/listUserWorks", method = RequestMethod.GET)
  public ResponseEntity<?> listUserWorks(@RequestParam int userId) {
    return ResponseEntity.ok(workService.listUserWorks(userId));
  }



}
