package com.habit2.domain.host.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequestMapping("/host")
public class HostController {

    @GetMapping
    public String home() {
        return "pages/host/hostHome";
    }

    @GetMapping("/joinform")
    public String joinForm() {
        return "pages/host/hostJoinForm";
    }

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
    public String calculate () {
        return "pages/host/hostCalculate";
    }

    @GetMapping("/product/1")
    public String productDetails() {
        return "pages/host/hostProductDetails";
    }
}
