const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 1,
        required: true,
        trim: true
    },
    description: {
        type: String,
        minLength:1,
        trim: true,
        required: false
    },
    type: {
        type: Number,
        trim:true,
        default: 2
    },
    contact: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Persons',
        default: null,
    },
    tags: {
        type:[String],
        minLength:1,
        required:false
    },
    churchIdentity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Persons'
        }
    ]
},
{
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

groupSchema.virtual('numMembers').get(function() {
    return this.members.length;
});

groupSchema.virtual('membersNames').get(function() {
    if (this.members) {
        return this.members.map(function(item) { return ' ' + item.fullName; });
    }
});

groupSchema.virtual('contactName').get(function() {
    if (this.contact) {
        return this.contact.fullName;
    }
});

groupSchema.virtual('contactPhone').get(function() {
    if (this.contact) {
        return this.contact.phone;
    }
});

groupSchema.virtual('contactEmail').get(function() {
    if (this.contact) {
        return this.contact.email;
    }
});

groupSchema.virtual('typePretty').get(function() {
    switch (this.type) {
        case 0:
            return 'Smågrupp';
            
        case 1:
            return 'Team';
        case 2:
            return 'Övrigt';
        default:
            break;
    }
});

const Group = mongoose.model('Groups', groupSchema);
module.exports = { Group };