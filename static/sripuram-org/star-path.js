(function () {
  var tracePath, dot, totalLen;
  var isPlaying = false,
    progress = 0,
    currentPt = -1;
  var raf = null,
    startTs = null;
  var DURATION = 22000;

  var pointCoords = [
    { x: 567.5, y: 610.6 },
    { x: 638.5, y: 686.5 },
    { x: 1507.1, y: 525.2 },
    { x: 1345.1, y: 424.6 },
    { x: 1242.0, y: 373.8 },
    { x: 643.4, y: 892.6 },
  ];
  var THRESHOLDS = [];

  function init() {
    tracePath = document.getElementById("starPathTrace");
    dot = document.getElementById("starPathDot");
    if (!tracePath || !dot) return;

    totalLen = tracePath.getTotalLength();
    tracePath.style.strokeDasharray = totalLen;
    tracePath.style.strokeDashoffset = totalLen;

    calculateThresholds();

    document.querySelectorAll(".star-path-point").forEach(function (el) {
      el.addEventListener("click", function () {
        jumpTo(parseInt(this.dataset.point));
      });
    });

    var playBtn = document.getElementById("starPathPlayBtn");
    if (playBtn) {
      playBtn.addEventListener("click", toggle);
    }

    document.querySelectorAll(".star-path-ind").forEach(function (el) {
      el.addEventListener("click", function () {
        jumpTo(parseInt(this.dataset.point));
      });
    });
  }

  function calculateThresholds() {
    var steps = 300;
    for (var p = 0; p < pointCoords.length; p++) {
      var minDist = Infinity;
      var bestProg = 0;
      var target = pointCoords[p];

      for (var s = 0; s <= steps; s++) {
        var prog = s / steps;
        var len = prog * totalLen;
        var pt = tracePath.getPointAtLength(len);
        var dist = Math.sqrt(
          Math.pow(pt.x - target.x, 2) + Math.pow(pt.y - target.y, 2),
        );
        if (dist < minDist) {
          minDist = dist;
          bestProg = prog;
        }
      }
      THRESHOLDS.push(bestProg);
    }
  }

  function toggle() {
    isPlaying ? pause() : play();
  }

  function play() {
    isPlaying = true;
    var btn = document.getElementById("starPathPlayBtn");
    if (btn) {
      btn.innerHTML = '<i class="fas fa-pause"></i>&nbsp; Pause';
      btn.classList.add("playing");
    }
    if (dot) {
      dot.classList.add("visible");
    }
    if (progress >= 1) {
      progress = 0;
      resetAll();
    }
    startTs = null;
    raf = requestAnimationFrame(step);
  }

  function pause() {
    isPlaying = false;
    var btn = document.getElementById("starPathPlayBtn");
    if (btn) {
      btn.innerHTML = '<i class="fas fa-play"></i>&nbsp; Play Journey';
      btn.classList.remove("playing");
    }
    if (raf) {
      cancelAnimationFrame(raf);
      raf = null;
    }
  }

  function step(ts) {
    if (!isPlaying) return;
    if (!startTs) startTs = ts - progress * DURATION;
    progress = Math.min((ts - startTs) / DURATION, 1);
    render();

    for (var i = 0; i < THRESHOLDS.length; i++) {
      if (progress >= THRESHOLDS[i] && currentPt < i) {
        activatePoint(i);
      }
    }

    if (progress < 1) {
      raf = requestAnimationFrame(step);
    } else {
      activatePoint(THRESHOLDS.length - 1);
      pause();
    }
  }

  function render() {
    var len = progress * totalLen;
    tracePath.style.strokeDashoffset = totalLen - len;
    var pt = tracePath.getPointAtLength(len);
    dot.setAttribute("cx", pt.x);
    dot.setAttribute("cy", pt.y);
  }

  function activatePoint(idx) {
    currentPt = idx;

    document.querySelectorAll(".star-path-point").forEach(function (el) {
      el.classList.remove("active");
      if (parseInt(el.dataset.point) <= idx) el.classList.add("visited");
    });
    var mk = document.querySelector(
      '.star-path-point[data-point="' + idx + '"]',
    );
    if (mk) {
      mk.classList.add("active");
      mk.classList.add("visited");
    }

    document.querySelectorAll(".star-path-ind").forEach(function (el) {
      el.classList.remove("active");
      if (parseInt(el.dataset.point) <= idx) el.classList.add("visited");
    });
    var ind = document.querySelector(
      '.star-path-ind[data-point="' + idx + '"]',
    );
    if (ind) ind.classList.add("active");

    var def = document.querySelector(".star-path-info-default");
    if (def) def.classList.remove("active");
    document.querySelectorAll(".star-path-info-card").forEach(function (c) {
      c.classList.remove("active");
    });
    var card = document.querySelector(
      '.star-path-info-card[data-card="' + idx + '"]',
    );
    if (card) card.classList.add("active");
  }

  function jumpTo(idx) {
    if (isPlaying) pause();
    if (dot) {
      dot.classList.add("visible");
    }
    progress = THRESHOLDS[idx] + 0.001;
    render();
    for (var j = 0; j <= idx; j++) {
      var mk2 = document.querySelector(
        '.star-path-point[data-point="' + j + '"]',
      );
      if (mk2) mk2.classList.add("visited");
      var nk = document.querySelector(
        '.star-path-ind[data-point="' + j + '"]',
      );
      if (nk) nk.classList.add("visited");
    }
    activatePoint(idx);
  }

  function resetAll() {
    currentPt = -1;
    document.querySelectorAll(".star-path-point").forEach(function (e) {
      e.classList.remove("active", "visited");
    });
    document.querySelectorAll(".star-path-ind").forEach(function (e) {
      e.classList.remove("active", "visited");
    });
    document.querySelectorAll(".star-path-info-card").forEach(function (c) {
      c.classList.remove("active");
    });

    var def = document.querySelector(".star-path-info-default");
    if (def) def.classList.add("active");
    if (dot) {
      dot.classList.remove("visible");
    }
    tracePath.style.strokeDashoffset = totalLen;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();