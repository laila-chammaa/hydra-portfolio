var is_iphone =
  [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform) ||
  // iPad on iOS 13 detection
  (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
if (is_iphone) {
  alert(
    "This website's animations might not work on iPhones or iPads. Please switch to Desktop."
  );
}

var hydra = new Hydra({
  canvas: document.getElementById('myCanvas'),
  detectAudio: false
});

DD = 0.01;
b = (o, u, i, y, z) =>
  o()
    .add(solid(1, 1, 1), DD)
    .thresh(i * 0.2 * (z - y) + y, 0.0001)
    .luma(0.5, 0.0001)
    .color(c(u, i, 0), c(u, i, 1), c(u, i, 2));
c = (u, i, j) => {
  let cc = u.split('/'),
    cs = cc[cc.length - 1].split('-');
  return parseInt('0x' + cs[i].substring(2 * j, 2 + 2 * j)) / 255;
};
colorize = (x, u, y = 0, z = 1) =>
  b(x, u, 0, y, z)
    .layer(b(x, u, 1, y, z))
    .layer(b(x, u, 2, y, z))
    .layer(b(x, u, 3, y, z))
    .layer(b(x, u, 4, y, z));

defaultPattern = () =>
  osc([12, 12].fast(0.1), [0.02, -0.02].fast(0.2), 0)
    .thresh(0.7)
    .rotate([0, 1.57].fast(0.1))
    .modulateRotate(osc([4, 5].fast(0.3), -0.01, 0), 1.22, 10)
    .modulate(o0, () => 0.4)
    .scale(0.98)
    .blend(o0, 0.67);

defaultUrl = 'https://coolors.co/edf2fb-e2eafc-c1d3fe-d7e3fc-ccdbfd';

function changeColor() {
  var url = document.getElementById('user_input').value;

  //validation
  if (url.length >= 45 && url.length <= 53 && url.includes('coolors.co')) {
    defaultUrl = url;
  }
  colorize(defaultPattern, defaultUrl).out();
}
function generate() {
  var randomURL = 'https://coolors.co/';
  var randomColor = Math.floor(Math.random() * 16777215);
  for (var i = 0; i < 5; i++) {
    var randomHex = randomColor.toString(16);
    randomURL += randomHex;
    randomColor += Math.floor(Math.random() * 800);
    if (i < 4) randomURL += '-';
  }
  console.log(randomURL);
  defaultUrl = randomURL;
  colorize(defaultPattern, defaultUrl).out();
}

function changePattern(x) {
  switch (x) {
    case 1:
      func = () =>
        osc(8, 0, 0)
          .thresh(0.75)
          .rotate(0.8, 0.02)
          .modulateRotate(osc(3, 0.01, 0), 1.22, 10)
          //.add(noise(2, -0.1))
          .modulate(o0, () => 0.48)
          .scale(0.99)
          .blend(o0, 0.67);
      break;
    case 2:
      func = () =>
        osc(6, 0, 0)
          .thresh(0.3)
          .rotate(1.2, 0.02)
          .modulateRotate(osc(3, -0.01, 0), 1.22, 10);
      break;
    case 3:
      func = () =>
        osc(8, 0, 0)
          .thresh(0.5)
          .rotate(-0.8)
          .modulateRotate(osc(4, -0.01, 0), 1.22, 10);
      break;
    case 4:
      func = () =>
        osc(8, 0, 0)
          .thresh(0.6)
          .rotate(0)
          .modulateRotate(osc(4, -0.01, 0), 1.22, 10)
          //.add(noise(2, -0.1))
          .modulate(o0, () => 1)
          .scale(1.01)
          .blend(o0, 0.427);
      break;
  }
  defaultPattern = func;
  colorize(defaultPattern, defaultUrl).out();
}

function goBack() {
  defaultPattern = () =>
    osc([12, 12].fast(0.1), [0.02, -0.02].fast(0.2), 0)
      .thresh(0.7)
      .rotate([0, 1.57].fast(0.1))
      .modulateRotate(osc([4, 5].fast(0.3), -0.01, 0), 1.22, 10)
      .modulate(o0, () => 0.4)
      .scale(0.98)
      .blend(o0, 0.67);

  defaultUrl = 'https://coolors.co/edf2fb-e2eafc-c1d3fe-d7e3fc-ccdbfd';
  colorize(defaultPattern, defaultUrl).out();
}

colorize(defaultPattern, defaultUrl).out();

function removeDefault() {
  input = document.getElementById('user_input');
  if (input.value.includes('Example:')) {
    input.value = input.value.substring(9);
  }
}
