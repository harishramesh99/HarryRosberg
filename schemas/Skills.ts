import { BiUser } from "react-icons/bi";
import { defineField } from "sanity";

const skills = {
  name: "skills",
  title: "Skills",
  description: "Skills Schema",
  type: "document",
  icon: BiUser,
  fields: [
    defineField({
      name: "userId",
      title: "User ID",
      type: "string",
      description: "Unique identifier for the user",
    }),
    defineField({
      name: "title",
      title: "Skill Title",
      type: "string",
      description: "Enter the name of the skill",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Skill Description",
      type: "string",
      description: "Write a brief description of the skill",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Add an emoji or icon to represent the skill (e.g., 💻, 🎨)",
    }),
    defineField({
      name: "highlight",
      title: "Highlight",
      type: "boolean",
      description: "Mark this skill as highlighted",
    }),
    defineField({
        name: "Headline",
        title: "Headline",
        type: "string",
        description: "skill headline",
      }),
  ],
};

export default skills;
