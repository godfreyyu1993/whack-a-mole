document.addEventListener("DOMContentLoaded", function () {
    // Get references to elements
    const startButton = document.getElementById("startButton");
    const scoreDisplay = document.getElementById("score");
    const timeLeftDisplay = document.getElementById("timeLeft");
    const holes = document.querySelectorAll(".hole");
    const finalMessage = document.getElementById("finalMessage");

    let score = 0;
    let timeLeft = 60; // Initial time left in seconds
    let timerId; // Variable to store timer interval ID

    // Function to start the game
    function startGame() {
        // Reset score and time left
        score = 0;
        timeLeft = 60;

        // Update score and time left displays
        scoreDisplay.textContent = score;
        timeLeftDisplay.textContent = timeLeft;

        // Reset final message
        finalMessage.textContent = "";

        // Show moles randomly at intervals
        timerId = setInterval(showMole, 1000);

        // Set countdown timer
        countdown();
    }

    // Function to show a mole randomly
    function showMole() {
        // Hide all moles
        holes.forEach(hole => {
            hole.classList.remove("mole");
        });

        // Choose a random hole to show the mole
        const randomIndex = Math.floor(Math.random() * holes.length);
        holes[randomIndex].classList.add("mole");

        // Remove mole after a random time (0.5 to 2.5 seconds)
        setTimeout(() => {
            holes[randomIndex].classList.remove("mole");
        }, Math.random() * 2000 + 500);
    }

    // Function to handle click on a mole
    function moleClicked(event) {
        if (event.target.classList.contains("mole")) {
            // If clicked on a mole, increase score and update display
            score++;
            scoreDisplay.textContent = score;
        }
    }

    // Function to handle countdown timer
    function countdown() {
        timerId = setInterval(() => {
            timeLeft--;

            if (timeLeft <= 0) {
                // If time is up, stop the game
                clearInterval(timerId);
                finalMessage.textContent = "Game Over! Your score: " + score;
            } else {
                // Update time left display
                timeLeftDisplay.textContent = timeLeft;
            }
        }, 1000);
    }

    // Add event listener to start button to start the game
    startButton.addEventListener("click", startGame);

    // Add event listener to game board to handle clicks on moles
    holes.forEach(hole => {
        hole.addEventListener("click", moleClicked);
    });
});
