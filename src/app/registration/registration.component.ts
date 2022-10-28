import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms'
import { RegstirationService } from '../regstiration.service';
import { registrationdetails } from './registration-details.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public regDetails:any = [];
  public editAccess:any = false;
  public regiAccess = true;
  formValue !: FormGroup;
  registraitonDetailsObj: registrationdetails = new registrationdetails();
  constructor(private formbuilder: FormBuilder,
    private api:RegstirationService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstname : ['',Validators.required],
      lastname : ['',Validators.required],
      email : ['',[Validators.required,Validators.email]],
      phone : ['',Validators.required],
      company : ['',Validators.required],
      gender : ['',Validators.required],
      dob : ['',Validators.required],
      password : ['',Validators.required],
      cpassword : ['',Validators.required]
    })
    this.getRegistrationDetails()
  }
  postRegistrationDetails(){
    this.registraitonDetailsObj.firstname = this.formValue.value.firstname;
    this.registraitonDetailsObj.lastname = this.formValue.value.lastname;
    this.registraitonDetailsObj.email = this.formValue.value.email;
    this.registraitonDetailsObj.phone = this.formValue.value.phone;
    this.registraitonDetailsObj.company = this.formValue.value.company;
    this.registraitonDetailsObj.gender = this.formValue.value.gender;
    this.registraitonDetailsObj.dob = this.formValue.value.dob;
    this.registraitonDetailsObj.password = this.formValue.value.password;
    this.registraitonDetailsObj.cpassword = this.formValue.value.cpassword;
    this.api.postDetails(this.registraitonDetailsObj)
    .subscribe(res=>{
      console.log(res);
      this.formValue.reset();
      this.getRegistrationDetails()
    })
  }

  getRegistrationDetails(){
    this.editAccess = false
    this.regiAccess = true
    this.api.getRegistrations()
    .subscribe(res=>{
      this.regDetails = res;
      console.log(this.regDetails);
    })
  }
  deleteRegistrationDetails(row:any){
    this.api.deleteDetails(row.id)
    .subscribe(res=>{
      this.getRegistrationDetails()
    })
  }

  editRegDetails(row:any){
    this.registraitonDetailsObj.id = row.id;
    this.formValue.controls['firstname'].setValue(row.firstname);
    this.formValue.controls['lastname'].setValue(row.lastname);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['phone'].setValue(row.phone);
    this.formValue.controls['company'].setValue(row.company);
    this.formValue.controls['gender'].setValue(row.gender);
    this.formValue.controls['dob'].setValue(row.dob);
    this.formValue.controls['password'].setValue(row.password);
    this.formValue.controls['cpassword'].setValue(row.cpassword);

    this.editAccess = true
    this.regiAccess = false


  }

  updateRegDetails(){
    this.registraitonDetailsObj.firstname = this.formValue.value.firstname;
    this.registraitonDetailsObj.lastname = this.formValue.value.lastname;
    this.registraitonDetailsObj.email = this.formValue.value.email;
    this.registraitonDetailsObj.phone = this.formValue.value.phone;
    this.registraitonDetailsObj.company = this.formValue.value.company;
    this.registraitonDetailsObj.gender = this.formValue.value.gender;
    this.registraitonDetailsObj.dob = this.formValue.value.dob;
    this.registraitonDetailsObj.password = this.formValue.value.password;
    this.registraitonDetailsObj.cpassword = this.formValue.value.cpassword;

    this.api.updateRegDetails(this.registraitonDetailsObj,this.registraitonDetailsObj.id)
    .subscribe(res=>{
      this.formValue.reset()
      this.getRegistrationDetails()
    })

  }
  cancelRegiDetails(){
    this.formValue.reset();
    this.regiAccess = true
    this.editAccess = false
  }
}
