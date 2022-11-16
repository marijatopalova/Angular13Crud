import { Component, OnInit , AfterViewInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular13Crud';

  displayedColumns: string[] = ['productName', 'category', 'price', 'date', 'comment', 'freshness', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog,
    private apiService: ApiService){}

  ngOnInit(): void {
    this.getAllProducts();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    })
  }

  editProduct(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    })
  }

  deleteProduct(id: number) {
    this.apiService.deleteProduct(id)
    .subscribe({
      next: () => {
        alert("Product Deleted successfully.");
        this.getAllProducts();
      },
      error: () => {
        alert("Error occured.");
      }
    })
  }

  getAllProducts() {
    this.apiService.getProduct()
    .subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert("Error occured while fetching data.");
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
