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
import { UtilsService } from 'src/app/_services/_global/utils.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  dataSource: any;
  selected: number = 1;
  displayedColumns: string[] =
    ['activityID', 'activityName', 'parentActivityName', 'parentActivityID', 'activityURL', 'c', 'r', 'u', 'd', 'Action'];

  clickedRows = new Set<ActivityResponse>();
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;
  selection: any;

  constructor(
    private activityService: ActivityService,
    private layoutUtilsService: UtilsService,
    public dialogRef: MatDialog
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

  addActivity() {
    this.dialogRef.open(AddActivityComponent, {
      width: '40%',
    }).afterClosed().subscribe(val => {
      if (val === 'add') {
        debugger
        this.getActivities(this.selected);
      }
    })
  }


  updateActivity(element: any) {
    debugger;
    this.dialogRef.open(AddActivityComponent, {
      width: '40%',
      data: {
        header_text: 'Update Activity',
        activityID: this.selected,
        activityDetails: element
      }
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getActivities(this.selected);
      }
    })
  }

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
