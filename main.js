/**
 * elements
 */
let count;

let button;

let speed;

/**
 * variables
 */
let switches;

let divisor = 1;

let ran = false;

/**
 * stop and reset state
 */
const stop = () => {
  speed.disabled = false;
  button.loading = false;
  button.innerHTML = 'Run';
  button.iconEnd = 'play';
  divisor = 1;
  ran = true;
};

/**
 * reset squared number switches
 */
const reset = () => {
  [1, 4, 9, 16, 25, 36, 49, 64, 81, 100].forEach((s) => {
    document.querySelector(`[data-switch="${s}"]`).setAttribute('data-switched', 'off');
  });
};

/**
 * run the program
 */
const run = () => {
  // stop after 100 iterations
  if (divisor === 101) {
    stop();
    return;
  }

  // reset if program has been run
  if (ran) reset();
  ran = false;

  // number to divide by (only need to switch greater than divisor)
  let s = divisor;

  // update count
  count.innerHTML = divisor;

  // iterate current divisor
  const iterate = setInterval(() => {
    // rerun after switching by divisor
    if (s === 101) {
      clearInterval(iterate);
      divisor = divisor + 1;
      run();
      return;
    }

    const _switch = document.querySelector(`[data-switch="${s}"]`);

    const state = _switch.getAttribute('data-switched');

    // is switch number divisible by the current divisor
    if (s % divisor === 0) {
      // switch on or off based on current state
      _switch.setAttribute('data-switched', state === 'on' ? 'off' : 'on');
    }

    s = s + 1;
  }, parseInt(speed.value));
};

/**
 * setup on load
 */
export const load = () => {
  count = document.querySelector('.counter');

  switches = document.querySelectorAll('div.switch');

  switches.forEach((_switch, index) => {
    const num = index + 1;

    const span = document.createElement('span');
    span.innerHTML = num;
    _switch.appendChild(span);

    _switch.setAttribute('data-switch', num);
    _switch.setAttribute('data-switched', 'off');
  });

  speed = document.querySelector('calcite-select');

  button = document.querySelector('calcite-button');

  button.addEventListener('click', () => {
    speed.disabled = true;
    button.loading = true;
    button.innerHTML = 'Running';
    button.iconEnd = '';
    run();
  });
};
