import { defineConfig } from "sanity";
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from "./schemas";
import deskStructure from './sanity/structure';

export default defineConfig({
  name: "sanity-nextjs-site",
  title: "Sanity Next.js Site",  //commit
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: "production",
  basePath: "/studio",
  plugins: [
    deskTool({
      structure: deskStructure
    }),
    visionTool()
  ],
  schema: {
    types: schemaTypes
  }
});