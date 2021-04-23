const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const fbBtn = document.getElementById("facebook");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loader
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get data from API.
async function getQuote() {
  loading();
  const proxyUrl = "https://whispering-tor-04671.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    //console.log(data);

    // Set data to DOM.
    // Reduce text size for long quote.
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;

    // Set author 'Unknown' if there is no author.
    if (data.quoteAuthor === "") {
      quoteAuthor.innerText = "-Unknown";
    } else {
      quoteAuthor.innerText = ` - ${data.quoteAuthor}`;
    }
    complete();
  } catch (error) {
    console.log(`Woops, no quote found! ${error}`);
  }
}

// Tweet the quote.
function tweetQoute() {
  const quote = quoteText.innerText;
  const author = quoteAuthor.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_black");
}

// // Post the quote to facebook.
// function postQoute() {
//   const quote = quoteText.innerText;
//   const author = quoteAuthor.innerText;
//   const fbUrl = `https://www.facebook.com/dialog/share?
//   app_id=145634995501895
//   &display=${quote}
//   &href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2F&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer`;
//   window.open(fbUrl, "_black");
// }

// Listen the events
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQoute);
//fbBtn.addEventListener("click", postQoute);

// On load;
getQuote();
