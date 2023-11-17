import { buildCollection, buildProperty } from 'firecms'
import { Blog } from '@/types/blog'

const blogCollection = buildCollection<Blog>({
  name: 'Blogs',
  singularName: 'Blog',
  path: 'blogs',
  textSearchEnabled: true,
  permissions: () => ({
    edit: true,
    create: true,
    delete: true,
  }),
  properties: {
    id: buildProperty({
      dataType: 'string',
      name: 'ID',
      isGenerated: true,
      hideInTable: true,
    }),
    name: buildProperty({
      dataType: 'string',
      name: 'Name',
    }),
    image: buildProperty({
      dataType: 'string',
      name: 'Image',
      storage: {
        mediaType: 'image',
        storagePath: 'blog-images',
        acceptedFiles: ['image/*'],
        metadata: {
          cacheControl: 'max-age=1000000',
        },
      },
    }),
    description: buildProperty({
      dataType: 'string',
      name: 'Description',
    }),
    url: buildProperty({
      dataType: 'string',
      name: 'url',
    }),
    date: buildProperty({
      dataType: 'date',
      name: 'Date',
      autoValue: 'on_create',
    }),
  },
})
export default blogCollection
