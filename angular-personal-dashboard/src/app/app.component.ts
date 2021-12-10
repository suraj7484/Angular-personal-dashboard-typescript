import {
  animate,
  style,
  transition,
  trigger,
  query,
  group,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { map, Observable, timer } from 'rxjs';

const baseStyles = style({
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              // display: "block"
            })

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  /*animations: [
    trigger('routeAnim', [
      transition('* => *', [
        query(':enter', [
          style({
            background: 'wheat',
            display: "block",
            height: "100%"
          }),
          animate(1000, style({
            background: "*"
          }))
        ], {optional: true}),

        style({
          backgroundColor: "blue",
        }),

        // animate(1000, style({
        //   backgroundColor: "violet"
        // })),

        animate(1000, )
      ])
    ])
  ]*/
  animations: [
    trigger('routeAnim', [
      //** Increment Transiotion for routing left to right * /
      transition(':increment', [
        /**Default Styling For content-section (Root Component) */

        style({
          position: 'relative',
          overflow: 'hidden',
        }),

        /**Styling For Merging The Animations */
        query(
          ':enter, :leave',
          [
            baseStyles
          ],
          { optional: true }
        ),
        // query(
        //   ':enter',
        //   [
        //     style({
        //       opacity: 0,
        //     }),
        //   ],
        //   { optional: true }
        // ),

        group([
          /** Leaving Animation */
          query(
            ':leave',
            [
              animate(
                '300ms ease-in',
                style({
                  opacity: 0,
                  transform: 'translateX(-80px)',
                })
              ),
            ],
            { optional: true }
          ),

          /** Entering Animation */
          query(
            ':enter',
            [
              style({
                opacity: 0,
                transform: 'translateX(80px)',
              }),
              animate(
                '300ms 100ms ease-out',
                style({
                  opacity: 1,
                  transform: 'translateX(0px)',
                })
              ),
            ],
            { optional: true }
          ),
        ]),
      ]),
      //** Decrement Transition for routing right to left */
      transition(':decrement', [
        /**Default Styling For content-section (Root Component) */

        style({
          position: 'relative',
          overflow: 'hidden',
        }),

        /**Styling For Merging The Animations */
        query(
          ':enter, :leave',
          [
            baseStyles
          ],
          { optional: true }
        ),
        // query(
        //   ':enter',
        //   [
        //     style({
        //       opacity: 0,
        //     }),
        //   ],
        //   { optional: true }
        // ),

        group([
          /** Leaving Animation */
          query(
            ':leave',
            [
              animate(
                '300ms ease-in',
                style({
                  opacity: 0,
                  transform: 'translateX(80px)',
                })
              ),
            ],
            { optional: true }
          ),

          /** Entering Animation */
          query(
            ':enter',
            [
              style({
                opacity: 0,
                transform: 'translateX(-80px)',
              }),
              animate(
                '300ms 100ms ease-out',
                style({
                  opacity: 1,
                  transform: 'translateX(0px)',
                })
              ),
            ],
            { optional: true }
          ),
        ]),
      ]),

      transition('* => secondary', [


   /**Default Styling For content-section (Root Component) */

          style({
            position: 'relative',
            // overflow: 'hidden',
          }),

          /**Styling For Merging The Animations */
          query(
            ':enter, :leave',
            [
              baseStyles
            ],
            { optional: true }
          ),

          group([
            /** Leaving Animation */
            query(
              ':leave',
              [
                animate(
                  '300ms ease-in',
                  style({
                    opacity: 0,
                    transform: 'scale(0.8)',
                  })
                ),
              ],
              { optional: true }
            ),

            /** Entering Animation */
            query(
              ':enter',
              [
                style({
                  opacity: 0,
                  transform: 'scale(1.2)',
                }),
                animate(
                  '300ms 100ms ease-out',
                  style({
                    opacity: 1,
                    transform: 'scale(1)',
                  })
                ),
              ],
              { optional: true }
            ),
          ])


      ]),
      transition('secondary => *', [


   /**Default Styling For content-section (Root Component) */

          style({
            position: 'relative',
            // overflow: 'hidden',
          }),

          /**Styling For Merging The Animations */
          query(
            ':enter, :leave',
            [
              baseStyles
            ],
            { optional: true }
          ),

          group([
            /** Leaving Animation */
            query(
              ':leave',
              [
                animate(
                  '300ms ease-in',
                  style({
                    opacity: 0,
                    transform: 'scale(1.25)',
                  })
                ),
              ],
              { optional: true }
            ),

            /** Entering Animation */
            query(
              ':enter',
              [
                style({
                  opacity: 0,
                  transform: 'scale(0.8)',
                }),
                animate(
                  '300ms 100ms ease-out',
                  style({
                    opacity: 1,
                    transform: 'scale(1)',
                  })
                ),
              ],
              { optional: true }
            ),
          ])


      ])
    ]),

    trigger('bgAnim', [
      transition(
        ':leave',
        animate(1000, style({ opacity: 0 }))
      ),
    ]),
    trigger('fadeAnim', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(250, style({opacity: 1}))
      ])
      ,
      transition(':leave',animate(250, style({opacity: 0}))
      )
    ])
  ],
})
export class AppComponent implements OnInit{
  backgroungs: string[] = [
    'https://images.unsplash.com/photo-1638094484540-3ee0875aaca5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1200&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzODg2NDQ2NA&ixlib=rb-1.2.1&q=80&w=2500',
  ];
  loadingBGImage: boolean;

  dateTime: Observable<Date>

  ngOnInit(): void {
    this.dateTime = timer(0, 100).pipe(
      map(() => {
        return new Date()
      })
    )
  }

  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) {
      const tab = outlet.activatedRouteData['tab']
      if (!tab) return 'secondary'
      return tab
    };
  }

  async changeBGImage() {
    this.loadingBGImage = true;
    const result = await fetch(
      // 'https://api.unsplash.com/photos/?client_id=vY8f6CMHVvdNUPp--pEXm1q4Y2RVIRH1xKPXEEn4Qn0',
      'https://source.unsplash.com/random/2500x1200',
      {
        method: 'HEAD',
      }
    );

    const alreadyGot = this.backgroungs.includes(result.url);

    if (alreadyGot) {
      this.changeBGImage();
    }

    this.backgroungs.push(result.url);
    // this.loadingBGImage = false;
  }

  onBGImageLoad(imageEvent: Event) {
    // BG image has loaded, now remove the old image;

    const imageElement = imageEvent.target as HTMLImageElement;
    const src = imageElement.src;
    // this.backgroungs = [src]

    this.backgroungs = this.backgroungs.filter((b) => b === src);
    this.loadingBGImage = false;
  }
}
