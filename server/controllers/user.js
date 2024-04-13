import nodemailer from 'nodemailer';
import crypto from 'crypto';



import User from "../models/user.js";


const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: 'harishseervi03@gmail.com',
        pass: 'ucyw ulhy uioi czpx'
    }
});


const generateVerificationToken = () => {
        return crypto.randomBytes(32).toString('hex');
}


const signUp = async (req, res) => {
    const {name,  email, password, role, address, city, phone, lat,lon } = req.body; 
    console.log(req.body);
    // if (confirmPassword !== password) res.status(404).json({ msg: "Password not matches" })
    try {
        const exists = await User.findOne({email});
        if(exists){
            return res.status(403).json({msg:"Email Already in Use Try Another"});
        }

        const verificationToken = generateVerificationToken();
        
        const user = await User.create({ name, email, password, role, address, verificationToken, city, phone,latitude:lat,longitude:lon});
        
        const verificationLink = `http://localhost:5000/api/v1/user/verify?token=${verificationToken}`;
 
        const mailOptions = {
            from: 'harishseervi03@gmail.com',
            to: email,
            subject: 'Email Verification',
            text: `Please click on the following link to verify your email: ${verificationLink}`,
          }

        await transporter.sendMail(mailOptions);

        const token = user.createJWT();
        return res.status(200).json({ name: user.name, userId: user._id, token, role:user.role, credits : user.credits});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}


const sendEmailVerification  = async(req,res) => {

        const {email} = req.body;
        const verificationToken = generateVerificationToken();
        const verificationLink = `http://localhost:5000/api/v1/user/verify?token=${verificationToken}`;
 
        const mailOptions = {
            from: 'harishseervi03@gmail.com',
            to: email,
            subject: 'Email Verification',
            text: `Please click on the following link to verify your email: ${verificationLink}`,
          }

        try{
            await transporter.sendMail(mailOptions);
        
        }
        catch(error){
            return res.status(500).json("Internal Server error");
            console.log(error.message);
        }
        
}


const verifyEmail = async(req,res) => {
        const {token} = req.query;

        try {
            // Find the user with the provided verification token
            const user = await User.findOne({ verificationToken: token });
        
            if (!user) {
              return res.status(404).json({ error: 'Invalid token' });
            }
    
            user.isVerified = true;
            user.verificationToken = null; 
            await user.save();
        
            res.json({ message: 'Email verified successfully' });
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Verification failed' });
          }
}


const signIn = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(202).json({ msg: "Invalid Email" });
    }
    const isCorrect = await user.comparePassword(password);
    if (!isCorrect) {
       return res.status(202).json({ msg: "Invalid Credentials" });
    } 
    const token = user.createJWT();
    return res.status(200).json({ name: user.name, userId: user._id, token, role:user.role, credits: user.credits});
}



const getCredits = async(req,res) => {
    const {userId} = req.user;

    try{
        const user = await User.findOne({_id:userId});
        return res.status(202).json(user.credits);
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message : 'Internal Server Error'});
    }
}

export { signUp,signIn,verifyEmail, getCredits};

