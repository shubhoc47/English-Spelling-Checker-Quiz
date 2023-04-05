const xhr = new XMLHttpRequest();
xhr.open("GET", "words.txt", true);
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const words = xhr.responseText.split("\n"); // read words from txt file
        let currentWordIndex = -1; // current index of the word being tested
        const synth = window.speechSynthesis; // SpeechSynthesis API instance

        // function to pronounce a word
        function speakWord(word) {
            const utterance = new SpeechSynthesisUtterance(word);
            synth.speak(utterance);
        }

        // function to check the answer
        function checkAnswer() {
            const answer = document.getElementById('answerBox').value;
            const first = words[currentWordIndex];
            const word = first.slice(0,(first.length-1))
            if (answer.toLowerCase() == word.toLowerCase()) {
                document.getElementById('feedback').textContent = 'Correct!';
                currentWordIndex++;
                setTimeout(function() {
                  if (currentWordIndex < words.length) {
                    speakWord(words[currentWordIndex]);
                  } else {
                    document.getElementById('feedback').textContent = 'Quiz completed!';
                  }
                }, 1000);
                document.getElementById('answerBox').value = ''; // Clear the answer box
              } else {
                document.getElementById('feedback').textContent = 'Incorrect. Please try again.';
            }
        }

        // function to show the correct answer
        function showAnswer() {
            const first = words[currentWordIndex];
            const word = first.slice(0,(first.length-1));
            document.getElementById('feedback').textContent = `The correct answer is ${word}.`;
        }

        // event listener for the Listen button
        document.getElementById('listenBtn').addEventListener('click', function() {
            if (currentWordIndex === -1) {
                currentWordIndex = Math.floor(Math.random() * words.length); // choose a random word to start with
            }
            speakWord(words[currentWordIndex]);
        });

        // event listener for the Submit button
        document.getElementById('submitBtn').addEventListener('click', checkAnswer);

        // event listener for the Show Answer button
        document.getElementById('showAnswerBtn').addEventListener('click', showAnswer);

        // event listener for the Enter key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                checkAnswer();
            }
        });
    }
};
xhr.send();
