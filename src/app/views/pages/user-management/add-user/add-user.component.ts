import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CountryService } from 'src/app/_services/countryService/country.service';
import { ProfileService } from 'src/app/_services/profileService/profile.service';
import { UserService } from 'src/app/_services/userService/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  public headerText: any = "Add User";
  public buttonText: any = "Add"
  selected_country = 'none';
  selected_course = 'none';
  selected_subject = 'none';
  lovType: string = "1";
  university_name: any;
  university_description: any;
  profileListModel: any[] = [
  ];
  userListModel: any[] = [
  ];
  cityListModel: any[] = [];
  addUserForm!: FormGroup
  displayedColumns: string[] = ['']

  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private userService: UserService,
    private profileService: ProfileService,
    private countryService: CountryService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddUserComponent>
  ) { }

  ngOnInit(): void {
    debugger;
    this.addUserForm = this.formBuilder.group({
      userName: ['', Validators.required],
      profileID: ['', Validators.required],
      userCode: ['', Validators.required],
      userTypeId: ['', Validators.required],
      cityId: ['', Validators.required],
      emailAddress: ['', Validators.required],
      mobileNo: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required]
    });

    // if (this.editData) {
    //   debugger;
    //   this.headerText = this.editData.header_text,
    //     this.buttonText = "Update"
    //   this.addUserForm.controls['countryName'].setValue(this.editData.countryID.id);
    //   this.addUserForm.controls['university_name'].setValue(this.editData.universityDetails.name);
    //   this.addUserForm.controls['university_id'].setValue(this.editData.universityDetails.id);
    //   this.addUserForm.controls['university_description'].setValue(this.editData.universityDetails.description);
    // }
    this.getProfile();
    this.getCities();
  }


  hasError(controlName: string, errorName: string): boolean {
    return this.addUserForm.controls[controlName].hasError(errorName);
  }

  getProfile() {
    this.profileService.GetProfiles().subscribe((resp) => {
      if (resp.isSuccessful) {
        this.profileListModel = resp.data;
      }
      else {
        debugger;
      }
    });
  }

  getCities() {
    this.countryService.getCities().subscribe((resp) => {
      if (resp.isSuccessful) {
        debugger
        this.cityListModel = resp.data;
      }
      else {
        debugger;
      }
    });
  }

  onSubmit() {
    debugger;
    if (this.addUserForm.valid) {
      // if (!this.editData) {
      this.addUser();
      // }
      // else {
      //   this.updateUser();
      // }
    }
  }


  addUser() {
    debugger;
    var formData = {
      userName: this.addUserForm.value.userName,
      profileID: this.addUserForm.value.profileID,
      userCode: this.addUserForm.value.userCode,
      userTypeId: this.addUserForm.value.userTypeId,
      cityId: this.addUserForm.value.cityId,
      emailAddress: this.addUserForm.value.emailAddress,
      mobileNo: this.addUserForm.value.mobileNo,
      address: this.addUserForm.value.address,
      password: this.addUserForm.value.password,
    }

    this.userService.addUser(formData).subscribe((resp) => {
      if (resp.isSuccessful) {
        this.userListModel = resp.data;
        Swal.fire(
          'Great!',
          resp.message,
          'success'
        )
        this.addUserForm.reset();
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


  updateUser() {
    debugger;
    var formData = {
      userName: this.addUserForm.value.userName,
      profileID: this.addUserForm.value.profileID,
      userCode: this.addUserForm.value.userCode,
      userTypeId: this.addUserForm.value.userTypeId,
      cityId: this.addUserForm.value.cityId,
      emailAddress: this.addUserForm.value.emailAddress,
      mobileNo: this.addUserForm.value.mobileNo,
      address: this.addUserForm.value.address,
      password: this.addUserForm.value.password,
    }
    this.userService.updateUser(formData)
      .subscribe({
        next: (resp) => {
          if (resp.isSuccessful) {
            this.profileListModel = resp.data;
            Swal.fire(
              'Great!',
              resp.message,
              'success'
            )
            this.addUserForm.reset();
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
