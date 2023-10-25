import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InqueryService } from 'src/app/_services/inquery.service';

@Component({
  selector: 'app-view-inquery',
  templateUrl: './view-inquery.component.html',
  styleUrls: ['./view-inquery.component.css']
})
export class ViewInqueryComponent implements OnInit {
  dataSourceProfile:any;
  dataSourceAcademic:any;
  dataSourceWork:any;


  displayedColumnsProfile: string[] = [
    'Name',
    'Email',
    'Mobile No',
    'Date of Birth',
    'Country of Birth',
    'Gender', 
    'Nationality'
  ];

  displayedColumnsAcademics: string[] = [
    'Institution',
    'Course',
    'Level Of Study',
    'Start Date',
    'End Date',
    'Percentage',
    'Obtained GPA', 
    'Total GPA'
  ];

  displayedColumnsWork: string[] = [
    'Job Title',
    'Organization Name',
    'Organization Address',
    'To Date',
    'From Date',
    'Currently Work',
    'Work Experience'
  ];

  clickedRows = new Set<any>();

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(public dialogRef: MatDialogRef<ViewInqueryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private inqueryService: InqueryService
  ) { }

  ngOnInit(): void {
    debugger;
    var email = this.data.inquery.email;
    this.getProfileApp(email);
    this.getAcademicApp(email);
    this.getWorkDetailsApp(email);
  }
 
  getProfileApp(reqEmail:any){
    debugger
    var request={
      email: reqEmail
    }
    this.inqueryService.GetProfileApp(request)
    .subscribe((resp) => {
      debugger;
      if (resp.isSuccessful) {
        this.dataSourceProfile = new MatTableDataSource(resp.data);
        this.dataSourceProfile.sort = this.sort;
        this.dataSourceProfile.paginator = this.paginator;
      }
      else{
        debugger;
        //this.dataSource = new MatTableDataSource(resp.data as any);
        //this.dataSource.paginator = this.paginator;
      }
    });
  }

  getAcademicApp(reqEmail:any){
    debugger
    var request={
      email: reqEmail
    }
    this.inqueryService.GetAcademicApp(request)
    .subscribe((resp) => {
      debugger;
      if (resp.isSuccessful) {
        this.dataSourceAcademic = new MatTableDataSource(resp.data);
        this.dataSourceAcademic.sort = this.sort;
        this.dataSourceAcademic.paginator = this.paginator;
      }
      else{
        debugger;
        //this.dataSource = new MatTableDataSource(resp.data as any);
        //this.dataSource.paginator = this.paginator;
      }
    });
  }

  getWorkDetailsApp(reqEmail:any){
    debugger
    var request={
      email: reqEmail
    }
    this.inqueryService.GetWorkApp(request)
    .subscribe((resp) => {
      debugger;
      if (resp.isSuccessful) {
        this.dataSourceWork = new MatTableDataSource(resp.data);
        this.dataSourceWork.sort = this.sort;
        this.dataSourceWork.paginator = this.paginator;
      }
      else{
        debugger;
        //this.dataSource = new MatTableDataSource(resp.data as any);
        //this.dataSource.paginator = this.paginator;
      }
    });
  }

}

