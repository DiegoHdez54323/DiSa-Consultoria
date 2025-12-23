import {defineType, defineField} from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Entrada de blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(120),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'excerpt',
      title: 'Resumen',
      type: 'text',
      rows: 3,
      description: 'Resumen corto que se usará en tarjetas y listados de blog.',
      validation: (Rule) => Rule.required().min(20).max(500),
    }),

    defineField({
      name: 'mainImage',
      title: 'Imagen principal',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          description: 'Describe la imagen para accesibilidad y SEO.',
        }),
      ],
    }),

    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'readTime',
      title: 'Tiempo de lectura (minutos)',
      type: 'number',
      description: 'Tiempo estimado de lectura, por ejemplo 5, 7, 10.',
      validation: (Rule) => Rule.min(1).max(60),
    }),

    defineField({
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      description: 'Marca esta opción si quieres que el post sea marcado como destacado.',
      initialValue: false,
    }),

    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{type: 'blogAuthor'}],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'categories',
      title: 'Categorías',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'blogCategory'}],
        },
      ],
      validation: (Rule) => Rule.min(1).max(1),
    }),

    defineField({
      name: 'body',
      type: 'blockContent',
    }),
  ],

  orderings: [
    {
      title: 'Más recientes primero',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'author.name', // ajusta si tu author usa otro campo (p.ej. author.fullName)
      media: 'mainImage',
    },
  },
})
