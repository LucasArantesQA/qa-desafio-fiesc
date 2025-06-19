package com.lucasj.api_fiesc.service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.lucasj.api_fiesc.model.User;
import com.lucasj.api_fiesc.repository.UserRepository;

@Service
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);
    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(String name, String email, String password, String role) {
         if (!(role.equalsIgnoreCase("ADMIN") || role.equalsIgnoreCase("CLIENT"))) {
            throw new IllegalArgumentException("Role must be either ADMIN or CLIENT");
        }

        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()){
              throw new IllegalArgumentException("Email is already registered");
        }

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);
        user.setRole(role.toUpperCase().trim());
        return userRepository.save(user);
    }

      public Optional<User> authenticateUser(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() ) {
            return user;
        }
        return Optional.empty();
    }

}
