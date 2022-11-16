import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { InjectFlags } from '@angular/compiler/src/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  productForm!: FormGroup;

  actionBtn: string = "Save";

  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private matDialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required]
    });

    if (this.editData) {
      this.actionBtn = "Update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['comment'].setValue(this.editData.comment);
    }
  }

  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.apiService.postProduct(this.productForm.value)
        .subscribe({
          next: (response) => {
            alert("Product Added Succesfully");
            this.productForm.reset();
            this.matDialogRef.close('save');
            window.location.reload();
          },
          error: (response) => {
            alert("Some Error Occured");
          }
        })
      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.apiService.putProduct(this.productForm.value, this.editData.id)
    .subscribe({
      next: (res) => {
        alert("Product Updated successfully.");
        this.productForm.reset();
        this.matDialogRef.close('update');
        window.location.reload();
      },
      error: (res) => {
        alert("Error occured while updating the product.");
      }
    })
  }

}
