import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { SchemaTypeDefinition } from 'sanity'; 
import { Game } from './schemaTypes/Game.js'; 
import { User } from './schemaTypes/User.js'; 

export default defineConfig({
  name: 'default',
  title: 'gamelib',

  projectId: '6hz8ie6d',
  dataset: 'production',
  token: 'skYqsPViozZVBk3XeXgbkjgusLqmIS3Pr8Cju5L7Ql4Ix3GDrgVDnDgRojJ6FN3rVlAoINMmWVnihaMweEtdZYzufy2KYGOJiVnOC0EbnZtxZJh4aOVTYwhquYS6u6IyTXXdJJP9Kx4YDeJC3x3LSa7ge7fmem74703mcrj9vjtCIZvZu6vp',
//
  plugins: [structureTool(), visionTool()],

 
  schema: {
    types: [Game, User] 
  }})
