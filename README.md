# Quran App - Medinah Mushaf Replica

This mobile application faithfully replicates the Medinah Mushaf of the Holy Quran, developed as a test project to meet strict layout and recitation requirements.

---

## Project Overview

- **Exact replication of the Medinah Mushaf**:
  - 604 pages with precise number of lines per page.
  - Accurate start/end words for each page.
  - Horizontal navigation mimics physical Mushaf page flipping.
  - Uses the official Uthmani script font for authentic appearance.

- **Continuous Quran Recitation**:
  - Integrated audio playback with seamless verse transitions.
  - Real-time highlighting of the currently recited verse.

---

## Project Structure

- `pages/` : Data representing Quran pages, including page numbers, line and word positions for accurate rendering.
- `text/` : Full Quranic text for display.
- `audio/` : Quranic audio files for recitation playback.
- `metadata/` : Chapter and verse metadata.
- `indopak-word-by-word/` : Word-by-word text data in Indo-Pak script style.
- `scripts/` : Python utility scripts to process audio and textual data.

---

## Technical Highlights

- No public APIs used to ensure exact layout fidelity.
- The app replicates physical Mushaf structure with pixel-level positioning.
- Audio playback logic synchronizes verse highlights in real time.
- Inspired by apps like Golden Quran and Tarteel.

---
