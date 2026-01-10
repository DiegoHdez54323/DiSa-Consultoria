import { defineType, defineField, defineArrayMember } from "sanity";
import { defineCliConfig } from "sanity/cli";
import { portfolioCategory } from "./portfolioCategory";

export const portfolioType = defineType({
  name: 'portfolioType',
  title: 'Portfolio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titulo',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(80),
    }),

    //Slug para el url
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    //Imagen Hero
    defineField({
      name: 'heroImage',
      title: 'Imagen Hero',
      type: 'image',
      description: "Imagen grande y de alta calidad para la cabecera del articulo.",
      options: {hotspot: true},
    }),

    //Galeria de Imagenes
    defineField({
      name: 'gallery',
      title: 'Galeria del Proyecta',
      type: 'array',
      description: 'Carrusel de imagenes extra del proyecto',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Texto alternativo',
              type: 'string',
            })
          ]
        })
      ]
    }),

    //Subtitulo
    defineField({
      name: 'subtitle',
      title: 'Subtitulado',
      type: 'string',
    }),

    defineField({
      name: 'categories',
      title: 'Categoría',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'portfolioCategory'}],
        },
      ],
      validation: (Rule) => Rule.min(1).error('Selecciona al menos una categoría.'),
    }),

    //Idustrias
    defineField({
      name: 'industries',
      title: 'Industrias',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    }),

    defineField({
      name: 'description',
      title: 'Descripción Corta',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().min(20),
    }),

    //Reto
    defineField({
      name: 'challenge',
      title: 'El Reto',
      type: 'text',
      rows: 5,
    }),

    //Cita
    defineField({
      name: 'quote',
      title: 'Cita Destacada',
      type: 'object',
      fields: [
        defineField({name: 'text', title: 'Texto', type: 'text', rows: 3}),
        defineField({name: 'author', title: 'Autor', type: 'string'}),
      ]
    }),

    //Que logramos 
    defineField({
      name: 'results',
      title: '¿Que logramos?',
      type: 'array',
      of : [
        defineArrayMember({
          type: 'object',
          title: 'Logro',
          fields: [
            defineField({name: 'title', title: 'Titulo del Logro', type: 'string'}),
            defineField({name: 'description', title: 'Descripcion', type: 'text', rows: 3}),
          ]
        })
      ]
    }),

    //Como lo hicimos
    defineField({
      name: 'process',
      title: '¿Como lo hicimos?',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Paso del Proceso',
          fields: [
            defineField({name: 'title', title: 'Fase', type: 'string'}),
            defineField({name: 'description', title: 'Descripción', type: 'text', rows: 3}),
          ]
        })
      ]
    }),

    defineField({
      name: 'technologies',
      title: 'Tecnologias',
      type: 'array',
      of: [
        {
          type: 'string'
        }
      ],
      description: 'Lista de bullets',
      validation: (Rule) => Rule.min(1),
    }),

    defineField({
      name: 'image',
      title: 'Imagen Principal',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alterenativo',
          type: 'string',
          description: 'Describe la imagen para accesibilidad y SEO',
          validation: (Rule) => Rule.required().error('Añade un texto alternativo para la imagen'),
        }),
      ],
    }),

    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Clase de Tailwind para el color de acento.',
    }),

    defineField({
      name: 'gradient',
      title: 'Gradient',
      type: 'string',
      description: 'Clase de Tailwind para el color de gradient',
    }),

    defineField({
      name: 'year',
      title: 'Año',
      type: 'string',
      description: 'Año en el que se desarrollo el proyecto.',
    }),

    defineField({
      name: 'link',
      title: 'Enlace al Proyecto',
      type: 'url',
      description: 'La URL completa al sitio web del proyecto',
      validation: (Rule) => Rule.uri({
        scheme: ['http', 'https']
      })
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'image',
    },
  },
})