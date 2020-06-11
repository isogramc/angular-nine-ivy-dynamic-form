import { Component, VERSION, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  buyTicketForm: FormGroup;

  constructor(private fb : FormBuilder){}

  ngOnInit(){
    /* this.buyTicketForm = new FormGroup({
      emailControl: new FormControl(null, [Validators.required]),
      phoneControl: new FormControl(null),
      address: new FormGroup({
        streetControl: new FormControl(null),
        postalCode: new FormControl(null),
      })
    });*/

    this.buyTicketForm = this.fb.group({
      emailControl: [null, Validators.required],
      phoneControl: [null],
      address: this.fb.group({
        streetControl: [null],
        postalCode: [null],
      }),
      tickets: this.fb.array([this.createTicket()], Validators.required)
    });
  }

  buyTickets(){
    if(this.buyTicketForm.status == 'VALID'){
      console.log(this.buyTicketForm.value);
    } else {
      console.log("Form is not valid");
    }
  }

  addTicket(){
    this.tickets.push(this.createTicket());
  }

  get tickets():FormArray{
    return <FormArray> this.buyTicketForm.get('tickets');
  }

  createTicket():FormGroup{
      return this.fb.group({
        name: [null, Validators.required],
        age: [null, Validators.required],
      });
  }

  clear(){
    if (this.tickets.length > 1) {
        this.tickets.clear();
        this.addTicket();
    } 
  }

  removeLastTicket(){
    if (this.tickets.length > 1) {
        this.tickets.controls.pop();
    }
  }

}
