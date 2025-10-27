<!-- Query -->

```
api/home-page?populate[blocks][on][blocks.banner-slider][populate][image][fields][0]=url&populate[blocks][on][blocks.banner-slider][populate][image][fields][1]=alternativeText&populate[blocks][on][blocks.banner-slider][populate][button]=true

```
```
/api/home-page?populate[blocks][on][blocks.banner-slider][populate][image][fields][0]=url&populate[blocks][on][blocks.banner-slider][populate][image][fields][1]=alternativeText&populate[blocks][on][blocks.banner-slider][populate][button]=true
```

<!-- Global Section start -->

{
  populate: {
    header: {
      populate: {
        logo: {
          populate: {
            image: {
              fields: ["alternativeText", "url"]
            }
          }
        },
        
        navItems: true,
        cta: true,
      }
    },
    footer: {
      populate: {
        logo: {
          populate: {
            image: {
              fields: ["alternativeText", "url"]
            }
          }
        },
        linkWidget: {
          populate: {
            navItem: true,
          }
        },
        footerBottomLinks: true
      }
    }
  }
}


<!-- Query -->
/api/global?populate[header][populate][logo][populate][image][fields][0]=alternativeText&populate[header][populate][logo][populate][image][fields][1]=url&populate[header][populate][navItems]=true&populate[header][populate][cta]=true&populate[footer][populate][logo][populate][image][fields][0]=alternativeText&populate[footer][populate][logo][populate][image][fields][1]=url&populate[footer][populate][linkWidget]=true&populate[footer][populate][footerBottomLinks]=true

<!-- Global Section End -->


<!--  -->

"use strict";

/**
 * global router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::global.global", {
    config: {
        find: {
            middlewares: ["api::global.global-populate"],
        },
    },
});







"use strict";

/**
 * `global-populate` middleware
 */

const populate = {
    header: {
        populate: {
            logo: {
                populate: {
                    image: {
                        fields: ["alternativeText", "url"],
                    },
                },
            },

            navItems: true,
            cta: true,
        },
    },
    footer: {
        populate: {
            logo: {
                populate: {
                    image: {
                        fields: ["alternativeText", "url"],
                    },
                },
            },
            linkWidget: true,
            footerBottomLinks: true,
        },
    },
};

module.exports = (config, { strapi }) => {
    // Add your own logic here.
    return async (ctx, next) => {
        // console.dir(ctx.query, { depth: null });
        ctx.query.populate = populate;
        strapi.log.info("In global-populate middleware.");

        await next();
    };
};







<!-- Home page - start -->

<!-- Banner & Slider -->
api/home-page?populate[blocks][on][blocks.banner-slider][populate][slideImage][fields][0]=url&populate[blocks][on][blocks.banner-slider][populate][slideImage][fields][1]=alternativeText&populate[blocks][on][blocks.banner-slider][populate][slideImage][fields][2]=width&populate[blocks][on][blocks.banner-slider][populate][slideImage][fields][3]=height



{
  populate: {
    blocks: {
      on: {
        "blocks.banner-slider": {
          populate: {
            button: true,
            slideImage: {
              "fields": ["url", "alternativeText", "width", "height"]
            }
          }
        }
      }
    }
  }
}
<!-- Banner & Slider -->

<!-- Home page - end -->