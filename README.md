Dashboard Solar - Monitoramento e Exploração de novos clientes

O obejtivo principal do projeto foi criar algo que me pudesse relembrar conceitos das tecnologias citadas abaixo e me preparar para o mercado de trabalho. Ao mesmo tempo pensei em criar algo simples, mas que pudesse gerar algum valor futuramente.

Uma aplicação Full-Stack desenvolvida para o monitoramento de geração de energia solar e prospecção ativa de clientes no setor de energias renováveis.

Arquitetura e Tecnologias

Este projeto foi construído seguindo os padrões de separação de responsabilidades (Clean Code / SOLID) e arquitetura MVC, dividindo a aplicação em dois ecossistemas independentes:

Front-end (Single Page Application) Angular: Construção de componentes standalone, formulários reativos e consumo de APIs via HttpClient. TypeScript & HTML/CSS: Tipagem estática para manipulação segura de dados e interface responsiva. Chart.js (ng2-charts): Renderização de gráficos dinâmicos e em tempo real para o dashboard analítico.

Back-end (API RESTful) Java & Spring Boot: Criação de rotas HTTP mapeadas (@RestController, @GetMapping, @PostMapping), injeção de dependências e servidor Apache Tomcat embutido. PostgreSQL: Banco de dados relacional em produção para persistência definitiva dos registros. JPA / Hibernate: Mapeamento Objeto-Relacional (ORM) para gerenciamento automático de tabelas e queries de forma segura.

Funcionalidades Principais

Dashboard Analítico: Monitoramento visual da energia gerada (kWh) por cada usina através de gráficos de barras reativos.
CRUD Completo: Criação, leitura, atualização (edição inline) e exclusão de clientes da base de dados.
Motor de Prospecção (Integração de Sistemas): Automação construída no back-end utilizando RestTemplate para consumir a BrasilAPI. O sistema busca CNPJs em tempo real, extrai a Razão Social e o Contato, e salva automaticamente como um "Lead Potencial".
Funil de Vendas: Conversão de "Leads" em "Clientes Ativos" com alteração de status direto no banco de dados e atualização imediata do painel de monitoramento.
