
    /*accordion*/
      document.querySelectorAll('.category-accordion-header').forEach(header => {
        header.addEventListener('click', () => {
          
          header.classList.toggle('active');
    
          
          const body = header.nextElementSibling;
          
          if (header.classList.contains('active')) {
            body.style.display = 'flex';
          } else {
            body.style.display = 'none';
          }
        });
      });
    /*end of accordion*/