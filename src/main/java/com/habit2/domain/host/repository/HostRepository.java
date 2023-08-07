package com.habit2.domain.host.repository;

import com.habit2.domain.host.dto.*;
import com.habit2.domain.host.model.CategoryEntity;
import com.habit2.domain.product.model.OptionEntity;

import java.util.List;

public interface HostRepository {

    int hostJoin(RequestHostJoinDto requestHostJoinDto);

    HostLoginDto findHostName(String id);

    HostInfoDto getHostInfo(String id);

    int updateHostInfo(HostInfoDto hostInfoDto);

    List<CategoryEntity> getLargeCategoryList();

    List<CategoryEntity> getMiddleCategoryList(String cate_large);

    int findCategoryNumber(String cate_middle);

    int insertProductAndReturnCreatedProductNumber(RequestProductInfoDto requestProductInfoDto);

    int insertOptions(List<OptionEntity> optionEntities);

    List<ResponseProductListDTO> getProductList(RequestProductListDto requestProductListDto);

    int getProductListTotalRecord(RequestProductListDto productListDTO);

    int productPurchaseCheck(int no);

    int deleteProduct(int no);

    int deleteOption(int no);
}
