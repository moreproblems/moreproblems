import { Component } from '@angular/core';

@Component({
  selector: 'app-confetti',
  template: `
    <div class="confetti-container">
      <div class="confetti"></div>
    </div>
  `,
  styles: [
    `
      .confetti-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      .confetti {
        position: absolute;
        top: -20px;
        width: 10px;
        height: 10px;
        background-color: #ffdd00;
        border-radius: 50%;
        animation: fall 1s ease-out infinite;
      }

      @keyframes fall {
        0% {
          transform: translateY(-50px) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(360deg);
          opacity: 0;
        }
      }
    `,
  ],
})
export class ConfettiComponent {}
