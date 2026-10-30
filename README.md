# PizzaMagien 🍕 v0.2.0

Et hyggeligt dansk pizzaspil til børn. Bygget med React, TypeScript og Vite.

## Kør lokalt

Node.js 22.18+ og npm anbefales.

```sh
npm ci
npm run dev
```

Åbn adressen i terminalen. `npm run build` kontrollerer TypeScript og bygger til `dist/`. `npm run preview` viser den byggede udgave lokalt. `npm test` tester bestillinger og koordinater for træk og slip.

## Spil

- Vælg Fri leg eller Mit pizzeria og skift mellem kok Aya og Fraya.
- Træk en ingrediens til pizzaen med finger, mus eller pen. Slip udenfor pizzaen for at annullere.
- Du kan også vælge en ingrediens og trykke på pizzaen. Med tastatur: vælg fyld, fokuser pizzaen og tryk Enter eller mellemrum.
- Fortryd fjerner seneste topping. Start forfra rydder pizzaen. Der er plads til 100 toppings.
- Vælg Til ovnen, vent fem sekunder og server. I pizzeriaet giver den præcise opskrift tre stjerner; alle forsøg får mindst én.
- Vælg Næste kunde eller lav en ny pizza. Stjerner gemmes lokalt i denne browser.
- Lydknappen styrer oplæsning af bestillingen; tryk på taleboblen for at høre den. Dansk stemme afhænger af browser og enhed.

## Struktur og billeder

`src/components/` indeholder pizza, ingrediensbakke, kok og ovn. `src/screens/` indeholder start og køkken. `src/data/` indeholder ingredienser og bestillinger. `src/game/logic.ts` indeholder spilleregler. `src/assets.ts` samler billedstier og toppingikoner; ingrediensikoner findes i `src/data/ingredients.ts`.

Den eksisterende illustration i `public/assets/characters/familie-og-dyr.png` er bevaret og bruges også til kokkenes portrætter. De oprindelige fotos var ikke tilgængelige. Navnene Aya og Fraya bruges til valg af kok; sammenhængen mellem portrætter og navne kan justeres i Chef.tsx. Dyrekunder vises med emoji, som kan se forskellige ud på forskellige enheder. Ingen nye foto-baserede billeder er genereret.

Ingen eksterne skrifttyper, analyseværktøjer eller konti. Spillet kræver ingen backend. Afhængigheder hentes ved installation; selve spillet bruger lokale aktiver. Det er ikke en offline-installerbar PWA.

## GitHub

Pak ZIP-filen ud og læg indholdet af projektmappen i dit repository. `package-lock.json` medfølger; `node_modules` og build-output medfølger ikke. Vite bruger som standard domænets rod; til en undermappe kan du bygge med `npm run build -- --base=/repo-navn/`.

Denne levering er ikke deployet. Et push til et eksisterende repository kan udløse din egen automatiske hostingopsætning. Bevar dine eksisterende licens- og billedrettigheder; der er ikke tilføjet en ny licens.
