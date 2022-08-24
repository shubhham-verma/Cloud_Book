const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')


// ?? ideally this sign string should be stored in en evironment variable
const JWT_SECRET = '_estefani_is_a_cool_name_'


//  !! ROUTE : 1 Creating a user using POST : "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name').isLength({ min: 5 }).withMessage('Name must be more than 5 characters'),
    body('email').isEmail().withMessage('Must be a valid e-main address'),
    body('password').isLength({ min: 5 }).withMessage('Name must be more than 5 characters')], async (req, res) => {

        let success = false;
        // checks if any errors and displays them
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        try {
            // checks if same email used multiple times
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success, error: 'E-mail already taken' })
            }

            const salt = await bcrypt.genSalt(10);
            const sec_password = await bcrypt.hash(req.body.password, salt);
            // creats a new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: sec_password,
            });
            const data = {
                user: {
                    id: user.id
                }
            }
            const auth_token = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, auth_token });

        } catch (error) {
            console.error(error.message);
            res.status(500).json({ success, error: 'Some error occured' });
        }
    })


// !! ROUTE : 2 Authenticate a user using POST : "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.status(400).json({ success, error: "Please login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Please login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const auth_token = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, auth_token })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("INTERNAL SERVER ERROR");
    }
});

// !! ROUTE : 3 Get useralready logged-in details using POST : "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
    let success = false;
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        success = true;
        res.json({ success, user });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success, error: 'Some error occured' });
    }
})


module.exports = router;
