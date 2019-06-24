import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pickup-groups',
  templateUrl: './pickup-groups.component.html',
  styleUrls: ['./pickup-groups.component.scss']
})
export class PickupGroupsComponent implements OnInit {

  private rows: any[];
  constructor() {
    this.rows = [
      {
        name: "Pelada dos cria",
        place: "Rua de baixo, numero 22",
        date: "22/22",
        time: "30:30"
      },
      {
        name: "Só marotos",
        place: "Rua de baixo, numero 22",
        date: "22/22",
        time: "30:30"
      },
      {
        name: "Só marotos",
        place: "Rua de baixo, numero 22",
        date: "22/22",
        time: "30:30"
      },
      {
        name: "Só marotos",
        place: "Rua de baixo, numero 22",
        date: "22/22",
        time: "30:30"
      },
      {
        name: "Só marotos",
        place: "Rua de baixo, numero 22",
        date: "22/22",
        time: "30:30"
      }
    ];
  }

  ngOnInit() {
  }

}
