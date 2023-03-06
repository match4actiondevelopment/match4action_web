module.exports = migration => {
  const card = migration
    .createContentType('card')
    .name('Card')
    .description('Content type for Card component')

  card
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

  card
    .createField('variant')
    .name('Variant')
    .type('Symbol')
    .required(true)
    .validations([{ in: ['default', 'primary', 'secondary' ] }])
    .defaultValue({ 'en-US': 'default' })

  card
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

    card.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: 'Title of this component',
  })

  card
    .createField('content')
    .name('Content')
    .type('RichText')
    .localized(true)
    .required(false)
    .validations([
      {
        enabledMarks: ['bold', 'italic', 'underline'],
        message: 'Only bold, italic, and underline marks are allowed',
      },
      {
        enabledNodeTypes: [
          'heading-1',
          'heading-2',
          'heading-3',
          'heading-4',
          'heading-5',
          'heading-6',
          'ordered-list',
          'unordered-list',
          'hr',
          'blockquote',
          'hyperlink',
          'embedded-entry-inline',
          'embedded-entry-block',
        ],
        message:
          'Only heading 1, Only heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, horizontal rule, quote, block or inline entry are allowed',
      },
      {
        nodes: {
          'embedded-entry-inline': [
            {
              linkContentType: ['link'],
            },
          ],
          'embedded-entry-block': [
            {
              linkContentType: ['link'],
            },
          ],
        },
      },
    ])
    .disabled(false)
    .omitted(false)

  card
    .createField('image')
    .name('Image')
    .type('Link')
    .required(true)
    .validations([
      { linkContentType: ['image'] },
    ])
    .linkType('Entry')

  card
    .createField('link')
    .name('Link')
    .type('Link')
    .required(false)
    .validations([
      { linkContentType: ['link'] },
    ])
    .linkType('Entry')

  card.changeFieldControl('link', 'builtin', 'entryLinkEditor', {
    helpText: 'Adding a link here will make the whole card clickable.',
  })

  card.displayField('name')
}
