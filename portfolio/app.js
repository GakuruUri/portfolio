// const sections = document.querySelectorAll('.section');
// const sectBtns = document.querySelectorAll('.controls');
// const sectBtn = document.querySelectorAll('.control');
// const allSections = document.querySelector('.main-content');


// function PageTransitions(){
//     //Button click active class
//     for (let i = 0; i < sectBtn.length; i++){
//         sectBtn[i].addEventListener('click', function(){
//             let currentBtn = document.querySelectorAll('.active-btn');
//             currentBtn[0].className = currentBtn[0].className.replace('active-btn', '');
//             // this doesn't exist in an arrow ==> function it exists in a function()
//             this.className += ' active-btn';
//         })
//     };

//     //Sctions Active
//     allSections.addEventListener('click', (e) =>{
//         const id = e.target.dataset.id;
//         if(id){
//             //remove selected from the other buttons
//             sectBtns.forEach((btn) => {
//                 btn.classList.remove('active')
//             })
//             e.target.classList.add('active')

//             //Hide other sections
//             sections.forEach((section) =>{
//                 section.classList.remove('active')
//             })

//             const element = document.getElementById(id);
//             element.classList.add('active');
//         }
//     })
//     //Toggle theme
//     const themeBtn = document.querySelector('.theme-btn');
//     themeBtn.addEventListener('click', () =>{
//         let element = document.body;
//         element.classList.toggle('light-mode')
//     })
// };

// //Portfolio Code
// const counter = document.querySelector(".counter-number");
// async function updateCounter() {
//     let response = await fetch("https://gyuplrkphqm44me7whvnygp6dm0zchyc.lambda-url.us-east-1.on.aws/");
//     let data = await response.json();
//     counter.innerHTML = 'Views: ${data}';
// }



// PageTransitions();



// // const sections = document.querySelectorAll('.section');
// // const sectBtns = document.querySelectorAll('.control'); // Selects the actual buttons
// // const allSections = document.querySelector('.main-content');

// // function PageTransitions() {
// //     // Button click active class
// //     sectBtns.forEach((btn) => {
// //         btn.addEventListener('click', function () {
// //             // Remove active class from all buttons
// //             sectBtns.forEach((button) => {
// //                 button.classList.remove('active-btn');
// //             });

// //             // Add active class to the clicked button
// //             this.classList.add('active-btn');

// //             // Remove active class from all sections
// //             sections.forEach((section) => {
// //                 section.classList.remove('active');
// //             });

// //             // Add active class to the selected section
// //             const id = this.dataset.id;
// //             const activeSection = document.getElementById(id);
// //             if (activeSection) {
// //                 activeSection.classList.add('active');
// //             }
// //         });
// //     });
// //     //Toggle theme
// //     const themeBtn = document.getquerySelector('.theme-btn');
// //     themeBtn.addEventListener('click', () =>{
// //         let element = document.body;
// //         element.classList.toggle('light-mode')
// //     })
// // }

// // PageTransitions();



const sections = document.querySelectorAll('.section');
const sectBtns = document.querySelectorAll('.controls');
const sectBtn = document.querySelectorAll('.control');
const allSections = document.querySelector('.main-content');

function PageTransitions(){
    // Button click active class
    for (let i = 0; i < sectBtn.length; i++){
        sectBtn[i].addEventListener('click', function(){
            let currentBtn = document.querySelectorAll('.active-btn');
            currentBtn[0].className = currentBtn[0].className.replace('active-btn', '');
            this.className += ' active-btn';
        });
    }

    // Sections Active
    allSections.addEventListener('click', (e) =>{
        const id = e.target.dataset.id;
        if(id){
            sectBtns.forEach((btn) => {
                btn.classList.remove('active')
            })
            e.target.classList.add('active')

            sections.forEach((section) =>{
                section.classList.remove('active')
            })

            const element = document.getElementById(id);
            element.classList.add('active');
        }
    })

    // Toggle theme
    const themeBtn = document.querySelector('.theme-btn');
    themeBtn.addEventListener('click', () =>{
        let element = document.body;
        element.classList.toggle('light-mode')
    })
}

// Portfolio Code
const counter = document.querySelector(".counter-number");
async function updateCounter() {
    try {
        let response = await fetch("https://gyuplrkphqm44me7whvnygp6dm0zchyc.lambda-url.us-east-1.on.aws/");
        let data = await response.json();
        console.log("API Response:", data); // Log the API response
        if (typeof data === 'number') {
            counter.innerHTML = `Views: ${data}`; // If the API returns a number
        } else if (data.views !== undefined) {
            counter.innerHTML = `Views: ${data.views}`; // If the API returns an object with a 'views' property
        } else {
            counter.innerHTML = 'Couldn\'t read views:';
        }
    } catch (error) {
        console.error("Error fetching view count:", error);
        counter.innerHTML = 'Couldn\'t read views:';
    }
}

PageTransitions();
updateCounter(); // Call the function to update the counter
