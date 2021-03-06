import { Component, OnInit } from '@angular/core';
import { Chart } from '../../../../node_modules/chart.js';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGraph } from 'src/app/shared/graph.js';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  // private _url: string = "https://api.covid19india.org/data.json"
  private _url: string = "http://localhost:5000/api/graph"
  public graphs;
  public labels = [];
  public confirmedCases = [];
  public activeCases = [];
  public deceasedCases = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getGraphs()
      .subscribe(data => this.setData(data));
  }

  getGraphs(): Observable<IGraph> {
    return this.http.get<IGraph>(this._url);
  }

  setData(data) {
    this.labels = data["labels"];
    this.confirmedCases = data["confirmedCases"];
    this.activeCases = data["activeCases"];
    this.deceasedCases = data["deceasedCases"];

    var confirmedCasesChart = new Chart("confirmedChart", {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: '# of confirmed cases',
          data: this.confirmedCases,
          fill: false,
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
    });

    var activeCasesChart = new Chart("activeChart", {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: '# of active cases',
          data: this.activeCases,
          fill: false,
          borderColor: [
            'rgba(11, 156, 49, 1)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
    });

    var deathCasesChart = new Chart("deathChart", {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: '# of deceased',
          data: this.deceasedCases,
          fill: false,
          borderColor: [
            'rgba(108, 122, 137, 1)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
    });
  }
}
