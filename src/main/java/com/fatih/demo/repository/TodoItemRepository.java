package com.fatih.demo.repository;

import com.fatih.demo.model.TodoItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface TodoItemRepository extends JpaRepository<TodoItem,Integer> {

    @Query("SELECT i FROM TodoItem i WHERE i.list.list_id=?1")
    List<TodoItem> findByList_id(Integer list_id);

    @Transactional
    @Modifying
    @Query("DELETE FROM TodoItem i WHERE i.list.list_id=?1")
    void deleteByList_id(Integer list_id);
}
