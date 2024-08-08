# ✂️ Encurtador de URLs

Um projeto que permite aos usuários encurtar URLs longas. Esta projeto da a possíbilidade de criar links curtos, obter informações de links encurtados e redirecionar links encurtadas para sua URL original.



## 📖 FRONT-END

#### Executar a aplicação
```bash
# Instale as dependências
$ npm install

# Faça a build da projeto
$ npm run build

# Inicie a projeto
$ npm start
```

---

![Imagem do projeto](https://i.imgur.com/jYTZqXk.png)

### Tecnologias usadas no projeto
- Next.JS
- TypeScript
- React Hook Form
- Zod



## 📖 BACK-END

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

Acesse a documentação do [Back-end](https://encurtador-api.onrender.com/docs)

### Tecnologias usadas no projeto
- Node.JS
- Nest.JS
- MongoDB
- TypeORM
- Swagger
- Jest
- Prettier / ESLint
- Docker
