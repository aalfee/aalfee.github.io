const para = document.querySelector('div');
const btn = document.querySelector('button');
const fig = document.querySelector('figure');

btn.addEventListener('click', ()=>{
  para.classList.toggle('visibility-toggle')
});

btn.addEventListener('click', () => {
  fig.style.opacity = 0;

function startTimer(duration, display){
        
    let timer = duration;
    let i = 0.1;

    const intervalId = setInterval(() => {

        const seconds = Math.floor(timer/1);
        console.log(seconds);

        fig.style.opacity+=seconds;
        if(--timer < 0) {
            clearInterval(intervalId);
        }
    }, 100); //1000 one secoond, 16 one millisecond
    
}

startTimer(10,fig);

});