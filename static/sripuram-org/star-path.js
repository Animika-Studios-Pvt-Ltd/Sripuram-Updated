/* ── Star Path Journey Animation Engine ── */
(function () {
  var tracePath, dot, totalLen;
  var isPlaying = false,
    progress = 0,
    currentPt = -1;
  var raf = null,
    startTs = null;
  var DURATION = 22000; /* 22 seconds for walking path */

  /* Target coordinates for each point in 1923x1079.1 space (1 to 6 sequence) */
  var pointCoords = [
    { x: 567.5, y: 610.6 }, // Point 1: Sakthi Ganapathy (Start of SVG Path)
    { x: 638.5, y: 686.5 }, // Point 2: Guru Peedam
    { x: 1507.1, y: 525.2 }, // Point 3: Swarna Lakshmi
    { x: 1345.1, y: 424.6 }, // Point 4: Kamadhenu
    { x: 1242.0, y: 373.8 }, // Point 5: Lakshmi Narayani (Golden Temple / Center Sanctum)
    { x: 643.4, y: 892.6 }, // Point 6: Srinivasa Perumal (Exit Walkway)
  ];
  var THRESHOLDS = [];

  function init() {
    tracePath = document.getElementById("sjTracePath");
    dot = document.getElementById("sjDot");
    if (!tracePath || !dot) return;

    totalLen = tracePath.getTotalLength();
    tracePath.style.strokeDasharray = totalLen;
    tracePath.style.strokeDashoffset = totalLen;

    /* Calculate progress thresholds by finding points closest to target coordinates */
    calculateThresholds();

    /* Point marker clicks */
    document.querySelectorAll(".sj-point").forEach(function (el) {
      el.addEventListener("click", function () {
        jumpTo(parseInt(this.dataset.point));
      });
    });

    /* Play / Pause button */
    var playBtn = document.getElementById("sjPlayBtn");
    if (playBtn) {
      playBtn.addEventListener("click", toggle);
    }

    /* Indicator clicks */
    document.querySelectorAll(".sj-ind").forEach(function (el) {
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
    var btn = document.getElementById("sjPlayBtn");
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
    var btn = document.getElementById("sjPlayBtn");
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

    /* Check and activate points as the tracer reaches them */
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

    /* Update map markers */
    document.querySelectorAll(".sj-point").forEach(function (el) {
      el.classList.remove("active");
      if (parseInt(el.dataset.point) <= idx) el.classList.add("visited");
    });
    var mk = document.querySelector('.sj-point[data-point="' + idx + '"]');
    if (mk) {
      mk.classList.add("active");
      mk.classList.add("visited");
    }

    /* Update indicators */
    document.querySelectorAll(".sj-ind").forEach(function (el) {
      el.classList.remove("active");
      if (parseInt(el.dataset.point) <= idx) el.classList.add("visited");
    });
    var ind = document.querySelector('.sj-ind[data-point="' + idx + '"]');
    if (ind) ind.classList.add("active");

    var def = document.querySelector(".sj-info-default");
    if (def) def.classList.remove("active");
    document.querySelectorAll(".sj-info-card").forEach(function (c) {
      c.classList.remove("active");
    });
    var card = document.querySelector('.sj-info-card[data-card="' + idx + '"]');
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
      var mk2 = document.querySelector('.sj-point[data-point="' + j + '"]');
      if (mk2) mk2.classList.add("visited");
      var nk = document.querySelector('.sj-ind[data-point="' + j + '"]');
      if (nk) nk.classList.add("visited");
    }
    activatePoint(idx);
  }

  function resetAll() {
    currentPt = -1;
    document.querySelectorAll(".sj-point").forEach(function (e) {
      e.classList.remove("active", "visited");
    });
    document.querySelectorAll(".sj-ind").forEach(function (e) {
      e.classList.remove("active", "visited");
    });
    document.querySelectorAll(".sj-info-card").forEach(function (c) {
      c.classList.remove("active");
    });

    var def = document.querySelector(".sj-info-default");
    if (def) def.classList.add("active");
    if (dot) {
      dot.classList.remove("visible");
    }
    tracePath.style.strokeDashoffset = totalLen;
  }

  /* Boot up when DOM is ready */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();