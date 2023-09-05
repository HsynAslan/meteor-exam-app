const month_names = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let selectedDay = null; // Seçilen günü tutacak değişken

Template.pagesCalendar.onRendered(function () {
  this.autorun(() => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth(); // Bu, Ocak için 0'dan Aralık için 11'e kadar değerler döndürecek.
    const currentYear = currentDate.getFullYear();

    console.log("Şu anki gün: " + currentDay);
    console.log("Şu anki ay: " + currentMonth);

    let clickedDay = currentDay; // Tıklanan günün numarasını alın
    let clickedMonth = month_names[currentMonth]; // Şu anki ayın adını alın

    let calendar = document.querySelector(".calendar");
    let calendar_days = calendar.querySelector(".calendar-days");
    let activityTime = document.querySelector(".activity h3");
    activityTime.textContent = `${clickedDay} ${clickedMonth}`; // Zamanı güncelleyin

    let isLeapYear = (year) => {
      return (
        (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
        (year % 100 === 0 && year % 400 === 0)
      );
    };

    let getFebDays = (year) => {
      return isLeapYear(year) ? 29 : 28;
    };

    let generateCalendar = (month, year) => {
      calendar_days.innerHTML = "";

      let currDate = new Date();
      if (month > 11 || month < 0) month = currDate.getMonth();
      if (!year) year = currDate.getFullYear();

      let curr_month = `${month_names[month]}`;
      month_picker.innerHTML = curr_month;
      calendar_header_year.innerHTML = year;

      let days_of_month = [
        31,
        getFebDays(year),
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
      ];

      let first_day = new Date(year, month, 1);

      for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement("div");
        if (i >= first_day.getDay()) {
          let dayNumber = i - first_day.getDay() + 1;
          // Güne data-day özelliğini ekleyin
          day.setAttribute("data-day", dayNumber);
          day.innerHTML = dayNumber;
          day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`;
          if (
            dayNumber === currDate.getDate() &&
            year === currDate.getFullYear() &&
            month === currDate.getMonth()
          ) {
            day.classList.add("curr-date");
          }
          day.classList.add("calendar-day-hover");
          day.addEventListener("click", function () {
            let clickedDay = this.getAttribute("data-day"); // Tıklanan günün numarasını alın
            let clickedMonth = month_names[month]; // Şu anki ayın adını alın
            activityTime.textContent = `${clickedDay} ${clickedMonth}`; // Zamanı güncelleyin

            // Seçilen günü güncelleyin
            selectedDay = {
              day: clickedDay,
              month: clickedMonth,
              year: year,
            };

            // Default olarak mevcut günün notlarını activity2 altındaki <ul> içine ekleyin
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear(); // Şu anki yılı alın
            console.log("senderId---------Meteor.userId()->" + Meteor.userId());
            console.log("day" + day + "---------clickedDay->" + clickedDay);
            console.log("month" + month + "---------month->" + month);
            console.log("year" + year + "---------currentYear->" + currentYear);

            const currentDayNotes = Calen.find({
              senderId: Meteor.userId(),
              day: parseInt(clickedDay), // clickedDay'i tamsayıya çeviriyoruz
              month: parseInt(month), // month'ü tamsayıya çeviriyoruz
              year: parseInt(currentYear), // currentYear'i tamsayıya çeviriyoruz
            }).fetch();

            console.log("currentDayNotes: " + currentDayNotes);
            const activity2List = document.querySelector(".activity2 ul");
            activity2List.innerHTML = ""; // Önceki notları temizleyin
            console.log("currentDayNotes: " + currentDayNotes);
            currentDayNotes.forEach((note) => {
              console.log("note: " + note.notText);
              const li = document.createElement("li");
              li.textContent = note.notText;
              activity2List.appendChild(li);
            });
          });
        }
        calendar_days.appendChild(day);
      }
    };

    let month_list = calendar.querySelector(".month-list");
    let month_picker = calendar.querySelector("#month-picker");
    let calendar_header_year = calendar.querySelector("#year");

    month_names.forEach((e, index) => {
      let month = document.createElement("div");
      month.innerHTML = `<div data-month="${index}">${e}</div>`;
      month.querySelector("div").onclick = () => {
        month_list.classList.remove("show");
        curr_month.value = index;
        generateCalendar(index, curr_year.value);
      };
      month_list.appendChild(month);
    });

    let currDate = new Date();

    let curr_month = { value: currDate.getMonth() };
    let curr_year = { value: currDate.getFullYear() };

    generateCalendar(curr_month.value, curr_year.value);

    document.querySelector("#prev-year").onclick = () => {
      --curr_year.value;
      generateCalendar(curr_month.value, curr_year.value);
    };

    document.querySelector("#next-year").onclick = () => {
      ++curr_year.value;
      generateCalendar(curr_month.value, curr_year.value);
    };

    // Default olarak mevcut günün notlarını activity2 altındaki <ul> içine ekleyin
    const currentDayNotes = Calen.find({
      senderId: Meteor.userId(),
      day: currentDay,
      month: currentMonth,
      year: currentYear,
    }).fetch();

    const activity2List = document.querySelector(".activity2 ul");
    activity2List.innerHTML = ""; // Önceki notları temizleyin

    currentDayNotes.forEach((note) => {
      const li = document.createElement("li");
      li.textContent = note.notText;
      activity2List.appendChild(li);
    });
  });
});

Template.pagesCalendar.helpers({});

Template.pagesCalendar.events({
  "click #addActivity": function (event, template) {
    event.preventDefault(); // Formun sayfa yeniden yüklenmesini engellemek için

    const activityInput = document.querySelector("#activityInput");

    let dayElement = selectedDay; // Seçilen günü al
    if (dayElement == null) {
      const currentDate = new Date();
      const currentDay = currentDate.getDate();
      const currentMonth = currentDate.getMonth(); // Bu, Ocak için 0'dan Aralık için 11'e kadar değerler döndürecek.
      const currentYear = currentDate.getFullYear();

      console.log("Şu anki gün: " + currentDay);
      console.log("Şu anki ay: " + currentMonth);

      let clickedDay = currentDay; // Tıklanan günün numarasını alın
      let clickedMonth = month_names[currentMonth]; // Şu anki ayın adını alın

      selectedDay = {
        day: clickedDay,
        month: clickedMonth,
        year: currentYear,
      };
      dayElement = selectedDay;
    }
    console.log("activityInput: " + activityInput);
    console.log("dayElement: ", dayElement);

    if (dayElement) {
      const day = dayElement.day; // Seçili günün numarasını al
      const month = month_names.indexOf(dayElement.month); // Ayı al
      const year = parseInt(dayElement.year); // Yılı al

      const senderId = Meteor.userId(); // Kullanıcı kimliğini alabilirsiniz veya gerektiğine göre başka bir kullanıcı kimliği sağlayabilirsiniz
      const notText = activityInput.value.trim(); // Not metnini al

      if (senderId && day && month >= 0 && year && notText) {
        // Geçerli kullanıcı kimliği, gün, ay, yıl ve not metni varsa not ekleyin
        console.log("senderid: " + senderId);
        console.log("day: " + day);
        console.log("month: " + month);
        console.log("year: " + year);
        console.log("notText: " + notText);

        Meteor.call(
          "insert.calen",
          senderId,
          day,
          month,
          year,
          notText,
          function (error, result) {
            if (error) {
              console.log("Hata:", error.reason);
            } else {
              console.log("Başarı:", result);
            }
          }
        );
      } else {
        console.log("Hata: Geçerli bilgiler eksik veya hatalı.");
      }
    } else {
      console.log("Hata: Bir gün seçmelisiniz.");
    }

    activityInput.value = ""; // Input değerini temizle
  },
});
