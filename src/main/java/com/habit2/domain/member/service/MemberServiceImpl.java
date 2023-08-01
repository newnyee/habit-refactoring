package com.habit2.domain.member.service;

import com.habit2.domain.member.dto.RequestMemberJoinDto;
import com.habit2.domain.member.dto.RequestMemberLoginDto;
import com.habit2.domain.member.model.Member;
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

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;

    @Override
    public int memberJoin(RequestMemberJoinDto memberJoinDto) throws IOException {

        // 이미지
        String path = "src/main/webapp/storage/";
        String mem_img = "member_default_img.png";
        MultipartFile memberImgFile = memberJoinDto.getMem_imgFile();
        if (memberImgFile != null && !memberImgFile.isEmpty()) {
            long nano = System.currentTimeMillis();
            String now = new SimpleDateFormat("SSSssmmHHddMMYY").format(nano);
            mem_img = now + memberImgFile.getOriginalFilename();
            File targetFile = new File(path, mem_img);
            InputStream filesStream = memberImgFile.getInputStream();
            FileUtils.copyInputStreamToFile(filesStream, targetFile);
        }
        memberJoinDto.setMem_img(mem_img);

        // 생년월일
        String mem_birth = memberJoinDto.getMem_birth();
        String[] userBirths = mem_birth.split("-");
        mem_birth = new StringBuilder()
                .append(userBirths[0])
                .append(userBirths[1])
                .append(userBirths[2])
                .toString();
        memberJoinDto.setMem_birth(mem_birth);


        // 이메일
        String mem_email = new StringBuilder()
                .append(memberJoinDto.getMem_email())
                .append("@")
                .append(memberJoinDto.getMem_email2())
                .toString();
        memberJoinDto.setMem_email(mem_email);

        // 휴대폰 번호
        String mem_phone = new StringBuilder()
                .append(memberJoinDto.getMem_phone())
                .append("-")
                .append(memberJoinDto.getMem_phone2())
                .append("-")
                .append(memberJoinDto.getMem_phone3())
                .toString();
        memberJoinDto.setMem_phone(mem_phone);

        return memberRepository.memberJoin(memberJoinDto);
    }

    @Override
    public RequestMemberLoginDto memberLogin(RequestMemberLoginDto memberLoginDto) {
        return memberRepository.findMember(memberLoginDto);
    }
}
