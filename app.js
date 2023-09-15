const express= require('express');
const bodyParser= require('body-parser');
const nodemailer= require("nodemailer");

const bcrypt= require("bcrypt");
const User = require("./models/user");
const UserOtp= require("./models/UserOtpVerif");
const mongoose= require('mongoose');
const Adm= require("./models/adm");
// const Connet_to_mongoose = require('./connecttomongo');
const MockProfile = require('./models/mock_profile');
// const { default: mongoose } = require('mongoose');
const app= express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

const dotenv= require('dotenv');
dotenv.config();
// Set the path to your views directory
app.set('views', __dirname + '/views');

app.get("/dsa", (req, res) => {
    res.render('dsa');
});

app.get("/contact", (req, res) => {
    res.render('contact');
});

app.get("/arraystl", (req, res) => {
    res.render('arraystl');
});

app.get("/binary_search", (req, res) => {
    res.render('binary_search');
});

app.get("/editor", (req, res) => {
    res.render('editor');
});

app.get("/index", (req, res) => {
    res.render('index');
});

app.get("/login", (req, res) => {
    res.render('login');
});

app.get("/recursion", (req, res) => {
    res.render('recursion');
});

app.get("/sorting", (req, res) => {
    res.render('sorting');
});

app.get("/mock", (req, res) => {
    res.render('mock');
});


let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: "akave7@gmail.com",
        pass:"cbzvhpdlbejxhzcn",
    },
    tls: {
        rejectUnauthorized: false
    }
});
transporter.verify((error,success)=>{
    if(error){
        console.log(error);
    } else {
        console.log("Ready for Message");
        console.log(success);
    }
})

app.get("/",(req,res)=>{
  const message="";
//   console.log(req.body);
    res.render('index2');
})
app.get("/verifyotp",(req,res)=>{
    const message="";
    const useremail="";
    res.render('verifyotp', {  message,useremail });
})
app.get("/resendOtpVerificationcode",(req,res)=>{
  const message="";
    res.render('resendOtpVerificationcode', {  message });
})

app.get("/verified",(req,res)=>{    
    res.render('index');
})

current_email="";
app.post("/login",(req,res)=>{

    let {email , password}= req.body;
    if(!email ||  !password){
      
        let  message = "Empty Details is not allowed";

        res.render('index2', {  message });
    }
     console.log(req.body)
    User.find({email}).then((result)=>{
        if(result.length==0 ){
      
           let message = "User with the provided Email NOT exists ";
           console.log(message)
            res.render('index2', {  message });
        } else if(result[0].verified==false) {
            let message = "Please Verify Your Account ";
            console.log(message)
             res.render('index2', {  message });
        }
         else {
            const salt = 10;
        
            bcrypt.compare(password, result[0].password, async (err, result1) => {
                
                if (!result1 || err) {
                    let message ="Invalid Credentials";
                res.render('index2', {  message });
              }else{
                current_email=email;
                res.render('index');
              }


          
               });
        }
    })
    
})
app.post("/signup",(req,res)=>{

    let {name ,email , password}= req.body;
    if(!email || !name || !password){
        let  message = "Empty Details is not allowed";
        res.render('index2', {  message });
    }
     console.log(req.body)
    User.find({email}).then((result)=>{
        if(result.length){
        
           let message = "User with the provided Email already exists";
           console.log(message)
            res.render('index2', {  message });
        } else {
            const salt = 10;
            bcrypt.hash(password,salt).then((hashpassword)=>{
                const newUser = new User({
                     name,
                     email,
                     password : hashpassword,
                     verified :false,
                });
                newUser.save().then((result)=>{
                    sendOtpVerificationEmail({email},res);
                }).catch((err)=>{
                    console.log(err);
                    //     res.json({status :"Failed",
                    // });
                    let message ="An error occured while saving user account";
                    res.render('index2', {  message });
                });
            }).catch((err)=>{
                console.log(err);
         
                let message ="An error occured while hashing Password";
                res.render('index2', {  message });
            })
        }
    })
    
})

app.get("/logout", (req, res) => {
    
   //TODO logout session bnana hai
 
    // Redirect the user to a logout success page or any other desired page
    res.redirect("/"); // Redirect to the login page, for example
  });
  
app.post("/mock_call", async (req, res) => {
    try {
        //  const user = req.user; // Assuming req.user contains the currently logged-in user's information
        const selectedTopics = req.body.topics; // Use req.body.topics to access the array of selected topics
        console.log(selectedTopics);
        console.log(current_email);

       
        const previousEntry = await MockProfile.findOne();
        console.log("previous entry:- {}",previousEntry);

        const newUser = new MockProfile({
          email: current_email, // Use the logged-in user's email
          topics: selectedTopics, // Store the selected topics as an array
        });
    
        await newUser.save();
  
     
        if(current_email==previousEntry.email){
            console.log("User already applied");
            await MockProfile.findByIdAndDelete(previousEntry._id);
        }
        else if (previousEntry) {
        // If a previous entry exists, send emails to pair users
        prev_email=previousEntry.email;
        prev_topic=previousEntry.topics;
        console.log("Email 1 - ",previousEntry.email);
        console.log("Email 2 - ",current_email);
        
        await sendMockInterviewEmail({
        email: prev_email ,
        topics: prev_topic,
        prevemail:  current_email, 
        prevtopics: selectedTopics }
        );
        await sendMockInterviewEmail({ email: current_email, topics: selectedTopics, prevemail: prev_email, prevtopics: prev_topic });
  
        await MockProfile.findByIdAndDelete(previousEntry._id);
        await MockProfile.findByIdAndDelete(newUser._id);
      } else {
        // Store the topics and user's email in the database
        await MockProfile.create({ email:current_email, selectedTopics });
      }
      
      let message = "SUCCESS";
      res.render("index", { message });
    } catch (err) {
      console.error(err);
      let message = "An error occurred while processing the request";
      res.render("index", { message });
    }
  });
  
  

const sendOtpVerificationEmail= async({email},res)=>{

    try {
     const otp= `${ Math.floor ( 1000 + Math.random() * 9000) }`;
     const mailoption ={
        from : "akave7@gmail.com",
        to :email,
        subject : "Verify Your Email",
        html : `<p> Enter ${otp} in the app to verify your email address and complete the signUp process <br> The code expires in 10 minutes </p>`
     };

     const salt = 10;
     const hashOtp= await bcrypt.hash(otp,salt);
     console.log("This Is my hashed Otp",hashOtp);
    const newUserOtp = new UserOtp({
        userId:email,
        otp: hashOtp ,
        createAt: Date.now(),
        expireAt: Date.now() + 600000,
     })

     await newUserOtp.save();
      transporter.sendMail(mailoption);
 
    let message= ""
    let useremail=email
    res.render('verifyotp', {  message,useremail: useremail });
    } catch (err){
        console.log(err);
        // res.json({
        //     status: "failed",
        //     message : err.message,

        // });
      let  message = err.message;

        res.render('index2', {  message });

    }
}
const sendMockInterviewEmail= async({email,topics,prevemail,prevtopics},res)=>{
    console.log("Recipients email:-",email);
    try {
   
     const mailoption ={
        from : "akave7@gmail.com",
        to :email,
        subject : "Mock Interview Scheduled",
        html : `<p> Hello! Your Mock Interview is Scheduled with ${prevemail}, So that person will take your interview with Your selected Topics. <br>
        And you will have to take his/her Interview with topics given :- ${prevtopics}.<br>
        One Last Step Required:- Please send a mail of Confirmation to ${prevemail} keeping akave7@gmail.com as CC. That you are Ready for the Mock and Can discuss Timings.</p>`
     };

    


      transporter.sendMail(mailoption);

    } catch (err){
        console.log(err);
      let  message = err.message;
        res.render('index', {  message });

    }
}



app.post("/verifyOtp",async (req,res)=>{
    try {
        console.log(req.body);
        let {email,otp} = req.body;
        if(!email || !otp){
            // throw Error("Empty Details is not allowed");
            let  message = "Empty Details is not allowed";
            let useremail=email;
            res.render('verifyotp', {  message,useremail });
        }else{
          const record=  await UserOtp.find({
                userId:email,

            });
            if( record.length <= 0){
           
                // throw new Error(" Accound record is Invalid or has been verified already");
                let  message = " Accound record is Invalid or has been verified already";
                let useremail=email
                res.render('verifyotp', {  message,useremail: useremail});
            }else {
                // cons
                const { expireAt }= record[0];
                const hashOtp= record[0].otp;
                if(expireAt< Date.now()){
                    await UserOtp.deleteMany({userId:email});
                    // throw new Error("Code Has Expired, Please Request again");
                    let  message = "Code Has Expired, Please Request again";
                    let useremail=email
                    res.render('resendOtpVerificationcode', {  message });
                    
                } else{
                     const validotp = await  bcrypt.compare(otp,hashOtp);
                     console.log(validotp);
                     if(!validotp){
                        // throw new Error("Invalid Otp");
                        let  message = "Invalid Otp";
                        let useremail=email
                        res.render('verifyotp', {  message,useremail: useremail });
                     } else{
                        console.log(email);
                       const update=  await User.findOneAndUpdate({email :email},{ $set : {verified:true}},{new: true});
                       console.log(update,"update krra hu ");
                       const del=  await UserOtp.deleteMany({userId:email});
                       console.log(del);
                    //    let  message = "Your account is verified successfully";
                    //    let useremail=email
                    res.redirect("/verified");
                    // res.render('verified');
                     }
                    //  res.json({
                    //     status :"success",
                    //     message:"Your account is verified successfully"
                    //  })
                    
                }
            }
        }
    } catch (error) {
        console.log(error);
 
        // res.json({
        //     status :"Failed",
        //     message:error.message
        //  })
        let  message = error.message;

        res.render('verifyotp', {  message });

    }
})

app.post("/resendOtpVerificationcode", async (req,res)=>{
    try {
        let {email}  = req.body;

        if(!email){
           throw Error("Empty User details are not allowed");

        } else {
           await UserOtp.deleteMany({ userId : email});
           sendOtpVerificationEmail({email},res);
        }
    } catch (error) {
        console.log(error);
        
        const message="Error while sending the otp! Please try again";
  const useremail=""
    res.render('resendOtpVerificationcode', {  message });
    }

})



// Connet_to_mongoose();

const start = async()=>{
   await mongoose.connect('mongodb+srv://DaveToCrackCode:Bahubali123@cluster0.f1xuthy.mongodb.net/?retryWrites=true&w=majority');
app.listen(process.env.PORT,()=>{
    console.log(`Your Server Is Running at Port : ${process.env.PORT}`);

});
}
start();
