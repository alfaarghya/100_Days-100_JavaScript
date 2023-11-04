const pageLoadingAnimation = () => {

    gsap.from(".heading h1", {
        x: 100,
        opacity: 0,
        delay: 0.2,
        stagger: 0.8
    });
    gsap.from(".box1 .link #link", {
        x: 100,
        opacity: 0,
        delay: 0.8,
        stagger: 0.5
    });

    gsap.from(".box2", {
        opacity: 0,
        delay: 0.2,
    });

    gsap.from(".ld", {
        opacity: 0,
        delay: 0.5,
    });
    gsap.from("#qr-code", {
        opacity: 0,
        delay: 0.8,
    });
};
pageLoadingAnimation();

const qrCodeGenerator = () => {

    const defaultUrl = "https://github.com/alfaArghya";
    // const defaultUrl = "I Love U";
    let color1 = "#fff", color2 = "#000";
    let text = defaultUrl, size = 200;

    /* ---- change -> color of QR || ---- */
    // document.querySelector("#col-inp1")
    //     .addEventListener("input", (e) => {
    //         color1 = e.target.value;
    //         generateQRCode();
    //     });

    // document.querySelector("#col-inp2")
    //     .addEventListener("input", (e) => {
    //         color2 = e.target.value;
    //         generateQRCode();
    //     });

    /* !! important - scanner can not scan to much colorful QR !!  */
    /* ---- ----*/

    /* ---- change -> size of QR ---- */
    document.querySelector(".sizes").
        addEventListener("change", (e) => {
            size = e.target.value;
            generateQRCode();
        });
    /* ---- ---- */

    /* ---- change -> QR according to text & link ---- */
    document.querySelector("#link").
        addEventListener("input", (e) => {
            const value = e.target.value;
            text = value;
            if (!value) {
                text = defaultUrl;
            }
            generateQRCode();
        });
    /* ---- ---- */

    document.querySelector("#share-btn")
        .addEventListener("click", async () => {
            setTimeout(async () => {
                try {
                    const base64url = await resolveDataUrl();
                    const blob = await (await fetch(base64url)).blob();
                    const file = new File([blob], "QRCode.png", {
                        type: blob.type,
                    });
                    await navigator.share({
                        files: [file],
                        title: text,
                    });
                } catch (err) {
                    alert("Browser doesn't support share option")
                }
            })
        }, 100);


    /* ---- generate the qr code ---- */
    const generateQRCode = async () => {
        document.querySelector("#qr-code").innerHTML = "";
        new QRCode("qr-code", {
            text,
            height: size,
            width: size,
            // colorLight: color1,
            // colorDark: color2,
        });
        document.querySelector("#download-btn")
            .href = await resolveDataUrl();
    };
    generateQRCode();
    /* ---- ---- */

    const resolveDataUrl = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const img = document.querySelector("#qr-code img");
                if (img.currentSrc) {
                    resolve(img.currentSrc);
                    return;
                }
            }, 50);
        });
    };

};
qrCodeGenerator();
