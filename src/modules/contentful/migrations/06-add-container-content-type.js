module.exports = migration => {
  const container = migration
    .createContentType('container')
    .name('Container')
    .description('Content type for Container component')

  container
    .createField('name')
    .name('Name')
    .type('Symbol')
    .required(true)
    .validations([
      {
        unique: true,
      },
      {
        regexp: {
          pattern: '^[a-z0-9\\-\\_]+$',
          flags: null,
        },

        message:
          'Name may only contain lower case characters, underscores, digits and/or dashes',
      },
    ])

  container
    .createField('fullWidth')
    .name('Full Width')
    .type('Boolean')
    .defaultValue({ 'en-US': false })
    .disabled(false)

  container
    .createField('variant')
    .name('Variant')
    .type('Symbol')
    .required(true)
    .validations([{ in: ['default', 'carousel' ] }])
    .defaultValue({ 'en-US': 'default' })

  container
    .createField('columns')
    .name('Columns')
    .type('Symbol')
    .validations([
      {
        in: [
          '1',
          '2',
          '3',
          '4',
        ],
      },
    ])
    .defaultValue({ 'en-US': '1' })

  container
    .createField('background')
    .name('Background')
    .type('Boolean')
    .defaultValue({ 'en-US': false })
    .disabled(false)

  container
    .createField('reorderItems')
    .name('Reorder Items')
    .type('Boolean')
    .defaultValue({ 'en-US': false })
    .disabled(false)

  container
    .createField('columns')
    .name('Columns')
    .type('Symbol')
    .validations([
      {
        in: [
          '1',
          '2',
          '3',
          '4',
        ],
      },
    ])
    .defaultValue({ 'en-US': '1' })

  container
    .createField('marginBottom')
    .name('Margin Bottom')
    .type('Symbol')
    .validations([
      {
        in: [
          '1rem',
          '1.5rem',
          '2rem',
          '2.5rem',
          '3rem',
          '3.5rem',
          '4rem',
          '4.5rem',
          '5rem',
        ],
      },
    ])
    .defaultValue({ 'en-US': '1rem' })


  container
    .createField('items')
    .name('Items')
    .type('Array')
    .required(true)
    .validations([{ size: { min: 1, max: 12 } }])
    .items({
      type: 'Link',
      validations: [{ linkContentType: ['card', 'image', 'text'] }],
      linkType: 'Entry',
    })

  container.displayField('name')
}
