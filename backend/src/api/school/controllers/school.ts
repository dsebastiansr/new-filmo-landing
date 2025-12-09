/**
 * school controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::school.school', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;
    const onlyLast = query.lastProm === 'true';

    // 1. Obtener schools con medias básicas
    const schools = await strapi.entityService.findMany('api::school.school', {
      ...query,
      populate: {
        schoolLogo: true,
        schoolCover: true,
        proms: onlyLast
          ? false
          : {
              populate: {
                promCover: true,
                promPics: true, // ← AÑADIDO
              },
            },
      },
    });

    // 2. Si quieren solo la última promoción
    if (onlyLast) {
      for (const school of schools) {
        const lastProm = await strapi.entityService.findMany('api::prom.prom', {
          filters: {
            school: school.id,
          },
          sort: { promId: 'desc' },
          limit: 1,
          populate: {
            promCover: true,
          },
        });

        school.proms = lastProm;
      }
    }

    return { data: schools };
  },
}));
