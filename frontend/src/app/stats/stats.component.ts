import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { HttpClient } from '@angular/common/http';
import { HttpUtilService } from '../services/http-util-service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  private adversarios: any;
  private categories: any[];
  private groups: any;
  private param_graph1: {[id: string] : any };
  private param_graph2: {[id: string] : any };
  private param_graph3: {[id: string] : any };
  private param_graph4: {[id: string] : any };
  private adversarios1: any;
  constructor(private http_util: HttpUtilService, private  http: HttpClient) {
    this.param_graph1 = {};
    this.param_graph2 = {};
    this.param_graph3 = {};
    this.param_graph4 = {};
    this.adversarios1 = [];
    this.categories = [
      {name: "Gols",id: "G"},
      {name: "Defesas",id: "G"},
      {name: "Finalizações",id: "G"},
      {name: "Gols Sofridos",id: "G"},
      {name: "Roubadas de Bola",id: "G"},
      {name: "Faltas Cometidas",id: "G"},
      {name: "Faltas Sofridas",id: "G"}
    ]
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
    this.groups = [];
  }

  ngOnInit() {
    var params = {
      email: localStorage['email']
    };

    //receber grupos de pelada que o usuário participa
    this.http.post(this.http_util.url('grupos'), params, this.http_util.headers()).subscribe(data => {
      console.log(data);
      this.groups = data;
      // this.rows = data;
    });




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

graph3(){
  var options = {
      seriesBarDistance: 10,
      axisX: {
          showGrid: false
      },
      height: "245px"
  };

  var responsiveOptions: any[] = [
    ['screen and (max-width: 640px)', {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
  ];

  
    var params = {
      email: localStorage['email']
    };

    //receber grupos de pelada que o usuário participa
    this.http.post(this.http_util.url('historico/grafico3/'+this.param_graph3['categoria']+'/'+this.param_graph3['grupo1']+'/'+this.param_graph3['grupo2']), params, this.http_util.headers()).subscribe(data => {
      console.log(data);
      var dataSales = {
        labels: data['labels'],
        series: data['series']
      };
      new Chartist.Line('#chartActivity', dataSales, options, responsiveOptions);
    });
}


  graph1(){
    var optionsSales = {
      showArea: true,
      height: "245px",
      axisX: {
        showGrid: false,
      },
      lineSmooth: Chartist.Interpolation.simple({
        divisor: 3
      }),
      showLine: true,
      showPoint: false,
    };

    var responsiveSales: any[] = [
      ['screen and (max-width: 640px)', {
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    var params = {
      email: localStorage['email']
    };

    //receber grupos de pelada que o usuário participa
    this.http.post(this.http_util.url('historico/grafico1/'+this.param_graph1['categoria']+'/'+this.param_graph1['grupo']+'/'+this.param_graph1['adversario']), params, this.http_util.headers()).subscribe(data => {
      console.log(data);
      var dataSales = {
        labels: data['labels'],
        series: data['series']
      };
      new Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);
    });
  }

  selectGroup1(label: string, value: any){
    console.log("1 - " +label+ " -  "+ value);
    this.param_graph1[label] = value;

    var params = {
      email: localStorage['email']
    };

    //receber grupos de pelada que o usuário participa
    if(label == 'grupo'){
      this.http.post(this.http_util.url('grupo/'+value+'/jogadores/'), params, this.http_util.headers()).subscribe(data => {
        console.log(data);
        this.adversarios1 = data;
        // this.rows = data;
      });
    }
  }

  selectGroup2(label: string, value: any){
    console.log("2 - " +label+ " -  "+ value);
    this.param_graph2[label] = value;
  }

  selectGroup3(label: string, value: any){
    console.log("3 - " +label+ " -  "+ value);
    this.param_graph3[label] = value;
  }

  selectGroup4(label: string, value: any){
    console.log("4 - " +label+ " -  "+ value);
    this.param_graph1[label] = value;
    
    
    var params = {
      email: localStorage['email']
    };
    //receber grupos de pelada que o usuário participa
    if(label == 'grupo'){
      this.http.post(this.http_util.url('grupo/'+value+'/jogadores/'), params, this.http_util.headers()).subscribe(data => {
        console.log(data);
        this.adversarios = data;
        // this.rows = data;
      });
    }
  }

}
