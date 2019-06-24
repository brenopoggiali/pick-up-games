import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-small-card-item',
  templateUrl: './small-card-item.component.html',
  styleUrls: ['./small-card-item.component.scss']
})
export class SmallCardItemComponent implements OnInit {

  constructor() { }
  @Input() row;
  ngOnInit() {
  }

}
