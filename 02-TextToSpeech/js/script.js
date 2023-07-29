const txtArea = document.getElementById("txt-area");
const voiceList = document.getElementById("select-voice");
const speakPauseBtn = document.getElementById("speak-pause");

let speech = speechSynthesis;
let isSpeaking = true;

speech.addEventListener("voiceschanged", voices);   //adding voices in html

speakPauseBtn.addEventListener("click", e =>{
    e.preventDefault();
    if(txtArea.value !== "") { //if text in text-area
        if(!speech.speaking) {
            textTOspeech(txtArea.value);
        }
        if(txtArea.value.length > 0) {
            setInterval(() => {
                if(!speech.speaking && !isSpeaking) {
                    isSpeaking = true;
                    speakPauseBtn.innerText = "Speak";
                } else {}
            },100);
            if(isSpeaking) {
                speech.resume();
                isSpeaking = false;
                speakPauseBtn.innerText = "Pause";
            } else {
                speech.pause();
                isSpeaking = true;
                speakPauseBtn.innerText = "Resume";
            }
        }
    } else {    //if no text in text-area
        speakPauseBtn.innerText = "Speak";
    }
});

/*---- Getting Voices form API */
function voices() {
    for(let voice of speech.getVoices()) {
        let selected = voice.name === "Google US English" ? "selected" : " ";
        let option = `<option value = "${voice.name}" ${selected}>
                        ${voice.name} (${voice.lang})
                      </option>`;
        voiceList.insertAdjacentHTML('beforeend', option);
    }
}
/*---- ---*/

/*---- Converting text into voice ----*/
function textTOspeech(text) {
    let utterThis = new SpeechSynthesisUtterance(text);
    for(let voice of speech.getVoices()) {
        if(voice.name === voiceList.value) {
            utterThis.voice = voice
        }
    }
    speech.speak(utterThis);
}
/*---- ----*/