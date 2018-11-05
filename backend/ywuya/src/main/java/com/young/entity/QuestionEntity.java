package com.young.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "question", schema = "wuya", catalog = "")
public class QuestionEntity {
    private int id;
    private String questionSub;
    private String questionA;
    private String questionB;
    private String questionC;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "question_sub")
    public String getQuestionSub() {
        return questionSub;
    }

    public void setQuestionSub(String questionSub) {
        this.questionSub = questionSub;
    }

    @Basic
    @Column(name = "question_a")
    public String getQuestionA() {
        return questionA;
    }

    public void setQuestionA(String questionA) {
        this.questionA = questionA;
    }

    @Basic
    @Column(name = "question_b")
    public String getQuestionB() {
        return questionB;
    }

    public void setQuestionB(String questionB) {
        this.questionB = questionB;
    }

    @Basic
    @Column(name = "question_c")
    public String getQuestionC() {
        return questionC;
    }

    public void setQuestionC(String questionC) {
        this.questionC = questionC;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        QuestionEntity that = (QuestionEntity) o;
        return id == that.id &&
                Objects.equals(questionSub, that.questionSub) &&
                Objects.equals(questionA, that.questionA) &&
                Objects.equals(questionB, that.questionB) &&
                Objects.equals(questionC, that.questionC);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, questionSub, questionA, questionB, questionC);
    }
}
