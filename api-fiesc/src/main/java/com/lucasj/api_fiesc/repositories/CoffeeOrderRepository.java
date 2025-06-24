package com.lucasj.api_fiesc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lucasj.api_fiesc.models.CoffeeOrder;

public interface CoffeeOrderRepository extends JpaRepository<CoffeeOrder, Long> {}
