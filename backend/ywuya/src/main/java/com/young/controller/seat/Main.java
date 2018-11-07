package com.young.controller.seat;

import com.young.model.SeatModel;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Component("main")
public class Main {
    private static int seatTimeCount = 56 ;//2天14小时  分成56个时间段
    private List<Seat> seats = new ArrayList<>();
    private List<Record> records = new ArrayList<>();
    private void init (){
        for (int i = 1; i <= 10; i++) {
            String slug = String.format("%03d", i);
            Seat seat = new Seat("A "+slug);
            seats.add(seat);
        }
    }

    public static void main(String[] args) {
        Main main = new Main();
        main.init();
        main.appoint(new Integer[]{29,30},"oxNlG49dl4e5c82MXlISUa_VtLXw","A 001");
        List <Seat> availableSeats = main.available("2018-11-08 8:0:00","2018-11-08 9:0:00");
        Date now = new Date();
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            now= sdf.parse("2018-11-05 16:29:00");
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        availableSeats.stream().forEach(record -> System.out.println(record.getStatus()));
        System.out.println(main.check("oxNlG49dl4e5c82MXlISUa_VtLXw","A 001",now));
    }

    public List<Seat> available(String start, String end){
        Date startDate = new Date(),endDate = new Date(),today = new Date();
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            startDate= sdf.parse(start);
            endDate= sdf.parse(end);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        assert startDate.getDay() == endDate.getDay();

        int offset = today.getDay() == startDate.getDay() ? 0 : seatTimeCount/2;

        int startIndex = (startDate.getHours()-8)*2+(startDate.getMinutes()/30+1)+offset;
        int endIndex = (endDate.getHours()-8)*2+(endDate.getMinutes()/30)+offset;

        seats.stream().forEach(seat -> {
            if(seat.available(startIndex, endIndex)){
                seat.setStatus("1");
            }else{
                seat.setStatus("0");
            }
        });
        return seats.stream().map(seat -> {
            Seat s = new Seat(seat.getSeatSlug());
            s.setStatus(seat.getStatus());
            s.setType(seat.getType());
            HashMap<Integer , Boolean> nMap = new HashMap<>();
            for (int i = 1; i < startIndex; i++) {
                nMap.put(i,Boolean.FALSE);
            }
            for (int i = endIndex+1; i <= seatTimeCount; i++) {
                nMap.put(i,Boolean.FALSE);
            }
            for (int i = startIndex; i <= endIndex; i++) {
                nMap.put(i,seat.getSeatTimesStatus().get(i));
            }
            s.setSeatTimesStatus(nMap);
            s.setX(seat.getX());
            s.setY(seat.getY());
            return s;
        }).collect(Collectors.toList());
    }

    public String appoint(Integer[]times, String owner, String seatSlug){
        Record record = getSeat(seatSlug).appoint(times,owner);
        if (record != null){
            records.add(record);
            return "预约成功";
        }else{
            return "预约失败";
        }

    }

    public String check(String owner, String seatSlug, Date now){

        List<Record> userRecord = records.stream().filter(record ->
                record.getOwner().equals(owner) && now.before(record.getEndTime()) && record.getSeatSlug().equals(seatSlug))
                .collect(Collectors.toList());
        if (userRecord == null || userRecord.size() == 0){
            return "当前没有预约记录";
        }
        Collections.sort(userRecord);
        Record record = userRecord.get(0);
        if (now.before(record.getStartTime())){
            //check in
            if (compareTwoDate(now,record.getStartTime())){
                record.setCheckin(Boolean.TRUE);
                return "签到成功";
            }else{
                return "未到签到时间";
            }
        }else{
            //check out
            if (compareTwoDate(now,record.getEndTime())){
                record.setCheckout(Boolean.TRUE);
                return "签离成功";
            }else{
                return "未到签离时间";
            }
        }

    }

    public void importConfig (List<SeatModel> p){
        this.seats = new ArrayList<>();
        this.records = new ArrayList<>();
        for (int i = 1; i <= p.size(); i++) {
            String slug = String.format("%03d", i);
            Seat seat = new Seat("A "+slug);
            seat.setX(p.get(i-1).getC());
            seat.setY(p.get(i-1).getR());
            seat.setType(p.get(i-1).getType());
            this.seats.add(seat);
        }
    }

    public List<Record> getRecords(String owner){
        return records.stream().filter(record -> record.getOwner().equals(owner)).collect(Collectors.toList());
    }
    private boolean compareTwoDate(Date dateBefore , Date dateAfter){
        Instant startDate = dateBefore.toInstant();
        Instant endDate = dateAfter.toInstant();
        long daysDiff = Duration.between(startDate, endDate).toMinutes();
        return daysDiff < 15l;
    }

    private Seat getSeat(String seatSlug){
        for (Seat s:seats
             ) {
            if (s.getSeatSlug().equals(seatSlug)){
                return s;
            }
        }
        return null;
    }
}
