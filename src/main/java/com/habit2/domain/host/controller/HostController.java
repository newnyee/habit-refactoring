package com.habit2.domain.host.controller;

import com.habit2.domain.host.dto.*;
import com.habit2.domain.host.model.CategoryEntity;
import com.habit2.domain.host.service.HostService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/host")
public class HostController {

    private final HostService hostService;

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
    public String joinForm(HttpSession session, RedirectAttributes redirectAttributes, Model model) {

        if (session.getAttribute("s_class") == null) { // 세션 기록이 없는 경우
            redirectAttributes.addAttribute("loginMessage", true);
            redirectAttributes.addAttribute("redirectURL", "/host/join");
            return "redirect:/member/login";

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
            HostLoginDto loginDto = hostService.hostLogin(mem_id);
            session.setAttribute("s_hostName", loginDto.getHost_name()); // 호스트 닉네임
            session.setAttribute("s_hostImg", loginDto.getHost_img()); // 호스트 이미지
            session.setAttribute("s_class", "H"); // 회원 구분
            return "redirect:/host";

        } else {
            model.addAttribute("message", "회원가입에 실패했습니다.");
            return "pages/host/hostJoinForm";
        }
    }


    // 호스트 홈 (로그인) - 미완성
    @GetMapping
    public String home(
            @SessionAttribute(name = "s_id", required = false) String mem_id,
            @SessionAttribute(name = "s_class", required = false) String mem_class,
            RedirectAttributes redirectAttributes,
            Model model,
            HttpSession session
    ) {

        if (session.getAttribute("s_class") == null) {
            redirectAttributes.addAttribute("loginMessage", true);
            redirectAttributes.addAttribute("redirectURL", "/host");
            return "redirect:/member/login";

        } else if (mem_class.equals("H")) { // 호스트일 때
            return "pages/host/hostHome";

        } else { // 일반회원일 때
            model.addAttribute("message", "호스트 가입 후 이용 가능합니다.");
            return "pages/host/hostJoinForm";
        }

    }


    // 호스트 로그아웃
    @GetMapping("/logout")
    public String logout() {
        return "redirect:/member/logout";
    }


    // 호스트 정보 수정
    @GetMapping("/info")
    public String updateInfo(
            @SessionAttribute(name = "s_id", required = false) String mem_id,
            RedirectAttributes redirectAttributes,
            Model model
    ) {

        HostInfoDto hostInfoDto = hostService.getHostInfo(mem_id);

        if (hostInfoDto != null) {
            model.addAttribute("hostInfoDto", hostInfoDto);
            log.debug("hostInfoDto Value={}", hostInfoDto);

            return "pages/host/hostInfo";

        } else {
            redirectAttributes.addAttribute("loginMessage", true);
            redirectAttributes.addAttribute("redirectURL", "/host/info");
            return "redirect:/member/login";
        }
    }

    @PostMapping("/info")
    public String updateInfoProcess(
            @SessionAttribute(name = "s_id", required = false) String mem_id,
            HostInfoDto hostInfoDto,
            Model model
    ) throws IOException {
        log.debug("host update info={}", hostInfoDto);
        hostInfoDto.setHost_id(mem_id);

        int result = hostService.updateHostInfo(hostInfoDto);
        log.debug("compare objects={}", result);

        HostInfoDto newHostInfoDto = hostService.getHostInfo(mem_id);
        model.addAttribute("hostInfoDto", newHostInfoDto);

        if (result == 1) {
            model.addAttribute("message", "호스트 정보가 수정되었습니다.");
        } else {
            model.addAttribute("message", "호스트 정보 수정에 실패하였습니다. 다시 시도해주세요.");
        }

        return "pages/host/hostInfo";
    }


    // 상품 등록
    @GetMapping("/product/create")
    public String createProduct(
            HttpSession session,
            RedirectAttributes redirectAttributes,
            Model model,
            @SessionAttribute(name = "s_class", required = false) String mem_class
    ) {

        if (session.getAttribute("s_class") == null) {
            redirectAttributes.addAttribute("loginMessage", true);
            redirectAttributes.addAttribute("redirectURL", "/host/product/create");
            return "redirect:/member/login";

        } else if (mem_class.equals("H")) { // 호스트일 때
            List<CategoryEntity> largeCategoryList = hostService.getLargeCategoryList();
            model.addAttribute("largeCategoryList", largeCategoryList);
            return "pages/host/hostProductCreate";

        } else { // 일반회원일 때
            model.addAttribute("message", "호스트 가입 후 이용 가능합니다.");
            return "pages/host/hostJoinForm";
        }
    }

    @PostMapping("/product/create")
    public String createProductProcess(
            @SessionAttribute(name = "s_id", required = false) String mem_id,
            RequestProductInfoDto productInfoDto,
            RedirectAttributes redirectAttributes,
            Model model
    ) throws IOException {

        productInfoDto.setHost_id(mem_id);
        log.debug("product ino dto={}", productInfoDto);
        int result = hostService.createProduct(productInfoDto);

        if (result > 0) {
            redirectAttributes.addAttribute("successCreateProductMessage", true);
            return "redirect:/host/product/list";

        } else {
            model.addAttribute("message", "해빗 등록에 실패하였습니다.");
            return "pages/host/hostProductCreate";
        }
    }


    // 상품 리스트
    @GetMapping("/product/list")
    public String productList(@SessionAttribute(name = "s_id", required = false) String mem_id, Model model) {

        RequestProductListDto productListDto = new RequestProductListDto();
        productListDto.setHost_id(mem_id);
        List<ResponseProductListDTO> list = hostService.productList(productListDto);
        hostService.productListCount(productListDto);

        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedNow = now.format(formatter);

        model.addAttribute("now", formattedNow);
        model.addAttribute("vo", productListDto.getVo());
        model.addAttribute("list", list);

        return "pages/host/hostProductList";
    }


    // 상품 삭제
    @GetMapping("/product/delete/{prod_no}")
    public String productDelete(
            @PathVariable int prod_no,
            @SessionAttribute(name = "s_id", required = false) String mem_id,
            Model model
    ) {

        if (hostService.deleteProduct(prod_no) == 1) {
            model.addAttribute("message", "해빗이 삭제되었습니다.");
            return productList(mem_id, model);
        } else {
            model.addAttribute("message", "해빗 삭제에 실패했습니다. 다시 시도해주세요.");
            return productList(mem_id, model);
        }
    }
}
