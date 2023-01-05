import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // Element that holds the text
    this._ELEMENT = document.getElementById('text') as HTMLInputElement;

    // Cursor element
    this._CURSOR = document.getElementById('cursor') as HTMLInputElement;
    // Start the typing effect on load
    this._INTERVAL_VAL = setInterval(() => this.typeScript(), 100);
  }

  // List of sentences
  _CONTENT = ['Developer', 'Junior', 'Designer'];

  // Current sentence being processed
  _PART = 0;

  // Character number of the current sentence being processed
  _PART_INDEX = 0;

  // Holds the handle returned from setInterval
  _INTERVAL_VAL;

  _ELEMENT;
  _CURSOR;

  text = '';
  // Implements typing effect
  typeScript() {
    // Get substring with 1 characater added
    this.text = this._CONTENT[this._PART].substring(0, this._PART_INDEX + 1);
    this._ELEMENT.innerHTML = this.text;
    this._PART_INDEX++;

    // If full sentence has been displayed then start to delete the sentence after some time
    if (this.text === this._CONTENT[this._PART]) {
      clearInterval(this._INTERVAL_VAL);
      setTimeout(() => {
        this._INTERVAL_VAL = setInterval(() => this.deleteScript(), 50);
      }, 1000);
    }
  }

  // Implements deleting effect
  deleteScript() {
    // Get substring with 1 characater deleted
    this.text = this._CONTENT[this._PART].substring(0, this._PART_INDEX - 1);
    this._ELEMENT.innerHTML = this.text;
    this._PART_INDEX--;

    // If sentence has been deleted then start to display the next sentence
    if (this.text === '') {
      clearInterval(this._INTERVAL_VAL);

      // If current sentence was last then display the first one, else move to the next
      if (this._PART == this._CONTENT.length - 1) this._PART = 0;
      else this._PART++;

      this._PART_INDEX = 0;

      // Start to display the next sentence after some time
      setTimeout(() => {
        this._CURSOR.style.display = 'inline-block';
        this._INTERVAL_VAL = setInterval(() => this.typeScript(), 100);
      }, 200);
    }
  }
}
