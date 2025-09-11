const createElements = (arr) => {
    const htmlElements = arr.map((el) => `<span class="btn bg-sky-100 rounded-md text-center">${el}</span>`);
    return htmlElements.join(" ");
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    } else {
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

let fetchData = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then((res) => res.json())
        .then((json) => lessonsData(json.data))
}


const removeActionClass = () => {
    const lessonBtn = document.querySelectorAll(".lesson-btn");
    // console.log(lessonBtn);
    lessonBtn.forEach(btn => btn.classList.remove("active"));
}

const lessonword = (id) => {
    // console.log(id);
    manageSpinner(true)
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActionClass(); // Remove Active Class
            const clickBtn = document.getElementById(`lesson-btn-${id}`)
            clickBtn.classList.add("active"); // Active class add korsi
            lessonWordDisplay(data.data);
        })
}

const lessonwordDetails = async (id) => {
    let url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url);
    const details = await res.json();
    wordDetailDisplay(details.data)
}

const wordDetailDisplay = (word) => {
    // console.log(wor.data);
    let modalContainer = document.getElementById("details-container");
    // let modalCreate = document.createElement("div")
    modalContainer.innerHTML = `<div class="">
                    <h3 class="text-3xl font-bold">${word.word} ( <i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h3>
                    <p class="py-3 text-xl font-semibold">Meaning</p>
                    <p class="text-xl font-bangla">${word.meaning}</p>
                    <p class="py-3 text-xl font-semibold">Example</p>
                    <p class="text-xl font-bangla">${word.sentence}</p>
                    <p class="py-3 text-xl font-semibold font-bangla">সমার্থক শব্দ গুলো</p>
                    <div class="">
                        ${createElements(word.synonyms)}
                    </div>
                    
                </div>`;
    document.getElementById("my_modal_5").showModal();
    // modalContainer.appendChild(modalCreate)

}

const lessonWordDisplay = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";
    if (words.length == 0) {
        wordContainer.innerHTML = `
            <div class="text-center col-span-full py-10 rounded-xl font-bangla">
            <img class="mx-auto" src="assets/alert-error.png" alt="alert-error.png">
            <p class="text-2xl font-medium text-gray-500 pb-5">আপনি এখনো কোন Lesson Select করেন ন</p>
            <h2 class="text-6xl font-bold">একটি Lesson Select করুন।</h2>
            </div>
            `
        manageSpinner(false)
        return
    }
    for (const word of words) {
        const cardsOfDiv = document.createElement('div');
        cardsOfDiv.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5">
            <h2 class="font-bold text-xl">${word.word ? word.word : "Word Missing"}</h2>
            <p class="py-5">Meaning /Pronounciation</p>
            <div class="font-bold text-2xl font-bangla">"${word.meaning ? word.meaning : "Word Meaning Missing"} / ${word.pronunciation ? word.pronunciation : "Pronunciation Missing"}"</div>
            <div class="flex justify-between items-center">
                <button onclick="lessonwordDetails(${word.id})" class="btn"><i class="fa-solid fa-circle-info"></i></button> 
                <button onclick="pronounceWord('${word.word}')" class="btn"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>`

        wordContainer.appendChild(cardsOfDiv);

    }
    manageSpinner(false)
}

let lessonsData = ((lessons) => {
    // 1 get lessons-container from html and empty innerHtml into lessons-container
    let lessonsContainer = document.getElementById("lesons-container");
    lessonsContainer.innerHTML = "";

    // 2. 

    for (const lesson of lessons) {
        // console.log(lesson)
        // 3. Create Elements
        let buttons = document.createElement("div");
        buttons.innerHTML = `
                    <a href="#">
                        <button id="lesson-btn-${lesson.level_no}" onclick="lessonword(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
                    </a>`;

        lessonsContainer.appendChild(buttons)
    }
})


document.getElementById('searchBtn').addEventListener("click", () => {
    removeActionClass();
    const input = document.getElementById("searchInputField");
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue)
    input.value = "";

    fetch("https://openapi.programming-hero.com/api/words/all")
        .then((res) => res.json())
        .then((data) => {
            const allWords = data.data;
            console.log(allWords);
            const filterWords = allWords.filter((word) => word.word.toLowerCase().includes(searchValue)
            )
            lessonWordDisplay(filterWords)
        })
})


fetchData()