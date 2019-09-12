package com.fatih.demo.controller;

import com.fatih.demo.model.TodoList;
import com.fatih.demo.repository.TodoItemRepository;
import com.fatih.demo.repository.TodoListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class TodoListController {

    @Autowired
    public TodoListRepository todoListRepository;

    @Autowired
    TodoItemRepository todoItemRepository;

    @GetMapping("/list")
    public List<TodoList> getLists()
    {
        return todoListRepository.findAll();
    }

    @GetMapping("/list/{id}")
    public List<TodoList> getListsByUserId(@PathVariable Integer id)
    {
        return todoListRepository.findByUser_id(id);
    }

    @PostMapping("/list")
    ResponseEntity<TodoList> createLists(@RequestBody TodoList todoList) throws URISyntaxException
    {
        TodoList result= todoListRepository.save(todoList);
        return ResponseEntity.created(new URI("/api/list"+result.getList_id())).body(result);
    }

    @DeleteMapping("/list/{id}")
    ResponseEntity<?> deleteList(@PathVariable Integer id)
    {
            todoItemRepository.deleteByList_id(id);
            todoListRepository.deleteById(id);
            return ResponseEntity.ok().build();
    }
}
