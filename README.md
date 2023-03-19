# Labeddit Back End
![Badge Finalizado](http://img.shields.io/static/v1?label=STATUS&message=FINALIZADO&color=RED&style=for-the-badge)

## Índice

* [Introdução](#introdução)
* [Repositorio do Front End](#repositório-front-end)
* [Tecnologias utilizadas](#tecnologias-utilizadas)
* [Funcionabilidades do Projeto](#funcionabilidades-do-projeto)
* [Aplicações utilizadas](#aplicações-utilizadas)
* [Documentação](#documentação)
* [Rodando o projeto](#rodando-o-projeto)

## Introdução
- Projeto do back end de uma rede social.

## Repositório Front End
- Repositório do front end do Labeddit: 
https://github.com/paulajardimf/labeddit-frontend

## Tecnologias utilizadas

1. ``Node.js``
2. ``Typescript.js``
3. ``Knex``
4. ``Express``
5. ``SQLite``
6. ``Jest``

## Funcionabilidades do Projeto

- [x] Signup:
- id;
- name;
- email;
- password;
- role.

- [x] Login:
- email;
- password.
<br>

- [x] Create Post:
- id;
- content;
- likes;
- dislikes;
- createdAt;
- updatedAt;
- creator {
  id;
  name.
}
<br>

- [x] Like or Dislike Post:
<br>

- [x] Create Comment:
- id;
- postId;
- content;
- likes;
- dislikes;
- createdAt;
- updatedAt;
- creatorId;
- creatorName.
<br>

- [x] Like or Dislike Comment:
<br>

![imagem bd](./labeddit.png)
 
## Aplicações utilizadas
- Postman
- Render

## Documentação
https://documenter.getpostman.com/view/24460767/2s93JzMgNf

## Rodando o projeto
- Rode o console na pasta em que você baixou os arquivos;

- Insira o comando ``npm install``;

- Depois, o comando ``npm run dev`` para rodar na porta 3003.
