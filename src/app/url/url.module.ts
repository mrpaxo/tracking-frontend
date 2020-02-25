import { NgModule , NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { UrlRoutingModule } from './url-routing.module';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { CreateUrlComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  providers: [DatePipe],
  declarations: [ListComponent, DetailsComponent, CreateUrlComponent, UpdateComponent],
  imports: [
    CommonModule,
    UrlRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DataTablesModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class UrlModule { }
