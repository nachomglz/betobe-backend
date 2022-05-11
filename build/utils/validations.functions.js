"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassports = exports.validateVideos = exports.validateCurrentTeam = exports.validatePosition = exports.validateLaterality = exports.validateAgencyDescription = exports.validateAgencyPhone = exports.validateAgencyEmail = exports.validateAgencyName = exports.validateCountry = exports.validateHeight = exports.validateWeight = exports.validateBirthdate = exports.validatePhone = exports.validateEmail = exports.validateDescription = exports.validateSurname = exports.validateName = void 0;
const validateName = (name) => name !== null && name !== undefined && name.length > 2;
exports.validateName = validateName;
const validateSurname = (surname) => surname !== null && surname !== undefined && surname.length > 2;
exports.validateSurname = validateSurname;
const validateDescription = (description) => description !== null && description !== undefined && description.length > 10;
exports.validateDescription = validateDescription;
const validateEmail = (email) => email !== null &&
    email !== undefined &&
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email);
exports.validateEmail = validateEmail;
const validatePhone = (phone) => phone === null || !phone || phone.length === 0 || phone.length >= 7;
exports.validatePhone = validatePhone;
const validateBirthdate = (birthdate) => {
    var split_birthdate = birthdate.toString().split("/");
    split_birthdate.forEach((element, index) => (split_birthdate[index] = parseInt(element)));
    const personBirthDate = new Date(split_birthdate[2], split_birthdate[0] - 1, split_birthdate[1]);
    // Get valid date to have 16 years old
    const today = new Date();
    const validDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
    // Test if personBirthDate is over 16 years old
    return personBirthDate <= validDate;
};
exports.validateBirthdate = validateBirthdate;
const validateWeight = (weight) => !isNaN(weight) && weight !== null && weight !== undefined && weight >= 40;
exports.validateWeight = validateWeight;
const validateHeight = (height) => !isNaN(height) && height !== null && height !== undefined && height >= 1.4;
exports.validateHeight = validateHeight;
const validateCountry = (country) => country !== null && country !== undefined && country.length > 2;
exports.validateCountry = validateCountry;
const validateAgencyName = (agencyName) => agencyName !== null && agencyName !== undefined && agencyName.length > 2;
exports.validateAgencyName = validateAgencyName;
const validateAgencyEmail = (agencyEmail) => agencyEmail !== null &&
    agencyEmail !== undefined &&
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(agencyEmail);
exports.validateAgencyEmail = validateAgencyEmail;
const validateAgencyPhone = (agencyPhone) => agencyPhone === null ||
    !agencyPhone ||
    agencyPhone.length === 0 ||
    agencyPhone.length >= 7;
exports.validateAgencyPhone = validateAgencyPhone;
const validateAgencyDescription = (agecyDescription) => agecyDescription !== null &&
    agecyDescription !== undefined &&
    agecyDescription.length > 10;
exports.validateAgencyDescription = validateAgencyDescription;
const validateLaterality = (laterality) => {
    const LATERALITIES = ["diestro", "zurdo", "ambidiestro"];
    return (laterality !== null &&
        laterality !== undefined &&
        LATERALITIES.includes(laterality.toLowerCase()));
};
exports.validateLaterality = validateLaterality;
const validatePosition = (position) => {
    const POSITIONS = ["portero", "defensa", "medio", "delantero"];
    return (position !== null &&
        position !== undefined &&
        POSITIONS.includes(position.toLowerCase()));
};
exports.validatePosition = validatePosition;
const validateCurrentTeam = (current_team) => current_team !== null &&
    current_team !== undefined &&
    current_team.length > 0;
exports.validateCurrentTeam = validateCurrentTeam;
const validateVideos = (videos) => videos === null ||
    !videos ||
    videos.length === 0 ||
    videos.every(({ video_url }) => video_url.match(/^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/g));
exports.validateVideos = validateVideos;
const validatePassports = (passports) => passports === null ||
    !passports ||
    passports.length === 0 ||
    passports.every(({ country }) => (0, exports.validateCountry)(country));
exports.validatePassports = validatePassports;
