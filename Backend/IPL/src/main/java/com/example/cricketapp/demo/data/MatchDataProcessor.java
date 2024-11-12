package com.example.cricketapp.demo.data;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.example.cricketapp.demo.model.Match;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.batch.item.ItemProcessor;

public class MatchDataProcessor implements ItemProcessor<MatchInputData, Match> {
    private static final Logger log = LoggerFactory.getLogger(MatchDataProcessor.class);

    @Override
    public Match process(final MatchInputData matchInput) throws Exception {

        Match match = new Match();
        match.setId(matchInput.getId());
        match.setCity(matchInput.getCity());

        match.setDate(LocalDate.parse(matchInput.getDate()));

        match.setPlayerOfMatch(matchInput.getPlayer_of_match());
        match.setVenue(matchInput.getVenue());


        String firstInningsBat, secondInningsBat;

        if ("bat".equals(matchInput.getToss_decision())) {
            firstInningsBat = matchInput.getToss_winner();
            secondInningsBat = matchInput.getToss_winner().equals(matchInput.getTeam1())
                    ? matchInput.getTeam2() : matchInput.getTeam1();

        } else {
            secondInningsBat = matchInput.getToss_winner();
            firstInningsBat = matchInput.getToss_winner().equals(matchInput.getTeam1())
                    ? matchInput.getTeam2() : matchInput.getTeam1();
        }
        match.setTeam1(firstInningsBat);
        match.setTeam2(secondInningsBat);

        match.setTossWinner(matchInput.getToss_winner());
        match.setTossDecision(matchInput.getToss_decision());
        match.setMatchWinner(matchInput.getWinner());
        match.setResult(matchInput.getResult());
        match.setResult_margin(matchInput.getResult_margin());
        match.setUmpire1(matchInput.getUmpire1());
        match.setUmpire2(matchInput.getUmpire2());
        match.setTarget_overs(matchInput.getTarget_overs());
        match.setTarget_runs(matchInput.getTarget_runs());
        match.setMatch_type(matchInput.getMatch_type());
        match.setTarget_runs(matchInput.getTarget_runs());
        match.setTarget_overs(matchInput.getTarget_overs());
        match.setResult_margin(matchInput.getResult_margin());
        match.setSeason(matchInput.getSeason());
        match.setSuper_over(matchInput.getSuper_over());

        log.info("Created Match");
        return match;
    }
}
