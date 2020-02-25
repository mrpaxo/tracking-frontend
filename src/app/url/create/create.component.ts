import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateUrlComponent implements OnInit {
  urlForm: FormGroup;
  constructor(public fb: FormBuilder,private router: Router,public apiService: ApiService,private toastr: ToastrService) { }
  
  ngOnInit() {
    this.urlForm = this.fb.group({
      url: ['', [Validators.required]],
      duracion: ['5MIN']//de momento lo dejaremos todos free , por si en un futuro se quiere manejar una membresia premium 
    })
  }
  submitForm() {
    
    this.apiService.createUrl(this.urlForm.value)
        .subscribe(
            data => {
              console.log(data)
              this.toastr.success("Url creada con exito")
              this.router.navigate(['/url/list/'])
            },
            error => {
                console.log(error)
            });
}
}
