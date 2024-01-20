import {Component, OnInit} from '@angular/core';
import {DataService} from "../../service/data.service";
import {Consultation} from "../../models/Consultation";
import {Router} from "@angular/router";
import {Doctor} from "../../models/Doctor";
import {Animal} from "../../models/Animal";
import {DocsService} from "../../service/docs.service";

@Component({
  selector: 'app-create-consultation',
  templateUrl: './create-consultation.component.html',
  styleUrls: ['./create-consultation.component.css']
})
export class CreateConsultationComponent implements OnInit{
  defaultDate = new Date();
  doctors: Doctor[] = [];
  speciesOptions: string[] = [];

  diagnostics: string[] = [];
  recommendations: string[] = [];
  treatments: string[] = [];

  consultation: Consultation = new Consultation(0,
    new Date(),
    "",
    "",
    "",
    "",
    "",
    0,
    new Animal());

  response : string = "";
  constructor(
    public service: DataService,
    public docsService:DocsService,
    public router: Router
  ) {
  }

  updateSpecies() {

    switch (this.consultation.consultatedAnimal?.animalType) {
      case 'Cat':
        this.speciesOptions = ['Siamese', 'Persian', 'Maine Coon', 'Ragdoll', 'Bengal'];
        break;
      case 'Dog':
        this.speciesOptions = ['Labrador Retriever', 'German Shepherd', 'Golden Retriever', 'Bulldog', 'Poodle'];
        break;
      case 'Hamster':
        this.speciesOptions = ['Syrian', 'Dwarf Campbells Russian', 'Roborovski', 'Chinese', 'Winter White'];
        break;
      case 'Rabbit':
        this.speciesOptions = ['Holland Lop', 'Mini Rex', 'Netherland Dwarf', 'Lionhead', 'Flemish Giant'];
        break;
      default:
        this.speciesOptions = [];
        break;
    }
  }

  ngOnInit(): void {
    this.service.getAllDoctors().subscribe(
      response => {
        this.doctors = response;
      }
    )

    this.service.getAnimalDiseases().subscribe((data) => (this.diagnostics = data));
    this.service.getRecommendations().subscribe((data) => (this.recommendations = data));
    this.service.getTreatments().subscribe((data) => (this.treatments = data));
  }

  createConsultation() {
    this.service.createConsultation(this.consultation).subscribe(
      () => {
        this.router.navigate(["/consultations"])
      }
    );
  }


}
