import hello from './helper';

const btnEl = document.querySelector("button");

if (btnEl) {
  btnEl.addEventListener("click", hello);
  console.log('Test');
}
