let fetchData = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then((res) => res.json())
        .then((json) => lessonsData(json.data))
}
// {
// "id": 4,
// "level": 5,
// "word": "Diligent",
// "meaning": "পরিশ্রমী",
// "pronunciation": "ডিলিজেন্ট"
// },
const lessonword = (id) => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => lessonWordDisplay(data.data))
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
                <button class="btn"><i class="fa-solid fa-circle-info"></i></button> 
                <button class="btn"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>`

        wordContainer.appendChild(cardsOfDiv);


    }
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
                        <button onclick="lessonword(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
                    </a>`;

        lessonsContainer.appendChild(buttons)
    }

})

fetchData()