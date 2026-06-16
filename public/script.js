document.getElementById("quoteBtn").addEventListener("click", async () => {
    try {
        const response = await fetch("https://dummyjson.com/quotes/random");
        const data = await response.json();

        document.getElementById("quote").innerText =
            data.quote + " — " + data.author;

        const history = document.getElementById("history");

        const li = document.createElement("li");
        li.innerText = data.quote + " - " + data.author;

        history.prepend(li);

        // Save quote in database
        await fetch("/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                quote: data.quote + " - " + data.author
            })
        });

    } catch (error) {
        document.getElementById("quote").innerText =
            "Error fetching quote";
    }
});

async function loadHistory() {
    try {
        const response = await fetch("/history");
        const quotes = await response.json();

        const history = document.getElementById("history");
        history.innerHTML = "";

        quotes.forEach(item => {
            const li = document.createElement("li");
            li.innerText = item.quote;
            history.appendChild(li);
        });

    } catch (error) {
        console.log(error);
    }
}

loadHistory();