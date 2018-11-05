package com.young.model;

import java.util.ArrayList;
import java.util.List;

public class SeatRequest {
    private String rowNum;
    private String colNum;
    private List<SeatModel> seatData = new ArrayList<SeatModel>();

    public String getRowNum() {
        return rowNum;
    }

    public void setRowNum(String rowNum) {
        this.rowNum = rowNum;
    }

    public String getColNum() {
        return colNum;
    }

    public void setColNum(String colNum) {
        this.colNum = colNum;
    }

    public List<SeatModel> getSeatData() {
        return seatData;
    }

    public void setSeatData(List<SeatModel> seatData) {
        this.seatData = seatData;
    }

    public SeatRequest(String rowNum, String colNum, List<SeatModel> seatData) {
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.seatData = seatData;
    }
}
