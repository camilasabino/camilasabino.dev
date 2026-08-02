# Setup Cloudflare — camilasabino.dev

Guía para dejar el portfolio en línea. Hosting Pages = **gratis**. Único costo típico: el dominio (~USD 10–15/año).

---

## 1. Cuenta Cloudflare (Free)

1. Entrá a [https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up).
2. Creá la cuenta con tu email.
3. Quedate en el plan **Free** (no hace falta Pro).

---

## 2. Comprar el dominio `camilasabino.dev`

1. En el dashboard: **Domain Registration** (o [https://dash.cloudflare.com/?to=/:account/domains/register](https://dash.cloudflare.com/?to=/:account/domains/register)).
2. Buscá `camilasabino.dev`.
3. Si está libre, agregalo al carrito y completá el checkout (tarjeta).
4. Cloudflare Registrar vende **at-cost** (sin markup) y trae WHOIS privacy incluido.
5. Cuando termine la compra, el dominio ya queda con nameservers de Cloudflare — no tenés que pelear con otro registrar.

**Si no está libre:** probá `camilasabino.com` o `camisabino.dev` y avisá para actualizar `astro.config.mjs` + este doc.

---

## 3. Conectar este repo a Cloudflare Pages

### 3.1 Código en GitHub (ya listo)

Repo: [github.com/camilasabino/camilasabino.dev](https://github.com/camilasabino/camilasabino.dev)  
Branch de producción: `main`

### 3.2 Crear el proyecto Pages

1. Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Autorizá GitHub si te lo pide (permiso al repo `camilasabino.dev`).
3. Elegí el repo `camilasabino.dev` / branch `main`.
4. Build settings:

| Campo | Valor |
|---|---|
| Framework preset | Astro (si aparece) |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Environment variable | `NODE_VERSION` = `22` |

El repo incluye `wrangler.json` apuntando a `./dist` (sitio estático).

5. **Save and Deploy**. Esperá el primer build.
6. Vas a recibir una URL temporal tipo `https://camilasabino-dev.pages.dev` (podés compartirla antes de comprar el dominio).

### 3.3 Dominio custom + SSL

1. En el proyecto Pages → **Custom domains** → **Set up a custom domain**.
2. Agregá `camilasabino.dev`.
3. Agregá también `www.camilasabino.dev` (opcional pero recomendado; redirigí www → apex o al revés).
4. Cloudflare crea los registros DNS y el certificado **SSL automático**. Puede tardar unos minutos.

Checklist:

- [ ] `https://camilasabino.dev` abre el home
- [ ] `https://camilasabino.dev/projects/blendify` muestra la ficha
- [ ] Candado HTTPS OK
- [ ] Links a GitHub funcionan

Cada push a `main` vuelve a deployar solo.

---

## 4. Email Routing (opcional, gratis)

Para recibir mail en `contacto@camilasabino.dev` sin pagar un buzón:

1. Entrá a la zona del dominio → **Email** → **Email Routing**.
2. **Get started** / activá Email Routing.
3. Destino: tu Gmail (u otro inbox personal).
4. Creá la dirección `contacto@camilasabino.dev` → forward al destino.
5. Confirmá el email de verificación que manda Cloudflare.

El footer del sitio ya apunta a `contacto@camilasabino.dev`.

---

## 4b. Formulario de contacto (Web3Forms, gratis)

El sitio tiene `/contacto`: el formulario envía un mail sin abrir Gmail. También hay un enlace
“Abrir cliente de correo” (`mailto:`) por si la persona prefiere su app.

1. Creá una cuenta gratis en [web3forms.com](https://web3forms.com).
2. Generá un **Access Key** apuntando al inbox donde querés recibir (p.ej. Outlook o el forward de `contacto@`).
3. En local, copiá `.env.example` → `.env` y pegá la key:

```bash
cp .env.example .env
# PUBLIC_WEB3FORMS_ACCESS_KEY=tu_key_aqui
```

4. Reiniciá `npm run dev`.
5. En Cloudflare Pages (cuando subas a prod): **Settings → Environment variables** →
   `PUBLIC_WEB3FORMS_ACCESS_KEY` = la misma key.

---

## 5. Evolución (más adelante)

Cuando quieras Blendify **en vivo**:

1. Subdominio `blendify.camilasabino.dev` → otro proyecto Pages (frontend Vite).
2. API Nest + Postgres + Redis en un free/barato (Railway/Render/Fly + Neon + Upstash).
3. Actualizar redirect URIs de Spotify OAuth y cookies Secure.

La DNS y el SSL ya van a estar resueltos en la misma cuenta.
