const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

//pass the joke to VoiceRss API
function tellMe(joke) {
  console.log('TEll ME', joke);
  VoiceRSS.speech({
    key: 'bab261a3aca040a48dfeec6fce93f186',
    src:`${joke}`,
    hl: 'en-us',
    v: 'Eka',
    r: 2,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

//Get jokes from joke API
async function getJokes() {
  let url = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'
  try {
    let result = await fetch(url);
    let data = await result.json();
    if (data.setup) {
      joke = `${data.setup}... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    //text-to-speech
    tellMe(joke);
    //diable button
    toggleButton();
  } catch (error) {
    console.log("Oops!",error);
  }
}

//Event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
