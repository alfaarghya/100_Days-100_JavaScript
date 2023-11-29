let tinyUrlElement = document.getElementById("tiny-url");
const tinyUrl = () => {
    let url = document.getElementById("url").value;
    let apiUrl = "https://tinyurl.com/api-create.php?url=" + encodeURIComponent(url);

    fetch(apiUrl)
        .then(res => res.text())
        .then(data => {
            tinyUrlElement.value = data;
        })
        .catch(err => {
            tinyUrlElement.value = "Error : Unable to Generate";
        });
}

document.getElementById("short-btn").addEventListener("click", tinyUrl);
// document.getElementById("reload-btn").addEventListener("click", () => location.reload());
document.getElementById("copy-btn").addEventListener("click", () => {
    navigator.clipboard.writeText(tinyUrlElement.value)
});