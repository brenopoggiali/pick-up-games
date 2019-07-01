import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpUtilService } from '../services/http-util-service';

@Component({
  selector: 'app-new-dashboard',
  templateUrl: './new-dashboard.component.html',
  styleUrls: ['./new-dashboard.component.scss']
})
export class NewDashboardComponent implements OnInit {

  private param: string;
  private rows: any;
  constructor(private router : ActivatedRoute, private http_util: HttpUtilService, private  http: HttpClient) {
    this.param = '';
    this.rows =[];
  }

  ngOnInit() {
    this.param = this.router.snapshot.paramMap.get("param");
    // console.log(this.param);
    // this.rows[0].name = this.param;
    var params = {
      email: localStorage['email']
    };

    this.http.post(this.http_util.url('dashboard'), params, this.http_util.headers()).subscribe(data => {
      console.log(data);
      this.rows = data;
    });
  }

}
