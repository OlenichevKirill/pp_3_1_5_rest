package ru.kata.pp_3_1_5_rest.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.pp_3_1_5_rest.model.User;

@RestController
@RequestMapping("/user/api")
public class UserRestService {

    @GetMapping()
    public User getAuUser(@AuthenticationPrincipal User user){
        return user;
    }
}
