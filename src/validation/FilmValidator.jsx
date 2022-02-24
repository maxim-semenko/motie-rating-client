class FilmValidator {

    // Name errors
    validateName(name) {
        let error = "";
        if (!name || name === '') {
            error = 'name cannot be empty!';
        } else if (name.length < 1) {
            error = 'name is too short!';
        } else if (name.length > 50) {
            error = 'name is too long!';
        }
        return error
    }

    // Year errors
    validateYear(year) {
        let error = "";
        if (!year || year === '') {
            error = 'year cannot be empty!';
        }
        return error
    }

    // Time errors
    validateTime(time) {
        let error = "";
        if (!time || time === '') {
            error = 'time cannot be empty!';
        }
        return error
    }

    // Price errors
    validatePrice(price) {
        let error = "";
        if (!price || price === '') {
            error = 'price cannot be empty!';
        } else if (price <= 0) {
            error = 'price cannot be <= 0!';
        }
        return error
    }

    // description errors
    validateDescription(description) {
        let error = "";
        if (!description || description === '') {
            error = 'description cannot be empty!';
        } else if (description.length < 20) {
            error = 'description is too short!';
        } else if (description.length > 512) {
            error = 'description is too long!';
        }
        return error
    }

    // ImageURL errors
    validateImageURL(imageURL) {
        let error = "";
        if (!imageURL || imageURL === '') {
            error = 'image-URL cannot be empty!'
        }
        return error
    }

    validateCountries(countries) {
        let error = "";
        if (countries.length === 0) {
            error = "select country!"
        }
        return error
    }

    validateGenres(genres) {
        let error = "";
        if (genres.length === 0) {
            error = "select genre!"
        }
        return error

    }

    validateAllForCreateUpdate(film) {
        let nameError = this.validateName(film.name)
        let yearError = this.validateYear(film.year)
        let timeError = this.validateTime(film.timeInMinutes)
        let priceError = this.validatePrice(film.price)
        let descriptionError = this.validateDescription(film.description)
        let imageURLError = this.validateImageURL(film.imageURL)
        let countryError = this.validateCountries(film.countries)
        let genreError = this.validateGenres(film.genres)

        return {
            nameError,
            yearError,
            timeError,
            priceError,
            descriptionError,
            imageURLError,
            countryError,
            genreError,
        }
    }

}

export default new FilmValidator()
