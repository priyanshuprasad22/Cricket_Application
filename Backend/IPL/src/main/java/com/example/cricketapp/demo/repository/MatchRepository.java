package com.example.cricketapp.demo.repository;

import com.example.cricketapp.demo.model.Match;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cglib.core.Local;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
@Qualifier("hsqldbEntityManagerFactory")
public interface MatchRepository extends CrudRepository<Match, Integer> {

    List<Match> getByTeam1OrTeam2OrderByDateDesc(String teamName1, String teamName2, Pageable pageable);
//    List<Match> getByTeam1AndDateBetweenOrTeam2AndDateBetweenOrderByDateDesc(
//            String teamName1, LocalDate date1,LocalDate date2,
//            String teamName2, LocalDate date3,LocalDate date4
//    );

    List<Match> getByTeam1AndSeasonOrTeam2AndSeason(String teamName1,String season1,String teamName2,String season2);
    default List<Match> findLatestMatchesbyTeam(String teamName, int count) {
        return getByTeam1OrTeam2OrderByDateDesc(teamName, teamName, PageRequest.of(0, count));
    }
}
