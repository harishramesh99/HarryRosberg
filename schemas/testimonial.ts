// schemas/review.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: "userId",
      title: "User ID",
      type: "string",
      description: "Unique identifier for the user",
    }),
    defineField({
      name: 'author_name',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'author_url',
      title: 'Author URL',
      type: 'url'
    }),
    defineField({
      name: 'profile_photo_url',
      title: 'Profile Photo',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5)
    }),
    defineField({
      name: 'text',
      title: 'Review Text',
      type: 'text',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'time',
      title: 'Review Date',
      type: 'datetime',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'isGoogleReview',
      title: 'Is Google Review',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      hidden: true
    })
  ],
  preview: {
    select: {
      title: 'author_name',
      subtitle: 'rating',
      media: 'profile_photo_url'
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: `Rating: ${subtitle} stars`,
        media
      };
    }
  }
});