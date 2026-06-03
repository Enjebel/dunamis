import mongoose from 'mongoose';

const NewsPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, enum: ['News', 'Daily Activity', 'Event', 'Blog'], default: 'News' },
    excerpt: { type: String },
    body: { type: String, required: true },
    coverImage: { type: String },
    mediaUrl: { type: String },
    mediaType: { type: String, enum: ['image', 'video', 'none'], default: 'none' },
    media: [
      {
        url: { type: String, required: true },
        type: { type: String, enum: ['image', 'video'], required: true },
        originalName: { type: String },
      },
    ],
    author: { type: String, default: 'Dunamis Administration' },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model('NewsPost', NewsPostSchema);
