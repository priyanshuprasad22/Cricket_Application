package com.example.cricketapp.demo.controllers;

import java.time.LocalDate;
import java.util.List;

import com.example.cricketapp.demo.model.Match;
import com.example.cricketapp.demo.model.Team;
import com.example.cricketapp.demo.repository.MatchRepository;
import com.example.cricketapp.demo.repository.TeamRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
public class TeamControllers {

    private TeamRepository teamRepository;
    private MatchRepository matchRepository;

    @Autowired
    public TeamControllers(TeamRepository teamRepository, MatchRepository matchRepository) {
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }



    @GetMapping("/team")
    public Iterable<Team> getAllTeam() {
        return teamRepository.findAll();
    }

    @GetMapping("/team/{teamName}")
    public Team getTeam(@PathVariable String teamName) {
        Team team=teamRepository.getByTeamName(teamName);
        team.setMatches(matchRepository.findLatestMatchesbyTeam(teamName,4));
        return team;
    }

    @GetMapping("/team/{teamName}/matches")
    public List<Match> getMatches(@PathVariable String teamName, @RequestParam String season){
        return matchRepository.getByTeam1AndSeasonOrTeam2AndSeason(teamName,season,teamName,season);
    }
}