const btns = document.querySelectorAll('.modal-btn');
const modals = document.querySelectorAll('.modal');
const overlayGray = document.querySelector('.overlayGray');
const modalCloseBtns = document.querySelectorAll('.modal__close');
const loginBtn = document.querySelector('#loginBtn');
const headerReg = document.getElementById('headerReg')
const headerUser = document.querySelector('.userBlock')
const headerBox = document.querySelector('.computer-header');
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});
function closeAllModals() {
    modals.forEach(modal => {
        modal.classList.remove('active');
    });

    overlayGray.classList.remove('active');
}

btns.forEach(btn => {
    btn.addEventListener("click", () => {
        const modalId = btn.dataset.modalname;
        const modal = document.getElementById(modalId);

        closeAllModals();

        overlayGray.classList.add('active');
        modal.classList.add('active');
    });
});

modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', closeAllModals);
});

loginBtn.addEventListener("click",(e)=>{
    closeAllModals()
    headerBox.classList.add('reg')
  
})
overlayGray.addEventListener('click', closeAllModals);

headerReg.addEventListener('click',()=>{

})

const avatarInput = document.getElementById('avatarInput');
const avatar = document.querySelector('.avatar');

avatarInput.addEventListener('change', function () {
    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
        avatar.innerHTML = `
            <img src="${e.target.result}" alt="avatar">
        `;
    };

    reader.readAsDataURL(file);
});

const userRoles = document.querySelectorAll('.user__list-role');

userRoles.forEach(userRole => {
    userRole.addEventListener("click", function () {
        userRoles.forEach(item => {
            item.classList.remove('active');
        });

        this.classList.add('active');
    });
});
const exit = document.querySelectorAll('.exit')
console.log(exit)
exit.forEach(btn=>{
    btn.addEventListener("click",()=>{
        headerBox.classList.remove("user")
        headerBox.classList.remove("reg")
    })

})
// order ***************
