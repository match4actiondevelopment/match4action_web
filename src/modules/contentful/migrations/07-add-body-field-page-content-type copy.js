module.exports = migration => {
  const page = migration.editContentType('Page')

  page
    .createField('items')
    .name('Items')
    .type('Array')
    .items({
      type: 'Link',
      validations: [
        {
          linkContentType: [
            'container',
            'image',
            'text',
          ],
        },
      ],
      linkType: 'Entry',
    })

};
