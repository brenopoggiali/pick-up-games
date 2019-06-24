import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  private group_id: string;
  private rows: any[];
  constructor(private router : ActivatedRoute) {
    this.group_id = this.router.snapshot.paramMap.get("group_id");
    console.log(this.group_id);
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
      }
    ];
  }

  ngOnInit() {
  }

}
