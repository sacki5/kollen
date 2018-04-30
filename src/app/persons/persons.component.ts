import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {

  persons:any[] = [
    {"_id":{"$oid":"5ae04ffd8208ab85dbb568a7"},"address":{"addressLine1":"Velandergatan 114","zipcode":21565,"city":"Malmö"},"membership":{"status":"Non member","since":null},"prevChurch":{"churchName":"Lugnetkyrkan Falun","dateOfBaptism":{"$date":"2002-07-03T00:00:00.000Z"}},"tags":["Strategic","Futureistic","Ung Vuxen"],"firstName":"Isac","lastName":"Ljung","dateOfBirth":{"$date":"1995-12-28T00:00:00.000Z"},"email":"isac.ljung@gmail.com","phone":"0736630723","churchIdentity":{"$oid":"5ae04fd68208ab85dbb568a6"},"__v":0,"groups":[{"$oid":"5ae18fb9934d6fa1f2568430"}]},
    {"_id":{"$oid":"5ae18ff5934d6fa1f2568431"},"address":{"addressLine1":"Velandergatan 114","zipcode":21565,"city":"Malmö"},"membership":{"status":"Non member","since":null},"prevChurch":{"churchName":"Lugnetkyrkan Falun","dateOfBaptism":{"$date":"2002-07-03T00:00:00.000Z"}},"tags":["Strategic","Futureistic","Ung Vuxen"],"groups":[{"$oid":"5ae18fb9934d6fa1f2568430"}],"firstName":"Niclas","lastName":"Ljung","dateOfBirth":{"$date":"1995-12-28T00:00:00.000Z"},"email":"isac.ljung@gmail.com","phone":"0736630723","churchIdentity":{"$oid":"5ae18f8c934d6fa1f256842f"},"__v":0},
    {"_id":{"$oid":"5ae19d495b1646abf0eab31a"},"address":{"addressLine1":"Velandergatan 114","zipcode":21565,"city":"Malmö"},"membership":{"status":"Non member","since":null},"prevChurch":{"churchName":"Lugnetkyrkan Falun","dateOfBaptism":{"$date":"2002-07-03T00:00:00.000Z"}},"tags":["Strategic","Futureistic","Ung Vuxen"],"groups":[],"firstName":"Felix","lastName":"Arnoldsson","dateOfBirth":{"$date":"1995-12-28T00:00:00.000Z"},"email":"isac.ljung@gmail.com","phone":"0736630723","churchIdentity":{"$oid":"5ae04fd68208ab85dbb568a6"},"__v":0}
  ]



  constructor() { }

  ngOnInit() {
  }

}
