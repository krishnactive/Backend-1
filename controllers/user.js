
const user = require('../models/user')
async function handleGetAllUsers(req, res){
    const allDbuser = await user.find({});
    return res.json(allDbuser);
}

async function handleGetAllUserById(req, res){
    const user1 = await user.findById(req.params.id);
        if(!user1){
            return res.status(404).json({error: "user not found"});
        }
        return res.json(user1);
}

async function handleUpdateUserById(req, res){
    //Edit user with id
    const {firstName,lastName,email,gender,jobTitle} = req.body;
    const user1 = await user.findById(req.params.id);
    if(user1){
        user1.firstName = firstName||user1.firstName;
        user1.lastName = lastName||user1.lastName;
        user1.email = email||user1.email;
        user1.gender = gender||user1.gender;
        user1.jobTitle = jobTitle||user1.jobTitle;
        await user1.save();
        return res.json({status:"user updated",user1});
    }
    else{
        return res.status(404).json({status:"User not found"});
    }
}

async function handleDeleteUserById(req, res){
    //Delete user with id
    const user1 = await user.findById(req.params.id);
    if(user1){
        await user.deleteOne({_id:req.params.id});
        return res.json({status:"user deleted",user1});
    }
    else{
        return res.status(404).json({status: "User not found"});
    }
}

async function handleCreateNewUser(req, res){
    const body = req.body;
    if(!body||!body.first_name||!body.last_name||!body.email||!body.job_title||!body.gender){
        return res.status(400).json({msg:"All fields are required"});
    }
const userCreated = await user.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    });
    return res.status(201).json({msg:"success", id: userCreated.id});
}


module.exports={
    handleGetAllUsers,
    handleGetAllUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
}