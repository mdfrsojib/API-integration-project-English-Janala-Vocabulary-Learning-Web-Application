# ENGLISH <img width="25px" src="./assets/logo.png" /> JANALA

---

## ⚡ API Endpoints

1. Get ⚡ All Levels

```bash
https://openapi.programming-hero.com/api/levels/all
```

1. Get ⚡ Words by Levels <br/>
   https:// openapi.programming-hero.com/api/level/{id}

```bash
https://openapi.programming-hero.com/api/level/5
```

1. Get ⚡ Words Detail <br/>
   https:// openapi.programming-hero.com/api/word/{id}

```bash
https://openapi.programming-hero.com/api/word/5
```

1. Get ⚡ All Words <br/>

```bash
https://openapi.programming-hero.com/api/words/all
```

# Workings description

English Janala — Project Overview

English Janala is a lightweight vocabulary-learning web application that consumes the Programming Hero OpenAPI to present learners with level-based word lists, detailed word information, and simple learning utilities. The project focuses on clean UI, responsive behavior, and a fast, accessible user experience.

Initial Working Process

1. Show Levels on the UI
   - On page load, fetch all available levels from `https://openapi.programming-hero.com/api/levels/all`.
   - Dynamically render the returned levels as center-aligned lesson buttons so users can select a level quickly.

2. Default UI State
   - Display a friendly placeholder in the vocabulary area to guide first-time users.
   - Keep the network loading spinner hidden until the app initiates a request.

3. Level Selection & Word Loading
   - When a user selects a level, show the loading spinner and request the level's words from `https://openapi.programming-hero.com/api/level/{id}`.
   - Render each word as a card containing the term, meaning, pronunciation, and action icons (details, favorite, play sound).
   - Highlight the active level button and show an empty-state message when a level contains no words.

4. Word Details & Interactions
   - The details action fetches additional word information from `https://openapi.programming-hero.com/api/word/{id}` and displays it in a modal (pronunciation, example sentence, synonyms).
   - Users can mark words as saved (persisted to `localStorage`) and play pronunciation via the Web Speech API.

5. Search & Filtering
   - Search input resets the active level and filters the currently loaded words to match the query.
   - If no results match the search, the app shows a clear empty-state message.

6. Data Handling, UX & Accessibility
   - Avoid rendering falsy values (null/undefined) in the UI; provide sensible fallbacks where data is absent.
   - Show clear error and empty-state messages for better guidance.
   - Ensure the application is responsive and accessible by using semantic markup and keyboard-friendly controls.

7. Persistence & Extras
   - Persist the user's saved words in `localStorage` so favorites remain available across sessions.
   - Keep interactions snappy: network indicators appear only during active requests and the UI minimizes reflows.

Developer Notes
   - Code is organized with modular functions that handle fetching, rendering, and localStorage management.
   - Use of the Web Speech API for pronunciation and a small modal component for word details improves learner engagement.
   - To run locally, open `index.html` in a static server or the browser; network requests require an internet connection to the API endpoints listed above.

Future Improvements
   - Add pagination or lazy-loading for very large level lists.
   - Support exporting/importing saved-word lists and user preferences.
   - Add unit tests for fetching and rendering functions.
