const apiKey = "sD90iexO-O0Y88EeQosZQIcSq5eFt2kf9NgW4Dol9N8"

const formEl = document.querySelector("form")
const searchInputEl = document.getElementById("search-input")
const searchResultsEl = document.querySelector(".search-results")
const showMoreButtonEl = document.getElementById("show-more-button")
let inputData = ""
let page = 1
formEl.addEventListener("submit", (event) => {
    event.preventDefault()

    searchImages();
    // console.log("submit")
});
async function searchImages() {
    inputData = searchInputEl.value
    console.log(inputData)
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`;
    // console.log(url)
    const response = await fetch(url)
    //if you dont use await in response conversion it will log promise
    // it wait for data as=nd store it in json formate
    const data = await response.json()
    // console.log(data);
    if (page === 1) {
        searchResultsEl.innerHTML = "";
    }

    const resultsArray = data.results
    // console.log(result)
    resultsArray.map((result) => {
        const imageWrapper = document.createElement("div")
        imageWrapper.classList.add("search-result-card")
        const image = document.createElement("img")
        image.src = result.urls.small;
        image.alt = result.alt_description
        const imageLink = document.createElement("a")
        imageLink.href = result.links.html
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description
        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageLink)
        searchResultsEl.appendChild(imageWrapper)
        // console.log(result)
    })

    page++
    if (page >= 1) {
        showMoreButtonEl.style.display = "block";
        console.log("button style change")
    }


}
showMoreButtonEl.addEventListener("click", () => {
    searchImages();
})