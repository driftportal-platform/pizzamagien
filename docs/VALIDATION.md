# Validation — PizzaMagien v0.2.0

Validated on 2026-10-30 with Node.js 24.20.0.

- Production build: TypeScript and Vite passed without warnings.
- Automated tests: 3 passed (recipe matching, partial rewards, drop geometry).
- Browser: order mode, ingredient selection, tap placement, pointer drag onto pizza, undo, chef switching, timed oven disabled/ready states, correct-order three-star reward, next customer and saved stars.
- Browser: free play, keyboard placement, reset, baking and serving completed.
- Layout inspected at narrow mobile-width viewport and 1280 × 800 desktop viewport.
- Original illustration is retained. Earlier original photos were unavailable.

Touch support uses Pointer Events and pointer capture with touch-action:none on ingredient buttons. A physical touch device was not available for hardware testing. Speech synthesis depends on browser support and installed Danish voices.

No deployment or changes to GitHub/hosting were performed.
## Tilføjet validering — v0.3.0

- Produktionsbygning og fire automatiske tests bestod.
- Browser: tegnede en sovsestreg, kontrollerede at Fortryd fjernede hele stregen, tegnede igen og lagde skørt fyld ovenpå.
- Kontrollerede at sovsestregen blev bevaret under bagning.
- Tomatsovs påvirker ikke opskriftsbedømmelsen; ekstra regnbuefyld gør.
- Touch bruger Pointer Events, men er fortsat ikke afprøvet på fysisk berøringsskærm.
## Tilføjet validering — v0.3.1

- Produktionsbygning og fire spiltests bestod.
- Alle otte klassiske ingredienser placeret i browseren og visuelt kontrolleret.
- Kontrolleret at alle 24 viste ingrediensbilleder (bakke og pizza) var indlæst.
- Kontrolleret at fyld og sovs blev bevaret ved overgang til ovnen.
- Tegnede SVG-aktiver med let tekstur erstatter de gamle symboler; ingen nye eksterne billedkilder.
## Tilføjet validering — v0.4.0

- Produktionsbygningen og seks automatiske tests bestod.
- Test af ovnens grænser ved 6, 13 og 18 sekunder og betaling for rigtig/forkert/rå/brændt pizza.
- Browser: egen pizza vises i ovnen; bagning, advarsel, brændt pizza, udtagning og to pizzaer på disken afprøvet.
- Forkert kunde afviser uden betaling og beholder pizzaen på disken.
- Rigtig Loui-bestilling gav 10 mønter; rigtig Willa-bestilling gav yderligere 10. Brændt pizza gav ingen mønter.
- Efter Willa fik sin pizza blev kun Willa erstattet, mens de andre kunder ventede videre.
- Saldo på 20 mønter og stjerner blev bevaret efter genindlæsning.
- Touch på fysisk enhed og forskellige browserstemmer er ikke afprøvet.

Live-spillet er ikke opdateret af denne levering. Versionsnummer 0.4.0 vises på forsiden efter installation af den nye udgave.
