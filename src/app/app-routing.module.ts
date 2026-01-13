import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'student',
    loadChildren: () =>
      import('./features/student/student.module').then((m) => m.StudentModule),
  },
  { path: '', redirectTo: 'student', pathMatch: 'full' },
  {
    path: 'users',
    loadChildren: () =>
      import('./features/user-api/user-api.module').then(
        (m) => m.UsersApiModule
      ),
  },
  { path: 'users', redirectTo: 'users', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
