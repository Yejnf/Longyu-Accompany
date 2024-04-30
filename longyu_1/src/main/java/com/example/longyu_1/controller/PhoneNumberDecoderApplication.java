package com.example.longyu_1.controller;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
@RestController
public class PhoneNumberDecoderApplication {
    public static void main(String[] args) {
        SpringApplication.run(com.example.longyu_1.controller.PhoneNumberDecoderApplication.class, args);
    }

    @PostMapping("/getPhoneNumber")
    public ResponseEntity<Map<String, String>> getPhoneNumber(@RequestBody Map<String, String> requestData) {
        String code = requestData.get("code");

        // 调用微信 API，使用 code 获取用户手机号码
        // 这里需要调用微信开放平台的接口或微信登录SDK来实现
        // 假设通过微信 API 获取到了用户手机号码
        String phoneNumber = "13859231505";

        // 构建响应数据
        Map<String, String> response = new HashMap<>();
        response.put("phoneNumber", phoneNumber);

        return ResponseEntity.ok(response);
    }

}
