import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BranchesService } from 'src/app/_services/branchService/branches.service';
import { CountryService } from 'src/app/_services/countryService/country.service';
import { InqueryService } from 'src/app/_services/inquery.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-inquery',
  templateUrl: './edit-inquery.component.html',
  styleUrls: ['./edit-inquery.component.css']
})
export class EditInqueryComponent implements OnInit {
    inqueryForm: FormGroup;
    branchesList: any[] = [];
    citiesList: any[] = [];
    userId:any;
    selectedCity: string = "";
    constructor(public dialogRef: MatDialogRef<EditInqueryComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private formBuilder: FormBuilder,
      private inqueryService: InqueryService,
      private countryService: CountryService,
      private branchService: BranchesService) { }
  
    ngOnInit(): void { 
      debugger;
      this.data
      this.userId = localStorage.getItem("loginUserId");
     // this.userId = "6";
      this.getCities();
      this.inqueryForm = this.formBuilder.group({
        inquiryID: [''],
        studentName: [''],
        inqueryName: [''],
        countryID: [''],
        city:[''],
        branch:[''],
        status:['']
      });
      this.inqueryForm.controls['inquiryID'].setValue(this.data.inquery.inquiryID);
      this.inqueryForm.controls['studentName'].setValue(this.data.inquery.studentName);
      this.inqueryForm.controls['countryID'].setValue(this.data.inquery.countryID);
    }
    hasError(controlName: string, errorName: string): boolean {
      return this.inqueryForm.controls[controlName].hasError(errorName);
    }
  
    getCities(){
      var LovType=2;
      this.countryService.getCountries(LovType).subscribe(
        response => {
          debugger;
          this.citiesList = response.data;
        });
    }
  
    getBranches(cityID:any){
      debugger;
      this.branchService.getBranches(cityID).subscribe(
        (        response: { data: any[]; }) => {
          debugger;
          this.branchesList = response.data;
        });
    }
  
    onSelectionChange(selectedCity:any){
      debugger;
      this.getBranches(selectedCity);
    }
  
    close(result: any): void {
      this.dialogRef.close(result);
    }
  
    onSubmit(){
      debugger;
      var form_Value = this.inqueryForm.value;
      var userId = localStorage.getItem("loginUserId");
      var branchId = this.inqueryForm.value.branch;
      if(userId =="1" || userId =="2" || userId =="3")
      {
        branchId=="0"
      }
      var ReqData = {
        inquiryID:this.inqueryForm.value.inquiryID,
        status:this.inqueryForm.value.status,
        branchId: branchId,
        userId: userId,
        updatedBy:userId
      }
      this.inqueryService.updateInquery(ReqData).subscribe(
        response => {
          debugger;
          if (response.isSuccessful === true) {
            Swal.fire(
              'Great!',
              'Inquery Updated Seccessfully',
              'success'
            )
            this.dialogRef.close('add');
            //this.close();
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: 'Error message' + response.message
            })
          }
  
  
          this.branchesList = response.data;
        });;
    }
  
  }
