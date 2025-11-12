import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters long"],
    },
    cartItems: [
        {
            quantity: {
                type: Number,
                default: 1,
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
        }
    ],
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer",
    },
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

// Pre save hook to hash password
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (error) {
            next(error)
        }
    }
    next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export default User;

