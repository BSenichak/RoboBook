let books = JSON.parse(localStorage.getItem("fbooks"))
    ? JSON.parse(localStorage.getItem("fbooks"))
    : [];

if (books.length != 0) render();

function render() {
    document.querySelector("main").innerHTML = "";
    for (let i = 0; i < books.length; i++) {
        const book = books[i];
        const title = book.title;
        const author = book.author_name;
        const year = book.first_publish_year;
        const link = book.cover_i;
        const key = book.key;
        let card = document.createElement("div");
        card.classList.add("card");
        let img = document.createElement("img");
        img.src = link
            ? `https://covers.openlibrary.org/b/id/${link}-M.jpg`
            : "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg";
        card.appendChild(img);
        let h3 = document.createElement("h3");
        h3.textContent = title;
        card.appendChild(h3);
        let p = document.createElement("p");
        p.textContent = author;
        card.appendChild(p);
        let span = document.createElement("span");
        span.textContent = year;
        card.appendChild(span);

        let btn = document.createElement("button");
        btn.textContent = "Read More";
        card.appendChild(btn);
        let remove = document.createElement("button");
        remove.className = "btn"
        remove.innerHTML = `<i class="fa-solid fa-bookmark"></i>`;
        remove.addEventListener("click", () => {
            localStorage.setItem(
                "fbooks",
                JSON.stringify(
                    JSON.parse(localStorage.getItem("fbooks")).filter(
                        (b) => b.key != key
                    )
                )
            );
            location.reload();
        });
        card.appendChild(remove);
        btn.addEventListener("click", () => {
            window.location.href = `https://openlibrary.org${key}`;
        });

        document.querySelector("main").appendChild(card);
    }
}
