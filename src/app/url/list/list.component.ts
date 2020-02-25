import { Component, OnInit ,OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Subject } from 'rxjs';
import { Articulo } from 'src/app/models/articulo.class';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  articulos: Articulo[];
  title = 'angulardatatables';
  

  constructor(public apiService: ApiService) { }

  ngOnInit() {
    this.dtOptions = {pagingType: 'full_numbers', pageLength: 5, processing: true};
    this.getArticulosUser()     
  }
  public getArticulosUser (){
    this.apiService.getArticulosUser().subscribe(articulos => this.articulos = articulos);
    this.dtTrigger.next();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
