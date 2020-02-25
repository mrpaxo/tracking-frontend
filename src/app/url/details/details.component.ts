import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Articulo } from 'src/app/models/articulo.class';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public articulo: Articulo;
  //public chartType = 'line';
  public chart1Type:string = 'line';
  public chartDatasets: Array<any> = [];
  public chartLabels: Array<any> = [];
  public chartColors:Array<any> = [{backgroundColor: 'rgba(25, 118, 210, 0.8)'}];
  todayString : string = new Date().toDateString();

  public chartOptions: any = {
    responsive: true,
    legend: {
      labels: {
        fontColor: '#5b5f62',
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: '#5b5f62',
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: '#5b5f62',
        }
      }]
    }
  };
  constructor(private route: ActivatedRoute , private apiService:ApiService , public datepipe: DatePipe) { }

  ngOnInit() {
    const idArticulo = this.route.snapshot.params['ArticuloId'];
    this.getArticuloDetail(idArticulo)
  }
  getArticuloDetail(idUrl: number){
    this.apiService.getArticuloDetail(idUrl).subscribe(
    data => {
      let list_price:Array<any> = [];
      this.articulo = data;
      this.articulo.hist_precio.forEach(hist_precio =>{
        list_price.push(hist_precio.precio)             
        this.chartLabels.push(this.datepipe.transform(hist_precio.created_date, 'dd/MM/yyyy'))
      });
      this.chartDatasets.push({data:list_price,label:"articulo"})
     // console.log(chartDatasets2,'-----------------------------');
      //console.log(this.chartDatasets,'*********************************');
      
    },
    error => {
        console.log(error)
    });
  } 
 /* public getArticuloDetail(idArticulo: number) {
    this.apiService.getArticuloDetail(idArticulo).subscribe(articulo => this.articulo = articulo);
  }*/
}
