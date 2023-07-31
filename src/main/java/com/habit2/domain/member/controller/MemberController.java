package com.habit2.domain.member.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequestMapping("/member")
public class MemberController {

    @GetMapping("/joinform")
    public String joinForm () {
        return "pages/member/memberJoinForm";
    }

    @GetMapping("/login")
    public String login () {
        return "pages/member/login";
    }

    @GetMapping("/mypage")
    public String myPage () {
        return "pages/member/myPage";
    }

    @GetMapping("/wishlist")
    public String wishList () {
        return "pages/wish/wishList";
    }
}
