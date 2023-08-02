package com.habit2.domain.host.controller;

import com.habit2.domain.host.dto.HostLoginDto;
import com.habit2.domain.host.dto.RequestHostJoinDto;
import com.habit2.domain.host.service.HostService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

import java.io.IOException;
import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/host")
public class HostController {

    private final HostService hostService;

    @GetMapping("/info")
    public String info() {
        return "pages/host/hostInfo";
    }

    @GetMapping("/product/create")
    public String productCreate() {
        return "pages/host/hostProductCreate";
    }

    @GetMapping("/product/list")
    public String productList() {
        return "pages/host/hostProductList";
    }

    @GetMapping("/sales")
    public String sales() {
        return "pages/host/hostSales";
    }

    @GetMapping("/reservation")
    public String reservation() {
        return "pages/host/hostReservation";
    }

    @GetMapping("/question")
    public String question() {
        return "pages/host/hostQuestion";
    }

    @GetMapping("/review")
    public String review() {
        return "pages/host/hostReview";
    }

    @GetMapping("/calculate")
    public String calculate() {
        return "pages/host/hostCalculate";
    }

    @GetMapping("/product/1")
    public String productDetails() {
        return "pages/host/hostProductDetails";
    }


    // 호스트 회원가입
    @GetMapping("/join")
    public String joinForm(HttpSession session, Model model) {

        if (session.getAttribute("s_class") == null) { // 회원이 아닌경우
            model.addAttribute("errorMessage", "로그인 후 이용가능합니다.");
            return "pages/member/login";
        } else if (session.getAttribute("s_class").equals("M")) { // 회원인 경우
            return "pages/host/hostJoinForm";
        } else { // 호스트인경우
            return "redirect:/host";
        }
    }

    @PostMapping("/join")
    public String join(
            RequestHostJoinDto hostJoinDto,
            @SessionAttribute(name = "s_id", required = false) String mem_id,
            HttpSession session,
            Model model
    ) throws IOException {

        hostJoinDto.setMem_id(mem_id);

        if (hostService.hostJoin(hostJoinDto) == 1) {
            session.setAttribute("s_class", "H");
            return "redirect:/host";
        } else {
            model.addAttribute("errorMessage", "회원가입에 실패했습니다.");
            return "pages/host/hostJoinForm";
        }
    }


    // 호스트 홈 (로그인) - 미완성
    @GetMapping
    public String home(
            @SessionAttribute(name = "s_id", required = false) String mem_id,
            @SessionAttribute(name = "s_class", required = false) String mem_class,
            Model model,
            HttpSession session
    ) {

        if (mem_class.equals("H")) { // 호스트일 때

            HostLoginDto loginDto = hostService.hostLogin(mem_id);

            session.setAttribute("s_hostName", loginDto.getHost_name());
            session.setAttribute("s_hostImg", loginDto.getHost_img());
            return "pages/host/hostHome";

        } else { // 일반회원일 때
            model.addAttribute("errorMessage", "호스트 가입 후 이용 가능합니다.");
            return "pages/host/hostJoinForm";
        }

    }

    // 호스트 로그아웃
    @GetMapping("/logout")
    public String logout() {
        return "redirect:/member/logout";
    }
}
