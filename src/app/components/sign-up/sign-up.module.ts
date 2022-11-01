import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SignUpComponent } from './sign-up.component';



@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [
    SignUpComponent
    ] 
})
export class SignUpModule { }
