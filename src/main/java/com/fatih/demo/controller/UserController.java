package com.fatih.demo.controller;

import com.fatih.demo.model.User;
import com.fatih.demo.model.UserLoginRequest;
import com.fatih.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @PostMapping("/userLogin")
    public Integer getUserId(@RequestBody UserLoginRequest userLoginRequest){
        User user = userRepository.findByEmailAndPassword(userLoginRequest.getEmail(), userLoginRequest.getPassword());
        return user != null ? user.getUser_id() : 0;
    }

    @GetMapping("/user/{email}")
    public Integer getUser(@PathVariable String email)
    {
        User user= userRepository.findByEmail(email);
        return user != null ? user.getUser_id() : 0;
    }

    @PostMapping("/user")
    ResponseEntity<User> createLists(@RequestBody User user) throws URISyntaxException
    {
        User result= userRepository.save(user);
        return ResponseEntity.created(new URI("/api/user"+result.getUser_id())).body(result);
    }
}
