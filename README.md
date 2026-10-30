# PizzaMagien 🍕 v0.4.0

Et hyggeligt dansk pizzaspil til børn. Bygget med React, TypeScript og Vite.

## Kør lokalt

Node.js 22.18+ og npm anbefales.

```sh
npm ci
npm run dev
```

Åbn adressen i terminalen. `npm run build` kontrollerer TypeScript og bygger til `dist/`. `npm run preview` viser den byggede udgave lokalt. `npm test` tester bestillinger og koordinater for træk og slip.

## Nyt: tomatsovs og skørt fyld

Pizzaen starter med bar dej. Vælg **Tegn med tomatsovs**, og tegn med finger, mus eller pen. Et tryk laver en prik. Sovsen ligger under fyldet; Fortryd fjerner en hel streg. Med tastatur laver Enter eller mellemrum en sovseprik.

Vælg **Skørt fyld** for slik, regnbuer, popcorn, jordbær, broccoli og is. Både klassisk og skørt fyld kan blandes i begge spiltilstande. Kundebestillinger følger stadig deres viste opskrift; skørt ekstra fyld påvirker stjernerne som andet ekstra fyld. Tomatsovs er altid valgfri og tæller ikke med i bedømmelsen.

## Spil

- Vælg Fri leg eller Mit pizzeria og skift mellem kok Aya og Fraya.
- Træk en ingrediens til pizzaen med finger, mus eller pen. Slip udenfor pizzaen for at annullere.
- Du kan også vælge en ingrediens og trykke på pizzaen. Med tastatur: vælg fyld, fokuser pizzaen og tryk Enter eller mellemrum.
- Fortryd fjerner seneste topping. Start forfra rydder pizzaen. Der er plads til 100 toppings.
- Sæt pizzaen i ovnen og se din egen pizza blive gylden. Tag den ud efter 6–17 sekunder. Fra 13 sekunder vises en advarsel; efter 18 sekunder brænder den på. Tiden fortsætter, hvis fanen skjules. Du kan også tage den ud for tidligt.
- På pizzadisken kan der stå fire pizzaer. Vælg en pizza og derefter den kunde, der skal have den.
- En præcis bestilling, bagt uden at brænde på, giver 10 legemønter og tre stjerner. Rå, brændte eller forkerte pizzaer giver ingen betaling. Forkert servering beholder pizzaen på disken, så du kan vælge en anden kunde.
- Servér eller fjern en pizza, hvis disken er fuld. I Fri leg kan du spise pizzaerne uden betaling.
- Kunden erstattes efter en vellykket servering. Mønter og stjerner gemmes lokalt i denne browser. Pizzaer på disken og ufærdige pizzaer gemmes kun, mens køkkenet er åbent.
- Lydknappen styrer oplæsning af bestillingen; tryk på taleboblen for at høre den. Dansk stemme afhænger af browser og enhed.

## Struktur og billeder

`src/components/` indeholder pizza, ingrediensbakke, kok og ovn. `src/screens/` indeholder start og køkken. `src/data/` indeholder ingredienser og bestillinger. `src/game/logic.ts` indeholder spilleregler. `src/assets.ts` samler billedstier og toppingikoner; ingrediensikoner findes i `src/data/ingredients.ts`.

Den eksisterende illustration i `public/assets/characters/familie-og-dyr.png` er bevaret og bruges også til kokkenes portrætter. De oprindelige fotos var ikke tilgængelige. Navnene Aya og Fraya bruges til valg af kok; sammenhængen mellem portrætter og navne kan justeres i Chef.tsx. Dyrekunder vises med emoji, som kan se forskellige ud på forskellige enheder. Ingen nye foto-baserede billeder er genereret.

Mønterne er kun legepenge. Der er ingen køb eller rigtige betalinger.

Ingen eksterne skrifttyper, analyseværktøjer eller konti. Spillet kræver ingen backend. Afhængigheder hentes ved installation; selve spillet bruger lokale aktiver. Det er ikke en offline-installerbar PWA.

## GitHub

Pak ZIP-filen ud og læg indholdet af projektmappen i dit repository. `package-lock.json` medfølger; `node_modules` og build-output medfølger ikke. Vite bruger som standard domænets rod; til en undermappe kan du bygge med `npm run build -- --base=/repo-navn/`.

Denne levering er ikke deployet. Et push til et eksisterende repository kan udløse din egen automatiske hostingopsætning. Bevar dine eksisterende licens- og billedrettigheder; der er ikke tilføjet en ny licens.

## Fyldillustrationer

Otte originale SVG-illustrationer findes i `public/assets/toppings/`. De er lokale vektorbilleder med organiske former, farveforløb og kornet tekstur. `IngredientArt` genbruger dem i alle spillets visninger. Det skøre fyld bruger fortsat emoji.
