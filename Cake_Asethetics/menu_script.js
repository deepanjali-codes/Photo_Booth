const parent = document.querySelector('.parent');
  const divs = document.querySelectorAll('.parent div');

  divs.forEach(div => {
    div.addEventListener('click', (e) => {
      e.stopPropagation(); 
      const alreadyActive = div.classList.contains('active');

      document.querySelectorAll('.info').forEach(i => i.remove());
      divs.forEach(d => d.classList.remove('active'));
      parent.classList.remove('fade');

      if (!alreadyActive) {
        const info = document.createElement('div');
        info.classList.add('info');
        info.innerHTML = `
          ${div.getAttribute('data-info')}<br>
          <button class='buy-btn'>Buy Now 💸</button>
        `;
        div.appendChild(info);

        div.classList.add('active');
        parent.classList.add('fade');

        const btn = info.querySelector('.buy-btn');
        btn.addEventListener('click', (ev) => {
          ev.stopPropagation();
          alert(`🍰 Thanks for choosing ${div.getAttribute('data-info')}!`);
        });
      }
    });
  });


  const menuSelect = document.getElementById('menuSelect');
  menuSelect.addEventListener('change', function() {
    const sectionId = this.value;
    if (sectionId) {
      document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    }
  });