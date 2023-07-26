import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { CreatePostComponent } from './add-edit-post/add-post.component';
import { RegisterComponent } from './register/register.component';
import { ListPostComponent } from './list-post/list-post.component';
import { EditPostComponent } from './add-edit-post/edit-post.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent },
  { path: 'listpost', component: ListPostComponent},
  { path: 'post/:id', component: DetailComponent},
  { path: 'edit-post/:id', component: EditPostComponent},
  { path: 'newpost', component: CreatePostComponent},
  // { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
