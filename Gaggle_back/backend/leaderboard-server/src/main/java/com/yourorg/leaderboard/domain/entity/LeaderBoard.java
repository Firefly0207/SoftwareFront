package com.yourorg.leaderboard.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@Setter
@Getter
@Document(collection = "comparision_results")
public class LeaderBoard {
    @Id
    private String userId;
    @Indexed(unique = true)
    private String loginId;
    private Double psnrAvg;
    private Double ssimAvg;
    private String task;
    private Long rank;
    private String days;
}
