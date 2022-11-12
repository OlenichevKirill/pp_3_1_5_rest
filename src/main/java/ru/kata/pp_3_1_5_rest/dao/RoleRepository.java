package ru.kata.pp_3_1_5_rest.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import ru.kata.pp_3_1_5_rest.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
