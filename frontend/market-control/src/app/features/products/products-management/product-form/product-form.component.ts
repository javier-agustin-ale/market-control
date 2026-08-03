import { Component, inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { Product } from '../../interfaces/product.interface';
import { ProductManagmentService } from '../../services/product-managment-service/product-managment.service';
import { ProductService } from '../../services/product-service/product.service';

@Component({
  selector: 'app-product-form',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
  standalone: true,
})
export class ProductFormComponent implements OnInit, OnDestroy {
  @ViewChild(FormGroupDirective) private formDirective?: FormGroupDirective;

  private _productToEdit: Product | null = null;
  @Input() set productToEdit(value: Product | null) {
    this._productToEdit = value;
    if (this.formProduct) this.fillFormWithEditProduct(value);
  }
  get productToEdit(): Product | null {
    return this._productToEdit;
  }

  public formProduct!: FormGroup;
  public containsOffer = false;

  public file: File | null = null;
  private containsOfferSubscription!: Subscription;

  private productService = inject(ProductService);
  private fb = inject(FormBuilder);
  private productManagmentService = inject(ProductManagmentService);
  private dialogRef = inject(MatDialogRef, { optional: true });

  public ngOnInit(): void {
    this.setUpForm();
    this.fillFormWithEditProduct(this._productToEdit);
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.file = input.files[0];
    }
  }

  public clearForm(notifyService: boolean = true): void {
    if (notifyService) this.productManagmentService.selectedProductToEdit(null);

    const initialFormValue = this.getInitialFormValue();

    this.formDirective?.resetForm(initialFormValue);
    this.formProduct.reset(initialFormValue, { emitEvent: false });
    this.setOfferValidators(false);
    this.file = null;
    this.resetControlState();
  }

  public isControlInvalid(controlName: string): boolean {
    const control = this.formProduct.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  public getFileName(): string {
    return this.file?.name ? this.file.name : '';
  }

  public onSubmit(isNewProduct: boolean): void {
    if (!this.file || !this.formProduct.valid) return;

    if (!this.formProduct.value.containsOffer) {
      this.formProduct.get('offerAmount')?.setValue(null);
      this.formProduct.get('offerPrice')?.setValue(null);
    }
    const { containsOffer, ...payload } = this.formProduct.value as any;

    const productData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        productData.append(key, value.toString());
      }
    });

    productData.append('image', this.file);
    if (isNewProduct) {
      this.productService.addNewProduct(productData).subscribe(() => {
        this.clearForm();
        this.dialogRef?.close();
      });
    } else {
      if (!this.productToEdit?.productId) return;
      this.productService
        .updateProduct(this.productToEdit?.productId, productData)
        .subscribe(() => {
          this.clearForm();
          this.dialogRef?.close();
        });
    }
  }

  private addExistingImageToFile(product: Product | null): void {
    if (!product || !(product as any).image?.data) return;
    const byteArray = new Uint8Array((product as any).image.data);
    const blob = new Blob([byteArray], { type: 'image/png' });

    const fileFromExistingImage = new File([blob], product.name.replace(/\s/g, '') + '.png', {
      type: 'image/png',
    });
    this.file = fileFromExistingImage;
  }

  private fillFormWithEditProduct(product: Product | null): void {
    if (!this.formProduct) return;

    if (!product) {
      this.clearForm(false);
      return;
    }
    this.formProduct.patchValue(product as any, { emitEvent: false });

    this.addExistingImageToFile(product);
    const hasOffer = !!(product as any).offerAmount;
    this.formProduct.get('containsOffer')?.setValue(hasOffer, { emitEvent: false });
    this.setOfferValidators(hasOffer);
  }

  private setUpForm(): void {
    this.formProduct = this.fb.group({
      name: ['', Validators.required],
      unitPrice: [null, [Validators.required, Validators.min(0.01)]],
      offerAmount: [null],
      offerPrice: [null],
      containsOffer: [false],
    });

    this.containsOfferSubscription = this.formProduct
      .get('containsOffer')!
      .valueChanges.subscribe((checked) => {
        this.setOfferValidators(checked);
      });
  }

  private getInitialFormValue(): Record<string, string | number | boolean | null> {
    return {
      name: '',
      unitPrice: null,
      offerAmount: null,
      offerPrice: null,
      containsOffer: false,
    };
  }

  private setOfferValidators(containsOffer: boolean): void {
    const offerAmountControl = this.formProduct.get('offerAmount');
    const offerPriceControl = this.formProduct.get('offerPrice');

    if (containsOffer) {
      offerAmountControl!.setValidators([Validators.required, Validators.min(1)]);
      offerPriceControl!.setValidators([Validators.required, Validators.min(0.01)]);
    } else {
      offerAmountControl!.clearValidators();
      offerPriceControl!.clearValidators();
      offerAmountControl!.setValue(null, { emitEvent: false });
      offerPriceControl!.setValue(null, { emitEvent: false });
    }

    offerAmountControl!.updateValueAndValidity({ emitEvent: false });
    offerPriceControl!.updateValueAndValidity({ emitEvent: false });
  }

  private resetControlState(): void {
    this.formProduct.markAsPristine();
    this.formProduct.markAsUntouched();

    Object.values(this.formProduct.controls).forEach((control) => {
      control.markAsPristine();
      control.markAsUntouched();
      control.updateValueAndValidity({ emitEvent: false });
    });
  }

  public ngOnDestroy(): void {
    this.containsOfferSubscription?.unsubscribe();
  }
}
