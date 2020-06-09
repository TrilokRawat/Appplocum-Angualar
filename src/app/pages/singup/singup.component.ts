import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'
import {  FormBuilder, Validators } from '@angular/forms';
import { user } from '../../form';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

 
@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  userForm = user;
  submitted = false;
  profileImg: string | ArrayBuffer;
  documnets= [];
  constructor(private api: ApiService, private fb : FormBuilder,
    private router: Router, 
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['',  [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      address_line1: [''],
      address_line2: [''],
      address_line3: [''],
      town: [''],
      pincode: [''],
      avatar: [''],
      date_of_birth: [''],
      documnet: [''],
    });
  }

  // get form value.
  get f() { return this.userForm.controls; }

  addUser(data) {
    let obj  = Object.assign({}, data)
    this.submitted = true;
    console.log(this.profileImg)
    console.log(this.documnets)
    obj['avatar']= this.profileImg;
    obj['documnet']= this.documnets;
    if(this.userForm.invalid) {
      this.toastr.error('Invailid Form fields.');
      return false;
    }
    this.api.fetchData('api/users/sign_up', JSON.stringify(obj), 'POST').subscribe(res => {
      console.log(res);
      if (res['error'] == false) {
        this.router.navigate(['/product'], {queryParams: {
					ver: Math.random().toString(36).substr(2, 5),
					nocache: 1
        }});
        this.toastr.success('Register succesfull...!');
        localStorage.setItem('user', JSON.stringify(res));
      } else {
        // this.toastr.error(res['message']);
      }
    });
    
  }

   //  uplaod image as buffer.
   onSelectFile(event, key) {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (e) => {
          const obj = {
            base64_image: e.target['result'],
          };
          if(key == 'avatar') {
            this.profileImg = e.target['result']
          }
          if(key == 'document') {
            this.documnets.push({file : e.target['result']})
          }
        };
      }
    }
  }

}
