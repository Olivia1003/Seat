package com.young.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SeatModel {

    public SeatModel() {
    }

    @JsonProperty("r")
    private String r;

    @JsonProperty("c")
    private String c;

    @JsonProperty("type")
    private String type;

    public String getR() {
        return r;
    }

    public void setR(String r) {
        this.r = r;
    }

    public String getC() {
        return c;
    }

    public void setC(String c) {
        this.c = c;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public SeatModel(String r, String c, String type) {
        this.r = r;
        this.c = c;
        this.type = type;
    }
}
