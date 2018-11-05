package com.young.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "careerapp", schema = "wuya", catalog = "")
public class CareerappEntity {
    private String sequence;
    private String careerType;
    private String careerNum;
    private String occupation;
    private String occupationName;
    private String introduction;
    private String careerTask;
    private String skill;
    private String education;
    private String majorSubject;

    @Id
    @Column(name = "sequence")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public String getSequence() {
        return sequence;
    }

    public void setSequence(String sequence) {
        this.sequence = sequence;
    }

    @Basic
    @Column(name = "careerType")
    public String getCareerType() {
        return careerType;
    }

    public void setCareerType(String careerType) {
        this.careerType = careerType;
    }

    @Basic
    @Column(name = "careerNum")
    public String getCareerNum() {
        return careerNum;
    }

    public void setCareerNum(String careerNum) {
        this.careerNum = careerNum;
    }

    @Basic
    @Column(name = "occupation")
    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    @Basic
    @Column(name = "occupationName")
    public String getOccupationName() {
        return occupationName;
    }

    public void setOccupationName(String occupationName) {
        this.occupationName = occupationName;
    }

    @Basic
    @Column(name = "introduction")
    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    @Basic
    @Column(name = "careerTask")
    public String getCareerTask() {
        return careerTask;
    }

    public void setCareerTask(String careerTask) {
        this.careerTask = careerTask;
    }

    @Basic
    @Column(name = "skill")
    public String getSkill() {
        return skill;
    }

    public void setSkill(String skill) {
        this.skill = skill;
    }

    @Basic
    @Column(name = "education")
    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    @Basic
    @Column(name = "majorSubject")
    public String getMajorSubject() {
        return majorSubject;
    }

    public void setMajorSubject(String majorSubject) {
        this.majorSubject = majorSubject;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CareerappEntity that = (CareerappEntity) o;
        return Objects.equals(sequence, that.sequence) &&
                Objects.equals(careerType, that.careerType) &&
                Objects.equals(careerNum, that.careerNum) &&
                Objects.equals(occupation, that.occupation) &&
                Objects.equals(occupationName, that.occupationName) &&
                Objects.equals(introduction, that.introduction) &&
                Objects.equals(careerTask, that.careerTask) &&
                Objects.equals(skill, that.skill) &&
                Objects.equals(education, that.education) &&
                Objects.equals(majorSubject, that.majorSubject);
    }

    @Override
    public int hashCode() {

        return Objects.hash(sequence, careerType, careerNum, occupation, occupationName, introduction, careerTask, skill, education, majorSubject);
    }
}
