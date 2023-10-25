import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InqueryResponse } from 'src/app/_models/DTO/Response/InqueryResponse';
import { InqueryService } from 'src/app/_services/inquery.service';
import { ViewInqueryComponent } from './view-inquery/view-inquery.component';
import { EditInqueryComponent } from './edit-inquery/edit-inquery.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-inquiry-managemnt',
  templateUrl: './inquiry-managemnt.component.html',
  styleUrls: ['./inquiry-managemnt.component.css']
})
export class InquiryManagemntComponent implements OnInit {
  dataSource:any;
  userId:any;
  posts: any[] | undefined;
  
  displayedColumns: string[] = [
    'Inquiry Id',
    'Student Name',
    'Country',
    'University',
    'Course Level', 
    'Subject',
    'Action'
  ];
  clickedRows = new Set<InqueryResponse>();

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    private service:InqueryService,
    public dialogRef: MatDialog) { }

  ngOnInit(): void {
    debugger;
    this.userId = localStorage.getItem("loginUserId");
     this.userId="6"
     //const token = localStorage.getItem("token");
      this.service.getPosts(this.userId).subscribe((resp) => {
        debugger;
        if (resp.isSuccessful) {
          this.dataSource = new MatTableDataSource(resp.data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
        else{
          debugger;
          //this.dataSource = new MatTableDataSource(resp.data as any);
          //this.dataSource.paginator = this.paginator;
        }
      });
    }

    editInquery(inquery:any) {
      debugger;
        const dialogRef = this.dialogRef.open(EditInqueryComponent, {
          data: { inquery: inquery },
          disableClose: true,
        });
        dialogRef.afterClosed().subscribe((res) => {
          if (!res) {
            return;
          }
        });
      }

      viewInquery(inquery:any) {
        debugger;
        
          const dialogRef = this.dialogRef.open(ViewInqueryComponent, {
            data: { inquery: inquery },
            disableClose: true,
          });
          dialogRef.afterClosed().subscribe((res) => {
            if (!res) {
              return;
            }
          });
        }
}