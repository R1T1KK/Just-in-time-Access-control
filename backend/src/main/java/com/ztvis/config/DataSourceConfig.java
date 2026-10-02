package com.ztvis.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.jdbc.DataSourceBuilder;
import javax.sql.DataSource;

@Configuration
public class DataSourceConfig {

    @Bean
    public DataSource dataSource() {
        String dbUrl = System.getenv("DATABASE_URL");
        if (dbUrl != null) {
            if (dbUrl.startsWith("postgres://")) {
                dbUrl = dbUrl.replace("postgres://", "jdbc:postgresql://");
            } else if (dbUrl.startsWith("postgresql://")) {
                dbUrl = dbUrl.replace("postgresql://", "jdbc:postgresql://");
            }
        } else {
            // Local development fallback
            dbUrl = System.getenv("SPRING_DATASOURCE_URL");
            if (dbUrl == null) {
                dbUrl = "jdbc:postgresql://localhost:5432/ztvis_db";
            }
        }
        
        String username = System.getenv("DB_USERNAME");
        if (username == null) {
            username = System.getenv("SPRING_DATASOURCE_USERNAME");
            if (username == null) username = "ztvis_user";
        }
        
        String password = System.getenv("DB_PASSWORD");
        if (password == null) {
            password = System.getenv("SPRING_DATASOURCE_PASSWORD");
            if (password == null) password = "ztvis_pass";
        }

        return DataSourceBuilder.create()
                .url(dbUrl)
                .username(username)
                .password(password)
                .driverClassName("org.postgresql.Driver")
                .build();
    }
}
