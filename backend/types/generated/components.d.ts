import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksAboutContent extends Struct.ComponentSchema {
  collectionName: 'components_blocks_about_contents';
  info: {
    displayName: 'Feature Content';
    icon: 'layout';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    cta: Schema.Attribute.Component<'elements.link', false>;
    is_right: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    section_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    title: Schema.Attribute.String;
  };
}

export interface BlocksAdventuresEscapes extends Struct.ComponentSchema {
  collectionName: 'components_blocks_adventures_escapes';
  info: {
    displayName: 'Adventures Escapes';
    icon: 'plus';
  };
  attributes: {
    about_content: Schema.Attribute.Text;
    about_cta: Schema.Attribute.Component<'elements.link', false>;
    about_left_image: Schema.Attribute.Media<'images'>;
    about_right_image: Schema.Attribute.Media<'images'>;
    cta: Schema.Attribute.Component<'elements.link', false>;
    first_image: Schema.Attribute.Media<'images'>;
    first_title: Schema.Attribute.String;
    fourth_title: Schema.Attribute.String;
    second_image: Schema.Attribute.Media<'images'>;
    second_title: Schema.Attribute.String;
    third_image: Schema.Attribute.Media<'images'>;
    third_title: Schema.Attribute.String;
  };
}

export interface BlocksBannerSlider extends Struct.ComponentSchema {
  collectionName: 'components_blocks_banner_sliders';
  info: {
    displayName: 'Banner Slider';
  };
  attributes: {
    button: Schema.Attribute.Component<'elements.link', false>;
    description: Schema.Attribute.Text;
    slideImage: Schema.Attribute.Media<'images', true>;
    sub_title: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BlocksDiscoverScuba extends Struct.ComponentSchema {
  collectionName: 'components_blocks_discover_scubas';
  info: {
    displayName: 'Discover Scuba';
    icon: 'picture';
  };
  attributes: {
    discover_scuba_img: Schema.Attribute.Component<'elements.image', true>;
  };
}

export interface BlocksFeatures extends Struct.ComponentSchema {
  collectionName: 'components_blocks_features';
  info: {
    displayName: 'Features';
    icon: 'stack';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.link', false>;
    features_card: Schema.Attribute.Component<'elements.image-box', true>;
    heading: Schema.Attribute.Component<'elements.section-heading', false>;
    starting_price: Schema.Attribute.String;
  };
}

export interface BlocksFeaturesOverview extends Struct.ComponentSchema {
  collectionName: 'components_blocks_features_overviews';
  info: {
    displayName: 'Features Overview';
    icon: 'stack';
  };
  attributes: {
    condition: Schema.Attribute.Component<'elements.conditions', false>;
    description: Schema.Attribute.Text;
    feature_list: Schema.Attribute.Component<'elements.icon-list', true>;
    is_others_info: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    isOverview: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    other_info_content: Schema.Attribute.Component<
      'elements.others-info-structure',
      true
    >;
    others_info_title: Schema.Attribute.String;
    package_inclusions: Schema.Attribute.Component<
      'elements.package-inclusions-wrapper',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface BlocksGallery extends Struct.ComponentSchema {
  collectionName: 'components_blocks_galleries';
  info: {
    displayName: 'Gallery';
    icon: 'landscape';
  };
  attributes: {
    gallery_image: Schema.Attribute.Media<'images', true>;
  };
}

export interface BlocksHomeFaq extends Struct.ComponentSchema {
  collectionName: 'components_blocks_home_faqs';
  info: {
    displayName: 'Langing Page Faq';
    icon: 'bulletList';
  };
  attributes: {
    section_heading: Schema.Attribute.Component<
      'elements.section-heading',
      false
    >;
    section_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
  };
}

export interface BlocksMap extends Struct.ComponentSchema {
  collectionName: 'components_blocks_maps';
  info: {
    displayName: 'Map';
    icon: 'earth';
  };
  attributes: {
    map_link: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksProfessionalCourses extends Struct.ComponentSchema {
  collectionName: 'components_blocks_professional_courses';
  info: {
    displayName: 'Professional Courses';
    icon: 'crown';
  };
  attributes: {
    section_heading: Schema.Attribute.Component<
      'elements.section-heading',
      false
    >;
  };
}

export interface BlocksSubBanner extends Struct.ComponentSchema {
  collectionName: 'components_blocks_sub_banners';
  info: {
    displayName: 'Sub Banner';
    icon: 'landscape';
  };
  attributes: {
    background: Schema.Attribute.Media<'images'>;
    content: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BlocksSubHeader extends Struct.ComponentSchema {
  collectionName: 'components_blocks_sub_headers';
  info: {
    displayName: 'sub_header';
    icon: 'chartBubble';
  };
  attributes: {
    description: Schema.Attribute.Text;
    feature_list: Schema.Attribute.Component<'elements.icon-list', true>;
    sub_title: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_blocks_testimonials';
  info: {
    displayName: 'Testimonial';
    icon: 'star';
  };
  attributes: {
    section_heading: Schema.Attribute.Component<
      'elements.section-heading',
      false
    >;
  };
}

export interface BlocksUnderwaterAdventure extends Struct.ComponentSchema {
  collectionName: 'components_blocks_underwater_adventures';
  info: {
    displayName: 'Underwater Adventure';
    icon: 'dashboard';
  };
  attributes: {
    highlight_content: Schema.Attribute.Component<'elements.content-box', true>;
    right_content: Schema.Attribute.Component<'elements.content-box', false>;
  };
}

export interface BlocksWhyChooseUs extends Struct.ComponentSchema {
  collectionName: 'components_blocks_why_choose_uses';
  info: {
    displayName: 'Why choose us';
    icon: 'cup';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.link', false>;
    heading: Schema.Attribute.Component<'elements.section-heading', false>;
    section_img: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
  };
}

export interface ElementsConditions extends Struct.ComponentSchema {
  collectionName: 'components_elements_conditions';
  info: {
    displayName: 'conditions';
    icon: 'connector';
  };
  attributes: {
    condition_content: Schema.Attribute.Blocks;
    isConditionContent: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    list: Schema.Attribute.Component<'elements.list-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface ElementsContentBox extends Struct.ComponentSchema {
  collectionName: 'components_elements_content_boxes';
  info: {
    displayName: 'Content Box';
    icon: 'grid';
  };
  attributes: {
    content: Schema.Attribute.Text;
    cta: Schema.Attribute.Component<'elements.link', false>;
    sub_title: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ElementsFooterWidget extends Struct.ComponentSchema {
  collectionName: 'components_elements_footer_widgets';
  info: {
    displayName: 'Footer widget';
  };
  attributes: {
    navItem: Schema.Attribute.Component<'elements.link', true>;
    title: Schema.Attribute.String;
  };
}

export interface ElementsIconList extends Struct.ComponentSchema {
  collectionName: 'components_elements_icon_lists';
  info: {
    displayName: 'Icon list';
    icon: 'star';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsImage extends Struct.ComponentSchema {
  collectionName: 'components_elements_images';
  info: {
    displayName: 'Image';
    icon: 'landscape';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface ElementsImageBox extends Struct.ComponentSchema {
  collectionName: 'components_elements_image_boxes';
  info: {
    displayName: 'Image Box';
    icon: 'landscape';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface ElementsIsIncludeFeature extends Struct.ComponentSchema {
  collectionName: 'components_elements_is_include_features';
  info: {
    displayName: 'is_include_feature';
    icon: 'hashtag';
  };
  attributes: {
    features: Schema.Attribute.Component<'elements.title-with-list', true>;
    title: Schema.Attribute.String;
  };
}

export interface ElementsLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_links';
  info: {
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.DefaultTo<'/'>;
    isButtonLink: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Button'>;
    type: Schema.Attribute.Enumeration<['primary', 'secondary']>;
  };
}

export interface ElementsListItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_list_items';
  info: {
    displayName: 'list_item';
    icon: 'layer';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    sub_title: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ElementsLogoLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_logo_links';
  info: {
    displayName: 'LogoLink';
  };
  attributes: {
    href: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String;
  };
}

export interface ElementsOthersInfoStructure extends Struct.ComponentSchema {
  collectionName: 'components_elements_others_info_structures';
  info: {
    displayName: 'others_info_structure';
    icon: 'server';
  };
  attributes: {
    list: Schema.Attribute.Component<'elements.text-list', true>;
    title: Schema.Attribute.String;
  };
}

export interface ElementsPackageInclusionsWrapper
  extends Struct.ComponentSchema {
  collectionName: 'components_elements_package_inclusions_wrappers';
  info: {
    displayName: 'package_inclusions_wrapper';
    icon: 'layer';
  };
  attributes: {
    feature_part: Schema.Attribute.Component<'elements.title-with-list', true>;
    main_title: Schema.Attribute.String;
  };
}

export interface ElementsPackageMinimalCard extends Struct.ComponentSchema {
  collectionName: 'components_elements_package_minimal_cards';
  info: {
    displayName: 'package_minimal_card';
    icon: 'oneToOne';
  };
  attributes: {
    current_price: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    regular_price: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    service_img: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface ElementsSectionHeading extends Struct.ComponentSchema {
  collectionName: 'components_elements_section_headings';
  info: {
    displayName: 'Section heading';
    icon: 'star';
  };
  attributes: {
    description: Schema.Attribute.Text;
    sub_title: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ElementsSingleCourse extends Struct.ComponentSchema {
  collectionName: 'components_elements_single_courses';
  info: {
    displayName: 'Single Course';
    icon: 'folder';
  };
  attributes: {
    availability: Schema.Attribute.String;
    book_now_cta: Schema.Attribute.Component<'elements.link', false>;
    description: Schema.Attribute.Text;
    duration: Schema.Attribute.String;
    featured_image: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    offerPrice: Schema.Attribute.Integer;
    price: Schema.Attribute.Integer & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsTestimony extends Struct.ComponentSchema {
  collectionName: 'components_elements_testimonies';
  info: {
    displayName: 'Testimony Item';
    icon: 'landscape';
  };
  attributes: {
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    designation: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    rating: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      >;
  };
}

export interface ElementsTextList extends Struct.ComponentSchema {
  collectionName: 'components_elements_text_lists';
  info: {
    displayName: 'text_list';
    icon: 'bulletList';
  };
  attributes: {
    text_list_item: Schema.Attribute.String;
  };
}

export interface ElementsTitleWithList extends Struct.ComponentSchema {
  collectionName: 'components_elements_title_with_lists';
  info: {
    displayName: 'title_with_list';
    icon: 'bulletList';
  };
  attributes: {
    content: Schema.Attribute.Text;
    feature: Schema.Attribute.Component<'elements.text-list', true>;
    isContent: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isService: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    package_list: Schema.Attribute.Component<
      'elements.package-minimal-card',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    copyright: Schema.Attribute.Text;
    description: Schema.Attribute.Text;
    footerBottomLinks: Schema.Attribute.Component<'elements.link', true>;
    linkWidget: Schema.Attribute.Component<'elements.footer-widget', true>;
    logo: Schema.Attribute.Component<'elements.logo-link', false>;
  };
}

export interface LayoutHeader extends Struct.ComponentSchema {
  collectionName: 'components_layout_headers';
  info: {
    displayName: 'Header';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.link', true>;
    logo: Schema.Attribute.Component<'elements.logo-link', false>;
    navItems: Schema.Attribute.Component<'elements.link', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.about-content': BlocksAboutContent;
      'blocks.adventures-escapes': BlocksAdventuresEscapes;
      'blocks.banner-slider': BlocksBannerSlider;
      'blocks.discover-scuba': BlocksDiscoverScuba;
      'blocks.features': BlocksFeatures;
      'blocks.features-overview': BlocksFeaturesOverview;
      'blocks.gallery': BlocksGallery;
      'blocks.home-faq': BlocksHomeFaq;
      'blocks.map': BlocksMap;
      'blocks.professional-courses': BlocksProfessionalCourses;
      'blocks.sub-banner': BlocksSubBanner;
      'blocks.sub-header': BlocksSubHeader;
      'blocks.testimonial': BlocksTestimonial;
      'blocks.underwater-adventure': BlocksUnderwaterAdventure;
      'blocks.why-choose-us': BlocksWhyChooseUs;
      'elements.conditions': ElementsConditions;
      'elements.content-box': ElementsContentBox;
      'elements.footer-widget': ElementsFooterWidget;
      'elements.icon-list': ElementsIconList;
      'elements.image': ElementsImage;
      'elements.image-box': ElementsImageBox;
      'elements.is-include-feature': ElementsIsIncludeFeature;
      'elements.link': ElementsLink;
      'elements.list-item': ElementsListItem;
      'elements.logo-link': ElementsLogoLink;
      'elements.others-info-structure': ElementsOthersInfoStructure;
      'elements.package-inclusions-wrapper': ElementsPackageInclusionsWrapper;
      'elements.package-minimal-card': ElementsPackageMinimalCard;
      'elements.section-heading': ElementsSectionHeading;
      'elements.single-course': ElementsSingleCourse;
      'elements.testimony': ElementsTestimony;
      'elements.text-list': ElementsTextList;
      'elements.title-with-list': ElementsTitleWithList;
      'layout.footer': LayoutFooter;
      'layout.header': LayoutHeader;
    }
  }
}
