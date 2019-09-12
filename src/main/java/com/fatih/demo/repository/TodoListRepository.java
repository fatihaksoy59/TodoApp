package com.fatih.demo.repository;

import com.fatih.demo.model.TodoList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TodoListRepository extends JpaRepository<TodoList,Integer> {

    @Query("SELECT i FROM TodoList i WHERE i.user.user_id=?1")
    List<TodoList> findByUser_id(Integer list_id);
}
