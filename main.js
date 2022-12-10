hayya_hayya_song = "";
ava_song = "";
hayya_hayya = "";
scoreleftWrist = 0;

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

scorerightWrist = 0;
ava = "";

function preload()
{
    hayya_hayya_song = loadSound("Hayya Hayya (Better Together) FIFA World Cup 2022.mp3");
    ava_song = loadSound("Ava-Famy.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("poseNet is initialized");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("LeftWrist_score = " + scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log("RightWrist_score = " + scorerightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("FF0000");

    hayya_hayya = hayya_hayya_song.isPlaying();
    console.log("Hayya hayya = " + hayya_hayya);
    
    ava = ava_song.isPlaying();
    console.log("Ava = " + ava);

    if(scoreleftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        ava_song.stop();
        if(hayya_hayya == false)
        {
            hayya_hayya_song.play();
        }
        else
        {
            document.getElementById("hayya_hayya_song").innerHTML = "Song name: Hayya Hayya (Better Together) FIFA World Cup 2022";
        }
    }

    if(scorerightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        hayya_hayya_song.stop();
        if(ava == false)
        {
            ava_song.play();
        }
        else
        {
            document.getElementById("hayya_hayya_song").innerHTML = "Song name: Ava by Famy";
        }
    }
}