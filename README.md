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

1. Load levels on page load
   - Fetch all levels from API-01: https://openapi.programming-hero.com/api/levels/all
   - Render center-aligned lesson buttons dynamically.

2. Default UI state
   - Show a default placeholder text in the vocabulary area.
   - Keep loading spinner hidden until a request starts.

3. On level click
   - Show loading spinner.
   - Fetch words for the selected level from API-02: https://openapi.programming-hero.com/api/level/{id}
   - Render word cards (word, meaning, pronunciation, action icons).
   - Highlight the active level button.
   - If no words found, show "No Word Found" message.
   - Hide loading spinner when complete.

4. Card actions
   - Details icon opens a modal and fetches word details from API-03: https://openapi.programming-hero.com/api/word/{id}
   - Modal shows pronunciation, example sentence, synonyms, and a "Complete Learning" button to close.
   - Heart icon saves the word to a saved list (use localStorage).
   - Sound icon triggers pronounceWord(word) using SpeechSynthesis.

5. Search behavior
   - Typing in search resets the active level.
   - Search across loaded words (or call API if needed) and display matching cards.
   - Show empty state if no results.

6. Data handling & UX
   - Avoid rendering falsy values (undefined/null).
   - Provide clear error/empty messages.
   - Ensure responsive layout and accessible controls.

7. Extras
   - Persist saved words in localStorage and show them in a separate section.
   - Keep interactions fast and show spinner only when network requests are in progress.
