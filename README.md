# 📅 Agendamento API

API REST desenvolvida em Java com Spring Boot para gerenciamento de agendamentos.

Este projeto foi construído com foco em boas práticas de arquitetura em camadas, segurança, organização de código e versionamento profissional, simulando um ambiente real de desenvolvimento backend.

---

## 🚀 Tecnologias Utilizadas

- Java 17+
- Spring Boot
- Spring Web
- Spring Data JPA
- PostgreSQL
- Maven
- IntelliJ IDEA
- Git & GitHub

---

## 🏗️ Arquitetura

O projeto segue arquitetura em camadas:


controller → service → repository → database


Separação clara de responsabilidades:

- **Controller** → Camada de entrada (HTTP / JSON)
- **Service** → Regras de negócio
- **Repository** → Acesso a dados
- **DTO** → Transferência segura de dados
- **Entity** → Representação da tabela no banco

---

## 🔐 Boas Práticas Aplicadas

- Injeção de dependência via construtor
- Uso de `final` para imutabilidade
- Separação entre Entity e DTO
- Versionamento com commits semânticos
- Estrutura limpa e organizada
- Preparação para tratamento global de exceções
- Projeto preparado para expansão com autenticação futura

---

## 📌 Funcionalidades

- Criar agendamento
- Listar agendamentos
- Buscar agendamento por ID
- Atualizar agendamento
- Deletar agendamento

*(As funcionalidades serão evoluídas conforme o projeto avança.)*

---

## 🗄️ Banco de Dados

Banco utilizado:

PostgreSQL


A aplicação utiliza JPA/Hibernate para mapeamento objeto-relacional.

---

## ▶️ Como Executar o Projeto

git clone https://github.com/IsraelMadeira/agendamento-api.git 

2️⃣ Configurar o banco PostgreSQL

Criar um banco e ajustar as configurações no:

application.properties

3️⃣ Executar o projeto

Via IntelliJ ou:

mvn spring-boot:run

📡 Endpoints

Base URL: http://localhost:8080/agendamentos

| Método | Endpoint           | Descrição    |
| ------ | ------------------ | ------------ |
| GET    | /agendamentos      | Lista todos  |
| GET    | /agendamentos/{id} | Busca por ID |
| POST   | /agendamentos      | Cria novo    |
| PUT    | /agendamentos/{id} | Atualiza     |
| DELETE | /agendamentos/{id} | Remove       |

🎯 Objetivo do Projeto

Este projeto faz parte do meu portfólio como desenvolvedor backend Java, com foco em:

Construção de APIs REST

Boas práticas de arquitetura

Segurança na exposição de dados

Evolução incremental com versionamento limpo

👨‍💻 Autor

Israel Madeira

Desenvolvedor Backend em evolução constante 🚀

GitHub: https://github.com/IsraelMadeira
