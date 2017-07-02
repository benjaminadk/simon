# Simon
## [PLAY SIMON](https://benjaminadk.github.io/simon/index.html)
## History
The original Simon game was launched in 1978.  It was invented by Ralph Baer, and distrubuted my Milton Bradley.  The game was an immediate success and became a pop culture symbol in the 70s and 80s.

![](https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/OriginalSimon.jpg/220px-OriginalSimon.jpg)

## My Version
I just started writing React and I hadn't done this Freecodecamp project yet, so making Simon in React seemed like the obvious
choice.  My game is simple enough.
- I use the Audio API through the pizzicato javascript library to generate 4 different tones
- I set the frequency, return, attack and type of sound wave
  - type of wave for all my tones is sine wave
  - frequencies are set to match original Simon game
    - Ralph Baer supposedly modeled the sounds after a bugle
    - The notes are G C E G. I used those frequencies
  - attack is how the sound fades in.  audio api lets you set this with a time
  - return is how the sound fades out.
- I match the colors to the best of my ability
- I try to create a lit effect with a radial gradient
- I have textures included but was unable to implement at this point due to position and z-index issues
  - Buttons would have a plastic look.  The code for this is commented out in case of future implementation
- I use one ES6 class to manage the state of entire game
- I use Founation CSS framework for power switch and instructions button
- User can play in strict or regular mode
- As user advances through rounds, the speed of computer sequence increases
- At this point my "AI" will only check a user enter sequence when they enter the full number of presses required to complete
a round.  A user can get the first press of round ten wrong but won't get feedback until they make ten presses.
- I look to improve upon this in the future

## Enjoy the Game And Good Luck Winning!

[![](https://raw.githubusercontent.com/benjaminadk/simon/master/handsome.jpg)](https://www.useloom.com/share/2aacbef79042417ebb35ede1c5be7638)
