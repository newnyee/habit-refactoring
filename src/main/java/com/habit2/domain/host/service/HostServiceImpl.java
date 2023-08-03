package com.habit2.domain.host.service;

import com.habit2.domain.host.dto.HostLoginDto;
import com.habit2.domain.host.dto.RequestHostJoinDto;
import com.habit2.domain.host.dto.HostInfoDto;
import com.habit2.domain.host.model.CategoryEntity;
import com.habit2.domain.host.repository.HostRepository;
import com.habit2.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.List;

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
        String path = "src/main/webapp/storage/";
        String host_img = "host_default_img.png";
        MultipartFile hostImgFile = hostJoinDto.getHost_imgFile();
        if (hostImgFile != null) {
            long nano = System.currentTimeMillis();
            String now = new SimpleDateFormat("SSSssmmHHddMMyy").format(nano);
            host_img = now + hostImgFile.getOriginalFilename();
            File targetFile = new File(path, host_img);
            InputStream filesStream = hostImgFile.getInputStream();
            FileUtils.copyInputStreamToFile(filesStream, targetFile);
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
        String path = "src/main/webapp/storage/";
        String host_img = "host_default_img.png";
        MultipartFile hostImgFile = hostInfoDto.getHost_imgFile();
        if (hostImgFile != null) {
            long nano = System.currentTimeMillis();
            String now = new SimpleDateFormat("SSSssmmHHddMMyy").format(nano);
            host_img = now + hostImgFile.getOriginalFilename();
            File targetFile = new File(path, host_img);
            InputStream filesStream = hostImgFile.getInputStream();
            FileUtils.copyInputStreamToFile(filesStream, targetFile);
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
}
