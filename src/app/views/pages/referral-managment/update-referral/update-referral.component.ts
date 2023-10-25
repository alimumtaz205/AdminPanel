import { Component, Inject, OnInit } from '@angular/core';
import { ReferralResponse } from 'src/app/_models/DTO/Response/ReferralResponse';
import { MatPaginator } from '@angular/material/paginator';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { referralService } from 'src/app/_services/referral/referral.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-referral',
  templateUrl: './update-referral.component.html',
  styleUrls: ['./update-referral.component.css']
})
export class UpdateReferralComponent implements OnInit {
    public headerText:any ="Update Referral";
    public buttonText:any = "Update"
    hasFormErrors = false;
    updateReferralForm!:FormGroup
    displayedColumns:string[]=['']
    constructor(
      @Inject(MAT_DIALOG_DATA) public editData:any,
      private referralService: referralService,
      private formBuilder: FormBuilder,
      private dialogRef:MatDialogRef<UpdateReferralComponent>
      ) { }
  
  
   
      ngOnInit(): void {
  
        this.updateReferralForm = this.formBuilder.group({
          id:[''],
          name:[''],
          email:[''],
          referralName:[''],
          status:[''],
        });
    
      if(this.editData)
       {
        debugger;
        this.headerText = this.editData.header_text,
        this.buttonText = "Update"
        this.updateReferralForm.controls['name'].setValue(this.editData.ReferralDetails.name);
        this.updateReferralForm.controls['email'].setValue(this.editData.ReferralDetails.email);
        this.updateReferralForm.controls['id'].setValue(this.editData.ReferralDetails.id);
        this.updateReferralForm.controls['referralName'].setValue(this.editData.ReferralDetails.referredBy);
       }
      }
    
  
      onSubmit(){

        if(this.updateReferralForm.valid){
            this.updatereferral();
        }
      }

  
      updatereferral(){
        debugger;
        var formData={
          ReferraiID:  this.updateReferralForm.value.id,
          Status:  2,
          UserId: 1,
          UpdatedBy:'Ali'
        }
        this.referralService.updateReferral(formData)
        .subscribe({
          next:(resp) => {
          if (resp.isSuccessful) {
            //this.countryListModel = resp.data;
            Swal.fire(
              'Great!',
              resp.message,
              'success'
            )
            this.updateReferralForm.reset();
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