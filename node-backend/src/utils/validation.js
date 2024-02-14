const Validator = require('fastest-validator');

// Define a schema to validate the user input (public user)
const schemaForPublicUser = {    
    name: {type: "string", optional: false, max: "100", pattern: /^[A-Za-z\s]+$/, message: {
        optional: "Name cannot be empty",
        max: "Name cannot exceed 100 characters.",
        pattern: "Name must not have digits or special characters."
    }},
    nic: {type: "string", optional: false, pattern: /^(?:\d{12}|\d{9}[Vv])$/, message: {
        optional: "NIC cannot be empty",
        pattern: "NIC must be either 9 digits followed by a V or 12 digits."
    } },
    username: {type: "string", optional: false, max: "20", pattern: /^[^\d\s]+$/, message: {
        optional: "Username cannot be empty",
        max: "Username cannot exceed 20 characters.",
        pattern: "Username must not have spaces, digits or special characters."
    }},
    email: {type: "string", optional: false, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: {
        optional: "Email cannot be empty",
        pattern: "Email format is not valid."
    } },
    mobile: { type: "string", optional: false, pattern: /^\d{9,10}$/, message: {
        optional: "Mobile cannot be empty",
        pattern: "Mobile must have 9 or 10 digits."
    } },
    password: { type: "string", optional: false, message: {
        optional: "Password cannot be empty"
    } }
}

// Define a schema to validate the user input (beat officer and admin)
const schemaForBeatOfficerAndAdmin = {    
    name: {type: "string", optional: false, max: "100", pattern: /^[A-Za-z\s]+$/, message: {
        optional: "Name cannot be empty",
        max: "Name cannot exceed 100 characters.",
        pattern: "Name must not have digits or special characters."
    }},
    username: {type: "string", optional: false, max: "20", pattern: /^[^\d\s]+$/, message: {
        optional: "Username cannot be empty",
        max: "Username cannot exceed 20 characters.",
        pattern: "Username must not have spaces, digits or special characters."
    }},
    email: {type: "string", optional: false, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: {
        optional: "Email cannot be empty",
        pattern: "Email format is not valid."
    } },
    password: { type: "string", optional: false, message: {
        optional: "Password cannot be empty"
    } }
}

// Define a schema to validate the user input (institution, division and branch)
const schemaForInstitutionAndDivisionAndBranch = {    
    name: {type: "string", optional: false, max: "100", pattern: /^[A-Za-z\s]+$/, message: {
        optional: "Institution, Division or Branch Name cannot be empty",
        max: "Institution, Division or Branch Name cannot exceed 100 characters.",
        pattern: "Institution, Division or Branch Name must not have digits or special characters."
    }}
}

// Define a schema to validate the user input (beat office)
const schemaForBeatOffice = {    
    name: {type: "string", optional: false, max: "100", pattern: /^[A-Za-z\s]+$/, message: {
        optional: "Beat Office Name cannot be empty",
        max: "Beat Office Name cannot exceed 100 characters.",
        pattern: "Beat Office Name must not have digits or special characters."
    }}
}

// Define a schema to validate the user input (complaint)
const schemaForCheckingDescription = {    
    description: {type: "string", optional: false, max: "1000", message: {
        optional: "Description cannot be empty",
        max: "Description cannot exceed 1000 characters."
    }}
}

const validator = new Validator();

module.exports = {
    validator, schemaForPublicUser, schemaForBeatOfficerAndAdmin, 
    schemaForInstitutionAndDivisionAndBranch, schemaForBeatOffice,
    schemaForCheckingDescription
}