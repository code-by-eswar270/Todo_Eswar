package com.Project.backend_todo.service;

import com.Project.backend_todo.model.Todo;
import com.Project.backend_todo.model.User;
import com.Project.backend_todo.repository.TodoRepository;
import com.Project.backend_todo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    private final TodoRepository todoRepo;
    private final UserRepository userRepo;

    public TodoService(TodoRepository todoRepo, UserRepository userRepo) {
        this.todoRepo = todoRepo;
        this.userRepo = userRepo;
    }

    public Todo addTodo(String email, Todo todo) {
        User user = userRepo.findByEmail(email);
        todo.setUser(user);
        return todoRepo.save(todo);
    }

    public List<Todo> getTodosByUser(String email) {
        User user = userRepo.findByEmail(email);
        return todoRepo.findByUser(user);
    }

    public Todo updateTodo(Long id, Todo updated) {
        Todo todo = todoRepo.findById(id).orElseThrow();
        todo.setTitle(updated.getTitle());
        todo.setDescription(updated.getDescription());
        todo.setDueDate(updated.getDueDate());
        todo.setPriority(updated.getPriority());
        todo.setCompleted(updated.isCompleted());
        return todoRepo.save(todo);
    }

    public void deleteTodo(Long id) {
        todoRepo.deleteById(id);
    }
}
