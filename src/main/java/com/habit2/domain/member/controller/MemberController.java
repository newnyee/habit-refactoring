package com.habit2.domain.member.controller;

import com.habit2.domain.host.dto.HostLoginDto;
import com.habit2.domain.host.service.HostService;
import com.habit2.domain.member.dto.RequestMemberJoinDto;
import com.habit2.domain.member.dto.RequestMemberLoginDto;
import com.habit2.domain.member.dto.ResponseMemberLoginDto;
import com.habit2.domain.member.service.MemberService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;
    private final HostService hostService;

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
            model.addAttribute("message", "회원가입에 실패했습니다.");
            return "pages/member/memberJoinForm";
        }
    }


    // 로그인
    @GetMapping("/login")
    public String loginForm(
            @ModelAttribute("loginDto")RequestMemberLoginDto loginDto,
            @RequestParam(required = false) String redirectURL,
            Model model
    ) {
        if (redirectURL != null) {
            model.addAttribute("loginMessage", "로그인 후 이용해 주세요.");
        }
        return "pages/member/login";
    }

    @PostMapping("/login")
    public String login(
            @Validated RequestMemberLoginDto requestMemberLoginDto,
            HttpSession session,
            Model model,
            @RequestParam(defaultValue = "/") String redirectURL) {

        // 회원 정보 조회
        ResponseMemberLoginDto loginDto = memberService.memberLogin(requestMemberLoginDto);

        // 로그인 성공 여부 확인
        if(loginDto != null) {

            // 세션에 정보를 저장
            session.setAttribute("s_id", loginDto.getMem_id()); // 아이디
            session.setAttribute("s_name", loginDto.getMem_name()); // 닉네임
            session.setAttribute("s_class", loginDto.getMem_class()); // 회원 구분

            if (loginDto.getMem_class().equals("H")) {
                HostLoginDto hostLoginDto = hostService.hostLogin(requestMemberLoginDto.getMem_id());
                session.setAttribute("s_hostName", hostLoginDto.getHost_name()); // 호스트 닉네임
                session.setAttribute("s_hostImg", hostLoginDto.getHost_img()); // 호스트 이미지
            }

            return "redirect:" + redirectURL;

        } else {
            model.addAttribute("redirectURL", redirectURL);
            model.addAttribute("error", "아이디 또는 비밀번호를 다시 입력해주세요");
            return "pages/member/login";
        }
    }

    // 로그아웃
    @GetMapping("/logout")
    public String logout(HttpSession session) {

        // 현재 세션을 무효화하여 모든 세션 정보를 삭제
        session.invalidate();

        // 홈으로 이동
        return "redirect:/";
    }
}
