package com.example.cricketapp.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;

@Entity
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String season;
    private String city;
    private LocalDate date;
    private String match_type;
    private String playerOfMatch;
    private String venue;
    private String team1;
    private String team2;
    private String tossWinner;
    private String tossDecision;
    private String matchWinner;
    private String result;
    private String result_margin;
    private String target_runs;
    private String target_overs;
    private String super_over;
    private String method;
    private String umpire1;
    private String umpire2;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getMatch_type() {
        return match_type;
    }

    public void setMatch_type(String match_type) {
        this.match_type = match_type;
    }

    public String getPlayerOfMatch() {
        return playerOfMatch;
    }

    public void setPlayerOfMatch(String playerOfMatch) {
        this.playerOfMatch = playerOfMatch;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public String getTeam1() {
        return team1;
    }

    public void setTeam1(String team1) {
        this.team1 = team1;
    }

    public String getTeam2() {
        return team2;
    }

    public void setTeam2(String team2) {
        this.team2 = team2;
    }

    public String getTossWinner() {
        return tossWinner;
    }

    public void setTossWinner(String tossWinner) {
        this.tossWinner = tossWinner;
    }

    public String getTossDecision() {
        return tossDecision;
    }

    public void setTossDecision(String tossDecision) {
        this.tossDecision = tossDecision;
    }

    public String getMatchWinner() {
        return matchWinner;
    }

    public void setMatchWinner(String matchWinner) {
        this.matchWinner = matchWinner;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getResult_margin() {
        return result_margin;
    }

    public void setResult_margin(String result_margin) {
        this.result_margin = result_margin;
    }

    public String getTarget_runs() {
        return target_runs;
    }

    public void setTarget_runs(String target_runs) {
        this.target_runs = target_runs;
    }

    public String getTarget_overs() {
        return target_overs;
    }

    public void setTarget_overs(String target_overs) {
        this.target_overs = target_overs;
    }

    public String getSuper_over() {
        return super_over;
    }

    public void setSuper_over(String super_over) {
        this.super_over = super_over;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getUmpire1() {
        return umpire1;
    }

    public void setUmpire1(String umpire1) {
        this.umpire1 = umpire1;
    }

    public String getUmpire2() {
        return umpire2;
    }

    public void setUmpire2(String umpire2) {
        this.umpire2 = umpire2;
    }

    @Override
    public String toString() {
        return "Match{" +
                "id=" + id +
                ", season='" + season + '\'' +
                ", city='" + city + '\'' +
                ", date='" + date + '\'' +
                ", match_type='" + match_type + '\'' +
                ", playerOfMatch='" + playerOfMatch + '\'' +
                ", venue='" + venue + '\'' +
                ", team1='" + team1 + '\'' +
                ", team2='" + team2 + '\'' +
                ", tossWinner='" + tossWinner + '\'' +
                ", tossDecision='" + tossDecision + '\'' +
                ", matchWinner='" + matchWinner + '\'' +
                ", result='" + result + '\'' +
                ", result_margin='" + result_margin + '\'' +
                ", target_runs='" + target_runs + '\'' +
                ", target_overs='" + target_overs + '\'' +
                ", super_over='" + super_over + '\'' +
                ", method='" + method + '\'' +
                ", umpire1='" + umpire1 + '\'' +
                ", umpire2='" + umpire2 + '\'' +
                '}';
    }
}
