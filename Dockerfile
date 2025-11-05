FROM node:25
WORKDIR /api
COPY ["./package.json", "./package-lock.json", "./knexfile.js", "./"]
RUN npm ci
EXPOSE 3000