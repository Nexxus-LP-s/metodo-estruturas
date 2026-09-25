# Método — Landing Page de Sistemas de Armazenagem

Landing page B2B de geração de leads da **Método Móveis e Sistemas de Armazenagem**.
Site estático: HTML, CSS e JavaScript puros, sem dependências nem build.

## Estrutura

```
metodo-landing/
├── index.html                 Página principal
├── favicon.ico
├── .nojekyll                  Faz o GitHub Pages servir os arquivos como estão
├── css/
│   └── style.css              Estilos, tokens da marca, responsivo e animações
├── js/
│   └── main.js                Menu, navegação ativa, formulário e animações
├── assets/
│   ├── favicon/               favicon-32, favicon-192, apple-touch-icon
│   └── img/
│       ├── hero-galpao.jpg          Fundo do hero (desktop)
│       ├── hero-galpao-mobile.jpg   Fundo do hero (celular)
│       ├── logo-metodo-azul.png / logo-metodo-branco.png
│       ├── sistemas/          6 imagens dos sistemas de armazenagem
│       └── cases/             3 fotos dos cases
```

## Publicar no GitHub Pages

1. Crie um repositório no GitHub (ex.: `metodo-landing`).
2. Envie **o conteúdo desta pasta** para a raiz do repositório
   (`index.html` precisa ficar na raiz). Pelo site do GitHub: *Add file → Upload files*
   e arraste todas as pastas e arquivos.
3. Vá em **Settings → Pages**.
4. Em *Build and deployment*, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)` e salve.
5. Em 1–2 minutos o site estará em `https://SEU-USUARIO.github.io/metodo-landing/`.

**Domínio próprio (opcional):** em *Settings → Pages → Custom domain*, informe o domínio
(ex.: `armazenagem.metodo.ind.br`) e crie no DNS um registro CNAME apontando para
`SEU-USUARIO.github.io`.

Para testar localmente: abra a pasta no terminal e rode `python3 -m http.server`,
depois acesse `http://localhost:8000`.

## Formulário de leads

O GitHub Pages não processa formulários. Em `js/main.js`, preencha a constante no topo:

```js
const FORM_ENDPOINT = 'https://formspree.io/f/SEU_ID';
```

Funciona com qualquer serviço que aceite `POST` em JSON: Formspree, webhook do
RD Station, HubSpot, Make/Zapier ou endpoint próprio. Campos enviados:
`nome`, `empresa`, `email`, `telefone`.
Com a constante vazia, o formulário apenas simula o envio (útil para testes).

## Onde editar

| O quê | Onde |
|---|---|
| Cores, fontes, espaçamentos | `css/style.css`, bloco `:root` no topo |
| Textos | `index.html` |
| Número do WhatsApp | `index.html`, busque por `wa.me/5519992926378` |
| Trocar imagens | substitua o arquivo em `assets/img/` mantendo o mesmo nome |

## Observações

- **Fontes:** Barlow Semi Condensed (títulos) e Source Sans 3 (texto), via Google Fonts,
  como substitutas web de Conduit ITC e Myriad Pro do manual de marca.
- **Responsivo:** testado de 360px a 1920px. Menu hambúrguer abaixo de 1100px.
- **Acessibilidade:** respeita "reduzir movimento" do sistema (desliga animações).
- **Antes de publicar, validar com a Método:** certificações citadas (ISO 9001 · Inmetro),
  "38 anos de experiência" (1987 → 2026 = 39) e autorização dos depoimentos dos clientes.
