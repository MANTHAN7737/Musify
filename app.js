const Music = new Audio('audio/1.mp3');
const music = new Audio('audio/16.mp3');
// Music.play();



// create array
// const songs =[
//     {
//     id :'1',
//     songName:`On My Way <br>
//     <div class="subtitle">Alan Walker</div>`,
//     poster:"img/1.jpg",
//     },

//     {
//     id :'2',
//     songName:`Alan Walker Fade <br>
//     <div class="subtitle">Alan Walker</div>`,
//     poster:"img/2.jpg",
//     },
//     {
//     id : '3',
//     songName:`Cartoon <br>
//     <div class="subtitle">Daniel Levi</div>`,
//     poster:"img/3.jpg",
//     },
//     {
//     id : '4',
//     songName:`Warriyo <br>
//     <div class="subtitle">Mortals & Laura Bhrem </div>`,
//     poster:"img/4.jpg",
//     },
//     {
//     id : '5',
//     songName:`Tum Mile <br>
//     <div class="subtitle">Krishan Kumar </div>`,
//     poster:"img/Tum Mile.jpeg",
//     },
//     {
//     id : '6',
//     songName:`Animal <br>
//     <div class="subtitle">Maroon 5</div>`,
//     poster:"img/6.jpg",
//     },
//     {
//     id : '7',
//     songName:`Tamasha <br>
//     <div class="subtitle">Irshad Kamil</div>`,
//     poster:"img/7.jpg",
//     },
//     {
//     id : '8',
//     songName:`Suna hai <br>
//     <div class="subtitle">Jubin Nautiyal</div>`,
//     poster:"img/8.jpg",
//     },
//     {
//     id : '9',
//     songName:`Dilbar <br>
//     <div class="subtitle">Neha Kakkar</div>`,
//     poster:"img/9.jpg",
//     },
//     {
//     id : '10',
//     songName:`Duniya <br>
//     <div class="subtitle">Akhil</div>`,
//     poster:"img/10.jpg",
//     },
//     {
//     id : '11',
//     songName:`Lahore lag di <br>
//     <div class="subtitle">Guru Randhawa</div>`,
//     poster:"img/11.jpg",
//     },
//     {
//     id : '12',
//     songName:`Putt Jatt Da <br>
//     <div class="subtitle">Diljit Dosanijh</div>`,
//     poster:"img/12.jpg",
//     },
//     {
//     id : '13',
//     songName:`Jeene laga hoon <br>
//     <div class="subtitle">Atif Aslam</div>`,
//     poster:"img/13.jpg",
//     },
//     {
//     id : '14',
//     songName:`Vaaste <br>
//     <div class="subtitle">Dhuvani Bhanushali</div>`,
//     poster:"img/14.jpg",
//     },
//     {
    // id : '15',
    // songName:`Lut Gaye <br>
    // <div class="subtitle">Jubin Nautiyal</div>`,
    // poster:"img/15.jpg",
    // },
    
    
// ]
// Array.from(document.getElementsByClassName('songItem')).forEach((element,i)=>{
//     element.getElementsByTagName('img')[0].src = songs[i].poster;
//     element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
// })

let MasterPlay = document.getElementById('MasterPlay');
let wave = document.getElementsByClassName('wave')[0];

MasterPlay.addEventListener('click',()=>{
    if(Music.paused || Music.currentTime <=0) {
        Music.play();
        MasterPlay.classList.remove('bi-play-fill');
        MasterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
    } else {
        Music.pause();
        MasterPlay.classList.add('bi-play-fill');
        MasterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
    }

})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
            element.classList.add('bi-play-circle-fill');
            element.classList.remove('bi-pause-circle-fill');
        })
    }
const makeAllBackgrounds = ()=>{
    Array.from(document.getElementsByClassName('songItem')).forEach((element)=>{
            element.style.background = "rgb(105,105,170,0)";
            
        })
    }



let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        index = e.target.id;
        makeAllPlays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        Music.src=`audio/${index}.mp3`;
        poster_master_play.src=`img/${index}.jpg`;
        Music.play();
        let song_title = songs.filter((ele)=>{
            return ele.id == index;
        })
        song_title.forEach(ele=>{
            let{songName} = ele;
            title.innerHTML = songName;
        })
        MasterPlay.classList.remove('bi-play-fill');
        MasterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
        Music.addEventListener('ended',()=>{
             MasterPlay.classList.add('bi-play-fill');
             MasterPlay.classList.remove('bi-pause-fill');
             wave.classList.remove('active2');

        })
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105,105,170,.1)";

    })
})
let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

Music.addEventListener('timeupdate',()=>{
    let music_curr = Music.currentTime;
    let music_dur  = Music.duration;
    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);
    if (sec<10){
        sec = `0${sec}`
    }
    currentEnd.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_curr/60);
    let sec1 = Math.floor(music_curr%60);
    if (sec1<10){
        sec1 = `0${sec1}`
    }
    currentStart.innerText = `${min1}:${sec1}`;
    let progressbar = parseInt((Music.currentTime/Music.duration)*100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left =  `${seekbar}%`;
})
seek.addEventListener('change',()=>{
    Music.currentTime = seek.value*Music.duration/100;

})
Music.addEventListener('ended',()=>{
    MasterPlay.classList.add('bi-play-fill');
    MasterPlay.classList.remove('bi-pause-fill');
    wave.classList.remove('active2');

})
let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];
vol.addEventListener('change',()=>{
    if(vol.value == 0){
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if(vol.value > 0){
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if(vol.value > 50){
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.add('bi-volume-up-fill');
    }
    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    Music.volume = vol_a/100;
})   


let back = document.getElementById('back');
let next = document.getElementById('next');
back.addEventListener('click',()=>{
    index -=1;
    if(index < 1){
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
    Music.src=`audio/${index}.mp3`;
        poster_master_play.src=`img/${index}.jpg`;
        Music.play();
        let song_title = songs.filter((ele)=>{
            return ele.id == index;
        })
        song_title.forEach(ele=>{
            let{songName} = ele;
            title.innerHTML = songName;
        })
        makeAllPlays()
        document.getElementById(`${index}`).classList.remove('bi-play-fill');
        document.getElementById(`${index}`).classList.add('bi-pause-fill');
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105,105,170,.1)";

        
})
next.addEventListener('click',()=>{
    index -=0;
    index +=1;
    if(index > Array.from(document.getElementsByClassName('songItem')).length){
        index  = 1;
    }


    
    Music.src=`audio/${index}.mp3`;
        poster_master_play.src=`img/${index}.jpg`;
        Music.play();
        let song_title = songs.filter((ele)=>{
            return ele.id == index;
        })
    })

let left_scroll = document.getElementById('left_scroll');
let right_scroll = document.getElementById('right_scroll');
let pop_songs = document.getElementsByClassName('pop_songs')[0];
left_scroll.addEventListener('click',()=>{
    pop_songs.scrollLeft-=330;
    
})
right_scroll.addEventListener('click',()=>{
    pop_songs.scrollLeft +=330;
    
})
let left_scrolls = document.getElementById('left_scrolls');
let right_scrolls = document.getElementById('right_scrolls');
let item = document.getElementsByClassName('item')[0];
left_scrolls.addEventListener('click',()=>{
    item.scrollLeft -= 330;
    
})
right_scrolls.addEventListener('click',()=>{
    item.scrollLeft += 330;
    
})
let PP = document.getElementById('PP');
PP.addEventListener('click',()=>{
    if(music.paused || music.currentTime <=0) {
        music.play();
        // PP.classList.remove('bi-play-fill');
        // PP.classList.add('bi-pause-fill');
        wave.classList.add('active2');
    } else {
        music.pause();
        // PP.classList.add('bi-play-fill');
        // PP.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
    }

})
// var audio = new Audio('path/to/your/audio/file.mp3'); // Replace with the path to your audio file