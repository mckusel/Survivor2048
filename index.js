 var width = $(".col-lg").width();
 var team = "false";
 var ready = false;
 var gamestate = [];
 var score = 0;
 var moved = false;
 var pressed = false;
 $(".col-lg").height(width);
 $(".game").removeClass("invisible");
 $(".btn").click(function(){
   var name = $(this).attr("name");
   if(team == "false"&& pressed == false){
   team = name;
   ready = true;
   pressed = true;
  $(".win").addClass("invisible");
  $(".lose").addClass("invisible");
   gamestate = r2g();
}
});

 window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);


function r2g(){
  var gamestate = startgame();
  return gamestate;
}

function startgame(){
    var gamestate = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
    var ran1 = Math.floor( Math.random()* 16);
    gamestate[ran1] = 1;
    $("#spot"+ran1).addClass(team+"1");
    var ran2 = Math.floor( Math.random()* 16);
    while(gamestate[ran2] == 1){
      ran2 = (ran2 + 1)% 16;
    }
    $("#spot"+ ran2).addClass(team+"1");
    gamestate[ran2] = 1;
    return gamestate;
}



$(document).keydown(function(event){
  var direction = event.which;
  move(direction, gamestate);
  }
);

function move(direction, gamestate){
// so for each tile, we want to see how far left we can bring it.
// first ones we want to look at are (1,5,9,13)
// while(index comparing to % 4 > 0)

  moved = false;
  if(ready){
  //left
  if(direction == 37){
    for(a =0; a <4; a++){
      for(i = 1; i <=4; i++){
        var curr = 4*a + i; //1,2,3
        if(gamestate[curr] != 0){
          var index = 4*a + i;
          while(index % 4 >0){
            index= index-1;
            if(gamestate[index] == 0){
              //swap
              $("#spot"+curr).removeClass(team+gamestate[curr]);
              $("#spot"+index).addClass(team+gamestate[curr]);
              gamestate[index] =gamestate[curr];
              gamestate[curr] = 0;
              moved = true;
            }
            else if(gamestate[index] == gamestate[curr]){
              //combo
              $("#spot"+curr).removeClass(team+gamestate[index]);
              $("#spot"+index).removeClass(team+gamestate[index]);
              $("#spot"+index).addClass(team+(gamestate[index] +1));
              gamestate[index] = gamestate[index] +1;
              gamestate[curr] = 0;
              score = score + Math.pow(2, gamestate[index]);
              moved = true;
            }
            curr--;
          }
          curr = 4*a + i;
        }
      }
    }
  }
  //right
else if(direction == 39){
    for(a =0; a <4; a++){
      for(i = 3; i >=0; i--){
        var curr = 4*a + i; // 3, 2, 1,0..7,6,5,4...
        if(gamestate[curr] != 0){
          var index = 4*a + i;
          while(index % 4 !=3){
            index= index +1;
            if(gamestate[index] == 0){
              //swap
              $("#spot"+curr).removeClass(team+gamestate[curr]);
              $("#spot"+index).addClass(team+gamestate[curr]);
              gamestate[index] =gamestate[curr];
              gamestate[curr] = 0;
              moved = true;
            }
            else if(gamestate[index] == gamestate[curr]){
              //combo
              $("#spot"+curr).removeClass(team+gamestate[index]);
              $("#spot"+index).removeClass(team+gamestate[index]);
              $("#spot"+index).addClass(team+(gamestate[index] +1));
              gamestate[index] = gamestate[index] +1;
              gamestate[curr] = 0;
              score = score + Math.pow(2, gamestate[index]);
              moved = true;
            }
            curr++;
          }
          curr = 4*a + i;
        }
      }
    }
  }
  //up
  else if(direction == 38){
      for(a =0; a <4; a++){
        for(i = 0; i <4; i++){
          var curr = 4*i + a; // 4, 8, 12
          if(gamestate[curr] != 0){
            var index = 4*i + a;
            while(index >= 4){
              index= index -4;
              if(gamestate[index] == 0){
                //swap
                $("#spot"+curr).removeClass(team+gamestate[curr]);
                $("#spot"+index).addClass(team+gamestate[curr]);
                gamestate[index] =gamestate[curr];
                gamestate[curr] = 0;
                moved = true;
              }
              else if(gamestate[index] == gamestate[curr]){
                //combo
                $("#spot"+curr).removeClass(team+gamestate[index]);
                $("#spot"+index).removeClass(team+gamestate[index]);
                $("#spot"+index).addClass(team+(gamestate[index] +1));
                gamestate[index] = gamestate[index] +1;
                gamestate[curr] = 0
                score = score + Math.pow(2, gamestate[index]);
                moved = true;
              }
              curr = curr - 4;
            }
            curr = 4*i + a;
          }
        }
      }
    }
    //down
    else if(direction == 40){
        for(a =0; a <4; a++){
          for(i = 3; i >=0; i--){
            var curr = 4*i + a; // 8, 4, 0
            if(gamestate[curr] != 0){
              var index = 4*i + a;
              while(index <= 11){
                index= index +4;
                if(gamestate[index] == 0){
                  //swap
                  $("#spot"+curr).removeClass(team+gamestate[curr]);
                  $("#spot"+index).addClass(team+gamestate[curr]);
                  gamestate[index] =gamestate[curr];
                  gamestate[curr] = 0;
                  moved = true;
                }
                else if(gamestate[index] == gamestate[curr]){
                  //combo
                  $("#spot"+curr).removeClass(team+gamestate[index]);
                  $("#spot"+index).removeClass(team+gamestate[index]);
                  $("#spot"+index).addClass(team+(gamestate[index] +1));
                  gamestate[index] = gamestate[index] +1;
                  gamestate[curr] = 0;
                  score = score + Math.pow(2, gamestate[index]);
                  moved = true;
                }
                curr = curr + 4;
              }
              curr = 4*i + a;
            }
          }
        }
      }
  if(direction >= 37 && direction <= 40){
  addNext(moved);
  $(".score").text("Score: "+score);
}
}
}
function addNext(moved){
  var full = false;
  var complete = false;
  for(i = 0; i < 16; i++){
    if(gamestate[i] == 0){
      full = true;
    }
    if(gamestate[i] == 11 && team != "jury"){
      complete = true;
    }
    if(gamestate[i] == 12 && team == "jury"){
      complete = true;
    }
  }
  if(complete){
    win();
  }
  setTimeout(function(){

  }, 500);
  if(full && moved){
    var ran1 = Math.floor( Math.random()* 16);
    while(gamestate[ran1] >0){
      ran1 = Math.floor( Math.random()* 16);
    }
    var ran2 = Math.random();
    if(ran2 > .9){
      var num = 2;
    }
    else{
      var num = 1;
    }
    $("#spot"+ran1).addClass(team+num);
    gamestate[ran1] = num;
  }
  else if(!moved && full){
  }
  else{
    lose();
  }
}

function win(){
   $(".win").removeClass("invisible");
   restart("win");
}

function lose(){
 $(".lose").removeClass("invisible");
 restart("lose");
}

function restart(type){
  setTimeout(function(){

  }, 2000);
  for(i = 0; i < 16; i++){
    if(gamestate[i] != 0){
    $("#spot"+i).removeClass(team+gamestate[i]);
    gamestate[i] = 0;
  }
}
score = 0;
team = "false";
ready = false;
pressed = false;
}
