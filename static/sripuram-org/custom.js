AOS.init();
let overlay = document.querySelector(".menu_overlay"),
  open = document.querySelector(".menu-icon"),
  close = document.querySelector(".fa-times");
if (open && overlay) {
  open.addEventListener("click", () => {
    overlay.style.transform = "translateY(0)";
  });
}
if (close && overlay) {
  close.addEventListener("click", () => {
    overlay.style.transform = "translateY(-110%)";
  });
}
$(window).scroll(function () {
  $(this).scrollTop() >= 50
    ? $("#return-to-top").fadeIn(200)
    : $("#return-to-top").fadeOut(200);
}),
  $("#return-to-top").click(function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      500,
    );
  }),
  $(document).ready(function () {
    $(".filter-button").click(function () {
      var e = $(this).attr("data-filter");
      "all" == e
        ? $(".filter").show("10000")
        : ($(".filter")
          .not("." + e)
          .hide("8000"),
          $(".filter")
            .filter("." + e)
            .show("10000"));
    });
  }),
  $(document).ready(function () {
    $("#thumbSlider .thumb").on("click", function () {
      ($(this).addClass("active"), $(this).siblings().removeClass("active"));
    });
  }),
  $(document).ready(function () {
    ($(".collapse.in").prev(".panel-heading").addClass("active"),
      $("#accordion, #bs-collapse")
        .on("show.bs.collapse", function (e) {
          $(e.target).prev(".panel-heading").addClass("active");
        })
        .on("hide.bs.collapse", function (e) {
          $(e.target).prev(".panel-heading").removeClass("active");
        }));
  }),
  $(".client-section").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    loop: 0,
    autoplay: !0,
    speed: 1500,
    autoplaySpeed: 5e3,
    arrows: !0,
    nextArrow:
      '<div class="slick-custom-arrow slick-custom-arrow-right"><img src="/static/sripuram-org/arrow.webp" alt="Arrow" class="img-fluid"></div>',
    prevArrow:
      '<div class="slick-custom-arrow slick-custom-arrow-left"><img src="/static/sripuram-org/arrow.webp" alt="Arrow" class="img-fluid"></div>',
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: 0,
        },
      },
      {
        breakpoint: 699,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 476,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
var $cell = $(".card");
($cell.find(".js-expander").click(function () {
  var e = $(this).closest(".card");
  e.hasClass("is-collapsed")
    ? ($cell
      .not(e)
      .removeClass("is-expanded")
      .addClass("is-collapsed")
      .addClass("is-inactive"),
      e.removeClass("is-collapsed").addClass("is-expanded"),
      $cell.not(e).hasClass("is-inactive") ||
      $cell.not(e).addClass("is-inactive"))
    : (e.removeClass("is-expanded").addClass("is-collapsed"),
      $cell.not(e).removeClass("is-inactive"));
}),
  $cell.find(".js-collapser").click(function () {
    var e = $(this).closest(".card");
    (e.removeClass("is-expanded").addClass("is-collapsed"),
      $cell.not(e).removeClass("is-inactive"));
  }));
const app = (() => {
  let e,
    s,
    l,
    i = () => {
      ((e = document.querySelector("body")),
        (s = document.querySelector(".menu-icon")),
        (l = document.querySelectorAll(".nav__list-item")),
        a());
    },
    a = () => {
      if (s) {
        s.addEventListener("click", () => r(e, "nav-active"));
      }
    },
    r = (e, s) => {
      e.classList.contains(s) ? e.classList.remove(s) : e.classList.add(s);
    };
  i();
})();
var $imagesSlider = $(".gallery-slider .gallery-slider__images>div"),
  $thumbnailsSlider = $(".gallery-slider__thumbnails>div");
($imagesSlider.slick({
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  cssEase: "linear",
  fade: !0,
  draggable: !1,
  asNavFor: ".gallery-slider__thumbnails>div",
  prevArrow: ".gallery-slider__images .prev-arrow",
  nextArrow: ".gallery-slider__images .next-arrow",
}),
  $thumbnailsSlider.slick({
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    cssEase: "linear",
    centerMode: !0,
    draggable: !1,
    focusOnSelect: !0,
    asNavFor: ".gallery-slider .gallery-slider__images>div",
    prevArrow: ".gallery-slider__thumbnails .prev-arrow",
    nextArrow: ".gallery-slider__thumbnails .next-arrow",
    responsive: [
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }));

var $caption = $(".gallery-slider .caption"),
  captionText = $(".gallery-slider__images .slick-current img").attr("alt");
function updateCaption(e) {
  ("" === e && (e = "&nbsp;"), $caption.html(e), $caption.removeClass("hide"));
}
(updateCaption(captionText),
  $imagesSlider.on("beforeChange", function (e, s, l, i) {
    $caption.addClass("hide");
  }),
  $imagesSlider.on("afterChange", function (e, s, l, i) {
    updateCaption(
      (captionText = $(".gallery-slider__images .slick-current img").attr(
        "alt",
      )),
    );
  }),
  $(".read-more").click(function () {
    ($(this).prev().slideToggle(),
      "View All" == $(this).text()
        ? $(this).text("View Less")
        : $(this).text("View All"));
  }));

$(document).ready(function () {
  $("#myModal").modal("show");
});

/* Calendar Section */
// document.addEventListener("DOMContentLoaded", function () {
//   const nextBtn = document.querySelector(".next");
//   const prevBtn = document.querySelector(".prev");
//   const daysEl = document.querySelector(".days");
//   const todayBtn = document.querySelector(".today-btn");
//   const dateEl = document.querySelector(".date");
//   const addEventBtn = document.querySelector(".add-event");
//   const addEventWrapper = document.querySelector(".add-event-wrapper");
//   const addEventCloseBtn = document.querySelector(".close");
//   const addEventTitle = document.querySelector(".event-name");
//   const addEventTimeFrom = document.querySelector(".event-time-from");
//   const addEventTimeTo = document.querySelector(".event-time-to");
//   const addEventSubmit = document.querySelector(".add-event-btn");
//   const eventDay = document.querySelector(".event-day");
//   const eventDate = document.querySelector(".event-date");
//   const eventsContainer = document.querySelector(".events");

//   let today = new Date();
//   let activeDay;
//   let month = today.getMonth();
//   let year = today.getFullYear();

//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   let eventsArr = [];

//   function getEvents() {
//     const stored = localStorage.getItem("calendar-events");
//     eventsArr = stored ? JSON.parse(stored) : [];
//   }

//   function saveEvents() {
//     localStorage.setItem("calendar-events", JSON.stringify(eventsArr));
//   }

//   function initCalendar() {
//     getEvents();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const prevLastDay = new Date(year, month, 0);
//     const prevDays = prevLastDay.getDate();
//     const lastDate = lastDay.getDate();
//     const day = firstDay.getDay();
//     const nextDays = 7 - lastDay.getDay() - 1;

//     dateEl.textContent = `${months[month]} ${year}`;
//     let days = "";

//     for (let x = day; x > 0; x--) {
//       days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
//     }

//     for (let i = 1; i <= lastDate; i++) {
//       let event = false;
//       eventsArr.forEach((eventObj) => {
//         if (
//           eventObj.day === i &&
//           eventObj.month === month + 1 &&
//           eventObj.year === year
//         ) {
//           event = true;
//         }
//       });

//       if (
//         i === new Date().getDate() &&
//         year === new Date().getFullYear() &&
//         month === new Date().getMonth()
//       ) {
//         activeDay = i;
//         getActiveDay(i);
//         updateEvents(i);
//         days += `<div class="day today active ${
//           event ? "event" : ""
//         }">${i}</div>`;
//       } else {
//         days += `<div class="day ${event ? "event" : ""}">${i}</div>`;
//       }
//     }

//     for (let j = 1; j <= nextDays; j++) {
//       days += `<div class="day next-date">${j}</div>`;
//     }

//     daysEl.innerHTML = days;
//     addListener();
//   }

//   function addListener() {
//     const days = document.querySelectorAll(".day");
//     days.forEach((day) => {
//       day.addEventListener("click", (e) => {
//         activeDay = Number(e.target.innerHTML);
//         getActiveDay(activeDay);
//         updateEvents(activeDay);

//         days.forEach((d) => d.classList.remove("active"));
//         e.target.classList.add("active");
//       });
//     });
//   }

//   function getActiveDay(date) {
//     const day = new Date(year, month, date);
//     const dayName = day.toString().split(" ")[0];
//     eventDay.textContent = dayName;
//     eventDate.textContent = `${date} ${months[month]} ${year}`;
//   }

//   function updateEvents(date) {
//     let events = "";
//     eventsArr.forEach((eventObj) => {
//       if (
//         eventObj.day === date &&
//         eventObj.month === month + 1 &&
//         eventObj.year === year
//       ) {
//         eventObj.events.forEach((event) => {
//           events += `
//             <div class="event">
//               <div class="title">
//                 <i class="fas fa-circle"></i>
//                 <h3 class="event-title">${event.title}</h3>
//               </div>
//               <div class="event-time">${event.time}</div>
//             </div>`;
//         });
//       }
//     });
//     eventsContainer.innerHTML =
//       events || `<div class="no-event"><h3>No Events</h3></div>`;
//   }

//   addEventBtn.addEventListener("click", () =>
//     addEventWrapper.classList.toggle("active"),
//   );
//   addEventCloseBtn.addEventListener("click", () =>
//     addEventWrapper.classList.remove("active"),
//   );

//   addEventSubmit.addEventListener("click", () => {
//     const title = addEventTitle.value.trim();
//     const timeFrom = addEventTimeFrom.value.trim();
//     const timeTo = addEventTimeTo.value.trim();
//     if (!title || !timeFrom || !timeTo) return alert("Please fill all fields");

//     const newEvent = { title, time: `${timeFrom} - ${timeTo}` };
//     let eventAdded = false;

//     eventsArr.forEach((item) => {
//       if (
//         item.day === activeDay &&
//         item.month === month + 1 &&
//         item.year === year
//       ) {
//         item.events.push(newEvent);
//         eventAdded = true;
//       }
//     });

//     if (!eventAdded) {
//       eventsArr.push({
//         day: activeDay,
//         month: month + 1,
//         year: year,
//         events: [newEvent],
//       });
//     }

//     saveEvents();
//     addEventWrapper.classList.remove("active");
//     addEventTitle.value = addEventTimeFrom.value = addEventTimeTo.value = "";
//     updateEvents(activeDay);
//     initCalendar();
//   });

//   prevBtn.addEventListener("click", () => {
//     month--;
//     if (month < 0) {
//       month = 11;
//       year--;
//     }
//     initCalendar();
//   });

//   nextBtn.addEventListener("click", () => {
//     month++;
//     if (month > 11) {
//       month = 0;
//       year++;
//     }
//     initCalendar();
//   });

//   todayBtn.addEventListener("click", () => {
//     today = new Date();
//     month = today.getMonth();
//     year = today.getFullYear();
//     initCalendar();
//   });

//   document.querySelector(".goto-btn").addEventListener("click", () => {
//     const val = document.querySelector(".date-input").value.trim();
//     const dateArr = val.split("/");
//     if (
//       dateArr.length === 2 &&
//       dateArr[0] > 0 &&
//       dateArr[0] < 13 &&
//       dateArr[1].length === 4
//     ) {
//       month = dateArr[0] - 1;
//       year = parseInt(dateArr[1]);
//       initCalendar();
//     } else {
//       alert("Invalid Date");
//     }
//   });

//   document.querySelector(".date-input").addEventListener("keypress", (e) => {
//     if (e.key === "Enter") document.querySelector(".goto-btn").click();
//   });

//   const modal = document.getElementById("niceZoomIn");
//   if (modal) {
//     modal.addEventListener("shown.bs.modal", () => initCalendar());
//   }
// });
