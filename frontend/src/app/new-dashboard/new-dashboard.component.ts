import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-dashboard',
  templateUrl: './new-dashboard.component.html',
  styleUrls: ['./new-dashboard.component.scss']
})
export class NewDashboardComponent implements OnInit {

  private param: string;
  private rows: any[];
  constructor(private router : ActivatedRoute, private http: HttpClient) {
    this.param = '';
    this.rows = [
      {
        id: 1321,
        name: "Pelada dos cria",
        place: "Rua de baixo, numero 22",
        date: "22/22",
        time: "30:30"
      },
      {
        id: 9032,
        name: "Só marotos",
        place: "Rua de baixo, numero 22",
        date: "22/22",
        time: "30:30"
      }
    ];
  }

  ngOnInit() {
    this.param = this.router.snapshot.paramMap.get("param");
    console.log(this.param);
    this.rows[0].name = this.param;
  }

}
