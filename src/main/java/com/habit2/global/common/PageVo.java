package com.habit2.global.common;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class PageVo {
    private int recordPerPage = 5; // 한 페이지당 표시할 글 갯수 (5개)
    private int displayPageNum = 5; // 한번에 표시할 페이지 갯수 (5개)

    private int currentPage; // 현재 페이지 번호
    private int totalRecord; // 모든 글 갯수

    private int totalPages; // 모든 페이지 수
    private int startPage; // 시작 페이지 번호
    private int endPage; // 끝 페이지 번호

    private boolean prev; // 이전으로 가는 화살표
    private boolean next; // 다음으로 가는 화살표

    private int offset;

    public PageVo() {
        this.currentPage = 1;
        this.offset = 0;
    }

    public PageVo(int currentPage) {
        this.currentPage = currentPage;
        this.offset = (currentPage - 1) * recordPerPage;
    }

    public void setTotalRecord(int totalRecord) {
        this.totalRecord = totalRecord;
        calcPagingData();
    }

    private void calcPagingData() {
        this.totalPages = (int) Math.ceil((double) totalRecord / recordPerPage);

        this.startPage = (int) ((Math.ceil((double) currentPage / displayPageNum) - 1) * displayPageNum + 1);

        this.endPage = (int) (Math.ceil((double) currentPage / displayPageNum) * displayPageNum);
        if(this.endPage > this.totalPages) {
            this.endPage = this.totalPages;
        }

        this.prev = (startPage == 1) ? false : true;

        this.next = (endPage == totalPages) ? false : true;
    }
}

