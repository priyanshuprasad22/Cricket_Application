package com.example.cricketapp.demo.data;

import com.example.cricketapp.demo.model.Match;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.database.JdbcBatchItemWriter;
import org.springframework.batch.item.database.builder.JdbcBatchItemWriterBuilder;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.builder.FlatFileItemReaderBuilder;
import org.springframework.batch.item.file.mapping.BeanWrapperFieldSetMapper;
import org.springframework.batch.item.file.mapping.DefaultLineMapper;
import org.springframework.batch.item.file.transform.DelimitedLineTokenizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;

@Configuration
public class BatchConfig {

    private final String[] fields_name = new String[]{"id", "season", "city", "date", "match_type", "player_of_match", "venue",
            "team1", "team2", "toss_winner", "toss_decision", "winner",
            "result", "result_margin", "target_runs", "target_overs",
            "super_over", "method", "umpire1", "umpire2"};

    @Bean
    public FlatFileItemReader<MatchInputData> reader() {
        return new FlatFileItemReaderBuilder<MatchInputData>()
                .resource(new ClassPathResource("matchdata.csv"))
                .name("MatchDataReader")
                .linesToSkip(1)
                .delimited()
                .names(fields_name)
                .targetType(MatchInputData.class)
                .build();
    }


    @Bean
    public MatchDataProcessor processor() {
        return new MatchDataProcessor();
    }

    @Bean
    public JdbcBatchItemWriter<Match> writer(DataSource dataSource) {
        return new JdbcBatchItemWriterBuilder<Match>()
                .sql("INSERT INTO match (season, city, date, match_type, player_of_match, venue, team1, team2, " +
                        "toss_winner, toss_decision, match_winner, result, result_margin, target_runs, target_overs, " +
                        "super_over, method, umpire1, umpire2) " +
                        "VALUES (:season, :city, :date, :match_type, :playerOfMatch, :venue, :team1, :team2, " +
                        ":tossWinner, :tossDecision, :matchWinner, :result, :result_margin, :target_runs, :target_overs, " +
                        ":super_over, :method, :umpire1, :umpire2)")
                .dataSource(dataSource)
                .beanMapped()
                .build();
    }

    @Bean
    public PlatformTransactionManager transactionManager(DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

    @Bean
    public Job importUserJob(JobRepository jobRepository, Step step1, JobCompletionNotificationListener listener) {
        return new JobBuilder("importUserJob", jobRepository)
                .listener(listener)
                .start(step1)
                .build();
    }

    @Bean
    public Step step1(JobRepository jobRepository,PlatformTransactionManager dataSourceTransactionManager,
                      FlatFileItemReader<MatchInputData> reader, MatchDataProcessor processor, JdbcBatchItemWriter<Match> writer) {
        return new StepBuilder("step1", jobRepository)
                .<MatchInputData, Match>chunk(3,dataSourceTransactionManager)
                .reader(reader)
                .processor(processor)
                .writer(writer)
                .build();
    }

}
