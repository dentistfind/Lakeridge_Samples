<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- All three concepts render from one shared content model (src/content/practice.ts) and concept config (src/content/concepts.ts); concept-specific hero, section composition, typography and theme tokens may differ while facts remain shared. Why: genuinely distinct design directions with equivalent factual coverage.
- Concept routes live under /concept/$c/* and are demonstration URLs only. Why: production URLs follow a separate migration plan.
- The appointment request form never transmits, stores, or tracks entries; phone/email actions stay inactive until approved. Why: client brief.
- Shared sections use the same illustrative assets across concepts; fictional portrait models beside named dentists must explicitly state they are not those dentists, and interiors must not imply real premises. Why: filled photo spaces must not misrepresent practice identities.

- Shared illustrative assets are mapped in src/content/imagery.ts and the opening variants use PhotoHero; only Concept B enables Embla scrolling and autoplay, paused on interaction and reduced motion. Why: cohesive photo use and accessible movement without changing shared facts.
