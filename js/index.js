const p = console.log;

// GET THE REFERENCES
const $container = document.querySelector(".main-content");
const $links = document.querySelectorAll(".nav-link");

// CREATE THE OBJECT TO STORE THE LOADED CONTENT
const contents = {};

fetch("./partials/home.html").then(function(response){
     return response.text();
}).then(function(data){
    $container.innerHTML = data;
})


// CREATE THE FUNCTION 
const storeContents = function(nav) {
   if (!contents[nav]) {
         fetch(nav)
           .then(function(response){
             return response.text();
         })
           .then(function(data){
             contents[nav] = data;
             $container.innerHTML = contents[nav];
         })
   } else {
       $container.innerHTML = contents[nav];
   }
};


// CREATE THE FUNCTION THAT WILL HANDLE A LINK-CLICK:
const handleClick =function (e) {
    e.preventDefault();
    let url = e.target.href;
    
  storeContents(url);
};

// REGISTER handleClick FOR THE CLICK EVENT ON A NAV-BAR LINK
for (let i=0; i < $links.length; i++) {
    $links[i].addEventListener("click", handleClick);
}