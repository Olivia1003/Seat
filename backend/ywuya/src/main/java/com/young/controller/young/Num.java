package com.young.controller.young;

public class Num {
    private String name;
    private int num;

    public Num(String name, int num) {
        this.name = name;
        this.num = num;
    }

    public String getName() {
        return name;
    }

    public int getNum() {
        return num;
    }

    @Override
    public String toString() {
        return "Num{" +
                "name='" + name + '\'' +
                ", num=" + num +
                '}';
    }
}
