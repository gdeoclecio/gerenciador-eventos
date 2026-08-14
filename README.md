# Gerenciador de Eventos

Projeto desenvolvido para o **Processo seletivo Neki - Gerenciador de Eventos**, com o objetivo de criar uma aplicação completa para cadastro e gerenciamento de eventos.

A aplicação é composta por:

- Backend desenvolvido com Spring Boot
- Frontend Web desenvolvido com React
- Aplicação Mobile desenvolvida com React Native e Expo
- Autenticação utilizando JWT
- Banco de dados PostgreSQL
- Documentação da API com Swagger/OpenAPI

## Funcionalidades

### Administrador

- Cadastro de administrador
- Validação de confirmação de senha
- Senha armazenada de forma criptografada
- Login utilizando email e senha
- Autenticação através de JWT
- Opção de gravar email e senha para facilitar acessos futuros
- Opção para visualizar ou ocultar a senha
- Logout

### Eventos

O administrador autenticado pode:

- Visualizar seus eventos
- Cadastrar novos eventos
- Informar nome, data, localização e imagem
- Editar data e localização
- Excluir eventos
- Visualizar imagem, título, data e localização de cada evento

Cada administrador possui acesso apenas aos seus próprios eventos.

## Estrutura do Projeto

gerenciador-eventos/
├── backend/
│   └── gerenciador-eventos/
├── frontend/
├── mobile/
└── README.md


## Tecnologias Utilizadas

### Backend

- Java 25
- Spring Boot 4.1.0
- Spring Web MVC
- Spring Data JPA
- Spring Security
- OAuth2 Resource Server
- JWT
- Bean Validation
- PostgreSQL
- Maven
- Springdoc OpenAPI / Swagger

### Frontend Web

- React 19
- TypeScript
- Vite
- React Router
- Axios
- Lucide React
- CSS

### Mobile

- React Native
- Expo 54
- TypeScript
- React Navigation
- Axios
- AsyncStorage
- Expo Vector Icons
- Safe Area Context

## Pré-requisitos

Para executar o projeto, é necessário possuir:

- Java 25
- PostgreSQL
- Node.js
- npm
- Expo Go, caso o mobile seja executado em um dispositivo físico

## Configuração do Banco de Dados

Crie um banco PostgreSQL para a aplicação.

Exemplo SQL:

CREATE DATABASE gerenciador_eventos;


As tabelas são gerenciadas pelo Hibernate através da configuração properties:

spring.jpa.hibernate.ddl-auto=update


## Configuração do Backend

O backend utiliza variáveis de ambiente para impedir que credenciais e segredos sejam armazenados no repositório.

As seguintes variáveis devem ser configuradas:


DB_URL

DB_USERNAME

DB_PASSWORD

JWT_SECRET


Exemplo de valores:

DB_URL=jdbc:postgresql://localhost:5432/gerenciador_eventos

DB_USERNAME=postgres

DB_PASSWORD=sua_senha

JWT_SECRET=seu_segredo_jwt


> Não utilize o exemplo de `JWT_SECRET` em produção. Configure um segredo próprio e seguro.

O arquivo `application.properties` utiliza essas variáveis:


spring.datasource.url=${DB_URL}

spring.datasource.username=${DB_USERNAME}

spring.datasource.password=${DB_PASSWORD}

jwt.secret=${JWT_SECRET}


### Executando o Backend

Acesse:

cd backend/gerenciador-eventos


No Windows:

mvnw.cmd spring-boot:run


Em Linux/macOS:

./mvnw spring-boot:run


A API será iniciada por padrão em:


http://localhost:8080


## Documentação da API

Com o backend em execução, a documentação Swagger pode ser acessada em:

http://localhost:8080/swagger-ui/index.html


O projeto utiliza **Springdoc OpenAPI** para disponibilização da documentação Swagger.

Embora o enunciado original mencione Spring Fox, foi utilizado Springdoc por sua compatibilidade com a versão atual do Spring Boot utilizada no projeto.

## Executando o Frontend Web

Acesse a pasta:


cd frontend


Instale as dependências:

npm install


Execute:

npm run dev


O endereço exibido pelo Vite no terminal poderá ser utilizado para acessar a aplicação.

A API utilizada pelo frontend está configurada em:


frontend/src/services/api.ts


Por padrão:

http://localhost:8080


## Executando o Mobile

Acesse:

cd mobile


Instale as dependências:

npm install


Inicie o Expo:

npm start

ou:

npx expo start


Depois, utilize o Expo Go ou um emulador para executar a aplicação.

### Configuração da API no dispositivo físico

Ao utilizar um celular físico, `localhost` apontaria para o próprio celular e não para o computador que está executando o backend.

Por isso, configure em:


mobile/src/services/api.ts


o endereço IP local do computador onde o backend está sendo executado.

Exemplo:


const API_URL = "http://192.168.0.X:8080";


O computador e o dispositivo móvel devem estar acessíveis pela mesma rede local.

## Autenticação e Segurança

Após o login, a API gera um token JWT utilizado para acessar os serviços protegidos.

As senhas dos administradores são armazenadas de forma criptografada.

Além disso, os eventos são associados ao administrador autenticado. A identificação do administrador nas operações protegidas é realizada a partir do token JWT, evitando que o cliente possa simplesmente informar o ID de outro administrador para acessar seus eventos.

O cadastro de administrador e o login permanecem públicos para permitir a criação e o acesso inicial à conta. As operações protegidas da aplicação exigem autenticação.

## Fluxo da Aplicação

```text
Cadastro
   ↓
Login
   ↓
Token JWT
   ↓
Home
   ↓
Listagem dos eventos do administrador
   ↓
Adicionar / Editar / Excluir
```

## API REST

O backend disponibiliza serviços para:

- autenticação do administrador;
- cadastro de administrador;
- listagem dos eventos;
- cadastro de evento;
- atualização de evento;
- exclusão de evento.

As operações protegidas utilizam o token JWT enviado nas requisições.

## Observações

O projeto possui versões **Web e Mobile**, ambas consumindo a mesma API Spring Boot.

A aplicação foi desenvolvida buscando separar responsabilidades entre controllers, services, repositories, DTOs e entidades no backend, além de componentes, telas e serviços de comunicação com a API nos clientes.

---

Desenvolvido para o **Desafio processo seletivo Neki - Gerenciador de Eventos**.
