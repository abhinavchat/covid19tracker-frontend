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

  private _url: string = "https://api.covid19india.org/data.json"

  constructor(private http: HttpClient) {
    
   }

  ngOnInit(): void {
    this.getStateData()
      .subscribe(data => this.statewise_data = data["statewise"]);
  }

  getStateData(): Observable<IState[]> {
    return this.http.get<IState[]>(this._url);
  }

}
