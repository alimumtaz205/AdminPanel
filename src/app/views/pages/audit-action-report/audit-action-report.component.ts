import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CountryResponse } from 'src/app/_models/DTO/Response/CountryResponse';
import { CountryService } from 'src/app/_services/countryService/country.service';
import { UniversityService } from 'src/app/_services/univeristyService/university.service';
import Swal from 'sweetalert2';
import { AddUniversityComponent } from '../university-management/dialog/add-university.component';
import { AuditActionReportResponse } from 'src/app/_models/DTO/Response/AuditActionReportResponse';
import { AuditActionReportService } from 'src/app/_services/audit-action-reportService/audit-action-reportservice';

@Component({
  selector: 'app-audit-action-report',
  templateUrl: './audit-action-report.component.html',
  styleUrls: ['./audit-action-report.component.css']
})
export class AuditActionReportComponent implements OnInit {
  message: string = "Are you sure?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  dataSource:any;
  lovType: Number = 4; //for user types
  selected = 'none';
  selected_model = 'none';
  selected_user_id:any
  displayedColumns: string[] = [
    'userId',
    'activityName',
    'activityUrl',
    'sessionId',
    'created'
  
  ];

  clickedRows = new Set<AuditActionReportResponse>();

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | undefined;

  userList: any[] = [
  ];
 

  constructor(
    private countryService: CountryService,
    private auditActionReportService: AuditActionReportService,
    public dialogRef:MatDialog
     ) { 
  }

  ngOnInit(): void {
    this.getUsers(this.lovType);
  }

  getUsers(lovType:any){
    this.countryService.getCountries(lovType).subscribe((resp) => {
      if (resp.isSuccessful) {
        this.userList = resp.data;
      }
      else{
      }
    });
  }

  getReport(countryId:any){
    this.auditActionReportService.GetReport(this.selected_user_id).subscribe((resp) => {
      if (resp.isSuccessful) {
        this.dataSource = new MatTableDataSource(resp.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
      else{
      }
    });
  }

  changeClient(data:any){
 
    this.selected_user_id = data.id;
  }
  changeClient1(data:any){
  
    //this.selected_country_id = data.id;
    //this.getUniversities(data.id);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
