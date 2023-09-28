console.log("Вёрстка +10");
console.log("При загрузке приложения на странице отображаются полученные от API изображения +10");
console.log("Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API +10");
console.log("Поиск +30");
console.log("Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10");

let defaultTopic = 'baloon';

window.onload = function () {
  clear.click();
  loadResults(defaultTopic);
  document.querySelector(".input").focus();
};

function addImageTags(num){
  let container = document.querySelector(".images_container");
  let newNode;
  container.style.background = "lightseagreen";
  container.style.color = "lightgoldenrodyellow";
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
    
  if (num === 0) {
    addMessage('Nothing to show. Please try again');
  }

  for (let li = 0; li < num; li++){
      newNode = document.createElement("div");
      newNode.classList.add('image');
      let el = document.createElement('div');
      el.classList.add('download');
      newNode.appendChild(el);
      container.appendChild(newNode);
  }
}

function addMessage(msg, error){
  let container = document.querySelector(".images_container");
  let elemText = document.createTextNode(msg);
  container.style.background = "lightgoldenrodyellow";
  container.style.color = "lightseagreen";
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  container.appendChild(elemText);
  if (error !== undefined) {console.error("Error:", error);}
}

let search = document.querySelector(".search");
search.addEventListener("click", () => {
   loadResults(document.querySelector(".input").value);
   document.querySelector(".input").focus();
});

let clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
   document.querySelector(".input").value = "";
   document.querySelector(".input").focus();
});

let input = document.querySelector(".input");
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    loadResults(input.value);
    input.focus();
  }
});

async function loadResults(str) {
    if (str === '') {str = defaultTopic};
    const id = 'iOCrYZQ2VV6qat-P0MCPSdUucC1lZFWjmWpPasakYcM';
    const path = `https://api.unsplash.com/search/photos?query=${str}&per_page=30&orientation=landscape&client_id=${id}`;
    try {
      const res = await fetch(path);
      const data = await res.json();
      let url;
      if (data.errors != undefined ) {
        addMessage('An error has occurred. Please check the log for details.', data.errors[0]);
      } else
      { addImageTags(data.results.length);
        images = document.querySelectorAll(".image");
        images.forEach(function (img, idx) {
           url = data.results[idx].urls.small;
           let imgId = data.results[idx].id;
           img.style.backgroundImage = url ? `url(${url})` : "none";
           img.title = 'Open original image';
           let save = img.children[0];
           save.title = 'Download';

           img.addEventListener("click", () => {
              window.open(data.results[idx].links.html, "_blank");
           });

           save.addEventListener("click", (event) => {
                let request = new XMLHttpRequest();
                request.open("GET", `https://api.unsplash.com/photos/${imgId}/download?client_id=${id}`, true);
                request.onload = function (){
                  const obj = JSON.parse(request.responseText);
                  downloadFile(obj.url, imgId);
                }
                request.send(null);
                event.stopPropagation();
            });

        });
      }
    } catch (error) {
      addMessage('An error has occurred. Please check the log for details.', error);
    }
}
  
async function downloadFile (url, name) {
  const response = await fetch (url);
  const data = await response.blob ();
  const link = document.createElement ("a");
  link.download = `${name}-unsplash.jpg`;
  link.href = URL.createObjectURL (data);
  document.body.appendChild (link);
  link.click ();
  document.body.removeChild (link);
  URL.revokeObjectURL (link.href);
}
