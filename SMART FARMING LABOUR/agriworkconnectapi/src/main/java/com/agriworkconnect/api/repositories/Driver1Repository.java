package com.agriworkconnect.api.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.agriworkconnect.api.entity.Driver1;

import java.util.List;

@Repository
public interface Driver1Repository extends CrudRepository<Driver1, Integer> {

  @Query(value = "SELECT count(*) from driver1", nativeQuery = true)
  String countNumberOfDriver1();

  @Query(value = "SELECT * FROM driver1 ORDER BY labourId ASC", nativeQuery = true)
  Page<Driver1> listAllDriver1FromDb(Pageable pageable);


  @Query(value = "SELECT * FROM driver1 WHERE labourId = :labourId", nativeQuery = true)
  List<Driver1> findByLabourId(@Param("labourId") int labourId);


  @Modifying
  @Query(value = "DELETE FROM driver1 WHERE labourId = :labourId", nativeQuery = true)
  void deleteDriver1(@Param("labourId") int labourId);

}

