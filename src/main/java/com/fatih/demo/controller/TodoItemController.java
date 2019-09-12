package com.fatih.demo.controller;

import com.fatih.demo.model.TodoItem;
import com.fatih.demo.repository.TodoItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TodoItemController {
    @Autowired
    TodoItemRepository todoItemRepository;

    @GetMapping("/item")
    public List<TodoItem> getLists()
    {

        return todoItemRepository.findAll();
    }

    @GetMapping("/item/{id}")
    public List<TodoItem> getItemsByListId(@PathVariable Integer id)
    {
        List<TodoItem> list =todoItemRepository.findByList_id(id);
        return list;
    }

    @PostMapping("/item")
    ResponseEntity<TodoItem> createLists(@RequestBody TodoItem todoItem) throws URISyntaxException
    {
        TodoItem result= todoItemRepository.save(todoItem);
        return ResponseEntity.created(new URI("/api/item"+result.getItem_id())).body(result);
    }

    @DeleteMapping("/item/{id}")
    ResponseEntity<?> deleteItem(@PathVariable Integer id)
    {
        todoItemRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/item")
    ResponseEntity<?> updateItem(@RequestBody TodoItem todoItem)
    {
        if(todoItem.getStatus().equals(true))
            todoItem.setStatus(false);
        else
            todoItem.setStatus(true);
        todoItemRepository.save(todoItem);
        return ResponseEntity.ok().build();
    }


}
