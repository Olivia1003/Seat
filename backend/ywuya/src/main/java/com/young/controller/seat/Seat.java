package com.young.controller.seat;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;


public class Seat {
    private static int num = 1;
    private static int seatTimeCount = 56 ;//2天14小时  分成56个时间段
    private String seatSlug;
    private HashMap<Integer , Boolean>seatTimesStatus = new HashMap<>();
    private String  x;
    private String  y;
    private String  type;

    public Seat(String seatSlug) {
        this.seatSlug = seatSlug;
        for (int i = 0; i < seatTimeCount; i++) {
            seatTimesStatus.put(i, Boolean.TRUE);
        }
    }

    public String getSeatSlug() {
        return seatSlug;
    }

    public Record appoint(Integer[]times, String owner){
        for (int i:times
             ) {
            if (seatTimesStatus.containsKey(i)&&!seatTimesStatus.get(i))return null;
            seatTimesStatus.put(i, Boolean.FALSE);
        }
        int start = times[0];
        int end = times[times.length-1];
        Record record = new Record();
        record.setOwner(owner);
        record.setSlug(++num+"");
        record.setSeatSlug(seatSlug);
        record.setStatus("预约成功");
        record.setStartTime(parseStartDate(start));
        record.setEndTime(parseEndDate(end));
        record.setCheckin(Boolean.FALSE);
        record.setCheckout(Boolean.FALSE);
        return record;
    }

    public Boolean available(int startIndex , int endIndex){

        for (int i = startIndex; i < endIndex+1; i++) {
            if (seatTimesStatus.containsKey(i)&&seatTimesStatus.get(i)){
                return Boolean.TRUE;
            }
        }

        return Boolean.FALSE;
    }

    private Date parseStartDate(int i){
        Calendar calendar = Calendar.getInstance();
        calendar.set(2018,Calendar.NOVEMBER,calendar.getTime().getDate()+i/(seatTimeCount/2),(i%(seatTimeCount/2)-1)/2+8,(i%(seatTimeCount/2)+1)%2*30);
        return calendar.getTime();
    }
    private Date parseEndDate(int i){
        Calendar calendar = Calendar.getInstance();
        calendar.set(2018,Calendar.NOVEMBER,calendar.getTime().getDate()+i/(seatTimeCount/2),(i%(seatTimeCount/2)-1)/2+8,(i%(seatTimeCount/2))%2*30);
        return calendar.getTime();
    }

    public static int getNum() {
        return num;
    }

    public static void setNum(int num) {
        Seat.num = num;
    }

    public static int getSeatTimeCount() {
        return seatTimeCount;
    }

    public static void setSeatTimeCount(int seatTimeCount) {
        Seat.seatTimeCount = seatTimeCount;
    }

    public void setSeatSlug(String seatSlug) {
        this.seatSlug = seatSlug;
    }

    public HashMap<Integer, Boolean> getSeatTimesStatus() {
        return seatTimesStatus;
    }

    public void setSeatTimesStatus(HashMap<Integer, Boolean> seatTimesStatus) {
        this.seatTimesStatus = seatTimesStatus;
    }

    public String getX() {
        return x;
    }

    public void setX(String x) {
        this.x = x;
    }

    public String getY() {
        return y;
    }

    public void setY(String y) {
        this.y = y;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
