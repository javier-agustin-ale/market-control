import {
  Component,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { Product } from '../../../interfaces/product.interface';
import { ProductManagmentService } from '../../../services/product-managment-service/product-managment.service';
import { ProductService } from '../../../services/product-service/product.service';

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
export class ProductFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() productToEdit: Product | null = null;
  public formProduct!: FormGroup;
  public containsOffer: boolean = false;

  private file: File | null = null;
  private containsOfferSubscription!: Subscription;

  private productService = inject(ProductService);
  private fb = inject(FormBuilder);
  private productManagmentService = inject(ProductManagmentService);

  public ngOnInit(): void {
    this.setUpForm();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['productToEdit'] && changes['productToEdit'].currentValue) {
      this.formProduct.patchValue(changes['productToEdit'].currentValue);

      this.addExistingImageToFile();
      if (this.productToEdit?.offerAmount) {
        this.formProduct.get('containsOffer')?.setValue(true);
        return;
      }
      this.formProduct.get('containsOffer')?.setValue(false);
    }
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.file = input.files[0];
    }
  }

  public clearForm(): void {
    this.productManagmentService.selectedProductToEdit(null);
    this.formProduct.reset({
      name: '',
      unitPrice: null,
      offerAmount: null,
      offerPrice: null,
      containsOffer: false,
    });
    this.file = null;
    this.formProduct.markAsPristine();
    this.formProduct.markAsUntouched();
  }

  public isControlInvalid(controlName: string): boolean {
    const control = this.formProduct.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  public getFileName(): string {
    return this.file?.name ? this.file.name : 'No file selected';
  }

  public onSubmit(isNewProduct: boolean): void {
    if (!this.file || !this.formProduct.valid) return;

    if (!this.formProduct.value.containsOffer) {
      this.formProduct.get('offerAmount')?.setValue(null);
      this.formProduct.get('offerPrice')?.setValue(null);
    }
    const { containsOffer, ...payload } = this.formProduct.value;

    const productData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        productData.append(key, value.toString());
      }
    });

    productData.append('image', this.file);
    if (isNewProduct) {
      this.productService.addNewProduct(productData).subscribe(() => this.clearForm());
    } else {
      if (!this.productToEdit?.productId) return;
      this.productService
        .updateProduct(this.productToEdit?.productId, productData)
        .subscribe(() => this.clearForm());
    }
  }

  private addExistingImageToFile(): void {
    if (!this.productToEdit) return;
    const byteArray = new Uint8Array(this.productToEdit.image.data);
    const blob = new Blob([byteArray], { type: 'image/png' });

    const fileFromExistingImage = new File(
      [blob],
      this.productToEdit.name.replace(/\s/g, '') + '.png',
      {
        type: 'image/png',
      }
    );
    this.file = fileFromExistingImage;
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
        const offerAmountControl = this.formProduct.get('offerAmount');
        const offerPriceControl = this.formProduct.get('offerPrice');

        if (checked) {
          offerAmountControl!.setValidators([Validators.required, Validators.min(1)]);
          offerPriceControl!.setValidators([Validators.required, Validators.min(0.01)]);
        } else {
          offerAmountControl!.clearValidators();
          offerPriceControl!.clearValidators();
        }

        offerAmountControl!.updateValueAndValidity();
        offerPriceControl!.updateValueAndValidity();
      });
  }

  public ngOnDestroy(): void {
    this.containsOfferSubscription?.unsubscribe();
  }
}
