# Koytech — Website Institucional

> Site institucional da **Koytech**, empresa de soluções digitais. Projeto construído do zero com foco em performance, acessibilidade, conformidade com a LGPD e experiência premium ao usuário.

🔗 **[koytech.com.br](https://koytech.com.br)**

---

## Visão Geral

Site de página única (SPA-like) desenvolvido em **HTML5, CSS3 e JavaScript puro**, sem frameworks ou dependências de terceiros no core. A escolha por vanilla stack foi intencional: máxima performance, zero overhead de bundle e controle total sobre cada interação.

---

## Funcionalidades & Técnicas Implementadas

### Animações & Interatividade
- **Custom cursor** com efeito de trail suavizado via `requestAnimationFrame` e interpolação linear
- **Particle field** em Canvas 2D com sistema de partículas e conexões dinâmicas entre pontos próximos
- **Typewriter effect** com ciclo de digitação/deleção e timing controlado por closure
- **3D tilt cards** usando transformações CSS 3D via `mousemove` com cálculo de perspectiva (`rotateX/Y`)
- **Magnetic buttons** com deslocamento proporcional à distância do cursor
- **Scroll progress bar** atualizada passivamente via `{ passive: true }`
- **Counter animation** com easing cúbico (`easeOutCubic`) via `requestAnimationFrame`
- **Timeline line animation** controlada por `IntersectionObserver`
- **Chart bar animation** com `scaleY` e `cubic-bezier` personalizado
- **Glassmorphism navbar** com `backdrop-filter: blur` ativado no scroll

### Performance
- Zero dependências JavaScript externas
- Scroll listeners todos com `{ passive: true }` para não bloquear a thread principal
- Elementos animados inicializados apenas quando entram na viewport (`IntersectionObserver`)
- Fontes carregadas com `font-display: swap` via Google Fonts
- `will-change` implícito via transforms para compositing na GPU

### Acessibilidade (WCAG 2.1 AA)
- **Skip link** visível no foco para navegação por teclado
- **Landmark semântico** `<main>` com `id` referenciado pelo skip link
- **`:focus-visible`** com outline dourado para navegação por teclado sem impactar usuários de mouse
- `aria-live="polite"` na mensagem de sucesso do formulário
- `role="status"` e `role="alert"` nas mensagens de feedback
- `aria-expanded` dinâmico no menu hamburger
- `role="dialog"` + `aria-labelledby` no banner de cookies
- `autocomplete` nos campos do formulário (`name`, `email`)
- Hierarquia de headings correta (`h1` → `h2` → `h3`)

### LGPD (Lei 13.709/2018)
- Banner de consentimento de cookies com opções granulares (essenciais / aceitar tudo)
- Preferência persistida em `localStorage`
- Aviso de uso de dados no formulário de contato com base legal explícita
- Dados do formulário não compartilhados com terceiros

### Formulário de Contato
- Envio real via **PHP** (`mail.php`) hospedado na HostGator — sem dependência de serviços externos
- Validação no front-end (HTML5 Constraint API) e no back-end (PHP)
- Proteção contra **header injection** no script PHP
- Estados de loading, sucesso e erro com feedback visual imediato
- Submit assíncrono com `fetch` + `FormData` sem recarregar a página

### Design System
- **Design tokens** via CSS Custom Properties (`--gold`, `--bg-*`, `--r-*`, `--ease-*`)
- Paleta: Dark `#17181A` + Gold `#D4AF37`
- Tipografia: **Sora** (headings) · **Mulish** (body) · **JetBrains Mono** (código)
- Gradientes e `gradient-text` com `-webkit-background-clip`
- Componentes reutilizáveis: `.btn`, `.badge`, `.pill`, `.contact-item`, `.service-card`

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Markup | HTML5 semântico |
| Estilo | CSS3 (Custom Properties, Grid, Flexbox, Animations, `backdrop-filter`) |
| Script | JavaScript ES2022+ (async/await, optional chaining, modules via IIFE) |
| Backend | PHP 8+ (`mail()`, validação server-side) |
| Hospedagem | HostGator (cPanel + PHP) |
| Domínio | koytech.com.br |

---

## Estrutura do Projeto

```
koytech/
├── index.html      # Estrutura semântica completa (SPA single-page)
├── styles.css      # Design system + todos os componentes
├── script.js       # Interações, animações e lógica de formulário
└── mail.php        # Endpoint PHP para envio de e-mail
```

---

## Como Rodar Localmente

Não há build step — abra direto no navegador:

```bash
# Clone o repositório
git clone https://github.com/CharlesDevRJ/koytech.git
cd koytech

# Abra com Live Server (VS Code) ou qualquer servidor local
npx serve .
```

> Para testar o envio de formulário localmente, é necessário um ambiente PHP (XAMPP, Laragon ou similar).

---

## Seções do Site

| # | Seção | Descrição |
|---|-------|-----------|
| 1 | Hero | Canvas com partículas, typewriter effect e code window mockup |
| 2 | Stats | Contadores animados com easing cubic |
| 3 | Sistemas | Seção em destaque com showcase de dashboard interativo |
| 4 | Serviços | Grid de 4 cards com efeito 3D tilt |
| 5 | Processo | Timeline animada em 4 etapas |
| 6 | CTA | Banner de conversão com orbs de gradiente |
| 7 | Contato | Formulário funcional + links de redes sociais |

---

## Licença

Projeto proprietário — © 2025 Koytech. Todos os direitos reservados.
