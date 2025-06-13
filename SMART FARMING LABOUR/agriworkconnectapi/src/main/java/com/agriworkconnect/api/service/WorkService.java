package com.agriworkconnect.api.service;

import com.agriworkconnect.api.entity.Work;
import com.agriworkconnect.api.model.WorkIdRequest;
import com.agriworkconnect.api.model.WorkReqBody;
import com.agriworkconnect.api.repositories.WorkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class WorkService {

	@Autowired
	private WorkRepository workRepository;

	@Autowired
	private EmailService emailService;

	public Work createWork(WorkReqBody workReqBody) {
		Work newWork = new Work();
		newWork.setWorkId(workReqBody.getWorkId());
		newWork.setUserId(workReqBody.getUserId());
		newWork.setFirstName(workReqBody.getFirstName());
		newWork.setLastName(workReqBody.getLastName());
		newWork.setPhoneNo(workReqBody.getPhoneNo());
		newWork.setWorkAddress(workReqBody.getWorkAddress());
		newWork.setWorkDay(workReqBody.getWorkDay());
		newWork.setWorkDate(workReqBody.getWorkDate());
		newWork.setWorkTime(workReqBody.getWorkTime());
		newWork.setNoOfWorkers(workReqBody.getNoOfWorkers());
		newWork.setWorkType(workReqBody.getWorkType());
		newWork.setWorkerGender(workReqBody.getWorkerGender());

		emailService.sendEmail(
				"piyushoa2004@gmail.com",
				"work Created Successfully",
				String.format(
						"Hi %s, your work has been created successfully with Parcel ID %s",
						workReqBody.getFirstName(),
						workReqBody.getWorkId()
				)
		);

		return workRepository.save(newWork);
	}

	public Work updateWork(WorkReqBody workReqBody) {
		Optional<Work> optionalWork = workRepository.findById(workReqBody.getWorkId());
		if (!optionalWork.isPresent()) {
			throw new EntityNotFoundException("work with ID " + workReqBody.getWorkId() + " not found.");
		}

		Work existingWork = optionalWork.get();
		existingWork.setUserId(workReqBody.getUserId());
		existingWork.setFirstName(workReqBody.getFirstName());
		existingWork.setLastName(workReqBody.getLastName());
		existingWork.setWorkAddress(workReqBody.getWorkAddress());
		existingWork.setPhoneNo(workReqBody.getPhoneNo());
		existingWork.setWorkDay(workReqBody.getWorkDay());
		existingWork.setWorkDate(workReqBody.getWorkDate());
		existingWork.setWorkTime(workReqBody.getWorkTime());
		existingWork.setNoOfWorkers(workReqBody.getNoOfWorkers());
		existingWork.setWorkType(workReqBody.getWorkType());
		existingWork.setWorkerGender(workReqBody.getWorkerGender());

		emailService.sendEmail(
				"piyushoa2004@gmail.com",
				"Parcel Updated Successfully",
				String.format(
						"Hi %s, your parcel status has been updated successfully.",
						workReqBody.getFirstName()
				)
		);

		return workRepository.save(existingWork);
	}

	public Page<Work> listallworksfromdb(int pageNumber, int size) {
		Pageable pageable = PageRequest.of(pageNumber, size);
		return workRepository.listallworksfromdb(pageable);
	}

	public String deleteWork(WorkIdRequest workIdReq) {
		int workId = workIdReq.getWorkId();
		workRepository.deleteById(workId);
		return "Record Deleted";
	}

	public String countNumberOfWorks() {
		return workRepository.countNumberOfWorks();
	}

	public Work approveWork(int workId) {
		Optional<Work> optionalWork = workRepository.findById(workId);
		if (!optionalWork.isPresent()) {
			throw new EntityNotFoundException("work with ID " + workId + " not found.");
		}


		Work work = optionalWork.get();
		work.setWorkType("Approved");
		return workRepository.save(work);
	}


  public List<Work> listUserWorks(int userId) {
    return workRepository.findByUserId(userId);
  }




}
