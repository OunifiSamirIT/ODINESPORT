const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Player = db.player;
const Coach = db.coach;
const Manager = db.manager;
const Agent = db.agent;
const Scout = db.scout;
const Club = db.club;
const Advertiser = db.advertiser;
const Other = db.other;
const Role = db.role;

const RefreshToken = db.refreshToken;

const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//mail verf
const crypto = require("crypto");
const nodemailer = require("nodemailer");



exports.signup = async (req, res) => {
  try {
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      nom: req.body.nom,
      prenom: req.body.prenom,
      date_naissance: req.body.date_naissance,
      gender: req.body.gender,
      nationality: req.body.nationality,
      countryresidence: req.body.countryresidence,
      cityresidence: req.body.cityresidence,
      tel: req.body.tel,
      email: req.body.email,
      login: req.body.login,
      profil: req.body.profil,
      password: bcrypt.hashSync(req.body.password, 8),
      verificationToken: verificationToken,
    });

    // Send verification email
    const verificationLink = `https://odine-sport.com/api/auth/verify-email?token=${verificationToken}`;
    await sendVerificationEmail(user.email, verificationLink);

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });

      const profil = roles[0]["name"];

      if (profil === "player") {
        await Player.create({
          iduser: user.id,
          height: req.body.height,
          weight: req.body.weight,
          PiedFort: req.body.PiedFort,
          Licence: req.body.Licence,
          positionPlay: req.body.positionPlay,
          positionSecond: req.body.positionSecond,
          skillsInProfile: req.body.skillsInProfile,
          NumeroWhatsup: req.body.NumeroWhatsup,
        });
      } else if (profil === "coach") {
        await Coach.create({
          iduser: user.id,
          totalTeam: req.body.totalTeam,
          countryCoachedIn: req.body.countryCoachedIn,
          footballTactic: req.body.footballTactic,
          
          skills: req.body.skills,
        });
      } else if (profil === "agent") {
        if (req.body.typeresponsable === "club") {
          await Agent.create({
            iduser: user.id,
            typeresponsable: req.body.typeresponsable,
            clubCovered: req.body.clubCovered,
            paysclub: req.body.paysclub,

            skills: req.body.skills,
          });
        } else if (req.body.typeresponsable === "players") {
          await Agent.create({
            iduser: user.id,
            totalCareerTransfers: req.body.totalCareerTransfers,
            typeresponsable: req.body.typeresponsable,
            totalPlayer: req.body.totalPlayer,
            pays: req.body.pays,

            skills: req.body.skills,
          });
        }
      } else if (profil === "scout") {
        await db.scout.create({
          iduser: user.id,
          engagement: req.body.engagement,
          nb_joueurdetecter: req.body.nb_joueurdetecter,
          paysscout: req.body.paysscout,
          skillsscout: req.body.skillsscout,
        });
      } else if (profil === "other") {
        await db.other.create({
          iduser: user.id,
          profession: req.body.profession,
          skillsAutre: req.body.skillsAutre,
        });
      }
      user.setRoles(roles);
    } else {
      // Default role assignment
      await user.setRoles([7]);
    }

    res.json({
      message:
        "Email verification successful. You can now proceed with your custom action."
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
};

//avant de se connecter
async function sendVerificationEmail(email, verificationLink) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification",
    html: `Click <a href="${verificationLink}">here</a> to verify your email.`,
  };

  await transporter.sendMail(mailOptions);
}

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        login: req.body.login,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    let refreshToken = await RefreshToken.createToken(user);
    let permissions = [];

    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        permissions.push("ROLE_" + roles[i].name.toUpperCase());
      }

      res.status(200).send({
        id: user.id,
        username: user.login,
        email: user.email,
        login: user.login,
        profil: user.profil,
        image: user.image,
        etat: user.etat,
        roles: permissions,
        accessToken: token,
        refreshToken: refreshToken,
      });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;
  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }
  try {
    let refreshToken = await RefreshToken.findOne({
      where: { token: requestToken },
    });
    console.log(refreshToken);
    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }
    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } });

      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }
    const user = await refreshToken.getUser();
    let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });
    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

// verifier email pour se connecter
// exports.verifyEmail = async (req, res) => {
//   try {
//     const { token } = req.query;

//     // Find user by verificationToken
//     const user = await User.findOne({ where: { verificationToken: token } });

//     if (!user) {
//       return res.status(404).json({ message: "Invalid verification token." });
//     }

//     // Check if the user is already verified
//     if (user.isVerified) {
//       return res.status(400).json({ message: "User is already verified." });
//     }

//     // Update user as verified
//     await user.update({ isVerified: true, verificationToken: null });
//     res.redirect("http://localhost:3000/login");
//     // Customize the response based on your needs
//     res.json({
//       message:
//         "Email verification successful. You can now proceed with your custom action.",
      
//     });

//     // Add your custom logic here, for example, redirecting to a specific page or triggering some other action.
//   } catch (error) {
//     // Handle errors gracefully
//     res.status(500).json({ error: error.message });
//   }
// };
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    // Find user by verificationToken
    const user = await User.findOne({ where: { verificationToken: token } });

    if (!user) {
      return res.status(404).json({ message: "Invalid verification token." });
    }

    // Check if the user is already verified
    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified." });
    }

    // Update user as verified
    await user.update({ isVerified: true, verificationToken: null });

    // Redirect to the login page
    return res.redirect("https://odine-sport.com/login");

    // No need for the JSON response here

  } catch (error) {
    // Handle errors gracefully
    res.status(500).json({ error: error.message });
  }
};

//verifier verifier ou nn son mail
exports.checkVerificationStatus = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming you are passing the userId as a parameter

    // Find user by ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the user is verified
    const isVerified = user.isVerified;

    // Customize the response based on your needs
    res.json({ isVerified });
  } catch (error) {
    // Handle errors gracefully
    res.status(500).json({ error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate a password reset token and save it in the database
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiration = Date.now() + 3600000; // Token is valid for 1 hour

    await user.update({ resetToken, resetTokenExpiration });

    // Send a password reset email
    const resetLink = `https://odine-sport.com/login/${resetToken}`;
    await sendPasswordResetEmail(user.email, resetLink);

    res.json({ message: "Password reset email sent successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  password reset
exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    // Find user by reset token
    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpiration: { [Op.gte]: Date.now() },
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token." });
    }

    // Update the user's password and clear the reset token fields
    await user.update({
      password: bcrypt.hashSync(password, 8),
      resetToken: null,
      resetTokenExpiration: null,
    });

    res.json({ message: "Password reset successful." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// email pour verifier le re reset password
async function sendPasswordResetEmail(email, resetLink) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset",
    html: `Click <a href="${resetLink}">here</a> to reset your password.`,
  };

  await transporter.sendMail(mailOptions);
}
