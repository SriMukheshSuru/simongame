alert("*******************************INSTRUCTIONS********************************* Press Any Key on the keyboard or press start button to start the game.| One of the colour blinks then you need to press the one which got blinked.| if you click the correct one then one more colour will blink then you need to press the previous blinked one and the one blinked now in order.|  If you click correctly the this continues you need to remember the sequence and need to click the buttons in order.| If you click wrong one it will show at which level you lost,..Try to beat your previous highest Happy Playing....... ")


var buttonColours=["red","blue","green","yellow"];
var gamePattern =[];
var userClickedPattern=[];
var started = false;
var level=0;
$(document).keypress(function(){
  if(!started){
    $("#level-title").text("level"+level);
    nextSequence();
    started= true;
  }
});

$(".startbutton").click(function(){
  if(!started){
    $("#level-title").text("level"+level);
    nextSequence();
    $(".startbutton").hide();
    started= true;
  }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){


    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
    }
    else{
      new Audio("sounds/wrong.mp3") .play() ;
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("#level-title").text("Game Over,You lost at level "+level+ " ,Press Any Key to Restart");
      $(".startbutton").show();
      startOver();
    }
}



function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level );
  var randomNumber;
  randomNumber= Math.floor(Math.random() *3) +1 ;
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function startOver(){
  level =0;
  gamePattern =[];
  started = false;

}

function playSound(name){
  new Audio("sounds/"+name+".mp3") .play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}
