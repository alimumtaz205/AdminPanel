import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InqueryResponse } from 'src/app/_models/DTO/Response/InqueryResponse';
import { InqueryService } from 'src/app/_services/inquery.service';

@Component({
  selector: 'app-inquiry-managemnt',
  templateUrl: './inquiry-managemnt.component.html',
  styleUrls: ['./inquiry-managemnt.component.css']
})
export class InquiryManagemntComponent implements OnInit {
  dataSource:any;
  posts: any[] | undefined;
  
  displayedColumns: string[] = [
    'Inquiry Id',
    'Country',
    'University',
    'Course Level',
    'Subject'
  
  ];
  clickedRows = new Set<InqueryResponse>();

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    private service:InqueryService) { }

  ngOnInit(): void {
    debugger;
      this.service.getPosts().subscribe((resp) => {
        debugger;
        if (resp.isSuccessful) {
          this.dataSource = new MatTableDataSource(resp.data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
        else{
          debugger;
          //this.dataSource = new MatTableDataSource(resp.data as any);
          //this.dataSource.paginator = this.paginator;
        }
      });
    }

}
