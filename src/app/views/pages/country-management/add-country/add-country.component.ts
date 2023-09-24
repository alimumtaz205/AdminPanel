import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CountryService } from 'src/app/_services/countryService/country.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})
export class AddCountryComponent implements OnInit {
  public headerText: any = "Add Country";
  public buttonText: any = "Add";
  hasFormErrors = false;
  selected_country = 'none';
  selected_course = 'none';
  selected_subject = 'none';
  lovType: string = "1";
  university_name: any;
  university_description: any;
  countryListModel: any[] = [
  ];
  addCountryForm!: FormGroup
  displayedColumns: string[] = ['']

  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private countryService: CountryService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddCountryComponent>
  ) { }

  ngOnInit(): void {
    debugger;
    this.addCountryForm = this.formBuilder.group({
      country_id: [''],
      country_name: ['', Validators.required],
      country_description: ['', Validators.required],
    });

    if (this.editData) {
      debugger;
      this.headerText = this.editData.header_text,
        this.buttonText = "Update"
      this.addCountryForm.controls['country_name'].setValue(this.editData.universityDetails.name);
      this.addCountryForm.controls['country_id'].setValue(this.editData.universityDetails.id);
      this.addCountryForm.controls['country_description'].setValue(this.editData.universityDetails.description);
    }
  }


  hasError(controlName: string, errorName: string): boolean {
    return this.addCountryForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    debugger;
    if (!this.addCountryForm.valid) {

      this.hasFormErrors = false;
      if (this.addCountryForm.invalid) {
        const controls = this.addCountryForm.controls;
        Object.keys(controls).forEach(controlName =>
          controls[controlName].markAsTouched()
        );
      }
    }
    else {
      if (!this.editData) {
        this.addCountry();
      }
      else {
        this.updateCountry();
      }
    }

  }


  addCountry() {
    debugger;
    var formData = {
      countryName: this.addCountryForm.value.country_name,
      countryDescription: this.addCountryForm.value.country_description
    }

    this.countryService.addCountry(formData).subscribe((resp) => {
      if (resp.isSuccessful) {
        this.countryListModel = resp.data;
        Swal.fire(
          'Great!',
          resp.message,
          'success'
        )
        this.addCountryForm.reset();
        this.dialogRef.close('add');
      }
      else {
        debugger;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: 'Error message' + resp.message
        })
      }
    });
  }


  updateCountry() {
    debugger;
    var formData = {
      countryID: this.addCountryForm.value.country_id + "",
      countryName: this.addCountryForm.value.country_name,
      countryDescription: this.addCountryForm.value.country_description
    }
    this.countryService.updateCountry(formData)
      .subscribe({
        next: (resp) => {
          if (resp.isSuccessful) {
            this.countryListModel = resp.data;
            Swal.fire(
              'Great!',
              resp.message,
              'success'
            )
            this.addCountryForm.reset();
            this.dialogRef.close('update');
          }
          else {
            debugger;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: 'Error message' + ':' + resp.message
            })
          }
        }
      });
  }

  changeClient(data: any) {
    debugger;
    //this.selected_country_id = data.id;
    //this.getUniversities(data.id);
  }

  closeModel() {
    debugger;
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
