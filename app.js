const wrongLetters = document.getElementById('wrong-letter-container')
const word = document.getElementById('word-letter-container')
const modal = document.getElementById('modal')
const playAgain = document.getElementById('play-Again')
const notification = document.getElementById('notification-container')
const finalMessage = document.getElementById('final-message')
const figurePart = document.querySelectorAll('.figure-part')


// My Word Array
const letters = ['programming' , 'apple' , 'javascript' , 'class' , 'afghanistan' , 'pakistan' , 'USA' , 'father' , 'mother' , 'oxford' , 'school' , 'univercity' , 'love'];

// find the random word from array
let selectedWord = letters[Math.floor(Math.random() * letters.length)] ;

console.log(selectedWord);

const correctLetter = [];
const wrongLetter = [];

function displayWord(){
    word.innerHTML =`
        ${selectedWord
        .split('')
        .map(letter => 
            `<span class='letter'>
                ${correctLetter.includes(letter)? letter : ''}
              </span>
            `
            ).join('')  

        }
    
    `
        const innerWord =   word.innerText.replace(/\n/g , '');
        if(innerWord === selectedWord){
            modal.style.display = "flex";
            finalMessage.innerHTML = "🥳Congratulations!!!! You Have Won The Game🥳"
        }
}


window.addEventListener('keydown' , e =>{
    const keyprssed = e.key;
    if(e.keyCode >= 65 && e.keyCode <= 90){
        if(selectedWord.includes(keyprssed)){
            if(!correctLetter.includes(keyprssed)){
                correctLetter.push(keyprssed);
                displayWord();
            } else{
                shownotification();
            }
        } else{
            if(!wrongLetter.includes(keyprssed)){
                wrongLetter.push(keyprssed);
                updateWrongLetter();
            }
            else{
                shownotification();
            }
        }
    }
})

// Show Notification
function shownotification(){
    notification.classList.add('show');
    setTimeout(()=>{
        notification.classList.remove('show');
    } , 4000)
}

// updateWrongLetter Function
function updateWrongLetter(){
    wrongLetters.innerHTML = `
        ${wrongLetter.length > 0 ? "<p>Wrong</p>" : '' }
    ${wrongLetter.map(letter =>`<span>${letter}</span>`)}
    `
     figurePart.forEach((part , index)=>{
        if(index < wrongLetter.length){
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
     })   
     if(figurePart.length === wrongLetter.length){
            finalMessage.innerText = '😥Ohhhh Nooo You Lost The Game!!!😥'
            modal.style.display = 'flex';
     }
}


displayWord();

