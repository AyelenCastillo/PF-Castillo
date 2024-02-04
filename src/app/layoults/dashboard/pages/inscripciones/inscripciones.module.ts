import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesComponent } from './inscripciones.component';
import { InscripcionFormComponent } from './components/inscripcion-form/inscripcion-form.component';
import { InscripcionEditFormComponent } from './components/inscripcion-edit-form/inscripcion-edit-form.component';
import { InscripcionDetailModalComponent } from './components/inscripcion-detail-modal/inscripcion-detail-modal.component';
import { InscripcionesService } from './inscripciones.service';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    InscripcionesComponent,
    InscripcionFormComponent,
    InscripcionEditFormComponent,
    InscripcionDetailModalComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    SharedModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule,
  ],
  exports: [
    InscripcionesComponent,
  ],
  providers: [
    InscripcionesService,
  ],
})
export class InscripcionesModule { }
