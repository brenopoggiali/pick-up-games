import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scout-judge',
  templateUrl: './scout-judge.component.html',
  styleUrls: ['./scout-judge.component.scss']
})
export class ScoutJudgeComponent implements OnInit {

    private pickup_id: string;
    private table: {};
    private sidetable: {};
    private data: {};
    constructor(private router : ActivatedRoute) {
      this.pickup_id = this.router.snapshot.paramMap.get("pickup_id");
      console.log(this.pickup_id);
      this.data = {
        next: "next",
        previous: "previous"
      };
      this.table = {
        headerRow: [ 'Nome',  'Gols', 'Roubadas de Bola', 'Faltas cometidas' ],
        dataRows: [
            ['Dakota Rice','$36,738', 'Niger', 'Oud-Turnhout' ],
            ['Minerva Hooper', '$23,789', 'Curaçao', 'Sinaai-Waas'],
            ['Sage Rodriguez', '$56,142', 'Netherlands', 'Baileux' ],
            ['Philip Chaney', '$38,735', 'Korea, South', 'Overland Park' ],
            ['Doris Greene', '$63,542', 'Malawi', 'Feldkirchen in Kärnten', ],
            ['Mason Porter', '$78,615', 'Chile', 'Gloucester' ]
        ]
      };
      this.sidetable = {
        dataRows: [
          ['Gols', 'João das Neves', 'assets/img/faces/face-0.jpg', '3'],
          ['Defesas', 'Daniela do dragão', 'assets/img/faces/face-0.jpg', '8'],
          ['Faltas cometidas', 'Cesária', 'assets/img/faces/face-0.jpg', '25'],
          ['Finalizações', 'Daniela do dragão', 'assets/img/faces/face-0.jpg', '1328983'],
          ['Gols', 'João das Neves', 'assets/img/faces/face-0.jpg', '3']
        ]
      };
    }
  
    ngOnInit() {
    }
  
  }
