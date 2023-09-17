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
import { Profile } from 'src/app/_models/Profile';
import { UtilsService } from 'src/app/_services/_global/utils.service';
import { finalize } from 'rxjs';

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
    public dialogRef: MatDialog,
    private layoutUtilsService: UtilsService,
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

  // addProfile() {
  //   this.dialogRef.open(AddProfileComponent, {
  //     width: '60%',
  //     height: '80%'
  //   }).afterClosed().subscribe(val => {
  //     if (val === 'add') {
  //       this.getProfile();
  //     }
  //   })
  // }

  addProfile() {
    const newProfile = new Profile();
    //newRole.clear(); // Set all defaults fields
    this.editProfile(newProfile);
  }

  editProfile(profile: Profile) {
    debugger
    var width = (window.innerWidth - 150) + 'px';
    var height = (window.innerHeight - 140) + 'px';
    console.info(width);
    console.info(height);
    const dialogRef = this.dialogRef.open(AddProfileComponent, { height: height, width: width, data: { profile: profile }, disableClose: true });
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        debugger;
        return;
      }

      this.getProfile();
    });
  }


  deleteProfile(_item: Profile) {
    const _title = 'Profile';
    const _description = 'Are you sure to permanently delete this profile?';
    const _waitDesciption = 'Profile is deleting...';

    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }

      this.service.deleteProfile(_item.profileID).pipe(
        finalize(() => {

        })
      ).subscribe((baseResponse) => {
        if (baseResponse.isSuccessful) {
          this.layoutUtilsService.alertElement("", baseResponse.message);
          this.getProfile();
        }
        else
          this.layoutUtilsService.alertElement("", baseResponse.message);

        //this.auditService.create(PagesEnum.profilesUrl, '/UserManagement/DeleteProfile', AE.Delete, baseResponse.isSuccess);
      });

    });
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
