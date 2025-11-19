import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["name"]

  greet() {
    const element = this.nameTarget
    const name = element.value
    console.log(`Hello, ${name}!`)

    const element2 = this.elemnt
    const name2 = element2.value
    console.log(`Hello, ${name2}!`)
  }


}

