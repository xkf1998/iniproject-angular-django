< !DOCTYPE html >
    <html lang="en">
        <head>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/addons/p5.sound.min.js"></script>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link
                href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@700&display=swap"
                rel="stylesheet"
            />
            <link rel="stylesheet" type="text/css" href="style.css" />

            <meta charset="utf-8" />
        </head>
        <body>
            <script>
      // HERE // Edit: c, margin_x,margin_y
      // framecount
                let c;
                let td;
                let mc = 1;
                // focus_x&y
                let focus_x;
                let focus_y;
                // get function
                let row;
                let column;
                let d;
                let m;
                let w;
                // week day
                let week = ["S", "M", "T", "W", "T", "F", "S"];
                // space&margin
                let space;
                let margin_x;
                let margin_y;
                let r;
                // dot array
                let dot = [];
                // font
                // let font;

      // function preload() {
                    //   font = loadFont("IBMPlexMono-Bold.ttf");
                    // }

                    function setup() {
                        frameRate(10);
                        textFont("IBMPlexMono-Bold");
                        createCanvas(windowWidth * 0.7, windowHeight);
                        margin_x = width / 20;
                        space = (width - margin_x * 2) / 28;
                        margin_y = space * 9;
                        r = space / 1.5;
                        for (i = 0; i < 365; i++) {
                            get_column_row(i);
                            get_day(i);
                            dot[i] = new Dot(
                                margin_x + space / 2 + column * space,
                                margin_y + row * space,
                                r,
                                d
                            );
                        }
                        // get today
                        var today = new Date();
                        td =
                            Math.ceil((today - new Date(today.getFullYear(), 0, 1)) / 86400000) -
                            1;
                    }

      function draw() {
                    background("#000");
        if (mc % 2 == 0) {
                    c = (frameCount + td) % 365;
        } else {
                    c = td;
        }
        // c = 120;
        // get focus_x&y
        get_column_row(c);
        focus_x = margin_x + space / 2 + column * space;
        focus_y = margin_y + row * space;

        // title text
        fill("#FB5A00");
        textSize(r * 3);
        textAlign(LEFT);
        text("2022", margin_x + space / 4, margin_y - space * 5);
        textAlign(RIGHT);
        get_day(c);
        text(d, width - margin_x - space / 4, margin_y - space * 5);
        get_month(c);
        text(m, width - margin_x - space / 4 - r * 5, margin_y - space * 5);
        // week
        textAlign(CENTER);
        textSize(r * 0.8);
        for (i = 0; i < 28; i++) {
                    let t = week[i % 7];
          text(t, margin_x + space / 2 + i * space, margin_y - space * 1.5);
        }

        // deco-circle
        fill("#FB5A00");
        circle(focus_x, margin_y - space * 2.25, r * 0.4);
        circle(margin_x - space, focus_y, r * 0.4);
        //deco-line
        strokeWeight(2);
        stroke("#FB5A00");
        for (i = 0; i < 3; i++) {
                    line(
                        margin_x + space / 2 + (i + 1) * space * 7 - space / 2,
                        margin_y - space * 2.5,
                        margin_x + space / 2 + (i + 1) * space * 7 - space / 2,
                        margin_y - space * 2
                    );
        }
        for (i = 0; i < 3; i++) {
                    line(
                        margin_x + space / 2 + (i + 1) * space * 7 - space / 2,
                        margin_y + space * 14,
                        margin_x + space / 2 + (i + 1) * space * 7 - space / 2,
                        margin_y + space * 14.5
                    );
        }
        for (i = 0; i < 4; i++) {
                    line(
                        margin_x - space * 0.8,
                        margin_y + space * (i * 4 + 1 / 2),
                        margin_x - space * 1.3,
                        margin_y + space * (i * 4 + 1 / 2)
                    );
        }
        for (i = 0; i < 4; i++) {
                    line(
                        width - margin_x + space * 0.8,
                        margin_y + space * (i * 4 + 1 / 2),
                        width - margin_x + space * 1.3,
                        margin_y + space * (i * 4 + 1 / 2)
                    );
        }

        // get_week(c);
        // text(w, 400, 200);

        for (i = 0; i < 365; i++) {
                    dot[i].show();
        }

        // date highlight
        fill("#Fff");
        circle(focus_x, focus_y, r * 2.4);
        fill("#FB5A00");
        textSize(r * 1.5);
        text(d, focus_x, focus_y+r*0.1);
      }

      class Dot {
                    constructor(x, y, r, date) {
                    this.x = x;
          this.y = y;
          this.r = r;
          this.date = date;
        }
        show() {
          if (i > c) {
                    noStroke();
            fill("#CFFF10");
          } else if (i == c) {
                    fill("#Fff");
          } else {
                    strokeWeight(1);
            stroke("#ccc");
            noFill();
          }

          let distance = dist(this.x, this.y, focus_x, focus_y);
          // if (distance == 0) {
          //   circle(this.x, this.y, this.r + (space * 4 - distance) / 4);
          //   textSize(this.r*0.6);
          // } else
          if (distance < space * 4) {
                    circle(this.x, this.y, this.r + (space * 4 - distance) / 6);
            textSize(this.r * 0.6 + (space * 4 - distance) / 10);
          } else {
                    circle(this.x, this.y, this.r);
            textSize(this.r * 0.6);
          }

          if (i > c) {
                    fill("#000");
          } else if (i == c) {
                    fill("#FB5A00");
          } else {
                    fill("#CFFF10");
          }

          textAlign(CENTER, CENTER);
          text(this.date, this.x, this.y + this.r * 0.05);
        }
      }

      // mouse click
      function mouseClicked() {
                    mc = mc + 1;
      }

      /*============================================================*/
      // get functions
      /*============================================================*/

      function get_column_row(i) {
        if (i < 90) {
                    column = (i + 6) % 7;
          row = Math.floor((i + 6) / 7);
        } else if (i < 181) {
                    column = ((i + 6) % 7) + 7;
          row = Math.floor((i + 6) / 7) - 13;
        } else if (i < 273) {
                    column = ((i + 6) % 7) + 14;
          row = Math.floor((i + 6) / 7) - 26;
        } else if (i < 365) {
                    column = ((i + 6) % 7) + 21;
          row = Math.floor((i + 6) / 7) - 39;
        }
      }

      function get_day(i) {
        if (i < 31) {
                    d = i + 1;
        } else if (i < 59) {
                    d = i - 31 + 1;
        } else if (i < 90) {
                    d = i - 59 + 1;
        } else if (i < 120) {
                    d = i - 90 + 1;
        } else if (i < 151) {
                    d = i - 120 + 1;
        } else if (i < 181) {
                    d = i - 151 + 1;
        } else if (i < 212) {
                    d = i - 181 + 1;
        } else if (i < 243) {
                    d = i - 212 + 1;
        } else if (i < 273) {
                    d = i - 243 + 1;
        } else if (i < 304) {
                    d = i - 273 + 1;
        } else if (i < 334) {
                    d = i - 304 + 1;
        } else if (i < 365) {
                    d = i - 334 + 1;
        }
      }

      function get_month(i) {
        if (i < 31) {
                    m = "January";
        } else if (i < 59) {
                    m = "February";
        } else if (i < 90) {
                    m = "March";
        } else if (i < 120) {
                    m = "April";
        } else if (i < 151) {
                    m = "May";
        } else if (i < 181) {
                    m = "June";
        } else if (i < 212) {
                    m = "July";
        } else if (i < 243) {
                    m = "August";
        } else if (i < 273) {
                    m = "September";
        } else if (i < 304) {
                    m = "October";
        } else if (i < 334) {
                    m = "November";
        } else if (i < 365) {
                    m = "December";
        }
      }

      function get_week(i) {
        if ((i + 4) % 7 == 0) {
                    w = "Sunday";
        } else if ((i + 3) % 7 == 0) {
                    w = "Monday";
        } else if ((i + 2) % 7 == 0) {
                    w = "Tuesday";
        } else if ((i + 1) % 7 == 0) {
                    w = "Wednesday";
        } else if (i % 7 == 0) {
                    w = "Thursday";
        } else if ((i - 1) % 7 == 0) {
                    w = "Friday";
        } else if ((i - 2) % 7 == 0) {
                    w = "Saturday";
        }
      }

      // https://www.epochconverter.com/days/2022#:~:text=The%20year%202022%20has%20365%20days.
    </script>
        </body>
    </html>
