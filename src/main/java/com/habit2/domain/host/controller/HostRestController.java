package com.habit2.domain.host.controller;

import com.habit2.domain.host.dto.RequestProductListDto;
import com.habit2.domain.host.dto.ResponseProductListDTO;
import com.habit2.domain.host.model.CategoryEntity;
import com.habit2.domain.host.service.HostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/host")
@RequiredArgsConstructor
public class HostRestController {

    private final HostService hostService;

    // 대분류에따른 중분류 가져오기
    @GetMapping("/product/category/{large}")
    public List<CategoryEntity> getMiddleCategoryList (@PathVariable String large) {
        return hostService.getMiddleCategoryList(large);
    }

    // 상품 리스트
    @PostMapping("/product/list")
    public Map<String, Object> productList(
            @SessionAttribute(name = "s_id", required = false) String mem_id,
            @RequestBody RequestProductListDto productListDto
    ) {
        productListDto.setHost_id(mem_id);

        log.debug("product list dto ={}", productListDto);

        List<ResponseProductListDTO> list = hostService.productList(productListDto);
        hostService.productListCount(productListDto);

        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedNow = now.format(formatter);

        Map<String, Object> map = new HashMap<>();
        map.put("now", formattedNow);
        map.put("vo", productListDto.getVo());
        map.put("list", list);

        return map;
    }

    // 상품 리스트(더보기)
    @PostMapping("/product/list/seemore")
    public Map<String, Object> contentList (@SessionAttribute(name = "s_id") String mem_id, @RequestBody RequestProductListDto productListDto) {

        productListDto.getVo().setClick(productListDto.getClick());
        productListDto.setHost_id(mem_id);

        List<ResponseProductListDTO> list = hostService.productList(productListDto);
        hostService.productListCount(productListDto);

        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedNow = now.format(formatter);

        Map<String, Object> map = new HashMap<>();
        map.put("now", formattedNow);
        map.put("vo", productListDto.getVo());
        map.put("list", list);

        return map;
    }
}
