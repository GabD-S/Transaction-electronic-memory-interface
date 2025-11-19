import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["box"]

  show(message) {
    this.boxTarget.textContent = message;
    this.boxTarget.classList.add('show');
    setTimeout(() => {
      this.boxTarget.classList.remove('show');
    }, 3000);
  }
}
