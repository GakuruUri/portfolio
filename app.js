const sections = document.querySelectorAll('.section');
const sectBtns = document.querySelectorAll('.controls');
const sectBtn = document.querySelectorAll('.control');
const allSections = document.querySelector('.main-content');


function PageTransitions(){
    //Button click active class
    for (let i = 0; i < sectBtn.length; i++){
        sectBtn[i].addEventListener('click', function(){
            let currentBtn = document.querySelectorAll('.active-btn');
            currentBtn[0].className = currentBtn[0].className.replace('active-btn', '');
            // this doesn't exist in an arrow ==> function it exists in a function()
            this.className += ' active-btn';
        })
    };

    //Sctions Active
    allSections.addEventListener('click', (e) =>{
        const id = e.target.dataset.id;
        if(id){
            //remove selected from the other buttons
            sectBtns.forEach((btn) => {
                btn.classList.remove('active')
            })
            e.target.classList.add('active')

            //Hide other sections
            sections.forEach((section) =>{
                section.classList.remove('active')
            })

            const element = document.getElementById(id);
            element.classList.add('active');
        }
    })
};


PageTransitions();



// const sections = document.querySelectorAll('.section');
// const sectBtns = document.querySelectorAll('.control'); // Selects the actual buttons
// const allSections = document.querySelector('.main-content');

// function PageTransitions() {
//     // Button click active class
//     sectBtns.forEach((btn) => {
//         btn.addEventListener('click', function () {
//             // Remove active class from all buttons
//             sectBtns.forEach((button) => {
//                 button.classList.remove('active-btn');
//             });

//             // Add active class to the clicked button
//             this.classList.add('active-btn');

//             // Remove active class from all sections
//             sections.forEach((section) => {
//                 section.classList.remove('active');
//             });

//             // Add active class to the selected section
//             const id = this.dataset.id;
//             const activeSection = document.getElementById(id);
//             if (activeSection) {
//                 activeSection.classList.add('active');
//             }
//         });
//     });
// }

// PageTransitions();
