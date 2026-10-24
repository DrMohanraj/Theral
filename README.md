# கூவல் (Koovel) — முகப்புப் பக்கம் + Admin CMS  (Cloudflare Pages)

Astro + Decap CMS + Cloudflare Pages (GitHub OAuth — Pages Functions)

## 1. கோப்புகளை GitHub-இல் வைக்க
- zip-இல் உள்ள `koovel` folder-க்குள் இருப்பவற்றை repo-வின் **root**-இல் வையுங்கள்
  (`package.json`, `astro.config.mjs`, `functions/`, `src/`, `public/` நேரடியாக root-இல்).
- பழைய பக்கங்கள் (`src/pages/` உள் about, archive போன்றவை), பழைய layouts/components இருந்தால் நீக்கவும்.
- `public/admin/index.html`-இல் `repo: 'DrMohanraj/koval'` — உங்கள் repo பெயர் வேறு என்றால் அதை மாற்றவும் (`public/admin/config.yml`-இலும்).

## 2. Cloudflare Pages Build அமைப்பு
- Framework preset: **Astro**
- Build command: `npm run build`
- Build output directory: `dist`
- Node பதிப்பு `.node-version` (20) மூலம் தானாக எடுக்கும்.

## 3. GitHub OAuth (CMS உள்நுழைவுக்கு)
ஏற்கெனவே OAuth App + Cloudflare env vars இருந்தால் இந்தப் படி தேவையில்லை.
1. GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
   - Homepage URL: `https://உங்கள்-தளம்`
   - Authorization callback URL: `https://உங்கள்-தளம்/callback`
2. Client ID, Client secret எடுக்கவும்.
3. Cloudflare Pages → Settings → Variables and Secrets: `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` (Production).
4. மீண்டும் Deploy.
5. `https://உங்கள்-தளம்/admin/` → "Login with GitHub".

## 4. உள்ளிடும் முறை
- Admin → **நேர்காணல்கள்** → New: பெயர், படங்கள், கேள்வி-பதில்கள், **முக்கிய மேற்கோள்கள்** நிரப்பி Publish.
- **"Homepage Hero-ல் காட்டவா?"** ஆன் செய்த நேர்காணல் hero-வில் வரும்
  (தலைப்பு, முதல் பதில் தட்டச்சாக, எழுத்தாளர் பெயர், cover படம், முதல் 2 மேற்கோள்கள்).
- எல்லா நேர்காணல்களின் மேற்கோள்களும் "சொற்களின் வெளி" நகரும் சுவரில் தானாக வரும்.
- Publish → GitHub commit → Cloudflare தானாக build செய்யும்.

`src/content/interviews/sample-interview-*.md` மாதிரி (placeholder) நேர்காணல்கள் — உண்மையானவற்றை நிரப்பிய பிறகு நீக்கலாம்.
