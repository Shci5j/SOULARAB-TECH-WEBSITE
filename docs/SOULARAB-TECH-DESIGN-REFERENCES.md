# SOULARAB TECH — Design References & Project Checkpoint

Last updated: 2026-11-04
Repository: https://github.com/Shci5j/SOULARAB-TECH-WEBSITE
Branch: main

## Purpose
This document preserves the approved visual references, implementation constraints, and exact project stopping point so work can resume without asking the owner to repeat the brief.

## The six approved references

> IMPORTANT: The original image files were not available to the working session when this document was created. The descriptions below preserve the approved specifications, but are NOT substitutes for the original assets. Do not recreate or approximate them and claim they are the originals. When the six source images are accessible, store them under `assets/design-references/` and update the filenames below.

1. **Primary site background** — Original vertical charcoal/black stone-textured image with fine grain and symmetrical gold arabesque ornamentation along the sides and lower edges. Use as the persistent site background. Keep the central dark area readable. This exact image defines the site's black texture and gold metallic treatment.
   - Intended file: `assets/design-references/01-primary-background.png`

2. **Official logo** — Black-background image with gold ST monogram inside an ornate shield, gold crown above, and the exact wordmark `SOULARAB TECH` plus tagline `IDEAS INTO DIGITAL REALITY`. Preserve proportions, colors, and details; use the original asset rather than redrawing it.
   - Existing repository asset previously identified: `soularab-logo.png` (verify before replacing or duplicating).
   - Intended reference copy: `assets/design-references/02-official-logo.png`

3. **Current mobile homepage screenshot** — Reference for existing layout and interface elements: top bar with sound and language controls and compact logo; centered main logo; tagline “الإبداع • التقنية • التميز”; welcome heading and copy; framed navigation arrow; vertical sound control; Ruh assistant icon at lower right. This is a layout/continuity reference, NOT the new background.
   - Intended file: `assets/design-references/03-current-mobile-homepage.png`

4. **Ornate gold frame** — Gold decorative frame on black background. This is the master reference for frames around cards, panels, boxes, options, dialogs, and other framed UI. Adapt dimensions without distorting the frame's proportions or ornament.
   - Intended file: `assets/design-references/04-ornate-gold-frame.png`

5. **Thin glowing gold navigation arrow** — Replace the current homepage bottom navigation arrow with this exact arrow design. Preserve the current arrow length and original navigation behavior. Add a subtle smooth hover interaction; provide a suitable touch interaction on mobile.
   - Intended file: `assets/design-references/05-glowing-gold-arrow.png`

6. **Gold color/material reference** — The metallic gold tone and gradient from reference 1 is the global gold standard. Reference 4 also informs the metallic gold treatment. Do not use flat bright yellow or a single flat gold fill. Approximate fallback previously discussed: `#C59E4F`, but only as a fallback base tone, never as a replacement for the metallic gradient/highlights.
   - Intended file: `assets/design-references/06-gold-material-reference.png` (may be a crop of reference 1 only if owner approves; do not fabricate one).

## Non-negotiable implementation constraints
- Preserve every existing section, feature, and behavior.
- Keep Arabic and English language support.
- Preserve sound controls and audio behavior.
- Preserve the Ruh assistant and its interactions.
- Preserve forms, service request flows, navigation, and responsive behavior.
- Do not delete or simplify existing functionality to achieve the visual redesign.
- Treat each reference according to its specific role; do not conflate the mobile screenshot with the background reference.
- Do not introduce unrelated decorative elements, logos, watermarks, or substitute reference artwork.
- Check desktop and mobile layouts and test existing interactions after changes.

## Project checkpoint — 2026-11-04
- Repository: `Shci5j/SOULARAB-TECH-WEBSITE`
- Target branch: `main`
- Core files identified: `index.html`, `styles.css`, `script.js`
- Existing logo asset previously identified: `soularab-logo.png`
- Core project files were inspected/read during the prior work session.
- No redesign changes have been committed as part of this checkpoint.
- No deployment or production update has been verified.
- No verified ZIP backup of the redesigned site exists yet.
- The original visual reference image files were not accessible to the working session at checkpoint creation. Their descriptions are preserved above; the image assets themselves still need to be added.

## Resume instructions
1. Retrieve/attach the six original reference images and place them in `assets/design-references/` using the intended filenames above (or update this document to match their actual names).
2. Verify the existing logo file and all existing site assets before editing.
3. Review the current `index.html`, `styles.css`, and `script.js` again before making changes.
4. Implement the redesign while preserving all current behavior.
5. Test responsive layout, language switching, sound controls, navigation, forms, and Ruh assistant.
6. Commit the completed changes to `main` only after validation.
7. Create a ZIP archive of the final repository state for the owner and verify the archive exists before sharing its link.
8. Verify the live site URL independently; never claim deployment succeeded without a successful check.

## Asset status
- [ ] Original primary background image received and committed
- [ ] Original official logo reference image received/verified
- [ ] Original current mobile homepage screenshot received and committed
- [ ] Original ornate frame image received and committed
- [ ] Original glowing arrow image received and committed
- [ ] Original gold material/color reference received and committed
- [ ] Website redesign completed and tested
- [ ] ZIP backup created and verified
- [ ] Live site checked
