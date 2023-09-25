import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivityResponse } from 'src/app/_models/DTO/Response/Activity/ActivityResponse';
import { ActivityService } from 'src/app/_services/activityService/activity.service';
import Swal from 'sweetalert2';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { Activity } from 'src/app/_models/Activity';
import { MessageType, UtilsService } from 'src/app/_services/_global/utils.service';
import { finalize } from 'rxjs';
import { AuditTrailService } from 'src/app/_services/audit-trail/audit-trail.service';
import { PagesEnum } from 'src/app/_models/enums/pages.enum';
import { AE } from 'src/app/_models/enums/audit.enum';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  dataSource: any;
  selected: number = 1;
  loading: boolean;
  displayedColumns: string[] =
    ['activityID', 'activityName', 'parentActivityName', 'parentActivityID', 'activityURL', 'c', 'r', 'u', 'd', 'Action'];

  clickedRows = new Set<ActivityResponse>();
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;
  selection: any;

  constructor(
    private activityService: ActivityService,
    public dialogRef: MatDialog,
    private auditService: AuditTrailService,
    private layoutUtilsService: UtilsService,
  ) { }

  ngOnInit(): void {
    var Id = 1;
    this.getActivities(Id)
  }


  getActivities(ID: any) {
    debugger;

    this.activityService.getActivities(ID)
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

  loadActivityList() {
    this.loading = true;

    this.activityService
      .getAllActivities()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((baseResponse) => {
        if (baseResponse.isSuccessful)
          this.dataSource.data = baseResponse.data;
        else
          // this.layoutUtilsService.alertElement(
          //   "",
          //   baseResponse.message,
          //   baseResponse.code
          // );

          this.auditService.create(
            PagesEnum.activitiesUrl,
            "/UserManagement/GetActivities",
            AE.Get,
            baseResponse.isSuccessful
          );
      });
  }

  loadActivitiesPage() {
    this.loadActivityList();
  }

  addActivity1() {
    this.dialogRef.open(AddActivityComponent, {
      width: '40%',
    }).afterClosed().subscribe(val => {
      if (val === 'add') {
        debugger
        this.getActivities(this.selected);
      }
    })
  }

  addActivity() {
    const newActivity = new Activity();
    //newRole.clear(); // Set all defaults fields
    this.editActivity(newActivity);
  }

  editActivity(activity: Activity) {
    const _saveMessage = activity.activityID
      ? "New activity successfully has been added."
      : "Activity successfully has been updated.";
    const _messageType = activity.activityID
      ? MessageType.Update
      : MessageType.Create;
    const dialogRef = this.dialogRef.open(AddActivityComponent, {
      data: { activity: activity },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }

      //this.layoutUtilsService.showActionNotification(_saveMessage, _messageType, 10000, true, true);
      this.loadActivitiesPage();
    });
  }


  updateActivity(activity: Activity) {
    debugger
    var width = (window.innerWidth - 900) + 'px';
    var height = (window.innerHeight - 280) + 'px';
    console.info(width);
    console.info(height);
    const dialogRef = this.dialogRef.open(AddActivityComponent, { height: height, width: width, data: { user: activity }, disableClose: true });
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        debugger;
        return;
      }

      this.getActivities(1);
    });
  }


  // updateActivity(element: any) {
  //   debugger;
  //   this.dialogRef.open(AddActivityComponent, {
  //     width: '40%',
  //     data: {
  //       header_text: 'Update Activity',
  //       activityID: this.selected,
  //       activityDetails: element
  //     }
  //   }).afterClosed().subscribe(val => {
  //     if (val === 'update') {
  //       debugger;
  //       this.getActivities(this.selected);
  //     }
  //   })
  // }

  deleteActivity(_item: Activity) {
    const _title = 'Activity';
    const _description = 'Are you sure to permanently delete this activity?';
    const _waitDesciption = 'Activity is deleting...';

    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }

      this.activityService.deleteActivity(_item.activityID).pipe(
        finalize(() => {

        })
      ).subscribe((baseResponse) => {
        if (baseResponse.isSuccessful) {
          this.layoutUtilsService.alertElement("", baseResponse.message);
          var Id = 1;
          this.getActivities(Id);
        }
        else
          this.layoutUtilsService.alertElement("", baseResponse.message);

        //this.auditService.create(PagesEnum.profilesUrl, '/UserManagement/DeleteProfile', AE.Delete, baseResponse.isSuccess);
      });

    });
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
