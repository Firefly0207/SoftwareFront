package com.yourorg.user_info.adapter.in.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor // ✅ 기본 생성자도 추가
public class LoginResponsedto {
    private String token;
    private String userId;  // ✅ 추가
    private String teamId;  // ✅ 추가
}
