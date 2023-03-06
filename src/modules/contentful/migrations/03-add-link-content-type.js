module.exports = migration => {

  const link = migration
    .createContentType('Link')
    .name('Link')
    .description('Content type for Link component')

  link
    .createField('name')
    .name('Name')
    .type('Symbol')
    .localized(false)
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
    .disabled(false)
    .omitted(false)

  link
    .createField('label')
    .name('Label')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  link
    .createField('variant')
    .name('Variant')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['None', 'Link', 'Button - Solid', 'Button - Outline'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .defaultValue({ 'en-US': 'none' })

  link.changeFieldControl('variant', 'builtin', 'dropdown', {
    helpText: 'Please select a style of the link.',
  })

  link
    .createField('url')
    .name('Url')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        regexp: {
          pattern:
            '(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-/]))?$',
        },
      },
    ])
    .disabled(false)
    .omitted(false)

  link.changeFieldControl('url', 'builtin', 'singleLine', {
    helpText:
      'Add a url starting with https:// to generate a link that opens in a new tab.',
  })

  link
    .createField('linkToEntry')
    .name('Link to an Entry')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['page'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry')

  link.changeFieldControl('linkToEntry', 'builtin', 'entryLinkEditor', {
    helpText:
      'You can link to an existent page that will generate a relative path url link. This takes priority over Link to URL.',
  })


  link.displayField('name')

}
