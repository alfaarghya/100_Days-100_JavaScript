// https://api.quotable.io/random?minLength=100&maxLength=200

let quote = "";
const generateRandomQuote = async () => {
    const quoteHTML = document.getElementById("quote");
    try {
        const response = await fetch("https://api.quotable.io/random?minLength=100&maxLength=200");
        let data = await response.json();
        quote = data.content;
        // quoteHTML.innerHTML = quote;
        let arr = quote.split("").map((val) => {
            return "<span class='quote-char'>" + val + "</span>";
        });
        quoteHTML.innerHTML = arr.join("");
        // console.log(arr.join(""));
    } catch (error) {
        console.log(error);
        quote = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem recusandae dicta ipsa autem dignissimos corporis repudiandae esse deserunt distinctio quo?"

        let arr = quote.split("").map((val) => {
            return "<span class='quote-char'>" + val + "</span>";
        });

        quoteHTML.innerHTML = arr.join("");
        // console.log(arr.join(""));
    }

};

generateRandomQuote();