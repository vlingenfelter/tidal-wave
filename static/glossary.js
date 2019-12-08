export let terms = [
  {
    term: 'Marigram',
    letter: 'M',
    links: [],
    def: 'A graphic record of the rise and fall of water level. The record is in the form of a curve in which time is generally represented on the abscissa and the height of the water level on the ordinate.',
  },
  {
    term: 'Tide',
    letter: 'T',
    links: [],
    def: 'The periodic rise and fall of a body of water resulting from gravitational interactions between Sun, Moon, and Earth. The vertical component of the particulate motion of a tidal wave. Although the accompanying horizontal movement of the water is part of the same phenomenon, it is preferable to designate this motion as tidal current.',
  },
  {
    term: 'Tidal Wave',
    letter: 'T',
    links: [
      {
        term: 'High tide',
      },
      {
        term: 'Low tide',
      },
      {
        term: 'Crest',
      },
      {
        term: 'Trough',
      },
      {
        term: 'Current',
      },
      {
        term: 'Tide',
      },
    ],
    def: 'A shallow water wave caused by the gravitational interactions between the Sun, Moon, and Earth. Essentially, high water is the crest of a tidal wave and low water, the trough. Tidal current is the horizontal component of the particulate motion, while tide is manifested by the vertical component. The observed tide and tidal current can be considered the result of the combination of several tidal waves, each of which may vary from nearly pure progressive to nearly pure standing and with differing periods, heights, phase relationships, and direction.',
  },
  {
    term: 'Age of Moon',
    letter: 'A',
    links: [],
    def: 'The time elapsed since the preceding new Moon',
  },
  {
    term: 'Type of Tide',
    letter: 'T',
    links: [
      {
        term: 'Diurnal',
      },
      {
        term: 'Semidiurnal',
      },
      {
        term: 'Tide curve',
      }
    ],
    def: 'A classification based on characteristic forms of a tide curve. Qualitatively, when the two high waters and two low waters of each tidal day are approximately equal in height, the tide is said to be semidiurnal; when there is a relatively large diurnal inequality in the high or low waters or both, it is said to be mixed; and when there is only one high water and one low water in each tidal day, it is said to be diurnal.',
  },
  {
    term: 'Tide Curve',
    letter: 'T',
    links: [
      {
        term: 'Diurnal',
      },
      {
        term: 'Semidiurnal',
      },
    ],
    def: 'A graphic representation of the rise and fall of the tide in which time is usually represented by the abscissa and height by the ordinate. For a semidiurnal tide with little diurnal inequality, the graphic representation approximates a cosine curve.',
  },
  {
    term: 'Sequence of Tide',
    letter: 'S',
    links: [
      {
        term: 'High tide',
      },
      {
        term: 'Low tide',
      }
    ],
    def: 'The order in which the four tides of a day occur, with special reference as to whether the higher high water immediately precedes or follows the lower low water.',
  },
  {
    term: 'Semidiurnal',
    letter: 'S',
    links: [
      {
        term: 'High tide',
      },
      {
        term: 'Low tide',
      }
    ],
    def: 'Having a period or cycle of approximately one-half of a tidal day. The predominant type of tide throughout the world is semidiurnal, with two high waters and two low waters each tidal day. The tidal current is said to be semidiurnal when there are two flood and two ebb periods each day. A semidiurnal constituent has two maxima and two minima each constituent day, and its symbol is the subscript 2.',
  },
  {
    term: 'Trough',
    letter: 'T',
    links: [],
    def: 'The lowest point in a propagating wave',
  },
  {
    term: 'Spring Tides',
    letter: 'S',
    links: [],
    def: 'Tides of increased range or tidal currents of increased speed occurring semimonthly as the result of the Moon being new or full.',
  },
  {
    term: 'Relative Mean Sea Level Change',
    letter: 'R',
    links: [
      {
        term: 'Mean Sealevel (MSL)',
      },
      {
        term:  'Bench mark (BM)',
      }
    ],
    def: 'A local change in mean sea level relative to a network of bench marks established in the most stable and permanent material available (bedrock, if possible) on the land adjacent to the tide station location.',
  },
  {
    term: 'Range of Tide',
    letter: 'R',
    links: [
      {
        term: 'High tide',
      },
      {
        term: 'Low tide',
      }
    ],
    def: 'The difference in height between consecutive high and low waters. The mean range is the difference in height between mean high water and mean low water.',
  },
  {
    term: 'Neap Tide',
    letter: 'N',
    links: [
      {
        term: 'Quadrature of Moon',
      },
    ],
    def: 'Tides of decreased range or tidal currents of decreased speed occurring semimonthly as the result of the Moon being in quadrature.',
  },
  {
    term: 'Quadrature of Moon',
    letter: 'Q',
    links: [],
    def: 'Position of the Moon when its longitude differs by 90° from the longitude of the Sun. The corresponding phases are known as first quarter and last quarter.',
  },
  {
    term: 'Mean Sealevel (MSL)',
    letter: 'M',
    links: [
      {
        term: 'Datum',
      }
    ],
    def: 'A tidal datum. The arithmetic mean of hourly heights observed over the National Tidal Datum Epoch. Shorter series are specified in the name; e.g., monthly mean sea level and yearly mean sea level.',
  },
  {
    term: 'Low Tide',
    letter: 'L',
    links: [],
    def: 'The minimum height reached by a falling tide',
  },
  {
    term: 'Intertidal Zone',
    letter: 'I',
    links: [
      {
        term: 'High tide',
      },
      {
        term: 'Low tide',
      }
    ],
    def: 'The zone between the mean higher high water and mean lower low water lines',
  },
  {
    term: 'High Tide',
    letter: 'H',
    links: [],
    def: 'The maximum height reached by a rising tide.',
  },
  {
    term: 'Datum',
    letter: 'D',
    links: [],
    def: 'For marine applications, a base elevation used as a reference from which to reckon heights or depths. It is called a tidal datum when defined in terms of a certain phase of the tide. ',
  },
  {
    term: 'Diurnal',
    letter: 'D',
    links: [
      {
        term: 'High Tide',
      },
      {
        term: 'Low Tide',
      }
    ],
    def: 'Having a period or cycle of approximately one tidal day. Thus, the tide is said to be diurnal when only one high water and one low water occur during a tidal day.',
  },
  {
    term: 'Current',
    letter: 'C',
    links: [
      {
        term: 'Tide'
      }
    ],
    def: 'Generally, a horizontal movement of water. Currents may be classified as tidal and nontidal. Tidal currents are caused by gravitational interactions between the Sun, Moon, and Earth and are part of the same general movement of the sea that is manifested in the vertical rise and fall, called tide.',
  },
  {
    term: 'Crest',
    letter: 'C',
    links: [],
    def: 'The highest point in a propagating wave.',
  },
  {
    term: 'Bench mark (BM)',
    letter: 'B',
    links: [
      {
        term: 'Datum',
      },
    ],
    def: 'A fixed physical object or mark used as reference for a horizontal or vertical datum. A tidal bench mark is one near a tide station to which the tide staff and tidal datums are referred.',
  },
  {
    term: 'Tide Station',
    letter: 'T',
    links: [
      {
        term: 'Bench mark (BM)',
      }
    ],
    def: 'The geographic location at which tidal observations are conducted. Also, the facilities used to make tidal observations. These may include a tide house, tide (water level) gauge, tide staff, and tidal bench marks.',
  }
]