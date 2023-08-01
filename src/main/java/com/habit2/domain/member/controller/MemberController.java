package com.habit2.domain.member.controller;

import com.habit2.domain.member.dto.RequestMemberJoinDto;
import com.habit2.domain.member.dto.RequestMemberLoginDto;
import com.habit2.domain.member.model.Member;
import com.habit2.domain.member.service.MemberService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/mypage")
    public String myPage() {
        return "pages/member/myPage";
    }

    @GetMapping("/wishlist")
    public String wishList() {
        return "pages/wish/wishList";
    }


    // 회원가입
    @GetMapping("/join")
    public String joinForm() {
        return "pages/member/memberJoinForm";
    }

    @PostMapping("/join")
    public String join (RequestMemberJoinDto memberJoinDto) throws IOException {
        int result = memberService.memberJoin(memberJoinDto);

        if (result == 1) {
            return "redirect:/member/login";
        } else {
            return "redirect:/member/login"; // 리팩토링 필요
        }
    }


    // 로그인
    @GetMapping("/login")
    public String loginForm() {
        return "pages/member/login";
    }

    @PostMapping("/login")
    public String login(RequestMemberLoginDto memberLoginDto, HttpSession session, Model model) {

        // 회원 정보 조회
        RequestMemberLoginDto loginDto = memberService.memberLogin(memberLoginDto);

        // 로그인 성공 여부 확인
        if(loginDto != null) {
            String mem_id = loginDto.getMem_id();
            String mem_name = loginDto.getMem_name();

            // 세션에 정보를 저장
            session.setAttribute("s_id", mem_id); // 아이디
            session.setAttribute("s_name", mem_name); // 닉네임

            return "redirect:/";
        } else {
            model.addAttribute("error", "아이디 또는 비밀번호를 다시 입력해주세요");
            return "pages/member/login";
        }
    }

    // 로그아웃
    @GetMapping("/logout")
    public String logout(HttpSession session) {

        // 현재 세션을 무효화하여 모든 세션 정보를 삭제
        session.invalidate();

        // 로그인 페이지로 리다이렉트
        return "redirect:login";
    }
}
