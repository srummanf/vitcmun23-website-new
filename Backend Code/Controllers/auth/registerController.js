import joi from "joi";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import { User } from "../../model";
import bcrypt from "bcrypt";

const registerController = {
  async register(req, res, next) {
    const registerSchema = joi.object({
      name: joi.string().min(3).max(30).required(),
      email: joi.string().email().required(),
      password: joi
        .string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      repeat_password: joi.ref("password"),
    });

    const { error } = registerSchema.validate(req.body);
    // console.log(req.body);

    if (error) {
      return next(error);
    }

    // Register Logic
    try {
      const exist = await User.exists({ email: req.body.email });
    //   console.log(exist);
      if (exist) {
        return next(
          CustomErrorHandler.alreadyExists("Email already taken!!!")
        );
      }
    } catch (err) {
      return next(err);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);


    // Prepare the model
    const { name, email} = req.body;
    const user = new User({
        name,
        email,
        password : hashedPassword,
      });

    try{
        const result = await user.save();
    }catch(err){
        return next(err)
    }

    
    res.send("Registerd successfully!!!");
  },
};

export default registerController;
