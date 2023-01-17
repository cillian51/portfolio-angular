import { Component, OnInit } from '@angular/core';
import AOS from "aos";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    AOS.init();

    // Element that holds the text
    this.element = document.getElementById('text') as HTMLInputElement;

    // Cursor element
    this.cursor = document.getElementById('cursor') as HTMLInputElement;
    // Start the typing effect on load
    this.interval_val = setInterval(() => this.typeScript(), 100);
  }

  // List of sentences
  content = ['Developer', 'Junior', 'Designer'];

  // Current sentence being processed
  part = 0;

  // Character number of the current sentence being processed
  part_index = 0;

  // Holds the handle returned from setInterval
  interval_val;

  element;
  cursor;

  text = '';
  // Implements typing effect
  typeScript() {
    this.cursor.style.animationPlayState = 'paused';
    this.text = getSubstringWithACaracterAdded();
    this.element.innerHTML = this.text;
    this.part_index++;

    // If full sentence has been displayed then start to delete the sentence after some time
    if (this.text === this.content[this.part]) {
      clearInterval(this.interval_val);
      this.cursor.style.animationPlayState = 'running';
      setTimeout(() => {
        this.interval_val = setInterval(() => this.deleteScript(), 50);
      }, 3000);
    }
  }
  private getSubsctringWithACaracterAdded() {
    this.content[this.part].substring(0, this.part_index + 1);
  }

  // Implements deleting effect
  deleteScript() {
    this.cursor.style.animationPlayState = 'paused';
    // Get substring with 1 characater deleted
    this.text = this.content[this.part].substring(0, this.part_index - 1);
    this.element.innerHTML = this.text;
    this.part_index--;

    // If sentence has been deleted then start to display the next sentence
    if (this.text === '') {
      clearInterval(this.interval_val);

      // If current sentence was last then display the first one, else move to the next
      if (this.part == this.content.length - 1) this.part = 0;
      else this.part++;

      this.part_index = 0;

      // Start to display the next sentence after some time
      setTimeout(() => {
        this.cursor.style.display = 'inline-block';
        this.interval_val = setInterval(() => this.typeScript(), 100);
      }, 200);
    }
  }
}
