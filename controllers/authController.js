import userModel from "../model/userModel.js";

/*
export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //validate
    if (!name) {
      return res.status(400).send({
        success: "false",
        message: "please Provide Name",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: "false",
        message: "Please provide Email",
      });
    }
    if (!password) {
      return res.status(400).send({
        success: "false",
        message: "Please provide password",
      });
    }
    const existingUser = await userModel.findOne({ email });

    //agar same email id se already koi user h to
    if (existingUser) {
      return res.status(200).send({
        success: "false",
        message: "Email already registered please login",
      });
    }
    const user = await userModel.create({ name, email, password });
    res.status(201).send({
      success: true,
      message: "user created successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: "false",
      message: "Error in registered Controller",
      err: err,
    });

  }
};
*/

////////////////////////////////////////////////////////////
//// NEXT KA kamaal

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  //   //   if (!name) {
  //   //     next("name is required");
  //   //   }
  //   //   if (!email) {
  //   //     next("Email is required");
  //   //   }
  //   //   if (!password) {
  //   //     next("password is required");
  //   //   }
  //   const existingUser = await userModel.findOne({ email });

  //   if (existingUser) {
  //     next("Email already registered please login");
  //   }

  const user = await userModel.create({ name, email, password });

  res.status(201).send({
    success: true,
    message: "user created successfully",
    user,
  });
};
