import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CountryResponse } from 'src/app/_models/DTO/Response/CountryResponse';
import { CountryService } from 'src/app/_services/countryService/country.service';
import { AddUniversityComponent } from './dialog/add-university.component';
import { AlertDialogDeleteComponent } from '../alert-dialogs/alert-dialog-delete.component';
import Swal from 'sweetalert2';
import { UniversityService } from 'src/app/_services/univeristyService/university.service';

@Component({
  selector: 'university-management',
  templateUrl: './university-management.component.html',
  styleUrls: ['./university-management.component.css']
  
})
export class UniversityManagementComponent implements OnInit {
  message: string = "Are you sure?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  dataSource:any;
  lovType: Number = 1;
  selected = 'none';
  selected_model = 'none';
  selected_country_id:any
  displayedColumns: string[] = [
    'ID',
    'University Name',
    'Description',
    'Image',
    'Action'
  
  ];

  clickedRows = new Set<CountryResponse>();

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | undefined;

  countryList: any[] = [
  ];
 

  constructor(
    private countryService: CountryService,
    private universityService: UniversityService,
    public dialogRef:MatDialog
     ) { 
  }

  ngOnInit(): void {
    this.getCountries(this.lovType);
  }

  getCountries(lovType:any){
    this.countryService.getCountries(lovType).subscribe((resp) => {
      if (resp.isSuccessful) {
        this.countryList = resp.data;
      }
      else{
      }
    });
  }

  getUniversities(countryId:any){
    this.universityService.getUniversities(this.selected_country_id).subscribe((resp) => {
      if (resp.isSuccessful) {
        this.dataSource = new MatTableDataSource(resp.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
      else{
      }
    });
  }

  changeClient(data:any){
 
    this.selected_country_id = data.id;
    //this.getUniversities(data.id);
  }
  changeClient1(data:any){
  
    //this.selected_country_id = data.id;
    //this.getUniversities(data.id);
  }

  openDialog(){
    this.dialogRef.open(AddUniversityComponent, {
      width: '40%',
      panelClass: 'custom-modalbox'
    }).afterClosed().subscribe(val=>{
      if(val==='add'){
        this.getUniversities(this.selected);
      }
    })
  }

  updateDialog(element:any){
    this.dialogRef.open(AddUniversityComponent, {
      width: '40%',
      data : {
        header_text : 'Update University',
        countryID: this.selected,
        universityDetails: element
      }
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getUniversities(this.selected);
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
        
        this.universityService.deleteUniversities(element.id)
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
