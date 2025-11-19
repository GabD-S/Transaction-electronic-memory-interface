import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    // Cria bolhas flutuantes
    const container = document.getElementById('bubbles');
    for (let i = 0; i < 20; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.style.left = Math.random() * 100 + '%';
      const size = Math.random() * 60 + 20;
      bubble.style.width = size + 'px';
      bubble.style.height = size + 'px';
      bubble.style.animationDuration = (Math.random() * 10 + 8) + 's';
      bubble.style.animationDelay = Math.random() * 5 + 's';
      container.appendChild(bubble);
    }

    // Efeito parallax no scroll
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const ocean = document.querySelector('.ocean');
      const bubbles = document.getElementById('bubbles');
      const fishes = document.querySelectorAll('.fish');
      ocean.style.transform = `translateY(${scrolled * 0.5}px)`;
      bubbles.style.transform = `translateY(${scrolled * 0.3}px)`;
      fishes.forEach((fish, index) => {
        fish.style.transform = `translateY(${scrolled * (0.2 + index * 0.1)}px)`;
      });
    });
  }
}
