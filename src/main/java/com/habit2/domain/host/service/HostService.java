package com.habit2.domain.host.service;

import com.habit2.domain.host.dto.*;
import com.habit2.domain.host.model.CategoryEntity;

import java.io.IOException;
import java.util.List;

public interface HostService {

    int hostJoin(RequestHostJoinDto requestHostJoinDto) throws IOException;

    HostLoginDto hostLogin(String id);

    HostInfoDto getHostInfo(String id);

    int updateHostInfo(HostInfoDto hostInfoDto) throws IOException;

    List<CategoryEntity> getLargeCategoryList();

    List<CategoryEntity> getMiddleCategoryList(String cate_large);

    int createProduct(RequestProductInfoDto requestProductInfoDto) throws IOException;

    List<ResponseProductListDTO> productList(RequestProductListDto requestProductListDto);

    void productListCount(RequestProductListDto productListDTO);
}
