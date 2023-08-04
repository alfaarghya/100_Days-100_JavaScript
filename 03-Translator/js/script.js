let input = document.getElementById("user-input");
let output = document.getElementById("translate-output");
let exchange = document.querySelector(".exchange i");
let langOption = document.querySelectorAll(".lang-option-box div select");
let speakBtn = document.querySelectorAll(".options li .speakBtn");
let copyBtn = document.querySelectorAll(".options li .copyBtn");
let darkBtn = document.querySelector(".dark-mode");
let lightBtn = document.querySelector(".light-mode");

/* adding language options into select tag */
langOption.forEach((tag, id) => {
  for (let countryCode in countries) {
    let selected =
      id == 0
        ? countryCode == "en-GB"
          ? "selected"
          : ""
        : countryCode == "bn-IN"
        ? "selected"
        : "";
    let option = `<option ${selected} value = "${countryCode}">
                       ${countries[countryCode]}
                      </option>`;
    tag.insertAdjacentHTML("beforeend", option);
  }
});
            /*---- ----*/

/*---- Translate the input text ----*/
input.addEventListener("keyup", () => {
  if (!input.value) {
    output.value = "";
  } else {
    let text = input.value;
    let translateFrom = langOption[0].value;
    let translateTo = langOption[1].value;
    if (!text) {
      return;
    }

    output.setAttribute("placeholder", "Translating....");
    let api = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        output.value = data.responseData.translatedText;
        data.matches.forEach((data) => {
          if (data.id === 0) {
            output.value = data.translation;
          }
        });
        output.setAttribute("placeholder", "Translate");
      });
  }
});
            /*---- ----*/

/*---- Speak Button ----*/
speakBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        if(!input.value || !output.value){
            return;
        }
        let utterance;
        if(btn.id == "inp-speak") {
            utterance = new SpeechSynthesisUtterance(input.value);
            utterance.lang = langOption[0].value;
        } else if(btn.id == "opt-speak") {
            utterance = new SpeechSynthesisUtterance(output.value);
            utterance.lang = langOption[1].value;
        }
        speechSynthesis.speak(utterance);
    });
});
    /*---- ----*/

/*---- Copy Button ----*/
copyBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        if(!input.value || !output.value){
            return;
        }
        if(btn.id == "inp-copy") {
            // console.log(input.value);
            navigator.clipboard.writeText(input.value);
        } else if(btn.id == "opt-copy") {
            // console.log(output.value);
            navigator.clipboard.writeText(output.value);
        }
    });
});
    /*---- ----*/

/*---- Exchange Button ----*/
exchange.addEventListener("click", () => {
    let tempText = input.value;
    input.value = output.value;
    output.value = tempText;
    
    let tempLang = langOption[0].value;
    langOption[0].value = langOption[1].value;
    langOption[1].value = tempLang;
});
    /*---- ----*/

/*---- Dark Mode & Light Mode ----*/
darkBtn.addEventListener("click", () => {
    document.querySelector("body").classList.add("body-dark");
    langOption[0].classList.add("select-dark");
    langOption[1].classList.add("select-dark");
    input.classList.add("textarea-dark");
    output.classList.add("textarea-dark");
    document.querySelector(".link a").classList.add("link-dark");
    document.querySelectorAll(".all-icon").forEach(btn => {
        btn.classList.add("all-icon-dark");
    });
});

lightBtn.addEventListener("click", () => {
    document.querySelector("body").classList.remove("body-dark");
    langOption[0].classList.remove("select-dark");
    langOption[1].classList.remove("select-dark");
    input.classList.remove("textarea-dark");
    output.classList.remove("textarea-dark");
    document.querySelector(".link a").classList.remove("link-dark");
    document.querySelectorAll(".all-icon").forEach(btn => {
        btn.classList.remove("all-icon-dark");
    });
})
        /*---- ----*/
