/* Modern Calendar Controller for Sripuram */
function initCalendarApp() {
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const daysEl = document.querySelector(".days");
  const todayBtn = document.querySelector(".today-btn");
  const dateEl = document.querySelector(".date");
  const addEventBtn = document.querySelector(".add-event");
  const addEventWrapper = document.querySelector(".add-event-wrapper");
  const addEventCloseBtn = document.querySelector(".close");
  const addEventTitle = document.querySelector(".event-name");
  const addEventTimeFrom = document.querySelector(".event-time-from");
  const addEventTimeTo = document.querySelector(".event-time-to");
  const addEventSubmit = document.querySelector(".add-event-btn");
  const eventDay = document.querySelector(".event-day");
  const eventDate = document.querySelector(".event-date");
  const eventsContainer = document.querySelector(".events");

  let today = new Date();
  let activeDay;
  let month = today.getFullYear() === 2026 ? today.getMonth() : 0;
  let year = 2026; // Lock strictly to 2026

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Static events compiled
  const PREDEFINED_EVENTS = [
    // Jan
    { day: 1, month: 1, year: 2026, events: [{ title: "New Year, Pradosham", time: "All Day" }] },
    { day: 2, month: 1, year: 2026, events: [{ title: "Full Moon (Sri Narayani Maha Yagam at Sri Narayani Peedam) & Special Pooja for Sri Ananda Nadarajar", time: "6:00 PM" }] },
    { day: 3, month: 1, year: 2026, events: [{ title: "Sri Sakthi Amma 50th Jayanthi Festival, Aaruthra Darshan", time: "All Day" }] },
    { day: 6, month: 1, year: 2026, events: [{ title: "Sankada Hara Chaturthi (Special Pooja at Sri Sakthi Ganapathy Temple)", time: "12:00 PM" }] },
    { day: 11, month: 1, year: 2026, events: [{ title: "Koodara Velli", time: "All Day" }] },
    { day: 14, month: 1, year: 2026, events: [{ title: "Bogi, Ekadasi (Special Pooja at Sripuram Srinivasa Perumal Temple)", time: "All Day" }] },
    { day: 15, month: 1, year: 2026, events: [{ title: "Pongal", time: "All Day" }] },
    { day: 16, month: 1, year: 2026, events: [{ title: "Ghomatha Pongal, Pradosham", time: "All Day" }] },
    { day: 17, month: 1, year: 2026, events: [{ title: "Kaanum Pongal", time: "All Day" }] },
    { day: 18, month: 1, year: 2026, events: [{ title: "New Moon (Navachandi Yagam in Sripuram Yagasala)", time: "6:00 PM" }] },
    { day: 19, month: 1, year: 2026, events: [{ title: "Margazhi – Uthiradam (Sri Sakthi Amma’s Star Birthday)", time: "All Day" }] },
    { day: 22, month: 1, year: 2026, events: [{ title: "Chaturthi (Special Pooja at Sri Sakthi Ganapathy Temple)", time: "12:00 PM" }] },
    { day: 24, month: 1, year: 2026, events: [{ title: "Thai – Uthiratathi (Sri Narayani Temple 26th Anniversary)", time: "All Day" }] },
    { day: 25, month: 1, year: 2026, events: [{ title: "Ratha Sapthami, Sri Sakthi Ganapathy 5th Anniversary", time: "All Day" }] },
    { day: 26, month: 1, year: 2026, events: [{ title: "Republic Day", time: "All Day" }] },
    { day: 29, month: 1, year: 2026, events: [{ title: "Ekadasi (Special Pooja at Sripuram Srinivasa Perumal Temple)", time: "All Day" }] },
    { day: 30, month: 1, year: 2026, events: [{ title: "Pradosham", time: "All Day" }] },

    // Feb
    { day: 1, month: 2, year: 2026, events: [{ title: "Full Moon (Sri Narayani Maha Yagam at Sri Narayani Peedam)", time: "6:00 PM" }] },
    { day: 5, month: 2, year: 2026, events: [{ title: "Chaturthi (Special Pooja at Sri Sakthi Ganapathy Temple)", time: "12:00 PM" }] },
    { day: 13, month: 2, year: 2026, events: [{ title: "Ekadasi (Special Pooja at Sripuram Srinivasa Perumal Temple)", time: "All Day" }] },
    { day: 14, month: 2, year: 2026, events: [{ title: "Sanipradosham", time: "All Day" }] },
    { day: 15, month: 2, year: 2026, events: [{ title: "Maha Sivarathiri (Special Pooja at Sri Narayani Peedam & at Sri Ananda Nataraja Temple)", time: "All Day" }] },
    { day: 17, month: 2, year: 2026, events: [{ title: "New Moon (Navachandi Yagam in Sripuram Yagasala)", time: "6:00 PM" }] },
    { day: 21, month: 2, year: 2026, events: [{ title: "Chaturthi (Special Pooja at Sri Sakthi Ganapathy Temple)", time: "12:00 PM" }] },
    { day: 26, month: 2, year: 2026, events: [{ title: "Swarnalakshmi 9th Anniversary", time: "All Day" }] },
    { day: 27, month: 2, year: 2026, events: [{ title: "Ekadasi (Special Pooja at Sripuram Srinivasa Perumal Temple)", time: "All Day" }] },
    { day: 28, month: 2, year: 2026, events: [{ title: "National Science Day", time: "All Day" }] },

    // Mar
    { day: 1, month: 3, year: 2026, events: [{ title: "Pradosham", time: "All Day" }] },
    { day: 2, month: 3, year: 2026, events: [{ title: "Full Moon (Sri Narayani Maha Yagam at Sri Narayani Peedam)", time: "6:00 PM" }] },
    { day: 3, month: 3, year: 2026, events: [{ title: "Lunar Eclipse in Tamilnadu, Good Friday", time: "All Day" }] },
    { day: 4, month: 3, year: 2026, events: [{ title: "Holi Festival", time: "All Day" }] },
    { day: 5, month: 3, year: 2026, events: [{ title: "Easter Sunday", time: "All Day" }] },
    { day: 7, month: 3, year: 2026, events: [{ title: "Chaturthi (Special Pooja at Sri Sakthi Ganapathy Temple)", time: "12:00 PM" }] },
    { day: 15, month: 3, year: 2026, events: [{ title: "Ekadasi (Special Pooja at Sripuram Srinivasa Perumal Temple)", time: "All Day" }] },
    { day: 16, month: 3, year: 2026, events: [{ title: "Pradosham", time: "All Day" }] },
    { day: 18, month: 3, year: 2026, events: [{ title: "New Moon (Navachandi Yagam in Sripuram Yagasala)", time: "6:00 PM" }] },
    { day: 19, month: 3, year: 2026, events: [{ title: "Ugadi Festival", time: "All Day" }] },
    { day: 21, month: 3, year: 2026, events: [{ title: "Eid-ul-Fitr / Ramzan", time: "All Day" }] },
    { day: 22, month: 3, year: 2026, events: [{ title: "Chaturthi (Special Pooja at Sri Sakthi Ganapathy Temple)", time: "12:00 PM" }] },
    { day: 27, month: 3, year: 2026, events: [{ title: "Rama Navami (Sripuram Srinivasa Perumal Temple Special Pooja - Thirukalyanam)", time: "All Day" }] },
    { day: 29, month: 3, year: 2026, events: [{ title: "Ekadasi (Special Pooja at Sripuram Srinivasa Perumal Temple)", time: "All Day" }] },
    { day: 30, month: 3, year: 2026, events: [{ title: "Pradosham", time: "All Day" }] },
    { day: 31, month: 3, year: 2026, events: [{ title: "Mahaveer Jayanthi", time: "All Day" }] },

    // Apr
    { day: 1, month: 4, year: 2026, events: [{ title: "Full Moon (Sri Narayani Maha Yagam at Sri Narayani Peedam)", time: "6:00 PM" }] },
    { day: 5, month: 4, year: 2026, events: [{ title: "Sankada Hara Chaturthi (Special Pooja at Sri Sakthi Ganapathy Temple)", time: "12:00 PM" }] },
    { day: 13, month: 4, year: 2026, events: [{ title: "Ekadasi (Special Pooja at Sripuram Srinivasa Perumal Temple)", time: "All Day" }] },
    { day: 14, month: 4, year: 2026, events: [{ title: "Tamil New Year, Vishu", time: "All Day" }] },
    { day: 15, month: 4, year: 2026, events: [{ title: "Pradosham", time: "All Day" }] },
    { day: 17, month: 4, year: 2026, events: [{ title: "New Moon (Navachandi Yagam in Sripuram Yagasala)", time: "6:00 PM" }] },
    { day: 20, month: 4, year: 2026, events: [{ title: "Chaturthi (Special Pooja at Sri Sakthi Ganapathy Temple)", time: "12:00 PM" }] },
    { day: 27, month: 4, year: 2026, events: [{ title: "Ekadasi (Special Pooja at Sripuram Srinivasa Perumal Temple)", time: "All Day" }] },
    { day: 28, month: 4, year: 2026, events: [{ title: "Pradosham, Bakrid / Eid ul Adha", time: "All Day" }] },
    { day: 30, month: 4, year: 2026, events: [{ title: "Full Moon (Sri Narayani Maha Yagam at Sri Narayani Peedam) & Vaikasi Visakam", time: "6:00 PM" }] },

    // May
    { day: 1, month: 5, year: 2026, events: [{ title: "Chitra Full Moon (Sri Narayani Maha Yagam at Sri Narayani Peedam) & International Workers Day", time: "6:00 PM" }] },
    { day: 5, month: 5, year: 2026, events: [{ title: "Sankada Hara Chaturthi (Special Pooja at Sri Sakthi Ganapathy Temple)", time: "12:00 PM" }] },
    { day: 8, month: 5, year: 2026, events: [{ title: "Proclamation Day - Sri Narayani Peedam 34th Anniversary", time: "All Day" }] },
    { day: 9, month: 5, year: 2026, events: [{ title: "Special Pooja for Sri Ananda Nadarajar", time: "All Day" }] },
    { day: 10, month: 5, year: 2026, events: [{ title: "Mothers Day", time: "All Day" }] },
    { day: 13, month: 5, year: 2026, events: [{ title: "Ekadasi (Special Pooja at Sripuram Srinivasa Perumal Temple)", time: "All Day" }] },
    { day: 14, month: 5, year: 2026, events: [{ title: "Pradosham", time: "All Day" }] },
    { day: 16, month: 5, year: 2026, events: [{ title: "New Moon (Navachandi Yagam in Sripuram Yagasala)", time: "6:00 PM" }] },
    { day: 20, month: 5, year: 2026, events: [{ title: "Chaturthi (Special Pooja at Sri Sakthi Ganapathy Temple)", time: "12:00 PM" }] },
    { day: 27, month: 5, year: 2026, events: [{ title: "Ekadasi (Special Pooja at Sripuram Srinivasa Perumal Temple)", time: "All Day" }] },

    // Jun
    { day: 4, month: 6, year: 2026, events: [{ title: "Sankada Hara Chaturthi (Special Pooja at Sri Sakthi Ganapathy Temple)", time: "12:00 PM" }] },
    { day: 11, month: 6, year: 2026, events: [{ title: "Ekadasi (Special Pooja at Sripuram Srinivasa Perumal Temple)", time: "All Day" }] },
    { day: 12, month: 6, year: 2026, events: [{ title: "Pradosham", time: "All Day" }] },
    { day: 14, month: 6, year: 2026, events: [{ title: "New Moon (Navachandi Yagam in Sripuram Yagasala)", time: "6:00 PM" }] },
    { day: 16, month: 6, year: 2026, events: [{ title: "Sri Narayani Vidyalaya Institution Day", time: "All Day" }] },
    { day: 18, month: 6, year: 2026, events: [{ title: "Chaturthi (Special Pooja at Sri Sakthi Ganapathy Temple)", time: "12:00 PM" }] },
    { day: 21, month: 6, year: 2026, events: [{ title: "Father’s Day / Sri Narayani Hospital Day", time: "All Day" }] },
    { day: 22, month: 6, year: 2026, events: [{ title: "Special Pooja for Sri Ananda Nadarajar", time: "All Day" }] },
    { day: 25, month: 6, year: 2026, events: [{ title: "Ekadasi (Special Pooja at Sripuram Srinivasa Perumal Temple)", time: "All Day" }] },
    { day: 26, month: 6, year: 2026, events: [{ title: "Moharram", time: "All Day" }] },
    { day: 27, month: 6, year: 2026, events: [{ title: "Sanipradosham", time: "All Day" }] },
    { day: 29, month: 6, year: 2026, events: [{ title: "Full Moon (Sri Narayani Maha Yagam at Sri Narayani Peedam)", time: "6:00 PM" }] },

    // Jul
    { day: 3, month: 7, year: 2026, events: [{ title: "Sankada Hara Chaturthi (Special Pooja in Sri Sakthi Ganapathy Temple)", time: "12:00 PM" }] },
    { day: 10, month: 7, year: 2026, events: [{ title: "Ekadasi (Special Pooja at Sripuram Srinivasa Perumal Temple)", time: "All Day" }] },
    { day: 12, month: 7, year: 2026, events: [{ title: "Pradosham", time: "All Day" }] },
    { day: 14, month: 7, year: 2026, events: [{ title: "New Moon (Navachandi Yagam in Sripuram Yagasala)", time: "6:00 PM" }] },
    { day: 25, month: 7, year: 2026, events: [{ title: "Ekadasi (Special Pooja at Sripuram Srinivasa Perumal Temple)", time: "All Day" }] },
    { day: 26, month: 7, year: 2026, events: [{ title: "Pradosham", time: "All Day" }] },
    { day: 28, month: 7, year: 2026, events: [{ title: "Full Moon Guru Poornima (Sri Narayani Maha Yagam & Sri Sakthi Amma Paatha Pooja)", time: "6:00 PM" }] },

    // Aug
    { day: 2, month: 8, year: 2026, events: [{ title: "Sankada Hara Chaturthi (Special Pooja at Sri Sakthi Ganapathy Temple)", time: "12:00 PM" }] },
    { day: 9, month: 8, year: 2026, events: [{ title: "Ekadasi (Special Pooja at Sripuram Srinivasa Perumal Temple)", time: "All Day" }] },
    { day: 10, month: 8, year: 2026, events: [{ title: "Pradosham", time: "All Day" }] },
    { day: 12, month: 8, year: 2026, events: [{ title: "Aadi New Moon (Navachandi Yagam in Sripuram Yagasala)", time: "6:00 PM" }] },
    { day: 14, month: 8, year: 2026, events: [{ title: "Thiru Aadipooram & Sripuram 19th Anniversary Celebration", time: "All Day" }] },
    { day: 15, month: 8, year: 2026, events: [{ title: "Independence Day", time: "All Day" }] },
    { day: 16, month: 8, year: 2026, events: [{ title: "Naga Chaturthi (Special Pooja at Sri Sakthi Ganapathy Temple)", time: "12:00 PM" }] },
    { day: 21, month: 8, year: 2026, events: [{ title: "Varalakshmi Viratham", time: "All Day" }] },
    { day: 23, month: 8, year: 2026, events: [{ title: "Ekadasi (Special Pooja at Sripuram Srinivasa Perumal Temple)", time: "All Day" }] },
    { day: 24, month: 8, year: 2026, events: [{ title: "Sripuram 19th Anniversary Day", time: "All Day" }] },
    { day: 25, month: 8, year: 2026, events: [{ title: "Pradosham, Eid e Milad", time: "All Day" }] },
    { day: 27, month: 8, year: 2026, events: [{ title: "Aavani Avittam, Full Moon (Sri Narayani Maha Yagam & Special Pooja for Sri Ananda Nadarajar)", time: "6:00 PM" }] },
    { day: 31, month: 8, year: 2026, events: [{ title: "Sankada Hara Chaturthi (Special Pooja at Sri Sakthi Ganapathy Temple)", time: "12:00 PM" }] },

    // Sep
    { day: 4, month: 9, year: 2026, events: [{ title: "Krishna Jayanthi", time: "All Day" }] },
    { day: 5, month: 9, year: 2026, events: [{ title: "Teacher’s Day", time: "All Day" }] },
    { day: 7, month: 9, year: 2026, events: [{ title: "Ekadasi (Special Pooja at Sripuram Srinivasa Perumal Temple)", time: "All Day" }] },
    { day: 8, month: 9, year: 2026, events: [{ title: "Pradosham", time: "All Day" }] },
    { day: 10, month: 9, year: 2026, events: [{ title: "New Moon (Navachandi Yagam in Sripuram Yagasala)", time: "6:00 PM" }] },
    { day: 14, month: 9, year: 2026, events: [{ title: "Vinayagar Chaturthi", time: "All Day" }] },
    { day: 22, month: 9, year: 2026, events: [{ title: "Ekadasi (Special Pooja at Sripuram Srinivasa Perumal Temple)", time: "All Day" }] },
    { day: 24, month: 9, year: 2026, events: [{ title: "Pradosham", time: "All Day" }] },
    { day: 25, month: 9, year: 2026, events: [{ title: "Special Pooja for Sri Ananda Nadarajar", time: "All Day" }] },
    { day: 26, month: 9, year: 2026, events: [{ title: "Full Moon (Sri Narayani Maha Yagam at Sri Narayani Peedam)", time: "6:00 PM" }] },
    { day: 27, month: 9, year: 2026, events: [{ title: "Halalaya Patcham Start", time: "All Day" }] },
    { day: 29, month: 9, year: 2026, events: [{ title: "Sankada Hara Chaturthi (Special Pooja at Sri Sakthi Ganapathy Temple)", time: "12:00 PM" }] },

    // Oct
    { day: 2, month: 10, year: 2026, events: [{ title: "Gandhi Jayanthi", time: "All Day" }] },
    { day: 6, month: 10, year: 2026, events: [{ title: "Ekadasi (Special Pooja at Sripuram Srinivasa Perumal Temple)", time: "All Day" }] },
    { day: 8, month: 10, year: 2026, events: [{ title: "Pradosham", time: "All Day" }] },
    { day: 10, month: 10, year: 2026, events: [{ title: "Mahalaya New Moon (Navachandi Yagam in Sripuram Yagasala)", time: "6:00 PM" }] },
    { day: 11, month: 10, year: 2026, events: [{ title: "Sripuram – Sri Narayani Peedam Navarthiri Start", time: "All Day" }] },
    { day: 14, month: 10, year: 2026, events: [{ title: "Chaturthi (Special Pooja at Sri Sakthi Ganapathy Temple)", time: "12:00 PM" }] },
    { day: 20, month: 10, year: 2026, events: [{ title: "Saraswathi Pooja, Vijayadasami", time: "All Day" }] },
    { day: 22, month: 10, year: 2026, events: [{ title: "Ekadasi (Special Pooja at Sripuram Srinivasa Perumal Temple)", time: "All Day" }] },
    { day: 23, month: 10, year: 2026, events: [{ title: "Pradosham", time: "All Day" }] },
    { day: 25, month: 10, year: 2026, events: [{ title: "Full Moon (Sri Narayani Maha Yagam at Sri Narayani Peedam)", time: "6:00 PM" }] },
    { day: 29, month: 10, year: 2026, events: [{ title: "Sankada Hara Chaturthi (Special Pooja at Sri Sakthi Ganapathy Temple)", time: "12:00 PM" }] },

    // Nov
    { day: 5, month: 11, year: 2026, events: [{ title: "Ekadasi (Special Pooja at Sripuram Srinivasa Perumal Temple)", time: "All Day" }] },
    { day: 6, month: 11, year: 2026, events: [{ title: "Pradosham", time: "All Day" }] },
    { day: 7, month: 11, year: 2026, events: [{ title: "Naga Chaturthi - Special Pooja at Sri Sakthi Ganapathy Temple", time: "12:00 PM" }] },
    { day: 8, month: 11, year: 2026, events: [{ title: "Deepavali", time: "All Day" }] },
    { day: 9, month: 11, year: 2026, events: [{ title: "New Moon (Navachandi Yagam) & Sripuram Sri Narayani Peedam 10,008 Ghee Lamp in Sri Chakram Special Pooja", time: "6:00 PM" }] },
    { day: 13, month: 11, year: 2026, events: [{ title: "Chaturthi (Special Pooja at Sri Sakthi Ganapathy Temple)", time: "12:00 PM" }] },
    { day: 20, month: 11, year: 2026, events: [{ title: "Ekadasi (Special Pooja at Sripuram Srinivasa Perumal Temple)", time: "All Day" }] },
    { day: 21, month: 11, year: 2026, events: [{ title: "Thulasi Kalyanam", time: "All Day" }] },
    { day: 22, month: 11, year: 2026, events: [{ title: "Pradosham", time: "All Day" }] },
    { day: 24, month: 11, year: 2026, events: [{ title: "Full Moon (Sri Narayani Maha Yagam at Sri Narayani Peedam)", time: "6:00 PM" }] },
    { day: 27, month: 11, year: 2026, events: [{ title: "Sankada Hara Chaturthi (Special Pooja at Sri Sakthi Ganapathy Temple)", time: "12:00 PM" }] },

    // Dec
    { day: 4, month: 12, year: 2026, events: [{ title: "Ekadasi (Special Pooja at Sripuram Srinivasa Perumal Temple)", time: "All Day" }] },
    { day: 6, month: 12, year: 2026, events: [{ title: "Pradosham", time: "All Day" }] },
    { day: 8, month: 12, year: 2026, events: [{ title: "New Moon (Navachandi Yagam in Sripuram Yagasala)", time: "6:00 PM" }] },
    { day: 9, month: 12, year: 2026, events: [{ title: "Sripuram Srinivasa Perumal 10th Anniversary", time: "All Day" }] },
    { day: 10, month: 12, year: 2026, events: [{ title: "Sri Mangala Ganapathy 5th Anniversary", time: "All Day" }] },
    { day: 20, month: 12, year: 2026, events: [{ title: "Vaikunda Ekadasi (Special Pooja at Sripuram Srinivasa Perumal Temple)", time: "All Day" }] },
    { day: 21, month: 12, year: 2026, events: [{ title: "Soma Pradosham", time: "All Day" }] },
    { day: 23, month: 12, year: 2026, events: [{ title: "Full Moon (Sri Narayani Maha Yagam) & Special Pooja for Sri Ananda Nadarajar", time: "6:00 PM" }] },
    { day: 24, month: 12, year: 2026, events: [{ title: "Aarudra Darshan (Special Pooja for Sri Ananda Nadarajar)", time: "All Day" }] },
    { day: 25, month: 12, year: 2026, events: [{ title: "Christmas", time: "All Day" }] },
    { day: 26, month: 12, year: 2026, events: [{ title: "Sankada Hara Chaturthi (Special Pooja at Sri Sakthi Ganapathy Temple)", time: "12:00 PM" }] }
  ];

  let eventsArr = [];

  function getEvents() {
    const stored = localStorage.getItem("calendar-events");
    let userEvents = stored ? JSON.parse(stored) : [];

    // Start with static predefined events
    eventsArr = JSON.parse(JSON.stringify(PREDEFINED_EVENTS));

    // Merge user events
    userEvents.forEach((uEvt) => {
      let match = eventsArr.find(
        (pEvt) =>
          pEvt.day === uEvt.day &&
          pEvt.month === uEvt.month &&
          pEvt.year === uEvt.year
      );
      if (match) {
        // Add new events to that day if they aren't duplicate
        uEvt.events.forEach((newE) => {
          if (!match.events.some((existingE) => existingE.title === newE.title)) {
            match.events.push(newE);
          }
        });
      } else {
        eventsArr.push(uEvt);
      }
    });
  }

  function saveEvents() {
    localStorage.setItem("calendar-events", JSON.stringify(eventsArr.filter(evt => {
      let predefined = PREDEFINED_EVENTS.find(
        (p) => p.day === evt.day && p.month === evt.month && p.year === evt.year
      );
      if (!predefined) return true;
      return JSON.stringify(predefined.events) !== JSON.stringify(evt.events);
    })));
  }

  function initCalendar() {
    getEvents();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    dateEl.textContent = `${months[month]} ${year}`;
    let days = "";

    // Set fallback active day if not already set or out of bounds for the current month
    if (!activeDay || activeDay > lastDate) {
      if (year === new Date().getFullYear() && month === new Date().getMonth()) {
        activeDay = new Date().getDate();
      } else {
        activeDay = 1;
      }
    }

    for (let x = day; x > 0; x--) {
      days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDate; i++) {
      let event = false;
      eventsArr.forEach((eventObj) => {
        if (
          eventObj.day === i &&
          eventObj.month === month + 1 &&
          eventObj.year === year
        ) {
          event = true;
        }
      });

      let isToday = i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth();
      let isActive = i === activeDay;

      let classes = ["day"];
      if (isToday) classes.push("today");
      if (isActive) classes.push("active");
      if (event) classes.push("event");

      days += `<div class="${classes.join(" ")}">${i}</div>`;
    }

    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="day next-date">${j}</div>`;
    }

    daysEl.innerHTML = days;
    addListener();
    getActiveDay(activeDay);
    updateEvents(activeDay);
  }

  function addListener() {
    const days = document.querySelectorAll(".day:not(.prev-date):not(.next-date)");
    days.forEach((day) => {
      day.addEventListener("click", (e) => {
        let dayText = e.target.textContent.trim();
        activeDay = Number(dayText);
        getActiveDay(activeDay);
        updateEvents(activeDay);

        const allDays = document.querySelectorAll(".day");
        allDays.forEach((d) => d.classList.remove("active"));
        e.target.classList.add("active");
      });
    });
  }

  function getActiveDay(date) {
    const day = new Date(year, month, date);
    const dayName = day.toString().split(" ")[0];
    if (eventDay) eventDay.textContent = dayName;
    if (eventDate) eventDate.textContent = `${date} ${months[month]} ${year}`;
  }

  function updateEvents(date) {
    let events = "";
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === date &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        eventObj.events.forEach((event) => {
          events += `
            <div class="event">
              <div class="title">
                <i class="far fa-calendar-alt"></i>
                <h3 class="event-title">${event.title}</h3>
              </div>
              <div class="event-time"><i class="far fa-clock"></i> ${event.time}</div>
            </div>`;
        });
      }
    });
    eventsContainer.innerHTML =
      events || `<div class="no-event"><h3>No Events Scheduled</h3></div>`;
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (year === 2026 && month === 0) return; // Lock back boundary to Jan 2026
      month--;
      if (month < 0) {
        month = 11;
        year--;
      }
      initCalendar();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (year === 2026 && month === 11) return; // Lock front boundary to Dec 2026
      month++;
      if (month > 11) {
        month = 0;
        year++;
      }
      initCalendar();
    });
  }

  if (todayBtn) {
    todayBtn.addEventListener("click", () => {
      const currentToday = new Date();
      if (currentToday.getFullYear() === 2026) {
        month = currentToday.getMonth();
        activeDay = currentToday.getDate();
      } else {
        month = 0; // Fallback to Jan 2026 if current year is not 2026
        activeDay = 1;
      }
      year = 2026;
      initCalendar();
    });
  }

  const gotoBtn = document.querySelector(".goto-btn");
  if (gotoBtn) {
    gotoBtn.addEventListener("click", () => {
      const val = document.querySelector(".date-input").value.trim();
      const dateArr = val.split("/");
      if (
        dateArr.length === 2 &&
        dateArr[0] > 0 &&
        dateArr[0] < 13 &&
        dateArr[1].length === 4
      ) {
        const inputYear = parseInt(dateArr[1]);
        if (inputYear !== 2026) {
          alert("Only the year 2026 is supported.");
          return;
        }
        month = dateArr[0] - 1;
        year = inputYear;
        activeDay = 1;
        initCalendar();
      } else {
        alert("Invalid Date Format. Use mm/yyyy");
      }
    });
  }

  const dateInput = document.querySelector(".date-input");
  if (dateInput) {
    dateInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && gotoBtn) gotoBtn.click();
    });
  }

  const modal = document.getElementById("niceZoomIn");
  if (modal) {
    modal.addEventListener("shown.bs.modal", () => initCalendar());
  }

  // Programmatic dismiss click handler to ensure close works across all environments
  const closeBtn = document.querySelector("#niceZoomIn .btn-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      const modalEl = document.getElementById("niceZoomIn");
      if (modalEl) {
        try {
          if (typeof bootstrap !== "undefined" && bootstrap.Modal) {
            const inst = bootstrap.Modal.getInstance(modalEl);
            if (inst) {
              inst.hide();
              return;
            }
          }
        } catch (e) {
          console.log("Bootstrap hide failed:", e);
        }
        try {
          if (typeof $ !== "undefined" && typeof $.fn.modal !== "undefined") {
            $(modalEl).modal("hide");
            return;
          }
        } catch (e) {
          console.log("jQuery hide failed:", e);
        }
      }
    });
  }

  function initDynamicEventsCarousel() {
    const container = document.querySelector(".client-section");
    if (!container) return;

    const $container = $(container);
    if ($container.hasClass("slick-initialized")) {
      $container.slick("unslick");
    }
    
    // Parse custom slides written in the HTML after unslicking has cleaned up clones
    let customSlides = [];
    container.querySelectorAll(".custom-event-slide").forEach((slide) => {
      const dateAttr = slide.getAttribute("data-date");
      if (dateAttr) {
        const parts = dateAttr.split("-");
        if (parts.length === 3) {
          const dateObj = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
          const clonedSlide = slide.cloneNode(true);
          clonedSlide.className = "px-3 custom-event-slide";
          customSlides.push({
            isCustomHtml: true,
            html: clonedSlide.outerHTML,
            dateObj: dateObj
          });
        }
      }
    });

    const today = new Date();
    // Show all events from today till the next 30 days
    const startDate = new Date(2026, today.getMonth(), today.getDate());
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(startDate.getTime());
    endDate.setDate(startDate.getDate() + 30);
    endDate.setHours(23, 59, 59, 999);

    const allowedKeywords = [
      "sankada", "chaturthi", "ekadasi", "new moon", "amavasya",
      "vidyalaya", "school", "institution", "nataraja", "natarajar",
      "nadaraja", "nadarajar", "aruthr", "aarudra", "yagam", "full moon"
    ];

    let eventsToRender = [];

    PREDEFINED_EVENTS.forEach((dayObj) => {
      const eventDate = new Date(dayObj.year, dayObj.month - 1, dayObj.day);
      if (eventDate >= startDate && eventDate <= endDate) {
        dayObj.events.forEach((evt) => {
          const t = evt.title.toLowerCase();
          const matches = allowedKeywords.some(kw => t.includes(kw));
          if (matches) {
            eventsToRender.push({
              isCustomHtml: false,
              day: dayObj.day,
              month: dayObj.month,
              year: dayObj.year,
              dateObj: eventDate,
              title: evt.title,
              time: evt.time
            });
          }
        });
      }
    });

    // Fallback: If no matching events found in next 30 days, load from Jan 1, 2026 onwards
    if (eventsToRender.length === 0) {
      const fallbackStart = new Date(2026, 0, 1);
      const fallbackEnd = new Date(2026, 0, 31);
      PREDEFINED_EVENTS.forEach((dayObj) => {
        const eventDate = new Date(dayObj.year, dayObj.month - 1, dayObj.day);
        if (eventDate >= fallbackStart && eventDate <= fallbackEnd) {
          dayObj.events.forEach((evt) => {
            const t = evt.title.toLowerCase();
            const matches = allowedKeywords.some(kw => t.includes(kw));
            if (matches) {
              eventsToRender.push({
                isCustomHtml: false,
                day: dayObj.day,
                month: dayObj.month,
                year: dayObj.year,
                dateObj: eventDate,
                title: evt.title,
                time: evt.time
              });
            }
          });
        }
      });
    }

    // Merge custom HTML slides — only those within the same date window
    const filteredCustomSlides = customSlides.filter(slide => {
      return slide.dateObj >= startDate && slide.dateObj <= endDate;
    });
    eventsToRender = eventsToRender.concat(filteredCustomSlides);

    // Sort chronologically by dateObj
    eventsToRender.sort((a, b) => a.dateObj - b.dateObj);

    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    function getEventImage(title) {
      const t = title.toLowerCase();
      if (t.includes("sankada")) return "static/sripuram-org/sankada-hara-chaturthi.webp";
      if (t.includes("chaturthi")) return "static/sripuram-org/chaturthi.webp";
      if (t.includes("ekadasi") && t.includes("perumal")) return "static/sripuram-org/sri-srinivasa-perumal-temple-ekadasi-lamp-lighting.webp";
      if (t.includes("ekadasi")) return "static/sripuram-org/ekadasi.webp";
      if (t.includes("new moon") || t.includes("amavasya")) return "static/sripuram-org/new-moon.webp";
      if (t.includes("vidyalaya") || t.includes("school") || t.includes("institution")) return "static/sripuram-org/sri-narayani-vidyalaya-1.webp";
      if (
        t.includes("nataraja") || 
        t.includes("natarajar") || 
        t.includes("nadaraja") || 
        t.includes("nadarajar") || 
        t.includes("aarudra") || 
        t.includes("aruthr")
      ) return "static/sripuram-org/natarajar.webp";
      if (t.includes("pournami") || t.includes("full moon") || t.includes("yagam")) return "static/sripuram-org/pournami-yagam-4-11-25.webp";
      return "static/sripuram-org/golden-temple.webp";
    }

    let html = "";
    eventsToRender.forEach((evt) => {
      if (evt.isCustomHtml) {
        html += evt.html;
      } else {
        const dayStr = String(evt.day).padStart(2, "0");
        const monthName = monthNames[evt.month - 1];
        const img = getEventImage(evt.title);

        html += `
          <div class="px-3">
            <div class="each-client">
              <img src="${img}" class="img-fluid" alt="${evt.title}" />
              <div class="row">
                <div class="col-lg-3 col-md-3 col-sm-3 col-3">
                  <div class="eventsdate">
                    <h5>${dayStr}</h5>
                    <h4>${monthName}</h4>
                  </div>
                </div>
                <div class="col-lg-9 col-md-9 col-sm-9 col-9">
                  <div class="eventsdetails">
                    <p>${evt.title}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
      }
    });

    // Render custom CSS/JS carousel HTML
    let slidesHtml = "";
    eventsToRender.forEach((evt) => {
      if (evt.isCustomHtml) {
        slidesHtml += evt.html;
      } else {
        const dayStr = String(evt.day).padStart(2, "0");
        const monthName = monthNames[evt.month - 1];
        const img = getEventImage(evt.title);

        slidesHtml += `
          <div class="px-3">
            <div class="each-client">
              <img src="${img}" class="img-fluid" alt="${evt.title}" />
              <div class="row">
                <div class="col-lg-3 col-md-3 col-sm-3 col-3">
                  <div class="eventsdate">
                    <h5>${dayStr}</h5>
                    <h4>${monthName}</h4>
                  </div>
                </div>
                <div class="col-lg-9 col-md-9 col-sm-9 col-9">
                  <div class="eventsdetails">
                    <p>${evt.title}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
      }
    });

    container.innerHTML = `
      <div class="custom-carousel-container">
        <button class="carousel-nav-btn prev-btn"><img src="static/sripuram-org/arrow.webp" alt="Prev"></button>
        <div class="carousel-viewport">
          <div class="carousel-track">
            ${slidesHtml}
          </div>
        </div>
        <button class="carousel-nav-btn next-btn"><img src="static/sripuram-org/arrow.webp" alt="Next"></button>
      </div>
    `;

    // Inject styles if not present
    if (!document.getElementById("custom-carousel-styles")) {
      const style = document.createElement("style");
      style.id = "custom-carousel-styles";
      style.innerHTML = `
        .custom-carousel-container {
          position: relative;
          width: 100%;
          padding-bottom: 60px;
        }
        .carousel-viewport {
          overflow: hidden;
          width: 100%;
          padding: 10px 0;
        }
        .carousel-track {
          display: flex;
          transition: transform 0.4s ease-in-out;
          will-change: transform;
        }
        .carousel-track > div {
          flex: 0 0 100%;
          box-sizing: border-box;
        }
        @media (min-width: 768px) {
          .carousel-track > div {
            flex: 0 0 50%;
          }
        }
        @media (min-width: 992px) {
          .carousel-track > div {
            flex: 0 0 33.3333%;
          }
        }
        .carousel-nav-btn {
          background: white;
          border: 1px solid #d1aa67;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          position: absolute;
          bottom: 0px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          transition: background 0.3s;
        }
        .carousel-nav-btn:hover {
          background: #fcd475;
        }
        .carousel-nav-btn.prev-btn {
          right: 55px;
        }
        .carousel-nav-btn.next-btn {
          right: 0px;
        }
        .carousel-nav-btn img {
          width: 15px;
          height: 15px;
        }
        .carousel-nav-btn.prev-btn img {
          transform: rotate(225deg);
        }
        .carousel-nav-btn.next-btn img {
          transform: rotate(45deg);
        }
        .carousel-nav-btn.disabled {
          opacity: 0.3;
          pointer-events: none;
        }
      `;
      document.head.appendChild(style);
    }

    // Carousel script logic
    const track = container.querySelector(".carousel-track");
    const pBtn = container.querySelector(".prev-btn");
    const nBtn = container.querySelector(".next-btn");
    const slides = Array.from(track.children);
    let currentIndex = 0;

    function getItemsPerView() {
      if (window.innerWidth >= 992) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }

    function updateCarousel() {
      const itemsPerView = getItemsPerView();
      const maxIndex = Math.max(0, slides.length - itemsPerView);
      
      // Keep index within bounds
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      if (currentIndex < 0) currentIndex = 0;

      // Translate track
      const percentage = -(currentIndex * (100 / itemsPerView));
      track.style.transform = `translateX(${percentage}%)`;

      // Update button states
      if (currentIndex === 0) {
        pBtn.classList.add("disabled");
      } else {
        pBtn.classList.remove("disabled");
      }

      if (currentIndex >= maxIndex) {
        nBtn.classList.add("disabled");
      } else {
        nBtn.classList.remove("disabled");
      }

      // Hide navigation entirely if all items fit in viewport
      if (slides.length <= itemsPerView) {
        pBtn.style.display = "none";
        nBtn.style.display = "none";
        track.style.justifyContent = "center";
      } else {
        pBtn.style.display = "";
        nBtn.style.display = "";
        track.style.justifyContent = "";
      }
    }

    pBtn.addEventListener("click", () => {
      currentIndex--;
      updateCarousel();
    });

    nBtn.addEventListener("click", () => {
      currentIndex++;
      updateCarousel();
    });

    window.addEventListener("resize", updateCarousel);
    updateCarousel();
  }

  // Initialize dynamic carousel on load
  initDynamicEventsCarousel();
}

if (document.readyState !== "loading") {
  initCalendarApp();
} else {
  document.addEventListener("DOMContentLoaded", initCalendarApp);
}
