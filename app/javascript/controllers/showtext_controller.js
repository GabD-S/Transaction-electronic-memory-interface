import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "output"]

  show() {
    this.outputTarget.textContent = this.inputTarget.value
  }
}
