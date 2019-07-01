import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpUtilService } from '../services/http-util-service';

@Component({
  selector: 'app-pickup-stats',
  templateUrl: './pickup-stats.component.html',
  styleUrls: ['./pickup-stats.component.scss']
})
export class PickupStatsComponent implements OnInit {

  private pickup_id: string;
  private table: {};
  private my_numbers: any[];
  private sidetable: {};
  private data: {};
  private dict_names: any[];
  constructor(private router : ActivatedRoute,
    private http_util: HttpUtilService, private  http: HttpClient) {
    this.pickup_id = this.router.snapshot.paramMap.get("pickup_id");
    console.log(this.pickup_id);
    this.data = {
      next: "next",
      previous: "previous"
    };


    this.table = {
      headerRow: [ 'Nome',  'Gols', 'Finalizações', 'Gols Sofridos', 'Defesas', 'Faltas Sofridas'],
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
    var params = {
      email: localStorage['email']
    };

    this.http.post(this.http_util.url('pelada/'+this.pickup_id), params, this.http_util.headers()).subscribe(data => {
      console.log(data);
      this.table['dataRows'] = data['players'];
      this.my_numbers = data['scouts'][0];
    });
  }

  previous(){

  }
  
  next(){

  }

}
