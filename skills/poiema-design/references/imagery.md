<!-- Copied from docs/imagery.md by npm run build. Edit the original. -->

# Imagery

The interface is gray, and **imagery is where the material and the color live**. The reference page uses two families of objects. Both are physical, studio-lit and cut out on transparent backgrounds.

1. **Materials:** one gem shape rendered in five materials: clay (barro), plaster (gesso), grass (grama), iron (ferro), diamond (diamante). Together they tell a story of formation.
2. **Medals and plaques:** aged-silver coins and tags, embossed with a simple symbol and a reference line (like `EPHESIANS 2:10`). They read as tokens of meaning.

## Rules
- **Cut-out objects, not scenes.** Use transparent PNG/WebP or SVG with no background or frame, centered, with breathing room.
- **Soft studio light from the top left** and a long soft shadow below. In CSS: `.pm-object` (drop-shadow `0 30px 34px rgba(0,0,0,.22)`).
- **Real materials:** matte, tactile, slightly imperfect (clay grain, plaster dust, grass blades, rusted iron, clear crystal). No plastic gloss, chrome reflections or neon.
- **Muted, earthy color.** Objects may carry color; the UI never does.
- **One object per idea.** A card gets one object. A trio gets three, and the closing band gets the five materials in order.
- **Animate gently:** `.pm-float`, `data-pm-tilt`, and `data-pm-cycle` to swap materials.
- **Photos** sit inside `.pm-frame` (40px radius, big soft shadow) with warm, natural light and real people. Avoid stock poses.

## The gem asset
`poiema-ui/assets/gem.svg` is a flat, faceted diamond that uses `currentColor`, an original stand-in for the 3D renders. Inline it and color it with a material token:
```html
<span style="color: var(--pm-grass)"><!-- paste gem.svg markup --></span>
```

## Prompt recipe (image generators)
> A single [OBJECT] made of [MATERIAL: weathered terracotta clay | raw white plaster | dense living moss and grass | rusted cast iron | clear faceted crystal], isolated on a transparent background, soft diffused studio light from top left, long soft shadow beneath, matte tactile surface with fine natural imperfections, centered, three-quarter view, photorealistic 3D render, muted natural color, no text, no background, no reflections of a room.

For medals:
> An aged silver medal/plaque with an embossed minimal symbol of [SYMBOL] and the small engraved caption "[REFERENCE]", irregular hand-cast edges, oxidized recesses, isolated on transparent background, soft top-left studio light, photorealistic 3D render.
