import messages from "../lang/messages/en/user.js";
const xhttp = new XMLHttpRequest();
const endpointRoot = "https://kimmm-c.com/COMP4537/labs/4/";
const resource = "addword";
const wordRegexPattern = /^[^\d\s]+$/;
const defRegexPattern = /^[^\d]+$/;

const wordSection = document.getElementById("word-section");
const definitionSection = document.getElementById("definition-section");
const inputBox = document.getElementById("word-box");
const definitionBox = document.getElementById("definition-box");
const submitButton = document.getElementById("submit-button");
const statusArea = document.getElementById("status-area");

function postRequest(word, definition) {
  if (
    wordRegexPattern.test(word) &&
    defRegexPattern.test(definition) &&
    word.length > 0 &&
    definition.length > 0
  ) {
    let params = messages.qParamWord + word + messages.qParamDefinition + definition;
    xhttp.open("POST", endpointRoot + resource, true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send(params);
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
      }
      let response = JSON.parse(this.responseText);
      statusArea.innerText = response.message;
  }
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
    wordSection.textContent = messages.wordPlaceHolder;
    definitionSection.textContent = messages.definitionPlaceHolder;
  }

  run() {
    document.addEventListener("DOMContentLoaded", () => {
      submitButton.textContent = messages.submit;

      submitButton.addEventListener("click", () => {
        postRequest(inputBox.value, definitionBox.value);
      });
    });
  }
}

const engDict = new EnglishDictionary();
engDict.run();
