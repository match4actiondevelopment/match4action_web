module.exports = migration => {

  const image = migration
    .createContentType('Image')
    .name('Image')
    .description('Content type for Image component')

  image
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

  image
    .createField('alignment')
    .name('Alignment')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['Start', 'Center', 'End'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .defaultValue({ 'en-US': 'Start' })


  image
    .createField('image')
    .name('Image')
    .type('Link')
    .required(true)
    .validations([{ linkMimetypeGroup: ['image'] }])
    .linkType('Asset')

  image
    .displayField('name')

};
