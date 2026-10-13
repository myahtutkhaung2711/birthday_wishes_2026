document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector) => document.querySelector(selector);

  const welcome = $("#welcome");
  const mainContent = $("#main-content");
  const openButton = $("#open-surprise");
  const music = $("#birthday-music");
  const musicToggle = $("#music-toggle");
  const floatingHearts = $("#floating-hearts");
  const relationshipStart = new Date(2025, 0, 1, 0, 0, 0);

  let heartTimer = null;
  let observer = null;

  openButton.addEventListener("click", () => {
    welcome.classList.add("dismissed");
    mainContent.classList.remove("hidden");
    musicToggle.classList.remove("hidden");
    document.body.classList.remove("no-scroll");

    createHeart();
    if (!heartTimer) heartTimer = window.setInterval(createHeart, 900);
    observeSections();
  });

  // Blow out the SVG cake candles.
  const blowButton = $("#blow-candles");
  const cakeCard = $(".cake-card");
  const wishMessage = $("#wish-message");

  blowButton.addEventListener("click", () => {
    if (cakeCard.classList.contains("blown")) return;
    cakeCard.classList.add("blown");
    wishMessage.classList.remove("hidden");
    blowButton.textContent = "✨ Your wish has been sent to the universe ✨";
    blowButton.disabled = true;
    heartBurst(28);
  });

  // Reveal the love letter.
  const revealLetterButton = $("#reveal-letter");
  const letterContent = $("#letter-content");

  revealLetterButton.addEventListener("click", () => {
    const isHidden = letterContent.classList.contains("hidden");
    letterContent.classList.toggle("hidden");
    revealLetterButton.textContent = isHidden ? "Close my letter ♡" : "Read my letter 💌";

    if (isHidden) {
      window.setTimeout(() => {
        letterContent.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      heartBurst(12);
    }
  });

  // Background music is only played after the visitor presses the button.
  musicToggle.addEventListener("click", async () => {
    if (music.paused) {
      try {
        await music.play();
        musicToggle.textContent = "♫ Pause music";
      } catch (error) {
        musicToggle.textContent = "♫ Music unavailable";
        console.warn("Add a valid music file to assets/birthday-song.mp3.", error);
      }
    } else {
      music.pause();
      musicToggle.textContent = "♫ Play music";
    }
  });

  music.addEventListener("ended", () => {
    musicToggle.textContent = "♫ Play music";
  });

  function createHeart() {
    if (document.hidden || mainContent.classList.contains("hidden")) return;

    const heart = document.createElement("span");
    heart.className = "floating-heart";
    const symbols = ["♡", "♥", "✧", "✿"];
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${12 + Math.random() * 19}px`;
    heart.style.animationDuration = `${7 + Math.random() * 7}s`;
    floatingHearts.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove());
  }

  function heartBurst(amount = 20) {
    const symbols = ["♡", "♥", "💗", "✧"];

    for (let i = 0; i < amount; i++) {
      const heart = document.createElement("span");
      heart.className = "burst-heart";
      heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      heart.style.position = "fixed";
      heart.style.zIndex = "110";
      heart.style.left = `${10 + Math.random() * 80}%`;
      heart.style.top = `${25 + Math.random() * 50}%`;
      heart.style.pointerEvents = "none";
      heart.style.color = "#dc7198";
      heart.style.fontSize = `${16 + Math.random() * 22}px`;
      heart.style.transition = "transform 1.5s ease, opacity 1.5s ease";
      document.body.appendChild(heart);

      requestAnimationFrame(() => {
        heart.style.transform = `translate(${(Math.random() - 0.5) * 180}px, ${-80 - Math.random() * 220}px) rotate(${Math.random() * 80 - 40}deg)`;
        heart.style.opacity = "0";
      });
      window.setTimeout(() => heart.remove(), 1700);
    }
  }

  $("#send-love").addEventListener("click", () => {
    heartBurst(65);
    $("#send-love").textContent = "💗 A million hugs for my baby girl! 💗";
  });

  function observeSections() {
    const sections = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
      if (observer) observer.disconnect();
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      sections.forEach((section) => observer.observe(section));
    } else {
      sections.forEach((section) => section.classList.add("visible"));
    }
  }

  // Personal photo gallery and accessible full-screen viewer.
  const lightbox = $("#photo-lightbox");
  const lightboxImage = $("#lightbox-image");
  const lightboxCaption = $("#lightbox-caption");
  const closeLightboxButton = $("#close-lightbox");
  let lastFocusedPhoto = null;

  document.querySelectorAll(".girl-photo").forEach((photo) => {
    photo.addEventListener("click", () => {
      const image = photo.querySelector("img");
      const fullImage = photo.dataset.full || image.src;
      lastFocusedPhoto = photo;
      lightboxImage.src = fullImage;
      lightboxImage.alt = image.alt;
      lightboxCaption.textContent = photo.dataset.caption || "";
      lightbox.classList.remove("hidden");
      document.body.classList.add("no-scroll");
      closeLightboxButton.focus();
    });
  });

  function closeLightbox() {
    lightbox.classList.add("hidden");
    document.body.classList.remove("no-scroll");
    lightboxImage.src = "";
    if (lastFocusedPhoto) lastFocusedPhoto.focus();
  }

  closeLightboxButton.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.classList.contains("hidden")) closeLightbox();
  });
});

// Birthday cake: blow out the candles
document.addEventListener("DOMContentLoaded", () => {
  const blowButton = document.getElementById("blowCandlesBtn");
  const wishMessage = document.getElementById("wishMessage");
  const cakeSection = document.getElementById("birthday-cake");

  if (!blowButton || !wishMessage || !cakeSection) return;

  blowButton.addEventListener("click", () => {
    cakeSection.classList.add("candles-blown");

    wishMessage.hidden = false;

    blowButton.textContent = "💗 Wish Made!";
    blowButton.disabled = true;
  });
});
