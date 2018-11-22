import { utils } from './utils';
import 'gsap';
import '../vendor/DrawSVGPlugin';

const loadBtn = document.querySelector('.js-btn-load');
const loadBtnContainer = document.querySelector('.js-btn-load-container');
const circle = document.querySelector('#load-circle');
const tick = document.querySelector('#load-tick');

let done;

const circleTl = new TimelineMax({
  paused: true,
  repeat: -1,
  onStart: function() {
    done = false;
  },
  onRepeat: function() {
    if (done) {
      this.pause();
      tickTl.restart();
    }
  }
});

circleTl
.from(circle, 0.4, {
  drawSVG: "0% 0%",
  ease: Power1.easeOut
})
.to(circle, 0.4, {
  drawSVG: "100% 100%",
  ease: Power1.easeOut
})

const tickTl = new TimelineLite({
  paused: true,
})

tickTl
.from(tick, 0.2, {
  drawSVG: "100% 100%",
  ease: Power1.easeOut,
  onComplete: function() {
    TweenLite.delayedCall(0.5, function() {
      widthTl.reverse();
    });
  }
})

const widthTl = new TimelineLite({
  paused: true
})

widthTl
.from(loadBtnContainer, 0.2, {
  opacity: 0,
  width: 0,
  marginLeft: 0
})

const loadBtnAnim = function() {
  TweenLite.set(tick, {drawSVG: "100% 100%"});
  widthTl.restart();
  circleTl.restart();
}

const button = {
  init() {
    loadBtn.addEventListener('click', function(e) {
      loadBtnAnim();

      // Simulate AJAX call..
      setTimeout(function() {
        done = true;
      }, 1000)
    });
  }
}

export { button }
