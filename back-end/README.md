# Encurtador de URLs

#### Executar a aplicação com o Docker

```bash
# Executar em ambiente de desenvolvimento
$ npm run docker:dev

# Executar em ambiente produção
$ docker build -t <app-name> . && docker run -p <port>:<port> -d <app-name>
```

#### Executar a aplicação sem o Docker
```bash
# Modo de desenvolvimento
$ npm run start

# Modo de observação
$ npm run start:dev

# Modo de produção
$ npm run start:prod
```

#### Executar os teste
```bash
# Rodar os testes unitários
$ npm run test
```

---

![Imagem do projeto](https://i.imgur.com/RbSN8Ji.png)

Acesse também o repositório do [Front-end](#)  
Acesse a documentação do [Back-end](https://encurtador-api.onrender.com/docs)

### 📝 Sobre o projeto
Uma API para encurtar links que permite aos usuários encurtar URLs longas. Esta API oferece endpoints para criar links curtos, obter informações links encurtados e redirecionar links encurtadas para sua URL original.

### Tecnologias usadas no projeto
- Node.JS
- Nest.JS
- MongoDB
- TypeORM
- Swagger
- Jest
- Prettier / ESLint
- Docker