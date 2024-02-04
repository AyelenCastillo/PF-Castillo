import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import { cursosService } from './cursos.service';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { SharedModule } from '../../../../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import { CursosdetailmodalComponent } from './components/cursosdetailmodal/cursosdetailmodal.component';
import { CursosformeditComponent } from './components/cursosformedit/cursosformedit.component';
import { CursosformmodalComponent } from './components/cursosformmodal/cursosformmodal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CursosComponent,
    CursosdetailmodalComponent,
    CursosformeditComponent,
    CursosformmodalComponent,
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
    FormsModule,
  ],
  exports: [
    CursosComponent,
  ],
  providers: [
    cursosService,
  ],
})
export class CursosModule { }
