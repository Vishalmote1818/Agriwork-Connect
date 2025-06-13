package com.agriworkconnect.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebSecurityConfig {

  private final JwtRequestFilter jwtRequestFilter;

  public WebSecurityConfig(JwtRequestFilter jwtRequestFilter) {
    this.jwtRequestFilter = jwtRequestFilter;
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
    return authenticationConfiguration.getAuthenticationManager();
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
      .csrf().disable()  // Disable CSRF for APIs
      .cors().and()
      .authorizeRequests()
      .antMatchers(
        "/api/routes/**",
        "/api/users/login",
        "/api/users/register",
        "/api/employees/register",
        "/api/employees/login",
        "/api/vehicles/register",
        "/api/vehicles/login",
        "/deleteWork",
        "/listAllWorks",
        "/createWork",
        "/updateWork",
        "/deleteDriver1",
        "/listAllDriver1",
        "/createDriver1",
        "/updateDriver1",
        "/deleteWorkAllocation",
        "/listAllWorkAllocations",
        "/createWorkAllocation",
        "/updateWorkAllocation"
      ).permitAll()
      .antMatchers("/api/admins/**").hasRole("ADMIN")
      .antMatchers("/api/users/**").hasRole("USER")
      .antMatchers("/api/employees/**").hasRole("EMPLOYEE")
      .antMatchers("/api/vehicles/**").hasRole("VEHICLE")
      .anyRequest().authenticated()
      .and()
      .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    // Add JWT filter
    http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }






}
