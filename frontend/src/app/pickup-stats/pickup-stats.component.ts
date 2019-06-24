import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pickup-stats',
  templateUrl: './pickup-stats.component.html',
  styleUrls: ['./pickup-stats.component.scss']
})
export class PickupStatsComponent implements OnInit {

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
        ['Gols', 'João das Neves', '3'],
        ['Defesas', 'Daniela do dragão', '8'],
        ['Faltas cometidas', 'Cesária', '25'],
        ['Finalizações', 'Daniela do dragão', '1328983'],
        ['Gols', 'João das Neves', '3']
      ]
    };
  }

  ngOnInit() {
  }

}
