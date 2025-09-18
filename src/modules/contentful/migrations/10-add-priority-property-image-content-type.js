module.exports = migration => {
  const image = migration.editContentType('Image')

  image
    .createField('priority')
    .name('Priority')
    .type('Boolean')
    .defaultValue({ 'en-US': false })
    .disabled(false)

};
