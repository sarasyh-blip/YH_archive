// 마키 무한 루프 구현
['marquee', 'marquee-movie'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML += el.innerHTML;
});

// ── 커서 요소 생성 ──

// 기본 동그라미
const cursorCircle = document.createElement('div');
cursorCircle.className = 'cursor-circle';
document.body.appendChild(cursorCircle);

// 비행기
const cursorAirplane = document.createElement('div');
cursorAirplane.className = 'cursor-airplane';
cursorAirplane.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="44" height="44">
  <g transform="rotate(90, 12, 12)">
    <path fill="currentColor" d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
  </g>
</svg>`;
document.body.appendChild(cursorAirplane);

// 꽃 (5-petal daisy SVG)
const cursorFlower = document.createElement('div');
cursorFlower.className = 'cursor-flower';
cursorFlower.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="40" height="40">
  <circle class="flower-petal" cx="50" cy="30" r="16" fill="#bbe309"/>
  <circle class="flower-petal" cx="69" cy="44" r="16" fill="#bbe309"/>
  <circle class="flower-petal" cx="62" cy="66" r="16" fill="#bbe309"/>
  <circle class="flower-petal" cx="38" cy="66" r="16" fill="#bbe309"/>
  <circle class="flower-petal" cx="31" cy="44" r="16" fill="#bbe309"/>
  <circle class="flower-center" cx="50" cy="50" r="12" fill="white"/>
</svg>`;
document.body.appendChild(cursorFlower);

// 슬레이트(클래퍼보드) SVG
const cursorClapperboard = document.createElement('div');
cursorClapperboard.className = 'cursor-clapperboard';
cursorClapperboard.innerHTML = `<img src="movie_icon.png" width="52" height="52">`;
document.body.appendChild(cursorClapperboard);

// ── 커서 위치 추적 ──
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    cursorCircle.style.left = x + 'px';
    cursorCircle.style.top = y + 'px';
    cursorAirplane.style.left = x + 'px';
    cursorAirplane.style.top = y + 'px';
    cursorFlower.style.left = x + 'px';
    cursorFlower.style.top = y + 'px';
    cursorClapperboard.style.left = x + 'px';
    cursorClapperboard.style.top = y + 'px';
});

// ── 헤더/푸터 클로버 트리거 텍스트 요소 ──
const HEADER_FOOTER_TEXT = '.logo span, nav a, .badge, .contact-label span, .contact-info p span';

// ── 커서 존 감지 및 전환 ──
document.addEventListener('mouseover', (e) => {
    const item = e.target.closest('.item');
    const tripSection = e.target.closest('.trip-section');
    const movieSection = e.target.closest('.movie-section');
    const tripTitle = e.target.closest('.trip-section .main-title h1 span');
    const movieTitle = e.target.closest('.movie-section .main-title h1 span');
    const headerFooterText = e.target.closest(HEADER_FOOTER_TEXT);
    const inHeader = e.target.closest('header');
    const inFooter = e.target.closest('footer');

    // 모든 커서 초기화
    cursorCircle.classList.remove('visible', 'dark');
    cursorAirplane.classList.remove('visible', 'above', 'inverted', 'colored');
    cursorFlower.classList.remove('visible', 'dark', 'light');
    cursorClapperboard.classList.remove('visible', 'white', 'inverted', 'black');

    if (item && movieSection) {
        cursorClapperboard.classList.add('visible', 'white');
    } else if (item && tripSection) {
        cursorAirplane.classList.add('visible', 'colored');
    } else if (tripTitle) {
        cursorAirplane.classList.add('visible', 'above', 'inverted');
    } else if (movieTitle) {
        cursorClapperboard.classList.add('visible', 'inverted');
    } else if (tripSection) {
        cursorAirplane.classList.add('visible');
    } else if (movieSection) {
        cursorClapperboard.classList.add('visible', 'black');
    } else if (headerFooterText) {
        cursorFlower.classList.add('visible');
    } else if (inHeader) {
        cursorFlower.classList.add('visible', 'dark');
    } else if (inFooter) {
        cursorFlower.classList.add('visible', 'light');
    } else {
        cursorCircle.classList.add('visible');
    }
});

// ── 팝업 ──
const popupBackdrop = document.getElementById('popupBackdrop');
const popupModal    = document.getElementById('popupModal');
const popupClose    = document.getElementById('popupClose');

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', () => {
        // 클릭한 카드의 이미지를 팝업 배경으로 설정
        const imgSrc = item.querySelector('img').src;
        popupModal.style.backgroundImage = `url('${imgSrc}')`;

        // 카드 플립 아웃 (절반 회전으로 사라지는 효과)
        item.style.transition = 'transform 0.2s ease';
        item.style.transform  = 'perspective(1000px) rotateY(90deg)';

        setTimeout(() => {
            item.style.transition = '';
            item.style.transform  = '';
            // 팝업 플립 인
            popupModal.style.animation = 'modal-flip-in 0.3s ease forwards';
            popupBackdrop.classList.add('visible');
            document.body.classList.add('popup-open');
        }, 200);
    });
});

function closePopup() {
    document.body.classList.remove('popup-open');
    popupModal.style.animation = 'modal-flip-out 0.22s ease forwards';
    setTimeout(() => {
        popupBackdrop.classList.remove('visible');
        popupModal.style.animation = '';
    }, 230);
}

popupClose.addEventListener('click', closePopup);
popupBackdrop.addEventListener('click', (e) => {
    if (e.target === popupBackdrop) closePopup();
});

document.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget) {
        cursorCircle.classList.remove('visible', 'dark');
        cursorAirplane.classList.remove('visible', 'above', 'inverted', 'colored');
        cursorFlower.classList.remove('visible', 'dark', 'light');
        cursorClapperboard.classList.remove('visible', 'white', 'inverted', 'black');
    }
});
