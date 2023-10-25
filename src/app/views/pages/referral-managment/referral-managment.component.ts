import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReferralResponse } from 'src/app/_models/DTO/Response/ReferralResponse';
import { referralService } from 'src/app/_services/referral/referral.service';
import { UpdateReferralComponent } from './update-referral/update-referral.component';

@Component({
  selector: 'app-referral-managment',
  templateUrl: './referral-managment.component.html',
  styleUrls: ['./referral-managment.component.css']
})
export class ReferralManagmentComponent implements OnInit {
  dataSource:any;
  posts: any[] | undefined;
  

  displayedColumns: string[] = [
    'Id',
    'Student Name',
     'Email',
     'Mobile No',
     'Referred Id',
     'Referred By',
     'Referred Date',
     'Status',
     'Action'
  
  ];
  clickedRows = new Set<ReferralResponse>();
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    private service:referralService,
    public dialogRef:MatDialog) { }

    ngOnInit(): void {
      this.getreferrals();
      }

      getreferrals(){
        this.service.getreferrals().subscribe((resp) => {
          if (resp.isSuccessful) {
            this.dataSource = new MatTableDataSource(resp.data);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }
          else{
           
            //this.dataSource = new MatTableDataSource(resp.data as any);
            //this.dataSource.paginator = this.paginator;
          }
        });
        
      }

      updateDialog(element:any){
        this.dialogRef.open(UpdateReferralComponent, {
          width: '40%',
          data : {
            header_text : 'Update Referral',
            ReferralDetails: element
          }
        }).afterClosed().subscribe(val=>{
          if(val==='update'){
            this.getreferrals();
          }
        })
      }

}
