import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array', 
      of: [ {type: 'block'}, {type:'image'} ]
    }),
    defineField(   {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}]
    }),
    defineField(   {
      name: 'related',
      title: 'Related',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'post'}]}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      subtitle: ''
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
