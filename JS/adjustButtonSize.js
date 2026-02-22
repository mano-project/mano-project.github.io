
  function adjustButtonSize() {
    const isSmallScreen = window.innerWidth < 768;
    const buttons = document.querySelectorAll(".responsive-btn");

    buttons.forEach(btn => {
      if (isSmallScreen) {
        btn.classList.add("btn-sm");
      } else {
        btn.classList.remove("btn-sm");
      }
    });
  }

  adjustButtonSize();
  window.addEventListener("resize", adjustButtonSize);