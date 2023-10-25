import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CountryResponse } from 'src/app/_models/DTO/Response/CountryResponse';
import { CountryService } from 'src/app/_services/countryService/country.service';
import { AlertDialogDeleteComponent } from '../alert-dialogs/alert-dialog-delete.component';
import Swal from 'sweetalert2';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { BranchesService } from 'src/app/_services/branchService/branches.service';

@Component({
  selector: 'app-branch-managment',
  templateUrl: './branch-managment.component.html',
  styleUrls: ['./branch-managment.component.css']
})
export class BranchManagmentComponent implements OnInit {
  message: string = "Are you sure?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  dataSource:any;
  lovType: Number = 2;
  selected = 'none';
  selected_model = 'none';
  selected_city_id:any
  displayedColumns: string[] = [
    'ID',
    'Branch Name',
    'Description',
    'Action'
  
  ];

  clickedRows = new Set<CountryResponse>();

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | undefined;

  citiesList: any[] = [
  ];
 

  constructor(
    private countryService: CountryService,
    private branchService: BranchesService,
    public dialogRef:MatDialog
     ) { 
  }

  ngOnInit(): void {
    this.getcities(this.lovType);
  }

  getcities(lovType:any){
    this.countryService.getCountries(lovType).subscribe((resp) => {
      if (resp.isSuccessful) {
        this.citiesList = resp.data;
      }
      else{
      }
    });
  }

  getBranches(countryId:any){
    this.branchService.getBranches(this.selected_city_id).subscribe((resp) => {
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
 
    this.selected_city_id = data.id;
    //this.getUniversities(data.id);
  }
  changeClient1(data:any){
  
    //this.selected_country_id = data.id;
    //this.getUniversities(data.id);
  }

  openDialog(){
    this.dialogRef.open(AddBranchComponent, {
      width: '40%',
      panelClass: 'custom-modalbox'
    }).afterClosed().subscribe(val=>{
      if(val==='add'){
        this.getBranches(this.selected);
      }
    })
  }

  updateDialog(element:any){
    this.dialogRef.open(AddBranchComponent, {
      width: '40%',
      data : {
        header_text : 'Update Branch',
        countryID: this.selected,
        branchDetails: element
      }
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getBranches(this.selected);
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
        
        this.branchService.deletebranch(element.id)
          .subscribe({
            next:(resp) => {
            if (resp.isSuccessful) {
              Swal.fire(
                'Great!',
                resp.message,
                'success'
              )
              this.getBranches(this.selected);
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
