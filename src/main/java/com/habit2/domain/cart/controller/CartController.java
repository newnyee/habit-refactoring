package com.habit2.domain.cart.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Slf4j
@Controller
public class CartController {

    @GetMapping("/cartlist")
    public String cartList () {
        return "pages/cart/cartList";
    }
}
