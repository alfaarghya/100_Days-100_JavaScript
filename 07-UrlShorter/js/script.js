const tinyUrl = () => {
    let url = document.getElementById("url").value;
    let apiUrl = "https://tinyurl.com/api-create.php?url=" + encodeURIComponent(url);
    let tinyUrl = document.getElementById("tiny-url");

    fetch(apiUrl)
        .then(res => res.text())
        .then(data => {
            tinyUrl.value = data;
        })
        .catch(err => {
            tinyUrl.value = "Error : Unable to Generate";
        });
}

document.getElementById("short-btn").addEventListener("click", tinyUrl);
document.getElementById("reload-btn").addEventListener("click", () => location.reload());