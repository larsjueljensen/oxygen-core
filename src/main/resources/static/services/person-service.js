
class PersonService {

    getById(id) {
        return Promise.resolve({id: id, name: 'Lars', age: 'Old'});
    }

}

export const personService = new PersonService();