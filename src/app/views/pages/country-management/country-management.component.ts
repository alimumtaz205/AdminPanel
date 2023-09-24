import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CountryResponse } from 'src/app/_models/DTO/Response/CountryResponse';
import { CountryService } from 'src/app/_services/countryService/country.service';
import { AddUniversityComponent } from '../university-management/dialog/add-university.component';
import Swal from 'sweetalert2';
import { AddCountryComponent } from './add-country/add-country.component';
import { UtilsService } from 'src/app/_services/_global/utils.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'country-management',
  templateUrl: './country-management.component.html',
  styleUrls: ['./country-management.component.css']
})
export class CountryManagementComponent implements OnInit {

  message: string = "Are you sure?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  dataSource: any;
  lovType: any = 1;
  selected = 'none';
  selected_model = 'none';
  selected_country_id: any
  displayedColumns: string[] = [
    'ID',
    'Country Name',
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
    private layoutUtilsService: UtilsService,
    public dialogRef: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getCountries(this.lovType);
  }

  getCountries(countryId: any) {
    debugger;
    countryId = 1;
    this.countryService.getCountries(countryId)
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

  changeClient(data: any) {

    this.selected_country_id = data.id;
    //this.getUniversities(data.id);
  }

  openDialog() {
    this.dialogRef.open(AddCountryComponent, {
      width: '40%',
      panelClass: 'custom-modalbox'
    }).afterClosed().subscribe(val => {
      if (val === 'add') {
        this.getCountries(this.selected);
      }
    })
  }

  updateDialog(element: any) {
    debugger;
    this.dialogRef.open(AddCountryComponent, {
      width: '40%',
      data: {
        header_text: 'Update Country',
        countryID: this.selected,
        universityDetails: element
      }
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getCountries(this.selected);
      }
    })
  }



  deleteCountry(_item: any) {
    const _title = 'Country';
    const _description = 'Are you sure to permanently delete this country?';
    const _waitDesciption = 'Country is deleting...';

    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      debugger;
      this.countryService.deleteCountry(_item.id).pipe(
        finalize(() => {

        })
      ).subscribe((baseResponse) => {
        debugger;
        if (baseResponse.isSuccessful) {
          this.layoutUtilsService.alertElement("", baseResponse.message);
          this.getCountries(this.lovType);
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
    // const dialogRef = this.dialogRef.open(AlertDialogDeleteComponent,{
    //   width: '15%',
    // });
  }

  closeModel() {
    debugger;
    this.dialogRef.closeAll();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
