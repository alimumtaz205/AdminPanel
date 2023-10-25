import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CountryService } from 'src/app/_services/countryService/country.service';
import { CourseService } from 'src/app/_services/courseService/course.service';
import { UniversityService } from 'src/app/_services/univeristyService/university.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  public headerText:any ="Add Course";
  public buttonText:any = "Add"
  selected_country = 'none';
  selected_course = 'none';
  selected_subject = 'none';
  lovType: string = "1";
  university_name:any;
  university_description:any;
  selected_university_id:any
  universityListModel: any[] = [
  ];
  countryListModel: any[] = [
  ];
  addCourseForm!:FormGroup
  displayedColumns:string[]=['']
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private courseService: CourseService,
    private universityService: UniversityService,
    private countryService: CountryService,
    private formBuilder: FormBuilder,
    private dialogRef:MatDialogRef<AddCourseComponent>
    ) { }

  ngOnInit(): void {
    this.addCourseForm = this.formBuilder.group({
      university_Id:['', Validators.required],
      course_id:[''],
      course_name:['', Validators.required],
      course_description:['', Validators.required],
    });

  if(this.editData)
   {
    this.headerText = this.editData.header_text,
    this.buttonText = "Update"
    this.addCourseForm.controls['university_Id'].setValue(this.editData.universityID.id);
    this.addCourseForm.controls['course_name'].setValue(this.editData.courseDetails.name);
    this.addCourseForm.controls['course_id'].setValue(this.editData.courseDetails.id);
    this.addCourseForm.controls['course_description'].setValue(this.editData.courseDetails.description);
    this.getUniversities(this.lovType);
   }
  
   this.getCountries(1);
  }

  onSubmit(){
    if(this.addCourseForm.valid){
      if(!this.editData)
      {
        this.addCourse();
      }
      else{
        this.updateCourse();
      }
    }
  }

  getUniversities(lovType:any){
    this.universityService.getUniversities(lovType).subscribe((resp) => {
      if (resp.isSuccessful) {
        this.universityListModel = resp.data;
      }
      else{
      }
    });
  }

  getCountries(lovType:any){
    this.countryService.getCountries(lovType).subscribe((resp) => {
      if (resp.isSuccessful) {
        this.countryListModel = resp.data;
      }
      else{
      }
    });
  }


  addCourse(){
    var formData={
      universityID: this.addCourseForm.value.university_Id + 0,
      courseName:  this.addCourseForm.value.course_name,
      courseDescription: this.addCourseForm.value.course_description
    }

    this.courseService.addCounse(formData).subscribe((resp) => {
      if (resp.isSuccessful) {
        this.universityListModel = resp.data;
        Swal.fire(
          'Great!',
          resp.message,
          'success'
        )
        this.addCourseForm.reset();
        this.dialogRef.close('add');
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: 'Error message' + resp.message
        })
      }
    });
  }

  updateCourse(){
    var formData={
      universityID: this.addCourseForm.value.university_Id + 0,
      courseID: this.addCourseForm.value.course_id + 0,
      courseName:  this.addCourseForm.value.course_name,
      courseDescription: this.addCourseForm.value.course_description
    }
    this.courseService.updateCourse(formData)
    .subscribe({
      next:(resp) => {
      if (resp.isSuccessful) {
        this.universityListModel = resp.data;
        Swal.fire(
          'Great!',
          resp.message,
          'success'
        )
        this.addCourseForm.reset();
        this.dialogRef.close('update');
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: 'Error message' + ':' + resp.message
        })
      }
    }
    });
  }

  changeClientcountry(data:any){
    //this.selected_country_id = data.id;
    //this.getUniversities(data.id);
    this.selected_university_id = data;
    this.getUniversities(this.selected_university_id);
  }
  changeClientUniversity(data:any){
    //this.selected_country_id = data.id;
    //this.getUniversities(data.id);
  }

  closeModel(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You want to close this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        // swalWithBootstrapButtons.fire(
        //   'Cancelled',
        //   'error'
        // )
      }
    })
  }
}
