// const createElement = (arr)
// => {
//     console.log(arr);
// };

// const synonym = {"enthusiastic", "excited", "keen"}
// createElement(synonym);

const createElement = (arr) => {
    const hetmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
    console.log(hetmlElements.join(" "));
};

const synonym = ["enthusiastic", "excited", "keen"]
createElement(synonym);

