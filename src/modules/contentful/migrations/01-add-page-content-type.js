module.exports = migration => {
  /**
   * Format for migration objects
   * 1.) field (id)
   * 2.) name (Capitalized)
   * 3.) type
   * 4.) localized
   * 5.) required
   * 6.) validations
   * 7.) disabled
   * 8.) omitted
   * 9.) items
   */
  const page = migration
    .createContentType('Page')
    .description('Content type for Page component')
    .name('Page')

  page
    .createField('slug')
    .name('Slug')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      { unique: false },
      {
        regexp: {
          pattern: "^((\\/)|(([\\/\\w\\-\\._~:!$&'\\(\\)*+,;@]|(%\\d+))+))$",
        },
      },
    ])

  page
    .createField('pageTitle')
    .name('Page Title')
    .type('Symbol')
    .localized(true)
    .required(true)

  page
    .displayField('slug')
};
