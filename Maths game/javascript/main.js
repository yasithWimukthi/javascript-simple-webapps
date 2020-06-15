var playing=false;
var score;
var timeremainingvalue;
var action;
var correctAns;

//if we click on the start/reset
document.getElementById("startreset").onclick=function(){
    //if we are playing
    if(playing==true)
    {
        location.reload(); //reload the page
    }
    else //if we are not playing
    {
        playing=true; // set to playing mode
        score=0;
        document.getElementById("scorevalue").innerHTML=score; //set score to 0
        show("timeremaining"); // show countdown box
        timeremainingvalue=60;
        document.getElementById("timeremainingvalue").innerHTML=timeremainingvalue;
        hide("gameover");
        document.getElementById("startreset").innerHTML="Reset Game"; //change button to reset
        startCountdown();

        // generate a new Q&A
        generateQA();
    }

    for(let i=1;i<5;i++)
    {
        document.getElementById("box"+i).onclick=function(){

            if(playing==true)
            {
                if(this.innerHTML==correctAns)
                {
                    score++;
                    document.getElementById("scorevalue").innerHTML=score;
                    //hide wrong box and show correct box
                    hide("wrong");
                    show("correct");
                    setTimeout(function(){
                        hide("correct");
                    },1000)

                    // Generate new Q&A
                    generateQA();

                }

                else{
                    hide("correct");
                    show("wrong");
                    setTimeout(function(){
                        hide("wrong");
                    },1000)
                }
            }
        }
    }

    //start counter
    function startCountdown()
    {
        action=setInterval(function(){
            timeremainingvalue-=1;
            document.getElementById("timeremainingvalue").innerHTML=timeremainingvalue;
            if(timeremainingvalue==0)
            {
                stopCountdown();
                show("gameover");
                document.getElementById("gameover").innerHTML=`<p>game over!</p> <p> your score is ${score}.</p> `;
                hide("timeremaining")
                hide("correct");
                hide("wrong");
                playing=false;
                document.getElementById("startreset").innerHTML="Start Game";
            }
        },1000);
    }
    
    //stop counter
    function stopCountdown()
    {
        clearInterval(action);
    }

    // hide an element
    function hide(id)
    {
        document.getElementById(id).style.display="none";
    }

    // display an element
    function show(id)
    {
        document.getElementById(id).style.display="block";
    }

    // generate quetion and multiply answers
    function generateQA()
    {
        var x=1+Math.round(9*Math.random());
        var y=1+Math.round(9*Math.random());
        correctAns=x*y;
        document.getElementById("question").innerHTML=x+"x"+y;
        var correctPosition=1+Math.round(3*Math.random());
        document.getElementById("box"+correctPosition).innerHTML=correctAns; // fill one box with the correct answer

        var answers=[correctAns];

        //fill other boxes with wrong answers
        for(var i=1;i<5;i++)
        {
            if(i!=correctPosition)
            {
                var wrongAns;
                do{
                    wrongAns=(1+Math.round(9*Math.random())) * (1+Math.round(9*Math.random()));
                    //a wrong answer
                }while(wrongAns==correctAns);
                document.getElementById("box"+i).innerHTML=wrongAns;
            }
        }
    }

}