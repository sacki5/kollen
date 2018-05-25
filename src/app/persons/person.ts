export class Person {
    id: String;
    firstName: String;
    lastName: String;
    dateOfBirth: {
        year: Number,
        month: Number,
        day: Number
    };
    email: String;
    phone: String;
    groups: any[];
    address: {
        addressLine1: String,
        zipcode: String,
        city: String
    };
    membership: {
        status: String,
        since: {
            year: Number,
            month: Number,
            day: Number
        }
    };
    prevChurch: {
        churchName: String,
        dateOfBaptism: {
            year: Number,
            month: Number,
            day: Number
        }
    };
    tags: String[];
    fullName: String;
    dateOfBirthFormat;
    membershipStatus;
    memberSince;
    addressLine1;
    city;
    zipcode;
    dateOfBaptism;
}
