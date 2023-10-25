import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BranchesService } from 'src/app/_services/branchService/branches.service';
import { CountryService } from 'src/app/_services/countryService/country.service';
import { UniversityService } from 'src/app/_services/univeristyService/university.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css']
})
export class AddBranchComponent implements OnInit {

  public headerText: any = "Add Branch";
  public buttonText: any = "Add"
  selected_country = 'none';
  selected_course = 'none';
  selected_subject = 'none';
  lovType: number = 2;
  branch_name: any;
  branch_description: any;
  cityListModel: any[] = [
  ];
  addBranchForm!: FormGroup
  displayedColumns: string[] = ['']

  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private countryService: CountryService,
    private branchService: BranchesService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddBranchComponent>
  ) { }

  
  ngOnInit(): void {

    this.addBranchForm = this.formBuilder.group({
      cityName: ['', Validators.required],
      branch_name: ['', Validators.required],
      branch_id: [''],
      branch_description: ['', Validators.required],
    });

    if (this.editData) {
      this.headerText = this.editData.header_text,
        this.buttonText = "Update"
      this.addBranchForm.controls['cityName'].setValue(this.editData.branchDetails.cityID);
      this.addBranchForm.controls['branch_name'].setValue(this.editData.branchDetails.name);
      this.addBranchForm.controls['branch_id'].setValue(this.editData.branchDetails.id);
      this.addBranchForm.controls['branch_description'].setValue(this.editData.branchDetails.description);
    }
    this.getCountries(this.lovType);
  }

  getCountries(lovType: any) {
    this.countryService.getCountries(lovType).subscribe((resp) => {
      if (resp.isSuccessful) {
        this.cityListModel = resp.data;
      }
      else {
      }
    });
  }

  onSubmit() {
    if (this.addBranchForm.valid) {
      if (!this.editData) {
        this.addbranch();
      }
      else {
        this.updateBranch();
      }
    }
  }


  addbranch() {
    var formData = {
      cityID: this.addBranchForm.value.cityName + 0,
      branchName: this.addBranchForm.value.branch_name,
      branchDescription: this.addBranchForm.value.branch_description
    }

    this.branchService.addbranch(formData).subscribe((resp) => {
      if (resp.isSuccessful) {
        this.cityListModel = resp.data;
        Swal.fire(
          'Great!',
          resp.message,
          'success'
        )
        this.addBranchForm.reset();
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


  updateBranch() {
    var formData = {
      cityID: this.addBranchForm.value.cityName + 0,
      branchID: this.addBranchForm.value.branch_id + 0,
      branchName: this.addBranchForm.value.branch_name,
      branchDescription: this.addBranchForm.value.branch_description
    }
    this.branchService.updatebranch(formData)
      .subscribe({
        next: (resp) => {
          if (resp.isSuccessful) {
            this.cityListModel = resp.data;
            Swal.fire(
              'Great!',
              resp.message,
              'success'
            )
            this.addBranchForm.reset();
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
    //this.selected_country_id = data.id;
    //this.getUniversities(data.id);
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

