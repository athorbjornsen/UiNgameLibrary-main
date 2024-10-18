import { defineField, defineType } from 'sanity';

export const User = defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({
      name: 'username',
      type: 'string',
      title: 'Username',
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email',
    }),
    defineField({
      name: 'favourites',
      type: 'array',
      title: 'Favourites',
      of: [{ type: 'reference', to: { type: 'game' } }], 
    }),
    defineField({
      name: 'library',
      type: 'array',
      title: 'Library',
      of: [{ type: 'reference', to: { type: 'game' } }], 
    }),
  ],
});


















/*
defineField({ 
      name: 'favourites',
      title: 'Favourite games',
      type: 'array',      
      of: [{ type: 'reference', to: [{ type: 'game' }] }],
    }),

    defineField({
      name: 'mygames',
      title: 'My games',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'game' }] }],
    }),














    import { defineType, defineField } from "sanity"

export const User = defineType ({
  name: 'user',
  title: 'User',
  type: 'document',
  
  fields: [
    defineField({
      name: 'username',
      title: 'Username',
      type: 'string',
      
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      
    }),
    
    defineField({
      name: 'mygames',
      title: 'My games',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'game' }] }],
    }),






  ]
});

*/