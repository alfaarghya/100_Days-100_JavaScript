/* ---- Page animation Code ---- */
/* ---- ---- */

/* ---- Typing test Code ---- */
let quote = "";
let mistake = 0;
let time = 30;
let timer = "";
let startingPoint = 1;
const defaultQuote = [
    `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem recusandae dicta ipsa autem dignissimos corporis repudiandae esse deserunt distinctio quo?`,
    `Whether the FOMO makes your anxiety go through the roof, or you just struggle with keeping up with your daily to-do list, the world’s greatest minds have already been there.`,
    `This famous line holds a very true sentiment. Within “the grind” culture today, we tend to think that whatever doesn’t make us money or is an investment in the future is a waste of time. Instead, we should realize that so long as we enjoy an activity, the amount of time spent on it doesn’t matter.`,
    `Enjoy your Netflix binge if it will ease the stress of the day; go window shopping for hours; nap out your afternoon. Enjoy your downtime guilt-free.`,
    `Learning how to manage our time is a skill that requires constant work. We tend to lose a lot of time on unnecessary things – a minute here, ten minutes there, only to end up with an entire wasted day on meaningless tasks.`,
    `We more commonly hear “This too shall pass”, as a way of comforting ourselves during difficult times. But, what we often forget is that those moments are when we truly grow, harden, and evolve.`,
    `Simply waiting for a rough period to pass, we lose out on the opportunity to learn from the experience and become stronger. See what lessons you can learn from such a time.`,
    `Too many times we’ve heard stories of people regretting not taking a chance on their dreams because they weren’t good enough yet, or weren’t confident enough, or lacked the resources or support. When we keep promising ourselves that “someday” we’ll realize our passion, we effectively lose time.`,
    `In this quote from “The Merry Wives of Windsor”, Shakespeare alluded to the benefits of doing something earlier rather than missing an opportunity. It is so easy to put off things like writing up an email, checking a job listing, getting a medical check-up, and so on. We get lost in other things until it becomes too late`,
    `Have you noticed how each generation tends to reminisce about their past, claiming it was much better in their day? As it turns out, it is a very human thing to do — our brains tend to embellish the good memories. The times haven’t changed, only our perception of them.`,
    `It’s a very common saying that there are no age limits to anything in life. Morgan Freeman landed his first big role at 52, and Winston Churchill became Prime Minister at 66!`,
    `Let go of any fears or embarrassment that you are too young or too old to take up a career endeavor. The only mistake you can make is waiting so long, you give up in the end.`,
    `The biggest favor we can do ourselves is to accept the passage of time, both when good and bad things happen. The sooner we face our troubles, the sooner they’ll be over.`,
    `This is a thought from a fictional character, but an important one nonetheless. As he was about to leave his newfound family to rejoin the one that didn’t want him, Harry wanted to make the last good moments last as long as possible. With this thought, J.K. Rowling pointed out that, no matter how much we wish to stop time when hardship is on the horizon, we can’t go against it.`
];

const userInput = document.getElementById("type");
const stopBtn = document.getElementById("stop-test");
const reStartBtn = document.getElementById("restart-test");

//window loading
window.onload = () => {
    userInput.value = "";
    stopBtn.style.display = "none";
    generateRandomQuote();
}

/* ---- Generate Random Quote ---- */
const generateRandomQuote = async () => {
    const quoteHTML = document.getElementById("quote");
    try {
        const response = await fetch("https://api.quotable.io/random?minLength=300&maxLength=400");
        let data = await response.json();
        quote = data.content;
        // quoteHTML.innerHTML = quote;
        let arr = quote.split("").map((val) => {
            return "<span class='quote-char'>" + val + "</span>";
        });
        quoteHTML.innerHTML = arr.join("");
    } catch (error) {
        console.log(error);
        quote = defaultQuote[Math.floor(Math.random() * 14)];

        let arr = quote.split("").map((val) => {
            return "<span class='quote-char'>" + val + "</span>";
        });

        quoteHTML.innerHTML = arr.join("");
    }

};
/* ---- typing test start ---- */
const startTest = () => {
    mistake = 0;
    timer = "";
    startingPoint = 1;
    timeReduce();
    reStartBtn.style.display = "none";
    stopBtn.style.display = "block";
};
/* ---- ---- */

/* ---- user is typing ---- */
userInput.addEventListener("input", () => {

    let quoteChars = Array.from(document.querySelectorAll(".quote-char"));

    let userInputChars = userInput.value.split("");

    //condition for start timer
    if (startingPoint == 1 && userInputChars.length == 1) {
        startTest();
    }
    startingPoint++;

    //check user-input char & quote char
    quoteChars.forEach((char, idx) => {
        //if it's correct make it green
        if (char.innerText == userInputChars[idx]) {
            char.classList.add("correct");
            //if no input no color
        } else if (userInputChars[idx] == null) {
            if (char.classList.contains("correct")) {
                char.classList.remove("correct");
            } else {
                char.classList.remove("wrong");
            }
            //wrong input make it red
        } else {
            if (!char.classList.contains("wrong")) {
                mistake++;
                char.classList.add("wrong");
            }
            document.getElementById("mistake").innerText = mistake;
        }

        let check = quoteChars.every((element) => {
            return element.classList.contains("correct");
        });


        if (check) {
            result();
        }

    });

});
/* ---- ---- */

/* ---- timer ---- */
const updateTime = () => {
    if (time == 0) {
        result();
    } else {
        document.getElementById("time").innerText = --time;
    }
}

const timeReduce = () => {
    time = 30;
    timer = setInterval(updateTime, 1000);
}
/* ---- ---- */

/* ---- result of typing test ---- */
const result = () => {
    document.querySelector(".result-hide").style.display = "none";
    document.querySelector(".result-show").style.display = "block";
    clearInterval(timer);
    stopBtn.style.display = "none"
    userInput.disabled = true;
    let timeTaken = 1;
    if (time != 0) {
        timeTaken = (30 - time) / 100;
    }
    document.querySelector("#accuracy").innerText = Math.round(((userInput.value.length - mistake) / userInput.value.length) * 100) + " %";

    document.querySelector("#speed").innerText = (userInput.value.length / 5 / timeTaken).toFixed(2) + " wpm";
}
/* ---- ---- */
/*---- ---- */