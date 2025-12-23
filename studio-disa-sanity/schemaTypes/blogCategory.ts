import {defineType, defineField} from 'sanity'

export const blogCategory = defineType({
  name: 'blogCategory',
  title: 'Categoría de blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(80),
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
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
      description: 'Describe qué tipo de temas entran en esta categoría.',
    }),

    // ✅ Ayuda a clasificar tópicos automáticamente
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description:
        'Palabras clave que suelen aparecer en temas de esta categoría (10–30 ideal). Ej: "astro", "sanity", "ssg", "vercel".',
      validation: (Rule) => Rule.unique(),
    }),

    // ✅ Evita falsos positivos en clasificación
    defineField({
      name: 'avoidKeywords',
      title: 'Keywords a evitar',
      type: 'array',
      of: [{type: 'string'}],
      description:
        'Palabras que indican que un tema NO pertenece a esta categoría. Ej: "finanzas", "política".',
      validation: (Rule) => Rule.unique(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
  },
})
