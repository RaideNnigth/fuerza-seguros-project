existem configurações de enviroment para rodar de forma adequada

backend/.env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/fuerzaseguros
    JWT_SECRET=#Token
    JWT_SECRET_REFRESH=#Token
    EMAIL_USER=#Seu Email
    EMAIL_PASS=#App Pass
    EMAIL_SERVICE=gmail

frontend/.env
    VITE_API_URL=https://localhost:3000