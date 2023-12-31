import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CountryService } from 'src/app/_services/countryService/country.service';
import { UniversityService } from 'src/app/_services/univeristyService/university.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-university',
  templateUrl: './add-university.component.html',
  styleUrls: ['./add-university.component.css']
})
export class AddUniversityComponent implements OnInit {
  public headerText: any = "Add University";
  public buttonText: any = "Add"
  selected_country = 'none';
  selected_course = 'none';
  selected_subject = 'none';
  lovType: number = 1;
  university_name: any;
  university_description: any;
  countryListModel: any[] = [
  ];
  addUniversityForm!: FormGroup
  displayedColumns: string[] = ['']

  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private countryService: CountryService,
    private universityService: UniversityService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddUniversityComponent>
  ) { }

  ngOnInit(): void {
    this.addUniversityForm = this.formBuilder.group({
      countryName: ['', Validators.required],
      university_name: ['', Validators.required],
      university_id: [''],
      university_description: ['', Validators.required],
    });

    if (this.editData) {
      this.headerText = this.editData.header_text,
        this.buttonText = "Update"
      this.addUniversityForm.controls['countryName'].setValue(this.editData.countryID.id);
      this.addUniversityForm.controls['university_name'].setValue(this.editData.universityDetails.name);
      this.addUniversityForm.controls['university_id'].setValue(this.editData.universityDetails.id);
      this.addUniversityForm.controls['university_description'].setValue(this.editData.universityDetails.description);
    }
    this.getCountries(this.lovType);
  }

  getCountries(lovType: any) {
    this.countryService.getCountries(lovType).subscribe((resp) => {
      if (resp.isSuccessful) {
        this.countryListModel = resp.data;
      }
      else {
      }
    });
  }

  onSubmit() {
    if (this.addUniversityForm.valid) {
      if (!this.editData) {
        this.addUniversity();
      }
      else {
        this.updateUniversity();
      }
    }
  }


  addUniversity() {
    var formData = {
      countryID: this.addUniversityForm.value.countryName + "",
      universityName: this.addUniversityForm.value.university_name,
      universityDescription: this.addUniversityForm.value.university_description
    }

    this.universityService.addUniversity(formData).subscribe((resp) => {
      if (resp.isSuccessful) {
        this.countryListModel = resp.data;
        Swal.fire(
          'Great!',
          resp.message,
          'success'
        )
        this.addUniversityForm.reset();
        this.dialogRef.close('add');
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: 'Error message' + resp.message
        })
      }
    });
  }


  updateUniversity() {
    var formData = {
      countryID: this.addUniversityForm.value.countryName + "",
      universityID: this.addUniversityForm.value.university_id + "",
      universityName: this.addUniversityForm.value.university_name,
      universityDescription: this.addUniversityForm.value.university_description
    }
    this.universityService.updateUniveristy(formData)
      .subscribe({
        next: (resp) => {
          if (resp.isSuccessful) {
            this.countryListModel = resp.data;
            Swal.fire(
              'Great!',
              resp.message,
              'success'
            )
            this.addUniversityForm.reset();
            this.dialogRef.close('update');
          }
          else {
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
  }

  closeModel() {
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
