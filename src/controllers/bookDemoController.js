const { deleteModel } = require("mongoose");
const bookDemoModel = require("../models/bookDemoModel");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
//const bcrypt = require('bcrypt');
const otpGenerator = require("otp-generator");
const accountSid = "ACe5829ef1a8f7595287aa3699c60dc39c";
const authToken = "5f17a5d34eecf78a0062355b3d18794d";
const twilio = require("twilio");
const client = new twilio(accountSid, authToken);
//const twilio = require('twilio');

module.exports.bookDemo = async function(req, res) {
  try {
    const { email, fullName, MobileNumber, location, registrationOption } = req.body;

    // Generate OTP if the user chooses mobile registration
    // let otp;
    // if (registrationOption === 'MobileNumber') {
    //   otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
    //   // TODO: Send the OTP to the user's mobile number using a third-party service
    // }

    // You can add more logic here to customize the email/OTP content

    const createData = await bookDemoModel.create({
      email,
      fullName,
      MobileNumber,
      location,
     
    });

    const mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'hellomyadventurebook@gmail.com',
        pass: 'wfdutgdirlllbaie',
      },
    });

    const details = {
            from: "hellomyadventurebook@gmail.com",
            to: email,
            subject: "Trial Book successful",
            html: `<html>
      <h1 style='color: green; text-align: center;'>Welcome<br>
      to<br>
      My Adventure Book</h1><br>
      <p>Dear ${fullName},</p>
      <p> Thank you so much for booking a trial masterclass with us! We're thrilled to have you join us and
      can't wait to share valuable insights and knowledge during the session.
       If you have any questions or specific topics you'd like us to cover, feel free to let us know. </p>
      
      </html>`,
          };

    mailTransporter.sendMail(details, (err) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: 'Failed to send email',
          error: err,
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'Successfully booked!',
          data: createData,
          otp: registrationOption === 'mobile' ? otp : undefined,
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// const serviceAccount = require("./smsotp-28507-firebase-adminsdk-ikynq-4261ba0cba.json");
// const admin = require("firebase-admin");

// // Initialize Firebase app
// const firebaseApp = admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://smsotp-28507-default-rtdb.firebaseio.com/", // Replace with your database URL
// }, "acv");

// module.exports.bookDemo = async function (req, res) {
//   try {
//     let { email, fullName, mobileNumber, location } = req.body;

//     const createData = await bookDemoModel.create(req.body);
//     const auth = firebaseApp.auth();

//     // Use the auth object to create a phone number verification request
//     const verificationSession = await auth.createSession({
//       phoneNumber: 7905065324,
//       sessionInfo: "Your session information", // Replace with your session information
//     });

//     // Send the verification code to the user via SMS or any other method
//     console.log(`Verification code sent to ${mobileNumber}: ${verificationSession.code}`);

//     return res.send({
//       success: true,
//       message: "Successfully booked!",
//       data: createData,
//     });
//   } catch (err) {
//     res.status(500).send({ status: false, message: err.message });
//   }
// };





// module.exports.userLogin = async (req, res) => {
//   try {
//     let requestBody = req.body;
//     let { email, MobileNumber } = requestBody;
//     if (email || MobileNumber) {
//       let checkAvailability = await bookDemoModel.findOne({
//                 $or: [{ email }, { MobileNumber }],
//       });
//       if (checkAvailability) {
//         const payload = {
//           userId: checkAvailability["_id"].toString(),
//           exp: Math.floor(Date.now() / 1000) + 60 * 60 * 5,
//           iat: Math.floor(Date.now() / 1000),
//         };
//         const jwtToken = jwt.sign(payload, "secret");

//         let obj = {
//           userId: payload.userId,
//           iat: payload.iat,
//           exp: payload.exp,
//           token: jwtToken,
//         };

//         return res.status(200).send({ status: true, data: obj });
//       } else {
//         return res
//           .status(401)
//           .send({ status: false, msg: "Invalid credentials" });
//       }
//     }
//   } catch (err) {
//     return res.status(500).send({ status: false, msg: err.message });
//   }
// };
// const admin = require("firebase-admin");
// const functions = require('firebase-functions');

// const serviceAccount = require("./smsotp-28507-firebase-adminsdk-ikynq-4261ba0cba.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "firebase-adminsdk-ikynq@smsotp-28507.iam.gserviceaccount.com" // Replace with your Firebase project URL
// });

// const app = admin.app();

// exports.sendOTP = functions.https.onRequest(async (req, res) => {
//   try {
//     const phoneNumber = req.body.phoneNumber;

//     const user = await admin.auth().getUserByPhoneNumber(phoneNumber);
//     const uid = user.uid;

//     const otp = generateRandomOTP();
//     const verificationSession = await admin.auth().createSessionCookie(otp, { expiresIn: 60 * 60 * 24 * 7 });

//     // Send OTP to the user via SMS or any other method
//     sendSMSToUser(phoneNumber, `Your OTP is: ${otp}`);

//     console.log(`OTP sent to ${phoneNumber}: ${otp}`);

//     res.status(200).send({ uid, verificationSession });
//   } catch (error) {
//     console.error('Error sending OTP:', error);
//     res.status(500).send('Error sending OTP');
//   }
// });

// exports.verifyOTP = functions.https.onRequest(async (req, res) => {
//   try {
//     const uid = req.body.uid;
//     const otp = req.body.otp;

//     await admin.auth().verifySessionCookie(otp);

//     // OTP is valid, perform additional actions if needed
//     console.log(`OTP verified for user with UID: ${uid}`);

//     res.status(200).send('OTP verified');
//   } catch (error) {
//     console.error('Error verifying OTP:', error);
//     res.status(500).send('Error verifying OTP');
//   }
// });

// // function generateRandomOTP() {
// //   // Implement your OTP generation logic here
// //   // Example: return Math.floor(1000 + Math.random() * 9000).toString();
// // }

// // function sendSMSToUser(phoneNumber, message) {
// //   // Implement your SMS sending logic here
// //   // You can use a third-party SMS service or your own implementation
// // }

// const admin = require("firebase-admin");
// const serviceAccount = require("./smsotp-28507-firebase-adminsdk-ikynq-4261ba0cba.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://smsotp-28507-default-rtdb.firebaseio.com/"
// });

// const firebase = require("firebase");
// const firebaseConfig = {
//   apiKey: "AIzaSyAATUtEIB0cc0SgWF2y_jTBG3i75B6UlTg",
//   authDomain: "smsotp-28507.firebaseapp.com",
//   projectId: "smsotp-28507",
//   storageBucket: "smsotp-28507.appspot.com",
//   messagingSenderId: "1025681281043",
//   appId: "1:1025681281043:web:5ce53cd124819b45a62fe6",
// };

// firebase.initializeApp(firebaseConfig);

// const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

// module.exports.bookDemo = async function (req, res) {
//   try {
//     const { email, fullName, MobileNumber, location } = req.body;
//     // Add this after const { email, fullName, MobileNumber, location } = req.body;
// const enteredOTP = req.body.otp;

// // Verify OTP
// const isOTPValid = await verifyOTP(email, enteredOTP);

// if (!isOTPValid) {
//   return res.status(400).json({ status: false, message: "Invalid OTP" });
// }

// // Continue with your existing code

//     // Generate OTP
//     const otp = generateOTP();

//     // Save OTP in Firebase for verification
//     await admin.firestore().collection("otp").doc(email).set({
//       otp,
//       timestamp: admin.firestore.FieldValue.serverTimestamp(),
//     });

//     const createData = await bookDemoModel.create(req.body);

//     const mailTransporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "hellomyadventurebook@gmail.com",
//         pass: "wfdutgdirlllbaie",
//       },
//     });

//     const details = {
//       from: "hellomyadventurebook@gmail.com",
//       to: email,
//       subject: "Trial Book successful",
//       html: `<html>
// <h1 style='color: green; text-align: center;'>Welcome<br>
// to<br>
// My Adventure Book</h1><br>
// <p>Dear ${fullName},</p>
// <p> Thank you so much for booking a trial masterclass with us! We're thrilled to have you join us and
// can't wait to share valuable insights and knowledge during the session.
//  If you have any questions or specific topics you'd like us to cover, feel free to let us know. </p>

// </html>`,
//     };

//     mailTransporter.sendMail(details, (err) => {
//       if (err) {
//         res.json({
//           message: err,
//         });
//       } else {
//         res.send({
//           success: true,
//           message: " successfully book!",
//           data: createData,
//         });
//       }
//     });
//   } catch (err) {
//     res.status(500).send({ status: false, message: err.message });
//   }
// };

// const verifyOTP = async (email, enteredOTP) => {
//   const otpSnapshot = await admin.firestore().collection("otp").doc(email).get();

//   if (otpSnapshot.exists) {
//     const { otp, timestamp } = otpSnapshot.data();
//     const expirationTime = 5 * 60 * 1000; // 5 minutes in milliseconds

//     if (timestamp.toMillis() + expirationTime > Date.now() && otp === enteredOTP) {
//       // OTP is valid
//       return true;
//     }
//   }

//   return false;
// };// Add this after const { email, fullName, MobileNumber, location } = req.body;
// const enteredOTP = req.body.otp;

// // Verify OTP
// const isOTPValid = await verifyOTP(email, enteredOTP);

// if (!isOTPValid) {
//   return res.status(400).json({ status: false, message: "Invalid OTP" });
// }

// Continue with your existing code

// module.exports.userLogin = async (req, res) => {
//   try {
//     let requestBody = req.body;
//     let { email, MobileNumber } = requestBody;
//     if (email || MobileNumber) {
//       let checkAvailability = await bookDemoModel.findOne({
//                 $or: [{ email }, { MobileNumber }],
//       });
//       if (checkAvailability) {
//         const payload = {
//           userId: checkAvailability["_id"].toString(),
//           exp: Math.floor(Date.now() / 1000) + 60 * 60 * 5,
//           iat: Math.floor(Date.now() / 1000),
//         };
//         const jwtToken = jwt.sign(payload, "secret");

//         let obj = {
//           userId: payload.userId,
//           iat: payload.iat,
//           exp: payload.exp,
//           token: jwtToken,
//         };

//         return res.status(200).send({ status: true, data: obj });
//       } else {
//         return res
//           .status(401)
//           .send({ status: false, msg: "Invalid credentials" });
//       }
//     }
//   } catch (err) {
//     return res.status(500).send({ status: false, msg: err.message });
//   }
// };

// const admin = require('firebase-admin');
// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();

// // Replace the following line with the content of your generated private key file
// const serviceAccount = require('./smsotp-28507-firebase-adminsdk-ikynq-4261ba0cba.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://your-project-id.firebaseio.com'
// });

// // Implement a function to generate a unique UID
// function generateUniqueUid() {
//   // Implement your logic to generate a unique UID
//   return 'some_unique_uid';
// }

//app.use(bodyParser.json());

// module.exports.bookDemo = async (req, res) => {
//   try {
//     const phoneNumber = req.body.phoneNumber;
//     const uid = generateUniqueUid();
//     const verification = await admin.auth().createCustomToken(uid);

//     res.status(200).json({ verification });
//   } catch (error) {
//     console.error('Error sending OTP:', error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// };

// // // Start your Express app
// // const port = 3000;
// // app.listen(port, () => {
// //   console.log(`Server is running on port ${port}`);
// // });


// // Endpoint to verify OTP
// module.exports.verfyOtp =async (req, res) => {
//   try {
//     const idToken = req.body.idToken;
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     const phoneNumber = decodedToken.phone_number;
//     res.status(200).json({ message: 'OTP verification successful' });
//   } catch (error) {
//     console.error('Error verifying OTP:', error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// };

// // Start your Express app
// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
