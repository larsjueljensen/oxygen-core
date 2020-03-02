
import { oxygen } from "../framework/oxygen.js";
import { OxygenController } from "../framework/oxygen-controller.js";
import { personService } from "../services/person-service.js";

class PersonController extends OxygenController {

    constructor(element) {
        super(element);
        this.addModelListener('person.age', this);
    }

    init() {
        personService.getById(28).then(person => {
            this.person = {name: 'Ole', age: 'Old enough'};
            this.test = [
                'Lars',
                'Ole',
                'Didrik',
                'Kåre'
            ];
        });
    }

    onModelChange(modelExpression, newVal, oldVal) {
        console.log('onModelChange', this, modelExpression, newVal, oldVal);
    }

}

oxygen.registerControllerClass(PersonController);
