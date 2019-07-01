import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {
  
  constructor() {
  }

  @Input() row: Object;
  @Input() mixType: boolean;
  ngOnInit() {
    // this.row = {
    //   name: "Pelada dos Cria",
    //   place: "Rua blablala",
    //   date: "22/22",
    //   time: "33:33",
    // };
  }

}
