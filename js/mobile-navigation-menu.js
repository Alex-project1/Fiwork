function openMenu(menuId) {
  document.querySelectorAll('.menu').forEach(menu => {
    menu.classList.add('hidden');
  });
  
  document.getElementById(menuId).classList.remove('hidden');
  if(menuId!="menu-main"){
        $(".phone-header").css("max-width","100%");
  }else{
        $(".phone-header").css("max-width","260px");
  }
}
