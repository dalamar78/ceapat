package com.ceapat.springmvcceapat.service;

import com.ceapat.springmvcceapat.entity.User;

public interface UserService {
    void save(User user);

    User findByUsername(String username);
}
