package com.Project.backend_todo.repository;

import com.Project.backend_todo.model.Todo;
import com.Project.backend_todo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByUser(User user);
}
