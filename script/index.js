const createElement = (arr) => {
    const hetmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
    return hetmlElements.join(" ");
};

function pronounceWord(word) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-EN'; // Japanese
      window.speechSynthesis.speak(utterance);
    }

const manageSpinner = (status) => {
  if(status == true){
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  }else{
     document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
   
  }
};


const loadlessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
        .then(res => res.json()) // promise of data
        .then(json => displayLessons(json.data)) // data is the result of the promise of data
}

const removeActive = () => {
  const lessonbuttons = document.querySelectorAll(".lesson-btn");
  lessonbuttons.forEach(btn => btn.classList.remove("active"));
};

const loadlevelWord = (id) => {
  manageSpinner(true); // show spinner when the function is called
   const url = `https://openapi.programming-hero.com/api/level/${id}`;
   fetch(url)
    .then(res => res.json())
    .then(data => {
      removeActive(); // remove active class from all buttons before adding it to the clicked button
      const clickbtn = document.getElementById(`lesson-btn-${id}`);
      clickbtn.classList.add("active"); // add active class to the clicked button
      displayLevelWords(data.data)
    });
};

const loadworddetail = async(id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
}


// {
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার",
//     "level": 1,
//     "sentence": "The kids were eager to open their gifts.",
//     "points": 1,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "enthusiastic",
//         "excited",
//         "keen"
//     ],
//     "id": 5
// }





const displayWordDetails = (word) => {
   console.log(word);
   const detailsbox = document.getElementById("details-container");
     detailsbox.innerHTML = `
     <div class="">
      <h3 class="text-2xl font-bold"> ${word.word} ( <i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h3>
     </div>
     <div class="">
      <h3 class="font-bold">Meaning</h3>
      <p>${word.meaning}</p>
     </div>
     <div class="">
      <h3 class="font-bold">Example</h3>
      <p>${word.sentence}</p>
     </div>
     <div class="">
      <h3 class="font-bangla font-bold">সমার্থক শব্দ গুলো</h3>
      <div class="">
        ${createElement(word.synonyms)}
      </div>
     </div>
     `;
    
    document.getElementById("word_modal").showModal();
};

const displayLevelWords = words => {
  //console.log(words); it is in the form of an array of objects. each object has a word and its meaning. but we need to show it in UI. so we need to loop through the array and create a card for each word and its meaning. then we need to append the card to the container. but before that we need to clear the container. otherwise, when we click on another lesson, the words will be added to the existing words. so we need to clear the container before adding new words.

  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = ""; // clear the container before adding new words

  //for blank container put some word

  if(words.length === 0){
    wordContainer.innerHTML = `
    <div class="text-center col-span-full rounded-xl py-10 space-y-6 font-bangla">
          <img class="mx-auto" src="./assets/alert-error.png" alt="Error" />
          <p class=" text-xl font-medium text-gray-300 ">এই লেসনে কোন শব্দ নেই</p>
          <h2 class="font-bold text-2xl">অন্য একটি Lesson Select করুন।</h2>
          </div>
    `;
    manageSpinner(false); // hide spinner if there are no words to display
    return;
  };

//   for(let word of words){
//     console.log(word);
    // dekhe dekhe bosai
    // {
    // "id": 71,
    // "level": 1,
    // "word": "Apple",
    // "meaning": "আপেল",
    // "pronunciation": "অ্যাপল"
    // }


// } lets use forEach loop instead of for of loop
  words.forEach(word => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML=`
    <div class="bg-white rounded-xl shadow-sm text-center py-20 px-5 space-y-4">
          <h2 class="font-bold text-2xl">${word.word ? word.word : "Word not available" }</h2>
          <p class="font-semibold">${word.meaning ? word.meaning : "Meaning not available"} / ${word.pronunciation ? word.pronunciation : "Pronunciation not available"}</p>
          <div class="text-2xl font-medium font-bangla">""</div>
          <div class="flex justify-between items-center">
          
           <button onclick="loadworddetail(${word.id})" class="btn  bg-[#1A91FF1a] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>

            <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF1a] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-up"></i></button>
           

         </div>
        
    `;
    wordContainer.append(card);
});
manageSpinner(false); // hide spinner after the words are displayed
};


const displayLessons = lessons => {
    // 1. get the container where the lessons will be displayed
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = ""; // clear the container before adding new lessons
  
    //  When this function runs:
  // On page load
  // On refresh
  // On search reset
  // On re-fetch
 
  // Without clearing:
   // ❌ Levels repeat
    // ❌ Active button breaks
     // ❌ Event handling becomes messy

    // 2. loop through the lessons and create a card for each lesson. get into every lessons
      for(let lesson of lessons){
       
      
    console.log(lesson);
    // 3. create a div element for the card and add the necessary classes and content to it
      const btnDiv = document.createElement("div");
      btnDiv.innerHTML = `<button id="lesson-btn-${lesson.level_no}"
       onclick="loadlevelWord(${lesson.level_no})" class=" btn btn-outline btn-primary lesson-btn"
                  ><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
                  `;
    // 4. append the card to the      container 
      levelContainer.appendChild(btnDiv);
      }
}
loadlessons();

document.getElementById("btn-search").addEventListener("click", () => { 
  removeActive(); // remove active class from all buttons when search is performed
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue);

   fetch (`https://openapi.programming-hero.com/api/words/all`)
   .then(res => res.json())
   .then(data => {
     const allWords = data.data;
    console.log(allWords);
   const filterwords = allWords.filter(word => word.word.toLowerCase().includes(searchValue));
    
    //console.log(filterwords);
    displayLevelWords(filterwords);
});   
});
