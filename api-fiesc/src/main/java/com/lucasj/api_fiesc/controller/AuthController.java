package com.lucasj.api_fiesc.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lucasj.api_fiesc.model.User;
import com.lucasj.api_fiesc.service.AuthService;



@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")

public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
         try {
            authService.registerUser(user.getName(), user.getEmail(), user.getPassword(), user.getRole());
            return ResponseEntity.ok(Map.of("message", "Sucess."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Error"));
        }
    }
    

}
