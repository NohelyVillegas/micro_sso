package com.espe.micro_usuarios.models;

public class LoginRequest {
    private String user;
    private String pw;

    // Getters y Setters
    public String getUser() { return user; }
    public void setUser(String user) { this.user = user; }

    public String getPw() { return pw; }
    public void setPw(String pw) { this.pw = pw; }
}
