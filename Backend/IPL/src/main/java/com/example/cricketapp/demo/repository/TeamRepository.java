package com.example.cricketapp.demo.repository;

import com.example.cricketapp.demo.model.Team;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Qualifier("hsqldbEntityManagerFactory")
public interface TeamRepository extends JpaRepository<Team, Long> {

    Team getByTeamName(String teamName);


}
