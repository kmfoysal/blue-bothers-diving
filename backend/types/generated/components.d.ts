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
    isBorderBottom: Schema.Attribute.Boolean;
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

export interface BlocksContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_blocks_contact_infos';
  info: {
    displayName: 'contact_info';
  };
  attributes: {
    description: Schema.Attribute.Text;
    info_item: Schema.Attribute.Component<
      'elements.contact-info-list-item',
      true
    >;
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
    isWhatToExpect: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
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
    what_to_expect_content: Schema.Attribute.Blocks;
    what_to_expect_title: Schema.Attribute.String;
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

export interface BlocksPriceList extends Struct.ComponentSchema {
  collectionName: 'components_blocks_price_lists';
  info: {
    displayName: 'Price list';
    icon: 'rocket';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    pricing_table: Schema.Attribute.Component<'blocks.pricing-table', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksPricingListTab extends Struct.ComponentSchema {
  collectionName: 'components_blocks_pricing_list_tabs';
  info: {
    displayName: 'Pricing list tab';
    icon: 'server';
  };
  attributes: {
    pricing_list_tab: Schema.Attribute.Component<'blocks.price-list', true>;
  };
}

export interface BlocksPricingTable extends Struct.ComponentSchema {
  collectionName: 'components_blocks_pricing_tables';
  info: {
    displayName: 'Pricing table';
    icon: 'bulletList';
  };
  attributes: {
    note: Schema.Attribute.Text;
    price_row_item: Schema.Attribute.Component<'elements.price-row', true>;
    pricing_column: Schema.Attribute.Component<
      'elements.price-row-item',
      false
    >;
    sub_title: Schema.Attribute.String;
    title: Schema.Attribute.String;
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

export interface BlocksShaabContent extends Struct.ComponentSchema {
  collectionName: 'components_blocks_shaab_contents';
  info: {
    displayName: 'Shaab content';
    icon: 'cast';
  };
  attributes: {
    content: Schema.Attribute.Component<'elements.shaab-content-item', true>;
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

export interface BookingBookingItem extends Struct.ComponentSchema {
  collectionName: 'components_booking_booking_items';
  info: {
    description: '';
    displayName: 'Booking Item';
    icon: 'shopping-basket';
  };
  attributes: {
    date: Schema.Attribute.Date;
    image: Schema.Attribute.String;
    itemCurrency: Schema.Attribute.String;
    itemGuestCount: Schema.Attribute.Integer;
    itemNetAmount: Schema.Attribute.Decimal;
    itemPriceTotal: Schema.Attribute.Decimal;
    itemVatAmount: Schema.Attribute.Decimal;
    participants: Schema.Attribute.Integer;
    participants_details: Schema.Attribute.Component<
      'booking.participant',
      true
    >;
    price: Schema.Attribute.Decimal;
    pricingDetailsSnapshot: Schema.Attribute.JSON;
    session: Schema.Attribute.Relation<'oneToOne', 'api::session.session'>;
    slug: Schema.Attribute.String;
    type: Schema.Attribute.String;
  };
}

export interface BookingLeadCustomer extends Struct.ComponentSchema {
  collectionName: 'components_booking_lead_customers';
  info: {
    description: 'Main contact person for the booking';
    displayName: 'Lead Customer';
    icon: 'user-check';
  };
  attributes: {
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    firstName: Schema.Attribute.String & Schema.Attribute.Required;
    hotelName: Schema.Attribute.String;
    lastName: Schema.Attribute.String & Schema.Attribute.Required;
    notes: Schema.Attribute.Text;
    phone: Schema.Attribute.String;
    roomNumber: Schema.Attribute.String;
  };
}

export interface BookingParticipant extends Struct.ComponentSchema {
  collectionName: 'components_booking_participants';
  info: {
    displayName: 'Participant';
    icon: 'user';
  };
  attributes: {
    fullName: Schema.Attribute.String;
    isLead: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    participantsPhone: Schema.Attribute.String;
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

export interface ElementsContactInfoListItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_contact_info_list_items';
  info: {
    displayName: 'contact_info_list_item';
    icon: 'collapse';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    info: Schema.Attribute.String;
    info_link: Schema.Attribute.Component<'elements.link', true>;
    isLink: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String;
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

export interface ElementsPriceRow extends Struct.ComponentSchema {
  collectionName: 'components_elements_price_rows';
  info: {
    displayName: 'Price row';
    icon: 'oneToOne';
  };
  attributes: {
    price_row: Schema.Attribute.Component<'elements.pricing-row-item', true>;
  };
}

export interface ElementsPriceRowItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_price_row_items';
  info: {
    displayName: 'Price row item';
    icon: 'plus';
  };
  attributes: {
    list_row_item: Schema.Attribute.Component<'elements.text-list', true>;
  };
}

export interface ElementsPricingRowItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_pricing_row_items';
  info: {
    displayName: 'Pricing row item';
    icon: 'bulletList';
  };
  attributes: {
    text: Schema.Attribute.String;
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

export interface ElementsShaabContentItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_shaab_content_items';
  info: {
    displayName: 'Shaab content Item';
    icon: 'play';
  };
  attributes: {
    content: Schema.Attribute.Text;
    description: Schema.Attribute.Blocks;
    icon: Schema.Attribute.Media<'images'>;
    isDescription: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isFluid: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
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
    contact_info: Schema.Attribute.Component<
      'elements.contact-info-list-item',
      true
    >;
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

export interface PricingPeriod extends Struct.ComponentSchema {
  collectionName: 'components_pricing_periods';
  info: {
    description: 'Seasonal pricing configuration';
    displayName: 'Pricing Period';
    icon: 'calendar-alt';
  };
  attributes: {
    maxParticipantsIncluded: Schema.Attribute.Integer;
    pricePerParticipant: Schema.Attribute.Decimal;
    sessionPricingTiers: Schema.Attribute.Component<'pricing.tier', true>;
    staticPriceTotal: Schema.Attribute.Decimal;
    validFrom: Schema.Attribute.Date & Schema.Attribute.Required;
    validTo: Schema.Attribute.Date;
  };
}

export interface PricingTier extends Struct.ComponentSchema {
  collectionName: 'components_pricing_tiers';
  info: {
    description: 'Discount tiers based on session count';
    displayName: 'Pricing Tier';
    icon: 'layer-group';
  };
  attributes: {
    fromSessionCount: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<1>;
    pricePerParticipant: Schema.Attribute.Decimal & Schema.Attribute.Required;
    toSessionCount: Schema.Attribute.Integer;
  };
}

export interface SharedMetaSocial extends Struct.ComponentSchema {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Schema.Attribute.Media<'images'>;
    socialNetwork: Schema.Attribute.Enumeration<['Facebook', 'Twitter']> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'Shared SEO component for all pages';
    displayName: 'Seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'index, follow'>;
    metaSocial: Schema.Attribute.Component<'shared.meta-social', true>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    structuredData: Schema.Attribute.JSON;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.about-content': BlocksAboutContent;
      'blocks.adventures-escapes': BlocksAdventuresEscapes;
      'blocks.banner-slider': BlocksBannerSlider;
      'blocks.contact-info': BlocksContactInfo;
      'blocks.discover-scuba': BlocksDiscoverScuba;
      'blocks.features': BlocksFeatures;
      'blocks.features-overview': BlocksFeaturesOverview;
      'blocks.gallery': BlocksGallery;
      'blocks.home-faq': BlocksHomeFaq;
      'blocks.map': BlocksMap;
      'blocks.price-list': BlocksPriceList;
      'blocks.pricing-list-tab': BlocksPricingListTab;
      'blocks.pricing-table': BlocksPricingTable;
      'blocks.professional-courses': BlocksProfessionalCourses;
      'blocks.shaab-content': BlocksShaabContent;
      'blocks.sub-banner': BlocksSubBanner;
      'blocks.sub-header': BlocksSubHeader;
      'blocks.testimonial': BlocksTestimonial;
      'blocks.underwater-adventure': BlocksUnderwaterAdventure;
      'blocks.why-choose-us': BlocksWhyChooseUs;
      'booking.booking-item': BookingBookingItem;
      'booking.lead-customer': BookingLeadCustomer;
      'booking.participant': BookingParticipant;
      'elements.conditions': ElementsConditions;
      'elements.contact-info-list-item': ElementsContactInfoListItem;
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
      'elements.price-row': ElementsPriceRow;
      'elements.price-row-item': ElementsPriceRowItem;
      'elements.pricing-row-item': ElementsPricingRowItem;
      'elements.section-heading': ElementsSectionHeading;
      'elements.shaab-content-item': ElementsShaabContentItem;
      'elements.single-course': ElementsSingleCourse;
      'elements.testimony': ElementsTestimony;
      'elements.text-list': ElementsTextList;
      'elements.title-with-list': ElementsTitleWithList;
      'layout.footer': LayoutFooter;
      'layout.header': LayoutHeader;
      'pricing.period': PricingPeriod;
      'pricing.tier': PricingTier;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
    }
  }
}
