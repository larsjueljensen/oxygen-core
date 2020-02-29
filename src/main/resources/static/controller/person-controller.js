
import { oxygen } from "../framework/oxygen.js";
import { OxygenController } from "../framework/oxygen-controller.js";
import { personService } from "../services/person-service.js";

class PersonController extends OxygenController {

    constructor(element) { super(element); }

    init() {
        personService.getById(28).then(person => {
            this.name = person.name;
            this.age = person.age;
            super.init();
        });
    }

}

oxygen.registerControllerClass(PersonController);
