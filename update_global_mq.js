const fs = require('fs');
let css = fs.readFileSync('static/sripuram-org/global.css', 'utf8');

const firstMediaQueryIndex = css.indexOf('@media');
if (firstMediaQueryIndex !== -1) {
  css = css.substring(0, firstMediaQueryIndex);
}

const newMediaQueries = `
@media (max-width: 1440px) {
  h1 { font-size: 27px; }
  h2 { font-size: 24px; }
  p { font-size: 18px; }
}

@media (max-width: 1366px) {
  h1 { font-size: 26px; }
  h2 { font-size: 24px; }
  p { font-size: 17px; }
}

@media (max-width: 1200px) {
  h1 { font-size: 25px; }
  h2 { font-size: 23px; }
  p { font-size: 17px; }
}

@media (max-width: 1024px) {
  h1 { font-size: 24px; }
  h2 { font-size: 22px; }
  p { font-size: 16px; }
}

@media (max-width: 991px) {
  h1 { font-size: 23px; }
  h2 { font-size: 21px; }
  p { font-size: 16px; }
}

@media (max-width: 767px) {
  h1 { font-size: 22px; }
  h2 { font-size: 20px; }
  p { font-size: 16px; }
}

@media (max-width: 575px) {
  h1 { font-size: 21px; }
  h2 { font-size: 19px; }
  p { font-size: 15px; }
}

@media (max-width: 480px) {
  h1 { font-size: 20px; }
  h2 { font-size: 18px; }
  p { font-size: 15px; }
}

@media (max-width: 360px) {
  h1 { font-size: 19px; }
  h2 { font-size: 17px; }
  p { font-size: 14px; }
}
`;

fs.writeFileSync('static/sripuram-org/global.css', css + newMediaQueries);
console.log('Updated global media queries');
