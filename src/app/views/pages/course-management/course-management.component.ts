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
  countryList: any[] = [
  ];
 

  constructor(
    private courseService: CourseService,
    private universityService: UniversityService,
    private countryService: CountryService,
    public dialogRef:MatDialog
     ) { 
  }

  ngOnInit(): void {
    this.getcountries(this.lovType);
    //this.getUniversities(this.lovType);
  }


  getUniversities(universitryId:any){
    this.universityService.getUniversities(universitryId).subscribe((resp) => {
      if (resp.isSuccessful) {
        this.universityList = resp.data;
      }
      else{
      }
    });
  }
  getcountries(countryId:any){
    countryId = 1;
    this.countryService.getCountries(countryId).subscribe((resp) => {
      if (resp.isSuccessful) {
        this.countryList = resp.data;
      }
      else{
      }
    });
  }

  getCourses(ID:any){

    this.courseService.getCourses(this.selected_university_id)
    .subscribe({
      next:(resp) => {
        if (resp.isSuccessful) {
          this.dataSource = new MatTableDataSource(resp.data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
        else{
        }
        console.error();
        
      }
    });   
  }

  changeClientCountry(data:any){
 
    this.selected_university_id = data.id;
    this.getUniversities(this.selected_university_id);
  }
  changeClientUniversity(data:any){
 
    //this.selected_university_id = data.id;
    //this.getUniversities(this.selected_university_id);
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

  openDeleteDialog(element:any) {
  
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
        this.courseService.deleteCourses(element.id)
        .subscribe({
          next:(resp) => {
          if (resp.isSuccessful) {
            Swal.fire(
              'Great!',
              resp.message,
              'success'
            )
          }
          else{
          
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: 'Error message : ' + ':' + resp.message
            })
          }
        }
        });
    }
  })
    // const dialogRef = this.dialogRef.open(AlertDialogDeleteComponent,{
    //   width: '15%',
    // });
  }

  closeModel(){
    this.dialogRef.closeAll();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

