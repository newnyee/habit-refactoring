package com.habit2.domain.host.service;

import com.habit2.domain.host.dto.*;
import com.habit2.domain.host.model.CategoryEntity;
import com.habit2.domain.host.repository.HostRepository;
import com.habit2.domain.member.repository.MemberRepository;
import com.habit2.domain.product.model.OptionEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class HostServiceImpl implements HostService {

    private final HostRepository hostRepository;
    private final MemberRepository memberRepository;

    // 회원가입
    @Override
    public int hostJoin(RequestHostJoinDto hostJoinDto) throws IOException {

        // 이미지
        String host_img = "host_default_img.png";
        MultipartFile hostImgFile = hostJoinDto.getHost_imgFile();
        if (hostImgFile != null) {
            host_img = imageRenameAndImageSave(hostImgFile);
        }
        hostJoinDto.setHost_img(host_img);

        // 이메일
        hostJoinDto.setHost_email(
                new StringBuilder()
                .append(hostJoinDto.getHost_email())
                .append("@")
                .append(hostJoinDto.getHost_email2())
                .toString());

        // 휴대폰 번호
        String host_phone = "";
        if (hostJoinDto.getHost_phone()==null || hostJoinDto.getHost_phone().isEmpty()) {
            host_phone = memberRepository.findMemberPhoneNumber(hostJoinDto.getMem_id());
            hostJoinDto.setHost_phone(host_phone);
        } else {
            host_phone = new StringBuilder()
                    .append(hostJoinDto.getHost_phone())
                    .append("-")
                    .append(hostJoinDto.getHost_phone2())
                    .append("-")
                    .append(hostJoinDto.getHost_phone3())
                    .toString();
            hostJoinDto.setHost_phone(host_phone);
        }

        if (hostRepository.hostJoin(hostJoinDto) == 1) { //insert 성공시 member테이블 mem_class 컬럼 update
            return memberRepository.updateMemberClass(hostJoinDto.getMem_id());
        } else {
            return 0;
        }
    }

    // 호스트 로그인
    @Override
    public HostLoginDto hostLogin(String host_id) {
        return hostRepository.findHostName(host_id);
    }

    // 호스트 정보 수정 값 가져오기
    @Override
    public HostInfoDto getHostInfo(String host_id) {

        HostInfoDto hostInfo = hostRepository.getHostInfo(host_id);

        log.debug("hostInfoValue={}", hostInfo);

        if (hostInfo != null) {
            // 이메일
            String hostEmail = hostInfo.getHost_email();
            String[] hostEmails = hostEmail.split("@");
            hostInfo.setHost_email(hostEmails[0]);
            hostInfo.setHost_email2(hostEmails[1]);

            // 연락처
            String hostPhone = hostInfo.getHost_phone();
            String[] hostPhones = hostPhone.split("-");
            hostInfo.setHost_phone(hostPhones[0]);
            hostInfo.setHost_phone2(hostPhones[1]);
            hostInfo.setHost_phone3(hostPhones[2]);
        }
        return hostInfo;
    }

    // 호스트 정보 수정
    @Override
    public int updateHostInfo(HostInfoDto hostInfoDto) throws IOException {

        // 이미지
        String host_img = "host_default_img.png";
        MultipartFile hostImgFile = hostInfoDto.getHost_imgFile();
        if (hostImgFile != null) {
            host_img = imageRenameAndImageSave(hostImgFile);
        }
        hostInfoDto.setHost_img(host_img);

        // 이메일
        hostInfoDto.setHost_email(
                new StringBuilder()
                        .append(hostInfoDto.getHost_email())
                        .append("@")
                        .append(hostInfoDto.getHost_email2())
                        .toString());

        // 휴대폰 번호
        String host_phone = "";
        if (hostInfoDto.getHost_phone()==null || hostInfoDto.getHost_phone().isEmpty()) {
            host_phone = memberRepository.findMemberPhoneNumber(hostInfoDto.getHost_id());
            hostInfoDto.setHost_phone(host_phone);
        } else {
            host_phone = new StringBuilder()
                    .append(hostInfoDto.getHost_phone())
                    .append("-")
                    .append(hostInfoDto.getHost_phone2())
                    .append("-")
                    .append(hostInfoDto.getHost_phone3())
                    .toString();
            hostInfoDto.setHost_phone(host_phone);
        }

        // 소개
        if (hostInfoDto.getHost_intro().equals("")) {
            hostInfoDto.setHost_intro(null);
        }

        // 은행
        if (hostInfoDto.getHost_bank().equals("0")) {
            hostInfoDto.setHost_bank(null);
        }

        // 예금주
        if (hostInfoDto.getHost_acholder().equals("")) {
            hostInfoDto.setHost_acholder(null);
        }

        // 소개
        if (hostInfoDto.getHost_account().equals("")) {
            hostInfoDto.setHost_account(null);
        }

        return hostRepository.updateHostInfo(hostInfoDto);
    }

    // 카테고리 가져오기
    @Override
    public List<CategoryEntity> getLargeCategoryList() {
        return hostRepository.getLargeCategoryList();
    }

    @Override
    public List<CategoryEntity> getMiddleCategoryList(String cate_large) {
        return hostRepository.getMiddleCategoryList(cate_large);
    }

    // 상품 등록
    @Override
    public int createProduct(RequestProductInfoDto productInfoDto) throws IOException {

        // 카테고리 코드 가져오기
        productInfoDto.setCate_no(hostRepository.findCategoryNumber(productInfoDto.getCate_middle()));

        // 이미지
        String prod_imgs = "";
        List<MultipartFile> prodImgFiles = productInfoDto.getProd_imgFile();
        for (int i = 0; i < prodImgFiles.size(); i++) {

            String prod_img = imageRenameAndImageSave(prodImgFiles.get(i));

            if (prodImgFiles.size() == i + 1) {
                prod_imgs += prod_img;
            } else {
                prod_imgs += prod_img + "|";
            }
        }
        productInfoDto.setProd_img(prod_imgs);

        log.debug("manufactured product Info dto={}", productInfoDto);

        // 상품 insert
        int productInsertResult = hostRepository.insertProductAndReturnCreatedProductNumber(productInfoDto);
        log.debug("product insert result ={}", productInsertResult==1 ? "success" : "failed");
        if (productInsertResult != 1) {
            return 0;
        }

        // 옵션 insert
        List<OptionEntity> optionEntities = new ArrayList<>();

        // 옵션 타입이 인원권, 회차권일 경우
        if (productInfoDto.getOpt_type().equals("P")) {
            for (int i = 0; i < productInfoDto.getP_name().size(); i++) {
                OptionEntity option = new OptionEntity();
                option.setProd_no(productInfoDto.getProd_no());
                option.setOpt_type(productInfoDto.getOpt_type());
                option.setHost_id(productInfoDto.getHost_id());
                option.setOpt_name(productInfoDto.getP_name().get(i));
                option.setOpt_qty(productInfoDto.getP_qty().get(i));
                option.setOpt_price(productInfoDto.getP_price().get(i));
                optionEntities.add(option);
            }

        } else if(productInfoDto.getOpt_type().equals("O")){ // 옵션 타입이 원데이 클래스일 경우
            for (int i = 0; i < productInfoDto.getO_name().size(); i++) {
                OptionEntity option = new OptionEntity();
                option.setProd_no(productInfoDto.getProd_no());
                option.setOpt_type(productInfoDto.getOpt_type());
                option.setHost_id(productInfoDto.getHost_id());
                option.setOpt_name(productInfoDto.getO_name().get(i));
                option.setOpt_qty(productInfoDto.getO_qty().get(i));
                option.setOpt_price(productInfoDto.getO_price().get(i));
                optionEntities.add(option);
            }
        }

        return hostRepository.insertOptions(optionEntities);
    }


    // 상품 리스트 가져오기
    @Override
    public List<ResponseProductListDTO> productList(RequestProductListDto productListDto) {

        List<ResponseProductListDTO> list = hostRepository.getProductList(productListDto);

        if (list.size() > 0) {
            for (ResponseProductListDTO dto : list) {
                // 대표 이미지 가져오기
                String prod_img = dto.getProd_img().split("\\|")[0];
                dto.setProd_img(prod_img);

                // 구매기록 확인하기
                int result = hostRepository.productPurchaseCheck(dto.getProd_no());

                // 구매기록이 있다면 삭제 불가를 위해 status에 기록 남기기
                if (result > 0) {
                    dto.setProductPurchaseStatus("N");
                }
            }
        }

        return list;
    }

    @Override
    public void productListCount(RequestProductListDto productListDTO) {
        int totalRecord = hostRepository.getProductListTotalRecord(productListDTO);
        productListDTO.getVo().setTotalRecord(totalRecord);
    }


    // 메소드 =====================================================================================================

    /**
     * 이미지 리네임, 이미지 저장 메소드
     * @param imgFile
     * @return String newImgName
     * @throws IOException
     */
    private String imageRenameAndImageSave(MultipartFile imgFile) throws IOException {
        long nano = System.currentTimeMillis();
        String now = new SimpleDateFormat("SSSssmmHHddMMyy").format(nano);

        String prod_img = now + imgFile.getOriginalFilename();
        File targetFile = new File("src/main/resources/static/storage", prod_img);
        InputStream filesStream = imgFile.getInputStream();
        FileUtils.copyInputStreamToFile(filesStream, targetFile);
        return prod_img;
    }
}
