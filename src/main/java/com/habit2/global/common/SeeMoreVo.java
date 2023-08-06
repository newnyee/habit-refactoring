package com.habit2.global.common;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class SeeMoreVo {
    private int offset;
    private int appendRow;
    private int click;
    private int totalRecord;
    private int currentEndRowNum;

    public SeeMoreVo() {
        this.appendRow = 4;
        setClick(0);
    }

    public void setClick (int click) {
        this.click = click;
        calcSeeMoreProcessing();
    }

    private void calcSeeMoreProcessing () {
        this.offset = (click * appendRow);
        this.currentEndRowNum = (click + 1) * appendRow;
    }
}
