let token = '';
let tuid = '';
const twitch = window.Twitch.ext;

twitch.onAuthorized(function (auth) {
  // save our credentials
  token = auth.token;
  tuid = auth.userId;

  // enable the button
  $('#cycle').removeAttr('disabled');

  setAuth(token);
  $.ajax(requests.get);
});


$(function () {
  // when we click the cycle button
  $('#cycle').click(function () {
    if(!token) { return twitch.rig.log('Not authorized'); }
    const word = $('#word').val();
    const translated = makeBabigo(word);
    twitch.rig.log(translated);
    $('#disp').text(translated);
    // $.ajax(requests.set);
  });
});

function makeBabigo(word){
  let result = "";
  // 一文字ずつ判定
  for (text of word) {
    result += judge(text);
  }
  return result;
}

function inArray(needle, heystack) {
  for (i of heystack) {
    if (i == needle) {
      return true;
    }
  }
  return false;
}

function judge(text) {
  let myMap = new Map();
  let result = text;
  myMap.set("ば", "あ か さ た な は ま や ら わ が ざ だ ば ぱ");
  myMap.set("び", "い き し ち に ひ み り ぎ じ ぢ び ぴ");
  myMap.set("ぶ", "う く す つ ぬ ふ む る ぐ ず づ ぶ ぷ");
  myMap.set("べ", "え け せ て ね へ め れ げ ぜ で べ ぺ");
  myMap.set("ぼ", "お こ そ と の ほ も ろ ご ぞ ど ぼ ぽ");

  for (const [key, value] of myMap.entries()) {
    if (inArray(text, value.split(' '))) {
      result += key;
    }
  }
  return result;
}
