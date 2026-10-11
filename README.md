## Overview

[Watch Star Collector Gameplay](Recording%202026-10-10%20212446.mp4)

The player controls a character on a set of platforms while stars fall from the top of the screen. Every star collected adds points to the score. When all the stars have been collected, they respawn and a new bomb is released, so each round is harder than the last. Touching a bomb ends the game, and the player can restart and try to beat their previous score.

The game runs entirely in the browser with no build step, and the page includes a styled interface with the game title and an on-screen controls guide.

## Key Features

* **Platformer Gameplay:** Run, jump, and move across multiple platforms.
* **Scoring System:** Earn 10 points for every star collected, with a live score display.
* **Increasing Difficulty:** Each time all stars are collected, they respawn and an additional bouncing bomb is added.
* **Game Over and Restart:** Hitting a bomb pauses the game and tints the player red. The game can then be restarted without reloading the page.
* **Arcade Physics:** Gravity, collisions, bounce, and world boundaries handled by Phaser's Arcade Physics engine.
* **Sprite Animations:** Left, right, and idle animations built from a sprite sheet.
* **Responsive Interface:** A styled HTML/CSS page with a controls guide displayed below the game.

## Controls

| Key | Action |
|---|---|
| `←` | Move left |
| `→` | Move right |
| `↑` | Jump |
| `Space` | Restart after Game Over |

## Technologies

* **Language:** JavaScript (ES6)
* **Game Framework:** [Phaser 3](https://phaser.io) (v3.55.2, loaded from cdnjs)
* **Physics:** Phaser Arcade Physics
* **Markup and Styling:** HTML5, CSS3
* **Concepts:** Game loop (`preload`, `create`, `update`), sprite sheets and animations, collision detection, overlap callbacks, groups, and game state management

## Project Structure

```
Star-Collector/
├── index.html           # Page layout and controls guide
├── assets/              # Game images
│   ├── sky.png          # Background
│   ├── platform.png     # Platforms and ground
│   ├── star.png         # Collectible
│   ├── bomb.png         # Enemy
│   └── dude.png         # Player sprite sheet
└── src/
    ├── script.js        # Game logic and Phaser configuration
    ├── styles.css       # Page styling
    └── phaser.min.js    # Local copy of Phaser (the page loads it from a CDN)
```

## Getting Started

### Requirements

* A modern web browser (Chrome, Edge, Firefox, or Safari)
* An internet connection, because Phaser is loaded from a CDN
* A local web server, because the browser needs to load the game images over HTTP

### Run Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/kclavasquinrivera/Star-Collector.git
   cd Star-Collector
   ```

2. **Start a local server** from the project folder. With Python:

   ```bash
   python -m http.server 8000
   ```

   Or with VS Code, right-click `index.html` and choose **Open with Live Server**.

3. **Open** [http://localhost:8000](http://localhost:8000) in your browser and start playing.

> Opening `index.html` directly (`file://`) may fail to load the images in some browsers, which is why a local server is recommended.

## Learning Outcomes

Through this project, I practiced:

* Structuring a game with Phaser's `preload`, `create`, and `update` lifecycle.
* Using Arcade Physics for gravity, collisions, and bouncing objects.
* Creating sprite animations from a sprite sheet.
* Handling keyboard input and player movement.
* Managing game state, including score, game over, and restart logic.
* Organizing a front-end project into separate HTML, CSS, JavaScript, and asset files.
* Publishing and documenting a project on GitHub as part of my programming portfolio.

## Future Improvements

* Save and display a high score using `localStorage`.
* Add sound effects and background music.
* Add multiple levels, moving platforms, and different enemy types.
* Add touch controls for mobile devices.
* Add a start menu and pause screen.
* Deploy the game with GitHub Pages so it can be played online.

## Project Background

I built this game to learn the fundamentals of 2D game development for the web: the game loop, physics, collisions, animation, and player input. The project follows the structure of Phaser's official "Making your first Phaser 3 game" tutorial, and I added my own page layout, styling, and physics adjustments. I published it on GitHub to document my progress and continue developing my software engineering skills.

## Credits

* Game framework: [Phaser](https://phaser.io)
* Game concept and sprite assets: Phaser 3 tutorial "Making your first Phaser 3 game"

**Note:** This is an educational project and is not intended for production use.
