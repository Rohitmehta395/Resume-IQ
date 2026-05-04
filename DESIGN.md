# Design System & Page Structure: AI ATS Resume Optimizer

## 1. Design System Overview
**Creative North Star: AI Career Accelerator**
A modern, trustworthy, and motivating interface that bridges academic achievement and professional entry using AI-driven insights.

### 🎨 Colors
| Type | Name | Hex | Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | Bright Violet | `#8B5CF6` | AI Intelligence signals, primary actions. |
| **Secondary** | Soft Sky Blue | `#0EA5E9` | Gradients, secondary highlights, optimism. |
| **Tertiary** | Success Green | `#22C55E` | High scores, passed checks, "Ready to Apply". |
| **Surface** | Deep Navy | `#0B1326` | Backgrounds, primary canvas for dark mode. |
| **Neutral** | Darker Navy | `#0F172A` | Base for elevation shifts and tonal layering. |

**Gradients:**
- **Primary Action:** `from-[#8B5CF6] to-[#0EA5E9]` (Violet to Sky Blue).
- **AI Glow:** `rgba(139, 92, 246, 0.15)` diffused shadows.

---

### 🔠 Typography
- **Font Family:** `Inter` (Exclusively).
- **Scale:**
    - **Display XL:** 48px, Weight 800, Line-height 1.1, Letter-spacing -0.02em (Hero titles).
    - **Headline LG:** 32px, Weight 700, Line-height 1.2 (Section headers).
    - **Headline MD:** 24px, Weight 600, Line-height 1.3 (Sub-headers).
    - **Body LG:** 18px, Weight 400, Line-height 1.6 (Main body text).
    - **Body MD:** 16px, Weight 400, Line-height 1.5 (Standard feedback).
    - **Label SM:** 13px, Weight 600, Line-height 1.2, Letter-spacing 0.05em (Metadata).

---

### 📏 Spacing & Layout
- **Baseline Grid:** 4px.
- **Gutter:** 24px.
- **Margins:** 16px (Mobile) / 64px (Desktop).
- **Common Units:**
    - `xs`: 4px
    - `sm`: 8px
    - `md`: 16px
    - `lg`: 24px
    - `xl`: 40px

---

### ✨ Components
#### Buttons
- **Primary:** Gradient fill (Violet/Sky Blue), white text, `rounded-xl` (1.5rem), high-elevation hover shadow.
- **Secondary:** Transparent background, 1.5px Violet border, subtle glass background.
- **Ghost:** Sky Blue text, no border, minimal padding.

#### Cards & Containers
- **Glassmorphism:** Semi-transparent fills (`rgba(30, 41, 59, 0.7)`), `20px` backdrop blur, 1px translucent border.
- **Shapes:** Consistent `rounded-xl` (1.5rem) corners for most containers. Pill shapes for interactive tags/chips.

---

## 2. Page Structure: Landing Page
**Project Screen:** `Full AI ATS Checker Landing Page`

### Sections
1.  **Navbar:** Sticky, glassmorphism background, logo, navigation links, and "Get Started" CTA.
2.  **Hero Section:** 
    - **Title:** `display-xl` centered.
    - **Subtext:** `body-lg` providing the value proposition.
    - **Action:** Primary Gradient button.
    - **Visual:** "AI Score" ring visualization or hero image.
3.  **Features Grid:**
    - 3-column grid (desktop) / 1-column (mobile).
    - Individual cards with `rounded-xl` corners and backdrop blur.
    - Custom thin-stroke icons in `primary` or `secondary` colors.
4.  **How it Works:** 
    - Step-by-step walkthrough of the ATS check process.
    - Large spacing (`xl`) between steps to guide the user.
5.  **Testimonials/Social Proof:**
    - `surface-container` background.
    - User avatars with subtle violet glow.
6.  **CTA / Final Push:** 
    - Full-width section with a strong gradient or glass background.
    - Large "Analyze My Resume" button.
7.  **Footer:**
    - Simplified navy background.
    - Sitemap and social links.

---

## 3. Responsive Behavior
- **Desktop (1280px+):** 12-column grid, 64px margins, side-by-side hero/visuals.
- **Mobile (768px and below):** 1-column stacked layout, 16px margins, centered headings, simplified navigation (hamburger menu).
- **Transitions:** Smooth 200ms ease-out for all hover states and scroll-reveals.
