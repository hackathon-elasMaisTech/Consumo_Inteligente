# PROJETO DE CONCLUSÃO DE CURSO

## Lumi

**Tema:** Sistema Inteligente de Análise de Perfil Financeiro, Consumo e Geração de Insights. 

**Sub-Tema:** Consumo Inteligente (Consumer Insight Intelligence). 

Este Projeto de Conclusão de Curso faz parte do Hackathon Elas + Tech, tendo como principal objetivo aplicar na prática os conhecimentos adquiridos ao longo da trilha de desenvolvimento Front-End com JavaScript.

O projeto foi desenvolvido com foco na consolidação dos conteúdos estudados durante a formação, envolvendo conceitos de lógica de programação, manipulação de dados, desenvolvimento de interfaces responsivas, componentização com React, consumo de APIs e gerenciamento de estado da aplicação.

Além da aplicação técnica dos conhecimentos, o projeto também busca estimular o trabalho em equipe, a resolução de problemas e a criação de soluções tecnológicas voltadas para situações reais do cotidiano.

## Objetivo do projeto
O projeto lumi foi desenvolvido com o objetivo de auxiliar usuários no controle financeiro pessoal de maneira simples, intuitiva e visual.

**A aplicação permite:**

- Cadastro de receitas e despesas;
- Visualização do saldo financeiro;
- Organização por categorias;
- Geração de insights financeiros;
- Interface responsiva;
- Alternância entre tema claro e escuro;
- Autenticação fictícia de usuário;
- Persistência de sessão utilizando LocalStorage.

O principal foco do projeto é proporcionar uma experiência moderna de gestão financeira, utilizando tecnologias Front-End com React.


## Arquitetura da Solução 
A aplicação foi construída utilizando uma arquitetura baseada em componentes com React, promovendo reutilização de código, organização e facilidade de manutenção.

**Tecnologias Utilizadas**
- React.js
- Vite
- React Router DOM
- CSS Modules
- Context API
- LocalStorage
- JavaScript ES6+


**Estrutura de Pastas**

<img width="600" height="700" alt="image" src="https://github.com/user-attachments/assets/12fbac99-b481-4e11-b152-1e022a59b683" />


## Fluxo da Aplicação 

Fluxo Principal

<img width="500" height="700" alt="image" src="https://github.com/user-attachments/assets/a5727fe3-5157-4fe7-bb0c-6c5181e5b214" />



## Evidências Técnicas 

### Prints do Código (Lógica JavaScript)

Os prints exibidos abaixo representam apenas algumas partes do código-fonte, considerando que o projeto possui trechos extensos e mais complexos. A inclusão de todos os prints poderia comprometer a organização e a visualização do documento.
Para uma análise mais detalhada do código, recomenda-se consultar o repositório oficial no GitHub ou acessar o projeto hospedado.


Lógica API.JS: 
Este módulo é responsável pela comunicação entre a aplicação e a API MockAPI. Nele foram implementadas as operações de CRUD utilizando fetch e async/await, permitindo buscar, criar, atualizar e remover consumos. Também foram aplicados tratamentos de erro com try/catch e validação das respostas da API, garantindo maior estabilidade e evitando falhas na aplicação.

<img width="1365" height="721" alt="image" src="https://github.com/user-attachments/assets/1a322a36-388b-4efc-bc8a-b9dc4779008d" />
<img width="1365" height="722" alt="image" src="https://github.com/user-attachments/assets/a7fc4f33-e3f0-493a-b76b-319ad40ed4c0" />
<img width="1365" height="717" alt="image" src="https://github.com/user-attachments/assets/f8455949-8b3c-4ff4-979f-269773141e83" />

Lógica formatadorMoedas.js:
É responsável por formatar valores numéricos para o padrão monetário brasileiro utilizando a API Intl.NumberFormat. Dessa forma, os valores são exibidos no formato de moeda Real (R$), garantindo melhor visualização e padronização das informações financeiras na aplicação. 

<img width="1365" height="720" alt="image" src="https://github.com/user-attachments/assets/a991716d-2ed8-4124-99ad-47359f3d9a1c" />

Lógica analisePerfil.js:
Este módulo é responsável por analisar o perfil financeiro do usuário com base na regra financeira 50/30/20. A lógica calcula os totais gastos em categorias fixas, flexíveis e investimentos, compara os valores com os limites definidos e gera insights e recomendações personalizadas sobre o controle financeiro. Além disso, o sistema calcula percentuais, saldo restante e identifica possíveis excessos ou oportunidades de melhoria no orçamento do usuário. 

<img width="1365" height="715" alt="image" src="https://github.com/user-attachments/assets/42400647-297a-46af-af99-22aa2aaffc2e" />

Lógica analiseConsumo.js:
Este módulo é responsável por analisar os dados de consumo do usuário. A lógica separa receitas e despesas, calcula os gastos por categoria, o total geral, percentuais de consumo e o saldo restante. Além disso, organiza as categorias por maior gasto e utiliza a função de análise de perfil financeiro para gerar insights, recomendações e o resumo da regra financeira 50/30/20, auxiliando no acompanhamento e controle do orçamento. 

<img width="1365" height="719" alt="image" src="https://github.com/user-attachments/assets/5d24e44a-9aee-48e0-b4e2-c9acacea5779" />

Lógica authStorage.js:
Este módulo é responsável pelo gerenciamento de usuários da aplicação utilizando o localStorage. A lógica permite armazenar usuários de demonstração, realizar autenticação de login, validar credenciais e cadastrar novos usuários. Também são feitas validações para evitar e-mails duplicados e gerar um token fictício de autenticação, simulando o funcionamento básico de um sistema de login e cadastro. 

<img width="1365" height="719" alt="image" src="https://github.com/user-attachments/assets/1197b9e5-e595-404e-8641-dda30de68660" />


## Estrutura dos Dados

### Print json utilizado 
Os prints apresentados abaixo demonstram a estrutura dos dados JSON utilizados na aplicação, disponibilizados por meio da MockAPI.
Para uma visualização mais detalhada da estrutura e dos dados utilizados no projeto, consulte a URL abaixo:
MockAPI do Projeto lumi

<img width="884" height="632" alt="image" src="https://github.com/user-attachments/assets/449e184e-e543-4413-89da-cbc400946c0e" />
<img width="628" height="636" alt="image" src="https://github.com/user-attachments/assets/7efd0cf1-d8cf-4a3b-89c5-b181bfff6693" />


## Interface da Aplicação

### Funcionalidades da Interface
- Tela de Login;
- Tela de Cadastro;
- Dashboard Financeiro;
- Modal de Nova Transação;
- Tema Claro/Escuro;
- Avatar com inicial do usuário;
- Insights financeiros;
- Resumo financeiro;
- Responsividade para dispositivos móveis.



##  Prints da Aplicação React

Tela de Login 
<img width="1365" height="637" alt="image" src="https://github.com/user-attachments/assets/6325e5ef-d072-410f-b2cf-f77c54ab722d" />

Tela de Cadastro
<img width="1365" height="639" alt="image" src="https://github.com/user-attachments/assets/e4791709-279f-4875-9675-9ff577dbe39e" />

Dashboard Principal
<img width="1365" height="634" alt="image" src="https://github.com/user-attachments/assets/2bff239a-3b62-4f28-bbb1-004ba2eb72f2" />

<img width="1365" height="637" alt="image" src="https://github.com/user-attachments/assets/28fa80fb-bd96-49e9-9f31-0cadd22e9c87" />

<img width="1365" height="636" alt="image" src="https://github.com/user-attachments/assets/0000c619-c3ec-4d0e-85dd-8bf59e01e787" />


Modal de Cadastro de Transação

<img width="1365" height="630" alt="image" src="https://github.com/user-attachments/assets/19c50e12-f96f-4094-b3b7-f0439cb6197f" />
<img width="1363" height="635" alt="image" src="https://github.com/user-attachments/assets/10e471a0-51b9-419e-b100-413c3caa274e" />


Responsividade Mobile

<img width="820" height="637" alt="image" src="https://github.com/user-attachments/assets/25ee7d98-d267-43be-bb42-62f90ad2a6ad" />
<img width="818" height="636" alt="image" src="https://github.com/user-attachments/assets/04a92269-226d-475e-9735-219e1c98fbf5" />
<img width="822" height="641" alt="image" src="https://github.com/user-attachments/assets/84cf3b94-671b-4c65-b232-303dd54cf5ce" />



## Demonstração do Fluxo de Dados

  <img width="500" height="700" alt="image" src="https://github.com/user-attachments/assets/227de90d-516f-453b-9624-512e38599ffe" />




## Link do Projeto

[Repositório do Projeto](https://github.com/hackathon-elasMaisTech/Consumo_Inteligente)

[Projeto Hospedado](https://hackathon-elasmaistech.github.io/Consumo_Inteligente/)




## Conclusão 
O projeto lumi permitiu aplicar conceitos fundamentais do desenvolvimento Front-End moderno utilizando React.

Durante o desenvolvimento, foram trabalhados os seguintes conceitos:

- Componentização;
- Gerenciamento de estado;
- Context API;
- Persistência local;
- Responsividade;
- Consumo e manipulação de dados;
- Organização da arquitetura React;
- Trabalho colaborativo com Git e GitHub.

O sistema foi desenvolvido com foco na experiência do usuário, na organização visual e na facilidade de manutenção do código.


## Integrantes do grupo: 

- Alessandra Cerqueira de Santana
- Gabrielly Sousa Santos
- Lara Alves de Freitas
- Tamires Silva

