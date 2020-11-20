const mongoose=require('mongoose');

const LoanSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    customer:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    amount:{type:Number,required:true},
    duration:{type:Number,required:true},
    emi:{type:String,required:true},
    firstRepaymentDate:{type:Date, required:true},
    totalPayable:{type:Number, required:true},
    status:{type:String, enum:['new','approved','rejected'], default:'new', required:true}
},{timestamps: true});

module.exports = mongoose.model('Loan',LoanSchema);