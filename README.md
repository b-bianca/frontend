# Hubla Challenge Frontend

## Sumário
- [Sobre](#sobre)
- [Requisitos](#requisitos)
- [O que esse projeto faz e possui](#o-que-esse-projeto-faz-e-possui)
- [O que esse projeto não faz e débitos técnicos](#o-que-esse-projeto-não-faz-e-débitos-técnicos)
- [Como Executar o Projeto](#como-executar-o-projeto)
  - [Executar o Docker](#executar-o-docker)


## Sobre
Este projeto visa simular uma plataforma que trabalha com o modelo criador-afiliado. É necessário construir uma interface web que possibilite o upload de um arquivo de transações de produtos vendidos, normalizar os dados e armazená-los em um
banco de dados relacional.

## Requisitos

|Recurso|Versão|Obrigatório|Nota|
|-|-|-|-|
|Docker Desktop| 4.21 ou mais atual|Sim|Necessário para rodar containers da API e banco de dados|
|Node| 18.18.0|Não|Necessário apenas no caso de rodar localmente sem container|

## O que esse projeto faz e possui
### O que esse projeto faz
Através da API é possível fazer o upload de um arquivo. Este arquivo é normalizado e seus dados enviados para o banco de dados.
Com as informações salvas no banco de dados pode-se verificar os ultimos dados enviados através de um query-param, ou retornar todos os dados registrados. Além disso, é possível verificar o número de vendas realizadas e os saldos finais tanto do produtor quanto do afiliado.

#### O que esse projeto possui
 - [x] Dockerfile e DockerCompose

## O que esse projeto não faz e débitos técnicos

#### Débitos técnicos
- [ ] Remoção paramêtros *hard coded*, como portas das aplicações
- [ ] Testes
- [ ] Componetização total do código

## Como executar o projeto
### Executar o projeto
Para executar o projeto, é necessário ter o `Docker Desktop` instalado. Com isso será possível criar as instancias usando o comando `docker compose` via IDE ou linha de comando conforme a seguir:
~~~bash
docker compose -f "docker-compose.yml" up -d --build
~~~
Notas: o comando deve ser efetuado na pasta raiz do projeto, dentro da pasta frontend