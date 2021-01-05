import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { FirebasedataService } from 'src/app/Services/firebasedata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  scholarshipForm: FormGroup;
  submitted: false;
  coursePrice: any = '10000';

  class: any[] = ['5th', '6th', '7th', '8th', '9th', '10th', '10th Above'];
  age: any[] = ['1-4', '5-9', '10-14', '15-18', '18 Above'];
  state: any[] = ['Haryana', 'Punjab', 'Rajasthan', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
    'Chhattisgarh', 'Goa', 'Gujarat',
    'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
    'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];
  coursesList: any[] = [{ course: 'Python', price: 10000, },
  { course: 'Computer Vision', price: 12000 },
  { course: 'Machine Learning', price: 13000 },
  ];
  marks: any[] = ['Below 70%', '71%-74%', '75%-79%', '80%-84%', '85%-89%', '90%-95%', 'Above 95%'];
  constructor(private formbuilder: FormBuilder,
    // tslint:disable-next-line:align
    private firebasedatabse: FirebasedataService) {
    this.scholarshipForm = formbuilder.group({
      student_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z\\s]+$')]],
      mother_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z\\s]+$')]],
      father_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z\\s]+$')]],
      mobile_no: ['', [Validators.required, Validators.pattern('(0/91)?[7-9][0-9]{9}')]],
      present_class: ['', Validators.required],
      age: ['', Validators.required],
      city: ['', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z\\s]+$')]],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern('^[1-9][0-9]{5}$')]],
      course: ['', Validators.required],
      // course_price: [''],
      marks: ['', Validators.required],
      report_card: ['', Validators.required],
      check: ['', Validators.requiredTrue],
    });
  }

  ngOnInit(): void {
    this.firebasedatabse.displayStudentData().subscribe(e => {
      e.map(data => {
        console.log(data.payload.doc.data());
      });

    });
  }
  // tslint:disable-next-line:typedef
  onSubmit() {
    this.scholarshipForm.value.course_price = this.coursePrice;
    console.log(this.scholarshipForm.value);
    this.firebasedatabse.createStudentData(this.scholarshipForm.value).then(() => {
      this.scholarshipForm.reset();
    }).catch(err => {
      console.log(err);
    });
  }
  // tslint:disable-next-line:typedef
  onChange(deviceValue: any) {
    this.coursesList.map(e => {
      if (e.course === deviceValue) {
        this.coursePrice = e.price;
      }
    });
  }

}
