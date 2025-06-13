package com.agriworkconnect.api.repositories;

import com.agriworkconnect.api.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {

  Vehicle findByEmail(String email);

}
