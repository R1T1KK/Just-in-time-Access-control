# ─── Stage 1: Build ──────────────────────────────────────────
FROM maven:3.9.8-eclipse-temurin-21 AS build

WORKDIR /app

# Copy the pom.xml
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline -B || true

# Copy the source code
COPY src/ ./src/

# Package the application
RUN mvn package -DskipTests -B

# ─── Stage 2: Runtime ────────────────────────────────────────
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Create non-root user for security
RUN addgroup -S ztvis && adduser -S ztvis -G ztvis
USER ztvis

# Copy the built jar
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
