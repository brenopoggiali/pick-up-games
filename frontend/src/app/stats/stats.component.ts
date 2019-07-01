import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  private adversarios: any[];
  constructor() { 
    this.adversarios = [
      {
        nome: "JOão",
        id: 5
      },{
        nome: "JOão",
        id: 5
      },{
        nome: "JOão",
        id: 5
      },{
        nome: "JOão",
        id: 5
      }
    ];
  }

  ngOnInit() {




    // ========== Gráfico de Barras
    var data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      series: [
        [5, 4, 3, 7, 5, 10],
        [3, 2, 9, 5, 4, 6]
      ]
    };
    
    var options = {
      seriesBarDistance: 30
    };
    var responsiveOptions = [
      ["screen and (max-width: 640px)", {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];

    new Chartist.Bar('#chartBar', data, options, [
      ["screen and (max-width: 640px)", {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ]);
    
  }

}
