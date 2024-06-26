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

  if (!name) {
    next("name is required");
  }
  if (!email) {
    next("Email is required");
  }
  if (!password) {
    next("password is required");
  }
  //check whether already sign up or not
  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    next("Email already registered please login");
  }

  // const user = await userModel.create({ name, email, password });
  const user = await userModel.create(req.body);

  //TOKEN
  const token = user.createJWT();

  res.status(201).send({
    success: true,
    message: "user created successfully",
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
};

//LOGIN ROUTER
export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  //validation
  if (!email || !password) {
    next("Please Provide all fields");
  }

  //find user by email
  //select method hide password field to visually represent in doc
  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    next("Invalid username or password");
  }

  //compare password
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    next("Invalid username or password");
  }

  user.password = undefined;

  //ye createJWT ek methd hai jo document pe available hai now u can access by explicit calling
  //ab humne login se or sign up se token create krliyee (matlab dono method se hi) now ab agar token same hue mtlab ki credential same h brother
  const token = user.createJWT();

  res.status(200).json({
    status: "success",
    message: "login successfully",
    user,
    token,
  });
};
