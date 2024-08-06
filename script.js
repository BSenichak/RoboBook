let load = false;
let page = 1;
let query = "the+lord+of+the+rings";
let pages = 0;
localStorage.getItem("fbooks") || localStorage.setItem("fbooks", JSON.stringify([]));

async function getBooks() {
    const url = `https://openlibrary.org/search.json?q=${query}&page=${page}&limit=10`;
    try {
        const response = await fetch(url);
        const result = await response.json();
        document.querySelector("main").innerHTML = "";
        let books = result.docs;
        let total = result.numFound;
        pages = Math.ceil(total / 10);
        document.querySelector(".pagination").style.display = "flex";
        document.querySelector(".count").textContent = `${page} of ${pages}`;
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
            let save = document.createElement("button");
            save.className = "btn"
            save.innerHTML = `<i class="fa-solid fa-bookmark"></i>`;
            save.addEventListener("click", () => {
                save.innerHTML = `<i class="fa-solid fa-bookmark"></i>`;
                if (JSON.parse(localStorage.getItem("fbooks")).find((b) => b.key == key)) {
                    alertify.error("Already saved");
                    return;
                }
                localStorage.setItem(
                    "fbooks",
                    localStorage.getItem("fbooks")
                        ? JSON.stringify([
                              ...JSON.parse(localStorage.getItem("fbooks")),
                              book,
                          ])
                        : JSON.stringify([book])
                );
                alertify.success("Saved");
            });
            card.appendChild(save);
            btn.addEventListener("click", () => {
                window.location.href = `https://openlibrary.org${key}`;
            });

            document.querySelector("main").appendChild(card);
        }
        load = false;
        document.querySelector(".loadoverlay").style.display = "none";
    } catch (error) {
        console.error(error);
    }
}

document.querySelector("#search").addEventListener("click", () => {
    page = 1;
    query = document.querySelector("input").value;
    load = true;
    document.querySelector(".loadoverlay").style.display = "flex";
    getBooks();
});

document.querySelector(".next").addEventListener("click", () => {
    if (page >= pages) return;
    page++;
    load = true;
    document.querySelector(".loadoverlay").style.display = "flex";
    getBooks();
});

document.querySelector(".prev").addEventListener("click", () => {
    if (page <= 1) return;
    page--;
    load = true;
    document.querySelector(".loadoverlay").style.display = "flex";
    getBooks();
});
