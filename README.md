# Sistema seguro com Chat 

O objetivo deste projeto é criar um sistema que garante a segurança nas trocas de informações seníveis entre o cliente e atendimento. O sistema é baseado em um chat temporário *criptografado de ponta a ponta*. Dessa forma, por ser temporário, ele garante também o anonimato, o chat não associa os segredos armazenados com quem armazenou e nem com quem deve acessá-lo, apenas demonstra ser entre cliente e suporte. 
A pessoa por trás do suporte, tem o poder de gerar um *link de convite* e enviar para o cliente com uma nova sala de sessão que é registrada e controlada no banco de dados por meio de um serviço na nuvem. 

-----------------------
## Como é feito a criação de uma nova sessão da sala 

* A sala é gerada entre os dois usuários
* Quem está no atendimento gera um link para uma nova sessão, com duas chaves de acesso pública e privada que é gerado no navegador 
 
-----------------------
## Como rodar a aplicação: 

* instale [node.js](https://nodejs.org)
* clona este repositório
* execute os comandos abaixo em sua linha de comando:
    + $ npm install
    + $ node app.js
* abra seu navegador e digite a url do seu servidor (http://localhost)

-----------------------
## Referências que foram usadas

* [**Hooks.js®**] 

* [**Node.js®**] 

* [**React.js®**] 

* [**Express.js**] 

* [**Socket.io**] 

* [**Bootstrap**] 

* [**jQuery**]  

* [**Crypto.js**] 

* [**JSEncrypt**] 

-----------------------
## Roteiro

- [ ] Criar Login com autenticação de usuários
- [ ] Criar Home de acesso ao chat 
- [ ] Criar rota para Registro de usuário
- [ ] Criar rota para Gerenciamento de usuário ( nível de acesso )
- [ ] Criar rota para Chat com criptografia 
- [ ] Criar Modal para gerar links de atendimento a uma nova sessão 
- [ ] Criar Banco de dados para que possa ser controlado o armazenamento de dados na nuvem
- [ ] Criar api para deploy na Nuvem












