package com.yourorg.leaderboard.domain.service;

import com.yourorg.leaderboard.port.out.LeaderBoardQueryPort; // Outbound Port
import com.yourorg.leaderboard.adapter.in.dto.LeaderBoardDto;
import com.yourorg.leaderboard.port.in.LeaderBoardPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LeaderBoardService implements LeaderBoardPort {
    private final LeaderBoardQueryPort leaderBoardQueryPort; // Repository 역할은 Port가 담당

    public List<LeaderBoardDto> getLeaderBoardsByTask(String task) {
        List<LeaderBoardDto> boards = leaderBoardQueryPort.loadLeaderBoardsByTask(task);
        return boards.stream()
            .map(lb -> new LeaderBoardDto(lb.getLoginId(), lb.getPsnrAvg(), task, lb.getRank()))
            .collect(Collectors.toList());
    }

    public List<LeaderBoardDto> getLeaderBoardByUser(String userId, String task) {
        List<LeaderBoardDto> boards = leaderBoardQueryPort.loadLeaderBoardsByTask(task);
        return boards.stream()
            .map(lb -> new LeaderBoardDto(lb.getLoginId(), lb.getPsnrAvg(), task, lb.getRank()))
            .collect(Collectors.toList());
    }
}
