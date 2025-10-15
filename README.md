# Minesweeper Web Application

This is a simple, single-page web application that implements an 8x8 Minesweeper game with 10 randomly placed mines. The application is built using HTML, CSS, and JavaScript, providing a clean and interactive user experience.

## Features

*   **8x8 Grid:** A classic Minesweeper grid size for quick and challenging games.
*   **10 Random Mines:** Mines are randomly distributed across the board at the start of each game.
*   **Neighbor Count Logic:** Cells display the number of adjacent mines (0-8) when revealed.
*   **Automatic Empty Cell Revelation:** Clicking on an empty cell (0 adjacent mines) automatically reveals all adjacent empty cells and their numbered borders, just like the classic game.
*   **Game Over State:**
    *   Clicking a mine immediately ends the game, displays a "BOOM! Game Over." message, and reveals the location of all mines.
    *   A "Congratulations! You Won!" message is displayed if all non-mine cells are successfully revealed.
*   **Reset Button:** A button to easily start a new game at any time.

## How to Run

1.  **Save the Files:** Save the provided `index.html`, `style.css`, and `script.js` files into a single directory on your computer.
2.  **Open `index.html`:** Navigate to the directory where you saved the files and open `index.html` with your preferred web browser (e.g., Chrome, Firefox, Edge).
3.  **Play the Game:**
    *   Click on any square to reveal it.
    *   If you click a mine, the game ends, and all mines are shown.
    *   If you click a numbered square, it tells you how many mines are adjacent to it.
    *   If you click an empty square (no adjacent mines), it will automatically clear a section of the board.
    *   Try to reveal all non-mine squares to win!
4.  **Reset:** Click the "Reset Game" button to start a new game with a fresh board and new mine placements.

## File Structure

*   `index.html`: The main HTML file that provides the structure of the web page.
*   `style.css`: Contains all the CSS rules for styling the game grid, cells, and messages.
*   `script.js`: Implements the core game logic, including board setup, mine placement, neighbor calculation, and event handling.
*   `README.md`: This file, providing information about the application.
*   `LICENSE`: The full text of the MIT License.
