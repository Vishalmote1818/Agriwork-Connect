package com.agriworkconnect.api.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.agriworkconnect.api.entity.WorkAllocation;

import java.util.List;

@Repository
public interface WorkAllocationRepository extends CrudRepository<WorkAllocation, Integer> {

  @Query(value = "SELECT count(*) FROM work_allocations", nativeQuery = true)
  String countNumberOfWorkAllocations();

  @Query(value = "SELECT * FROM work_allocations", nativeQuery = true)
  Page<WorkAllocation> listAllWorkAllocationsFromDb(Pageable pageable);

  @Query(value = "SELECT * FROM work_allocations WHERE workAllocationId = :workAllocationId", nativeQuery = true)
  List<WorkAllocation> findByWorkAllocationId(@Param("workAllocationId") int workAllocationId);
}
