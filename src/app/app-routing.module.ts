import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './gaurd/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { ProductComponent } from './pages/product/product.component';
import { CartComponent } from './pages/cart/cart.component';
import { SingupComponent } from './pages/singup/singup.component';
import { ThanksComponent } from './pages/thanks/thanks.component'


const routes: Routes = [
  { path: '',   redirectTo: '/products', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SingupComponent   },
  { path: 'products', component: ProductComponent, canActivate: [AuthGuard]   },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard]   },
  { path: 'thank-you', component: ThanksComponent, canActivate: [AuthGuard]   },
  { path: '**',  redirectTo: '/products', pathMatch: 'full', canActivate: [AuthGuard]   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
