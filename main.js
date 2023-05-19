dancemonkey="";
stealmygirl="";
leftWristx=0;
leftWristy=0;
rightWristx=0;
rightWristy=0;
songdancemonkey="";

scoreleftWrist=0;
function preload(){
    dancemonkey=loadSound("dancemonkey.mp3");
    stealmygirl=loadSound("stealmygirl.mp3");
}
function setup(){
    canvas=createCanvas(500,600);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotposes);
}
function gotposes(results){
    if (results.length> 0){
       console.log(results);
       scoreleftWrist=results[0].pose.keypoints[9].score;
       console.log(scoreleftWrist);
       leftWristx=results[0].pose.leftWrist.x;
       leftWristy=results[0].pose.leftWrist.y;
       console.log("Leftwrist X = "+leftWristx +"Leftwrist Y = "+leftWristy);
       rightWristx=results[0].pose.rightWrist.x;
       rightWristy=results[0].pose.rightWrist.y;
       console.log("Rightwrist X = "+rightWristx +"Rightwrist Y = "+rightWristy);
   }
}
function modelLoaded(){
    console.log("Posenet Is Initailize");
}
function draw(){
    image(video,0,0,600,500);
    fill("#8dbcf2");
    stroke("#000308");
    songdancemonkey=dancemonkey.isPlaying();
    console.log(songdancemonkey);
    if(scoreleftWrist > 0.2){
      circle(leftWristx,leftWristy,20);
      stealmygirl.stop();
      if(leftWist==false){
        dancemonkey.play();
      }
      else{
        document.getElementById("songnameid").innerHTML="Song name = Dance Monkey";
      }
    }
}