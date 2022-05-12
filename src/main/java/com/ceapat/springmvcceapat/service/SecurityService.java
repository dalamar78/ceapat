package com.ceapat.springmvcceapat.service;

public interface SecurityService {
	 String findLoggedInUsername();

	    void autoLogin(String username, String password);
}
