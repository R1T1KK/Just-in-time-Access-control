# ─── Stage 1: Build ──────────────────────────────────────────
FROM maven:3.9.8-eclipse-temurin-21 AS build

WORKDIR /app

# Cache dependency layer separately
COPY backend/pom.xml .
RUN mvn dependency:go-offline -B || true

COPY backend/src ./src
RUN mvn package -DskipTests -B

# ─── Stage 2: Runtime ────────────────────────────────────────
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Create non-root user for security (Zero-Trust principle)
RUN addgroup -S ztvis && adduser -S ztvis -G ztvis
USER ztvis

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
