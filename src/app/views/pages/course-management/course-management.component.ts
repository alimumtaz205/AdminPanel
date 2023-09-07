import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CountryResponse } from 'src/app/_models/DTO/Response/CountryResponse';
import { CountryService } from 'src/app/_services/countryService/country.service';
import { AddUniversityComponent } from '../university-management/dialog/add-university.component';
import Swal from 'sweetalert2';
import { AddCourseComponent } from './add-course/add-course.component';
import { CourseService } from 'src/app/_services/courseService/course.service';
import { UniversityService } from 'src/app/_services/univeristyService/university.service';

@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css']
})
export class CourseManagementComponent implements OnInit {

  message: string = "Are you sure?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  dataSource:any;
  lovType: string = "1";
  selected = 'none';
  selected_model = 'none';
  selected_university_id:any
  displayedColumns: string[] = [
    'ID',
    'Course Name',
    'Description',
    'Image',
    'Action'
  
  ];

  clickedRows = new Set<CountryResponse>();

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | undefined;

  universityList: any[] = [
  ];
 

  constructor(
    private courseService: CourseService,
    private universityService: UniversityService,
    public dialogRef:MatDialog
     ) { 
  }

  ngOnInit(): void {
    this.getUniversities(this.lovType);
  }


  getUniversities(countryId:any){
    debugger;
    countryId = 1;
    this.universityService.getUniversities(countryId).subscribe((resp) => {
      if (resp.isSuccessful) {
        this.universityList = resp.data;
      }
      else{
        debugger;
      }
    });
  }

  getCourses(ID:any){
    debugger;
    var formData={
      universityID : this.selected_university_id +""
    }

    this.courseService.getCourses(formData)
    .subscribe({
      next:(resp) => {
        if (resp.isSuccessful) {
          debugger;
          this.dataSource = new MatTableDataSource(resp.data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
        else{
          debugger;
        }
        console.error();
        
      }
    });   
  }

  changeClient(data:any){
 
    this.selected_university_id = data.id;
    //this.getUniversities(data.id);
  }

  openDialog(){
    this.dialogRef.open(AddCourseComponent, {
      width: '40%',
      panelClass: 'custom-modalbox'
    }).afterClosed().subscribe(val=>{
      if(val==='add'){
        this.getCourses(this.selected);
      }
    })
  }

  updateDialog(element:any){
    debugger;
    this.dialogRef.open(AddCourseComponent, {
      width: '40%',
      data : {
        header_text : 'Update Course',
        universityID: this.selected,
        courseDetails: element
      }
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getCourses(this.selected);
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
    // const dialogRef = this.dialogRef.open(AlertDialogDeleteComponent,{
    //   width: '15%',
    // });
  }

  closeModel(){
    debugger;
    this.dialogRef.closeAll();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

