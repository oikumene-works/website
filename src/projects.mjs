// Stable entry IDs, area placement and optional localized metadata/action lists; descriptions are preview drafts.
export const projects = [
  {
    "id": "christian-belief-explorer",
    "fi": {
      "name": "Tutki kristillisiä näkemyksiä",
      "description": "Joidenkin kristillisen uskon yksittäisiin kysymyksiin liittyvien näkemysten itsenäistä tutkimista ja vertailua.",
      "detail": [
        "Kysymyksiin ja lähteisiin perustuva kokeellinen hanke. Ensimmäinen pilotti käsittelee Raamattua ja sen tulkinnan auktoriteettia. Varsinainen sovellus on kehitteillä."
      ],
      "metadata": [
        {
          "label": "Kehitysvaihe",
          "value": "Kehitteillä – ei valmis sovellus"
        },
        {
          "label": "Käyttöoikeudet",
          "value": "CC0 1.0 (projektin alkuperäinen aineisto)",
          "href": "https://github.com/oikumene-works/christian-belief-explorer/blob/main/LICENSE"
        }
      ]
    },
    "en": {
      "name": "Explore Christian Perspectives",
      "description": "Independent exploration and comparison of some perspectives on individual questions of Christian faith.",
      "detail": [
        "An experimental project based on questions and sources. The first pilot concerns the Bible and interpretive authority. The application is still in development."
      ],
      "metadata": [
        {
          "label": "Development stage",
          "value": "In development – not a finished application"
        },
        {
          "label": "License",
          "value": "CC0 1.0 (original project material)",
          "href": "https://github.com/oikumene-works/christian-belief-explorer/blob/main/LICENSE"
        }
      ]
    },
    "actions": [
      {
        "fi": {
          "href": "https://github.com/oikumene-works/christian-belief-explorer",
          "label": "Avaa projektin repositorio"
        },
        "en": {
          "href": "https://github.com/oikumene-works/christian-belief-explorer",
          "label": "Open the project repository"
        }
      }
    ],
    "area": "reflection"
  },
  {
    "id": "deep-research-guide",
    "fi": {
      "name": "Syvätutkimusohjeen muodostaja",
      "description": "Suunnitteilla: tutkimustehtävään mukautuva ohje tekoälyavusteiseen tutkimiseen.",
      "detail": [
        "Kokeiltava kehityssuunta on yksi työkalu, jossa tutkimusohje mukautuu tutkimustehtävään. Nykyinen v0.7-ohje on tarkoitettu yhden väitteen lähdekriittiseen tutkimiseen. Sen rinnalle suunnitellaan menetelmää avoimien tutkimuskysymysten käsittelyyn. Nykyinen ohje on käytettävissä alla olevasta linkistä."
      ]
    },
    "en": {
      "name": "Deep Research Prompt Builder",
      "description": "Planned: research instructions tailored to the task for AI-assisted research.",
      "detail": [
        "The proposed approach is a single tool that adapts research instructions to the task. The current v0.7 guide is intended for source-critical investigation of a single claim. A method for open research questions is planned alongside it. The current guide is available via the link below."
      ]
    },
    "actions": [
      {
        "fi": {
          "href": "https://wennström.fi/syvatutkimus/",
          "label": "Avaa nykyinen väitteen tutkimisohje"
        },
        "en": {
          "href": "https://wennström.fi/syvatutkimus/",
          "label": "Open the current claim research guide (Finnish)"
        }
      }
    ],
    "area": "reflection"
  },
  {
    "id": "ewoc",
    "area": "software",
    "fi": {
      "name": "Ewoc",
      "description": "Maksuton sisäpyöräilysovellus Androidille ja työpöydän harjoituseditori.",
      "detail": [
        "Ohjattuja harjoituksia FTMS-yhteensopivilla harjoitusvastuksilla. Harjoitustiedostot ovat paikallisia."
      ]
    },
    "en": {
      "name": "Ewoc",
      "description": "A free indoor cycling app for Android and a desktop workout editor.",
      "detail": [
        "Structured workouts with FTMS-compatible trainers. Workout files are stored locally."
      ]
    },
    "actions": [
      {
        "fi": {
          "href": "https://f-droid.org/packages/io.github.ewoc2026.ewoc/",
          "label": "Avaa F-Droidissa"
        },
        "en": {
          "href": "https://f-droid.org/packages/io.github.ewoc2026.ewoc/",
          "label": "Open in F-Droid"
        }
      },
      {
        "fi": {
          "href": "https://github.com/Ewoc2026/ewoc",
          "label": "Lähdekoodi GitHubissa"
        },
        "en": {
          "href": "https://github.com/Ewoc2026/ewoc",
          "label": "Source code on GitHub"
        }
      }
    ]
  },
  {
    "id": "visual-routines",
    "area": "software",
    "fi": {
      "name": "Visual Routines",
      "description": "Maksuton avoimen lähdekoodin Android-sovellus arjen rutiinien luomiseen ja seuraamiseen askel kerrallaan.",
      "detail": [
        "Rutiinit tallennetaan laitteelle. Sovellus tarjoaa rauhallisen näkymän meneillään olevaan askeleeseen."
      ]
    },
    "en": {
      "name": "Visual Routines",
      "description": "A free, open-source Android app for creating and following everyday routines one step at a time.",
      "detail": [
        "Routines are stored on the device. The app offers a calm view of the current step."
      ]
    },
    "actions": [
      {
        "fi": {
          "href": "https://f-droid.org/packages/io.github.ewoc2026.visualroutines/",
          "label": "Avaa F-Droidissa"
        },
        "en": {
          "href": "https://f-droid.org/packages/io.github.ewoc2026.visualroutines/",
          "label": "Open in F-Droid"
        }
      },
      {
        "fi": {
          "href": "https://github.com/oikumene-works/visual-routines",
          "label": "Lähdekoodi GitHubissa"
        },
        "en": {
          "href": "https://github.com/oikumene-works/visual-routines",
          "label": "Source code on GitHub"
        }
      }
    ]
  },
  {
    "id": "android-test-helpers",
    "area": "tools",
    "fi": {
      "name": "Android Test Helpers",
      "description": "Kaksi komentorivityökalua Android-sovellusten testihavaintojen tallentamiseen ja verkkotallenteen kattavuuden arviointiin."
    },
    "en": {
      "name": "Android Test Helpers",
      "description": "Two command-line helpers for capturing Android test evidence and checking network recording coverage."
    },
    "actions": [
      {
        "fi": {
          "href": "https://github.com/oikumene-works/android-test-helpers",
          "label": "Avaa aineisto GitHubissa"
        },
        "en": {
          "href": "https://github.com/oikumene-works/android-test-helpers",
          "label": "Open the material on GitHub"
        }
      }
    ]
  },
  {
    "id": "tasi",
    "fi": {
      "name": "TASI",
      "description": "Avointa protokollatutkimusta, ohjelmistotyökaluja ja integraatioita valituille TASI-mittalaitteille.",
      "detail": [
        "TA612C-nelikanavaiselle lämpömittarille kehitettyjä työkaluja ja USB/sarjaprotokollan tutkimusta. DataExplorer 4.0.8 sisältää TA612C-liitännäisen."
      ]
    },
    "en": {
      "name": "TASI",
      "description": "Open protocol research, software tools and integrations for selected TASI measurement devices.",
      "detail": [
        "Tools and USB/serial protocol research for the TA612C four-channel thermometer. DataExplorer 4.0.8 includes the TA612C plugin."
      ]
    },
    "actions": [
      {
        "fi": {
          "href": "https://github.com/oikumene-works/tasi",
          "label": "Avaa aineisto GitHubissa"
        },
        "en": {
          "href": "https://github.com/oikumene-works/tasi",
          "label": "Open the material on GitHub"
        }
      }
    ],
    "area": "tools"
  },
  {
    "id": "app-testing-notes",
    "fi": {
      "name": "App Testing Notes",
      "description": "Ohjeita, menetelmiä ja käytännön esimerkkejä Android-sovellusten testaamisesta tekoälyn kanssa.",
      "detail": [
        "Aineisto perustuu ihmisen ja Codexin yhteistyössä tehtyihin sovellustesteihin. Aloituspakettia ei ole vielä varmennettu uusilla käyttäjillä tai muilla avustajilla."
      ],
      "metadata": [
        {
          "label": "Käyttöoikeudet",
          "value": "CC BY 4.0 (alkuperäinen dokumentaatio ja tekstipohjat)",
          "href": "https://github.com/oikumene-works/app-testing-notes/blob/main/LICENSE"
        }
      ]
    },
    "en": {
      "name": "App Testing Notes",
      "description": "Guides, methods and practical examples of testing Android apps with AI.",
      "detail": [
        "The material is based on app tests carried out by a person in collaboration with Codex. The starter kit has not yet been validated with newcomers or other assistants."
      ],
      "metadata": [
        {
          "label": "License",
          "value": "CC BY 4.0 (original documentation and text templates)",
          "href": "https://github.com/oikumene-works/app-testing-notes/blob/main/LICENSE"
        }
      ]
    },
    "actions": [
      {
        "fi": {
          "href": "https://github.com/oikumene-works/app-testing-notes/blob/main/starter/README.md",
          "label": "Lue aloitusohje"
        },
        "en": {
          "href": "https://github.com/oikumene-works/app-testing-notes/blob/main/starter/README.md",
          "label": "Read the starter guide"
        }
      },
      {
        "fi": {
          "href": "https://github.com/oikumene-works/app-testing-notes",
          "label": "Avaa aineisto GitHubissa"
        },
        "en": {
          "href": "https://github.com/oikumene-works/app-testing-notes",
          "label": "Open the material on GitHub"
        }
      }
    ],
    "area": "tools"
  },
  {
    "id": "flip-the-phone",
    "area": "tools",
    "fi": {
      "name": "Flip the Phone",
      "description": "Android-puhelimen kääntämiseen perustuva tapa aloittaa ja lopettaa ChatGPT-puhekeskustelu.",
      "detail": [
        "Kokeellinen ratkaisu toimii näytön ollessa päällä ja lukituksen avattuna. Asennus ja ylläpito voivat vaatia avustajan."
      ]
    },
    "en": {
      "name": "Flip the Phone",
      "description": "An Android setup for starting and ending ChatGPT voice conversations by turning the phone.",
      "detail": [
        "The working draft requires an awake display and an unlocked phone. Installation and maintenance may require assistance."
      ]
    },
    "actions": [
      {
        "fi": {
          "href": "https://github.com/oikumene-works/android-flip-voice",
          "label": "Avaa aineisto GitHubissa"
        },
        "en": {
          "href": "https://github.com/oikumene-works/android-flip-voice",
          "label": "Open the material on GitHub"
        }
      }
    ]
  }
];
