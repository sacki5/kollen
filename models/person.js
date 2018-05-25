const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: 1,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        minLength: 1,
        trim: true,
        required: true,
    },
    dateOfBirth: {
        year: {
            type: Number,
            trim: true,
            required: true,
        },
        month: {
            type: Number,
            trim: true,
            required: true,
        },
        day: {
            type: Number,
            trim: true,
            required: true,
        },
    },
    email: {
        type: String,
        minlength: 3,
        trim: true,
        required: false,
    },
    phone: {
        type: String,
        trim: true,
        minLength: 5,
        required: false,
    },
    address: {
        addressLine1: {
            type: String,
            minLength: 1,
            trim: true,
            required: false,
            alias: 'addressLine1',
        },
        zipcode: {
            type: String,
            minLength: 4,
            trim: true,
            required: false,
            alias: 'zipcode',
        },
        city: {
            type: String,
            minLength: 1,
            trim: true,
            required: false,
            alias: 'city',
        },
    },
    membership: {
        status: {
            type: Boolean,
            required: true,
            alias: 'membershipStatus',
        },
        since: {
            year: {
                type: Number,
                trim: true,
            },
            month: {
                type: Number,
                trim: true,
            },
            day: {
                type: Number,
                trim: true,
            },
        },
    },
    prevChurch: {
        type: String,
        minlength: 1,
        default: null,
        required: false,
    },
    dateOfBaptism: {
        year: {
            type: Number,
            trim: true,
        },
        month: {
            type: Number,
            trim: true,
        },
        day: {
            type: Number,
            trim: true,
        },
    },
    tags: {
        type: String,
        minLength: 1,
        required: false,
    },
    // groups: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Groups'
    //     }
    // ],
    churchIdentity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
}, {
    toObject: {virtuals: true},
    toJSON: {virtuals: true},
});

personSchema.virtual('groups', {
    ref: 'Groups',
    localField: '_id',
    foreignField: 'members',
});


personSchema.virtual('fullName').get(function() {
    return this.firstName + ' ' + this.lastName;
});

personSchema.virtual('addressPretty').get(function() {
    if (this.addressLine1) {
        return this.address.addressLine1 + ', ' + this.address.city + ' ' + this.address.zipcode;
    }
});

personSchema.virtual('dateOfBaptismNotNull').get(function() {
    if (this.dateOfBaptism.year) {
        return this.dateOfBaptism;
    }
    return null;
});


personSchema.virtual('memberSincePretty').get(function() {
    if (this.membership.since.year || this.membership.since.month || this.membership.since.day) {
        let year = this.membership.since.year;
        let month = this.membership.since.month;
        let day = this.membership.since.day;

        return year + '-' + month + '-' + day;
    }
    return '';
});

personSchema.virtual('memberSince').get(function() {
    if (this.membership.since.year) {
        return this.membership.since;
    }
    return null;
});

personSchema.virtual('membershipStatusPretty').get(function() {
    if (this.membership.status) {
        return 'Medlem';
    }

    return 'Inte medlem';
});


personSchema.virtual('dateOfBaptismPretty').get(function() {
        if (this.dateOfBaptism.year || this.dateOfBaptism.month || this.dateOfBaptism.day) {
            let year = this.dateOfBaptism.year;
            let month = this.dateOfBaptism.month;
            let day = this.dateOfBaptism.day;

            return year + '-' + month + '-' + day;
        }
        return 'Ingen dopdag';
});


personSchema.virtual('dateOfBirthPretty').get(function() {
    let year = this.dateOfBirth.year;
    let month = this.dateOfBirth.month;
    let day = this.dateOfBirth.day;

    return year + '-' + month + '-' + day;
});


 const Person = mongoose.model('Persons', personSchema);
 module.exports = {Person};
