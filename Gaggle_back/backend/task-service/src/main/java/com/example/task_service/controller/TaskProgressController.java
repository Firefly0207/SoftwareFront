package com.example.task_service.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class TaskProgressController {

    private final SimpMessagingTemplate messagingTemplate;

    // 테스트용: 특정 토큰에게 메시지 전송
    @PostMapping("/api/task/mock-progress")
    public void sendMockMessage(@RequestParam String token) {
        String message = "✅ This is a mock grading result for token: " + token;
        messagingTemplate.convertAndSend("/topic/result/" + token, message);
    }
}
