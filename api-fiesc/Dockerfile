# Usa imagem leve com JDK 17
FROM openjdk:17-jdk-slim

# Define o diretório de trabalho
WORKDIR /app

# Copia o JAR gerado pelo Maven para dentro do container
COPY target/api-fiesc-0.0.1-SNAPSHOT.jar app.jar

# Expõe a porta usada pela aplicação Spring Boot
EXPOSE 8080

# Comando de entrada
ENTRYPOINT ["java", "-jar", "app.jar"]
