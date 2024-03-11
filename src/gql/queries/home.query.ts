import { gql } from "@apollo/client";

const GET_HOME = gql`
  query ($locale: I18NLocaleCode!) {
    homePage(locale: $locale) {
      data {
        id
        attributes {
          opportunities {
            id
            description
            title
            image {
              data {
                id
                attributes {
                  url
                  name
                  width
                  height
                }
              }
            }
          }
          announcements {
            id
            address
            name
            trainer
            time
            isFree
            certificateType
            training {
              data {
                id
              }
            }
            image {
              data {
                id
                attributes {
                  url
                  width
                  height
                  name
                }
              }
            }
          }
          infos {
            id
            label
            value
            hasTime
          }
          videoBannerUrl
          videoBannerTitle
          videoBannerDescription
          videoBannerThumbnail {
            data {
              id
              attributes {
                url
                width
                height
                name
              }
            }
          }
          heroTitle
          heroDescription
          heroLink
          heroImage {
            data {
              id
              attributes {
                url
                width
                height
                name
              }
            }
          }
          trainings {
            data {
              attributes {
                date
                name
                mainInfo
              }
              id
            }
          }
        }
      }
    }
    partners {
      data {
        id
        attributes {
          logo {
            data {
              id
              attributes {
                width
                height
                url
                name
              }
            }
          }
          url
        }
      }
    }
    customers {
      data {
        id
        attributes {
          logo {
            data {
              id
              attributes {
                width
                height
                url
                name
              }
            }
          }
          url
        }
      }
    }
    trainings {
      data {
        id
        attributes {
          name
          date
          mainInfo
        }
      }
    }
    specialists(locale: $locale, pagination: { page: 1, pageSize: 100 }) {
      data {
        id
        attributes {
          image {
            data {
              id
              attributes {
                url
                width
                height
                name
              }
            }
          }
          fullName
          position
        }
      }
    }
    newss(sort: "date:desc", pagination: { page: 1, pageSize: 3 }) {
      data {
        id
        attributes {
          thumbnail {
            data {
              id
              attributes {
                url
                width
                height
                name
              }
            }
          }
          title
          shortDescription
          type
          date
        }
      }
    }
  }
`;
export default GET_HOME;
