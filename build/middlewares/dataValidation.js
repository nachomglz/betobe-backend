"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import validation functions
const validations_functions_1 = require("../utils/validations.functions");
const validateData = (req, res, next) => {
    // Validate data
    const { name, surname, description, email, phone, birthdate, weight, height, country, agency, laterality, position, passports, videos, current_team, } = req.body;
    // console.log(birthdate.toLocaleDateString());
    // var split_birthdate: Array<any> = birthdate.toString().split("/");
    // split_birthdate.forEach(
    //   (element, index) => (split_birthdate[index] = parseInt(element))
    // );
    // const personBirthDate: Date = new Date(
    //   split_birthdate[2],
    //   split_birthdate[0] - 1,
    //   split_birthdate[1]
    // );
    // console.log(personBirthDate);
    // return;
    let errors = [];
    // Validate name
    if (!(0, validations_functions_1.validateName)(name))
        errors.push({
            field: "name",
            message: "El nombre debe tener más de 2 caracteres",
        });
    // Validate surname
    if (!(0, validations_functions_1.validateSurname)(surname))
        errors.push({
            field: "surname",
            message: "El apellido debe tener más de 2 caracteres",
        });
    // Validate description
    if (!(0, validations_functions_1.validateDescription)(description))
        errors.push({
            field: "description",
            message: "La descripción debe tener más de 10 caracteres",
        });
    // Validate email
    if (!(0, validations_functions_1.validateEmail)(email))
        errors.push({
            field: "email",
            message: "El email no es válido",
        });
    // Validate phone
    if (!(0, validations_functions_1.validatePhone)(phone))
        errors.push({
            field: "phone",
            message: "El teléfono debe tener más de 9 caracteres",
        });
    // Validate birthdate
    if (!(0, validations_functions_1.validateBirthdate)(birthdate))
        errors.push({
            field: "birthdate",
            message: "La fecha de nacimiento no es válida",
        });
    // Validate weight
    if (!(0, validations_functions_1.validateWeight)(weight))
        errors.push({
            field: "weight",
            message: "El peso debe ser al menos 40kg",
        });
    // Validate height
    if (!(0, validations_functions_1.validateHeight)(height))
        errors.push({
            field: "height",
            message: "La altura debe ser al menos 1.4m",
        });
    // Validate country
    if (!(0, validations_functions_1.validateCountry)(country)) {
        errors.push({
            field: "country",
            message: "El país debe tener más de 2 caracteres",
        });
    }
    // Validate agency data
    if (!(0, validations_functions_1.validateAgencyName)(agency === null || agency === void 0 ? void 0 : agency.agency_name))
        errors.push({
            field: "agency.agency_name",
            message: "El nombre de la agencia debe tener más de 2 caracteres",
        });
    if (!(0, validations_functions_1.validateAgencyEmail)(agency === null || agency === void 0 ? void 0 : agency.agency_email))
        errors.push({
            field: "agency.agency_email",
            message: "El email de la agencia no es válido",
        });
    if (!(0, validations_functions_1.validateAgencyDescription)(agency === null || agency === void 0 ? void 0 : agency.agency_description))
        errors.push({
            field: "agency.agency_description",
            message: "La descripción de la agencia debe tener más de 10 caracteres",
        });
    if (!(0, validations_functions_1.validateAgencyPhone)(agency === null || agency === void 0 ? void 0 : agency.agency_phone))
        errors.push({
            field: "agency.agency_phone",
            message: "El teléfono de la agencia debe tener más de 6 caracteres",
        });
    // Validate laterality
    if (!(0, validations_functions_1.validateLaterality)(laterality))
        errors.push({
            field: "laterality",
            message: "La lateralidad no es válida",
        });
    // Validate position
    if (!(0, validations_functions_1.validatePosition)(position))
        errors.push({
            field: "position",
            message: "La posición no es válida",
        });
    // Validate current team
    if (!(0, validations_functions_1.validateCurrentTeam)(current_team))
        errors.push({
            field: "current_team",
            message: "El nombre del equipo actual no es válido",
        });
    // Validate videos
    if (!(0, validations_functions_1.validateVideos)(videos))
        errors.push({
            field: "videos",
            message: "La url de uno de los videos no es válida",
        });
    // Validate passports
    if (!(0, validations_functions_1.validatePassports)(passports))
        errors.push({
            field: "passports",
            message: "El país de uno de los pasaportes no es válido",
        });
    if (errors.length === 0)
        return next();
    return res.send({
        errors,
    });
};
exports.default = validateData;
