export default function () {
  return {
    environment: process.env.ELEVENTY_ENV,
    disallow_search_engines: false,
    allow_client_scripts: true,

    // Site data
    year: new Date().getFullYear(),
    site_name: 'Codrin Pavel — Build Better',
    meta_title: 'Codrin Pavel — Build Better',
    meta_description: "Development partner to agencies for over 17 years, building award-winning, accessible websites, corporate reports, and media platforms.",
    meta_image: '/assets/img/social_image.png',  // place in src/assets/favicon
  }
};
