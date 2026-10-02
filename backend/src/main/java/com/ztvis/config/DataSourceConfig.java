package com.ztvis.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.jdbc.DataSourceBuilder;
import javax.sql.DataSource;
import java.net.URI;

@Configuration
public class DataSourceConfig {

    @Bean
    public DataSource dataSource() {
        String databaseUrl = System.getenv("DATABASE_URL");

        if (databaseUrl != null && (databaseUrl.startsWith("postgres://") || databaseUrl.startsWith("postgresql://"))) {
            // Parse Render's DATABASE_URL format:
            // postgresql://user:password@host:port/dbname
            try {
                // Normalize to a parseable URI
                String uriStr = databaseUrl;
                if (uriStr.startsWith("postgres://")) {
                    uriStr = "postgresql://" + uriStr.substring("postgres://".length());
                }
                
                URI uri = new URI(uriStr);
                String host = uri.getHost();
                int port = uri.getPort() == -1 ? 5432 : uri.getPort();
                String path = uri.getPath(); // e.g. /ztvis_db
                String userInfo = uri.getUserInfo(); // e.g. ztvis_user:password
                
                String jdbcUrl = "jdbc:postgresql://" + host + ":" + port + path;
                String username = "ztvis_user";
                String password = "ztvis_pass";
                
                if (userInfo != null && userInfo.contains(":")) {
                    String[] parts = userInfo.split(":", 2);
                    username = parts[0];
                    password = parts[1];
                }
                
                return DataSourceBuilder.create()
                        .url(jdbcUrl)
                        .username(username)
                        .password(password)
                        .driverClassName("org.postgresql.Driver")
                        .build();
            } catch (Exception e) {
                throw new RuntimeException("Failed to parse DATABASE_URL: " + databaseUrl, e);
            }
        }

        // Local development fallback
        String jdbcUrl = System.getenv("SPRING_DATASOURCE_URL");
        if (jdbcUrl == null) jdbcUrl = "jdbc:postgresql://localhost:5432/ztvis_db";
        
        String username = System.getenv("SPRING_DATASOURCE_USERNAME");
        if (username == null) username = "ztvis_user";
        
        String password = System.getenv("SPRING_DATASOURCE_PASSWORD");
        if (password == null) password = "ztvis_pass";

        return DataSourceBuilder.create()
                .url(jdbcUrl)
                .username(username)
                .password(password)
                .driverClassName("org.postgresql.Driver")
                .build();
    }
}
