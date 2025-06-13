package com.agriworkconnect.api.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.agriworkconnect.api.entity.Work;

import java.util.List;

@Repository
public interface WorkRepository extends CrudRepository<Work,Integer> {

	@Query(value = "SELECT count(*) from works", nativeQuery = true)
	String countNumberOfWorks();

	@Query(value = "select * from  works ", nativeQuery = true)
	Page<Work> listallworksfromdb(Pageable pageable);



  @Query(value = "SELECT * FROM works WHERE userId = :userId", nativeQuery = true)
  List<Work> findByUserId(@Param("userId") int userId);




}
