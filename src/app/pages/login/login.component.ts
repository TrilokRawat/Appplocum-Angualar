import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators } from '@angular/forms';
import { login} from '../../form';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service'
import { ToastrService } from 'ngx-toastr';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;
  submitted = false;
  message = '';
  constructor(private fb: FormBuilder,
              private router: Router,
              private apiService: ApiService,
              private toastr: ToastrService 
              ) { }

  ngOnInit() {
    this.loginForm = login;
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get loginData() {
    return this.loginForm.controls;
  }

  // login form
  onSubmit(data) {
    if (this.loginForm.invalid) {
      this.submitted = true;
      return false;
      }

    this.apiService.fetchData('api/users/sign_in', data, 'POST').subscribe(res => {
      if (res['error'] == false) {
        this.message = res['message'];
        this.router.navigate(['/product'], {queryParams: {
					ver: Math.random().toString(36).substr(2, 5),
					nocache: 1
        }});
        this.toastr.success('Login succesfull...!');
        localStorage.setItem('user', JSON.stringify(res));
      } else {
        this.message = res['message'];
        // this.toastr.error(res['message']);
      }
      },(err) => {
        console.log(err);
       this.toastr.error(err);
      }
      );
    // stop here if form is invalid
    // display form values on success
  }

}
