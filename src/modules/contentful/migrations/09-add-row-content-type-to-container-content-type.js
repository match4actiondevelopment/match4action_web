module.exports = migration => {
  const container = migration.editContentType('container')

  container
    .editField('items')
    .items({
      type: 'Link',
      validations: [{ linkContentType: ['card', 'image', 'text', 'row'] }],
      linkType: 'Entry',
    })

};

