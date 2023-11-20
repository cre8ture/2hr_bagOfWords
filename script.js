// import { updateGraph } from "./visualize";

// Function to convert text to a Bag of Words representation
function textToBoW(text) {
    // Tokenize the text by splitting it into words
    const words = text.toLowerCase().split(/\W+/).filter(word => word !== "");

    // Count the frequency of each word
    const wordCount = {};
    for (const word of words) {
        if (word in wordCount) {
            wordCount[word]++;
        } else {
            wordCount[word] = 1;
        }
    }

    const bowVector = Object.values(wordCount);

    return [wordCount, bowVector];
}

// Function to display the Bag of Words representation
function displayBoW(bow, bowVector) {
    const bowList = document.getElementById('bow-list');
    const bowListVector = document.getElementById('bow-vector');

    bowList.innerHTML = '';

    for (const word in bow) {
        const listItem = document.createElement('li');
        listItem.textContent = `${word}: ${bow[word]}`;
        bowList.appendChild(listItem);
    }
    bowListVector.textContent = bowVector.toString();
    updateGraph(bowVector)
}

// Event listener for the textarea input
const inputText = document.getElementById('input-text');
inputText.addEventListener('input', () => {
    const text = inputText.value;
    const [bow, bowVector] = textToBoW(text);
    displayBoW(bow, bowVector);
});
