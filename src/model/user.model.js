//IMPORT
import db from "../db/conn";
import userSchema from "../schema/user.schema";

//Creating user model
const UserModel = db.model("User", userSchema);

export default UserModel;
