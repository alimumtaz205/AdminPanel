import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CountryResponse } from 'src/app/_models/DTO/Response/CountryResponse';
import Swal from 'sweetalert2';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { subjectService } from 'src/app/_services/subjectService/subject.service';
import { UniversityService } from 'src/app/_services/univeristyService/university.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseService } from 'src/app/_services/courseService/course.service';
import { CountryService } from 'src/app/_services/countryService/country.service';

@Component({
  selector: 'app-course-management',
  templateUrl: './subject-management.component.html',
  styleUrls: ['./subject-management.component.css']
})

export class SubjectManagementComponent implements OnInit {

  message: string = "Are you sure?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  dataSource:any;
  lovType: string = "1";
  selected = 'none';
  selected_model = 'none';
  selected_university_id:number = 0;
  selected_country_id:number = 0;
  selected_course_id:number = 0;
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
  coursesList: any[] = [
  ];
  countryList: any[] = [
  ];
 

  constructor(
    private subjectService: subjectService,
    private courseService: CourseService,
    private universityService: UniversityService,
    private countryService: CountryService,
    public dialogRef:MatDialog
     ) { 
  }

  ngOnInit(): void {
    this.getcountries(this.lovType);
    //this.getCourses(this.lovType);
  }

  
  getCourses(courseId:any){
   // courseId = 1;
    this.courseService.getCourses(courseId).subscribe((resp) => {
      if (resp.isSuccessful) {
        this.universityList = resp.data;
      }
      else{
      }
    });
  }

  getsubjects(ID:any){

    this.subjectService.getsubjects(this.selected_university_id)
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

  changeClient(data:any){
 
    this.selected_course_id = data.id;
    //this.getUniversities(data.id);
  }

  changeClientCountry(data:any){
 
    this.selected_country_id = data.id;
    this.getUniversities(this.selected_country_id);
  }
  changeClientUniversity(data:any){
 
    this.selected_university_id = data.id;
    //this.getUniversities(this.selected_university_id);
    this.getCourses(this.selected_university_id);
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

  openDialog(){
    this.dialogRef.open(AddSubjectComponent, {
      width: '40%',
      panelClass: 'custom-modalbox'
    }).afterClosed().subscribe(val=>{
      if(val==='add'){
        this.getsubjects(this.selected);
      }
    })
  }

  updateDialog(element:any){
    this.dialogRef.open(AddSubjectComponent, {
      width: '40%',
      data : {
        header_text : 'Update subject',
        universityID: this.selected,
        courseDetails: element
      }
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getsubjects(this.selected);
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
        this.subjectService.deletesubjects(element.id)
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

