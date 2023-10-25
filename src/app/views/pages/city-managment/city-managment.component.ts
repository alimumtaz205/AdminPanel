import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CountryResponse } from 'src/app/_models/DTO/Response/CountryResponse';
import { CountryService } from 'src/app/_services/countryService/country.service';
import { AddUniversityComponent } from '../university-management/dialog/add-university.component';
import Swal from 'sweetalert2';
import { cityService } from 'src/app/_services/cityService/city.service';
import { AddCityComponent } from './add-city/add-city.component';

@Component({
  selector: 'app-city-managment',
  templateUrl: './city-managment.component.html',
  styleUrls: ['./city-managment.component.css']
})
export class CityManagmentComponent implements OnInit {
  message: string = "Are you sure?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  dataSource:any;
  lovType: number = 2;
  countryID : string = '0';
  selected = 'none';
  selected_model = 'none';
  selected_city_id:any
  displayedColumns: string[] = [
    'ID',
    'City Name',
    'Description',
    'Image',
    'Action'
  
  ];

  clickedRows = new Set<cityService>();

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | undefined;

  countryList: any[] = [
  ];
 

  constructor(
    private cityService: cityService,
    private countryService: CountryService,
    public dialogRef:MatDialog
     ) { 
  }

  ngOnInit(): void {
    this.getcities(this.lovType);
  }
  getcities(countryId:number){
  
    this.countryService.getCountries(countryId)
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
 
    this.selected_city_id = data.id;
    //this.getUniversities(data.id);
  }


  openDialog(){
    this.dialogRef.open(AddCityComponent, {
      width: '40%',
      panelClass: 'custom-modalbox'
    }).afterClosed().subscribe(val=>{
      if(val==='add'){
        this.getcities(this.lovType);
      }
    })
  }

  updateDialog(element:any){
    this.dialogRef.open(AddCityComponent, {
      width: '40%',
      data : {
        header_text : 'Update City',
        countryID: this.selected,
        universityDetails: element
      }
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getcities(this.lovType);
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
          this.cityService.deleteCity(element.id)
          .subscribe({
            next:(resp) => {
            if (resp.isSuccessful) {
              Swal.fire(
                'Great!',
                resp.message,
                'success'
              )
              this.getcities(this.lovType);
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
