package ru.kata.pp_3_1_5_rest.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.pp_3_1_5_rest.model.User;


@Controller
@RequestMapping()
public class UserController {

    @GetMapping("/user")
    public String userInfo(@AuthenticationPrincipal User user, Model model) {
        model.addAttribute("user", user);
        return "users/user";
    }

    @GetMapping("/admin")
    public String showAdminPage() {
        return "users/admin";
    }
}
