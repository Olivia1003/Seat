package com.young.controller.young;

import java.util.ArrayList;

public class Mbti {
    private static int E = 0;
    private static int I = 0;
    private static int S = 0;
    private static int N = 0;
    private static int T = 0;
    private static int F = 0;
    private static int J = 0;
    private static int P = 0;

    public static String go(String result){
        ArrayList<Question> questions = new ArrayList<>();
        questions.add(new Question("J","P"));
        questions.add(new Question("P","J"));
        questions.add(new Question("S","N"));
        questions.add(new Question("E","I"));
        questions.add(new Question("N","S"));
        questions.add(new Question("F","T"));
        questions.add(new Question("P","J"));
        questions.add(new Question("E","I"));
        questions.add(new Question("J","P"));
        questions.add(new Question("J","P"));
        questions.add(new Question("P","J"));
        questions.add(new Question("I","E"));
        questions.add(new Question("S","N"));
        questions.add(new Question("E","I"));
        questions.add(new Question("N","S"));
        questions.add(new Question("F","T"));
        questions.add(new Question("P","J"));
        questions.add(new Question("I","E"));
        questions.add(new Question("E","I"));
        questions.add(new Question("J","P"));
        questions.add(new Question("P","J"));
        questions.add(new Question("I","E"));
        questions.add(new Question("E","I"));
        questions.add(new Question("N","S"));
        questions.add(new Question("P","J"));
        questions.add(new Question("I","E"));
        questions.add(new Question("I","E"));
        questions.add(new Question("J","P"));
        questions.add(new Question("N","S"));
        questions.add(new Question("F","T"));
        questions.add(new Question("T","F"));
        questions.add(new Question("S","N"));
        questions.add(new Question("P","J"));
        questions.add(new Question("E","I"));
        questions.add(new Question("I","E"));
        questions.add(new Question("J","P"));
        questions.add(new Question("N","S"));
        questions.add(new Question("F","T"));
        questions.add(new Question("T","F"));
        questions.add(new Question("S","N"));
        questions.add(new Question("P","J"));
        questions.add(new Question("I","E"));
        questions.add(new Question("J","P"));
        questions.add(new Question("N","S"));
        questions.add(new Question("F","T"));
        questions.add(new Question("T","F"));
        questions.add(new Question("S","N"));
        questions.add(new Question("I","E"));
        questions.add(new Question("J","P"));
        questions.add(new Question("N","S"));
        questions.add(new Question("F","T"));
        questions.add(new Question("T","F"));
        questions.add(new Question("S","N"));
        questions.add(new Question("I","E"));
        questions.add(new Question("N","S"));
        questions.add(new Question("F","T"));
        questions.add(new Question("T","F"));
        questions.add(new Question("S","N"));
        questions.add(new Question("J","P"));
        questions.add(new Question("I","E"));
        questions.add(new Question("S","N"));
        questions.add(new Question("I","E"));
        questions.add(new Question("N","S"));
        questions.add(new Question("F","T"));
        questions.add(new Question("P","J"));
        questions.add(new Question("I","E"));
        questions.add(new Question("E","I"));
        questions.add(new Question("J","P"));
        questions.add(new Question("T","F"));
        questions.add(new Question("J","P"));
        questions.add(new Question("P","J"));
        questions.add(new Question("I","E"));
        questions.add(new Question("S","N"));
        questions.add(new Question("N","S"));
        questions.add(new Question("T","N"));
        questions.add(new Question("P","J"));
        questions.add(new Question("E","I"));
        questions.add(new Question("T","F"));
        questions.add(new Question("N","S"));
        questions.add(new Question("F","T"));
        questions.add(new Question("T","F"));
        questions.add(new Question("S","N"));
        questions.add(new Question("N","S"));
        questions.add(new Question("F","T"));
        questions.add(new Question("T","F"));
        questions.add(new Question("S","N"));
        questions.add(new Question("N","S"));
        questions.add(new Question("F","T"));
        questions.add(new Question("T","F"));
        questions.add(new Question("S","N"));
        questions.add(new Question("F","T"));
        questions.add(new Question("T","F"));
        questions.add(new Question("S","N"));


        String[]s = result.split("_");
        for (int j = 0; j < s.length; j++) {
            String code = "";
            if (s[j].equals("A")){
                code = questions.get(j).getA();
            }else if (s[j].equals("B")){
                code = questions.get(j).getB();
            }
            addScore(code);
        }

        return getResult();
    };
    private static void addScore(String code){
        if (code.equals("E")){
            E++;
        }else if (code.equals("I")){
            I++;
        }else if (code.equals("S")){
            S++;
        }else if (code.equals("N")){
            N++;
        }else if (code.equals("T")){
            T++;
        }else if (code.equals("F")){
            F++;
        }else if (code.equals("J")){
            J++;
        }else if (code.equals("P")){
            P++;
        }
    }

    private static String getResult(){
        String result = "";
        if (E>I){
            result +="E";
        }else {
            result +="I";
        }
        if (S>N){
            result +="S";
        }else {
            result +="N";
        }
        if (T>F){
            result +="T";
        }else {
            result +="F";
        }
        if (J>P){
            result +="J";
        }else {
            result +="P";
        }
        return result;
    }
}
