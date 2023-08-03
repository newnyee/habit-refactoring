package com.habit2.domain.host.controller;

import com.habit2.domain.host.model.CategoryEntity;
import com.habit2.domain.host.service.HostService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/host")
public class HostRestController {

    private final HostService hostService;

    @GetMapping("/product/category/{large}")
    public List<CategoryEntity> getMiddleCategoryList (@PathVariable String large) {
        return hostService.getMiddleCategoryList(large);
    }

}
