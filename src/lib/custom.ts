/*-----Custom JS Dark Mode For Feed01 ------*/
const toggleMode = document.querySelector<HTMLElement>('._layout_swithing_btn_link');
const layout = document.querySelector<HTMLElement>('._layout_main_wrapper');
let darkMode = false;
console.log(toggleMode);
if (toggleMode && layout) {
  toggleMode.addEventListener('click', () => {
    darkMode = !darkMode;
    if (darkMode) {
      layout.classList.add('_dark_wrapper');
    } else {
      layout.classList.remove('_dark_wrapper');
    }
  });
} else {
  console.warn('toggleMode or layout element not found', { toggleMode, layout });
}
/*-----Custom JS Dark Mode End For Feed01 ------*/
// Custom Dropdown for profile
const profileDropdown = document.querySelector('#_prfoile_drop');
const profileDropShowBtn = document.querySelector('#_profile_drop_show_btn');
let isDropShow = false;
console.log(isDropShow);

if (profileDropShowBtn && profileDropdown) {
  profileDropShowBtn.addEventListener('click', function () {
    isDropShow = !isDropShow;
    console.log(isDropShow);
    if (isDropShow) {
      profileDropdown.classList.add('show');
      console.log('shown');
    } else {
      profileDropdown.classList.remove('show');
      console.log('hidden');
    }
  });
} else {
  console.warn('profileDropShowBtn or profileDropdown element not found', {
    profileDropShowBtn,
    profileDropdown,
  });
}

// Custom Dropdown for profile

//Custom Dropdown for timeline
const timelineDropdown = document.querySelector('#_timeline_drop');
const timelineDropShowBtn = document.querySelector('#_timeline_show_drop_btn');
let isDropTimelineShow = false;
console.log(isDropTimelineShow);

if (timelineDropShowBtn && timelineDropdown) {
  timelineDropShowBtn.addEventListener('click', function () {
    isDropTimelineShow = !isDropTimelineShow;
    console.log(isDropTimelineShow);
    if (isDropTimelineShow) {
      timelineDropdown.classList.add('show');
      console.log('shown');
    } else {
      timelineDropdown.classList.remove('show');
      console.log('hidden');
    }
  });
} else {
  console.warn('timelineDropShowBtn or timelineDropdown element not found', {
    timelineDropShowBtn,
    timelineDropdown,
  });
}
//Custom Dropdown for timeline

const notifyDropdown = document.querySelector('#_notify_drop');
const notifyDropShowBtn = document.querySelector('#_notify_btn');
let isDropShow1 = false;
console.log(isDropShow1);

if (notifyDropShowBtn && notifyDropdown) {
  notifyDropShowBtn.addEventListener('click', function () {
    isDropShow1 = !isDropShow1;
    console.log(isDropShow1);
    if (isDropShow1) {
      notifyDropdown.classList.add('show');
      console.log('shown');
    } else {
      notifyDropdown.classList.remove('show');
      console.log('hidden');
    }
  });
} else {
  console.warn('notifyDropShowBtn or notifyDropdown element not found', {
    notifyDropShowBtn,
    notifyDropdown,
  });
}
