import { FormControl, FormGroup, FormArray } from '@angular/forms';



export const login = new FormGroup({
  email: new FormControl(''),
  password: new FormControl(''),
});

export const user = new FormGroup({
  first_name: new FormControl(''),
  last_name: new FormControl(''),
  email: new FormControl(''),
  password: new FormControl(''),
  phone: new FormControl(''),
  address_line1: new FormControl(''),
  address_line2: new FormControl(''),
  address_line3: new FormControl(''),
  town: new FormControl(''),
  pincode: new FormControl(''),
  avatar: new FormControl(''),
  date_of_birth: new FormControl(''),
  documnet: new FormControl(''),
});








