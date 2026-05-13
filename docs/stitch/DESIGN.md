# Design System Specification: Editorial Trust & Architectural Precision

## 1. Overview & Creative North Star: "The Modern Sensei"
This design system is built upon the "Modern Sensei" North Star. In the context of Japanese real estate (JKK), trust is not built through decorative flair, but through **Architectural Precision** and **Intellectual Space**. 

We move beyond the "standard portal" look by treating the browser as a high-end editorial canvas. The layout rejects the rigid, boxy constraints of traditional real estate grids in favor of intentional asymmetry and "The Breathing Room" (Ma)—a Japanese concept of negative space that allows the user’s mind to rest and focus. We create authority through sophisticated typographic scales and a "no-line" philosophy, where hierarchy is felt through tonal shifts rather than seen through borders.

---

## 2. Color Strategy & Tonal Layering
The palette is rooted in a Deep Navy (`primary_container: #001f5b`), conveying stability and legacy, set against a multi-layered neutral foundation.

### The "No-Line" Rule
To achieve a premium, custom feel, **1px solid borders for sectioning are strictly prohibited.** Do not use lines to separate the "Header" from the "Hero" or the "Search" from the "Results." Instead, define boundaries through background color shifts:
*   Use `surface` (#f8f9fa) for the main canvas.
*   Use `surface_container_low` (#f3f4f5) for secondary content areas.
*   Use `surface_container_highest` (#e1e3e4) to anchor navigation or footers.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of fine paper. 
*   **Base:** `surface` (#f8f9fa)
*   **Elevated Elements:** Place `surface_container_lowest` (#ffffff) cards on a `surface` background to create a "lifted" effect without heavy shadows.
*   **Depth Stacking:** An inner filter panel should use `surface_container` (#edeeef) when nested inside a `surface_container_low` sidebar.

### Signature Textures & Glassmorphism
While the brief calls for no gradients, we utilize **Tonal Vibrancy**. For floating navigation or "Quick Action" bars, use a **Glassmorphism** effect:
*   **Background:** `surface_container_lowest` (#ffffff) at 85% opacity.
*   **Effect:** `backdrop-filter: blur(12px)`.
*   This allows property photography to bleed through subtly, softening the interface and making it feel integrated into the environment.

---

## 3. Typography: Editorial Authority
We utilize a pairing of **Manrope** (for structural headlines) and **Inter/Hiragino Kaku Gothic** (for high-legibility data).

*   **Display & Headline (Manrope):** These are your architectural anchors. Use `display-lg` (3.5rem) for hero statements with tight letter-spacing (-0.02em) to create a bold, authoritative Japanese editorial look.
*   **Body (Inter / Hiragino):** Use `body-lg` (1rem) for property descriptions. The line-height must be generous (1.6 – 1.8) to honor the "spacious" requirement.
*   **Labels (Inter):** Use `label-md` (0.75rem) in `secondary` (#575f67) for metadata (e.g., "Build Year," "Square Footage").

**Hierarchy Tip:** Never use color to emphasize text when weight can do the job. Bold `primary` text should be used sparingly for maximum impact.

---

## 4. Elevation & Depth: The Layering Principle
We reject the "drop shadow" of the 2010s. Depth in this system is achieved through light and tone.

*   **Ambient Shadows:** For high-priority floating elements (like a "Book Viewing" card), use an extra-diffused shadow: `box-shadow: 0 12px 40px rgba(0, 31, 91, 0.06)`. Note the use of a Navy tint in the shadow to maintain brand harmony.
*   **The Ghost Border Fallback:** If a UI element (like a text input) requires a container, use a "Ghost Border": `outline_variant` (#c5c6d1) at **20% opacity**. It should be felt, not seen.
*   **Roundedness:** A strict `DEFAULT: 0.25rem` (4px) is applied to all interactive elements to maintain a sharp, intellectual, and "engineered" aesthetic.

---

## 5. Components

### Buttons
*   **Primary:** Background `primary_container` (#001f5b), Text `on_primary` (#ffffff). No shadow. Hover state: shift to `primary` (#000c2e).
*   **Secondary:** Background `secondary_container` (#d8e1ea), Text `on_secondary_container` (#5b646b).
*   **Tertiary:** Text-only with `primary_container` (#001f5b) and a `0.7rem` (2.5) horizontal padding.

### Input Fields
*   **Form Canvas:** Use `surface_container_lowest` (#ffffff).
*   **Border:** Ghost Border (1px, `outline_variant` at 20%).
*   **Focus State:** Border becomes 1px `primary_container` with no "glow."

### Cards & Property Lists
*   **Forbid Dividers:** Do not use lines between list items. Use `spacing.6` (2rem) of vertical white space or a subtle background toggle between `surface` and `surface_container_low`.
*   **Image Handling:** Property images must have a `0.25rem` radius. Use a `surface_dim` (#d9dadb) placeholder to prevent layout shift.

### Context-Specific Components
*   **The "Trust Badge":** A small, `surface_container_high` (#e7e8e9) chip with a `primary_container` icon, used to denote verified JKK listings.
*   **Measurement Toggle:** A custom switch for "sqm" vs "tsubo," using `secondary_fixed` (#dbe4ed) for the track.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use `spacing.20` (7rem) or `spacing.24` (8.5rem) between major sections to emphasize the "Luxury of Space."
*   **Do** align text to a strict baseline grid to maintain the "Architectural" feel.
*   **Do** use `on_surface_variant` (#444650) for sub-captions to ensure AAA accessibility.

### Don’t:
*   **Don’t** use pure black (#000000). It is too harsh for the "Modern Sensei" persona. Use `primary` (#000c2e) for maximum darkness.
*   **Don’t** use 100% opaque borders. They clutter the visual field and diminish the premium feel.
*   **Don’t** use "Pop" colors. If you need to draw attention, use more white space around an element rather than a bright color.