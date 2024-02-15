import messages from "../lang/messages/en/user.js";
const xhttp = new XMLHttpRequest();
const endpointRoot = "https://kimmm-c.com/COMP4537/labs/4/getDefinition/";
const resource = "?word=";

const regexPattern = /^[^\d\s]+$/;

const inputBox = document.getElementById("word-box");
const definitionArea = document.getElementById("definition-area");
const submitButton = document.getElementById("submit-button");

function formatDefinition(word, numRQ, def) {
  return word + "\n" + messages.requestNo + numRQ + "\n" + def;
}

function formatFailureMessage(word, failedMessage) {
  return messages.trial + word + "\n\n" + failedMessage;
}

function getRequest(word) {
  if (regexPattern.test(word) && word.length > 0) {
    let params = resource + word;
    xhttp.open("GET", endpointRoot + params, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        let response = JSON.parse(this.responseText);
        const { word, numberOfRequests, definition } = response.data;
        definitionArea.innerText = formatDefinition(
          word,
          numberOfRequests,
          definition
        );
      } else {
        let response = JSON.parse(this.responseText);
        definitionArea.innerText = formatFailureMessage(word, response.message);
      }
    };
  } else {
    alert(messages.invalidInput);
  }
}

class EnglishDictionary {
  constructor() {
    this.initScreen();
  }

  initScreen() {
    inputBox.placeholder = messages.wordPlaceHolder;
  }

  run() {
    document.addEventListener("DOMContentLoaded", () => {
      submitButton.textContent = messages.submit;

      submitButton.addEventListener("click", () => {
        getRequest(inputBox.value);
      });
    });
  }
}

const engDict = new EnglishDictionary();
engDict.run();
