// schemas/navbar.ts
import { defineField } from "sanity";
import { BiNavigation } from "react-icons/bi";

export default {
  name: "navbar",
  title: "Navigation",
  type: "document",
  icon: BiNavigation,
  fields: [

    defineField({
      name: "userId",
      title: "User ID",
      type: "string",
      description: "Unique identifier for the user",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Upload your site logo",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Alternative text for the logo image",
        },
      ],
    }),
    defineField({
      name: "logoText",
      title: "Logo Text",
      type: "string",
      description: "Text to display next to or instead of the logo",
    }),
    defineField({
      name: "menuItems",
      title: "Menu Items",
      type: "array",
      description: "Add navigation menu items",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "text",
              title: "Link Text",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "href",
              title: "Link URL",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "isExternal",
              title: "Is External Link",
              type: "boolean",
              initialValue: false,
            },
            {
              name: "order",
              title: "Order",
              type: "number",
              description: "Order of the menu item",
            },
          ],
        },
      ],
    }),
  ],
};