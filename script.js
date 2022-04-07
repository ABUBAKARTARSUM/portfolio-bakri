/*------------------------------------------ 
Toggle Navbar 
-------------------------------------------*/
const navToggler = document.querySelector('.nav-toggler');
navToggler.addEventListener('click', () => {
  hideSection();
  toggleNavbar();
  document.body.classList.toggle('hide-scrolling');
});
function hideSection() {
  document.querySelector('section.active').classList.toggle('fade-out');
}
function toggleNavbar() {
  document.querySelector('.header').classList.toggle('active');
}
/*------------------------------------
 Active Section 
 ------------------------------------*/
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('link-item') && e.target.hash !== '') {
    // Activate the overlay to prevent to multiple click
    document.querySelector('.overlay').classList.add('active');
    navToggler.classList.add('hide');
    if (e.target.classList.contains('nav-item')) {
      toggleNavbar();
    } else {
      hideSection();
      document.body.classList.add('hide-scrolling');
    }
    setTimeout(() => {
      document.querySelector('section.active').classList.remove('active', 'fade-out');
      document.querySelector(e.target.hash).classList.add('active');
      window.scrollTo(0, 0);
      document.body.classList.remove('hide-scrolling');
      navToggler.classList.remove('hide');
      document.querySelector('.overlay').classList.remove('active');
    }, 500);
  }
});
/*------------------------------------
Portfolio Item Details Popup 
--------------------------------------*/
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('view-project-btn')) {
    togglePortfolioPopup();
    document.querySelector('.portfolio-popup').scrollTo(0, 0);
    portfolioItemDetails(e.target.parentElement);
  }
});
function togglePortfolioPopup() {
  document.querySelector('.portfolio-popup').classList.toggle('open');
  document.body.classList.toggle('hide-scrolling');
  document.querySelector('.main').classList.toggle('fade-out');
}
document.querySelector('.pp-close').addEventListener('click', togglePortfolioPopup);

// hide popup ketika click diluar area popup atau outside popup
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('pp-inner')) {
    togglePortfolioPopup();
  }
});

function portfolioItemDetails(portfolioItem) {
  document.querySelector('.pp-thumbnail img').src = portfolioItem.querySelector('.portfolio-item-thumbnail img').src;

  document.querySelector('.pp-header h3').innerHTML = portfolioItem.querySelector('.portfolio-item-title').innerHTML;

  document.querySelector('.pp-body').innerHTML = portfolioItem.querySelector('.portfolio-item-details').innerHTML;
}

/*------------------------------------------------
Alert and Interactive Contact Form to google Sheets
------------------------------------------------*/
const scriptURL = 'https://script.google.com/macros/s/AKfycbxC2m34jQdQB9XqTNAcJdR_y91Aq5y6mkUdCj1zEFbNaH9T-ArQyjBSRrGss1fcNn5i/exec';
const form = document.forms['project-contact-form'];
const btnKirim = document.querySelector('.btn-kirim');
const btnLoading = document.querySelector('.btn-loading');
const myAlert = document.querySelector('.my-alert');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  // ketika tombol submit di kirim
  // tampilkan tombol loading, hilangkan tombol kirim
  btnLoading.classList.toggle('d-none');
  btnKirim.classList.toggle('d-none');
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then((response) => {
      // tampilkan tombol kirim, hilangkan tombol loading
      btnKirim.classList.toggle('d-none');
      btnLoading.classList.toggle('d-none');
      // tampilkan alert
      swal('Terimakasih!', 'komentar sudah di terima', 'success');
      // reset formnya
      form.reset();
      console.log('Success!', response);
    })
    .catch((error) => console.error('Error!', error.message));
});
