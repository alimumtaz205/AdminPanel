import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivityResponse } from 'src/app/_models/DTO/Response/Activity/ActivityResponse';
import { ActivityService } from 'src/app/_services/activityService/activity.service';
import Swal from 'sweetalert2';
import { ProfileService } from 'src/app/_services/profileService/profile.service';
import { Profile } from 'src/app/_models/Profile';
import { UtilsService } from 'src/app/_services/_global/utils.service';
import { finalize } from 'rxjs';
import { Users } from 'src/app/_models/Users';
import { UserService } from 'src/app/_services/userService/user.service';
import { AddUserComponent } from './add-user/add-user.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  dataSource: any;
  selected: number = 1;
  displayedColumns: string[] =
    ['userId', 'userName', 'profileID', 'emailAddress', 'mobileNo', 'address', 'isactive', 'Action'];



  clickedRows = new Set<ActivityResponse>();
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;
  selection: any;

  constructor(
    private service: UserService,
    public dialogRef: MatDialog,
    private layoutUtilsService: UtilsService,
  ) { }

  ngOnInit(): void {
    this.getUsers()
  }


  getUsers() {
    this.service.GetUsers()
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


  addUser() {
    const newUser = new Users();
    this.editUser(newUser);
  }

  editUser(user: Users) {
    debugger
    var width = (window.innerWidth - 80) + 'px';
    var height = (window.innerHeight - 150) + 'px';
    var header_text = "Update User";
    console.info(width);
    console.info(height);
    const dialogRef = this.dialogRef.open(AddUserComponent, { height: height, width: width, data: { user: user, header_text }, disableClose: true });
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        debugger;
        return;
      }

      this.getUsers();
    });
  }

  deleteProfile(_item: Profile) {
    const _title = 'User';
    const _description = 'Are you sure to permanently delete this user?';
    const _waitDesciption = 'User is deleting...';

    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }

      this.service.deleteUser(_item.profileID).pipe(
        finalize(() => {

        })
      ).subscribe((baseResponse) => {
        if (baseResponse.isSuccessful) {
          this.layoutUtilsService.alertElement("", baseResponse.message);
          this.getUsers();
        }
        else
          this.layoutUtilsService.alertElement("", baseResponse.message);

        //this.auditService.create(PagesEnum.profilesUrl, '/UserManagement/DeleteProfile', AE.Delete, baseResponse.isSuccess);
      });

    });
  }

  // updateActivity(element: any) {
  //   debugger;
  //   this.dialogRef.open(AddProfileComponent, {
  //     width: '40%',
  //     data: {
  //       header_text: 'Update Activity',
  //       activityID: this.selected,
  //       activityDetails: element
  //     }
  //   }).afterClosed().subscribe(val => {
  //     if (val === 'update') {
  //       this.getProfile();
  //     }
  //   })
  // }

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
