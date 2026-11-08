const images = document.getElementById("gallery");
const searchInput = document.getElementById("search");
const searchform = document.getElementById("search-form");
const searchbutton = document.getElementById("search-button");
const loadmore = document.getElementById("load-more");

let currentpage = 1;
let currentSearchValue = "";

const main = async (currentpage) => {
  const response = await fetch(
    `https://api.unsplash.com/photos?${currentpage}`,
    {
      headers: {
        Authorization: "Client-ID J_vYDL_B3VXSw8OoKt3cUg2NLt0foMqeQjujG5hkc6g ",
      },
    },
  );
  const result = await response.json();

  result.forEach((photo) => {
    const id = photo.id;
    const imageUrl = photo.urls.full;

    images.innerHTML += `
        <img src= "${imageUrl}" alt="${id}" class="h-auto w-full rounded-xl mb-4">`;
  });
};

const searchImages = async (currentpage) => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(currentSearchValue)}&page=${currentpage}`,
    {
      headers: {
        Authorization: "Client-ID J_vYDL_B3VXSw8OoKt3cUg2NLt0foMqeQjujG5hkc6g ",
      },
    },
  );
  const result = await response.json();

  result.results.forEach((photo) => {
    const id = photo.id;
    const imageUrl = photo.urls.full;
    
    images.innerHTML += `
        <img src= "${imageUrl}" alt="${id}" class="h-auto w-full rounded-xl mb-4">`;
  });
};

main(currentpage);

loadmore.addEventListener("click", async () => {
  loadmore.textContent= "Loading...";

  currentpage++;


  if (currentSearchValue) {
    await searchImages(currentpage);
  } else {
    await main(currentpage);
  }
   loadmore.textContent="Load more" 
});



searchform.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(currentpage);

  currentSearchValue = searchInput.value.trim();
  currentpage = 1;
  images.innerHTML = "";
  searchImages(currentpage);
});
