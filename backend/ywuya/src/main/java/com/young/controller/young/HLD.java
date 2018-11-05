package com.young.controller.young;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;

public class HLD {
    private static int A = 0;
    private static int C = 0;
    private static int E = 0;
    private static int I = 0;
    private static int R = 0;
    private static int S = 0;
    public static String go(String param){
        String [] codes = param.split("_");
        for (String code : codes
             ) {
            if (code.length() == 3){
                addScore(code.substring(0,1),3);
                addScore(code.substring(1,2),2);
                addScore(code.substring(2,3),1);
            }
        }
        ArrayList<Num> nums = new ArrayList<>();
        nums.add(new Num("A",A));
        nums.add(new Num("C",C));
        nums.add(new Num("E",E));
        nums.add(new Num("I",I));
        nums.add(new Num("R",R));
        nums.add(new Num("S",S));
        nums.sort(new Comparator<Num>() {
            @Override
            public int compare(Num o1, Num o2) {
                return o2.getNum() - o1.getNum();
            }
        });

        System.out.println(Arrays.toString(nums.toArray()));
        String str = "";
        for (int i = 0; i < 2; i++) {
            str+=nums.get(i).getName();
        }
        return str;
    }

    private static void addScore(String code,int score){
        if (code.equals("A")){
            A+=score;
        }else  if (code.equals("C")){
            C+=score;
        }else  if (code.equals("E")){
            E+=score;
        }else  if (code.equals("I")){
            I+=score;
        }else  if (code.equals("R")){
            R+=score;
        }else  if (code.equals("S")){
            S+=score;
        }
    }

    public static void main(String[] args) {
        HLD hld = new HLD();
        hld.go("AER_AIE_ARS_");
    }
}
