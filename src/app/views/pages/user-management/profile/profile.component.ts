import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivityResponse } from 'src/app/_models/DTO/Response/Activity/ActivityResponse';
import { ActivityService } from 'src/app/_services/activityService/activity.service';
import Swal from 'sweetalert2';
import { AddProfileComponent } from './add-profile/add-profile.component';
import { ProfileService } from 'src/app/_services/profileService/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  dataSource: any;
  selected: number = 1;
  displayedColumns: string[] =
    ['profileID', 'profileName', 'profileDescription', 'isActive', 'created', 'createdBy', 'checked', 'Action'];



  clickedRows = new Set<ActivityResponse>();
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;
  selection: any;

  constructor(
    private service: ProfileService,
    public dialogRef: MatDialog
  ) { }

  ngOnInit(): void {
    this.getProfile()
  }


  getProfile() {
    this.service.GetProfiles()
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

  addProfile() {
    this.dialogRef.open(AddProfileComponent, {
      width: '60%',
      height: '80%'
    }).afterClosed().subscribe(val => {
      if (val === 'add') {
        this.getProfile();
      }
    })
  }


  updateActivity(element: any) {
    debugger;
    this.dialogRef.open(AddProfileComponent, {
      width: '40%',
      data: {
        header_text: 'Update Activity',
        activityID: this.selected,
        activityDetails: element
      }
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getProfile();
      }
    })
  }

  openDeleteDialog() {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
