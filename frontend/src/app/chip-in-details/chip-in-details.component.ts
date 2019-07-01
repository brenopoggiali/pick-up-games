import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chip-in-details',
  templateUrl: './chip-in-details.component.html',
  styleUrls: ['./chip-in-details.component.scss']
})
export class ChipInDetailsComponent implements OnInit {

  private chipin_id: string;
  private table: {};
  private data: {};
  constructor(private router : ActivatedRoute) {
    this.chipin_id = this.router.snapshot.paramMap.get("chipin_id");
    console.log(this.chipin_id);
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
  }

  ngOnInit() {
  }

}
