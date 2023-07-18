import { Component, OnInit } from '@angular/core';

interface Person {
  name: string;
  dineroAportado: number;
  aPagar: number;
  pagarRecibir: string
  porcentaje: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  logMessages: string = '';  
  logMessagesMedia: string = '';  
  people: Person[] = [

  ];
  peoplePosi: Person[] = [];
  peopleNega: Person[] = [];
  media: number = 0;
  totalPagado: number = 0;
  newPerson: Person = { name: '', dineroAportado: 0, aPagar: 0, porcentaje: 0, pagarRecibir: 'Pagar'  };

  ngOnInit() {

  }
  deletePerson(index: number) {
    this.people.splice(index, 1);
    if(this.people.length>1){
      this.calculateTotalPagado();
      this.calculateMorosidad();
    }else{
      this.logMessages = ``;
      this.logMessagesMedia =  ``;
    }
   
  }

  addPerson() {
    this.people.push({ ...this.newPerson });
    if(this.people.length>1){
      this.calculateTotalPagado();
      this.calculateMorosidad();
    }

    this.newPerson = { name: '', dineroAportado: 0, aPagar: 0, porcentaje: 0, pagarRecibir: 'Pagar'  };
  }

  calculateTotalPagado() {
    this.totalPagado = this.people.reduce((total, person) => total + person.dineroAportado, 0);
  }

  calculateMorosidad() {
    // Calcular media
    this.media = this.totalPagado / this.people.length;
    this.logMessagesMedia =  `El coste medio fue de ${ this.media.toFixed(2) } €\n`;
    let totalDeudaPagadoresNega = 0;
    this.peoplePosi = [];
    this.peopleNega = [];
    this.logMessages = "";
    // Recorremos el array de personas para calcular cuánto dinero deben pagar
    this.people.forEach(person => {
      person.aPagar = this.media - person.dineroAportado;
      person.aPagar = Number(person.aPagar.toFixed(3)); // Redondear a 3 decimales

      if (person.aPagar > 0) {
        person.pagarRecibir='Pagar'
        this.peoplePosi.push(person);
      } else if (person.aPagar < 0) {
        person.pagarRecibir='Recibir'
        this.peopleNega.push(person);
        totalDeudaPagadoresNega += person.aPagar;
      }
    });

    // Calcular porcentaje y distribuir el dinero entre las personas
    this.peopleNega.forEach(person => {
      person.porcentaje = (person.aPagar / totalDeudaPagadoresNega) * 100;
      this.peoplePosi.forEach(personPosi => {
        this.logMessages += `La persona: ${personPosi.name} debe pagar a ${person.name} la cantidad de ${(person.porcentaje / 100 * personPosi.aPagar).toFixed(2)}\n`;
      });
      this.logMessages = this.logMessages.replace(/\n/g, '<br>');
    });
  }
}
