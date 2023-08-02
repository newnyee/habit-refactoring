package com.habit2.domain.member.controller;

import com.habit2.domain.member.dto.RequestMemberJoinDto;
import com.habit2.domain.member.dto.MemberLoginDto;
import com.habit2.domain.member.service.MemberService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

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
    public String join (RequestMemberJoinDto memberJoinDto, Model model) throws IOException {
        int result = memberService.memberJoin(memberJoinDto);

        if (result == 1) {
            return "redirect:/member/login";
        } else {
            model.addAttribute("errorMessage", "회원가입에 실패했습니다.");
            return "pages/member/memberJoinForm";
        }
    }


    // 로그인
    @GetMapping("/login")
    public String loginForm() {
        return "pages/member/login";
    }

    @PostMapping("/login")
    public String login(MemberLoginDto memberLoginDto, HttpSession session, Model model) {

        // 회원 정보 조회
        MemberLoginDto loginDto = memberService.memberLogin(memberLoginDto);

        // 로그인 성공 여부 확인
        if(loginDto != null) {

            // 세션에 정보를 저장
            session.setAttribute("s_id", loginDto.getMem_id()); // 아이디
            session.setAttribute("s_name", loginDto.getMem_name()); // 닉네임
            session.setAttribute("s_class", loginDto.getMem_class()); // 회원 구분

            return "redirect:/";
        } else {
            model.addAttribute("error", "아이디 또는 비밀번호를 다시 입력해주세요");
            return "pages/member/login";
        }
    }

    // 로그아웃
    @GetMapping("/logout")
    public String logout(HttpSession session, Model model) {

        // 현재 세션을 무효화하여 모든 세션 정보를 삭제
        session.invalidate();
        model.addAttribute("errorMessage", "로그아웃 되었습니다.");

        // 홈으로 이동
        return "pages/intro";
    }
}
