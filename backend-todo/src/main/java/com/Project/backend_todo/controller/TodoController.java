package com.Project.backend_todo.controller;

import com.Project.backend_todo.model.Todo;
import com.Project.backend_todo.request.UpdateTodoRequest;
import com.Project.backend_todo.service.TodoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    // Add a new todo
    @PostMapping
    public Todo addTodo(@RequestParam String userEmail, @RequestBody Todo todo) {
        return todoService.addTodo(userEmail, todo);
    }

    // Get todos by user
    @GetMapping("/user/{email}")
    public List<Todo> getUserTodos(@PathVariable String email) {
        return todoService.getTodosByUser(email);
    }

    // Update todo
    @PutMapping("/{id}")
    public Todo updateTodo(@PathVariable Long id, @RequestBody UpdateTodoRequest req) {
        Todo updated = new Todo();
        updated.setTitle(req.getTitle());
        updated.setDescription(req.getDescription());
        updated.setDueDate(req.getDueDate());
        updated.setPriority(req.getPriority());
        updated.setCompleted(req.isCompleted());

        return todoService.updateTodo(id, updated);
    }

    // Delete todo
    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
    }
}
