export class Person {
    firstName: String
    lastName: String
    dateOfBirth: Date
    email: String
    phone: String
    address: {
        addressLine1: String,
        zipcode: String,
        city: String
    }
    membership: {
        status: String,
        since: Date
    }
    prevChurch: {
        churchName:String,
        dateOfBaptism: Date
    }
    tags:string[]
}
