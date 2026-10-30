# 🍕 PizzaMagien v0.1.0

Dansk børnevenligt pizzaspil med **Fri leg** og **Mit pizzeria**.

## Hurtig start

1. Installer Node.js 20+.
2. Kør `npm install`.
3. Kør `npm run dev` og åbn den viste adresse.
4. Kør `npm run build` for at bygge til `dist/`.

## GitHub og Cloudflare Pages

1. Opret et **nyt separat GitHub-repository**, fx `pizzamagien`.
2. Upload **indholdet** af denne projektmappe til roden af repositoriet (ikke ZIP-filen som én fil).
3. I Cloudflare Pages: Connect to Git → vælg repositoriet.
4. Build command: `npm run build`; output directory: `dist`; root directory: `/`.
5. Hver push til hovedbranchen udløser en ny udgivelse.

## Brug

- **Fri leg:** Vælg en ingrediens i bakken, tryk på pizzaen flere gange, og bag/server.
- **Mit pizzeria:** Følg kundens ønskeliste, bag og servér. Stjerner gemmes i browseren.
- Tryk på taleboblen for at høre en bestilling (browserens danske systemstemme, hvis tilgængelig).
- Brug **Fortryd** til at fjerne seneste stykke fyld.

## Struktur

- `src/components/` – genbrugelige UI-komponenter
- `src/screens/` – start og køkken
- `src/data/` – ingredienser og kunder
- `src/game/` – spilregler og lokal lagring
- `src/types/` – TypeScript-typer
- `src/styles/` – fælles layout og design
- `public/assets/characters/` – originale figurer og illustrationer
- `public/assets/ingredients/` – fremtidige fælles ingrediensillustrationer
- `public/assets/icons/` – fælles ikoner
- `public/assets/backgrounds/` – fremtidige baggrunde
- `public/assets/sounds/` – fremtidige lydfiler

## Afgrænsning i v0.1.0

Denne første version har klik/tap-placering af fyld (ikke endnu fri træk-og-slip), enkel bagning med knap (ingen timer), simple CSS-ingredienser og én samlet figurillustration. PWA-manifest er med, men offline service worker er endnu ikke implementeret. Der er ikke onlinekonto, reklamer eller køb. Illustrationen er genereret ud fra brugerens billeder og opbevares lokalt i projektet.
