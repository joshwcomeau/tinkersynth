# Tinkersynth

An experimental art project that lets users create generative art through serendipitous, whimsical experimentation.

### Running locally

Clone the repo, run `yarn` to install the dependencies, and then `yarn start` to run a local dev server.

### About the code

This project uses React and Gatsby, and no longer has any sort of server-side component. Everything is done in-browser.

If you're looking to understand how the art is generated, the bulk of the logic lives in [src/components/Slopes/Slopes.generator.js](https://github.com/joshwcomeau/tinkersynth/blob/master/src/components/Slopes/Slopes.generator.js).

Additionally, many of the "visualizations" for the controls is also in the [Slopes directory](https://github.com/joshwcomeau/tinkersynth/tree/master/src/components/Slopes).

For state management, I experimented with a few things, and because of that, things are a bit messy. All of the Slopes machine state (which values are producing the current art) are done with React Context, and can be seen in [SlopesState.js](https://github.com/joshwcomeau/tinkersynth/blob/master/src/components/Slopes/SlopesState.js). But, I also use Redux for things like managing focus, storing whether the user has discovered certain easter eggs, and toast notifications.

### Contributing

This code is released primarily as an educational resource. I am not looking for external contributions. If you see a bug and want to submit a PR, I'd be grateful, but I'm not looking for anyone else to do active feature work on this project. The reasoning is that Tinkersynth is a creative outlet for me, and I don't want to introduce the management overhead of having external contributors.

Hope that's ok! If you do wish to work on Tinkersynth, I'd encourage you to create your own generative art project. It's super fun!

### License

This code is released without license. I hope that you'll read the source to answer any questions you have and take that knowledge to your own projects, rather than forking and augmenting Tinkersynth itself.

(Of course you're more than welcome to try modifying the code for your own curiosity! Just please don't publish it, or try to monetize it).
