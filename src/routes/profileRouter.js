
const express = require('express');
const { userAuth } = require('../middlewares/auth');
const { validateEditProfileData } = require('../helper/validation');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { parseISO, formatISO } = require("date-fns");

const profileRouter = express.Router();

profileRouter.get('/profile/view', userAuth, (req, res) => {
    try {
        const user = req.user;
        res.send(user)
    } catch (error) {
        res.status(400).send('Something went wrong')
    }

})

profileRouter.post('/profile/update',userAuth , async (req, res) => {
    try {
      if (!validateEditProfileData(req)) {
        throw new Error("Cannot update these fields");
      }
      const loggedInUser = req.user;

      // Ensure DOB is in ISO format if it exists
      if (req.body?.DOB) {
        loggedInUser.DOB = formatISO(parseISO(req.body?.DOB));
      }

      Object.keys(req.body).forEach(
        (key) => (loggedInUser[key] = req.body[key])
      );
      const response = await loggedInUser.save();
      res.json({
        message: `${loggedInUser?.firstName} is updated successfully`,
        data: loggedInUser,
      });
    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
    
})


profileRouter.post('/profile/forgot-password', userAuth, async (req, res) => {
    
    try {
        const user = req.user;
        
        const { emailId, newPassword, confirmNewPassword } = req.body;
        if (user.emailId !== emailId) {
            throw new Error('Email id did not match')
        }
        if (newPassword !== confirmNewPassword) {
            throw new Error('Both password should match ')
        }

        if (!validator.isStrongPassword(newPassword)) {
            throw new Error("Not a strong Password"); 
        }
        const passwordHash = await bcrypt.hash(newPassword, 10)
        // console.log(user.password);
        user.password = passwordHash;
        await user.save();
        // console.log(user.password);
        res.json(
            {
                "message": "Password updated successfully",
                "data":user
            }
        )
        
    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }




    const { emailId, newPassword, confirmNewPassword } = req.body;
})




module.exports = profileRouter;