import {CaseIcon} from '@sanity/icons'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default {
  title: 'Project',
  name: 'project',
  type: 'document',
  icon: CaseIcon,
  orderings: [orderRankOrdering],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection: any) {
      const {title} = selection
      return {
        title: `${title}`,
      }
    },
  },
  fields: [
    orderRankField({type: 'project'}),
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        maxLength: 200,
        source: 'title',
        slugify: (input: string) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
      description: 'e.g. UX/UI, Development [Copywriting by Greer.co]',
    },
    {
      title: 'Site URL',
      name: 'siteUrl',
      type: 'url',
    },
    {
      title: 'Desktop Media',
      name: 'desktopMedia',
      type: 'mux.video',
    },
    {
      title: 'Mobile Media',
      name: 'mobileMedia',
      type: 'mux.video',
    },
  ],
}
