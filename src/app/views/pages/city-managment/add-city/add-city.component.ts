import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { cityService } from 'src/app/_services/cityService/city.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {
  public headerText:any ="Add City";
  public buttonText:any = "Add"
  selected_country = 'none';
  selected_course = 'none';
  selected_subject = 'none';
  lovType: string = "1";
  university_name:any;
  university_description:any;
  countryListModel: any[] = [
  ];
  addCityForm!:FormGroup
  displayedColumns:string[]=['']
  constructor(
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private cityService: cityService,
    private formBuilder: FormBuilder,
    private dialogRef:MatDialogRef<AddCityComponent>
    ) { }


 
    ngOnInit(): void {

      this.addCityForm = this.formBuilder.group({
        city_id:[''],
        city_name:['', Validators.required],
        city_description:['', Validators.required],
      });
  
    if(this.editData)
     {
  
      this.headerText = this.editData.header_text,
      this.buttonText = "Update"
      this.addCityForm.controls['city_name'].setValue(this.editData.universityDetails.name);
      this.addCityForm.controls['city_id'].setValue(this.editData.universityDetails.id);
      this.addCityForm.controls['city_description'].setValue(this.editData.universityDetails.description);
     }
    }
  
    onSubmit(){
      if(this.addCityForm.valid){
        if(!this.editData)
        {
          this.addCity();
        }
        else{
          this.updateCity();
        }
      }
    }
  
  
    addCity(){
      var formData={
        cityName:  this.addCityForm.value.city_name,
        cityDescription: this.addCityForm.value.city_description
      }
  
      this.cityService.addCity(formData).subscribe((resp) => {
        if (resp.isSuccessful) {
          this.countryListModel = resp.data;
          Swal.fire(
            'Great!',
            resp.message,
            'success'
          )
          this.addCityForm.reset();
          this.dialogRef.close('add');
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: 'Error message : ' + resp.message
          })
        }
      });
    }
  
  
    updateCity(){
      var formData={
        cityID:  this.addCityForm.value.city_id + 0,
        cityName:  this.addCityForm.value.city_name,
        cityDescription: this.addCityForm.value.city_description
      }
      this.cityService.updateCity(formData)
      .subscribe({
        next:(resp) => {
        if (resp.isSuccessful) {
          this.countryListModel = resp.data;
          Swal.fire(
            'Great!',
            resp.message,
            'success'
          )
          this.addCityForm.reset();
          this.dialogRef.close('update');
        }
        else{
        
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: 'Error message : ' + ':' + resp.message
          })
        }
      }
      });
    }
  
    changeClient(data:any){
  
      //this.selected_country_id = data.id;
      //this.getUniversities(data.id);
    }
  
    closeModel(){
  
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You want to close this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          // swalWithBootstrapButtons.fire(
          //   'Cancelled',
          //   'error'
          // )
        }
      })
    }
  }
  
