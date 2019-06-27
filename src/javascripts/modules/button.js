import { utils } from './utils';
import 'gsap';
import '../vendor/DrawSVGPlugin';

const letters = Array.from(document.querySelectorAll('.js-letter'));
const loadBtn = document.querySelector('.js-btn-load');
const loadBtnContainer = document.querySelector('.js-btn-load-container');
const circle = document.querySelector('#load-circle');
const tick = document.querySelector('#load-tick');

const lettersTl = new TimelineLite({paused: true});
lettersTl.staggerTo(letters.reverse(), 0.2, {y: 20, opacity: 0, ease: Back.easeIn.config(1.2)}, 0.075);

let done;

const circleTl = new TimelineMax({
  delay: 0.3,
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
      fadeTl.reverse();
      lettersTl.reverse();
    });
  }
})

const fadeTl = new TimelineLite({paused: true, delay: 0.3});
fadeTl.fromTo(loadBtnContainer, 0.2, {opacity: 0}, {opacity: 1});

const loadBtnAnim = function() {
  TweenLite.set(tick, {drawSVG: "100% 100%"});
  lettersTl.restart();
  fadeTl.restart(true);
  circleTl.restart(true);
}

const button = {
  init() {
    loadBtn.addEventListener('click', function(e) {
      loadBtnAnim();

      // Simulate AJAX call..
      setTimeout(function() {
        done = true;
      }, 2500)
    });

    loadBtn.addEventListener('mousedown', function(e) {
      TweenLite.to(loadBtn, 0.01, {scale: 0.98});
    })

    loadBtn.addEventListener('mouseup', function(e) {
      TweenLite.to(loadBtn, 0.01, {scale: 1});
    })
  }
}

export { button }
