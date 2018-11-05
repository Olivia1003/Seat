package com.young.controller.seat;

import java.util.Date;

public class Record implements Comparable<Record>{

    private String slug;
    private String owner;
    private String seatSlug;
    private Date startTime;
    private Date endTime;
    private Boolean checkin;
    private Boolean checkout;
    private String status;

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getSeatSlug() {
        return seatSlug;
    }

    public void setSeatSlug(String seatSlug) {
        this.seatSlug = seatSlug;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Boolean getCheckin() {
        return checkin;
    }

    public void setCheckin(Boolean checkin) {
        this.checkin = checkin;
    }

    public Boolean getCheckout() {
        return checkout;
    }

    public void setCheckout(Boolean checkout) {
        this.checkout = checkout;
    }

    @Override
    public int compareTo(Record o) {
        return this.getEndTime().compareTo(o.getEndTime());
    }
}
