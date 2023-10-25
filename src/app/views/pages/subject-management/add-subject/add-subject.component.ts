import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CountryService } from 'src/app/_services/countryService/country.service';
import { CourseService } from 'src/app/_services/courseService/course.service';
import { subjectService } from 'src/app/_services/subjectService/subject.service';
import { UniversityService } from 'src/app/_services/univeristyService/university.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})

export class AddSubjectComponent implements OnInit {
  public headerText:any ="Add Course";
  public buttonText:any = "Add"
  selected_country = 'none';
  selected_course = 'none';
  selected_subject = 'none';
  lovType: string = "1";
  university_name:any;
  university_description:any;
  selected_university_id:number =0;
  selected_country_id:number =0;
  selected_course_id:number =0;
  universityListModel: any[] = [
  ];
  countryListModel: any[] = [
  ];
  courseListModel: any[] = [
  ];
  addSubjectForm!:FormGroup
  displayedColumns:string[]=['']
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private subjectService: subjectService,
    private courseService: CourseService,
    private universityService: UniversityService,
    private countryService: CountryService,
    private formBuilder: FormBuilder,
    private dialogRef:MatDialogRef<AddSubjectComponent>
    ) { }

  ngOnInit(): void {
    this.addSubjectForm = this.formBuilder.group({
      course_Id:['', Validators.required],
      subject_id:[''],
      subject_name:['', Validators.required],
      subject_description:['', Validators.required],
    });

  if(this.editData)
   {
    this.headerText = this.editData.header_text,
    this.buttonText = "Update"
    this.addSubjectForm.controls['course_Id'].setValue(this.editData.universityID.id);
    this.addSubjectForm.controls['subject_name'].setValue(this.editData.courseDetails.name);
    this.addSubjectForm.controls['subject_id'].setValue(this.editData.courseDetails.id);
    this.addSubjectForm.controls['subject_description'].setValue(this.editData.courseDetails.description);
    this.getUniversities(this.lovType);
   }
  
   this.getCountries(1);
  }

  onSubmit(){
    if(this.addSubjectForm.valid){
      if(!this.editData)
      {
        this.addsubject();
      }
      else{
        this.updateSubject();
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


  addsubject(){
    var formData={
      courseID: this.addSubjectForm.value.course_Id + 0,
      subjectName:  this.addSubjectForm.value.subject_name,
      subjectDescription: this.addSubjectForm.value.subject_description
    }
    this.subjectService.addsubjects(formData).subscribe((resp) => {
      if (resp.isSuccessful) {
        this.universityListModel = resp.data;
        Swal.fire(
          'Great!',
          resp.message,
          'success'
        )
        this.addSubjectForm.reset();
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

  updateSubject(){
    var formData={
      courseID: this.addSubjectForm.value.course_Id + 0,
      subjectID: this.addSubjectForm.value.subject_id + 0,
      subjectName:  this.addSubjectForm.value.subject_name,
      subjectDescription: this.addSubjectForm.value.subject_description
    }
    this.subjectService.updatesubjects(formData)
    .subscribe({
      next:(resp) => {
      if (resp.isSuccessful) {
        this.universityListModel = resp.data;
        Swal.fire(
          'Great!',
          resp.message,
          'success'
        )
        this.addSubjectForm.reset();
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

  getCourses(courseId:any){
    this.courseService.getCourses(courseId).subscribe((resp) => {
      if (resp.isSuccessful) {
        this.courseListModel = resp.data;
      }
      else{
      }
    });
  }

  changeClientcountry(data:any){
    this.selected_country_id =data
    this.getUniversities(this.selected_country_id);
  }
  changeClientUniversity(data:any){
    this.selected_university_id = data;
    this.getCourses(this.selected_university_id);
  }
  changeClientcourse(data:any){
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
