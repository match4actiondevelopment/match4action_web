module.exports = (migration) => {
  const text = migration
    .createContentType('Text')
    .name('Text')
    .description('Content type for Text component')

  text
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

  text
    .createField('text')
    .name('Text')
    .type('RichText')
    .localized(false)
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
          'entry-hyperlink',
          'asset-hyperlink',
          'embedded-entry-inline',
          'embedded-entry-block',
        ],
        message:
          'Only heading 1, Only heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, horizontal rule, quote, block entry, link to Url, link to asset and link to entry nodes are allowed',
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
              linkContentType: ['image', 'link'],
            },
          ],
        },
      },
    ])
    .disabled(false)
    .omitted(false)

  text
    .createField('textAlignment')
    .name('Text Alignment')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['Left', 'Center', 'Right'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .defaultValue({ 'en-US': 'Left' })

  text.changeFieldControl('textAlignment', 'builtin', 'radio', {
    helpText: 'Choose the alignment for the text',
  })

  text.displayField('name')
}
