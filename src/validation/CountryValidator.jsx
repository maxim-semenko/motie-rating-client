class CountryValidator {

    validate(name) {
        let error = "";
        if (!name || name === '') {
            error = 'name cannot be empty!';
        } else if (name.length < 2) {
            error = 'name is too short!';
        } else if (name.length > 25) {
            error = 'name is too long!';
        }
        return error;
    }
}

export default new CountryValidator()