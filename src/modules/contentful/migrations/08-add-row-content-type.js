module.exports = migration => {
  const row = migration
    .createContentType('row')
    .name('Row')
    .description('Content type for Row component')

  row
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

  row
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

  row
    .createField('direction')
    .name('Columns')
    .type('Symbol')
    .validations([
      {
        in: [
          'row',
          'row-reverse',
          'column',
          'column-reverse',
        ],
      },
    ])
    .defaultValue({ 'en-US': 'row' })

  row
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

  row.displayField('name')
}
