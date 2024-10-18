import { defineField, defineType } from 'sanity';

export const Game = defineType({
  name: 'game',
  title: 'Game',
  type: 'document',

  fields: [
    defineField({
      name: 'rawgid',
      type: 'string',
      title: 'RAWG ID',
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'releaseyear',
      type: 'number',
      title: 'Release Year',
    }),
    defineField({
      name: 'hoursplayed',
      type: 'number',
      title: 'Hours Played',
    }),
    defineField({
      name: 'genre',
      type: 'string',
      title: 'Genre',
    }), 
  ],
});
