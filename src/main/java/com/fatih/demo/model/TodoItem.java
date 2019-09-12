package com.fatih.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.Instant;
import java.util.Date;

@Entity
@Table(name = "TodoItem")
public class TodoItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer item_id;

    private String name;

    private String description;

    private Boolean status;

    private Date deadline;

    private Date created_date;

    @ManyToOne
    @JoinColumn(name="list_id")
    private TodoList list;

    public TodoItem() {
    }

    public TodoItem(String name, String description, Boolean status, Date deadline, Date created_date, TodoList list) {
        this.name = name;
        this.description = description;
        this.status = status;
        this.deadline = deadline;
        this.created_date = created_date;
        this.list = list;
    }

    public Integer getItem_id() {
        return item_id;
    }

    public void setItem_id(Integer item_id) {
        this.item_id = item_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public Date getCreated_date() {
        return created_date;
    }

    public void setCreated_date(Date created_date) {
        this.created_date = created_date;
    }

    public TodoList getList() {
        return list;
    }

    public void setList(TodoList list) {
        this.list = list;
    }

}
