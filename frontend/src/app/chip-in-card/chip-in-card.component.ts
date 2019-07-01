import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chip-in-card',
  templateUrl: './chip-in-card.component.html',
  styleUrls: ['./chip-in-card.component.scss']
})
export class ChipInCardComponent implements OnInit {
  @Input() row: Object;
  constructor() { }

  ngOnInit() {
  }

}
