package com.young.controller.seat;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.framework.util.HttpUtil;
import com.young.json.BaseJson;
import com.young.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.net.URI;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping(value = "/seat")
public class SeatController {

    @Autowired
    @Qualifier("main")
    private Main main;

    private final static String appId= "wx7fc8664bf44dbec4";

    private final static String appSecret= "df79c56de98945b661186db1dff72beb";

    private final static String floor= "中北图书馆三楼";
    private final static String school= "华东师范大学";
    private  static int count = 1;

    private ObjectMapper mapper = new ObjectMapper();

    private BaseJson queryJson ;

    @ResponseBody
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public BaseJson login(
            @RequestParam(value = "code") String code
    ) throws Exception {
        queryJson = new BaseJson();
        String s = "https://api.weixin.qq.com/sns/jscode2session?appid="+appId+"&secret="+appSecret+"&js_code="+code+"&grant_type=authorization_code";
        WxAuthRes response = mapper.readValue(HttpUtil.sendGet(new URI(s)),WxAuthRes.class);
        queryJson.setObj(response.getOpenid());
        return queryJson;
    }

    @ResponseBody
    @RequestMapping(value = "/search", method = RequestMethod.POST)
    public BaseJson search(
            @RequestParam(value = "startDate") String startDate,
            @RequestParam(value = "endDate") String endDate
    ) throws Exception {
        queryJson = new BaseJson();
        List<Seat> seats =  main.available(startDate,endDate);
        queryJson.setObj(seats);
        return queryJson;
    }

    @ResponseBody
    @RequestMapping(value = "/appoint", method = RequestMethod.POST)
    public BaseJson appoint(
            @RequestParam(value = "times") Integer[] times,
            @RequestParam(value = "owner") String owner,
            @RequestParam(value = "seatSlug") String seatSlug
    ) throws Exception {
        queryJson = new BaseJson();
        queryJson.setObj(main.appoint(times,owner,seatSlug));
        return queryJson;
    }

    @ResponseBody
    @RequestMapping(value = "/check", method = RequestMethod.POST)
    public BaseJson check(
            @RequestParam(value = "owner") String owner,
            @RequestParam(value = "seatSlug") String seatSlug
    ) throws Exception {
        queryJson = new BaseJson();
        if(count == 1){
            queryJson.setObj(main.check(owner,seatSlug,new Date(118,10,8,8,55,0)));
            count++;
        }else{
            queryJson.setObj(main.check(owner,seatSlug,new Date(118,10,8,9,55,0)));
            count--;
        }

        return queryJson;
    }

    @ResponseBody
    @RequestMapping(value = "/import", method = RequestMethod.POST)
    public BaseJson check(
            @RequestParam(value = "rowNum") String rowNum,
            @RequestParam(value = "colNum") String colNum,
            @RequestParam(value = "seatData") String[] seatDatas
    ) throws Exception {
        queryJson = new BaseJson();
        List<SeatModel>seats = Arrays.stream(seatDatas).map(s -> {
            SeatModel seatModel = null;
            System.out.println(s);
            try {
                seatModel = mapper.readValue(s,SeatModel.class);
            } catch (IOException e) {
                e.printStackTrace();
            }
            return seatModel;
        }).filter(seatModel -> seatModel!=null)
                .collect(Collectors.toList());
        main.importConfig(seats);
        return queryJson;
    }

    @ResponseBody
    @RequestMapping(value = "/record", method = RequestMethod.POST)
    public BaseJson check(
            @RequestParam(value = "owner") String owner
    ) throws Exception {
        queryJson = new BaseJson();
        SimpleDateFormat df1 = new SimpleDateFormat("yyyy-MM-dd");//设置日期格式
        SimpleDateFormat df2 = new SimpleDateFormat("HH:mm:ss");//设置日期格式
        List<Record>records = main.getRecords(owner);
        List<OrderRecord>historyOrders = records.stream()
                .filter(record -> record.getEndTime().before(new Date())||((record.getCheckin())&&(record.getCheckout())))
                .map(record -> {
                    OrderRecord order = new OrderRecord();
                    order.setIdNo(record.getSlug());
                    order.setDate(df1.format(record.getStartTime()));
                    order.setEndTime(df2.format(record.getEndTime()));
                    order.setStartTime(df2.format(record.getStartTime()));
                    order.setSeatNo(record.getSeatSlug());
                    if (record.getCheckin()&&record.getCheckout()){
                        order.setStatus("完美完成");
                    }else{
                        order.setStatus("违约");
                    }
                    order.setFloorName(floor);
                    order.setSchoolName(school);
                    return order;
                }).collect(Collectors.toList());
        Orders orders = new Orders();
        orders.setHistoryOrders(historyOrders);

        List<OrderRecord>currentOrders = records.stream()
                .filter(record -> record.getEndTime().after(new Date())&&!((record.getCheckin())&&(record.getCheckout())))
                .map(record -> {
                    OrderRecord order = new OrderRecord();
                    order.setIdNo(record.getSlug());
                    order.setDate(df1.format(record.getStartTime()));
                    order.setEndTime(df2.format(record.getEndTime()));
                    order.setStartTime(df2.format(record.getStartTime()));
                    order.setSeatNo(record.getSeatSlug());
                    order.setFloorName(floor);
                    order.setSchoolName(school);
                    if (record.getCheckin()&&record.getCheckout()){
                        order.setStatus("完美完成");
                    }else if (!record.getCheckin()&&!record.getCheckout()){
                        order.setStatus("一点也没签到");
                    }else{
                        order.setStatus("签到签离少一次");
                    }
                    return order;
                }).collect(Collectors.toList());

        orders.setCurrentOrders(currentOrders);

        queryJson.setObj(orders);
        return queryJson;
    }

}
