import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            default:
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
    },
    { timestamps: true }
);

// Pre-save middleware to set default for empty or null values
userSchema.pre('save', function (next) {
  if (this.profilePicture === null || this.profilePicture === "") {
      this.profilePicture =
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
  }
  // Continue with the save operation
  next();
});

const User = mongoose.model("User", userSchema);
export default User;