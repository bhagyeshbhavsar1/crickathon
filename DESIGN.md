# Cyber IPL Squad Builder - Design System

## 1. Brand & Style
The design system is engineered for a high-stakes, competitive gaming environment. It targets elite players and analysts who require rapid data processing and a sense of "live broadcast" immersion. 

The aesthetic is a fusion of **High-Fidelity Glassmorphism** and **Futuristic Technicality**. It evokes the feeling of a heads-up display (HUD) found in advanced aerospace cockpits or sci-fi command centers. The UI is designed to feel active, energetic, and high-performance, utilizing translucency and light emission to create depth without clutter. The emotional response is one of precision, exclusivity, and urgency.

## 2. Color Palette
This design system utilizes a "Void" base of Deep Charcoal (`#0B0E11`) to maximize the luminance of its accent colors.

### Core Colors
- **Background:** `#111417`
- **Surface:** `#111417` (Dim: `#111417`, Bright: `#37393d`)
- **Surface Tint:** `#00dbe9`
- **Primary (Electric Cyan):** `#dbfcff` (Container: `#00f0ff`, Fixed: `#7df4ff`)
  - Reserved for critical interactive paths, success states, and primary data highlights. It should always be accompanied by a subtle outer glow when active.
- **Secondary:** `#ffb3b2` (Container: `#ff525c`)
- **Tertiary:** `#f4f5fe` (Container: `#d7d9e1`)
- **Error (Danger - Crimson):** `#ffb4ab` (Container: `#93000a`)
  - Used exclusively for budget overruns, critical system failures, or negative performance metrics.

### Glass Surfaces
Semi-transparent layers use `#1A1D23` with 60% opacity to maintain legibility against the background while allowing the "depth" of the dashboard to remain visible.

### Borders
All containers must feature a 1px solid border at 5% to 10% white opacity to define the edge of the glass.

## 3. Typography
The typography strategy prioritizes a "Broadcast" feel.

- **Headline/Display Font:** Space Grotesk
  - Used for headlines and statistics to provide a technical, geometric edge.
- **Body/Label Font:** Inter
  - Used for body copy and UI labels to ensure high readability during fast-paced interaction.

### Typographic Scale
- **Display XL:** Space Grotesk, 48px, Bold (700), Line Height 1.1
- **Headline Large:** Space Grotesk, 32px, Semi-Bold (600), Line Height 1.2
- **Headline Medium:** Space Grotesk, 24px, Semi-Bold (600), Line Height 1.2
- **Body Large:** Inter, 18px, Regular (400), Line Height 1.6
- **Body Medium:** Inter, 16px, Regular (400), Line Height 1.5
- **Label Caps:** Inter, 12px, Bold (700), Tracking 0.1em
- **Stat Value:** Space Grotesk, 24px, Bold (700), Tracking 0.05em

Headers and statistical values should lean into a condensed, uppercase styling to mimic telemetry data. Tracking (letter-spacing) should be tightened for large headings and widened for small labels to maintain a clean, professional aesthetic.

## 4. Layout & Spacing
This design system employs a **12-column fixed grid** for top-level dashboard layouts to maintain structural rigidity. The internal content of glass containers follows a **4px modular scale**, ensuring that icons and text align to a precise technical grid.

- **Unit:** 4px
- **Stack Small:** 8px
- **Stack Medium:** 16px
- **Container Padding:** 20px
- **Gutter:** 24px
  - Generous to prevent the "glow" of adjacent containers from bleeding into one another.
- **Stack Large:** 32px
- **Margin:** 40px
  - Wide to give the dashboard a premium, cinematic frame.

## 5. Elevation & Depth
Depth is not communicated via shadows, but through **Backdrop Blur and Chromatic Layering**.

1. **Base Layer:** Solid Deep Charcoal (`#0B0E11`).
2. **Surface Layer:** 60% Opacity `#1A1D23` with a 20px backdrop-filter blur.
3. **Active Layer:** Elements on this level feature a 1px primary-colored border and a 10px-20px outer neon glow (drop-shadow with 0 offset and high spread).
4. **Overlay Layer:** Modals and tooltips utilize an 80% opacity fill and a higher backdrop blur (40px) to effectively "dim" the content beneath them.

## 6. Shapes
The shape language is strictly **Sharp (0px)**. To maintain a high-tech, military-grade aesthetic, avoid rounded corners on containers, buttons, or inputs.

Instead of rounding, depth and focus are achieved through "clipped" corner motifs (45-degree chamfers) on primary action buttons and header tags, reinforcing the aggressive, competitive nature of the design system.

## 7. Component Structure
- **Buttons:** Sharp-edged. Primary buttons have a solid Electric Cyan fill with black text; secondary buttons are ghost-style with 1px Cyan borders. On hover, they emit an outer cyan glow.
- **Meters & Progress:** Use "Liquid Gradients." A meter filling up should transition from a dark cyan to a vibrant, glowing cyan at the leading edge, appearing to "slosh" or pulse slightly.
- **Empty States:** Feature "Holographic Scanlines"—subtle, horizontal 1px lines moving vertically across a low-opacity icon to suggest a signal-search or "loading" state.
- **Cards:** Glass containers with a subtle top-to-bottom linear gradient (White 5% to White 0%). The top-left corner should feature a small, technical "ID tag" in a label-caps font.
- **Input Fields:** Bottom-border only or fully outlined with 0.5 opacity. When focused, the border becomes 1.0 opacity Electric Cyan with a subtle "flicker" animation on entry.
- **Data Grids:** Rows should have a subtle 1px divider and a hover state that highlights the entire row with a 10% opacity Cyan tint.
