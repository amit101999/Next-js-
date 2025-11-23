import mongoose, { Schema, Document, Model } from "mongoose";
import slugify from "slugify";

/**
 * TypeScript interface describing Event document structure.
 */
export interface IEvent extends Document {
    title: string;
    slug: string;
    description: string;
    overview: string;
    image: string;
    venue: string;
    location: string;
    date: string; // stored as ISO string
    time: string; // normalized time format (HH:mm)
    mode: string;
    audience: string;
    agenda: string[];
    organizer: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, unique: true, index: true },
        description: { type: String, required: true },
        overview: { type: String, required: true },
        image: { type: String, required: true },
        venue: { type: String, required: true },
        location: { type: String, required: true },
        date: { type: String, required: true },
        time: { type: String, required: true },
        mode: { type: String, required: true },
        audience: { type: String, required: true },
        agenda: { type: [String], required: true },
        organizer: { type: String, required: true },
        tags: { type: [String], required: true },
    },
    { timestamps: true, strict: true }
);

/**
 * Pre-save hook:
 * - Generate slug from title (only if modified)
 * - Normalize date to ISO
 * - Normalize time to HH:mm format
 */
EventSchema.pre("save", function (next: mongoose.HookNextFunction) {
    // Generate slug only when title changes
    if (this.isModified("title")) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }

    // Validate and normalize date → ISO format
    if (this.isModified("date")) {
        const parsedDate = new Date(this.date);
        if (isNaN(parsedDate.getTime())) {
            return next(new Error("Invalid date format"));
        }
        this.date = parsedDate.toISOString().split("T")[0]; // store only YYYY-MM-DD
    }

    // Normalize time → HH:mm
    if (this.isModified("time")) {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!timeRegex.test(this.time)) {
            return next(new Error("Time must be in HH:mm format"));
        }
    }

    next();
});

export const Event: Model<IEvent> =
    mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
