import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { Event } from "./event.model";

/**
 * TypeScript interface describing Booking document structure.
 */
export interface IBooking extends Document {
    eventId: Types.ObjectId;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
    {
        eventId: {
            type: Schema.Types.ObjectId,
            ref: "Event",
            required: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            validate: {
                validator: (val: string) =>
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
                message: "Invalid email format",
            },
        },
    },
    { timestamps: true, strict: true }
);

/**
 * Pre-save hook:
 * - Validate that eventId references an existing Event
 */
BookingSchema.pre("save", async function (next) {
    const eventExists = await Event.exists({ _id: this.eventId });
    if (!eventExists) {
        return next(new Error("Referenced event does not exist"));
    }
    next();
});

export const Booking: Model<IBooking> =
    mongoose.models.Booking ||
    mongoose.model<IBooking>("Booking", BookingSchema);
