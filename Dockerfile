FROM beeware/webhost-aspnetcore:latest
COPY . /app/wwwroot
WORKDIR /app
EXPOSE 80