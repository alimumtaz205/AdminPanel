
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppUsersResponse } from 'src/app/_models/DTO/Response/AppUsersResponse';
import { appUserService } from 'src/app/_services/app-users/app-user.service';

@Component({
  selector: 'app-app-users',
  templateUrl: './app-users.component.html',
  styleUrls: ['./app-users.component.css']
})
export class AppUsersComponent implements OnInit {
  dataSource: any;
  selected: number = 1;
  displayedColumns: string[] =
    ['userId',
    'userName',
    'userCode',
    'emailAddress',
    'mobileNo',
    'isactive'
  ];

  clickedRows = new Set<AppUsersResponse>();
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | undefined;

    //@ViewChild(MatSort)sort!: MatSort;
    //@ViewChild('paginator') paginator!: MatPaginator;
    selection: any;
    //clickedRows: any;

  constructor(
    private service: appUserService,
    public dialogRef: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.service.GetAppUsers()
      .subscribe({
        next: (resp) => {
          if (resp.isSuccessful) {
            debugger;
            this.dataSource = new MatTableDataSource(resp.data);
            this.dataSource.sort = this.sort;
           this.dataSource.paginator = this.paginator;
          }
          else {
            debugger;
          }
          console.error();

        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
