import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { IState } from 'src/app/shared/state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  public statewise_data = [];
  public total_data = {};

  // private _url: string = "https://api.covid19india.org/data.json"
  private _url: string = "http://localhost:5000/api/statewise"

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getStateData()
      .subscribe(data => this.setData(data));
  }

  getStateData(): Observable<IState[]> {
    return this.http.get<IState[]>(this._url);
  }

  setData(data) {
    this.statewise_data = data.filter(k => k["state"] != "Total");
    console.log(data.filter(k => k["state"] == "Total")[0]);
    this.total_data = data.filter(k => k["state"] == "Total")[0];
  }

}
