// get all the references
let form = document.querySelector(".dictionaryForm");
let wordInput = document.querySelector(".wordInput");
let wordInfo = document.querySelector(".meaning");
let searchButton = document.querySelector(".searchBtn");
let loder = document.querySelector(".loading");



async function getmeaning(word) {
  console.log(word);

  loder.classList.add("active");
  setTimeout(() => {
    loder.classList.remove("active");
  }, 2000);
    // make a api request
  try {
    let response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
  
    // parse the json to js object
    let data = await response.json();
 console.log(data);
    let paragraph = document.createElement("p");
    // reset the wordInfo
    wordInfo.innerHTML = "";
    // get the audio data
    let audioSource = data[0].phonetics[0].audio;
    // set the content of the paragraph element
    paragraph.innerHTML = `
        <h3><i><span class='fas fa-volume-up audio-icon'></span>
        <audio class='audio'>
            <source src=${audioSource} type='audio/mpeg'>
        </audio>
        Word: <b class="font-italic">${data[0].word}</b></i></h3>`;
    // append the created paragraph to the wordInfo
    wordInfo.appendChild(paragraph);
    document.querySelector(".audio-icon").addEventListener("click", (event) => {
      document.querySelector(".audio").play();
    });
    // create a list
    let list = document.createElement("ul");
    list.style.listStyleType = "none";
    let meanings = data[0].meanings;
    for (let meaning of meanings) {
    
      let listItem = document.createElement("li");
      listItem.classList.add("text-primary", "display-6", "p-1");
      
      listItem.innerHTML = `${meaning.partOfSpeech}`;
     
      let subList = document.createElement("ul");
      subList.style.listStyleType = "disc";
     
      let definitions = meaning.definitions;
      for (let definition of definitions) {
      
        let subListItem = document.createElement("li");
        subListItem.classList.add("text-secondary", "fs-6", "p-1");
      
        subListItem.innerHTML = `<em>${definition.definition}</em>`;
       
        subList.appendChild(subListItem);
      }
      listItem.appendChild(subList);
    
      list.appendChild(listItem);
    }
    wordInfo.appendChild(list);
  } catch (error) {
    
    let meaningdata = document.querySelector(".errormeaning");
   let dataerror=document.createElement("h2")
   dataerror.className=

   dataerror.innerHTML=("Type your meaningfull word")

   meaningdata.appendChild(dataerror);



    console.error("error fetching the meaning of the word");
     form.reset();
  }
}

function submited(event) {
  event.preventDefault();
  let word=wordInput.value.trim()

  console.log(word.length);
  if(word.length){
    getmeaning(word);

  } else {
        alert("please enter the  word");
      }
      form.reset();
 
  
}
form.addEventListener("submit",submited)
searchButton.addEventListener("click",submited)

