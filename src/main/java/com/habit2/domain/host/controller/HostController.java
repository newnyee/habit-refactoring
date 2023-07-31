package com.habit2.domain.host.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequestMapping("/host")
public class HostController {

    @GetMapping("/joinform")
    public String joinForm () {
        return "pages/host/hostJoinForm";
    }
}
