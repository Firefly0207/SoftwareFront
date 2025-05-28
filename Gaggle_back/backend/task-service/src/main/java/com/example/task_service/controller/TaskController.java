package com.example.task_service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/task")
public class TaskController {

    @PostMapping("/start")
    public ResponseEntity<String> startTask() {
        return ResponseEntity.ok("✅ Task started successfully.");
    }
}
