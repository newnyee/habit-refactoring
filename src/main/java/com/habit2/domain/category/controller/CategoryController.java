package com.habit2.domain.category.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequestMapping("/category")
public class CategoryController {

    @GetMapping
    public String category () {
        return "pages/category/category";
    }
}
