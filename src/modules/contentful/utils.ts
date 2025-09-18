type contentfulEntry = {
  metadata: object;
  sys: { type: string; linkType: string; id: string };
  fields: object;
};

/* eslint-disable no-restricted-syntax */
export function deepCopy(inObject: any) {
  let value: any;
  let key: string;
  if (typeof inObject !== 'object' || inObject === null) {
    return inObject; // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  const outObject: { [key: string]: any } = Array.isArray(inObject) ? [] : {};

  // eslint-disable-next-line guard-for-in
  for (key in inObject) {
    value = inObject[key];

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = deepCopy(value);
  }

  return outObject;
}

/**
 * This function resolves links returned by Contentful for entry retrieval. We do this
 * independently so that we can
 * @param {object} item  - Data returned by contentful, minimally we except this object to contain:
 *    items and includes (which should contain two named arrays Entry and Asset)
 */
export function resolveLinks(
  item: any,
  includes: any,
  level = 0,
  maxLevel = 10,
  copyWith = deepCopy,
  parent: string | undefined = undefined,
  config: { ctaChild: boolean } = { ctaChild: false }
) {
  // Lets avoid circular references here, if we go too deep, it will stop at some point
  // depending on what's set in maxLevel
  if (level > maxLevel) {
    return undefined;
  }

  // This will work for both objects and arrays of items
  const fieldsToUpdate: { key: string; value: any }[] = [];

  if (item !== null && typeof item === 'object') {
    if (item?.sys?.type ?? false) {
      // Current item is a contentful object. Most likely a link
      if (item?.sys?.linkType === 'Asset') {
        // Link to a file hosted in Contentful CDN
        if ((includes?.Asset?.length ?? 0) > 0) {
          return copyWith(includes.Asset.find((x: any) => x.sys.id === item.sys.id));
          // eslint-disable-next-line no-else-return
        } else {
          console.error(`couldn't find asset ${item.sys.id}`);
        }
      } else if (item?.sys?.linkType === 'Entry') {
        // Link to another entry
        if ((includes?.Entry?.length ?? 0) > 0) {
          const inObject = includes.Entry.find((x: contentfulEntry) => x.sys.id === item.sys.id);
          return copyWith(inObject);
          // eslint-disable-next-line no-else-return
        } else {
          console.error(`couldn't find entry ${item.sys.id}`);
        }
      }
    }

    // Check all keys of the current object
    Object.entries(item).forEach(([key, value]: [string, any]) => {
      // key is either an array index or object key
      // Recursively retrive the value
      let result = resolveLinks(value, includes, key === 'fields' ? level + 1 : level, maxLevel, copyWith, key, {
        ctaChild: item?.sys?.contentType?.sys?.id === 'cta',
      });

      // If we received a value add it to the update list
      if (result !== undefined) {
        if (config.ctaChild && key === 'linkToEntry') {
          // Only set the slug of the linkedEntry to avoid circular references
          result.fields = {
            slug: result.fields.slug,
          };
        }
        fieldsToUpdate.push({ key, value: result });
      } else if (key === 'fields' && value?.linkToEntry && parent && ['cta', 'target'].includes(parent)) {
        value?.linkToEntry?.fields?.items && delete value.linkToEntry.fields.items;

        fieldsToUpdate.push({ key, value });
      }
    });

    // If changes were scheduled from calling previous values, make those changes
    // Make sure we also expand links on those, keeping maximum depth in mind
    if (fieldsToUpdate.length > 0) {
      fieldsToUpdate.forEach((rec) => {
        // eslint-disable-next-line no-param-reassign
        item[rec.key] = rec.value;
        resolveLinks(item[rec.key], includes, level, maxLevel, copyWith, rec.key);
      });
    }
  }

  return undefined;
}
