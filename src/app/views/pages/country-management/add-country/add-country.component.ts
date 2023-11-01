import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CountryService } from 'src/app/_services/countryService/country.service';
import { UploadService } from 'src/app/_services/uploadService/upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})
export class AddCountryComponent implements OnInit {
  public headerText: any = "Add Country";
  public buttonText: any = "Add"
  selected_country = 'none';
  selected_course = 'none';
  selected_subject = 'none';
  lovType: string = "1";
  university_name: any;
  university_description: any;
  countryListModel: any[] = [
  ];
  selectedFileNames: string[] = [];
  selectedFiles?: FileList;
  addCountryForm!: FormGroup
  displayedColumns: string[] = ['']
  message: string[] = [];
  progressInfos: any[] = [];
  previews: string[] = [];
  messages: string[] = [];
  imageInfos?: Observable<any>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private countryService: CountryService,
    private formBuilder: FormBuilder,
    private uploadService: UploadService,
    private dialogRef: MatDialogRef<AddCountryComponent>
  ) { }

  ngOnInit(): void {

    this.addCountryForm = this.formBuilder.group({
      country_id: [''],
      country_name: ['', Validators.required],
      country_description: ['', Validators.required],
    });

    if (this.editData) {

      this.headerText = this.editData.header_text,
        this.buttonText = "Update"
      this.addCountryForm.controls['country_name'].setValue(this.editData.universityDetails.name);
      this.addCountryForm.controls['country_id'].setValue(this.editData.universityDetails.id);
      this.addCountryForm.controls['country_description'].setValue(this.editData.universityDetails.description);
    }
  }

  onSubmit() {
    if (this.addCountryForm.valid) {
      if (!this.editData) {
        this.addCountry();
      }
      else {
        this.updateCountry();
      }
    }
  }

  selectFiles(event: any): void {
    debugger;
    this.message = [];
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      // this.uploadService.upload(file).subscribe(
      //   (event: any) => {
      //     if (event.type === HttpEventType.UploadProgress) {
      //       this.progressInfos[idx].value = Math.round(
      //         (100 * event.loaded) / event.total
      //       );
      //     } else if (event instanceof HttpResponse) {
      //       const msg = 'Uploaded the file successfully: ' + file.name;
      //       this.messages.push(msg);
      //       this.imageInfos = this.uploadService.getFiles();
      //     }
      //   },
      //   (err: any) => {
      //     this.progressInfos[idx].value = 0;
      //     const msg = 'Could not upload the file: ' + file.name;
      //     this.messages.push(msg);
      //   }
      // );
    }
  }

  addCountry() {
    debugger;
    // if (this.selectedFiles && this.selectedFiles[0]) {
    //   const numberOfFiles = this.selectedFiles.length;
    //   for (let i = 0; i < numberOfFiles; i++) {

    //     this.selectedFileNames.push(this.selectedFiles[i].name);
    //   }
    // }

    var image_path = "http://34.240.167.201/ApanelWeb/api/ProfileManagment/download?fileName=" + this.selectedFileNames + "&fileType=4";


    var formData = {
      countryName: this.addCountryForm.value.country_name,
      countryDescription: this.addCountryForm.value.country_description,
      countryImage: image_path
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
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: 'Error message : ' + resp.message
        })
      }
    });
  }


  updateCountry() {
    var formData = {
      countryID: this.addCountryForm.value.country_id + 0,
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
