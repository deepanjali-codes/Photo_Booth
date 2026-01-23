document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          document
            .querySelector(this.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
      // Mob Centering Logic
      const mobsContainer = document.querySelector(".mobs-container");
      let scrollTimeout;
      mobsContainer.addEventListener("scroll", () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          const cards = document.querySelectorAll(".mob-card");
          let closest = null,
            minDist = Infinity;
          cards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const dist = Math.abs(
              rect.left + rect.width / 2 - window.innerWidth / 2
            );
            if (dist < minDist) {
              minDist = dist;
              closest = card;
            }
          });
          if (closest && minDist > 60) {
            closest.scrollIntoView({ behavior: "smooth", inline: "center" });
          }
        }, 150);
      });